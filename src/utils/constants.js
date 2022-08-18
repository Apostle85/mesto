// Токен
export const token = "a03d4118-2056-418e-8efc-0823108695ca";
export const identificator = "cohort-48";
export const baseUrl = "https://mesto.nomoreparties.co/v1";
// Попап картинки
export const photoPopup = document.querySelector(".popup_type_photo");
// Попап удаления карточки
export const popupDeleteSelector = ".popup_type_card-delete";
// Попап изменения аватара
export const popupAvatarEditSelector = ".popup_type_avatar-edit";
// Кнопка открытия попапа изменения аватара
export const avatarEditButton = document.querySelector(".profile__button_type-edit-avatar");
// Картинка аватара
export const avatarImageSelector = ".profile__avatar";
// Данные попапа картинки
export const popupImage = photoPopup.querySelector(".popup__image");
export const popupTitle = photoPopup.querySelector(".popup__photo-description");

// const image1 = new URL("https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg", import.meta.url);

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