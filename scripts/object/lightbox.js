export default class Lightbox {
   constructor(data, list) {
      this.media = data;
      this.mediaList = list;
      this.currentIndex = this.findInitialIndex();
      this.opened = true;
   }
   createDomLightbox(mediaDom) {
      const body = document.querySelector("body");
      const lightboxScreen = document.createElement("div");
      const lightboxContainer = document.createElement("div");
      const mediaContainer = document.createElement("figure");
      const navLeft = document.createElement("i");
      const navRight = document.createElement("i");
      const navRightContainer = document.createElement("div");
      const closeIcon = document.createElement("i");
      const figCaption = document.createElement("figcaption");
      const mediaTitle = document.createElement("p");
      body.append(lightboxScreen);
      lightboxScreen.appendChild(lightboxContainer);
      lightboxContainer.append(navLeft, mediaContainer, navRightContainer);
      lightboxScreen.setAttribute("class", "lightbox-overlay");
      lightboxContainer.setAttribute("class", "lightbox-container");
      navRightContainer.append(closeIcon, navRight);
      navLeft.setAttribute("class", "fa-solid fa-chevron-left");

      navRight.setAttribute("class", "fa-solid fa-chevron-right");
      closeIcon.setAttribute("class", "fa-solid fa-xmark");
      mediaContainer.innerHTML = "";
      mediaContainer.append(mediaDom, figCaption);
      figCaption.appendChild(mediaTitle);
      mediaTitle.textContent = this.media.title;
      body.style.overflowY = "hidden";
      closeIcon.addEventListener("click", () => {
         this.closeLightbox();
      });

      window.addEventListener("keydown", (e) => {
         (e.key === "ArrowLeft" || e.key === "q") &&
            this.navigateLeft(mediaContainer, figCaption, mediaTitle);
         (e.key === "ArrowRight" || e.key === "d") &&
            this.navigateRight(mediaContainer, figCaption, mediaTitle);
         e.key === "Escape" && this.closeLightbox();
      });
      navLeft.addEventListener("click", () => {
         this.navigateLeft(mediaContainer, figCaption, mediaTitle);
      });
      navRight.addEventListener("click", () => {
         this.navigateRight(mediaContainer, figCaption, mediaTitle);
      });
   }
   findInitialIndex() {
      for (let i = 0; i < this.mediaList.length; i++) {
         if (this.mediaList[i].title === this.media.title) return i;
      }
   }
   navigateLeft(directory, caption, title) {
      this.currentIndex - 1 < 0
         ? (this.currentIndex = this.mediaList.length - 1)
         : this.currentIndex--;
      const media = this.mediaList[this.currentIndex];
      directory.innerHTML = "";
      title.textContent = media.title;

      const newMediaDom = media.createMediaDomElement(media, true);
      directory.append(newMediaDom, caption);
      caption.append(title);
   }

   navigateRight(directory, caption, title) {
      this.currentIndex + 1 > this.mediaList.length - 1
         ? (this.currentIndex = 0)
         : this.currentIndex++;
      const media = this.mediaList[this.currentIndex];
      directory.innerHTML = "";
      title.textContent = media.title;

      const newMediaDom = media.createMediaDomElement(media, true);

      directory.append(newMediaDom, caption);
      caption.append(title);
   }

   closeLightbox() {
      const body = document.querySelector("body");
      const lightbox = document.querySelector(".lightbox-overlay");
      this.opened && lightbox.remove();
      this.opened && (body.style.overflowY = "visible");
      this.opened = false;
   }
}
