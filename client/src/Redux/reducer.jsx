import {
  DOGBYNAME,
  DOGBYID,
  DOG_ERROR,
  ALLDOGS,
  ORDER,
  FILTER_TEMP,
  ALLTEMP,
  CLEAR_DOGS,
  FILTER_ORIGIN,
  FILTER_LIFE,
  RESTART,
} from "../Redux/actions";

let initialState = {
  dogs: [],
  allDogs: [],
  temperament: [],
  searchError: false,
  orderAndFilter: { order: "A", tempFilter: "All", originFilter: "all" },
};

export default function rootReducer(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case DOGBYNAME:
      return {
        ...state,
        dogs: payload,
        allDogs: payload,
        searchError: false,
        orderAndFilter: {
          order: "A",
          tempFilter: "All",
          originFilter: "all",
        },
      };
    case DOGBYID:
      return {
        ...state,
        dogs: payload,
        allDogs: payload,
        searchError: false,
      };
    case ALLDOGS:
      let result = [];
      payload.forEach((dog) => {
        let words = dog.temperament ? dog.temperament.split(", ") : [];
        let firstWord = words[0];
        if (!result.includes(firstWord)) {
          result.push(firstWord);
        }
      });
      return {
        ...state,
        allDogs: payload,
        dogs: payload,
        temperament: result,
      };
    case ALLTEMP:
      return { ...state, temperament: payload };
    case DOG_ERROR:
      return {
        ...state,
        searchError: true,
        dogs: [],
        allDogs: [],
      };

    case ORDER:
      let orderedDogs = [...state.dogs];
      let orderedAllDogs = [...state.allDogs];

      switch (payload) {
        case "A":
          orderedDogs?.sort((a, b) => a.name.localeCompare(b.name));
          orderedAllDogs?.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "D":
          orderedDogs?.sort((a, b) => b.name.localeCompare(a.name));
          orderedAllDogs?.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "minWeight":
          orderedDogs?.sort((a, b) => {
            let pesoA;
            let pesoB;
            if (!a.weight) {
              pesoA =
                a.peso?.split("-")[1]?.trim() || a.peso?.split("-")[0]?.trim();
            } else {
              pesoA =
                a.weight?.split("-")[1]?.trim() ||
                a.weight?.split("-")[0]?.trim();
            }
            if (!b.weight) {
              pesoB =
                b.peso?.split("-")[1]?.trim() || b.peso?.split("-")[0]?.trim();
            } else {
              pesoB =
                b.weight?.split("-")[1]?.trim() ||
                b.weight?.split("-")[0]?.trim();
            }
            return parseInt(pesoA) - parseInt(pesoB);
          });
          orderedAllDogs?.sort((a, b) => {
            let pesoA;
            let pesoB;
            if (!a.weight) {
              pesoA =
                a.peso?.split("-")[1]?.trim() || a.peso?.split("-")[0]?.trim();
            } else {
              pesoA =
                a.weight?.split("-")[1]?.trim() ||
                a.weight?.split("-")[0]?.trim();
            }
            if (!b.weight) {
              pesoB =
                b.peso?.split("-")[1]?.trim() || b.peso?.split("-")[0]?.trim();
            } else {
              pesoB =
                b.weight?.split("-")[1]?.trim() ||
                b.weight?.split("-")[0]?.trim();
            }
            return parseInt(pesoA) - parseInt(pesoB);
          });

          break;
        case "maxWeight":
          orderedDogs?.sort((a, b) => {
            let pesoA;
            let pesoB;
            if (!a.weight) {
              pesoA = a.peso?.split(" - ");
              pesoA = pesoA.length > 1 ? pesoA[1] : pesoA[0];
            } else {
              pesoA = a.weight?.split(" - ");
              pesoA = pesoA.length > 1 ? pesoA[1] : pesoA[0];
            }
            if (!b.weight) {
              pesoB = b.peso?.split(" - ");
              pesoB = pesoB.length > 1 ? pesoB[1] : pesoB[0];
            } else {
              pesoB = b.weight?.split(" - ");
              pesoB = pesoB.length > 1 ? pesoB[1] : pesoB[0];
            }
            return parseInt(pesoB) - parseInt(pesoA);
          });
          orderedAllDogs?.sort((a, b) => {
            let pesoA;
            let pesoB;
            if (!a.weight) {
              pesoA = a.peso?.split(" - ");
              pesoA = pesoA.length > 1 ? pesoA[1] : pesoA[0];
            } else {
              pesoA = a.weight?.split(" - ");
              pesoA = pesoA.length > 1 ? pesoA[1] : pesoA[0];
            }
            if (!b.weight) {
              pesoB = b.peso?.split(" - ");
              pesoB = pesoB.length > 1 ? pesoB[1] : pesoB[0];
            } else {
              pesoB = b.weight?.split(" - ");
              pesoB = pesoB.length > 1 ? pesoB[1] : pesoB[0];
            }
            return parseInt(pesoB) - parseInt(pesoA);
          });
          break;
        default:
          break;
      }
      return {
        ...state,
        dogs: orderedDogs,
        allDogs: orderedAllDogs,
        orderAndFilter: {
          ...state.orderAndFilter,
          order: payload ? payload : "A",
        },
      };

    case FILTER_TEMP:
      if (payload === "All") {
        return {
          ...state,
          dogs: state.allDogs,
          orderAndFilter: {
            ...state.orderAndFilter,
            tempFilter: payload,
          },
          searchError: state.allDogs.length > 0 ? false : true,
        };
      } else {
        let filteredDogs = state.allDogs.filter((dog) =>
          dog?.temperament?.includes(payload)
        );

        return {
          ...state,
          dogs: filteredDogs,
          orderAndFilter: {
            ...state.orderAndFilter,
            tempFilter: payload,
            originFilter: "All",
          },
          searchError: filteredDogs.length ? false : true,
        };
      }

    case FILTER_ORIGIN:
      if (payload === "All") {
        return {
          ...state,
          dogs: state.allDogs,
          orderAndFilter: {
            ...state.orderAndFilter,
            tempFilter: payload,
          },
          searchError: state.allDogs.length > 0 ? false : true,
        };
      } else {
        let filteredDogs = [];
        if (payload === "real")
          filteredDogs = state.allDogs.filter(
            (dog) => typeof dog?.id === "number"
          );
        else if (payload === "created")
          filteredDogs = state.allDogs.filter(
            (dog) => typeof dog?.id === "string"
          );

        return {
          ...state,
          dogs: filteredDogs,
          orderAndFilter: {
            ...state.orderAndFilter,
            originFilter: payload,
            tempFilter: "All",
          },
          searchError: filteredDogs.length ? false : true,
        };
      }
    case FILTER_LIFE:
      let filteredDogsByLife;
      /* console.log(payload); */
      if (payload === "Short") {
        filteredDogsByLife = state.allDogs.filter((dog) => {
          const firstPart = dog.life_span.split("-")[0].slice(0, 2);
          return parseInt(firstPart) >= 10 && parseInt(firstPart) <= 13;
        });
      } else if (payload === "Medium") {
        filteredDogsByLife = state.allDogs.filter((dog) => {
          const firstPart = dog.life_span.split("-")[0].slice(0, 2);
          return parseInt(firstPart) >= 13 && parseInt(firstPart) < 15;
        });
      } else {
        filteredDogsByLife = state.allDogs.filter((dog) => {
          const firstPart = dog.life_span.split("-")[0].slice(0, 2);
          return parseInt(firstPart) >= 15;
        });
      }
      return {
        ...state,
        dogs: filteredDogsByLife,
        orderAndFilter: {
          ...state.orderAndFilter,
          originFilter: "all",
          tempFilter: "All",
        },
        searchError: filteredDogsByLife.length > 0 ? false : true,
      };
    case RESTART:
      return {
        ...state,
        dogs: state.allDogs,
      };
    default:
      return { ...state };
  }
}
