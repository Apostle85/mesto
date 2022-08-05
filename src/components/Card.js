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

    // Получаем внутренние элементы карточки
    _getCardElements(){
      this._likeButton = this._cardElement.querySelector(".element__like");
      this._deleteButton = this._cardElement.querySelector(".element__delete");
      this._photoElement = this._cardElement.querySelector(".element__photo");
      this._titleElement = this._cardElement.querySelector(".element__title");
    }

    // Наполняем карточку содержимым
    _configureCard() {
      this._photoElement.src = this._image;
      this._photoElement.alt = this._title;
      this._titleElement.textContent = this._title;
    }
  
    // Обработчик нажатия на кнопку удаления
    _handleDeleteButtonClick() {
      this._cardElement.remove();
      this._cardElement = null;
    }
  
    // Обработчик нажатия на кнопку лайка
    _handleLikeButtonClick() {
      this._likeButton.classList.toggle("element__like_active");
    }
  
    // Добавление всех слушателей Карточки
    _addEventListeners() {
        this._likeButton.addEventListener("click", () => this._handleLikeButtonClick());
        this._deleteButton.addEventListener("click", () => this._handleDeleteButtonClick());
        this._photoElement.addEventListener("click", () => this._handleCardClick());
    }
    
    // Функция создания карточки
    createCard() {
      // клонируем содержимое тега template
      this._cardElement = this._getTemplate();
      // Получаем внутренние элементы карточки
      this._getCardElements();
      // наполняем содержимым
      this._configureCard();
      // добавляем слушатели
      this._addEventListeners();
      return this._cardElement;
    }
  }