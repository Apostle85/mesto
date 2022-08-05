import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._image = this._popup.querySelector(".popup__image");
        this._title = this._popup.querySelector(".popup__photo-description");
    }

    open({ src='', title='' }){
        this._image.src = src;
        this._image.alt = title;
        this._title.textContent = title;
        super.open();
    }
}