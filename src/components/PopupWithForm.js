import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({renderer}, popupSelector){
        super(popupSelector);
        this._renderer = renderer;
        this._form = this._popup.querySelector('.popup__form');
    }

    _getInputValues(){

        // достаём все элементы полей
        this._inputList = this._form.querySelectorAll('.popup__input');

        // создаём пустой объект
        this._formValues = {};

        // добавляем в этот объект значения всех полей
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        // возвращаем объект значений
        return this._formValues;
    }

    close() {

        // Закрываем попап
        super.close();

        // Очищаем поля
        this._form.reset();
    }

    // Обработчик Сабмита Формы
    _submitFormCardAddHandler(evt) {
        evt.preventDefault();
    
        // 
        this._renderer(this._getInputValues());

        // Закрываем попап
        this.close();
    }

    setEventListeners() {
        this._form.addEventListener("submit", this._submitFormCardAddHandler.bind(this));
        super.setEventListeners();
    }
}