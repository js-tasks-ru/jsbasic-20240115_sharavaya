// 5th task
function checkSpam(str) {
  if (
    str.includes("xxx") ||
    str.includes("XXX") ||
    str.includes("1x") ||
    str.includes("1X")
  ) {
    return true;
  } else {
    return false;
  }
}
// Колхоз... НО другие способы ещё предстоит узнать
