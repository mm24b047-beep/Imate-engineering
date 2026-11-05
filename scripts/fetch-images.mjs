// Downloads every image referenced in src/data/site.ts from the live site into public/images,
// preserving the "YYYY/MM/filename" layout. Then set VITE_IMG_BASE=/images in .env.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const SRC = "https://imateengineering.in/wp-content/uploads";
const OUT = "public/images";

const ts = await readFile("src/data/site.ts", "utf8");
const paths = new Set([...ts.matchAll(/img\("([^"]+)"\)/g)].map((m) => m[1]));

// templated product images
for (let i = 1; i <= 10; i++) paths.add(`2025/05/Compressor-Parts-${i}.jpg`);
for (let i = 1; i <= 9; i++) paths.add(`2025/05/Machinery-Parts-${i}.jpg`);
for (let i = 1; i <= 3; i++) paths.add(`2025/05/Off-Road-Vehicle-Part-${i}.jpg`);
for (let i = 1; i <= 5; i++) paths.add(`2025/06/Cast-iron-Stainless-steels-and-steel-Valves-${i}-Gallery.jpg`);

let ok = 0;
for (const p of paths) {
  const url = `${SRC}/${p}`;
  const dest = join(OUT, p);
  try {
    const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 (site migration)" } });
    if (!res.ok) throw new Error(`${res.status}`);
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    ok++;
    console.log("ok  ", p);
  } catch (e) {
    console.log("FAIL", p, String(e));
  }
}
console.log(`\n${ok}/${paths.size} images saved to ${OUT}`);
