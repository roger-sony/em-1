export function convertHexColorToRgba(hex: string, opacity: number) {
  hex = (hex || '').replace('#', '');
  const r = parseInt(hex.substring(0, hex.length / 3), 16);
  const g = parseInt(hex.substring(hex.length / 3, (2 * hex.length) / 3), 16);
  const b = parseInt(hex.substring((2 * hex.length) / 3, (3 * hex.length) / 3), 16);

  return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
}
