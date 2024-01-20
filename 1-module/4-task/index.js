// 5th task
function checkSpam(str) {
  return (
    str.includes("xxx") ||
    str.includes("XXX") ||
    str.includes("1x") ||
    str.includes("1X")
  );
}
