class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userDescriptionElement = document.querySelector(
      userDescriptionSelector
    );
  }

  setUserInfo(inputValues) {
    this._userNameElement.textContent = inputValues.title;
    this._userDescriptionElement.textContent = inputValues.description;
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userDescription: this._userDescriptionElement.textContent,
    };
  }
}

export default UserInfo;
