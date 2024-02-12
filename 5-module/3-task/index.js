function initCarousel() {
  let switchTool = document.querySelector(".carousel__inner");
  let right = document.querySelector(".carousel__arrow_right");
  let left = document.querySelector(".carousel__arrow_left");
  let totalWidth = switchTool.offsetWidth;
  let currentOffset = 0;
  let maxOffset = -(totalWidth * 3);

  left.style.display = "none";

  right.addEventListener("click", function (event) {
    currentOffset -= totalWidth;
    switchTool.style.transform = `translateX(${currentOffset}px)`;
    if (event) {
      left.style.display = "";
    }
    if (currentOffset <= maxOffset) {
      right.style.display = "none";
    }
    console.log(currentOffset);
  });

  left.addEventListener("click", function (event) {
    currentOffset += totalWidth;
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
