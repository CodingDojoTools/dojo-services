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
  return value && isType('object', value) && Array.isArray(value) === false;
}

export function isString(value: any): value is string {
  return isType('string', value);
}

export function isNumber(value: any): value is number {
  return isType('number', value) && isNaN(value) === false;
}

export function isUndefined(value: any): value is undefined {
  return isType('undefined', value);
}

export function isType(type: string, value: any): boolean {
  return typeof value === type;
}
