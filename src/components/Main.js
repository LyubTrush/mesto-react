import React, { useState } from "react";
import Avatar from '../images/Avatar.png'
////const popupAvatar = document.querySelector('.popup_avatar');
//const popupProfile = document.querySelector('.popup_profile');
//const popupAdd = document.querySelector('.popup__add')
//console.log(popupAvatar);

export default function Main({onEditAvatar, onEditProfile, onAddPlace}) {
    

  

    return(
        <main className='content'>
        <section className='profile'>
          <div className='profile__block'>
            <img
              className='profile__avatar-image'
              src={Avatar}
              alt="аватар"
            />
            <button className='profile__avatar-btn' onClick={onEditAvatar}></button>
            <div className='profile__info'>
              <div className='profile__info-edit'>
                <h1 className='profile__info-title'>Жак-Ив Кусто</h1>
                <button
                  type="button"
                  aria-label="Редактировать профиль"
                  className='profile__button-edit'
                  onClick={onEditProfile}
                ></button>
              </div>
              <p className='profile__info-subtitle'>Исследователь океана</p>
            </div>
          </div>
          <button type="button" className='profile__button-add' onClick={onAddPlace}></button>
        </section>
  
        <section className='elements'></section>
      </main>
    )
} 