import Photograph from "../object/photograph.js";

export const Factory = (data, type) => {
   if (type === "photograph") {
      return new Photograph(data);
   }
};
