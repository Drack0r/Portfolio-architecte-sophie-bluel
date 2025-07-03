// modal.js - Module de gestion de modale
import { fetchWorks } from "./api.js";
import { createWorkElement } from "./works.js";

const modal = document.getElementById("modal");
const modalGallery = document.getElementById("modal-gallery");
const showModalBtn = document.getElementById("showModalBtn");
const closeModalBtn = document.getElementById("closeBtnModal");

// Afficher la modale
function showModal() {
  showModalBtn.addEventListener("click", () => {
    modal.showModal();
  });
}

// Fermer la modale
function closeModal() {
  closeModalBtn.addEventListener("click", () => {
    modal.close();
  });
}

// Vider la galerie
function clearGallery() {
  modalGallery.innerHTML = "";
}

// Afficher les travaux dans la galerie
function displayWorks(works) {
  works.forEach((work) => {
    const workElement = createWorkElement(work, "modal");
    modalGallery.appendChild(workElement);
  });
}

// Rafraîchir la galerie
function refreshModalGallery(works) {
  clearGallery();
  displayWorks(works);
}

// Initialiser la gallerie
async function initModalGallery() {
  try {
    const works = await fetchWorks();
    refreshModalGallery(works);
  } catch (error) {
    console.error(`Erreur : ${error.message}`);
  }
}

// Configurer les événements de la modale
function setupModalEvents() {
  showModal();
  closeModal();
}

// Orchestrer la modale
export function setupModal() {
  setupModalEvents();
  initModalGallery();
}
