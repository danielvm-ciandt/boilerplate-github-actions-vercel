import { readFileSync, writeFileSync, mkdirSync, cpSync } from "node:fs";

const pkg = JSON.parse(readFileSync("package.json", "utf-8"));
const sha = process.env.BUILD_SHA;
const version = sha ? `${pkg.version}-${sha}` : pkg.version;

mkdirSync("dist", { recursive: true });
cpSync("public", "dist", { recursive: true });

const html = readFileSync("dist/index.html", "utf-8");
writeFileSync("dist/index.html", html.replaceAll("{{VERSION}}", version));

console.log(`✔ Built dist/ with version ${version}`);
