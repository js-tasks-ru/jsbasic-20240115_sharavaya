function camelize(str) {
  return str
    .split("-")
    .map((word, index) =>
      index == 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join("");
}

// str.split("-");
//   str.forEach((word, index) => {
//     str.map((word, index));
//     if (index == 0) {
//       return word;
//     } else {
//       word[0].toUpperCase() + word.slice(1);
//     }
//   });

//   str.join("");
