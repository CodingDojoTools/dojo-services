/**
 * Determine if passed value is within range of min and max
 *
 * @export
 * @param {number} number
 * @param {number} [min=0]
 * @param {number} [max=1]
 * @returns {boolean}
 */
export function inRange(
  number: number,
  min: number = 0,
  max: number = 1
): boolean {
  return number >= Math.min(min, max) && number < Math.max(min, max);
}

/**
 * Flatten array of arrays
 *
 * @export
 * @template T
 * @param {((T | T[])[])} arrays
 * @param {T[]} [results=[]]
 * @returns {T[]}
 */
export function flatten<T>(arrays: (T | T[])[], results: T[] = []): T[] {
  for (const array of arrays) {
    if (Array.isArray(array)) {
      flatten(array, results);
    } else {
      results.push(array);
    }
  }

  return results;
}

export function isEmpty(value: any): boolean {
  if (isString(value)) {
    return value.trim().length === 0;
  }

  if (isType('object', value)) {
    if (not(Array.isArray(value))) {
      value = Object.keys(value);
    }
    return value.length === 0;
  }

  return not(value);
}

export function not(value: any): boolean {
  return !value;
}

/**
 *
 *
 * @export
 * @template T
 * @param {string} field
 * @param {T} object
 * @returns {boolean}
 */
export function inObject<T extends object, K extends keyof T>(
  field: K,
  object: T
): boolean {
  return field in object;
}

export function isObject(value: any): value is object {
  return value && isType('object', value) && not(Array.isArray(value));
}

export function isString(value: any): value is string {
  return isType('string', value);
}

export function isNumber(value: any): value is number {
  return isType('number', value) && not(isNaN(value));
}

export function isUndefined(value: any): value is undefined {
  return isType('undefined', value);
}

export function isType(type: string, value: any): boolean {
  return typeof value === type;
}

/**
 * Generate a random number between max and min
 *
 * @export
 * @param {number} [max=1]
 * @param {number} [min=0]
 * @returns {number}
 */
export function randomNumber(max = 1, min = 0): number {
  const actualMin = Math.min(min, max);
  const actualMax = Math.max(min, max);
  return Math.floor(Math.random() * (actualMax - actualMin) + actualMin);
}

export function titleize(string: string) {
  return string.replace(/\w[^\s-]*/g, word => {
    return word.charAt(0).toUpperCase() + word.substr(1);
  });
}
