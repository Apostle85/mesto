// Класс карточки
export default class Card {
    constructor({title, image, handleCardClick}, cardSelector) {
      this._title = title;
      this._image = image;
      this._handleCardClick = handleCardClick;
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
        this._cardElement.querySelector(".element__photo").addEventListener("click", () => this._handleCardClick());
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