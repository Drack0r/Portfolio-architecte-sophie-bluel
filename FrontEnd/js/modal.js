// modal.js - Module de gestion de modale
import { fetchWorks } from "./api.js";

// Gérer l'affichage de la modale
const modal = document.getElementById("modal");
const showModalBtn = document.getElementById("showModalBtn");
const closeModalBtn = document.getElementById("closeBtnModal");

function showModal() {
  showModalBtn.addEventListener("click", () => {
    modal.showModal();
  });
}

function closeModal() {
  closeModalBtn.addEventListener("click", () => {
    modal.close();
  });
}

// Gérer l'affichage des travaux dans la modale
// Sélection de l'élément '#modal-gallery'
const modalGallery = document.getElementById("modal-gallery");

// Créer un élément <figure> pour un travail
function createWorkElement(work) {
  const workFigure = document.createElement("figure");

  // Créer l'image
  const img = document.createElement("img");
  img.src = work.imageUrl;
  img.alt = work.title;

  // Créer le bouton
  const deleteBtn = document.createElement("button");
  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fa-solid fa-trash-can fa-xs";

  // Assembler les éléments
  workFigure.appendChild(img);
  deleteBtn.appendChild(deleteIcon);
  workFigure.appendChild(deleteBtn);

  return workFigure;
}

// Vider la galerie
function clearGallery() {
  modalGallery.innerHTML = "";
}

// Afficher les travaux dans la galerie
function displayWorks(works) {
  clearGallery();
  works.forEach((work) => {
    const workElement = createWorkElement(work);
    modalGallery.appendChild(workElement);
  });
}

// Initialiser la gallerie
async function initModalGallery() {
  try {
    const works = await fetchWorks();
    displayWorks(works);
  } catch {
    console.error(`Erreur : ${error.message}`);
  }
}

export function setupModal() {
  showModal();
  closeModal();
  initModalGallery();
}
