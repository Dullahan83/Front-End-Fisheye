export default class Lightbox {
   constructor(data, list) {
      this.media = data;
      this.mediaList = list;
      this.currentIndex = this.findInitialIndex();
      this.opened = true;
   }

   // create dom element for the lightbox
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
      const header = document.querySelector("header");
      const stickyBar = document.querySelector(".overlay");
      const main = document.querySelector("main");

      body.append(lightboxScreen);
      lightboxScreen.appendChild(lightboxContainer);
      lightboxContainer.append(navLeft, mediaContainer, navRightContainer);
      figCaption.appendChild(mediaTitle);
      navRightContainer.append(closeIcon, navRight);
      mediaContainer.innerHTML = "";
      mediaContainer.append(mediaDom, figCaption);

      lightboxScreen.setAttribute("class", "lightbox-overlay");
      lightboxContainer.setAttribute("class", "lightbox-container");
      navLeft.setAttribute("class", "fa-solid fa-chevron-left");
      navRight.setAttribute("class", "fa-solid fa-chevron-right");
      closeIcon.setAttribute("class", "fa-solid fa-xmark");

      //set accessibility attribute
      mediaDom.setAttribute("title", this.media.title);
      navLeft.setAttribute(
         "aria-label",
         "Appuyer sur les touches fleche gauche ou q pour passer au média précédent"
      );
      navLeft.setAttribute("tabindex", "2");
      navRight.setAttribute(
         "aria-label",
         "Appuyer sur les touches fleche droite ou d pour passer au média suivant"
      );
      navRight.setAttribute("tabindex", "3");
      closeIcon.setAttribute(
         "aria-label",
         "Appuyer sur la touche Echap pour fermer la vue agrandie"
      );
      closeIcon.setAttribute("tabindex", "4");

      mediaTitle.textContent = this.media.title;
      body.style.overflowY = "hidden";

      //set event listener for keyboard navigation in lighbox
      window.addEventListener("keydown", (e) => {
         (e.key === "ArrowLeft" || e.key === "q") &&
            this.navigateMedia(mediaContainer, figCaption, mediaTitle, "left");
         (e.key === "ArrowRight" || e.key === "d") &&
            this.navigateMedia(mediaContainer, figCaption, mediaTitle, "right");
         e.key === "Escape" && this.closeLightbox();
      });
      // add click events
      navLeft.addEventListener("click", () => {
         this.navigateMedia(mediaContainer, figCaption, mediaTitle, "left");
      });
      navRight.addEventListener("click", () => {
         this.navigateMedia(mediaContainer, figCaption, mediaTitle, "right");
      });
      closeIcon.addEventListener("click", () => {
         this.closeLightbox();
      });

      const domElems = [header, stickyBar, main];

      //hide dom element that shouldn't be displayed when lightbox is open
      domElems.forEach((elem) => {
         elem.setAttribute("aria-hidden", "true");
         elem.classList.add("hidden");
      });
   }

   // return the index of the opened media in lightbox
   findInitialIndex() {
      for (let i = 0; i < this.mediaList.length; i++) {
         if (this.mediaList[i].title === this.media.title) return i;
      }
   }

   // permit the navigation between media in lighbox
   navigateMedia(directory, caption, title, direction) {
      //depending on direction, navigate left or right
      direction === "left"
         ? this.currentIndex - 1 < 0
            ? (this.currentIndex = this.mediaList.length - 1)
            : this.currentIndex--
         : this.currentIndex + 1 > this.mediaList.length - 1
         ? (this.currentIndex = 0)
         : this.currentIndex++;
      const media = this.mediaList[this.currentIndex];

      directory.innerHTML = "";
      title.textContent = media.title;

      const newMediaDom = media.createMediaDomElement(media, true);
      directory.append(newMediaDom, caption);
      caption.append(title);
   }

   // close lightbox and remove dom content
   closeLightbox() {
      const body = document.querySelector("body");
      const lightbox = document.querySelector(".lightbox-overlay");
      this.opened && lightbox.remove();
      this.opened && (body.style.overflowY = "visible");
      this.opened = false;

      const header = document.querySelector("header");
      const stickyBar = document.querySelector(".overlay");
      const main = document.querySelector("main");
      const domElems = [header, stickyBar, main];

      domElems.forEach((elem) => {
         elem.removeAttribute("aria-hidden");
         elem.classList.remove("hidden");
      });
   }
}
