import Media from "./media.js";
import Lightbox from "./lightbox.js";
export default class Video extends Media {
   constructor(data) {
      super(data);
      this.video = data.video;
   }
   createMediaDomElement(media, inLightbox) {
      const video = document.createElement("video");
      video.setAttribute("type", "video/mp4");
      if (!inLightbox) {
         video.setAttribute(
            "src",
            `./assets/images/${this.photographerId}/${this.video}`
         );

         this.createMediaCard(video);
      } else {
         video.setAttribute(
            "src",
            `./assets/images/${media.photographerId}/${media.video}`
         );
         video.setAttribute("controls", "controls");

         return video;
      }
   }
   createLightbox(mediaList) {
      const video = document.createElement("video");
      video.setAttribute(
         "src",
         `./assets/images/${this.photographerId}/${this.video}`
      );
      video.setAttribute("controls", "controls");

      video.setAttribute("type", "video/mp4");
      const lightbox = new Lightbox(this, mediaList);
      lightbox.createDomLightbox(video);
   }
}
