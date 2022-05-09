import { openPopup } from './index.js';
import {photoPopup,popupImage,popupTitle} from './utils.js';

// Класс карточки
export default class Card {
    constructor(data, cardSelector) {
      this._title = data.title;
      this._image = data.image;
      this._cardSelector = cardSelector;
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
        popupImage.src = this._image;
        popupImage.alt = this._title;
        popupTitle.textContent = this._title;

        openPopup(photoPopup);
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
      this._cardElement = this._getTemplate();
  
      // наполняем содержимым
      this._cardConfigure();
  
      // добавляем слушатели
      this._addEventListeners();
  
      return this._cardElement;
    }
  }