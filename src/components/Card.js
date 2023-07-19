class Card {
  constructor(data, cardSelector, handleImageClick, handleDeleteClick, userID) {
    this._name = data.name;
    this._link = data.link;
    this._owner = data.owner;
    this._cardID = data._id;
    this._userID = userID;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__like-button_active");
    });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._cardID, this._cardElement);
    });
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card__block")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this._setEventListeners();

    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitleEl.textContent = this._name;

    if (this._owner._id != this._userID) {
      this._deleteButton.remove();
    }

    return this._cardElement;
  }
}

export default Card;
