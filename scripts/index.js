// -------
// Данные
// -------

const page = document.querySelector('.page');



// Переменные Попапа редактирования профиля

// Блок попапа редактирования профиля с затемнением
const popupProfile = document.querySelector('.popup_type_profile-edit');
// Попап контейнер-форма и ее обработчик отправки
const formEditProfile = popupProfile.querySelector('.popup__form');

// Переменные DOM-элементов для ввода данных попапа
const nameInput = popupProfile.querySelector('.popup__input_type_title');
const jobInput = popupProfile.querySelector('.popup__input_type_subtitle');

// Кнопка закрытия попапа и ее обработчик нажатия
const popupProfileCloseButton = popupProfile.querySelector('.popup__button_type_close');

// Текстовые элементы блока profile
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
// Кнопка изменения данных, открытия попапа и ее обработчик нажатия
const profileEditButton = document.querySelector('.profile__button_type_edit');



// Переменные Попапа добавления карточек

// Карточки "из коробки"
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

// Блок попапа добавления карточек с затемнением
const popupCardAdd = document.querySelector('.popup_type_card-add');
// Попап контейнер-форма и ее обработчик отправки
const formCardAdd = popupCardAdd.querySelector('.popup__form');

// Переменные DOM-элементов для ввода данных попапа
const cardNameInput = popupCardAdd.querySelector('.popup__input_type_card-name');
const cardRefInput = popupCardAdd.querySelector('.popup__input_type_card-ref');

// Кнопка открытия попапа
const cardAddButton = document.querySelector('.profile__button_type_add');
// Кнопка закрытия попапа и ее обработчик нажатия
const popupCardAddCloseButton = popupCardAdd.querySelector('.popup__button_type_close');

// Список карточек
const cardsCol = document.querySelector('.elements__list');
// Шаблон карточки
const cardTemplate = document.querySelector('#element').content;
// Шаблон попапа картинки
const photoPopupTemplate = document.querySelector('#photo-popup').content;


// ----------------------
// Функции и Обработчики
// ----------------------

// Обработчик нажатия на фото карточки
function clickCardPhotoHandler(evt){
    const card =  evt.target.parentElement;
    const cardImage = card.querySelector('.element__photo');
    const cardTitle = card.querySelector('.element__title');

    const photoPopup = photoPopupTemplate.querySelector('.popup_type_photo').cloneNode(true);
    const popupImage = photoPopup.querySelector('.popup__image');
    const popupTitle = photoPopup.querySelector('.popup__photo-description');
    const photoPopupCloseButton = photoPopup.querySelector('.popup__button_type_close');

    popupImage.src = cardImage.src;
    popupImage.alt = cardTitle.textContent;
    popupTitle.textContent = cardTitle.textContent;

    page.append(photoPopup);
    photoPopup.classList.add('popup_opened');

    function clickPhotoPopupCloseButtonHandler(){
        photoPopup.classList.remove('popup_opened');
        setTimeout(()=>photoPopup.remove,1000);
    }
    
    photoPopupCloseButton.addEventListener('click', clickPhotoPopupCloseButtonHandler);
}
    



// Обработчик нажатия на кнопку удаления
function clickCardDeleteHandler(evt){
    const card = evt.target.parentElement;
    card.remove();
}

// Обработчик нажатия на кнопку лайка
function clickCardLikeHandler(evt){
    const cardLike = evt.target;
    cardLike.classList.toggle('element__like_active');
}

// Функция добавления карточки
function addCard(title, photoRef){

    // клонируем содержимое тега template
    const card = cardTemplate.querySelector('.element').cloneNode(true);

    // получаем элементы карточки
    cardPhoto = card.querySelector('.element__photo');
    cardTitle = card.querySelector('.element__title');
    cardLike = card.querySelector('.element__like');
    cardTrash = card.querySelector('.element__delete');

    // наполняем содержимым
    cardPhoto.src = photoRef;
    cardPhoto.alt = title;
    cardTitle.textContent = title;

    

    // добавляем слушатели
    cardLike.addEventListener('click', clickCardLikeHandler);
    cardTrash.addEventListener('click', clickCardDeleteHandler);
    cardPhoto.addEventListener('click', clickCardPhotoHandler);

    // отображаем на странице
    cardsCol.prepend(card); 
}

// Обработчики попапа добавления карточек

function clickCardAddButtonHandler(){
    popupCardAdd.classList.add('popup_opened');
}

function clickPopupCardAddCloseButtonHandler(){
    popupCardAdd.classList.remove('popup_opened');
}



function submitFormCardAddHandler (evt) {
    evt.preventDefault();
    
    // Создаем карточку
    addCard(cardNameInput.value, cardRefInput.value);
    
    // Очищаем поля
    cardRefInput.value = '';
    cardNameInput.value = '';

    // Закрываем попап
    clickPopupCardAddCloseButtonHandler();
}

// Добавление карточек "из коробки"
function addCardsOnLoadHandler(){
    initialCards.forEach((el)=>{
        addCard(el.name, el.link);
    })
}

// Добавление слушателей событий
document.addEventListener('DOMContentLoaded', addCardsOnLoadHandler, false);
popupCardAddCloseButton.addEventListener('click', clickPopupCardAddCloseButtonHandler)
cardAddButton.addEventListener('click', clickCardAddButtonHandler);
formCardAdd.addEventListener('submit', submitFormCardAddHandler);





// Обработчики попапа редактирования профиля

function clickProfileEditButtonHandler(){
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    popupProfile.classList.add('popup_opened');
}

function clickPopupProfileCloseButtonHandler(){
    popupProfile.classList.remove('popup_opened');
}

function submitFormEditProfileHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent=nameInput.value;
    profileSubtitle.textContent=jobInput.value;
    clickPopupProfileCloseButtonHandler();
}

// Добавление слушателей событий
popupProfileCloseButton.addEventListener('click', clickPopupProfileCloseButtonHandler)
profileEditButton.addEventListener('click', clickProfileEditButtonHandler);
formEditProfile.addEventListener('submit', submitFormEditProfileHandler);