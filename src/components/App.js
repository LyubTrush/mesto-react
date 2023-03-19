import React, { useState } from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import api from "../utils/Api.js";
import ImagePopup from "./ImagePopup.js";

function App() {
  //состояния попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // функции обработчики открытия попапов
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  //обработчик закрытия
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };
  return (
    <div>
      <body className="page">
        <div>
          <Header />
        </div>
        <div>
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
          />
        </div>
        <div>
          <Footer />
        </div>
        //попап смены аватара
        <PopupWithForm
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          name={"avatar"}
          title={"Редактировать профиль"}
          submitText={"Сохранить"}
          children={
            <>
              <input
                type="url"
                id="avatarLink"
                placeholder="Ссылка на картинку"
                // minlength="2"
                className="popup__input"
                required
              />
              <span className="avatarLink-error popup__input-error"></span>
            </>
          }
        />
        //попап редактирования профиля
        <PopupWithForm
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          name={"profile"}
          title={"Обновить аватар"}
          submitText={"Сохранить"}
          children={
            <>
              {" "}
              <input
                type="text"
                placeholder="Введите имя"
                id="username"
                value=""
                //minlength="2"
                // maxlength="40"
                className="popup__input popup__input_type_name"
                required="required"
              />
              <span className="username-error popup__input-error"></span>
              <input
                type="text"
                id="job"
                placeholder="Чем занимаетесь?"
                //minlength="2"
                //maxlength="200"
                className="popup__input popup__input_type_prof"
                required="required"
              />
              <span className="job-error popup__input-error"></span>
            </>
          }
        />
        //попап добавления фото
        <PopupWithForm
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          name={"add"}
          title={"Новое место"}
          submitText={"Сохранить"}
          children={
            <>
              {" "}
              <input
                type="text"
                placeholder="Название"
                id="title"
                value=""
                // minLength="2"
                // maxLength="30"
                className="popup__input popup__input_add_name"
                required
              />
              <span className="title-error popup__input-error"></span>
              <input
                type="url"
                id="link"
                placeholder="Ссылка на картинку"
                //minLength="2"
                className="popup__input popup__input_add_link"
                required
              />
              <span className="link-error popup__input-error"></span>
            </>
          }
        />
        //попап подтверждения удаления фото
        <PopupWithForm
          name={"delete-photo"}
          title={"Вы уверены?"}
          submitText={"Да"}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </body>
    </div>
  );
}

export default App;
