let keyNum = 0;

function uniqueKey() {
  keyNum++;
  return `chao-${keyNum}`;
}

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

function upperFirstLetter(name: string) {
  return name.replace(/\w/, ($0) => {
    return $0.toUpperCase();
  });
}

export { uniqueKey, removeKeyFromObj, upperFirstLetter };
