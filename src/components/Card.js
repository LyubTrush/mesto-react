//Обработчик handleCardClick должен вызываться
// из компонента Card. Для этого его нужно «пробросить» в компонент Card сквозь компонент Main — в виде пропса onCardClick.

import React from "react";
export default function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }
  return (
    <div className="element">
      <img
        className="element__img"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <button className="element__delete"></button>
      <div className="element__info">
        <h2 className="element__info-text">{props.card.name}</h2>
        <div className="element__like-card">
          <button type="button" className="element__info-heart"></button>
          <span className="element__like-count">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}
