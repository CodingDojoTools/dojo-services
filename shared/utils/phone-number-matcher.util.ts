export const PHONE_REGEXP = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

export function phoneMatch(number: string): boolean {
  return PHONE_REGEXP.test(number);
}
