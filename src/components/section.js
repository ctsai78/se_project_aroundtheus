import Card from "./Card";

class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items - items;
    this._renderer = renderer;
    this.container = document.querySelector(".${containerSelector");
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
      this.addItem(card.getView());
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

export default Section;
