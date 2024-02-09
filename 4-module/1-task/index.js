function makeFriendsList(friends) {
  const ul = document.createElement("ul");

  friends.forEach((friend) => {
    const li = document.createElement("li");
    li.innerHTML = `${friend.firstName} ${friend.lastName}`;
    ul.append(li);
  });

  return ul;
}

// Почему так не сработает?
// let html = "<ul>";

//   friends.forEach((friend) => {
//     html += (
//       <li>
//         ${friend.firstName} ${friend.lastName}
//       </li>
//     );
//   });

//   html += "</ul>";
//   return html;
