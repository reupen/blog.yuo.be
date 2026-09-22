import { createReadStream, promises as fs } from "node:fs"
import { dirname, join, basename } from "node:path"
import { text } from "node:stream/consumers"
import { fileURLToPath } from "node:url"
import svg2ttf from "svg2ttf"
import { SVGIcons2SVGFontStream } from "svgicons2svgfont"
import ttf2woff2 from "ttf2woff2"

const FONT_AWESOME_ROOT = dirname(
  fileURLToPath(
    import.meta.resolve("@fortawesome/fontawesome-free/package.json"),
  ),
)

const FONT_NAME = "byb-icon"
const DEST_DIR = join(dirname(import.meta.dirname), "src/layouts/icons")
const COPYRIGHT =
  "Icons copyright (c) Fonticons, Inc. (https://fontawesome.com, https://fontawesome.com/license/free)"
const DESCRIPTION = "Custom icon font built from Font Awesome SVGs"

const ICON_PATHS = [
  `svgs/regular/sun.svg`,
  `svgs/solid/arrow-left.svg`,
  `svgs/solid/arrow-right.svg`,
  `svgs/solid/chevron-left.svg`,
  `svgs/solid/chevron-right.svg`,
  `svgs/solid/circle.svg`,
  `svgs/solid/circle-half-stroke.svg`,
  `svgs/solid/circle-info.svg`,
  `svgs/solid/comment.svg`,
  `svgs/solid/copy.svg`,
  `svgs/solid/moon.svg`,
  `svgs/solid/mug-hot.svg`,
  `svgs/solid/rss.svg`,
  `svgs/solid/share-nodes.svg`,
  `svgs/brands/bluesky.svg`,
  `svgs/brands/github.svg`,
  `svgs/brands/hacker-news.svg`,
  `svgs/brands/mastodon.svg`,
  `svgs/brands/reddit.svg`,
  `svgs/brands/x-twitter.svg`,
].map((subpath) => join(FONT_AWESOME_ROOT, subpath))

const ICONS = ICON_PATHS.map((path, index) => ({
  path,
  name: basename(path, ".svg"),
  codepoint: 0xea01 + index,
}))

async function writeFont() {
  const fontStream = new SVGIcons2SVGFontStream({
    fontName: FONT_NAME,
    ascent: 448,
    descent: 64,
  })

  for (const icon of ICONS) {
    const glyph = createReadStream(icon.path)
    Object.assign(glyph, {
      metadata: {
        unicode: [String.fromCodePoint(icon.codepoint)],
        name: icon.name,
      },
    })
    fontStream.write(glyph)
  }

  fontStream.end()

  const svgFontText = await text(fontStream)
  const ttf = svg2ttf(svgFontText, {
    copyright: COPYRIGHT,
    description: DESCRIPTION,
  })
  const woff2 = ttf2woff2(ttf.buffer)

  await fs.mkdir(DEST_DIR, { recursive: true })
  await fs.writeFile(join(DEST_DIR, `${FONT_NAME}.woff2`), woff2)
}

function generateIconCSS(name: string, codepoint: number) {
  return `.${FONT_NAME}-${name}::before {
  content: "\\${codepoint.toString(16)}";
}`
}

async function writeCSS() {
  const css = ICONS.map((icon) =>
    generateIconCSS(icon.name, icon.codepoint),
  ).join("\n\n")

  await fs.writeFile(join(DEST_DIR, `${FONT_NAME}.css`), css)
}

await writeFont()
await writeCSS()
