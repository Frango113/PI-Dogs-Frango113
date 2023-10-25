import React from "react";
import { Link } from "react-router-dom";
import style from "../Landing/LandingPage.module.css";

export default function LandingPage() {
  return (
    <>
      <div className={style.container}>
        <div className={style.form}>
          <h1>K9s</h1>
          <Link to="/home">
            <button className={style.homeButton}>START!</button>
          </Link>
        </div>
      </div>
    </>
  );
}
