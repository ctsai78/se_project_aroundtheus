import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import utils from "../utils/utils.js";

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
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */

// function handleEscape(event) {
//   if (event.key === "Escape") {
//     const openedModal = document.querySelector(".modal_opened");
//     closeModal(openedModal);
//   }
// }

// function openModal(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", handleEscape);
//   modal.addEventListener("mousedown", closeModalOnRemoteClick);
// }

// function openModalPreview(modal, cardData) {
//   const cardImagePreviewEl = previewImageModal.querySelector(
//     ".modal__image_preview"
//   );
//   const cardTitlePreviewEl = previewImageModal.querySelector(
//     ".modal__title_preview"
//   );
//   cardImagePreviewEl.src = cardData.link;
//   cardImagePreviewEl.alt = cardData.name;
//   cardTitlePreviewEl.textContent = cardData.name;
//   openModal(modal);
// }

// function closeModal(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", handleEscape);
//   modal.removeEventListener("mousedown", closeModalOnRemoteClick);
// }

// function getCardElement(cardData) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImageEl = cardElement.querySelector(".card__image");
//   const cardTitleEl = cardElement.querySelector(".card__title");
//   const likeButton = cardElement.querySelector(".card__like-button");
//   const deleteButton = cardElement.querySelector(".card__delete-button");

//   likeButton.addEventListener("click", () => {
//     likeButton.classList.toggle("card__like-button_active");
//   });

//   deleteButton.addEventListener("click", () => {
//     cardElement.remove();
//   });

//   cardImageEl.addEventListener("click", () =>
//     openModalPreview(previewImageModal, cardData)
//   );
//   cardImageEl.src = cardData.link;
//   cardImageEl.alt = cardData.name;
//   cardTitleEl.textContent = cardData.name;
//   return cardElement;
// }

// function disabledButton(submitButton, { inactiveButtonClass }) {
//   submitButton.classList.add(inactiveButtonClass);
//   submitButton.disabled = true;
// }

/* -------------------------------------------------------------------------- */
/*                               EVENT HANDLERS                               */
/* -------------------------------------------------------------------------- */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  utils.closeModal(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  addCardForm.reset();
  utils.closeModal(addCardModal);
  addCardFormValidator.disableButton();
}

// function closeModalOnRemoteClick(evt) {
//   // target is the element on which the event happened
//   // currentTarget is the popup
//   // if they are the same then we should close the popup
//   if (evt.target === evt.currentTarget) {
//     utils.closeModal(evt.target);
//   }
// }
/* -------------------------------------------------------------------------- */
/*                               EVENT LISTENERS                              */
/* -------------------------------------------------------------------------- */

// Edit Profile
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  utils.openModal(profileEditModal);
});
profileModalCloseButton.addEventListener("click", () =>
  utils.closeModal(profileEditModal)
);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

//Add New Card
addNewCardButton.addEventListener("click", () => utils.openModal(addCardModal));

addCardModalCloseButton.addEventListener("click", () =>
  utils.closeModal(addCardModal)
);

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

//Preview Image
previewImageModalCloseButton.addEventListener("click", () =>
  utils.closeModal(previewImageModal)
);

/* -------------------------------------------------------------------------- */
/*                           GENERATE INITIAL CARDS                           */
/* -------------------------------------------------------------------------- */

const cardList = new Section(
  {
    initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, cardSelector);
      return card;
    },
  },
  card__list
);

cardList.addItem;

/* ------------------------------- Create Card ------------------------------ */
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

// const userInfo = new UserInfo({
//   userNameSelector: profile__title,
//   userDescriptionSelector: profile__description,
// });

// const imagePopup = new PopupWithImage(preview-image-modal);