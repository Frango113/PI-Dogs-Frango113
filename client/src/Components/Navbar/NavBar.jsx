import { Link } from "react-router-dom";
import { useState } from "react";
//! IMPORT SEARCHBAR HERE
import { useDispatch } from "react-redux";
import { clearDogs, allDogs } from "../../Redux/actions";
import style from "./NavBar.module.css";
import Form from "../Form/Form";
import Filter from "./Filter";
import SearchBar from "../SearchBar/SearchBar";
import Logo from "../../assets/logo.png";

export default function Navbar({ onSearch }) {
  const dispatch = useDispatch();
  const [isFormVisible, setIsFormVisible] = useState(false);

  function clear() {
    dispatch(clearDogs());
    dispatch(allDogs);
  }

  function toggleFormVisibility() {
    setIsFormVisible(!isFormVisible);
  }

  return (
    <div className={style.container}>
      <div className={style.Navbar}>
        <div className={style.logo}>
          <Link
            to="/home"
            onClick={() => {
              clear();
            }}
          >
            <img src={Logo}></img>
          </Link>
        </div>

        <Filter />
        <SearchBar onSearch={onSearch} className={style.search} />
        <div className={style.buttons}>
          <Link
            to="/home"
            onClick={() => {
              clear();
            }}
            className={style.aboutButton}
          >
            <h3>RESET</h3>
          </Link>
          <div onClick={toggleFormVisibility} className={style.aboutButton}>
            <h3>CREATE</h3>
          </div>
        </div>
      </div>
      {isFormVisible && <Form />}
    </div>
  );
}
