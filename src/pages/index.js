import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";

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
/*                                  Function                                  */
/* -------------------------------------------------------------------------- */

const renderCard = (cardData) => {
  const card = new Card(cardData, cardSelector, previewimagePopup);
  cardList.addItem(card.getView());
};

/* -------------------------------------------------------------------------- */
/*                               EVENT LISTENERS                              */
/* -------------------------------------------------------------------------- */

// // Edit Profile
profileEditButton.addEventListener("click", () => {
  const getUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = getUserInfo.userName;
  profileDescriptionInput.value = getUserInfo.userDescription;
  profileEditPopup.open();
});

// //Add New Card
addNewCardButton.addEventListener("click", () => addCardPopup.open());

/* -------------------------------------------------------------------------- */
/*                      Project 8 GENERATE INITIAL CARDS                      */
/* -------------------------------------------------------------------------- */

// Preview image Card
const previewimagePopup = new PopupWithImage("#preview-image-modal");
previewimagePopup.setEventListeners();

// Generate Card
const cardList = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".card__list"
);

cardList.renderItems();

/* -------------------------------------------------------------------------- */
/*                      Project 7 Form Input Validation                       */
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
  renderCard(cardData);
});

addCardPopup.setEventListeners();
