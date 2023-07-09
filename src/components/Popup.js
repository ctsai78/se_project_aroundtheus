export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupElementCloseButton =
      this._popupElement.querySelector(".modal__close");
    this.close = this.close.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    this._setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    this._removeEventListeners();
  }

  _setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);

    this._popupElement.addEventListener(
      "mousedown",
      this._handleOutsideClickClose
    );

    this._popupElementCloseButton.addEventListener("click", () => {
      this.close();
    });
  }

  _removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscClose);

    this._popupElement.removeEventListener(
      "mousedown",
      this._handleOutsideClickClose
    );

    this._popupElementCloseButton.removeEventListener("click", () => {
      this.close();
    });
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleOutsideClickClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  };
}
