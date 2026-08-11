import fs from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const root = process.cwd()
const sourceDir = path.join(root, "assets-source/hero/frames")
const runtimeDir = path.join(root, "public/hero-sequence")
const FRAME_COUNT = 339
const numericFrame = (name) => Number(name.match(/(\d+)\.jpe?g$/i)?.[1] ?? NaN)
const pad = (index) => String(index).padStart(4, "0")

const files = (await fs.readdir(sourceDir)).filter((name) => /\.jpe?g$/i.test(name)).sort((a, b) => numericFrame(a) - numericFrame(b))
if (files.length !== FRAME_COUNT) throw new Error(`Expected ${FRAME_COUNT} JPEG frames, found ${files.length}`)
for (let i = 0; i < FRAME_COUNT; i += 1) if (numericFrame(files[i]) !== i + 1) throw new Error(`Frame sequence is not contiguous at ${files[i]}`)

await fs.rm(runtimeDir, { recursive: true, force: true })
await Promise.all([fs.mkdir(path.join(runtimeDir, "desktop"), { recursive: true }), fs.mkdir(path.join(runtimeDir, "mobile"), { recursive: true })])
await Promise.all(files.map(async (file, offset) => {
  const source = path.join(sourceDir, file)
  const index = offset + 1
  await Promise.all([
    sharp(source).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 76 }).toFile(path.join(runtimeDir, "desktop", `frame-${pad(index)}.webp`)),
    sharp(source).resize({ width: 900, withoutEnlargement: true }).webp({ quality: 68 }).toFile(path.join(runtimeDir, "mobile", `frame-${pad(index)}.webp`)),
  ])
}))
await sharp(path.join(sourceDir, files[0])).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(runtimeDir, "poster.webp"))
console.log(`Optimized ${files.length} frames into ${runtimeDir}`)
