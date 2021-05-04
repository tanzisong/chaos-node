// export function TEST(name: string) {
//   return name;
// }
//
// function removeKeyFromObj<T extends Record<string, any>, U extends (keyof T)[]>(obj: T, removeKeyArr: U) {
//   return Object.entries(obj).reduce((p, n) => {
//     if (!removeKeyArr.includes(n[0])) {
//       return {
//         ...p,
//         [n[0]]: n[1],
//       };
//     }
//     return p;
//   }, {});
// }
//
// const element = {
//   tag: 'name',
//   props: {
//     name: 'value',
//   },
//   children: [],
//   isSelfClosing: false,
// };

// const node = removeKeyFromObj(element, ['isSelfClosing']);

// console.info(node);

let keyNum = 0;

function uniqueKey() {
  keyNum++;
  return `chao-${keyNum}`;
}

export { uniqueKey };
