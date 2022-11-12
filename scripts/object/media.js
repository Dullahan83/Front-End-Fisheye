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
      this.likeBtn = null;
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
      this.likeBtn = document.createElement("i");
      this.likeBtn.setAttribute(
         "class",
         this.isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"
      );

      mediaName.textContent = this.title;
      likeCount.textContent = this.likes;

      directory.appendChild(link);
      link.appendChild(figure);
      figure.append(this.media, figcaption);
      likeContainer.append(likeCount, this.likeBtn);
      figcaption.append(mediaName, likeContainer);

      this.likeBtn.addEventListener("click", () => {
         this.handleLike();
      });
   }

   handleLike() {
      this.likeBtn.classList.toggle("fa-regular");
      this.likeBtn.classList.toggle("fa-solid");
      this.isLiked = !this.isLiked;
      this.isLiked ? this.likes++ : this.likes--;
      const likeCount = this.likeBtn.previousElementSibling;
      likeCount.textContent = this.likes;
   }

   handleLightbox(medialist) {
      this.media.addEventListener("click", () => {
         this.createLightbox(medialist);
      });
   }
}
