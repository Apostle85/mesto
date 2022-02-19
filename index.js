// Попап контейнер-форма и ее обработчик отправки
let formElement = document.querySelector('.popup__container');

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent=popupInput[0].value;
    profileSubtitle.textContent=popupInput[1].value;
    popup.classList.remove('popup_opened');
}
// Блок попапа с затемнением
let popup = document.querySelector('.popup');
// Переменные DOM-элементов для ввода данных попапа
let popupInput = document.querySelectorAll('.popup__input');
let nameInput = popupInput[0];
let jobInput = popupInput[1];
// Текстовые элементы блока profile
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
// Кнопка изменения данных, открытия попапа и ее обработчик нажатия
let profileEditButton = document.querySelector('.profile__button_type_edit');

function profileEditButtonClickHandler(){
    popupInput[0].value = profileTitle.textContent;
    popupInput[1].value = profileSubtitle.textContent;
    popup.classList.add('popup_opened');
}
// Кнопка закрытия попапа и ее обработчик нажатия
let popupCloseButton = document.querySelector('.popup__button_type_close');

function popupCloseButtonClickHandler(){
    popup.classList.remove('popup_opened');
}

// Добавление слушателей событий
popupCloseButton.addEventListener('click', popupCloseButtonClickHandler)
profileEditButton.addEventListener('click', profileEditButtonClickHandler);
formElement.addEventListener('submit', formSubmitHandler);