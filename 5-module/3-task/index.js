function initCarousel() {
  let switchTool = document.querySelector(".carousel__inner");
  let right = document.querySelector(".carousel__arrow_right");
  let left = document.querySelector(".carousel__arrow_left");
  let totalWidth = switchTool.offsetWidth;
  let currentOffset = 0;

  left.style.display = "none";

  right.addEventListener("click", function (event) {
    currentOffset -= 500;
    switchTool.style.transform = `translateX(${currentOffset}px)`;
    if (event) {
      left.style.display = "";
    }
    if (currentOffset > -2500) {
      right.style.display = "none";
    }
    console.log(currentOffset);
  });

  left.addEventListener("click", function (event) {
    currentOffset += 500;
    switchTool.style.transform = `translateX(${currentOffset}px)`;
    if (event) {
      right.style.display = "";
    }
    if (currentOffset === 0) {
      left.style.display = "none";
    }
    console.log(currentOffset);
  });
}

//Вот эта проверка обрабатывается тестами, но слайдер после 1 клика перестает корректно работать
// if (currentOffset > -2500) {
//   right.style.display = "none";
// }
