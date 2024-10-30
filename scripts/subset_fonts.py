import subprocess
from pathlib import Path

from bs4 import BeautifulSoup
from fontTools.subset import Options, Subsetter, load_font, save_font

ROOT_PATH = Path(__file__).parents[1]


def main():
    all_text = ""

    subset_chars_path = ROOT_PATH / ".subset-chars"

    try:
        old_subset_chars = subset_chars_path.read_text(encoding="utf-8")
    except FileNotFoundError:
        old_subset_chars = ""

    dist_path = ROOT_PATH / "dist"
    for path in dist_path.rglob("*.html"):
        all_text += BeautifulSoup(
            path.read_text(encoding="utf-8"), "html.parser"
        ).get_text()

    all_chars = "".join(sorted(set(all_text)))
    print(f"Subset chars: {all_chars}")

    if old_subset_chars == all_chars:
        print("Subset chars unchanged – nothing to do")
        return

    subset_chars_path.write_text(all_chars, encoding="utf-8")

    options = Options(flavor="woff2")
    options.set(layout_features=[*options.layout_features, "salt"])

    subsetter = Subsetter(options)
    subsetter.populate(text=all_chars)

    fonts_path = ROOT_PATH / "src/layouts/fonts"
    subsets_path = fonts_path / "subsets"

    subsets_path.mkdir(exist_ok=True)

    for path in fonts_path.glob("*.woff2"):
        print(f"Subsetting: {path}")
        font = load_font(path, options)
        subsetter.subset(font)
        save_font(font, f"{subsets_path / path.stem}.woff2", options)

    print("Re-running npm run build...")
    subprocess.run(["npm", "run", "build"], shell=True)


if __name__ == "__main__":
    main()
