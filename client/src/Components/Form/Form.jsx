import React, { useState } from "react";
import style from "./Form.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Form() {
  const [dogAdd, setDogAdd] = useState(false);
  const [create, setCreate] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    imagen: "",
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
    // Realiza las validaciones aquí antes de enviar los datos al servidor
    if (
      !formData.name ||
      !formData.temperament ||
      !formData.maxWeight ||
      !formData.minWeight ||
      !formData.maxHeight ||
      !formData.maxHeight ||
      !formData.imagen ||
      !formData.life_span
    ) {
      alert("Please fill the form with all the data");
      return;
    }

    let errorMessage = "";

    if (typeof formData.name !== "string") {
      errorMessage = "Name must be a text string";
    } else if (typeof formData.imagen !== "string") {
      errorMessage = "Image must be an URL";
    } else if (
      isNaN(formData.minHeight) ||
      isNaN(formData.maxHeight) ||
      isNaN(formData.minWeight) ||
      isNaN(formData.maxWeight)
    ) {
      errorMessage =
        "Las propiedades de altura y peso deben ser números válidos.";
    }

    if (errorMessage) {
      alert(`Error de validación: ${errorMessage}`);
    } else {
      try {
        let newDog = {
          name: formData.name,
          imagen: formData.imagen,
          peso: `${formData.minWeight} - ${formData.maxWeight}`,
          altura: `${formData.minHeight} - ${formData.maxHeight}`,
          life_span: formData.life_span,
          temperament: formData.temperament,
        };
        const response = await axios.post(
          "http://localhost:3001/dogs/",
          newDog
        );

        if (response) {
          // La solicitud se completó con éxito

          setDogAdd(true);
          setCreate(false);
        } else {
          // Hubo un error en la solicitud
          console.log("Hubo un error al crear la raza de perro.");
        }
      } catch (error) {
        console.error("Error al enviar los datos al servidor:", error);
        console.log("Hubo un error al crear la raza de perro.");
      }
    }
  };

  const handleBackClick = () => {
    // Cuando se hace clic en el botón "BACK", ocultar el mensaje.
    setDogAdd(false);
  };

  return (
    <>
      {dogAdd && (
        <div className={style.containerAdd}>
          <h1 className={style.add}>Perro Agregado!</h1>
          <h2 className={style.addH2}>
            Felicidades, ahora puedes volver a Home <br></br>y buscar a tu perro
            por nombre! <br></br>
            <br></br>Tambien puedes ver todos los perros que has creado{" "}
            <br></br> aplicando el filtro...
          </h2>
          <Link to="/home" className={style.back}>
            <button onClick={handleBackClick}>BACK</button>
          </Link>
        </div>
      )}
      {create && (
        <div className={style.container}>
          <form onSubmit={handleSubmit} className={style.create}>
            <label>
              Nombre:
              <input
                className={style.input}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Insert Name"
              />
            </label>
            <label>
              Imagen:
              <input
                className={style.input}
                type="text"
                name="imagen"
                value={formData.imagen}
                onChange={handleChange}
                placeholder="Insert URL"
              />
            </label>
            <label>
              Altura Mínima:
              <input
                className={style.input}
                type="number"
                name="minHeight"
                value={formData.minHeight}
                onChange={handleChange}
                placeholder="Insert Minimum height"
              />
            </label>
            <label>
              Altura Máxima:
              <input
                className={style.input}
                type="number"
                name="maxHeight"
                value={formData.maxHeight}
                onChange={handleChange}
                placeholder="Insert Maximum height"
              />
            </label>
            <label>
              Peso Mínimo:
              <input
                className={style.input}
                type="number"
                name="minWeight"
                value={formData.minWeight}
                onChange={handleChange}
                placeholder="Insert Minimum weight"
              />
            </label>
            <label>
              Peso Máximo:
              <input
                className={style.input}
                type="number"
                name="maxWeight"
                value={formData.maxWeight}
                onChange={handleChange}
                placeholder="Insert Maximum Weight"
              />
            </label>
            <label>
              Años de Vida:
              <input
                className={style.input}
                type="number"
                name="life_span"
                value={formData.life_span}
                onChange={handleChange}
                placeholder="Insert Lifespan"
              />
            </label>
            <label>
              Temperamentos (separados por coma):
              <input
                className={style.input}
                type="text"
                name="temperament"
                value={formData.temperament}
                onChange={handleChange}
                placeholder="Insert Tempers"
              />
            </label>
            <button type="submit" className={style.button}>
              Crear Perro
            </button>
          </form>
        </div>
      )}
    </>
  );
}
