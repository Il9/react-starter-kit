export function compactJoin(array: unknown[], separator?: string) {
  return array.filter(val => val).join(separator);
}

export function deepMap<T, R = unknown>(array: (T | T[])[], callback: (item: T, index: number) => R) {
  return array.map((item, index) => (Array.isArray(item) ? item.map(callback) : callback(item, index)));
}

export function isLast(array: unknown[], index: number) {
  return array.length - 1 === index;
}

export function shuffle<T = unknown>(array: T[]) {
  return array
    .map(value => ({ sort: Math.random(), value }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export function range(start = 0, length?: number) {
  const overrideStart = length ? start : 0;
  const overrideLength = length || start;

  const rangeDirection = overrideLength >= 0 ? 1 : -1;

  return [...Array(overrideLength * rangeDirection).keys()].map(k => k * rangeDirection + overrideStart);
}

export function move<T = unknown>(array: T[], oldIndex: number, newIndex: number) {
  const copyArray = [...array];

  copyArray.splice(newIndex, 0, copyArray.splice(oldIndex, 1)[0]);

  return copyArray;
}

export function last<T = unknown>(array: T[]): T | undefined {
  return array[array.length - 1];
}
