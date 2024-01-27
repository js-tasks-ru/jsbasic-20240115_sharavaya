function sumSalary(salaries) {
  let summary = 0;

  for (let key in salaries) {
    if (!isNaN(salaries[key]) && isFinite(salaries[key])) {
      summary += salaries[key];
    }
  }
  return parseInt(summary);
}
