//--------
// Импорт
//--------

//#region Импорт

import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  baseUrl,
  token,
  identificator,
  popupWithImageSelector,
  popupDeleteSelector,
  popupAvatarEditSelector,
  avatarEditButton,
  avatarImageSelector,
  cardSelector,
  cardListSelector,
  popupProfileSelector,
  profileEditButton,
  userNameSelector,
  userDescriptionSelector,
  popupCardAddSelector,
  cardAddButton,
  formValidatorObject,
} from "../utils/constants.js";
import "./index.css";

//#endregion

//-----------------
// Функции-Утилиты
//-----------------

//#region Функции-Утилиты

// Функция создания DOM-элемента карточки
const initCardElement = (
  { name = "", link = "", _id = "", likes = [], owner={} },
  isOwner = false
) => {
  // Создаем карточку
  const card = new Card(
    {
      title: name,
      image: link,
      id: _id,
      isOwner: isOwner,
      likes: likes,
      owner: owner,
      isLiked: likes.some(elem => elem._id === userInfo.getUserInfo().id),
      handleCardClick: () => popupWithImage.open({ src: link, title: name }),
      handleDeleteClick: () => popupCardDelete.open(card),
      handleLikeClick: () => {
        if (!card.getLikes().some(elem => elem._id === userInfo.getUserInfo().id)) {
          api
            .likeCard(card.getId())
            .then((cardInfo) => {
              card.like(cardInfo.likes);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          api
            .dislikeCard(card.getId())
            .then((cardInfo) => {
              card.like(cardInfo.likes);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
    },
    cardSelector
  );
  // Создаем DOM-элемент и Добавляем в разметку
  return card.createCard();
};

//#endregion

//--------------------------
// Создание Объектов Данных
//--------------------------

//#region Создание Объектов Данных

// Создаем объект создания запросов к API
const api = new Api({
  baseUrl: `${baseUrl}/${identificator}`,
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
});

// Создаем экземпляр блока информации о пользователе
const userInfo = new UserInfo({
  userNameSelector: userNameSelector,
  userDescriptionSelector: userDescriptionSelector,
  userAvatarSelector: avatarImageSelector,
});

// Создаем список карточек
const cardList = new Section(
  {
    renderer: (item, id = null) => {
      cardList.addItem(initCardElement(item, item.owner._id === id));
    },
  },
  cardListSelector
);

// Создаем попап с картинкой
const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();

// Создаем попап редактирования профиля
const popupProfile = new PopupWithForm(
  {
    renderer: (inputObject) => {
      api
        .editUserInfo(inputObject.title, inputObject.subtitle)
        .then((data) => {
          userInfo.setUserInfo({
            userName: data.name,
            userDescription: data.about,
            id: data._id,
            avatar: data.avatar,
          });
          popupProfile.close();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  popupProfileSelector
);
popupProfile.setEventListeners();
const formProfile = popupProfile.getForm();

// Создаем попап редактирования профиля
const popupAvatarEdit = new PopupWithForm(
  {
    renderer: (inputObject) => {
      api
        .editUserAvatar(inputObject.image)
        .then((urlObject) => {
          userInfo.setAvatar(urlObject.avatar);
          popupAvatarEdit.close();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  popupAvatarEditSelector
);
popupAvatarEdit.setEventListeners();
const formAvatarEdit = popupAvatarEdit.getForm();

// Создаем попап создания карточки
const popupCardAdd = new PopupWithForm(
  {
    renderer: (inputObject) => {
      console.log(inputObject);
      api
        .addCard({ name: inputObject.title, link: inputObject.image })
        .then((card) => {
          const cardElement = initCardElement(card, true);
          cardList.addItem(cardElement);
          popupCardAdd.close();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  popupCardAddSelector
);
popupCardAdd.setEventListeners();
const formCardAdd = popupCardAdd.getForm();

const popupCardDelete = new PopupWithConfirmation(
  {
    renderer: (card) =>
      api
        .deleteCard(card.getId())
        .then(() => {
          card.deleteCard();
        })
        .catch((err) => {
          console.log(err);
        }),
  },
  popupDeleteSelector
);
popupCardDelete.setEventListeners();

//#endregion

//---------------
// Запросы к API
//---------------

//#region Запросы к API

// Получение информации о пользователе
api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo({
      userName: data.name,
      userDescription: data.about,
      id: data._id,
      avatar: data.avatar,
    });
  })
  .catch((err) => {
    // Если произошла ошибка иного рода, ловим ее через catch
    console.log(err);
  });

// Получение начального набора карточек с сервера
api
  .getInitialCards()
  .then((initialCards) => {
    cardList.renderItems(initialCards, userInfo.getUserInfo().id);
  })
  .catch((err) => {
    console.log(err);
  });

//#endregion

//-----------
// Валидация
//-----------

//#region Валидация

// Создание экземляров класса валидации форм
const profileValidation = new FormValidator(formValidatorObject, formProfile);
const cardAddValidation = new FormValidator(formValidatorObject, formCardAdd);
const avatarEditValidation = new FormValidator(
  formValidatorObject,
  formAvatarEdit
);

// Включение валидации для всех форм вызовом enableValidation с объектом параметров
profileValidation.enableValidation();
cardAddValidation.enableValidation();
avatarEditValidation.enableValidation();

//#endregion

//-------------------
// Слушатели событий
//-------------------

//#region Слушатели событий

// Обработчик нажатия кнопки открытия попапа изменения профиля и его слушатель
const handleProfileEditClick = () => {
  const userInfoObject = userInfo.getUserInfo();
  profileValidation.resetValidation();
  formProfile.elements.title.value = userInfoObject.userName;
  formProfile.elements.subtitle.value = userInfoObject.userDescription;
  popupProfile.open();
};
profileEditButton.addEventListener("click", handleProfileEditClick);

// Обработчик нажатия кнопки открытия попапа создания карточки и его слушатель
const handleCardAddClick = () => {
  cardAddValidation.resetValidation();
  popupCardAdd.open();
};
cardAddButton.addEventListener("click", handleCardAddClick);

// Обработчик нажатия кнопки открытия попапа изменения аватара и его слушатель
const handleAvatarEditClick = () => {
  avatarEditValidation.resetValidation();
  formAvatarEdit.elements.image.value = userInfo.getUserInfo().avatar;
  popupAvatarEdit.open();
};
avatarEditButton.addEventListener("click", handleAvatarEditClick);
//#endregion
