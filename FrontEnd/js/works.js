// works.js - Module de l'affichage des travaux

import { CONFIG } from "./api.js";

// Sélection de l'élément 'gallery'
const gallery = document.querySelector(CONFIG.GALLERY_SELECTOR);

// Créer un élément figure pour un travail
export function createWorkElement(work) {
  const workFigure = document.createElement("figure");

  // Créer l'image
  const img = document.createElement("img");
  img.src = work.imageUrl;
  img.alt = work.title;

  // Créer la légende
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = work.title;

  // Assembler les éléments
  workFigure.appendChild(img);
  workFigure.appendChild(figcaption);

  return workFigure;
}

// Vider le contenu de la gallerie
export function clearGallery() {
  gallery.innerHTML = "";
}

// Afficher les travaux dans la galerie
export function displayWorks(works) {
  clearGallery();
  works.forEach((work) => {
    const workElement = createWorkElement(work);
    gallery.appendChild(workElement);
  });
}
