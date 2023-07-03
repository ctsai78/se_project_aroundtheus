import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // this._popupImage = document.querySelector("#${popupSelector}");
  }

  open(name, link) {
    // add an image to the popup and the corresponding image src attribute along with a caption for the image.
    this._popupElement.querySelector(".modal__title_preview").textContent =
      name;
    const image = this._popupElement.querySelector(".modal__image_preview");
    image.src = link;
    image.alt = "${name}";
    super.open();
  }

  close() {
    super.close();
  }
}

export default PopupWithImage;
