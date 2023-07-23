export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
    this._response = options.response;
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._response);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._response);
  }

  editProfile(inputValues) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: inputValues.name,
        about: inputValues.about,
      }),
    }).then(this._response);
  }

  addNewCard(cardData) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    }).then(this._response);
  }

  deleteCard(cardID) {
    return fetch(`${this._url}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._response);
  }

  likeCard(cardID) {
    return fetch(`${this._url}/cards/likes/${cardID}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._response);
  }

  unlikeCard(cardID) {
    return fetch(`${this._url}/cards/likes/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._response);
  }

  updateProfilePicture(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._response);
  }
}
