//В компоненте Main добавьте переменные состояния userName, userDescription и userAvatar. Используйте их в JSX.
//Добавьте ещё одну переменную стейта cards с пустым массивом в качестве значения по умолчанию. Добавьте второй запрос
//к API за соответствующими данными.

import React, { useState, useEffect } from "react";
import Avatar from "../images/Avatar.png";
import api from "../utils/Api.js";
import Card from "./Card.js";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
}) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  //используем хук useEffect
  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.description);
        setUserAvatar(userData.avatar);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((card) => {
        setCards(card);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__block">
          <img
            className="profile__avatar-image"
            src={userAvatar ?? Avatar}
            //style={{ backgroundImage: `url(${userAvatar})` }}
            alt="аватар"
          />
          <button
            className="profile__avatar-btn"
            onClick={onEditAvatar}
          ></button>
          <div className="profile__info">
            <div className="profile__info-edit">
              <h1 className="profile__info-title">{userName}</h1>
              <button
                type="button"
                aria-label="Редактировать профиль"
                className="profile__button-edit"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__info-subtitle">{userDescription}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__button-add"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card card={card} key={card._id} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  );
}
