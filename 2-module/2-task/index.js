function isEmpty(obj) {
  for (let key in obj) {
    if (key in obj || obj.key === undefined) {
      return false;
    }
  }
  return true;
}
