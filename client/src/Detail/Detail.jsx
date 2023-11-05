import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./Detail.module.css";
export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState({});

  useEffect(() => {
    axios(`http://localhost:3001/dogs/${id}`).then(({ data }) => {
      if (data.name) {
        setCharacter(data);
      } else {
        window.alert("No dogs with this ID: ");
      }
    });
    return setCharacter({});
  }, [id]);

  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className={style.component}>
        <h1 className={style.id}>{character.id && character.id}</h1>
        <img
          src={character.imagen && character.imagen}
          alt={character.name}
        ></img>
        <h1 className={style.name}>{character.name && character.name}</h1>
        <p className={style.data}>
          <span>Height: </span>
          <span className={style.value}>
            {character.height && character.height}
          </span>
        </p>
        <p className={style.data}>
          <span>Weight: </span>
          <span className={style.value}>
            {character.weight && character.weight}
          </span>
        </p>
        <p className={style.data}>
          <span>Temperaments: </span>
          <span className={style.value}>
            {character.temperament && character.temperament}
          </span>
        </p>
        {character.breed_for && (
          <p className={style.data}>
            <span>Raised To: </span>
            <span className={style.value}>
              {character.breed_for && character.breed_for}
            </span>
          </p>
        )}
        <p className={style.data}>
          <span>Years Of Life: </span>
          <span className={style.value}>{character.life_span}</span>
        </p>
        {character.origin && (
          <p className={style.data}>
            <span>Origin: </span>
            <span className={style.value}>
              {character.origin && character.origin}
            </span>
          </p>
        )}
        <button onClick={goBack} className={style.back}>
          BACK
        </button>
      </div>
    </>
  );
}
