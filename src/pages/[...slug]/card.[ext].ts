import type { InferGetStaticPropsType } from "astro"
import fs from "fs/promises"
import satori from "satori"
import sharp from "sharp"

import { SocialCard, SocialCardImageOverlay } from "@/components"
import { getPosts } from "@/lib/server"

type Props = InferGetStaticPropsType<typeof getStaticPaths>

export const CARD_IMAGE_WIDTH_PX = 1200
export const CARD_IMAGE_HEIGHT_PX = 630

export async function getStaticPaths() {
  const posts = await getPosts()

  return posts.map((post, index) => {
    return {
      params: {
        slug: post.id,
        ext: post.data.image ? "jpg" : "png",
      },
      props: {
        post,
        index,
      },
    }
  })
}

export async function GET({ props: { post } }: { props: Props }) {
  const component = post.data.image ? SocialCardImageOverlay : SocialCard

  const svg = await satori(
    component({
      title: post.data.title,
      strapline: (!post.data.isAutoExcerpt && post.data.excerpt) || undefined,
    }),
    {
      width: CARD_IMAGE_WIDTH_PX,
      height: CARD_IMAGE_HEIGHT_PX,
      fonts: [
        {
          name: "Noto Sans",
          data: await fs.readFile("./src/layouts/fonts/NotoSans-Regular.ttf"),
          weight: 400,
        },
        {
          name: "Noto Sans",
          data: await fs.readFile("./src/layouts/fonts/NotoSans-Medium.ttf"),
          weight: 500,
        },
        {
          name: "Noto Sans",
          data: await fs.readFile("./src/layouts/fonts/NotoSans-SemiBold.ttf"),
          weight: 600,
        },
        {
          name: "Noto Sans",
          data: await fs.readFile("./src/layouts/fonts/NotoSans-Bold.ttf"),
          weight: 700,
        },
      ],
    },
  )

  const imageData = await (() => {
    if (post.data.image) {
      const imageMeta = post.data.image.src as ImageMetadata & {
        fsPath: string
      }
      return sharp(imageMeta.fsPath)
        .resize({ width: CARD_IMAGE_WIDTH_PX, height: CARD_IMAGE_HEIGHT_PX })
        .composite([{ input: Buffer.from(svg) }])
        .jpeg({ quality: 92 })
        .toBuffer()
    }

    return sharp(Buffer.from(svg)).png().toBuffer()
  })()

  return new Response(Buffer.from(imageData), {
    headers: {
      "Content-Type": post.data.image ? "image/jpeg" : "image/png",
    },
  })
}
