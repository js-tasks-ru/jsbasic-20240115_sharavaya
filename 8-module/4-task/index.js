import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.cartItems = [];
    this.modal = new Modal();



    this.addEventListeners();
  }

  addProduct(product) {

    if (!product) return;

    let cartItem = this.cartItems.find(
      (item) => item.product.id === product.id
    );
    if (cartItem) {
      cartItem.count++;
    } else {
      this.cartItems.push({ product, count: 1 });
    }

    this.onProductUpdate(cartItem || { product, count: 1 });
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find((item) => item.product.id === productId);
    if (cartItem) {
      cartItem.count += amount;
      if (cartItem.count <= 0) {
        this.cartItems = this.cartItems.filter(
          (item) => item.product.id !== productId
        );
      }
      this.onProductUpdate(cartItem);
      if (this.isEmpty()) {
        this.modal.close(); // Если корзина пустая
      }
    }
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((total, item) => total + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (total, item) => total + item.product.price * item.count,
      0
    );
  }  

  renderProduct(product, count) {
    return createElement(`

    <div class="cart-product" data-product-id="${product.id}">

    <div class="cart-product" data-product-id="${
      product.id
    }">

      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {

    this.modal = new Modal(); // Создаем объект this.modal
    this.modal.setTitle("Your order");
    const modalBody = document.createElement("div");
    this.cartItems.forEach((item) => {
      const productElement = this.renderProduct(item.product, item.count);
      modalBody.appendChild(productElement);
    });
    modalBody.appendChild(this.renderOrderForm());
    this.modal.setBody(modalBody);
    modalBody.addEventListener("click", (event) => {
      if (event.target.classList.contains("cart-counter__button_minus")) {
        const productId =
          event.target.closest(".cart-product").dataset.productId;
        this.updateProductCount(productId, -1);
      }
      if (event.target.classList.contains("cart-counter__button_plus")) {
        const productId =
          event.target.closest(".cart-product").dataset.productId;
        this.updateProductCount(productId, 1);
      }
    });
    modalBody
      .querySelector(".cart-form")
      .addEventListener("submit", (event) => {
        this.onSubmit(event);
      });
    this.modal.open();
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
    if (document.body.classList.contains("is-modal-open")) {
      const productId = cartItem.product.id;
      const modalBody = document.querySelector(".modal__body");
      if (modalBody) {
        const productElement = modalBody.querySelector(
          `.cart-product[data-product-id="${productId}"]`
        );
        if (productElement) {
          const productCount = productElement.querySelector(
            ".cart-counter__count"
          );
          const productPrice = productElement.querySelector(
            ".cart-product__price"
          );
          productCount.textContent = cartItem.count;
          productPrice.textContent = `€${(
            cartItem.product.price * cartItem.count
          ).toFixed(2)}`;
          const infoPrice = modalBody.querySelector(
            ".cart-buttons__info-price"
          );
          infoPrice.textContent = `€${this.getTotalPrice().toFixed(2)}`;
          if (cartItem.count === 0) {
            productElement.remove();
          }
          if (this.isEmpty()) {
            const modalTitle = document.querySelector(".modal__title");
            if (modalTitle) {
              modalTitle.textContent = "Your Cart is Empty";
            }
            this.cartItems = [];
            const modal = document.querySelector(".modal");
            if (modal && typeof modal.close === "function") {
              this.modal.close(); // Закрываем модальное окно
            }
          }
        }
      }
    }
  }

  onSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const modal = document.querySelector(".modal");

    if (!modal) {
      console.error("Modal element not found in the DOM.");
      return;
    }

    const modalTitle = modal.querySelector(".modal__title");
    const modalBody = modal.querySelector(".modal__body");

    if (!modalTitle || !modalBody) {
      console.error("Modal content elements not found in the DOM.");
      return;
    }

    modalTitle.textContent = "Processing Order...";

    fetch("https://httpbin.org/post", {
      method: "POST",
      body: new FormData(form),
    })
      .then((response) => {
        if (response.ok) {
          modalTitle.textContent = "Success!";
          modalBody.innerHTML = `
          <div class="modal__body-inner">  
              <p>  
                  Order successful! Your order is being cooked :)<br>  
                  We’ll notify you about delivery time shortly.<br>  
                  <img src="/assets/images/delivery.gif">  
              </p>  
          </div>`;
          this.cartItems = [];
          form.reset();
        } else {
          console.error("Order submission failed.");
        }
      })
      .catch((error) => {
        console.error("Error during order submission:", error);
      })
      .finally(() => {
        const submitButton = form.querySelector("[type='submit']");
        if (submitButton) {
          submitButton.disabled = false;
        }
      });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
