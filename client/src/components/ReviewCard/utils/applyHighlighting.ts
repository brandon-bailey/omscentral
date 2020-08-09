const applyHighlighting = (body: string, highlight?: string): string => {
  if (!highlight) return body;

  const keywords =
    highlight.startsWith('"') && highlight.endsWith('"')
      ? [highlight.slice(1, highlight.length - 1)]
      : highlight.split(/\s+/g);

  return keywords.reduce(
    (highlighted, keyword) =>
      // eslint-disable-next-line
      highlighted.replace(new RegExp(`(${keyword})`, 'ig'), '***$1***'),
    body,
  );
};

export default applyHighlighting;
