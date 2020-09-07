export function currency(number: number) {
  return new Intl.NumberFormat().format(number);
}
