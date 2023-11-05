import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import style from "./App.module.css";
//? importaciones REDUX
import { useDispatch, useSelector } from "react-redux";
import { clearDogs, allDogs } from "./Redux/actions";
//?FIN IMPORT REDUX
//! COMPONENTES
import LandingPage from "./Components/Landing/LandingPage";
import Cards from "./Components/Cards/Cards";
import Navbar from "./Components/Navbar/NavBar";
import Detail from "./Detail/Detail";
import Footer from "./Components/Footer/Footer";

export default function App() {
  const dogs = useSelector((state) => state.dogs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearDogs());
    dispatch(allDogs());
  }, []);

  useEffect(() => {
    dispatch(clearDogs) && navigate("/");
  }, []);

  return (
    <div className={style.App}>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Cards dogs={dogs}></Cards>
              <Footer />
            </>
          }
        />
        <Route
          path="/favorites"
          element={
            <>
              <Navbar />
              <Footer />
            </>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <>
              <Navbar />
              <Detail />
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}
