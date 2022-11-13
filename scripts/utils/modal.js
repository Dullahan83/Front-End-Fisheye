export default class Modal {
   constructor(name) {
      this.#createModal(name);
      this.isOpened = true;
   }
   #createModal(name) {
      // Creating dom element for modal

      const body = document.querySelector("body");
      const modalContainer = document.createElement("div");
      const modal = document.createElement("div");
      const modalHeader = document.createElement("header");
      const headerTextContainer = document.createElement("div");
      const headerH2 = document.createElement("h2");
      const headerName = document.createElement("h2");
      const headerImg = document.createElement("img");
      const form = document.createElement("form");
      const inputsContainer = document.createElement("div");
      const labelPrenom = document.createElement("label");
      const inputPrenom = document.createElement("input");
      const labelNom = document.createElement("label");
      const inputNom = document.createElement("input");
      const labelMail = document.createElement("label");
      const inputMail = document.createElement("input");
      const labelMessage = document.createElement("label");
      const inputMessage = document.createElement("textarea");
      const button = document.createElement("button");

      modalContainer.setAttribute("id", "contact_modal");
      modal.setAttribute("class", "modal");
      headerH2.textContent = "Contactez-moi";
      headerName.textContent = name;
      button.textContent = "Envoyer";
      headerImg.setAttribute("src", "./assets/icons/close.svg");
      headerImg.setAttribute("aria-label", "Fermer le formulaire de contact");
      headerImg.setAttribute("tabindex", "6");
      // setting surname input attribute

      labelPrenom.textContent = "Prénom";
      labelPrenom.setAttribute("for", "prenom");
      inputPrenom.setAttribute("placeholder", "Votre prénom");
      inputPrenom.setAttribute("id", "prenom");
      inputPrenom.setAttribute("name", "prenom");

      // setting name input attribute

      labelNom.textContent = "Nom";
      labelNom.setAttribute("for", "nom");
      inputNom.setAttribute("placeholder", "Votre nom");
      inputNom.setAttribute("id", "nom");
      inputNom.setAttribute("name", "nom");
      inputNom.setAttribute("type", "text");

      // setting email input attribute

      labelMail.textContent = "Email";
      labelMail.setAttribute("for", "mail");
      inputMail.setAttribute("placeholder", "Votre email");
      inputMail.setAttribute("id", "email");
      inputMail.setAttribute("name", "email");
      inputMail.setAttribute("type", "email");

      // setting message input attribute

      labelMessage.textContent = "Votre message";
      labelMessage.setAttribute("for", "message");
      inputMessage.setAttribute("placeholder", "Votre message");
      inputMessage.setAttribute("id", "message");
      inputMessage.setAttribute("name", "message");

      headerImg.addEventListener("click", () => {
         this.#closeModal();
      });
      window.addEventListener("keydown", (e) => {
         e.key === "Escape" && this.#closeModal();
      });

      button.addEventListener("click", (e) => {
         this.#submitForm(e);
      });

      body.appendChild(modalContainer);
      modalContainer.appendChild(modal);
      modal.appendChild(modalHeader);
      modalHeader.append(headerTextContainer, headerName);
      headerTextContainer.append(headerH2, headerImg);
      modal.appendChild(form);
      form.append(inputsContainer, button);
      inputsContainer.append(
         labelPrenom,
         inputPrenom,
         labelNom,
         inputNom,
         labelMail,
         inputMail,
         labelMessage,
         inputMessage
      );
      body.style.overflowY = "hidden";
      inputPrenom.focus();
      window.addEventListener("keydown", (e) => {
         console.log(e);
      });
   }

   #closeModal() {
      const body = document.querySelector("body");
      const modalContainer = document.querySelector("#contact_modal");
      this.isOpened && modalContainer.remove();
      this.isOpened && (body.style.overflowY = "visible");
      this.isOpened = false;
   }

   #submitForm(e) {
      e.preventDefault();
      const inputs = document.querySelectorAll("form input");
      inputs.forEach((input) => {
         console.log(input.value);
      });
      const textarea = document.querySelector("form textarea");
      console.log(textarea.value);
      this.#closeModal();
   }
}
