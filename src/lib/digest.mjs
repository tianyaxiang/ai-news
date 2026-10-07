/** Read structured highlights from new reports and Markdown from historical ones. */
export function extractHighlights(markdown = '') {
  const frontmatter = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1] || '';
  const field = frontmatter.match(/^highlights:\s*(\[.*\])$/m);
  if (field) {
    try {
      const items = JSON.parse(field[1]);
      if (Array.isArray(items) && items.every(item => typeof item === 'string')) return items;
    } catch { /* Fall back to historical Markdown. */ }
  }
  const section = markdown.match(/^##[ \t]+今日要点[ \t]*\r?\n([\s\S]*?)(?=^#{1,2}[ \t]+|^[ \t]*---[ \t]*\r?$|(?![\s\S]))/m)?.[1] || '';
  return section.split(/\r?\n/).filter(line => /^\s*(?:[-*+]\s+|\d+\.\s+)/.test(line)).map(line => line.replace(/^\s*(?:[-*+]\s+|\d+\.\s+)/, '').trim());
}

export function plainText(value) {
  return value.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/\*\*|__|`/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}
