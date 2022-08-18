// Класс карточки
export default class Card {
    constructor({title, image, handleCardClick, id = '', owner = {}, isOwner=false, likes=[], isLiked = false, handleDeleteClick = null, handleLikeClick = null}, cardSelector) {
      this._title = title;
      this._image = image;
      this._handleCardClick = handleCardClick;
      this._handleDeleteClick = handleDeleteClick;
      this._handleLikeClick = handleLikeClick;
      this._cardSelector = cardSelector;
      this._id = id;
      this._isOwner = isOwner;
      this._owner = owner;
      this._likesNumber = likes.length;
      this._likes = likes;
      this._isLiked = isLiked;
    }


    like(likes){
      this._likes = likes;
      this._likesNumber = likes.length;
      this._likeCounterElement.textContent = this._likesNumber;
      this._likeButton.classList.toggle("element__like_active");
    }

    getId(){
      return this._id;
    }

    getOwnerId(){
      return this._owner._id;
    }

    getLikes(){
      return this._likes;
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
      this._likeCounterElement = this._cardElement.querySelector(".element__like-counter");
    }

    // Наполняем карточку содержимым
    _configureCard() {
      this._photoElement.src = this._image;
      this._photoElement.alt = this._title;
      this._titleElement.textContent = this._title;
      this._likeCounterElement.textContent = this._likesNumber;
      if(!this._isOwner) {
        this._deleteButton.remove();
      }
      if(this._isLiked){
        this._likeButton.classList.toggle("element__like_active");
      }
    }

    deleteCard(){
      this._cardElement.remove();
      this._cardElement = null;
    }
  
    // Добавление всех слушателей Карточки
    _addEventListeners() {
        this._likeButton.addEventListener("click", () => this._handleLikeClick());
        this._photoElement.addEventListener("click", () => this._handleCardClick());
        if(this._isOwner) {
          this._deleteButton.addEventListener("click", () => this._handleDeleteClick());
        }
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