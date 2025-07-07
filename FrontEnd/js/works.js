// works.js - Module d'affichage des travaux

import { CONFIG } from "./api.js";
import { fetchWorks } from "./api.js";
import { setupFilters } from "./filters.js";
import { apiErrorSpan } from "./ui.js";

// ===== 1. CONSTANTES ET ÉLÉMENTS DOM =====

// Sélection de l'élément '.gallery'
const gallery = document.querySelector(CONFIG.GALLERY_SELECTOR);

// ===== 2. POINT D'ENTRÉE PRINCIPAL =====

// Initialiser la gallerie
export async function initializeGallery() {
  try {
    const works = await fetchWorks();
    displayWorks(works);
    setupFilters(works);
  } catch (error) {
    apiErrorSpan.innerText = `Erreur : ${error.message}`;
  }
}

// ===== 3. GESTION DE LA GALERIE =====

// Afficher les travaux dans la galerie
export function displayWorks(works) {
  clearGallery();

  works.forEach((work) => {
    const workElement = createWorkElement(work);
    gallery.appendChild(workElement);
  });
}

// Vider le contenu de la gallerie
export function clearGallery() {
  gallery.innerHTML = "";
}

// ===== 4. CRÉATION DES ÉLÉMENTS HTML =====

// Créer l'élément <figure>
export function createWorkElement(work, type = "gallery") {
  const workFigure = document.createElement("figure");
  workFigure.setAttribute("data-id", work.id);
  const img = createWorkImage(work);

  workFigure.appendChild(img);

  if (type === "gallery") {
    const figcaption = createWorkCaption(work);
    workFigure.appendChild(figcaption);
  } else if (type === "modal") {
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-button");
    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-trash-can";

    deleteBtn.appendChild(deleteIcon);
    workFigure.appendChild(deleteBtn);
  }

  return workFigure;
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
