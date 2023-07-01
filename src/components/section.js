import Card from "./Card";

class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((cardData) => {
      this._renderer(cardData);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

export default Section;
