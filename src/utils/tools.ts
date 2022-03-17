function removeKeyFromObj<T extends Record<string, any>, U extends keyof T>(
  obj: T,
  removeKeyArr: U[],
): {
  [P in Exclude<keyof T, U>]: T[P];
} {
  return Object.entries(obj).reduce<any>((p, n) => {
    if (!removeKeyArr.includes(n[0] as U)) {
      return {
        ...p,
        [n[0]]: n[1],
      };
    }
    return p;
  }, {});
}

/**
 * value 是否为空对象或者 falsy 值
 * */
function isFalsyOrEmptyObject<T>(value: T) {
  if(!value) {
    return true;
  }
  
  return !Object.keys(value).length;
}

function isArray<T>(value: T) {
  return Array.isArray(value);
}

export { removeKeyFromObj, isFalsyOrEmptyObject, isArray }