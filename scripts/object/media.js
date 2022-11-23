export default class Media {
   constructor(data) {
      this.id = data.id;
      this.photographerId = data.photographerId;
      this.title = data.title;
      this.likes = data.likes;
      this.date = data.date;
      this.price = data.price;
      this.media = null;
      this.isLiked = false;
      this.likeIcon = null;
   }

   createMediaCard(mediaDom) {
      const directory = document.querySelector(".photograph-work");
      const link = document.createElement("a");
      const figure = document.createElement("figure");
      this.media = mediaDom;
      const figcaption = document.createElement("figcaption");
      const mediaName = document.createElement("h2");
      const likeContainer = document.createElement("div");
      const likeCount = document.createElement("p");
      const likeButton = document.createElement("button");
      this.likeIcon = document.createElement("i");

      //set the heart style depending on the like status
      this.likeIcon.setAttribute(
         "class",
         this.isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"
      );
      this.likeIcon.setAttribute(
         "aria-label",
         this.isLiked
            ? "Vous avez liké ce media"
            : "Vous n'avez pas encore liké ce média"
      );
      this.likeIcon.setAttribute("tabindex", "4");
      link.setAttribute("aria-label", `Afficher ${this.title} en grand`);
      link.setAttribute("href", "#");
      link.setAttribute("tabindex", "4");
      mediaName.textContent = this.title;
      likeCount.textContent = this.likes;

      directory.appendChild(figure);
      link.appendChild(this.media);
      figure.append(link, figcaption);
      likeContainer.append(likeCount, likeButton);
      likeButton.appendChild(this.likeIcon);
      figcaption.append(mediaName, likeContainer);

      likeButton.addEventListener("click", () => {
         this.handleLike();
      });
   }

   handleLike() {
      this.likeIcon.classList.toggle("fa-regular");
      this.likeIcon.classList.toggle("fa-solid");
      this.isLiked = !this.isLiked;
      this.isLiked ? this.likes++ : this.likes--;
      const likeCount = this.likeIcon.parentElement.previousElementSibling;
      likeCount.textContent = this.likes;
   }

   handleLightbox(medialist) {
      this.media.parentElement.addEventListener("click", () => {
         this.createLightbox(medialist);
      });
   }
}
