// Класс отрисовки объектов
export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Отрисовка всех элементов
  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  // Добавление DOM-элемента в контейнер в разметке
  addItem(element) {
    this._container.prepend(element);
  }
}
