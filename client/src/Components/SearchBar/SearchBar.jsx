import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  filterTemperaments,
  orderDogs,
  dogByName,
  dogById,
  allDogs,
  allTemperaments,
  clearDogs,
} from "../../Redux/actions";
import { useSelector } from "react-redux";
import style from "./SearchBar.Module.css";
import searchicon from "../../assets/search.png";

export default function SearchBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orderAndFilter.order);

  function HandleChange(e) {
    e.preventDefault();

    let input = e.target.value;

    setName(input);
  }
  const Numerico = Number(name);
  //console.log(Numerico);
  const onSearch = async (event) => {
    clearDogs();
    if (Numerico) {
      dispatch(dogById(Numerico));
    } else {
      dispatch(dogByName(name));
    }
    dispatch(filterTemperaments("All"));
  };
  return (
    <div className={StylePropertyMap.SearchBar}>
      <input
        className={StylePropertyMap.input}
        type="search"
        placeholder="search for a name or ID"
        value={name}
        onChange={HandleChange}
      ></input>
      <button className={style.search} onClick={() => onSearch(name)}>
        <img src={searchicon}></img>
      </button>
    </div>
  );
}
