import Data from "../../data.js";
import Photograph from "../object/photograph.js";

const init = new Data("./data/photographers.json");
let data = await init.getDatas();

for (const element of data.photographers) {
   const photograph = new Photograph(element, data.media);
   photograph.createPhotographCard();
}
