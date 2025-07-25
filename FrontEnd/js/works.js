// works.js - Module d'affichage des travaux
import { CONFIG, fetchWorks } from "./api.js";
import { setupFilters } from "./filters.js";
import { apiErrorSpan } from "./ui.js";

// ===== CONSTANTES ET ÉLÉMENTS DOM ===== //
// Sélection de l'élément gallerie
const gallery = document.querySelector(CONFIG.GALLERY_SELECTOR);

// Fetch des travaux depuis l'API
export const works = await fetchWorks();

// ===== POINT D'ENTRÉE PRINCIPAL ===== //
// Initialiser la gallerie
export function initializeGallery() {
  try {
    displayWorks(works);
    setupFilters(works);
  } catch (error) {
    apiErrorSpan.innerText = `Erreur lors de l'initialisation de la gallerie : ${error.message}`;
  }
}

// Ajouter un nouveau travail
export function addNewWork(newWork) {
  // Reconstituer l'objet category si nécessaire
  if (!newWork.category || !newWork.category.name) {
    const existingCategory = works.find(
      (work) => work.category.id == newWork.categoryId
    )?.category;

    if (existingCategory) {
      newWork.category = existingCategory;
    } else {
      newWork.category = {
        id: newWork.categoryId,
        name: `Catégorie ${newWork.categoryId}`,
      };
    }
  }

  works.push(newWork);
  displayWorks(works);
  setupFilters(works);
}

// Supprimer un travail du DOM
export function removeWork(workId) {
  const index = works.findIndex((work) => work.id == workId);

  if (index > -1) {
    works.splice(index, 1);
    displayWorks(works);
    setupFilters(works);
  }
}

// ===== GESTION DE LA GALERIE ===== //
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

// ===== CRÉATION DES ÉLÉMENTS HTML ===== //
// Créer l'élément <figure>
export function createWorkElement(work, type = "gallery") {
  const workFigure = document.createElement("figure");
  workFigure.setAttribute("data-work-id", work.id);

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

// Créer l'élément <img>
function createWorkImage(work) {
  const img = document.createElement("img");
  img.src = work.imageUrl;
  img.alt = work.title;

  return img;
}

// Créer l'élément <figcaption>
function createWorkCaption(work) {
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = work.title;

  return figcaption;
}
