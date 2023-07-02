import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import utils from "../utils/utils.js";
import Section from "../components/section.js";
import UserInfo from "../components/UserInfo.js";
// import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* -------------------------------------------------------------------------- */
/*                                  ELEMENTS                                  */
/* -------------------------------------------------------------------------- */

// WRAPPERS
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardForm = addCardModal.querySelector(".modal__form");
const previewImageModal = document.querySelector("#preview-image-modal");

//BUTTONS AND OTHER DOM NODES
const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const previewImageModalCloseButton =
  previewImageModal.querySelector(".modal__close");
const addCardSubmitButton = addCardModal.querySelector(".modal__button");

// FORM INPUT DATA
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = addCardForm.querySelector(".modal__form-input-title");
const cardUrlInput = addCardForm.querySelector(".modal__form-input-URL");

//CARD LIST & TEMPLATE
const cardListEl = document.querySelector(".card__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardSelector = "#card-template";

/* -------------------------------------------------------------------------- */
/*                               EVENT HANDLERS                               */
/* -------------------------------------------------------------------------- */

// function handleProfileEditSubmit(e) {
//   e.preventDefault();
//   profileTitle.textContent = profileTitleInput.value;
//   profileDescription.textContent = profileDescriptionInput.value;
//   utils.closeModal(profileEditModal);
// }

// function handleAddCardFormSubmit(e) {
//   e.preventDefault();
//   const name = cardTitleInput.value;
//   const link = cardUrlInput.value;
//   renderCard({ name, link }, cardListEl);
//   addCardForm.reset();
//   utils.closeModal(addCardModal);
//   addCardFormValidator.disableButton();
// }

/* -------------------------------------------------------------------------- */
/*                               EVENT LISTENERS                              */
/* -------------------------------------------------------------------------- */

// // Edit Profile
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  utils.openModal(profileEditModal);
});

profileModalCloseButton.addEventListener("click", () =>
  utils.closeModal(profileEditModal)
);

// profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// //Add New Card
// addNewCardButton.addEventListener("click", () => utils.openModal(addCardModal));

// addCardModalCloseButton.addEventListener("click", () =>
//   utils.closeModal(addCardModal)
// );

// addCardForm.addEventListener("submit", handleAddCardFormSubmit);

// //Preview Image
// previewImageModalCloseButton.addEventListener("click", () =>
//   utils.closeModal(previewImageModal)
// );

/* -------------------------------------------------------------------------- */
/*                           GENERATE INITIAL CARDS                           */
/* -------------------------------------------------------------------------- */

const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, cardSelector);
      cardList.addItem(card.getView());
    },
  },
  ".card__list"
);

cardList.renderItems();

/* -------------------------------Project 7 Create Card ------------------------------ */
// initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

// function renderCard(cardData, wrapper) {
//   // delete below code later
//   // const cardElement = getCardElement(cardData);
//   // wrapper.prepend(cardElement);

//   const card = new Card(cardData, cardSelector);
//   wrapper.prepend(card.getView());
// }

/* -------------------------------------------------------------------------- */
/*                           Form Input Validation                            */
/* -------------------------------------------------------------------------- */

const validationSettings = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input-error",
  errorClass: "modal__input-error_visible",
};

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addCardFormValidator = new FormValidator(validationSettings, addCardForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                                  Project 8                                 */
/* -------------------------------------------------------------------------- */

// Edit Profile Info
const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userDescriptionSelector: ".profile__description",
});

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (inputValues) => {
    userInfo.setUserInfo(inputValues);
  }
);

profileEditPopup.setEventListeners();

// Add New Card

const addCardPopup = new PopupWithForm("#add-card-modal", (cardData) => {
  const card = new Card(cardData, cardSelector);
  cardList.addItem(card.getView());
});

addCardPopup.setEventListeners();

// Preview Image
// const imagePopup = new PopupWithImage("preview-image-modal");
