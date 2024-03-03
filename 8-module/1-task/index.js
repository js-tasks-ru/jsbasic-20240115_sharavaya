
import createElement from "../../assets/lib/create-element.js";

import createElement from '../../assets/lib/create-element.js';


export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {

      this.elem.classList.add("cart-icon_visible");

      this.elem.classList.add('cart-icon_visible');


      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>

          <span class="cart-icon__price">€${cart
            .getTotalPrice()
            .toFixed(2)}</span>

          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>

        </div>`;

      this.updatePosition();


      this.elem.classList.add("shake");
      this.elem.addEventListener(
        "transitionend",
        () => {
          this.elem.classList.remove("shake");
        },
        { once: true }
      );
    } else {
      this.elem.classList.remove("cart-icon_visible");

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');

    }
  }

  addEventListeners() {

    document.addEventListener("scroll", () => this.updatePosition());
    window.addEventListener("resize", () => this.updatePosition());
  }

  updatePosition() {
    if (!this.elem.offsetWidth && !this.elem.offsetHeight) {
      return;
    }

    if (document.documentElement.clientWidth <= 767) {
      return;
    }

    let topIndent = 50;
    let containerElement = document.querySelector(".container");

    if (!containerElement) {
      return;
    }

    let leftIndent = Math.min(
      containerElement.getBoundingClientRect().right + 20,
      document.documentElement.clientWidth - this.elem.offsetWidth - 10
    );
    leftIndent = Math.round(leftIndent);

    let iconHasSpace =
      leftIndent > this.elem.offsetWidth + 20 &&
      window.scrollY <=
        document.documentElement.scrollHeight - window.innerHeight;

    if (
      window.scrollY > topIndent &&
      this.elem.getBoundingClientRect().top < 0
    ) {
      Object.assign(this.elem.style, {
        position: "fixed",
        top: `${topIndent}px`,
        left: `${Math.max(20, leftIndent)}px`,
        zIndex: 1000,
      });
    } else if (
      window.scrollY >=
      document.documentElement.scrollHeight - window.innerHeight
    ) {
      Object.assign(this.elem.style, {
        position: "fixed",
        top: "",
        left: `${Math.max(20, leftIndent)}px`,
        zIndex: 1000,
      });
    } else if (!iconHasSpace) {
      Object.assign(this.elem.style, {
        position: "fixed",
        top: `${topIndent}px`,
        left: `${Math.max(20, leftIndent - this.elem.offsetWidth - 10)}px`,
        zIndex: 1000,
      });
    } else {
      Object.assign(this.elem.style, {
        position: "",
        top: "",
        left: "",
        zIndex: "",
      });
    }
  }
}

// updatePosition() {
//   if (!this.elem.offsetWidth && !this.elem.offsetHeight) {
//     return;
//   }

//   if (document.documentElement.clientWidth <= 767) {
//     return;
//   }

//   let topIndent = 50;
//   let containerElement = document.querySelector(".container");
//   if (!containerElement) {
//     return;
//   }

//   let leftIndent = Math.min(
//     containerElement.getBoundingClientRect().right + 20,
//     document.documentElement.clientWidth - this.elem.offsetWidth - 10
//   );
//   leftIndent = Math.round(leftIndent);

//   if (
//     window.scrollY > topIndent &&
//     this.elem.getBoundingClientRect().top < 0
//   ) {
//     Object.assign(this.elem.style, {
//       position: "fixed",
//       top: `${topIndent}px`,
//       left: `${Math.max(20, leftIndent)}px`,
//       zIndex: 1000,
//     });
//   } else {
//     Object.assign(this.elem.style, {
//       position:
//         window.scrollY >=
//         document.documentElement.scrollHeight - window.innerHeight
//           ? "fixed"
//           : "",
//       top: "",
//       left: "",
//       zIndex: "",
//     });
//   }
// }

    

  

