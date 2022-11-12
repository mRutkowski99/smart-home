export function checkEnumKey(
  enumType: { [s: number]: string },
  key: string
): boolean {
  return Object.keys(enumType).some((enumKey) => enumKey === key);
}
