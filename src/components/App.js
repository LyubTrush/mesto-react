import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import api from "../utils/Api.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import AddPlacePopup from "./AddPlacePopup.js";

function App() {
  //состояния попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [DeletedCard, setDeletedCard] = useState(null);
  const [cards, setCards] = React.useState([]);

  //пользователь
  const [currentUser, setCurrentUser] = useState({});


  //эффект получения информации о пользователе и 
  useEffect(() => {
    api
    .getUserInfo()
    .then(setCurrentUser)
    .catch((err) => {
      console.log(err);
    });
    api
    .getInitialCards()
    .then((res) => {
      setCards(res);
    })
    .catch((err) => {
      console.log(err);
    });
  },[])

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

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.likeResolve(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
    console.log(card)
};

function handleCardDelete(card) {
  api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleUpdateUser(userInfo) {
  api
    .setProfileData(userInfo)
    .then((newUserInfo) => {
      setCurrentUser(newUserInfo);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
    console.log(userInfo)
}
function handleUpdateAvatar(link) {
  api.setAvatar(link)
    .then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
    console.log(link)
}

function handleAddPlaceSubmit(name, link) {
  api.addCard(name, link)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
}

  //обработчик закрытия
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
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
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </div>
        <div>
          <Footer />
        </div>
        //попап смены аватара
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        
        //попап редактирования профиля
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        //попап добавления фото
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        //попап подтверждения удаления фото
        <PopupWithForm
          name={"delete-photo"}
          title={"Вы уверены?"}
          submitText={"Да"}
        />
        // попап просмотра фото
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </body>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
