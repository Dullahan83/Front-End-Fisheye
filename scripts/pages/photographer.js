import Data from "../../data.js";
import Photograph from "../object/photograph.js";

//Mettre le code JavaScript lié à la page photographer.html
const url = new URL(window.location.href);
const photographerId = url.searchParams.get("id");
const init = new Data("./data/photographers.json");

let data = await init.getDatas();
const photographObject = await data.photographers.filter(
   (photographer) => photographer.id == photographerId
);
const photograph = new Photograph(photographObject[0]);
photograph.getMediaList(data.media);
photograph.populatePhotographPage(photographerId);
