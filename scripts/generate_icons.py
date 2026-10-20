#!/usr/bin/env python3
"""Rasterisasi public/icons/icon.svg menjadi ikon PNG untuk PWA.

Kenapa: Chrome Android membutuhkan ikon raster 192px dan 512px (plus satu
ikon "maskable") sebelum situs bisa dipasang ke layar utama / dipakai sebagai
aplikasi standalone. Ikon SVG pada manifest belum didukung merata.

Pemakaian:
    python scripts/generate_icons.py        # (python3 di Linux/macOS)
Hasilnya di-commit ke public/icons/; jalankan ulang hanya saat icon.svg berubah.

Skrip ini mendukung perintah SVG yang dipakai icon.svg saja (rect rx, path
ter-stroke dengan M/L/H/V/C/z, circle). Jika icon.svg memakai fitur lain,
skrip berhenti dengan pesan jelas — jangan menebak hasilnya (AGENTS.md §13.4).

Butuh Pillow:  pip install pillow
"""
from __future__ import annotations

import math
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "icons" / "icon.svg"
OUT_DIR = ROOT / "public" / "icons"

SS = 4  # supersample: gambar 4x lalu perkecil (LANCZOS) = anti-alias halus
LOGICAL = 512.0  # ruang koordinat icon.svg (viewBox 0 0 512 512)

# Zona aman maskable (Google): konten harus berada di lingkaran dalam 80%
# lebar ikon, jadi konten diskalakan agar tak terpotong launcher Android.
MASKABLE_SCALE = 0.82

TOKEN_RE = re.compile(r"[A-Za-z]|[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?")
CUBIC_STEPS = 24


