import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this.handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {}

  setEventListeners() {
    // add the submit event handler to the form and
    // the click event listener to the close icon.
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}

export default PopupWithForm;

//index.js

// const newCardPopup = new PopupWithForm('#new-card-popup',() => {})
// newCardPopup.open();
// newCardPopup.open();
