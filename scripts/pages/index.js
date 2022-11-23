import Data from "../../data.js";
import Photograph from "../object/photograph.js";
import { Factory } from "../factories/photographFactory.js";
import createPhotographCard from "../utils/photographCard.js";

const init = new Data("./data/photographers.json");
let data = await init.getDatas();

for (const element of data.photographers) {
   const container = document.querySelector(".photographer_section");
   let photograph = Factory(element, "photograph");
   let photographCard = createPhotographCard(photograph);
   container.appendChild(photographCard);
}
