import MediaType from "../factories/mediaFactory.js";
import Modal from "../utils/modal.js";
export default class Photograph {
   constructor(data, mediasData) {
      this.name = data.name;
      this.id = data.id;
      this.city = data.city;
      this.country = data.country;
      this.tagline = data.tagline;
      this.price = data.price;
      this.portrait = data.portrait;
      this.mediaList = [];
      // this.#getMediaList(mediasData);
   }

   #displayPhotographInfos(photographerId) {
      if (photographerId == this.id) {
         const container = document.querySelector(".photograph-header");
         const photographInfos = document.createElement("div");
         const photographName = document.createElement("h1");
         const location = document.createElement("p");
         const quote = document.createElement("p");
         const img = document.createElement("img");
         img.setAttribute("src", `./assets/photographers/${this.portrait}`);
         container.prepend(photographInfos);
         photographInfos.append(photographName, location, quote);
         container.appendChild(img);

         photographName.textContent = this.name;
         location.textContent = `${this.city}, ${this.country}`;
         quote.textContent = this.tagline;
      }
   }

   getMediaList(mediasData) {
      mediasData.forEach((element) => {
         if (element.photographerId === this.id) {
            let media = new MediaType(element);
            this.mediaList.push(media);
         }
      });
      this.mediaList.sort((a, b) => (a.likes > b.likes ? 1 : -1));
   }

   populatePhotographPage(photographerId) {
      this.#displayPhotographInfos(photographerId);
      this.createFilterBar();
      this.#displayRealisations();
      this.#createStickyBar();
      this.#addLikeEvent();
      this.#handleModal();
   }

   createFilterBar() {
      const container = document.getElementById("main");
      const filterContainer = document.createElement("div");
      const pFilter = document.createElement("p");
      const select = document.createElement("div");
      const layer = document.createElement("span");
      let expanded = false;
      layer.setAttribute("class", "layer");
      layer.setAttribute("role", "button");
      layer.setAttribute("aria-haspopup", "listbox");
      layer.setAttribute("aria-expanded", "false");
      layer.setAttribute("tabindex", "3");
      layer.setAttribute("aria-controls", "select-filter");

      select.setAttribute("class", "select select-closed");
      select.innerHTML = `<div class="select-option" id="likes">
      <p>Popularité</p>
   </div>
   <div class="select-option" id="date">
   <p>Date</p>
   </div>
   <div class="select-option" id="title">
   <p>Titre</p>
   </div>`;
      select.setAttribute("id", "select-filter");
      select.setAttribute("role", "listbox");
      select.setAttribute("aria-activedescendant", "select-filter");

      pFilter.textContent = "Trier par";

      filterContainer.setAttribute("class", "select-bar");

      container.appendChild(filterContainer);
      filterContainer.append(pFilter, layer, select);

      const selects = document.querySelectorAll(".select-option");
      selects.forEach((option) => {
         option.setAttribute("role", "option");
         option.setAttribute("tabindex", "3");
         option.setAttribute("aria-label", `Trier par ${option.innerText}`);
         option.setAttribute("aria-hidden", "true");
      });

      layer.addEventListener("click", () => {
         expanded = !expanded;
         layer.setAttribute("aria-expanded", expanded);
         select.classList.toggle("select-closed");
         select.setAttribute("aria-hidden", !expanded);
         this.displayFilter(selects);
      });
      this.handleFilter();
   }
   displayFilter(options) {
      for (let i = 0; i < options.length; i++) {
         if (i != 0) {
            options[i].style.display = "flex";
         }
      }
   }
   #displayRealisations() {
      const container = document.getElementById("main");
      const directory = document.createElement("section");
      directory.setAttribute("class", "photograph-work");
      container.appendChild(directory);
      this.mediaList.forEach((element) => {
         element.createMediaDomElement();
         element.handleLightbox(this.mediaList);
      });
   }

   #calculateLikeCount() {
      let likeCount = 0;
      this.mediaList.forEach((media) => {
         likeCount += media.likes;
      });
      return likeCount;
   }

   #createStickyBar() {
      const body = document.querySelector("body");
      const container = document.createElement("div");
      container.setAttribute("class", "overlay");
      const countContainer = document.createElement("div");
      const pCount = document.createElement("p");
      const icon = document.createElement("i");
      const pricing = document.createElement("p");
      icon.setAttribute("class", "fa-solid fa-heart");
      body.appendChild(container);
      countContainer.append(pCount, icon);
      container.append(countContainer, pricing);
      pCount.textContent = this.#calculateLikeCount();
      pricing.textContent = `${this.price}€ / jour`;
   }

   updateLikeCount() {
      const pCount = document.querySelector(".overlay p");
      pCount.textContent = this.#calculateLikeCount();
   }
   handleFilter() {
      let options = document.querySelectorAll(".select-option");
      let target = options[0];
      for (let i = 0; i < options.length; i++) {
         if (i != 0) {
            options[i].style.display = "none";
         }
      }
      const select = document.querySelector(".select");
      options.forEach((option) => {
         option.addEventListener("click", () => {
            target = option;
            select.prepend(option);
            select.classList.toggle("select-closed");
            this.sortByFilter(option.id);
         });
      });
   }
   sortByFilter(option) {
      const filter = option;
      const sortedList = this.mediaList.sort((a, b) =>
         a[filter] > b[filter] ? 1 : -1
      );
      const directory = document.querySelector(".photograph-work");
      directory.innerHTML = "";
      sortedList.forEach((element) => {
         element.createMediaDomElement();
         element.handleLightbox(this.mediaList);
         this.#addLikeEvent();
      });
   }

   #addLikeEvent() {
      const likeBtn = document.querySelectorAll("figure button");
      likeBtn.forEach((btn) => {
         btn.addEventListener("click", () => {
            this.updateLikeCount();
         });
      });
   }
   #handleModal() {
      const button = document.querySelector(".contact_button");
      button.addEventListener("click", () => {
         const modal = new Modal(this.name);
      });
   }
}
