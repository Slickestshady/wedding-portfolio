"""
convert_images.py
Copies images from ibmpics/folder 1-4 into src/assets/gallery/folder1-4.
- .jpg/.jpeg/.png/.webp → copied directly
- .heic → converted to .jpg via pillow-heif
Images are renamed 01.jpg, 02.jpg, ... preserving the original filename sort order.
"""

import os
import shutil
from pathlib import Path

import pillow_heif
from PIL import Image

pillow_heif.register_heif_opener()

BASE = Path(__file__).parent
SRC_BASE = BASE / "ibmpics"
DST_BASE = BASE / "src" / "assets" / "gallery"

FOLDERS = {
    "folder 1": "folder1",
    "folder 2": "folder2",
    "folder 3": "folder3",
    "folder 4": "folder4",
}

PASSTHROUGH = {".jpg", ".jpeg", ".png", ".webp"}
CONVERT     = {".heic", ".heif"}

for src_name, dst_name in FOLDERS.items():
    src_dir = SRC_BASE / src_name
    dst_dir = DST_BASE / dst_name

    dst_dir.mkdir(parents=True, exist_ok=True)

    # Remove existing .gitkeep so Vite's glob won't choke
    gitkeep = dst_dir / ".gitkeep"
    if gitkeep.exists():
        gitkeep.unlink()

    files = sorted(src_dir.iterdir())
    images = [f for f in files if f.suffix.lower() in PASSTHROUGH | CONVERT]

    print(f"\n{src_name} -> {dst_name}  ({len(images)} images)")

    for idx, img_path in enumerate(images, start=1):
        out_name = f"{idx:02d}.jpg"
        out_path = dst_dir / out_name
        ext = img_path.suffix.lower()

        if ext in PASSTHROUGH:
            shutil.copy2(img_path, out_path)
            print(f"  copy   {img_path.name} -> {out_name}")
        elif ext in CONVERT:
            img = Image.open(img_path)
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")
            img.save(out_path, "JPEG", quality=90)
            print(f"  convert {img_path.name} -> {out_name}")

print("\nDone.")
