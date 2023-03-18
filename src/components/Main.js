import React from "react";
import Avatar from '../images/Avatar.png'
////const popupAvatar = document.querySelector('.popup_avatar');
//const popupProfile = document.querySelector('.popup_profile');
//const popupAdd = document.querySelector('.popup__add')
//console.log(popupAvatar);

export default function Main() {
    

    const handleEditAvatarClick = () => {
        document.querySelector('.popup_avatar').classList.add('popup_opened');
      }
      const handleEditProfileClick = () => {
        document.querySelector('.popup_profile').classList.add('popup_opened');
      }
      const handleAddPlaceClick = () => {
        document.querySelector('.popup_add').classList.add('popup_opened');
      }

    return(
        <main className='content'>
        <section className='profile'>
          <div className='profile__block'>
            <img
              className='profile__avatar-image'
              src={Avatar}
              alt="аватар"
            />
            <button className='profile__avatar-btn' onClick={handleEditAvatarClick}></button>
            <div className='profile__info'>
              <div className='profile__info-edit'>
                <h1 className='profile__info-title'>Жак-Ив Кусто</h1>
                <button
                  type="button"
                  aria-label="Редактировать профиль"
                  className='profile__button-edit'
                  onClick={handleEditProfileClick}
                ></button>
              </div>
              <p className='profile__info-subtitle'>Исследователь океана</p>
            </div>
          </div>
          <button type="button" className='profile__button-add' onClick={handleAddPlaceClick}></button>
        </section>
  
        <section className='elements'></section>
      </main>
    )
} 