import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";

/* -------------------------------------------------------------------------- */
/*                                  ELEMENTS                                  */
/* -------------------------------------------------------------------------- */

// UserInfo
let userID;

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
let cardList;
const cardListEl = document.querySelector(".card__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardSelector = "#card-template";

/* -------------------------------------------------------------------------- */
/*                                  Function                                  */
/* -------------------------------------------------------------------------- */

const renderCard = (cardData) => {
  const card = new Card(
    cardData,
    cardSelector,
    userID,
    // handleImageClick
    (name, link) => previewimagePopup.open(name, link),
    // handleDeleteClick
    (cardID) => {
      deleteCardPopup.setSubmitAction(() => {
        api.deleteCard(cardID).then(() => {
          card.removeCard(), deleteCardPopup.close();
        });
      });
      deleteCardPopup.open();
    },
    // handleCardLike
    (cardID) => {
      api.likeCard(cardID).then((cardLike) => Card.displayCardLike(cardLike));
    },
    // handleCardUnLike
    (cardID) => {
      api.unlikeCard(cardID).then((cardLike) => Card.displayCardLike(cardLike));
    }
  );
  cardList.addItem(card.getView());
};

/* -------------------------------------------------------------------------- */
/*                               EVENT LISTENERS                              */
/* -------------------------------------------------------------------------- */

// // Edit Profile
profileEditButton.addEventListener("click", () => {
  editFormValidator.disableButton();
  const userInfos = userInfo.getUserInfo();
  profileTitleInput.value = userInfos.userName;
  profileDescriptionInput.value = userInfos.userDescription;
  profileEditPopup.open();
});

// //Add New Card
addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.disableButton();
  addCardPopup.open();
});

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
/*                      Project 8 GENERATE INITIAL CARDS                      */
/* -------------------------------------------------------------------------- */

// Preview image Card
const previewimagePopup = new PopupWithImage("#preview-image-modal");

// Generate Card
// const cardList = new Section(
//   {
//     items: initialCards,
//     renderer: renderCard,
//   },
//   ".card__list"
// );

// cardList.renderItems();

/* -------------------------------------------------------------------------- */
/*                                  Project 8                                 */
/* -------------------------------------------------------------------------- */

// Edit Profile Info
// const userInfo = new UserInfo({
//   userNameSelector: ".profile__title",
//   userDescriptionSelector: ".profile__description",
// });

// const profileEditPopup = new PopupWithForm(
//   "#profile-edit-modal",
//   (inputValues) => {
//     userInfo.setUserInfo(inputValues);
//   }
// );

// Add New Card
// const addCardPopup = new PopupWithForm("#add-card-modal", (cardData) => {
//   renderCard(cardData);
// });

/* -------------------------------------------------------------------------- */
/*                                  Project 9                                 */
/* -------------------------------------------------------------------------- */

const api = new Api({
  url: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "b32399ae-a567-415e-9d15-bc2048a1a730",
    "Content-Type": "application/json",
  },
  response: (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  },
});

// 1. Loading user information from the server
api
  .getUserInfo()
  .then((user) => {
    userInfo.setUserInfo({ name: user.name, about: user.about });
    userID = user._id;
  })
  .catch((err) => {
    console.error(err);
  });

// 2. Loading cards from the server

api
  .getInitialCards()
  .then((initialCards) => {
    cardList = new Section(
      {
        items: initialCards,
        renderer: renderCard,
      },
      ".card__list"
    );

    cardList.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

// 3. Editing the profile
let userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userDescriptionSelector: ".profile__description",
});

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (inputValues) => {
    userInfo.setUserInfo(inputValues);
    api.editProfile(inputValues);
  }
);

// 4. Adding a new card
const addCardPopup = new PopupWithForm("#add-card-modal", (cardData) => {
  api.addNewCard(cardData).then((card) => {
    renderCard(card);
  });
});

// 5. & 6. Creating a popup for deleting a card
const deleteCardPopup = new PopupDeleteCard("#delete-card-modal");

// // 7. & 8. Adding and removing likes
// api.likeCard("64bb16f92a8df51ad8b11637").then((card) => {
//   if (card.likes.includes("123")) {
//     console.log(card.likes);
//   } else {
//     console.log("not liked by you");
//   }
// });
