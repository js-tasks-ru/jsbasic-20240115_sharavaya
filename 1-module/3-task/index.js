// 4th task

function ucFirst(str) {
  if (str.length >= 1) {
    firstChar = str[0].toUpperCase();
    remainingString = str.slice(1);
    str = firstChar + remainingString;

    return str;
  }

  if (str === "") {
    return "";
  }
}

// if (str.length == 1) {
//   return str.toUpperCase();
// }
