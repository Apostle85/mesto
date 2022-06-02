//--------
// Импорт
//--------

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  popupWithImageSelector,
  cardSelector,
  cardListSelector,
  popupProfileSelector,
  userNameSelector,
  userDescriptionSelector,
  popupCardAddSelector,
} from "../utils/constants.js";
import "./index.css";


//--------
// Данные
//--------

// Создаем экземпляр блока информации о пользователе
const userInfo = new UserInfo({
  userNameSelector: userNameSelector,
  userDescriptionSelector: userDescriptionSelector,
});


// Создаем попап с картинкой
const popupWithImage = new PopupWithImage({}, popupWithImageSelector);
popupWithImage.setEventListeners();


// Создаем попап редактирования профиля
const popupProfile = new PopupWithForm(
  {
    renderer: (inputObject) => {
      userInfo.setUserInfo(inputObject.title, inputObject.subtitle);
    },
  },
  popupProfileSelector
);
popupProfile.setEventListeners();

// Кнопка изменения данных, открытия попапа и ее обработчик нажатия
const profileEditButton = document.querySelector(".profile__button_type_edit");
profileEditButton.addEventListener('click', () => popupProfile.open());


// Создаем список карточек
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      
      // Создаем карточку
      const card = new Card(
        {
          title: item.title,
          image: item.image,
          handleCardClick: () => {
            popupWithImage.setSRC(item.image);
            popupWithImage.setTitle(item.title);
            popupWithImage.open();
          },
        },
        cardSelector
      );

      // Создаем DOM-элемент и Добавляем в разметку
      const cardElement = card.createCard();
      cardList.addItem(cardElement);
    },
  },
  cardListSelector
);

cardList.renderItems();


// Создаем попап создания карточки
const popupCardAdd = new PopupWithForm(
  {
    renderer: (inputObject) => {
      console.log(inputObject);
      // Создаем карточку
      const card = new Card(
        {
          title: inputObject.name,
          image: inputObject.ref,
          handleCardClick: () => {
            popupWithImage.setSRC(inputObject.ref);
            popupWithImage.setTitle(inputObject.name);
            popupWithImage.open();
          },
        },
        cardSelector
      );

      // Создаем DOM-элемент и Добавляем в разметку
      const cardElement = card.createCard();
      console.log(cardElement);
      cardList.addItem(cardElement);
    },
  },
  popupCardAddSelector
);
popupCardAdd.setEventListeners();

// Кнопка открытия попапа
const cardAddButton = document.querySelector(".profile__button_type_add");
cardAddButton.addEventListener("click", () => popupCardAdd.open());



//-----------
// Валидация
//-----------

//#region Валидация

// Включение валидации для всех форм вызовом enableValidation с объектом параметров
const formList = Array.from(document.querySelectorAll(".popup__form"));

formList.forEach((form) => {
  const formValidator = new FormValidator(
    {
      formSelector: ".popup__form",
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__button",
      inactiveButtonClass: "popup__button_disabled",
      inputErrorClass: "popup__input_type_error",
      errorClass: "popup__error_visible",
    },
    form
  );
  formValidator.enableValidation();
});

//#endregion
