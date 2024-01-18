// 6th task
function truncate(str, maxlength) {
  if (str.length > maxlength) {
    str = `${str.slice(0, maxlength - 1)}` + "…";
    return str;
  }
  if (str.length <= maxlength) {
    return str;
  }
}

// str = str.slice(0, maxlength - 1);
//     return `${str}...`;
// Вероятно тоже колхоз...
