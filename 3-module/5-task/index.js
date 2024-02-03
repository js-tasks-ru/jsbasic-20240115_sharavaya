function getMinMax(str) {
  let result = {};

  let numbers = str.split(" ").map(Number);

  let min = numbers[0];
  let max = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] < min) {
      min = numbers[i];
    }
    if (numbers[i] > max) {
      max = numbers[i];
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
