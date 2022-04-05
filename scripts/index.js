// -------
// Данные
// -------

const page = document.querySelector('.page');

// Попапы

// Блок попапа редактирования профиля с затемнением
const popupProfile = document.querySelector('.popup_type_profile-edit');

// Блок попапа добавления карточек с затемнением
const popupCardAdd = document.querySelector('.popup_type_card-add');

// Попап картинки
const photoPopup = document.querySelector('.popup_type_photo');



// Переменные Попапа редактирования профиля

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


// Контейнер-форма попапа
const formCardAdd = popupCardAdd.querySelector('.popup__form');

// Переменные DOM-элементов для ввода данных попапа
const cardNameInput = popupCardAdd.querySelector('.popup__input_type_card-name');
const cardRefInput = popupCardAdd.querySelector('.popup__input_type_card-ref');

// Кнопка открытия попапа
const cardAddButton = document.querySelector('.profile__button_type_add');
// Кнопка закрытия попапа и ее обработчик нажатия
const popupCardAddCloseButton = popupCardAdd.querySelector('.popup__button_type_close');

// Список карточек
const cards = document.querySelector('.elements__container');
// Шаблон карточки
const cardTemplate = document.querySelector('#element').content;

// Данные попапа картинки
const popupImage = photoPopup.querySelector('.popup__image');
const popupTitle = photoPopup.querySelector('.popup__photo-description');

const photoPopupCloseButton = photoPopup.querySelector('.popup__button_type_close');


// ----------------------
// Функции и Обработчики
// ----------------------

// Функция открытия попапа
function openPopup(popup){
    popup.classList.add('popup_opened');
}

// Функция закрытия попапа
function closePopup(popup){
    popup.classList.remove('popup_opened');
}

// Обработчик нажатия на фото карточки - открытия попапа картинки
function clickCardPhotoHandler(evt){
    const card =  evt.target.closest('.element');
    const cardImage = card.querySelector('.element__photo');
    const cardTitle = card.querySelector('.element__title');

    popupImage.src = cardImage.src;
    popupImage.alt = cardTitle.textContent;
    popupTitle.textContent = cardTitle.textContent;

    openPopup(photoPopup);
}
    
// Добавление слушателя закрытия попапа картинки
photoPopupCloseButton.addEventListener('click', ()=>closePopup(photoPopup));



// Обработчик нажатия на кнопку удаления
function clickCardDeleteHandler(evt){
    const card = evt.target.closest('.element');
    card.remove();
}

// Обработчик нажатия на кнопку лайка
function clickCardLikeHandler(evt){
    const cardLike = evt.target;
    cardLike.classList.toggle('element__like_active');
}

// Функция создания карточки
function createCard(title, photoRef){

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

    return card;
}

// Функция добавления карточки в разметку
function renderCard(card){
    cards.prepend(card); 
}


// Обработчики попапа добавления карточек

// Обработчик добавления карточки
function submitFormCardAddHandler (evt) {
    evt.preventDefault();
    
    // Создаем карточку
    const card = createCard(cardNameInput.value, cardRefInput.value);

    // Добавляем в разметку
    renderCard(card);
    
    // Закрываем попап
    closePopup(popupCardAdd);

    // Очищаем поля
    cardRefInput.value = '';
    cardNameInput.value = '';
}

// Добавление карточек "из коробки"
function addCardsOnLoadHandler(){
    initialCards.forEach((el)=>{
        renderCard(createCard(el.name, el.link));
    })
}

// Добавление слушателей событий
document.addEventListener('DOMContentLoaded', addCardsOnLoadHandler, false);
popupCardAddCloseButton.addEventListener('click', () => closePopup(popupCardAdd));
cardAddButton.addEventListener('click', () => openPopup(popupCardAdd));
formCardAdd.addEventListener('submit', submitFormCardAddHandler);





// Обработчики попапа редактирования профиля

function clickProfileEditButtonHandler(){
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    openPopup(popupProfile);
}

function submitFormEditProfileHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent=nameInput.value;
    profileSubtitle.textContent=jobInput.value;
    closePopup(popupProfile);
}

// Добавление слушателей событий
popupProfileCloseButton.addEventListener('click', () => closePopup(popupProfile));
profileEditButton.addEventListener('click', clickProfileEditButtonHandler);
formEditProfile.addEventListener('submit', submitFormEditProfileHandler);