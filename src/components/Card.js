class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._cardData = data;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__like-button_active");
    });
    this._deleteButton.addEventListener("click", () => {
      this._cardElement.remove();
    });
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
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
    return this._cardElement;
  }
}

export default Card;
