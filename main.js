import { Car } from "./Car.js";
import * as datosCoche from "./mockData.js";

//-----------------PRIMERA PROMESA DEL EJERCICIO--------------------------------

//creo el array de la clase Car y meto dentro de él todos los coches de mockData
export const mapeoArray = () => {
  return new Promise((resolve, reject) => {
    console.log("-------PRIMER EJERCICIO------------");

    const cochesArray = datosCoche.cars.map((cochesData) => {
      const coche = new Car(cochesData.id, cochesData.make);
      coche.setModel(cochesData.model); // Asigna el modelo usando el setter
      coche.setYear(cochesData.year); // Asigna el año usando el setter
      coche.setType(cochesData.type);
      return coche;
    });

    if (cochesArray.length > 0) {
      //compruebo si cochesArray se ha rellenado correctamente
      resolve(cochesArray);
    } else {
      reject("No se ha leído bien el mockData");
    }
  });
};
// AQUI COMPRUEBO SI FUNCIONA....

async function imprimirCoches() {
  console.log(await mapeoArray());
  //voy a comprobar si funciona accediendo a YEAR
}
imprimirCoches();
/*
mapeoArray()
  .then((result) => {
    console.log("Array de coches mapeados:", result); // Imprime el array de coches
    
  })
  .catch((error) => {
    console.error("Error:", error); // Imprime el error si algo sale mal
  });

  esto de arriba sería la version compleja sin await, para que se vea la diferencia
*/

//---------------SEGUNDA PROMESA DEL EJERCICIO-------------------------

export const filtroCoches = () => {
  return new Promise((resolve, reject) => {
    mapeoArray()
      .then((cochesArray) => {
        console.log("-------SEGUNDO EJERCICIO------------");
        let arrayFiltrado = [];

        try {
          arrayFiltrado = cochesArray.filter(
            (coches) => coches.getYear() > 2010
          );
        } catch (error) {
          console.error(error);
        }

        if (arrayFiltrado.length > 0) {
          resolve(arrayFiltrado);
        } else {
          reject("ERROR AL CREAR EL ARRAY FILTRADO");
        }
      })
      .catch((error) => {
        reject(error); // Si hay error en mapeoArray
      });
  });
};
async function filtrarCoches() {
  const cochesFiltrados = await filtroCoches();
  console.log(cochesFiltrados);
  //console.log(cochesFiltrados[0].getId()); --> era para comprobar y si, funciona
}
filtrarCoches();
//--------TERCERA PROMESA -> DIVS ------------------
async function crearDivs() {
  const cochesFiltrados = await filtroCoches();

  // Crear h1 y contenedor principal
  const h1 = document.createElement("h1");
  h1.textContent = "Coches desde 2010";
  const divContainer = document.createElement("div");
  divContainer.classList.add("container");

  // Crear bloques de coches
  const divBlock = document.createElement("div");
  divBlock.classList.add("block");

  cochesFiltrados.forEach((car) => {
    const div = document.createElement("div");

    const pModeloMake = document.createElement("p");
    const pTypeYear = document.createElement("p");
    pModeloMake.textContent = `${car.getModel()} / ${car.getMake()}`;
    pTypeYear.textContent = `${car.getType()} / ${car.getYear()}`;

    div.appendChild(pModeloMake);
    div.appendChild(pTypeYear);
    divBlock.appendChild(div);
  });

  // Añadir todo al contenedor principal
  divContainer.appendChild(h1);
  divContainer.appendChild(divBlock);
  document.body.appendChild(divContainer);
}

async function pruebaDivs() {
  const divs = await crearDivs();
  divs.forEach((div) => {
    document.body.appendChild(div);
  });
}

pruebaDivs();
