import { readFileSync } from "node:fs"

const packageJson = JSON.parse(readFileSync("package.json", "utf8"))
const carousel = readFileSync("src/components/ui/react-bits/depth-carousel.tsx", "utf8")
const packageDialog = readFileSync("src/components/ui/package-dialog.tsx", "utf8")
const failures = []

if (!packageJson.browserslist) failures.push("package.json: missing browserslist targets")
if (!carousel.includes("onTouchStart") || !carousel.includes("onTouchMove") || !carousel.includes("onTouchEnd")) failures.push("depth carousel: missing touch fallback handlers")
if (!carousel.includes("event.preventDefault()")) failures.push("depth carousel: horizontal touch does not claim the gesture")
if (carousel.includes("cardWidth * 0.55")) failures.push("depth carousel: swipe threshold is too high")
if (carousel.includes('event.pointerType !== "touch"')) failures.push("depth carousel: touch Pointer Events are being ignored")
if (/const onPointerDown = .*setPointerCapture/.test(carousel)) failures.push("depth carousel: pointer capture starts before a swipe is detected")
if (!packageDialog.includes("bg-hubi-teal")) failures.push("package dialog: pricing CTA is not visually prominent")

if (failures.length) {
  console.error(failures.join("\n"))
  process.exit(1)
}
console.log("Mobile compatibility checks passed.")
