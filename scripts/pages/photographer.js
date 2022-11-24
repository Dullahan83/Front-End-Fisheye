import Data from "../../data.js";
import Photograph from "../object/photograph.js";

// get the photograph id from url params
const url = new URL(window.location.href);
const photographerId = url.searchParams.get("id");

//fetch datas
const init = new Data("./data/photographers.json");
let data = await init.getDatas();

// filter through datas and return photograph corresponding to id in params
const photographObject = await data.photographers.filter(
   (photographer) => photographer.id == photographerId
);

// create the elements relative to photograph
const photograph = new Photograph(photographObject[0]);
photograph.getMediaList(data.media);
photograph.populatePhotographPage(photographerId);
