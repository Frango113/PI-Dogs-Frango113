import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

export default function Card(props) {
  const { id, name, weight, image, temperament } = props;

  let newTemp = temperament?.length > 0 ? temperament.split(", ") : "unknown";
  let shortTemp = newTemp[0];

  let newId = typeof id === "string" ? id.slice(0, 3) : id;

  return (
    <div className={style.component}>
      <div className={style.id}>
        <h2>ID: {newId}</h2>
      </div>
      <div className={style.image}>
        <img src={image} alt={name}></img>
      </div>
      <div className={style.dataContainer}>
        <h2 className={style.name}>{name}</h2>
        <h2 className={style.data}>
          <span>Weight: </span>
          <span className={style.Value}>{weight}</span>
        </h2>
        <h2 className={style.data}>
          <span>Temperament: </span>
          <span className={style.Value}>{shortTemp}</span>
        </h2>
      </div>
      <Link to={`/detail/${id}`}>
        <button className={style.masInfo}>DETAILS</button>
      </Link>
    </div>
  );
}
