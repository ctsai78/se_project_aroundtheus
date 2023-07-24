import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputValues = {};
    const popupFormInputs =
      this._popupForm.querySelectorAll(".modal__form-input");
    popupFormInputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  _handleSubmitButton = () => {
    this._handleFormSubmit(this._getInputValues());
    this.close();
  };

  _setEventListeners() {
    super._setEventListeners();
    this._popupForm.addEventListener("submit", this._handleSubmitButton);
  }

  close() {
    super.close();
    this._popupForm.reset();
    this._popupForm.removeEventListener("submit", this._handleSubmitButton);
  }
}

export default PopupWithForm;
