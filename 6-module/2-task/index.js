export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.elem = this.render();
  }

  render() {
    const card = document.createElement("div");
    card.className = "card";

    const cardTop = document.createElement("div");
    cardTop.className = "card__top";
    card.appendChild(cardTop);

    const img = document.createElement("img");
    img.src = `/assets/images/products/${this.product.image}`;
    img.className = "card__image";
    img.alt = "product";
    cardTop.appendChild(img);

    const price = document.createElement("span");
    price.className = "card__price";
    price.textContent = `€${this.product.price.toFixed(2)}`;
    cardTop.appendChild(price);

    const cardBody = document.createElement("div");
    cardBody.className = "card__body";
    card.appendChild(cardBody);

    const title = document.createElement("div");
    title.className = "card__title";
    title.textContent = this.product.name;
    cardBody.appendChild(title);

    const button = document.createElement("button");
    button.type = "button";
    button.className = "card__button";
    button.innerHTML =
      '<img src="/assets/images/icons/plus-icon.svg" alt="icon">';
    button.addEventListener("click", () => {
      const event = new CustomEvent("product-add", {
        detail: this.product.id,
        bubbles: true,
      });
      this.elem.dispatchEvent(event);
    });
    cardBody.appendChild(button);

    return card;
  }
}

// Вроде выглядит красиво и лаконично... Но не работает. Почему?

// export default class ProductCard {
//   constructor(product) {
//     this.product = product;
//     this.elem = this.render();
//   }
//   render() {
//     const card = createElement(`
//         <div class="card">
//             <div class="card__top">
//                 <img src="/assets/images/products/${
//                   this.product.image
//                 }" class="card__image" alt="product">
//                 <span class="card__price">€${this.product.price.toFixed(
//                   2
//                 )}</span>
//             </div>
//             <div class="card__body">
//                 <div class="card__title">${this.product.name}</div>
//                 <button type="button" class="card__button">
//                     <img src="/assets/images/icons/plus-icon.svg" alt="icon">
//                 </button>
//             </div>
//         </div>
//    `);

//     card.querySelector(".card__button").addEventListener("click", () => {
//       const event = new CustomEvent("product-add", {
//         detail: this.product.id,
//         bubbles: true,
//       });
//       this.elem.dispatchEvent(event);
//     });

//     return card;
//   }
// }
