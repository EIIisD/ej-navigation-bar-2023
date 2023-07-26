import { promises as fs } from "node:fs"
import * as path from "node:path"
import { glob } from "glob"
import { parse } from "node-html-parser"

const cwd = process.cwd()
const inputDir = path.join(cwd, "icons")
const inputDirRelative = path.relative(cwd, inputDir)

const outputDirs = {
  svg: path.join(cwd, "public"),
  json: path.join(cwd, "config"),
}

const files = glob.sync("**/*.svg", {
  cwd: inputDir,
})
if (files.length === 0) {
  console.log(`No SVG files found in ${inputDirRelative}`)
  process.exit(0)
}
// The relative paths are just for cleaner logs
console.log(`Generating sprite for ${inputDirRelative}`)

await generateSvgSprite({
  files,
  inputDir,
  outputPath: path.join(outputDirs.svg, "icon.svg"),
})
/**
 * Creates a single SVG file that contains all the icons
 */
async function generateSvgSprite({ files, inputDir, outputPath }) {
  // Each SVG becomes a symbol and we wrap them all in a single SVG
  const symbols = await Promise.all(
    files.map(async (file) => {
      const input = await fs.readFile(path.join(inputDir, file), "utf8")
      const root = parse(input)
      const svg = root.querySelector("svg")
      if (!svg) throw new Error("No SVG element found")
      svg.tagName = "symbol"
      svg.setAttribute("id", file.replace(/\.svg$/, ""))
      svg.removeAttribute("xmlns")
      svg.removeAttribute("xmlns:xlink")
      svg.removeAttribute("version")
      svg.removeAttribute("width")
      svg.removeAttribute("height")
      return root
        .toString()
        .replaceAll(`#FF6600`, `currentColor`)
        .replaceAll(`black`, `currentColor`)
        .replaceAll(`stroke-width="2"`, `stroke-width="2.75"`)
        .trim()
    })
  )
  const output = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0">`,
    `<defs>`, // for semantics: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs
    ...symbols,
    `</defs>`,
    `</svg>`,
  ].join("\n")
  return fs.writeFile(outputPath, output, "utf8")
}

await generateJson({
  files,
  outputPath: path.join(outputDirs.json, "icons.json"),
})
async function generateJson({ files, outputPath }) {
  const output = {
    iconNames: Object.fromEntries(
      files.map((file) => {
        // We can only get type inference on the keys of a json file
        return [path.basename(file, ".svg"), true]
      })
    ),
  }
  const json = JSON.stringify(output, null, 2)
  return fs.writeFile(outputPath, json, "utf8")
}
