import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentSlide = 0;
    this.render();
    this.initCarousel();
  }

  render() {
    this.elem = document.createElement("div");
    this.elem.className = "carousel";

    let innerHTML = `<div class="carousel__arrow carousel__arrow_right">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left" style="display: none;">
            <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner"></div>
    `;
    this.elem.innerHTML = innerHTML;

    let inner = this.elem.querySelector(".carousel__inner");
    this.slides.forEach((slide) => {
      let slideElem = document.createElement("div");
      slideElem.className = "carousel__slide";
      slideElem.dataset.id = slide.id;

      let img = document.createElement("img");
      img.src = `/assets/images/carousel/${slide.image}`;
      img.className = "carousel__img";
      img.alt = "slide";

      let caption = document.createElement("div");
      caption.className = "carousel__caption";

      let price = document.createElement("span");
      price.className = "carousel__price";
      price.textContent = `€${slide.price.toFixed(2)}`;

      let title = document.createElement("div");
      title.className = "carousel__title";
      title.textContent = slide.name;

      let button = document.createElement("button");
      button.type = "button";
      button.className = "carousel__button";

      let icon = document.createElement("img");
      icon.src = "/assets/images/icons/plus-icon.svg";
      icon.alt = "icon";

      button.appendChild(icon);
      caption.appendChild(price);
      caption.appendChild(title);
      caption.appendChild(button);
      slideElem.appendChild(img);
      slideElem.appendChild(caption);
      inner.appendChild(slideElem);
    });
  }

  initCarousel() {
    let switchTool = this.elem.querySelector(".carousel__inner");
    let right = this.elem.querySelector(".carousel__arrow_right");
    let left = this.elem.querySelector(".carousel__arrow_left");
    let totalWidth = switchTool.offsetWidth;
    let currentOffset = 0;
    let maxOffset = -(totalWidth * (this.slides.length - 1));

    right.addEventListener("click", () => {
      currentOffset -= this.elem.offsetWidth;
      switchTool.style.transform = `translateX(${currentOffset}px)`;
      if (currentOffset !== 0) {
        left.style.display = "";
      }
      if (currentOffset <= maxOffset) {
        right.style.display = "none";
      }
    });

    left.addEventListener("click", () => {
      currentOffset += this.elem.offsetWidth;
      switchTool.style.transform = `translateX(${currentOffset}px)`;
      if (currentOffset !== 0) {
        right.style.display = "";
      }
      if (currentOffset === 0) {
        left.style.display = "none";
      }
    });

    this.elem.addEventListener("click", (event) => {
      if (event.target.closest(".carousel__button")) {
        let slideId = event.target.closest(".carousel__slide").dataset.id;
        this.elem.dispatchEvent(
          new CustomEvent("product-add", {
            detail: slideId,
            bubbles: true,
          })
        );
      }
    });
  }
}
