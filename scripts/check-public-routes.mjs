import { readFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"

const root = new URL("..", import.meta.url).pathname
const app = join(root, "src", "app")
const files = []

function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) walk(path)
    else if (entry.name === "page.tsx") files.push(path)
  }
}

walk(app)
const failures = []
for (const file of files) {
  const source = readFileSync(file, "utf8")
  const relative = file.slice(root.length)
  if (source.includes("permanentRedirect(")) continue
  if (!source.includes("<h1")) failures.push(`${relative}: missing H1`)
  if (source.includes("<Image") && !source.includes("alt=")) failures.push(`${relative}: missing Image alt text`)
}

if (!readFileSync(join(app, "layout.tsx"), "utf8").includes('lang="vi"')) failures.push("layout.tsx: missing lang=vi")
if (!statSync(join(app, "favicon.ico"), { throwIfNoEntry: false })) failures.push("favicon.ico: missing favicon")
if (failures.length) {
  console.error(failures.join("\n"))
  process.exit(1)
}
console.log(`Checked ${files.length} route files.`)
