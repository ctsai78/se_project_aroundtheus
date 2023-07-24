class Card {
  constructor(
    data,
    cardSelector,
    userID,
    handleImageClick,
    handleDeleteClick,
    handleCardLike,
    handleCardUnLike
  ) {
    this._name = data.name;
    this._link = data.link;
    this._owner = data.owner;
    this._cardID = data._id;
    this._userID = userID;
    this._cardLike = data.likes;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleCardLike = handleCardLike;
    this._handleCardUnLike = handleCardUnLike;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this.checkCardLike();
    });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._cardID);
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
    this._likeNumber = this._cardElement.querySelector(".card__like-number");

    this._setEventListeners();

    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitleEl.textContent = this._name;

    if (this._owner._id != this._userID) {
      this._deleteButton.remove();
    }

    this.displayCardLike(this._cardLike);

    return this._cardElement;
  }

  removeCard() {
    this._cardElement.remove();
  }

  updateCardLike(cardLike) {
    this._cardLike = cardLike;
    this.displayCardLike(cardLike);
  }

  displayCardLike(cardLike) {
    this._likeNumber.textContent = cardLike.length;
    if (cardLike.some((cardLike) => cardLike._id === this._userID)) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  checkCardLike() {
    if (this._cardLike.some((cardLike) => cardLike._id === this._userID)) {
      this._handleCardUnLike(this._cardID);
    } else {
      this._handleCardLike(this._cardID);
    }
  }
}

export default Card;
