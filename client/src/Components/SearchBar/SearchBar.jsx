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

export default function SearchBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orderAndFilter.order);

  function HandleChange(e) {
    e.preventDefault();

    let input = e.target.value;

    setName(input);
  }

  const onSearch = async (event) => {
    clearDogs();
    if (name.length > 3) {
      await dispatch(dogByName(name));
      dispatch(orderDogs(order));
    } else if (name.length === 0) {
      dispatch(dogById(1));
    } else {
      dispatch(clearDogs());
      dispatch(dogById(name));
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
      <button className={style.search} onClick={() => onSearch(name)}></button>
    </div>
  );
}
