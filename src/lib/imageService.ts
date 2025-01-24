import type { LocalImageService } from "astro"
import { baseService } from "astro/assets"
import { cpus } from "node:os"
import pLimit from "p-limit"
import sharp from "sharp"

const limit = pLimit(process.env.CF_PAGES ? 2 : Math.max(cpus().length / 2, 1))

const service: LocalImageService = {
  getHTMLAttributes: baseService.getHTMLAttributes,
  getURL: baseService.getURL,
  parseURL: baseService.parseURL,
  validateOptions: baseService.validateOptions,
  async transform(inputBuffer, transform) {
    const injectedOptions = transform.format === "avif" ? { effort: 4 } : {}

    const { data, info } = await limit(
      async () =>
        await sharp(inputBuffer)
          .withMetadata()
          .rotate()
          .resize({ width: transform.width })
          .toFormat(transform.format, {
            ...injectedOptions,
            quality: transform.quality
              ? parseInt(transform.quality)
              : undefined,
          })
          .toBuffer({ resolveWithObject: true }),
    )

    return {
      data,
      format: info.format,
    }
  },
}

export default service
