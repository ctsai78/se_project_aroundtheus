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
const modalContainer = document.querySelector(".modal__container");

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

/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */

function handleEscape(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal__opened");
    closeModal(openedModal);
  }
}

function openModal(modal) {
  modal.classList.add("modal__opened");
  document.addEventListener("keydown", handleEscape);
  modal.addEventListener("mousedown", closeModalOnRemoteClick);
}

function openModalPreview(modal, cardData) {
  const cardImagePreviewEl = previewImageModal.querySelector(
    ".modal__image_preview"
  );
  const cardTitlePreviewEl = previewImageModal.querySelector(
    ".modal__title_preview"
  );
  cardImagePreviewEl.src = cardData.link;
  cardImagePreviewEl.alt = cardData.name;
  cardTitlePreviewEl.textContent = cardData.name;
  openModal(modal);
}

function closeModal(modal) {
  modal.classList.remove("modal__opened");
  document.removeEventListener("keydown", handleEscape);
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () =>
    openModalPreview(previewImageModal, cardData)
  );
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

/* -------------------------------------------------------------------------- */
/*                               EVENT HANDLERS                               */
/* -------------------------------------------------------------------------- */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  addCardForm.reset();
  closeModal(addCardModal);
  disabledButton(addCardSubmitButton, config);
}

function closeModalOnRemoteClick(evt) {
  // target is the element on which the event happened
  // currentTarget is the popup
  // if they are the same then we should close the popup
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}
/* -------------------------------------------------------------------------- */
/*                               EVENT LISTENERS                              */
/* -------------------------------------------------------------------------- */

// Edit Profile
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

//Add New Card
addNewCardButton.addEventListener("click", () => openModal(addCardModal));

addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);

addCardForm.addEventListener("submit", handleAddCardFormSubmit);

//Preview Image
previewImageModalCloseButton.addEventListener("click", () =>
  closeModal(previewImageModal)
);

previewImageModal.addEventListener("click", () =>
  closeModal(previewImageModal)
);

/* -------------------------------------------------------------------------- */
/*                           GENERATE INITIAL CARDS                           */
/* -------------------------------------------------------------------------- */

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
