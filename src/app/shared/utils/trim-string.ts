export function trimString(str: string): string {
  if (!str) {
    return;
  }
  while (str.indexOf('  ') !== -1) {
    str = str.replace(/  /g, ' ');
  }
  const tempArr = str.split('');
  tempArr.forEach((c, index) => {
    if (c === ' ' && tempArr[index + 1] === '-') {
      tempArr.splice(index, 1);
    }
    if (c === ' ' && tempArr[index - 1] === '-') {
      tempArr.splice(index, 1);
    }
  });
  return tempArr.join('').trim();
}
