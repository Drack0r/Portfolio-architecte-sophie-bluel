// works.js - Module d'affichage des travaux

import { CONFIG } from "./api.js";

// Sélection de l'élément '.gallery'
const gallery = document.querySelector(CONFIG.GALLERY_SELECTOR);

// Vider le contenu de la gallerie
export function clearGallery() {
  gallery.innerHTML = "";
}

// Créer l'image
function createWorkImage(work) {
  const img = document.createElement("img");
  img.src = work.imageUrl;
  img.alt = work.title;

  return img;
}

// Créer la légende
function createWorkCaption(work) {
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = work.title;

  return figcaption;
}

// Créer l'élément <figure>
export function createWorkElement(work) {
  const workFigure = document.createElement("figure");
  const img = createWorkImage(work);
  const figcaption = createWorkCaption(work);

  // Attacher les éléments au DOM
  workFigure.appendChild(img);
  workFigure.appendChild(figcaption);

  return workFigure;
}

// Afficher les travaux dans la galerie
export function displayWorks(works) {
  clearGallery();

  works.forEach((work) => {
    const workElement = createWorkElement(work);
    gallery.appendChild(workElement);
  });
}
