/* eslint-disable */

const sortByAscii = (arr, key) => {
  arr.sort((a, b) => {
    const strA = a[key];
    const strB = b[key];
    const minLen = Math.min(strA.length, strB.length);
    for (let i = 0; i < minLen; i++) {
      if (strA[i].charCodeAt() === strB[i].charCodeAt()) {
        continue;
      }
      return strA[i].charCodeAt() - strB[i].charCodeAt();
    }
    return strA.length - strB.length;
  });
};

const sortByNumber = (arr, key) => {
  arr.sort((a, b) => a[key] - b[key]);
};

export {
  sortByNumber,
  sortByAscii,
};
