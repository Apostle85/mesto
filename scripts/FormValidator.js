export default class FormValidator{
    constructor(parameterObject, formElement){
      this._formSelector = parameterObject.formSelector;
      this._inputSelector = parameterObject.inputSelector;
      this._submitButtonSelector = parameterObject.submitButtonSelector;
      this._inactiveButtonClass = parameterObject.inactiveButtonClass;
      this._inputErrorClass = parameterObject.inputErrorClass;
      this._errorClass = parameterObject.errorClass;
      this._formElement = formElement;
    }
  
    _showInputError(
      inputElement,
      errorMessage
    ) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this._inputErrorClass);
    
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
    };
    
    _hideInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
    
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = "";
    };
    
    _hasInvalidInput(inputList){
      inputList.some((input) => {
        return !input.validity.valid;
      });
    }
    
    _toggleButtonState(inputList, buttonElement) {
      if (this._hasInvalidInput(inputList)) {
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.setAttribute("disabled", "");
      } else {
        buttonElement.classList.remove(this._inactiveButtonClass);
        buttonElement.removeAttribute("disabled");
      }
    }
    
    _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(
          inputElement,
          inputElement.validationMessage
        );
      } else {
        this._hideInputError(inputElement);
      }
    }
    
    _setEventListeners() {
      const inputList = Array.from(
        this._formElement.querySelectorAll(this._inputSelector)
      );
      const submitButtonElement = this._formElement.querySelector(
        this._submitButtonSelector
      );
      const popup = this._formElement.closest('.popup');
    
      this._toggleButtonState(inputList, submitButtonElement);
    
      inputList.forEach(inputElement => {
        if (inputElement.closest('.popup_type_profile-edit')) {
          popup.addEventListener('click', evt => {
            if (
              evt.target.classList.contains('popup__button_type_close') ||
              evt.target.classList.contains('popup__background')
            ) {
              this._hideInputError(inputElement);
            }
          });
    
          document.addEventListener('keydown', (evt) => {
            if (evt.key === 'Escape') {
              this._hideInputError(inputElement);
            }
          });
        }
        inputElement.addEventListener('input', () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState(inputList, submitButtonElement);
        });
      });
    }

    enableValidation() {
        this._formElement.addEventListener('submit', evt => evt.preventDefault());
        this._setEventListeners();
    }
    
    // enableValidation() {
    //   const formList = Array.from(
    //     document.querySelectorAll(this._formSelector)
    //   );
    //   formList.forEach(formElement => {
    //     this._formElement.addEventListener('submit', evt => evt.preventDefault());
    //     this._setEventListeners();
    //   });
    // }
  }