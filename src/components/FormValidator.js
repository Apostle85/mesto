export default class FormValidator {
  constructor(parameterObject, formElement) {
    this._formSelector = parameterObject.formSelector;
    this._inputSelector = parameterObject.inputSelector;
    this._buttonSubmitSelector = parameterObject.submitButtonSelector;
    this._inactiveButtonClass = parameterObject.inactiveButtonClass;
    this._inputErrorClass = parameterObject.inputErrorClass;
    this._errorClass = parameterObject.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonSubmitElement = this._formElement.querySelector(
      this._buttonSubmitSelector
    );
  }

  // Показываем ошибку
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // Очищаем ошибку
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);

    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  // Проверка на наличие хотя бы одной ошибки в форме
  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  // В случае наличия ошибки изменение состояния кнопки отправки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonSubmitElement.classList.add(this._inactiveButtonClass);
      this._buttonSubmitElement.setAttribute("disabled", "");
    } else {
      this._buttonSubmitElement.classList.remove(this._inactiveButtonClass);
      this._buttonSubmitElement.removeAttribute("disabled");
    }
  }

  // Показ/Скрытие ошибки после проверки наличия ошибки
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Задаем слушатели событий
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Запуск валидации
  enableValidation() {
    this.resetValidation();
    this._setEventListeners();
  }

  // Сброс проверок валидации (проверок на ошибки)
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) =>
      this._hideInputError(inputElement)
    );
  }
}
