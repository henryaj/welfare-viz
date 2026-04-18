import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import fs from 'node:fs';
import { marked } from 'marked';
import markedFootnote from 'marked-footnote';

function convertFootnotesToSidenotes(html) {
  // Extract footnote definitions from the <section class="footnotes"> block
  const sectionMatch = html.match(/<section class="footnotes"[\s\S]*?<\/section>/);
  if (!sectionMatch) return html;

  const footnotes = {};
  const liPattern = /<li id="footnote-(\d+)">\s*<p>([\s\S]*?)<\/p>\s*<\/li>/g;
  let m;
  while ((m = liPattern.exec(sectionMatch[0])) !== null) {
    // Strip the backref link from the content
    const content = m[2].replace(/<a[^>]*data-footnote-backref[^>]*>[^<]*<\/a>/, '').trim();
    footnotes[m[1]] = content;
  }

  // Replace each <sup> reference: put the label inline, but move the
  // sidenote body outside the <p> so it doesn't break paragraph flow on mobile
  let result = html;
  const sidenoteMarkup = {};
  for (const [id, content] of Object.entries(footnotes)) {
    const refPattern = new RegExp(
      `<sup><a id="footnote-ref-${id}"[^>]*>\\d+</a></sup>`
    );
    result = result.replace(refPattern,
      `<label class="sidenote-number" for="sn-${id}">${id}</label><!--sidenote:${id}-->`
    );
    sidenoteMarkup[id] = `<input type="checkbox" id="sn-${id}" class="sidenote-toggle"/>` +
      `<span class="sidenote"><span class="sidenote-inline-number">${id}.</span> ${content}</span>`;
  }

  // Move each sidenote to after its containing </p>
  for (const [id, markup] of Object.entries(sidenoteMarkup)) {
    result = result.replace(
      new RegExp(`<!--sidenote:${id}-->([\\s\\S]*?)</p>`),
      `$1</p>\n${markup}`
    );
  }

  // Remove the footnotes section
  result = result.replace(/<section class="footnotes"[\s\S]*?<\/section>/, '');
  return result;
}

function contentPlugin() {
  const virtualModuleId = 'virtual:content';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;
  const copyPath = 'copy.md';

  function parseFrontmatter(md) {
    const match = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) return { meta: {}, body: md };
    const meta = {};
    for (const line of match[1].split('\n')) {
      const i = line.indexOf(':');
      if (i !== -1) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
    return { meta, body: match[2] };
  }

  function processMarkdown(md) {
    const { meta, body } = parseFrontmatter(md);

    // Replace {{widget:id ...}} blocks with mount-point divs and extract copy
    const widgetPattern = /\{\{widget:([a-z-]+)(?:\n([\s\S]*?))?\}\}/g;
    const widgetCopy = {};

    const processed = body.replace(widgetPattern, (_match, id, copyBlock) => {
      if (copyBlock) {
        const copy = {};
        for (const line of copyBlock.trim().split('\n')) {
          const i = line.indexOf(':');
          if (i !== -1) copy[line.slice(0, i).trim()] = line.slice(i + 1).trim();
        }
        widgetCopy[id] = copy;
      }
      return `<div id="widget-${id}" class="widget-mount"></div>`;
    })
    .replace(/\{\{break\}\}/g, '<div class="section-break"></div>');

    // Collect headings for TOC and add anchor IDs
    const headings = [];
    const renderer = new marked.Renderer();
    renderer.heading = function ({ text, depth }) {
      const slug = text.toLowerCase().replace(/[^\w]+/g, '-').replace(/(^-|-$)/g, '');
      headings.push({ text, slug, depth });
      return `<h${depth} id="${slug}"><a href="#${slug}">${text}</a></h${depth}>`;
    };
    renderer.link = function ({ href, text }) {
      return `<a href="${href}" target="_blank" rel="noopener">${text}</a>`;
    };

    marked.use(markedFootnote());
    let html = marked(processed.replace(/ -- /g, ' \u2013 '), { renderer });

    // Convert bottom-of-page footnotes into inline Tufte-style sidenotes
    html = convertFootnotesToSidenotes(html);

    return { html, headings, meta, widgetCopy };
  }

  return {
    name: 'content-plugin',
    resolveId(id) {
      if (id === virtualModuleId) return resolvedVirtualModuleId;
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        const md = fs.readFileSync(copyPath, 'utf-8');
        const { html, headings, meta, widgetCopy } = processMarkdown(md);
        return `export const html = ${JSON.stringify(html)};\nexport const headings = ${JSON.stringify(headings)};\nexport const meta = ${JSON.stringify(meta)};\nexport const widgetCopy = ${JSON.stringify(widgetCopy)};`;
      }
    },
    handleHotUpdate({ file, server }) {
      if (file.endsWith('copy.md')) {
        const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
        if (mod) {
          server.moduleGraph.invalidateModule(mod);
          server.ws.send({ type: 'full-reload' });
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [contentPlugin(), svelte()],
});
