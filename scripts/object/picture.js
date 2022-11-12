import Media from "./media.js";
import Lightbox from "./lightbox.js";
export default class Picture extends Media {
   constructor(data) {
      super(data);
      this.image = data.image;
      // this.mediaDom = null;
   }
   createMediaDomElement(media, inLightbox) {
      const img = document.createElement("img");
      if (!inLightbox) {
         img.setAttribute(
            "src",
            `./assets/images/${this.photographerId}/${this.image}`
         );
         img.setAttribute("alt", this.title);
         this.createMediaCard(img);
      } else {
         img.setAttribute(
            "src",
            `./assets/images/${media.photographerId}/${media.image}`
         );
         img.setAttribute("alt", media.title);
         return img;
      }

      /* this.mediaDom = document.createElement("img");
      this.mediaDom.setAttribute(
         "src",
         `./assets/images/${this.photographerId}/${this.image}`
      );
      this.mediaDom.setAttribute("alt", this.title);
      this.createMediaCard(this.mediaDom); */
   }
   createLightbox(mediaList) {
      const img = document.createElement("img");
      img.setAttribute(
         "src",
         `./assets/images/${this.photographerId}/${this.image}`
      );
      img.setAttribute("alt", this.title);
      const lightbox = new Lightbox(this, mediaList);
      lightbox.createDomLightbox(img);
   }
}
