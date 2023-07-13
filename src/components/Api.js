class Api {
  constructor(options) {
    // constructor body
  }

  getUserInfo() {
    return fetch("https://around.nomoreparties.co/v1/cohort-3-en/users/me", {
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

  getInitialCards() {
    return fetch("https://around.nomoreparties.co/v1/cohort-3-en/cards", {
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

  editProfile() {
    fetch("https://around.nomoreparties.co/v1/cohort-3-en/users/me", {
      method: "PATCH",
      headers: {
        authorization: "b32399ae-a567-415e-9d15-bc2048a1a730",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Marie Skłodowska Curie",
        about: "Physicist and Chemist",
      }),
    });
  }
  addNewCard() {
    fetch("https://around.nomoreparties.co/v1/cohort-3-en/users/cards", {
      method: "POST",
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

  deleteCard() {
    fetch("https://around.nomoreparties.co/v1/groupId/cards/${cardID}", {
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

fetch("https://around.nomoreparties.co/v1/cohort-3-en/cards", {
  headers: {
    authorization: "b32399ae-a567-415e-9d15-bc2048a1a730",
  },
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
  });
