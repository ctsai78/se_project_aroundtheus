/* -------------------------------------------------------------------------- */
/*                                  ELEMENTS                                  */
/* -------------------------------------------------------------------------- */

//WRAPPERS
const previewImageModal = document.querySelector("#preview-image-modal");

/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */
function openModal(modal) {
  modal.classList.add("modal_opened");
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
  //   previewImageModal.addEventListener("mousedown", closeModalOnRemoteClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
  modal.removeEventListener("mousedown", closeModalOnRemoteClick);
}

/* -------------------------------------------------------------------------- */
/*                               EVENT HANDLERS                               */
/* -------------------------------------------------------------------------- */

function handleEscape(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function closeModalOnRemoteClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}

export default {
  previewImageModal,
  openModal,
  openModalPreview,
  closeModal,
  handleEscape,
  closeModalOnRemoteClick,
};
