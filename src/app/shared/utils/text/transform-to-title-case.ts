export function transformToTitleCase(text: string): string {
  return (
    text &&
    text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  );
}
