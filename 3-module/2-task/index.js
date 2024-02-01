function filterRange(arr, a, b) {
  let newArr = arr.filter((num) => num <= b && num >= a);
  return newArr;
}
