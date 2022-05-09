//----------------
// Импорт классов
//----------------

import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

//--------
// Данные
//--------

const page = document.querySelector(".page");

// Попапы

// Блок попапа редактирования профиля с затемнением
const popupProfile = document.querySelector(".popup_type_profile-edit");

// Блок попапа добавления карточек с затемнением
const popupCardAdd = document.querySelector(".popup_type_card-add");

// Попап картинки
const photoPopup = document.querySelector(".popup_type_photo");

// Переменные Попапа редактирования профиля

// Попап контейнер-форма и ее обработчик отправки
const formEditProfile = popupProfile.querySelector(".popup__form");

// Переменные DOM-элементов для ввода данных попапа
const nameInput = popupProfile.querySelector(".popup__input_type_title");
const jobInput = popupProfile.querySelector(".popup__input_type_subtitle");

// Текстовые элементы блока profile
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
// Кнопка изменения данных, открытия попапа и ее обработчик нажатия
const profileEditButton = document.querySelector(".profile__button_type_edit");

// Переменные Попапа добавления карточек

// Карточки "из коробки"
const initialCards = [
  {
    title: "Архыз",
    image:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    title: "Челябинская область",
    image:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    title: "Иваново",
    image:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    title: "Камчатка",
    image:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    title: "Холмогорский район",
    image:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    title: "Байкал",
    image:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Контейнер-форма попапа
const formCardAdd = popupCardAdd.querySelector(".popup__form");

// Переменные DOM-элементов для ввода данных попапа
const cardNameInput = popupCardAdd.querySelector(
  ".popup__input_type_card-name"
);
const cardRefInput = popupCardAdd.querySelector(".popup__input_type_card-ref");

// Кнопка открытия попапа
const cardAddButton = document.querySelector(".profile__button_type_add");

// Список карточек
const cards = document.querySelector(".elements__container");
// Шаблон карточки
const cardTemplate = document.querySelector("#element").content;

// Данные попапа картинки
const popupImage = photoPopup.querySelector(".popup__image");
const popupTitle = photoPopup.querySelector(".popup__photo-description");

const photoPopupCloseButton = photoPopup.querySelector(
  ".popup__button_type_close"
);

// ----------------------
// Функции и Обработчики
// ----------------------

// Функция добавления карточки в разметку
function renderCard(card) {
  cards.prepend(card);
}

// Функция закрытия попапа
function closePopup(popup) {
  document.removeEventListener("keydown", keyDownEscapeHandler);
  popup.classList.remove("popup_opened");
}

// Обработчик нажатия на клавишу "Esc"
function keyDownEscapeHandler(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

// Функция открытия попапа
function openPopup(popup) {
  // Закрытие попапа по нажатию клавиши "Esc"
  document.addEventListener("keydown", keyDownEscapeHandler);
  popup.classList.add("popup_opened");
}

// Обработчик добавления карточки
function submitFormCardAddHandler(evt) {
  evt.preventDefault();

  const form = evt.target;

  // Создаем карточку
  const card = new Card(
    { title: cardNameInput.value, image: cardRefInput.value },
    "#element",
    openPopup
  );

  // Добавляем в разметку
  renderCard(card.createCard());

  // Закрываем попап
  closePopup(popupCardAdd);

  // Очищаем поля
  form.reset();
}

// Добавление карточек "из коробки"
function addCardsOnLoadHandler() {
  initialCards.forEach((el) => {
    const card = new Card(el, "#element", openPopup);
    renderCard(card.createCard());
  });
}

function openPopupCardAddHandler() {
  const SubmitFormCardAddButton = formCardAdd.querySelector(
    ".popup__button_type_submit"
  );
  SubmitFormCardAddButton.setAttribute("disabled", "");
  SubmitFormCardAddButton.classList.add("popup__button_disabled");
  openPopup(popupCardAdd);
}

// Добавление слушателей событий
document.addEventListener("DOMContentLoaded", addCardsOnLoadHandler, false);

cardAddButton.addEventListener("click", openPopupCardAddHandler);
formCardAdd.addEventListener("submit", submitFormCardAddHandler);

// Обработчики попапа редактирования профиля
function clickProfileEditButtonHandler() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupProfile);
}

function submitFormEditProfileHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfile);
}

// Функция добавления слушателей закрытия попапов
function addPopupEventListeners() {
  const popups = Array.from(document.querySelectorAll(".popup"));

  popups.forEach((popup) => {
    popup.addEventListener("click", сlosePopupHandler);
  });
}

// Обработчик закрытия попапа
function сlosePopupHandler(evt) {
  if (
    evt.target.classList.contains("popup__button_type_close") ||
    evt.target.classList.contains("popup__background")
  ) {
    closePopup(evt.currentTarget);
  }
}

profileEditButton.addEventListener("click", clickProfileEditButtonHandler);
formEditProfile.addEventListener("submit", submitFormEditProfileHandler);

// Добавление слушателей событий
addPopupEventListeners();

//-----------
// Валидация
//-----------

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
