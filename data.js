import Photograph from "./scripts/object/photograph.js";

export default class Data {
   constructor(url) {
      this.url = url;
   }

   async getDatas() {
      const response = await fetch(this.url);
      if (response.ok) {
         let datas = await response.json();
         return datas;
      }
   }
}
