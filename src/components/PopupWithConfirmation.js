import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ renderer }, popupSelector) {
    super(popupSelector);
    this._renderer = renderer;
    this._form = this._popup.querySelector('.popup__form');
  }

  // Обработчик Сабмита Формы
  _submitFormCardAddHandler(evt) {
    evt.preventDefault();
    // Внешний обработчик
    this._renderer(this._card);
    // Закрываем попап
    this.close();
  }

  open(card) {
    this._card = card;
    super.open();
  }

  setEventListeners() {
    this._form.addEventListener(
      "submit",
      this._submitFormCardAddHandler.bind(this)
    );
    super.setEventListeners();
  }
}
