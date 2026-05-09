import fs from "fs";
import path from "path";

const REPO_ROOT = process.cwd();
const OUTPUT_PATH = path.join(REPO_ROOT, "website-text.txt");

function walkDir(dirPath) {
  const out = [];
  if (!fs.existsSync(dirPath)) return out;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dirPath, e.name);
    if (e.isDirectory()) out.push(...walkDir(p));
    else out.push(p);
  }
  return out;
}

function decodeHtmlEntities(s) {
  return s
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&apos;", "'");
}

function htmlToText(html) {
  let s = html;
  s = s.replace(/<script\b[\s\S]*?<\/script>/gi, "\n");
  s = s.replace(/<style\b[\s\S]*?<\/style>/gi, "\n");
  s = s.replace(/<noscript\b[\s\S]*?<\/noscript>/gi, "\n");
  s = s.replace(/<!--[\s\S]*?-->/g, "\n");
  s = s.replace(/<br\s*\/?>/gi, "\n");
  s = s.replace(/<\/(p|div|li|h1|h2|h3|h4|h5|h6|section|article|header|footer|main|nav|table|tr|td|th|pre|blockquote)>/gi, "\n");
  s = s.replace(/<[^>]+>/g, " ");
  s = decodeHtmlEntities(s);
  return normalizeText(s);
}

function splitMarkdownFrontmatter(md) {
  const trimmed = md.replace(/^\uFEFF/, "");
  if (!trimmed.startsWith("---\n")) return { fm: "", body: md };
  const end = trimmed.indexOf("\n---\n", 4);
  if (end === -1) return { fm: "", body: md };
  const fm = trimmed.slice(4, end).trim();
  const body = trimmed.slice(end + "\n---\n".length);
  return { fm, body };
}

function frontmatterToText(fm) {
  if (!fm) return "";
  const lines = fm
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  return lines.join("\n");
}

function stripMarkdown(md) {
  let s = md;
  // Remove fenced code blocks
  s = s.replace(/```[\s\S]*?```/g, "\n");
  // Remove inline code backticks
  s = s.replace(/`([^`]+)`/g, "$1");
  // Images and links
  s = s.replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1");
  s = s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  // Headings / emphasis
  s = s.replace(/^#{1,6}\s+/gm, "");
  s = s.replace(/(\*\*|__)(.*?)\1/g, "$2");
  s = s.replace(/(\*|_)(.*?)\1/g, "$2");
  // Blockquotes
  s = s.replace(/^\s*>\s?/gm, "");
  // Tables (keep cell text)
  s = s.replace(/^\s*\|/gm, "");
  s = s.replace(/\|\s*$/gm, "");
  s = s.replace(/\|/g, "  ");
  // Lists
  s = s.replace(/^\s*[-*+]\s+/gm, "");
  s = s.replace(/^\s*\d+\.\s+/gm, "");
  return normalizeText(s);
}

function flattenJson(value, out = []) {
  if (value == null) return out;
  if (typeof value === "string") {
    const t = value.trim();
    if (t) out.push(t);
    return out;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    out.push(String(value));
    return out;
  }
  if (Array.isArray(value)) {
    for (const v of value) flattenJson(v, out);
    return out;
  }
  if (typeof value === "object") {
    for (const [, v] of Object.entries(value)) flattenJson(v, out);
    return out;
  }
  return out;
}

function normalizeText(s) {
  return s
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function section(title, body) {
  const t = normalizeText(body || "");
  if (!t) return "";
  return `===== ${title} =====\n${t}\n`;
}

function tryRead(p) {
  try {
    return fs.readFileSync(p, "utf-8");
  } catch {
    return "";
  }
}

function main() {
  const chunks = [];

  const htmlSnapshot = path.join(REPO_ROOT, "portfolio (1).html");
  if (fs.existsSync(htmlSnapshot)) {
    const html = tryRead(htmlSnapshot);
    chunks.push(section("HTML Snapshot (portfolio (1).html)", htmlToText(html)));
  }

  const contentDir = path.join(REPO_ROOT, "content");
  const contentFiles = walkDir(contentDir).filter((p) => /\.(md|mdx)$/i.test(p));
  for (const filePath of contentFiles) {
    const raw = tryRead(filePath);
    const { fm, body } = splitMarkdownFrontmatter(raw);
    const fmText = frontmatterToText(fm);
    const bodyText = stripMarkdown(body);
    const rel = path.relative(REPO_ROOT, filePath);
    chunks.push(section(rel, [fmText, bodyText].filter(Boolean).join("\n\n")));
  }

  const dataDir = path.join(REPO_ROOT, "data");
  const dataFiles = walkDir(dataDir).filter((p) => /\.json$/i.test(p));
  for (const filePath of dataFiles) {
    const raw = tryRead(filePath);
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = null;
    }
    if (!parsed) continue;
    const rel = path.relative(REPO_ROOT, filePath);
    const lines = flattenJson(parsed);
    chunks.push(section(rel, normalizeText(lines.join("\n"))));
  }

  // Final normalize + light dedupe of identical lines
  const joined = normalizeText(chunks.filter(Boolean).join("\n\n"));
  const lines = joined.split("\n");
  const outLines = [];
  let prev = "";
  for (const line of lines) {
    const t = line.trimEnd();
    if (!t) {
      if (prev !== "") outLines.push("");
      prev = "";
      continue;
    }
    if (t === prev) continue;
    outLines.push(t);
    prev = t;
  }

  fs.writeFileSync(OUTPUT_PATH, outLines.join("\n").trim() + "\n", "utf-8");
  process.stdout.write(`Wrote ${outLines.length} lines to ${path.relative(REPO_ROOT, OUTPUT_PATH)}\n`);
}

main();

