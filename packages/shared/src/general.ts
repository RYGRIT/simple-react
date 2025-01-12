const hasOwnProperty = Object.prototype.hasOwnProperty;

export const hasOwn = (
  val: object,
  key: string | symbol,
): key is keyof typeof val => hasOwnProperty.call(val, key);

export const isFunction = (val: unknown): val is () => void =>
  typeof val === 'function';

export const isObject = (val: unknown): val is Record<string, unknown> =>
  val !== null && typeof val === 'object';

export const isPromise = <T = unknown>(val: unknown): val is Promise<T> => {
  return (
    (isObject(val) || isFunction(val)) &&
    isFunction((val as any).then) &&
    isFunction((val as any).catch)
  );
};
