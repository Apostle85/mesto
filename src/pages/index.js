//--------
// Импорт
//--------

//#region Импорт

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
  profileEditButton,
  userNameSelector,
  userDescriptionSelector,
  popupCardAddSelector,
  cardAddButton,
  formValidatorObject,
} from "../utils/constants.js";
import "./index.css";

//#endregion

//--------
// Данные
//--------

//#region Данные

// Создаем экземпляр блока информации о пользователе
const userInfo = new UserInfo({
  userNameSelector: userNameSelector,
  userDescriptionSelector: userDescriptionSelector,
});

// Создаем попап с картинкой
const popupWithImage = new PopupWithImage(popupWithImageSelector);
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
const formProfile = popupProfile.getForm();

// Функция создания DOM-элемента карточки
const initCardElement = ({ title = "", image = "" }) => {
  // Создаем карточку
  const card = new Card(
    {
      title: title,
      image: image,
      handleCardClick: () => {
        popupWithImage.open({ src: image, title: title });
      },
    },
    cardSelector
  );
  // Создаем DOM-элемент и Добавляем в разметку
  return card.createCard();
};

// Создаем список карточек
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardList.addItem(initCardElement(item));
    },
  },
  cardListSelector
);
cardList.renderItems();

// Создаем попап создания карточки
const popupCardAdd = new PopupWithForm(
  {
    renderer: (inputObject) => {
      cardList.addItem(initCardElement(inputObject));
    },
  },
  popupCardAddSelector
);
popupCardAdd.setEventListeners();
const formCardAdd = popupCardAdd.getForm();

//#endregion

//-----------
// Валидация
//-----------

//#region Валидация

// Создание экземляров класса валидации форм
const profileValidation = new FormValidator(formValidatorObject, formProfile);
const cardAddValidation = new FormValidator(formValidatorObject, formCardAdd);
// Включение валидации для всех форм вызовом enableValidation с объектом параметров
profileValidation.enableValidation();
cardAddValidation.enableValidation();

//#endregion

//-----------------
// Event Listeners
//-----------------

// Обработчик нажатия открытия попапа изменения профиля и его слушатель
const handleProfileEditClick = () => {
  const userInfoObject = userInfo.getUserInfo();
  formProfile.elements.title.value = userInfoObject.userName;
  formProfile.elements.subtitle.value =
  userInfoObject.userDescription;
  profileValidation.resetValidation();
  popupProfile.open();
};
profileEditButton.addEventListener("click", handleProfileEditClick);

// Обработчик нажатия открытия попапа создания карточки и его слушатель
const handleCardAddClick = () => {
  cardAddValidation.resetValidation();
  popupCardAdd.open();
};
cardAddButton.addEventListener("click", handleCardAddClick);
