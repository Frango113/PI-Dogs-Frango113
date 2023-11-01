import React, { useState } from "react";
import style from "./Form.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Form() {
  const [dogAdd, setDogAdd] = useState(false);
  const [create, setCreate] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    minHeight: "",
    maxHeight: "",
    minWeight: "",
    maxWeight: "",
    life_span: "",
    temperament: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //? validaciones
    if (
      !formData.name ||
      !formData.temperament ||
      !formData.maxWeight ||
      !formData.minWeight ||
      !formData.maxHeight ||
      !formData.minHeight ||
      !formData.image ||
      !formData.life_span
    )
      alert("Please, fill all the required fields ");
    return;
  };
  let errorMessage = "";

  if (typeof formData.name !== "string") {
    errorMessage = "Name must be a test string";
  } else if (typeof formData.image !== "string") {
    errorMessage = "Image must be inserted as an URL";
  } else if (
    formData.minHeight ||
    isNaN(formData.maxHeight) ||
    isNaN(formData.minWeight) ||
    isNaN(formData.maxWeight)
  )
    errorMessage = "Weight and height must be valid numbers";
}
if (errorMessage) {
  alert(`There was a validation error: ${errorMessage}`);
} else {
  try {
    let newDog = {
      name: formData.name,
      image: formData.image,
      peso: `${formData.minWeight}-${formData.maxWeight}`,
      altura: `${formData.minHeight}-${formData.maxHeight}`,
      life_span: formData.life_span,
      temperament: formData.temperament,
    };
    const response = await axios.post("http://localhost:3001/dogs/", newDog);

    if (response) {
      setDogAdd(true);
      setCreate(false);
    } else {
      console.log("There was an error while creating the dog breed");
    }
  } catch (error) {
    console.error("There was anerror sending the data to the server: ", error);
  }
}
const handleBackCLick = () => {
  setDogAdd(false);
};

return (
  <>
    {dogAdd && (
      <div className={style.containerAdd}>
        <h1 className={style.add}></h1>
        <h2 className={style.addH2}></h2>
        <Link to="/home" className={style.back}>
          <button onCLick={handleBackCLick}>BACK</button>
        </Link>
      </div>
    )}
    {create && (
      <div className={style.container}>
        <form onSubmit={handleSUbmit} className={style.create}>
          <label>
            Name:
            <input
              className={style.input}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeHolder="Insert Name "
            />
          </label>
          <label>
            Image:
            <input
              className={style.input}
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeHolder="Insert URL"
            />
          </label>
          <label>
            Minimum Height:
            <input
              className={style.input}
              type="number"
              name="minHeight"
              value={formData.minHeight}
              onChange={handleChange}
              placeHolder="Insert minimum height"
            />
          </label>
          <label>
            Maximum Height:
            <input
              className={style.input}
              type="number"
              name="maxHeight"
              value={formData.maxHeight}
              onChange={handleChange}
              placeHolder="Insert maximum height"
            />
          </label>
          <label>
            Minimum Weight:
            <input
              className={style.input}
              type="number"
              name="minWeight"
              value={formData.minWeight}
              onChange={handleChange}
              placeHolder="Insert minimum Weight"
            />
          </label>
          <label>
            Maximum Weight:
            <input
              className={style.input}
              type="number"
              name="maxWeight"
              value={formData.maxWeight}
              onChange={handleChange}
              placeHolder="Insert maximum Weight"
            />
          </label>
          <label>
            Lifespan:
            <input
              className={style.input}
              type="number"
              name="life_span"
              value={formData.life_span}
              onChange={handleChange}
              placeHolder="Insert lifespan"
            />
          </label>
          <label>
            Temperaments (space them by semicolons):
            <input
              className={style.input}
              type="text"
              name="temperament"
              value={formData.temperament}
              onChange={handleChange}
              placeHolder="Insert tempers"
            />
          </label>
        </form>
      </div>
    )}
  </>
);
