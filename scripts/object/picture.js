import Media from "./media.js";
import Lightbox from "./lightbox.js";
export default class Picture extends Media {
   constructor(data) {
      super(data);
      this.image = data.image;
   }
   createMediaDomElement(media, inLightbox) {
      const img = document.createElement("img");
      if (!inLightbox) {
         img.setAttribute(
            "src",
            `./assets/images/${this.photographerId}/${this.image}`
         );
         // img.setAttribute("aria-label", `Afficher en grand ${this.title}`);
         img.setAttribute("title", this.title);
         this.createMediaCard(img);
      } else {
         img.setAttribute(
            "src",
            `./assets/images/${media.photographerId}/${media.image}`
         );
         // img.setAttribute("aria-label", `Afficher en grand ${media.title}`);
         img.setAttribute("title", media.title);
         return img;
      }
   }
   createLightbox(mediaList) {
      const img = document.createElement("img");
      img.setAttribute(
         "src",
         `./assets/images/${this.photographerId}/${this.image}`
      );
      const lightbox = new Lightbox(this, mediaList);
      lightbox.createDomLightbox(img);
   }
}
