import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = document.createElement("div");
    this.elem.className = "ribbon";
    this.createRibbonMenu(); // Создаем меню ленты

    this.arrowRight.addEventListener("click", () => this.scrollRight()); // Добавляем обработчик события на клик по стрелке вправо
    this.arrowLeft.addEventListener("click", () => this.scrollLeft()); // Добавляем обработчик события на клик по стрелке влево

    this.elem.addEventListener("scroll", () => this.toggleArrows()); // Добавляем обработчик события на скролл для отображения стрелок
  }

  createRibbonMenu() {
    this.ribbonInner = document.createElement("div");
    this.ribbonInner.className = "ribbon__inner"; // Создаем внутреннюю часть ленты

    this.categories.forEach((category) => {
      const categoryLink = document.createElement("a");
      categoryLink.href = "#";
      categoryLink.className = "ribbon__item"; // Создаем элементы категорий
      categoryLink.dataset.id = category.id;
      categoryLink.textContent = category.name;

      categoryLink.addEventListener(
        "click",
        (event) => this.onCategoryClick(event) // Добавляем обработчик события на клик по категории
      );

      this.ribbonInner.appendChild(categoryLink); // Добавляем категорию в ленту
    });

    this.elem.appendChild(this.ribbonInner); // Добавляем внутреннюю часть ленты в основной элемент

    this.arrowRight = document.createElement("button");
    this.arrowRight.className = "ribbon__arrow ribbon__arrow_right"; // Создаем кнопку стрелки вправо

    this.arrowLeft = document.createElement("button");
    this.arrowLeft.className = "ribbon__arrow ribbon__arrow_left"; // Создаем кнопку стрелки влево

    this.elem.appendChild(this.arrowRight); // Добавляем кнопку стрелки вправо в основной элемент
    this.elem.appendChild(this.arrowLeft); // Добавляем кнопку стрелки влево в основной элемент
  }

  scrollRight() {
    this.ribbonInner.scrollBy(350, 0); // Прокрутка ленты вправо
  }

  scrollLeft() {
    this.ribbonInner.scrollBy(-350, 0); // Прокрутка ленты влево
  }

  toggleArrows() {
    const scrollLeft = this.ribbonInner.scrollLeft;
    const scrollWidth = this.ribbonInner.scrollWidth;
    const clientWidth = this.ribbonInner.clientWidth;

    const scrollRight = scrollWidth - scrollLeft - clientWidth; // Вычисление прокрутки вправо

    if (scrollLeft === 0) {
      this.arrowLeft.classList.remove("ribbon__arrow_visible"); // Скрытие стрелки влево
    } else {
      this.arrowLeft.classList.add("ribbon__arrow_visible"); // Отображение стрелки влево
    }

    if (scrollRight === 0) {
      this.arrowRight.classList.remove("ribbon__arrow_visible"); // Скрытие стрелки вправо
    } else {
      this.arrowRight.classList.add("ribbon__arrow_visible"); // Отображение стрелки вправо
    }
  }

  onCategoryClick(event) {
    event.preventDefault();

    const categoryLink = event.target;
    const categoryId = categoryLink.dataset.id;

    const activeCategory = this.elem.querySelector(".ribbon__item_active");
    if (activeCategory) {
      activeCategory.classList.remove("ribbon__item_active"); // Убираем выделение с предыдущей активной категории
    }

    categoryLink.classList.add("ribbon__item_active"); // Выделяем выбранную категорию

    this.elem.dispatchEvent(
      new CustomEvent("ribbon-select", {
        detail: categoryId,
        bubbles: true,
      }) // Генерируем событие выбора категории
    );
  }
}
