// Класс отрисовки объектов
export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Отрисовка всех элементов
  renderItems(items, id = null) {
    items.forEach((item) => this._renderer(item,id));
  }

  // Добавление DOM-элемента в контейнер в разметке
  addItem(element) {
    this._container.prepend(element);
  }
}
