from io import BytesIO
from pathlib import Path, PurePath
from urllib.parse import unquote, urlparse

import httpx
from fontTools.subset import Options, load_font, save_font

ROOT_PATH = Path(__file__).parents[1]

URLS = [
    "https://github.com/notofonts/notofonts.github.io/raw/refs/heads/main/fonts/NotoSans/googlefonts/variable-ttf/NotoSans%5Bwdth,wght%5D.ttf",
    "https://github.com/notofonts/notofonts.github.io/raw/refs/heads/main/fonts/NotoSans/googlefonts/variable-ttf/NotoSans-Italic%5Bwdth,wght%5D.ttf",
    "https://github.com/notofonts/notofonts.github.io/raw/refs/heads/main/fonts/NotoSansMono/googlefonts/variable-ttf/NotoSansMono%5Bwdth,wght%5D.ttf",
    "https://github.com/notofonts/notofonts.github.io/raw/refs/heads/main/fonts/NotoSerif/googlefonts/variable-ttf/NotoSerif%5Bwdth,wght%5D.ttf",
    "https://github.com/notofonts/notofonts.github.io/raw/refs/heads/main/fonts/NotoSerif/googlefonts/variable-ttf/NotoSerif-Italic%5Bwdth,wght%5D.ttf",
]
DOWNLOAD_ONLY_URLS = [
    "https://github.com/notofonts/notofonts.github.io/raw/refs/heads/main/fonts/NotoSans/full/ttf/NotoSans-Regular.ttf",
    "https://github.com/notofonts/notofonts.github.io/raw/refs/heads/main/fonts/NotoSans/full/ttf/NotoSans-Medium.ttf",
    "https://github.com/notofonts/notofonts.github.io/raw/refs/heads/main/fonts/NotoSans/full/ttf/NotoSans-SemiBold.ttf",
    "https://github.com/notofonts/notofonts.github.io/raw/refs/heads/main/fonts/NotoSans/full/ttf/NotoSans-Bold.ttf",
]
LICENCE_URL = (
    "https://github.com/notofonts/notofonts.github.io/raw/refs/heads/main/fonts/LICENSE"
)


def main():
    fonts_path = ROOT_PATH / "src/layouts/fonts"

    for url in DOWNLOAD_ONLY_URLS:
        _, quoted_basename = urlparse(url).path.rsplit("/", maxsplit=1)
        basename = unquote(quoted_basename)

        print(f"Downloading: {url}")
        response = httpx.get(url, follow_redirects=True)
        (fonts_path / basename).write_bytes(response.content)

    for url in URLS:
        _, quoted_basename = urlparse(url).path.rsplit("/", maxsplit=1)
        basename = unquote(quoted_basename)
        stem = PurePath(basename).stem

        print(f"Converting: {url}")
        response = httpx.get(url, follow_redirects=True)
        stream = BytesIO(response.content)
        stream.name = basename

        with stream:
            options = Options(flavor="woff2")
            font = load_font(stream, options)
            save_font(font, f"{fonts_path / stem}.woff2", options)

    print(f"Downloading licence: {LICENCE_URL}")
    licence = httpx.get(LICENCE_URL, follow_redirects=True)

    with open(fonts_path / "LICENCE", "wb") as file:
        file.write(licence.content)

    print("Deleting .subset-chars")
    subset_chars_path = ROOT_PATH / ".subset-chars"
    subset_chars_path.unlink(missing_ok=True)


if __name__ == "__main__":
    main()
