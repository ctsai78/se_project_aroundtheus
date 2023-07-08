export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupElementCloseButton =
      this._popupElement.querySelector(".modal__close");
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", () => this._handleEscClose());
    this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose());
  }

  _handleEscClose = () => {
    if (event.key === "Escape") {
      this.close();
    }
  };

  setEventListeners = () => {
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close(evt.target);
      }
    });

    this._popupElementCloseButton.addEventListener("click", () => {
      this.close();
    });
  };
}
