function toggleText() {

  let hiddenButton = document.querySelector(".toggle-text-button");
  let text = document.getElementById("text");

  hiddenButton.addEventListener("click", function () {
    text.hidden = !text.hidden;
  });
}
// Погуглив нашел лаконичный метод: toggleAttribute()
// Почему он не указан в статье "Атрибуты и свойства" на уровне с set/has/remove/get ?
// function toggleText() {
// let toggleButton = document.querySelector(".toggle-text-button");
//   let div = document.querySelector("#text");
//   toggleButton.addEventListener("click", function () {
//     div.toggleAttribute("hidden");
//   });
// }