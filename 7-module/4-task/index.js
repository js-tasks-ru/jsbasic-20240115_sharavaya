export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.renderSlider();
    this.thumb = this.elem.querySelector(".slider__thumb");
    this.progress = this.elem.querySelector(".slider__progress");
    this.stepsElements = this.elem.querySelectorAll(".slider__steps span");

    this.thumb.addEventListener("pointerdown", (event) =>
      this.onThumbPointerDown(event)
    );
    this.elem.addEventListener("click", (event) => this.onSliderClick(event));

    this.setValue(this.value);
  }

  renderSlider() {
    const slider = document.createElement("div");
    slider.classList.add("slider");
    slider.innerHTML = `
            <div class="slider__thumb" draggable="true"><span class="slider__value">0</span></div>
            <div class="slider__progress"></div>
            <div class="slider__steps">
                ${Array(this.steps).fill("<span></span>").join("")}
            </div>
       `;
    return slider;
  }

  setValue(newValue) {
    this.value = newValue;
    this.thumb.querySelector(".slider__value").textContent = this.value;
    this.stepsElements.forEach((step, index) => {
      step.classList.toggle("slider__step-active", index === this.value);
    });

    const leftPercents = (100 * this.value) / (this.steps - 1);
    this.thumb.style.left = `${leftPercents}%`;
    this.progress.style.width = `${leftPercents}%`;
  }

  emitChangeEvent(value) {
    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: value,
        bubbles: true,
      })
    );
  }

  onThumbPointerDown = (event) => {
    event.preventDefault();

    this.elem.classList.add("slider_dragging");

    const moveThumb = (event) => {
      const sliderRect = this.elem.getBoundingClientRect();
      let newValue = Math.round(
        ((event.clientX - sliderRect.left) / sliderRect.width) *
          (this.steps - 1)
      );

      if (newValue < 0) {
        newValue = 0;
      } else if (newValue > this.steps - 1) {
        newValue = this.steps - 1;
      }

      this.setValue(newValue);
    };

    const stopMoveThumb = () => {
      this.elem.classList.remove("slider_dragging");
      document.removeEventListener("pointermove", moveThumb);
      document.removeEventListener("pointerup", stopMoveThumb);

      this.emitChangeEvent(this.value);
    };

    document.addEventListener("pointermove", moveThumb);
    document.addEventListener("pointerup", stopMoveThumb);
  };

  onSliderClick = (event) => {
    if (!event.target.classList.contains("slider__thumb")) {
      const newValue = Math.round(
        ((event.clientX - this.elem.getBoundingClientRect().left) /
          this.elem.offsetWidth) *
          (this.steps - 1)
      );
      this.setValue(newValue);
      this.emitChangeEvent(newValue);
    }
  };
}
