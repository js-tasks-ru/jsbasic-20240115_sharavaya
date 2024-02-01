function getMinMax(str) {
  let result = {};
  let newArr = [];
  let numbers = str.split(" ");
  for (let number of numbers) {
    newArr.push(parseFloat(number));
  }

  let min = newArr[0];
  let max = newArr[0];
  for (let i = 1; i < newArr.length; i++) {
    if (newArr[i] < min) {
      min = newArr[i];
    }
    if (newArr[i] > max) {
      max = newArr[i];
    }
  }

  result.min = min;
  result.max = max;

  return result;
}

// function getMinMax(str) {
//   let result = {};
//   let newArr = [];
//   str.split(' ')
//   for (let symb of str) {
//     if (symb === Number) {
//       newArr.push(symb)
//     }
//   }
//   let min = newArr[0];
//   let max = newArr[0];
//   for (let index = 0; index < newArr.length; index += 1) {
//      if (arr[i] < min) {
//       min = newArr[i];
//     }
//     if (arr[i] > max) {
//       max = newArr[i];
//     }
// }
//   result.min
//   result.max
//   return result
// }
