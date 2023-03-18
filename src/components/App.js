import React, { useState } from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";

function App() {
  //состояния попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

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

  //обработчик закрытия
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
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
        //попап просмотра фото
        <div className="popup popup_img-view">
          <div className="popup__img-conteiner">
            <button type="button" className="popup__btn-close"></button>
            <figure className="popup__figure">
              <img
                className="popup__image"
                src="https://images.unsplash.com/photo-1612470858098-500d3550778e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1268&q=80"
                alt="alt"
              />
              <figcaption className="popup__caption">caption</figcaption>
            </figure>
          </div>
        </div>
        <template id="template-element">
          <div className="element">
            <img className="element__img" />
            <button className="element__delete"></button>
            <div className="element__info">
              <h2 className="element__info-text"></h2>
              <div className="element__like-card">
                <button type="button" className="element__info-heart"></button>
                <span className="element__like-count">0</span>
              </div>
            </div>
          </div>
        </template>
      </body>
    </div>
  );
}

export default App;
