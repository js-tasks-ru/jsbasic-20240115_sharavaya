function showSalary(users, age) {
  let filtered = users.filter((user) => user.age <= age);
  let propperStr = filtered
    .map((user) => `${user.name}, ${user.balance}`)
    .join("\n");
  return propperStr;
}

// function showSalary(users,age) {
//   let result = [];

//   for (let user of users) {
//   let propperUser = users
//     .filter(user => user.age <= age)
//     // .map(user => user.name)

//   let wallet = users
//   .filter(user => user.name == propperUser)
//   // .map(user => user.balance)

//   let filtered = propperUser + wallet

//   let result = filtered.map((user) => `${propperUser} ${wallet}`)

//   }
//  return result.join('\n')
// }
