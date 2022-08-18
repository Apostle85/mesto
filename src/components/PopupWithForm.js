import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({renderer}, popupSelector){
        super(popupSelector);
        this._renderer = renderer;
        this._form = this._popup.querySelector('.popup__form');
        // достаём все элементы полей
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._button = this._popup.querySelector('.popup__button_type_submit');
    }
    
    _getInputValues(){
        // создаём пустой объект
        this._formValues = {};
        // добавляем в этот объект значения всех полей
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        // возвращаем объект значений
        return this._formValues;
    }

    open(){
        this._button.textContent = 'Сохранить';
        super.open();
    }

    close() {
        // Закрываем попап
        super.close();
        // Очищаем поля
        this._form.reset();
    }

    isOpened(){
        return this._popup.classList.contains("popup_opened");
    }

    // Обработчик Сабмита Формы
    _submitFormCardAddHandler(evt) {
        evt.preventDefault();
        this._button.textContent = 'Сохранение...';
        // Внешний обработчик
        this._renderer(this._getInputValues());
        // Закрываем попап
        // if(!this.isOpened()) {
        //     this.close();
        // }
    }

    getForm(){
        return this._form;
    }

    setEventListeners() {
        this._form.addEventListener("submit", this._submitFormCardAddHandler.bind(this));
        super.setEventListeners();
    }
}