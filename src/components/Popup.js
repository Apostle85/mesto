// Класс попапа
export default class Popup {
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
    }

    // Открытие попапа
    open(){
        document.addEventListener("keydown", this._handleEscClose.bind(this));
        this._popup.classList.add("popup_opened");
    }

    // Закрытие попапа
    close(){
        document.removeEventListener("keydown", this._handleEscClose.bind(this));
        this._popup.classList.remove("popup_opened");
    }

    // Обработчик закрытия попапа по нажатию на клавишу "Esc"
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    // Обработчик закрытия попапа
    _сlosePopupHandler(evt) {
        if (
        evt.target.classList.contains("popup__button_type_close") ||
        evt.target.classList.contains("popup__background")
        ) {
            this.close();
        }
    }

    // Добавление слушателей
    setEventListeners(){
        this._popup.addEventListener("click", this._сlosePopupHandler.bind(this));
    }
}