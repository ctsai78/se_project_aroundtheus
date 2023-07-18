export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  editProfile(inputValues) {
    fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: inputValues.name,
        about: inputValues.about,
      }),
    });
  }

  addNewCard(cardData) {
    fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    });
  }

  deleteCard() {
    fetch("https://around.nomoreparties.co/v1/cohort-3-en/cards/${cardID}", {
      method: "DELETE",
      headers: {
        authorization: "b32399ae-a567-415e-9d15-bc2048a1a730",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Marie Skłodowska Curie",
        link: "Physicist and Chemist",
      }),
    });
  }

  likeCard() {
    fetch(
      "https://around.nomoreparties.co/v1/cohort-3-en/cards/likes/${cardID}",
      {
        method: "PUT",
        headers: {
          authorization: "b32399ae-a567-415e-9d15-bc2048a1a730",
          "Content-Type": "application/json",
        },
      }
    );
  }

  unlikeCard() {
    fetch(
      "https://around.nomoreparties.co/v1/cohort-3-en/cards/likes/${cardID}",
      {
        method: "DELETE",
        headers: {
          authorization: "b32399ae-a567-415e-9d15-bc2048a1a730",
          "Content-Type": "application/json",
        },
      }
    );
  }

  updateProfilePicture() {
    return fetch("https://around.nomoreparties.co/v1/cohort-3-en/users/me", {
      method: "POST",
      headers: {
        authorization: "b32399ae-a567-415e-9d15-bc2048a1a730",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-42",
  headers: {
    authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
    "Content-Type": "application/json",
  },
});

// Cards should be rendered after the user information is received from the server.
// Сreate a function in Api.js and return the Promise.all() method.
// Pass the array of function calls for getting user information and t
// he list of cards to Promise.all() as a parameter.
/* ------------------------------------ - ----------------------------------- */
