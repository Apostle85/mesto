// Попап контейнер-форма и ее обработчик отправки
let formElement = document.querySelector('.popup__form');
// Блок попапа с затемнением
let popup = document.querySelector('.popup');
// Переменные DOM-элементов для ввода данных попапа
let nameInput = document.querySelector('.popup__input_type_title');
let jobInput = document.querySelector('.popup__input_type_subtitle');
// Текстовые элементы блока profile
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
// Кнопка изменения данных, открытия попапа и ее обработчик нажатия
let profileEditButton = document.querySelector('.profile__button_type_edit');
// Кнопка закрытия попапа и ее обработчик нажатия
let popupCloseButton = document.querySelector('.popup__button_type_close');

function profileEditButtonClickHandler(){
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    popup.classList.add('popup_opened');
}

function popupCloseButtonClickHandler(){
    popup.classList.remove('popup_opened');
}

function submitFormHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent=nameInput.value;
    profileSubtitle.textContent=jobInput.value;
    popupCloseButtonClickHandler();
}

// Добавление слушателей событий
popupCloseButton.addEventListener('click', popupCloseButtonClickHandler)
profileEditButton.addEventListener('click', profileEditButtonClickHandler);
formElement.addEventListener('submit', submitFormHandler);