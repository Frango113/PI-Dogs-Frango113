import { Link } from "react-router-dom";
import { useState } from "react";
//! IMPORT SEARCHBAR HERE
import { useDispatch } from "react-redux";
import { clearDogs, allDogs } from "../../Redux/actions";
import style from "./NavBar.module.css";
import Form from "../Form/Form";
import Filter from "./Filter";
import SearchBar from "../SearchBar/SearchBar";

export default function Navbar({ onSearch }) {
  const dispatch = useDispatch();
  const [isFormVisible, setIsFormVisible] = useState(false);

  function clear() {
    dispatch(clearDogs());
    createDispatchHook(allDogs);
  }

  function toggleFormVisibility() {
    setIsFormVisible(!isFormVisible);
  }

  return (
    <div className={style.container}>
      <div className={style.Navbar}>
        <Link
          to="/home"
          onClick={() => {
            clear();
          }}
        ></Link>
      </div>
      <Filter />
      <SearchBar onSearch={onSearch} className={style.search}></SearchBar>
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
        <div onCLick={toggleFormVisibility} className={style.aboutButton}>
          <h3>CREATE</h3>
        </div>
      </div>
      {isFormVisible && <Form />}
    </div>
  );
}
