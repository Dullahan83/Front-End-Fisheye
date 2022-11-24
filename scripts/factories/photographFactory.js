import Photograph from "../object/photograph.js";

// if type is a photograph create and return a ne photograph object
export const Factory = (data, type) => {
   if (type === "photograph") {
      return new Photograph(data);
   }
};
