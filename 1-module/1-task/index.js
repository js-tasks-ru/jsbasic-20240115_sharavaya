function factorial(n) {
  let fact = 1;
  for (let i = 1; i <= n; i++) {
    fact = fact * i;
  }
  return fact;
}
// n! = n * (n - 1) * (n - 2) * ...*1
// 5! = 5 * (4) * (3) * ...*1
