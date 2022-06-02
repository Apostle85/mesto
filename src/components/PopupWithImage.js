import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor({ src='', title='' }, popupSelector){
        super(popupSelector);
        this._src = src;
        this._title = title;
    }

    setSRC(src){
        this._src = src;
    }

    setTitle(title){
        this._title = title;
    }

    open(){
        this._popup.querySelector(".popup__image").src = this._src;
        this._popup.querySelector(".popup__image").alt = this._title;
        this._popup.querySelector(".popup__photo-description").textContent = this._title;
        super.open();
    }
}