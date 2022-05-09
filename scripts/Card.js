// Класс карточки
export default class Card {
    constructor(data, cardSelector, openPopup) {
      this._title = data.title;
      this._image = data.image;
      this._cardSelector = cardSelector;
      this._openPopup = openPopup;
    }

    // Получаем копию элемента карточки
    _getTemplate(){
        return document
        .querySelector(this._cardSelector)
        .content.querySelector(".element")
        .cloneNode(true);
    }

    // Наполняем карточку содержимым
    _cardConfigure() {
        const cardPhoto = this._cardElement.querySelector(".element__photo");
        cardPhoto.src = this._image;
        cardPhoto.alt = this._title;

        this._cardElement.querySelector(".element__title").textContent = this._title;
    }
  
    // Обработчик нажатия на фото карточки - открытия попапа картинки
    _clickCardPhotoHandler() {
        const photoPopup = document.querySelector(".popup_type_photo");
        const popupImage = photoPopup.querySelector(".popup__image");
        const popupTitle = photoPopup.querySelector(".popup__photo-description");
        
        popupImage.src = this._cardElement.querySelector(".element__photo").src;
        popupImage.alt = this._cardElement.querySelector(".element__title").textContent;
        popupTitle.textContent = this._cardElement.querySelector(".element__title").textContent;

        this._openPopup(photoPopup);
    }
  
    // Обработчик нажатия на кнопку удаления
    _clickCardDeleteHandler() {
      this._cardElement.remove();
    }
  
    // Обработчик нажатия на кнопку лайка
    _clickCardLikeHandler() {
      this._cardElement.querySelector(".element__like").classList.toggle("element__like_active");
    }
  
    // Добавление всех слушателей Карточки
    _addEventListeners() {
        this._cardElement.querySelector(".element__like").addEventListener("click", () => this._clickCardLikeHandler());
        this._cardElement.querySelector(".element__delete").addEventListener("click", () => this._clickCardDeleteHandler());
        this._cardElement.querySelector(".element__photo").addEventListener("click", () => this._clickCardPhotoHandler());
    }
  
    // Функция создания карточки
    createCard() {
      // клонируем содержимое тега template
      // const card = cardTemplate.querySelector('.element').cloneNode(true);
      this._cardElement = this._getTemplate();
  
      // наполняем содержимым
      this._cardConfigure();
  
      // добавляем слушатели
      this._addEventListeners();
  
      return this._cardElement;
    }
  }