import Popup from "./Popup.js";
import UserInfo from "./UserInfo.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    // collects data from all the input fields and returns that data as an object
    return (this._popupFormInputs =
      this._popupForm.querySelectorAll("modal__form-input"));
  }

  setEventListeners() {
    this._popupForm.addEventListener(
      "submit",
      this._handleFormSubmit(this._popupFormInputs.value)
    );
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}

export default PopupWithForm;
