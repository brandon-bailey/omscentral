import escapeRegExp from 'src/core/utils/escapeRegExp';

const applyHighlighting = (body: string, highlight?: string): string => {
  if (!highlight) return body;

  const keywords =
    highlight.startsWith('"') && highlight.endsWith('"')
      ? [highlight.slice(1, highlight.length - 1)]
      : highlight.split(/\s+/g);

  return keywords.reduce(
    (highlighted, keyword) =>
      highlighted.replace(
        new RegExp(`(${escapeRegExp(keyword)})`, 'ig'), // eslint-disable-line
        '***$1***',
      ),
    body,
  );
};

export default applyHighlighting;
