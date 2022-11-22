export default function createPhotographCard(data) {
   console.log(data);
   // const container = document.querySelector(".photographer_section");
   const article = document.createElement("article");
   const link = document.createElement("a");
   const figure = document.createElement("figure");
   const figcaption = document.createElement("figcaption");
   const img = document.createElement("img");
   const articleFooter = document.createElement("footer");
   const h2 = document.createElement("h2");
   const h3 = document.createElement("h3");
   const quote = document.createElement("p");
   const pricing = document.createElement("p");

   h2.textContent = data.name;
   h3.textContent = `${data.city}, ${data.country}`;
   quote.textContent = data.tagline;
   pricing.textContent = `${data.price}€/jour`;

   img.setAttribute("src", `./assets/photographers/${data.portrait}`);
   img.setAttribute("aria-label", `Avatar de ${data.name}`);
   link.setAttribute("href", `./photographer.html?id=${data.id}`);
   link.setAttribute("aria-label", `Visitez la page de ${data.name}`);
   link.setAttribute("tabindex", "2");

   // container && container.appendChild(article);
   article.appendChild(link);
   link.appendChild(figure);
   figure.appendChild(img);
   figure.appendChild(figcaption);
   figcaption.appendChild(h2);
   article.appendChild(articleFooter);
   articleFooter.appendChild(h3);
   articleFooter.appendChild(quote);
   articleFooter.appendChild(pricing);

   return article;
}
