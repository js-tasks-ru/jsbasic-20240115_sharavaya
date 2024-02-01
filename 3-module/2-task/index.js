function filterRange(arr, a, b) {
  let newArr = [];
  for (let num of arr) {
    if (num <= b && num >= a) {
      newArr.push(num);
    }
  }
  return newArr;
}
