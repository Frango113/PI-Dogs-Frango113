const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");
const { apikey } = process.env;

const getAllDogs = async () => {
  let allDogs = [];
  try {
    let { data } = await axios(
      `https://api.thedogapi.com/v1/breeds?api_key=${apikey}`
    );

    const apiDogs = data.map((dog) => {
      if (
        dog.reference_image_id === "B12uzg9V7" ||
        dog.reference_image_id === "_Qf9nfRzL" ||
        dog.reference_image_id === "HkC31gcNm"
      ) {
        dog.reference_image_id = "H1oLMe94m";
      }
      if (dog.temperament === undefined) {
        dog.temperament = "Pandora's box";
      }
      return {
        id: dog.id,
        name: dog.name,
        imagen: `https://cdn2.thedogapi.com/images/${dog?.reference_image_id}.jpg`,
        height: dog.height?.imperial,
        weight: dog.weight?.imperial === "NaN" ? "25-40" : dog.weight.imperial,
        life_span: dog?.life_span,
        breed_for: dog?.bred_for,
        breed_group: dog?.breed_group,
        origin: dog?.origin,
        temperament: dog?.temperament,
      };
    });
    async function saveAllDogs() {
      const dbDogs = await Dog.findAll({
        include: {
          model: Temperament,
        },
      });
      return dbDogs;
    }

    const allDogsArray = await saveAllDogs();
    console.log(allDogsArray);
    const listDbDog = allDogsArray.map((dog) => {
      return {
        id: dog.dataValues.id,
        image: dog.dataValues.imagen,
        name: dog.dataValues.name,
        height: dog.dataValues.altura,
        weight: dog.dataValues.peso,
        life_span: dog.dataValues.life_span,
        temperament: dog.dataValues.Temperaments.map(
          (temp) => temp.Nombre
        ).join(", "),
      };
    });
    console.log("importante", listDbDog);
    allDogs = [...listDbDog, ...apiDogs];

    return allDogs;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getDetail = async (id) => {
  try {
    if (id.length > 3) {
      let allDogs = await getAllDogs();

      let resultado = allDogs.filter((dog) => dog.id === id);

      if (resultado.length) {
        const formattedDog = {
          id: resultado[0].id,
          name: resultado[0].name,
          imagen: resultado[0].imagen,
          height: resultado[0].height,
          weight: resultado[0].weight,
          life_span: resultado[0].life_span,
          temperament: resultado[0].temperament,
        };

        return formattedDog;
      }
    } else {
      const response = await axios.get(
        `https://api.thedogapi.com/v1/breeds/${id}?api_key=${apikey}`
      );
      const dogData = response.data;

      if (dogData.temperament === undefined) {
        dogData.temperament = "pandora's box";
      }
      const formattedDog = {
        id: dogData.id,
        name: dogData.name,
        imagen: `https://cdn2.thedogapi.com/images/${dogData.reference_image_id}.jpg`,
        height: dogData.height.imperial,
        weight:
          dogData.weight.imperial === "NaN"
            ? "25 - 40"
            : dogData.weight.imperial,
        life_span: dogData.life_span,
        breed_for: dogData.bred_for,
        breed_group: dogData.breed_group,
        origin: dogData.origin,
        temperament: dogData?.temperament,
      };
      return formattedDog;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const addDog = async (dog) => {
  if (!dog.name || !dog.imagen || !dog.peso || !dog.altura || !dog.life_span)
    throw new Error("data is missing");

  try {
    const newDog = await Dog.create({
      imagen: dog.imagen,
      name: dog.name,
      altura: dog.altura,
      peso: dog.peso,
      life_span: dog.life_span,
    });
    if (dog.temperament && dog.temperament.length > 0) {
      for (const temp of dog.temperament) {
        const associationTemperament = await Temperament.findOne({
          where: {
            Nombre: temp,
          },
        });

        if (associationTemperament) {
          await newDog.addTemperament(associationTemperament);
        }
      }
    }

    return newDog;
    await newDog.save();

    const allDogs = await Dog.findAll();

    return allDogs;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDogBreeds = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${apikey}`
    );
    const dogData = response.data;
    const seenBreeds = {};

    //?mapea datos

    const breeds = dogData.reduce((accumulator, dog) => {
      const breed = dog.breed_group;

      if (!seenBreeds[breed]) {
        seenBreeds[breed] = true;

        accumulator.push({
          breed: breed,
        });
      }
      return accumulator;
    }, []);
    res.json(breeds);
  } catch (error) {
    console.error(
      "There was an error while trying to fetch breeds from API: ",
      error
    );
    res
      .status(500)
      .json({ error: "There was an error while attempting to fetch breeds. " });
  }
};
//! Funcione que busca por nombre!//
async function searchDogsByName(name) {
  //console.log(name);
  if (!name) throw new Error("You need to insert a name");

  try {
    let apiResponse = await axios("https://api.thedogapi.com/v1/breeds");
    //console.log(apiResponse.data);
    apiResponse = apiResponse.data;
    const NameDog = apiResponse.filter((dog) => dog.name.includes(name));
    //console.log(NameDog);
    if (NameDog.length > 0) {
      const dogs = NameDog.map((dog) => ({
        name: dog.name,
        id: dog.id,
        life: dog.life_span,
        imagen: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
        weight: dog.weight.imperial,
        height: dog.height.imperial,
        temperament: dog.temperament,
      }));
      //return dogs;

      let dbResponse = await Dog.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
        include: Temperament,
      });

      const { id, imagen, altura, peso, life_span } = dbResponse;
      const DogDb = {
        id: id,
        name: name,
        image: imagen,
        height: altura,
        weight: peso,
        life_span: life_span,
      };
      if (DogDb > 0) {
        let allSearchedDogs = [DogDb, ...dogs];
        if (allSearchedDogs.length === 0) {
          throw new Error("There is no dogs with this name");
        }
        return allSearchedDogs;
      } else {
        return dogs;
      }
    }
  } catch (error) {
    throw new Error(error);
  }
}
const dbDogs = async () => {
  try {
    const dbDogs = await Dog.findAll();
    return (
      dbDogs.length > 0 ? dbDogs : [],
      console.log("it seems like no breed was created")
    );
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  getAllDogs,
  dbDogs,
  searchDogsByName,
  addDog,
  getDetail,
  getDogBreeds,
};
