import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    const image = this._popupElement.querySelector(".modal__image_preview");
    this._popupElement.querySelector(".modal__title_preview").textContent =
      name;
    image.src = link;
    image.alt = `${name}`;
    super.open();
  }
}

export default PopupWithImage;
