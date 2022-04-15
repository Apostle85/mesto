const showInputError = (
  parameterObject,
  formElement,
  inputElement,
  errorMessage
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(parameterObject.inputErrorClass);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(parameterObject.errorClass);
};

const hideInputError = (parameterObject, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(parameterObject.inputErrorClass);

  errorElement.classList.remove(parameterObject.errorClass);
  errorElement.textContent = "";
};

const hasInvalidInput = (inputList) =>
  inputList.some((input) => {
      console.log(input.validationMessage);
      return !input.validity.valid;
    });

const toggleButtonState = (parameterObject, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(parameterObject.inactiveButtonClass);
    buttonElement.setAttribute('disabled','');
    console.log('button is disabled');
  } else {
    buttonElement.classList.remove(parameterObject.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

const checkInputValidity = (parameterObject, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(
      parameterObject,
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputError(parameterObject, formElement, inputElement);
  }
};


const setEventListeners = (parameterObject, formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(parameterObject.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    parameterObject.submitButtonSelector
  );

  toggleButtonState(parameterObject, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(parameterObject, formElement, inputElement);
      toggleButtonState(parameterObject, inputList, buttonElement);
    });
  });
};

const enableValidation = (parameterObject) => {
  const formList = Array.from(
    document.querySelectorAll(parameterObject.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListeners(parameterObject, formElement);
  });
};

// Включение валидации вызовом enableValidation с объектом параметров
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
