// modal.js - Module de gestion de modale
import { fetchWorks, fetchDelete } from "./api.js";
import { createWorkElement } from "./works.js";

const modal = document.getElementById("modal");
const modalGallery = document.getElementById("modal-gallery");
const showModalBtn = document.getElementById("showModalBtn");
const closeModalBtn = document.getElementById("closeBtnModal");

// ===== 1. POINT D'ENTRÉE PRINCIPAL =====

// Orchestrer la modale
export function setupModal() {
  setupModalEvents();
  initModalGallery();
}

// ===== 2. ÉVÉNEMENTS PRINCIPAUX DE LA MODALE =====

// Configurer les événements de la modale
function setupModalEvents() {
  showModal();
  closeModal();
}

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

// ===== 3. GESTION DE LA GALERIE =====

// Initialiser la gallerie
async function initModalGallery() {
  try {
    const works = await fetchWorks();
    refreshModalGallery(works);
  } catch (error) {
    console.error(`Erreur : ${error.message}`);
  }
}

// Rafraîchir la galerie
function refreshModalGallery(works) {
  clearGallery();
  displayWorks(works);
  setupDeleteButtons();
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

// ===== 4. GESTION DES BOUTONS DE SUPPRESSION =====

// Configure tous les boutons de suppression
function setupDeleteButtons() {
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach(attachDeleteEvent);
}

// Attache l'événement de suppression à un bouton
function attachDeleteEvent(button) {
  button.addEventListener("click", async () => {
    const dataId = button.parentNode.getAttribute("data-id");
    await deleteWorkById(dataId);
  });
}

// ===== 5. OPÉRATIONS DE SUPPRESSION =====

// Supprime un élément par son ID
async function deleteWorkById(dataId) {
  try {
    const response = await fetchDelete(dataId);

    if (response.ok) {
      const elementsWithSameId = selectSameDataId(dataId);
      removeElements(elementsWithSameId);
      return true;
    } else {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
  } catch (error) {
    console.error("Erreur lors de la suppression: ", error);
    return false;
  }
}

// Sélectionne un élément avec le même ID
function selectSameDataId(dataId) {
  const elementsWithSameId = document.querySelectorAll(`[data-id="${dataId}"]`);
  return elementsWithSameId;
}

// Supprime un élément du DOM
function removeElements(elements) {
  elements.forEach((element) => {
    element.remove();
  });
}