def parse_path(d: str) -> list[tuple[list[tuple[float, float]], bool]]:
    """Simpel parser path SVG → daftar (subtitik, tertutup).

    Hanya M/m, L/l, H/h, V/v, C/c, Z/z — cukup untuk icon.svg dan disengaja
    agar perubahan desain yang memakai fitur lain terdeteksi (bukan salah).
    """
    tokens = TOKEN_RE.findall(d.replace(",", " "))
    i = 0
    cur = (0.0, 0.0)
    start = (0.0, 0.0)
    cmd = ""
    subpaths: list[tuple[list[tuple[float, float]], bool]] = []
    points: list[tuple[float, float]] = []
    closed = False

    def flush() -> None:
        nonlocal points, closed
        if len(points) > 1:
            subpaths.append((points, closed))
        points = []
        closed = False

    def num() -> float:
        nonlocal i
        if i >= len(tokens) or re.match(r"[A-Za-z]", tokens[i]):
            raise ValueError(f"Angka hilang pada perintah {cmd!r}: {d}")
        value = float(tokens[i])
        i += 1
        return value

    def cubic(
        p0: tuple[float, float],
        c1: tuple[float, float],
        c2: tuple[float, float],
        p1: tuple[float, float],
    ) -> list[tuple[float, float]]:
        out = []
        for s in range(1, CUBIC_STEPS + 1):
            t = s / CUBIC_STEPS
            u = 1 - t
            x = u**3 * p0[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t**3 * p1[0]
            y = u**3 * p0[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t**3 * p1[1]
            out.append((x, y))
        return out

    while i < len(tokens):
        if re.match(r"[A-Za-z]", tokens[i]):
            cmd = tokens[i]
            i += 1
        elif not cmd:
            raise ValueError(f"Path tanpa perintah awal: {d}")
        rel = cmd.islower()
        op = cmd.upper()
        ox, oy = cur if rel else (0.0, 0.0)

        if op == "M":
            flush()
            cur = (ox + num(), oy + num())
            start = cur
            points = [cur]
            cmd = "l" if rel else "L"  # pasangan koordinat berikutnya = lineto
        elif op == "L":
            cur = (ox + num(), oy + num())
            points.append(cur)
        elif op == "H":
            cur = (ox + num(), cur[1])
            points.append(cur)
        elif op == "V":
            cur = (cur[0], oy + num())
            points.append(cur)
        elif op == "C":
            p0 = cur
            c1 = (ox + num(), oy + num())
            c2 = (ox + num(), oy + num())
            p1 = (ox + num(), oy + num())
            points.extend(cubic(p0, c1, c2, p1))
            cur = p1
        elif op == "Z":
            closed = True
            cur = start
            flush()
        else:
            raise NotImplementedError(
                f"Perintah path SVG {cmd!r} belum didukung skrip ikon. "
                "Tambahkan dukungannya di scripts/generate_icons.py dulu."
            )
    flush()
    return subpaths


def color(value: str | None, default: tuple[int, int, int, int] | None = None):
    if value is None or value in ("none", ""):
        return default
    value = value.strip()
    if value.startswith("#"):
        hexv = value[1:]
        if len(hexv) == 3:
            hexv = "".join(ch * 2 for ch in hexv)
        return tuple(int(hexv[j : j + 2], 16) for j in (0, 2, 4)) + (255,)
    raise NotImplementedError(f"Format warna {value!r} belum didukung skrip ikon.")


def render(maskable: bool, out_size: int) -> Image.Image:
    tree = ET.parse(SRC)
    svg = tree.getroot()
    k = (out_size * SS) / LOGICAL  # piksel per satuan koordinat SVG
    shrink = MASKABLE_SCALE if maskable else 1.0
    canvas = Image.new("RGBA", (out_size * SS, out_size * SS), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)

    def pt(x: float, y: float) -> tuple[float, float]:
        # Penskalaan zona aman (maskable) berporos pusat ikon, lalu ke piksel
        if maskable:
            x = LOGICAL / 2 + (x - LOGICAL / 2) * shrink
            y = LOGICAL / 2 + (y - LOGICAL / 2) * shrink
        return (x * k, y * k)

    for el in svg.iter():
        tag = el.tag.split("}")[-1]
        if tag == "rect":
            x, y = float(el.get("x", 0)), float(el.get("y", 0))
            w, h = float(el.get("width")), float(el.get("height"))
            fill = color(el.get("fill"))
            rx = float(el.get("rx", 0))
            if maskable:
                # Latar maskable harus penuh sampai tepi (kena potong launcher)
                draw.rectangle([0, 0, canvas.width - 1, canvas.height - 1], fill=fill)
            else:
                p0, p1 = pt(x, y), pt(x + w, y + h)
                k2 = (out_size * SS) / LOGICAL
                draw.rounded_rectangle(
                    [p0[0], p0[1], p1[0], p1[1]], radius=rx * k2, fill=fill
                )
        elif tag == "path":
            fill = color(el.get("fill"))
            if fill is not None:
                raise NotImplementedError(
                    "Path ber-fill belum didukung skrip ikon (icon.svg pakai fill='none')."
                )
            stroke = color(el.get("stroke"))
            k2 = (out_size * SS) / LOGICAL
            width = float(el.get("stroke-width", 1)) * k2
            for sub, is_closed in parse_path(el.get("d")):
                line = [pt(x, y) for x, y in sub]
                draw.line(line, fill=stroke, width=int(round(width)), joint="curve")
                # Ujung bulat (stroke-linecap="round") agar segmen tak siku
                r = width / 2
                for px, py in (line[0], line[-1]):
                    draw.ellipse([px - r, py - r, px + r, py + r], fill=stroke)
                if is_closed:
                    pass  # subpath tertutup: ujung bertemu, tak perlu kaps terpisah
        elif tag == "circle":
            cx, cy = float(el.get("cx")), float(el.get("cy"))
            k2 = (out_size * SS) / LOGICAL
            r = float(el.get("r")) * k2
            fill = color(el.get("fill"))
            c = pt(cx, cy)
            draw.ellipse([c[0] - r, c[1] - r, c[0] + r, c[1] + r], fill=fill)

    return canvas.resize((out_size, out_size), Image.LANCZOS)


def main() -> int:
    if not SRC.exists():
        print(f"SVG sumber tidak ditemukan: {SRC}", file=sys.stderr)
        return 1
    jobs = [
        ("icon-192.png", False, 192),
        ("icon-512.png", False, 512),
        ("icon-maskable-512.png", True, 512),
    ]
    for name, maskable, size in jobs:
        img = render(maskable, size)
        path = OUT_DIR / name
        img.save(path, "PNG", optimize=True)
        label = ", maskable" if maskable else ""
        # "OK" biasa: konsol Windows (cp1252) bisa gagal mencetak simbol ✓
        print(f"OK {path.relative_to(ROOT)} ({size}x{size}{label})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
