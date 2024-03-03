
import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';


export default class ProductGrid {
  constructor(products) {
    this.products = products;

    this.filteredProducts = products;
    this.filters = {};
    this.render();
  }

  render() {
    this.elem = createElement(`
        <div class="products-grid">
            <div class="products-grid__inner"></div>
        </div>
    `);

    this.products.forEach((product) => {
      this.renderProductCard(product);
    });

    this.updateProductGrid();
  }

  renderProductCard(product) {
    let productCard = new ProductCard(product);
    this.elem.querySelector(".products-grid__inner").append(productCard.elem);
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this.filteredProducts = this.products.filter((product) =>
      this.filterProduct(product)
    );
    this.updateProductGrid();
  }

  filterProduct(product) {
    return Object.keys(this.filters).every((key) => {
      if (key === "noNuts" && this.filters.noNuts) {
        return !product.nuts;
      } else if (key === "vegeterianOnly" && this.filters.vegeterianOnly) {
        return product.vegeterian;
      } else if (key === "maxSpiciness" && product.spiciness !== undefined) {
        return product.spiciness <= this.filters.maxSpiciness;
      } else if (key === "category" && this.filters.category) {
        return product.category === this.filters.category;
      } else {
        return true;
      }
    });
  }

  updateProductGrid() {
    let productsGridInner = this.elem.querySelector(".products-grid__inner");
    productsGridInner.innerHTML = "";

    this.filteredProducts.forEach((product) => {
      this.renderProductCard(product);
    });

    this.filters = {};

  }
}
