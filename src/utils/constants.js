// Попап картинки
export const photoPopup = document.querySelector(".popup_type_photo");

// Данные попапа картинки
export const popupImage = photoPopup.querySelector(".popup__image");
export const popupTitle = photoPopup.querySelector(".popup__photo-description");

// const image1 = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg", import.meta.url);



// Карточки "из коробки"
export const initialCards = [
  {
    title: "Архыз",
    image:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
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

export const cardSelector = "#element";
export const popupWithImageSelector = ".popup_type_photo";
// Список карточек
export const cardListSelector = ".elements__container";
// Блок попапа редактирования профиля
export const popupProfileSelector = ".popup_type_profile-edit";
export const profileEditButton = document.querySelector(".profile__button_type_edit");
// Текстовые элементы блока profile
export const userNameSelector = ".profile__title";
export const userDescriptionSelector = ".profile__subtitle";
// Блок попапа добавления карточек
export const popupCardAddSelector = ".popup_type_card-add";
// Кнопка открытия попапа добавления карточек
export const cardAddButton = document.querySelector(".profile__button_type_add");
// Объект Валидации
export const formValidatorObject = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};