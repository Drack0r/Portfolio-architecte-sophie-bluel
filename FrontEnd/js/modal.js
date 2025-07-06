// modal.js - Module de gestion de modale
import { CONFIG, fetchWorks } from "./api.js";
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
  setupDeleteButtons();
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

// --- //
function setupDeleteButtons() {
  const deleteBtn = document.querySelectorAll(".delete-button");

  deleteBtn.forEach((btn) => {
    // Ajout de l'event listener
    btn.addEventListener("click", async () => {
      // Cible le data-id
      const dataId = btn.parentNode.getAttribute("data-id");

      try {
        // Requête DELETE
        const response = await fetch(`${CONFIG.API_BASE_URL}/works/${dataId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          // Séléctionne tous les éléments avec le même data-id
          const elementsWithSameId = document.querySelectorAll(
            `[data-id="${dataId}"]`
          );
          // Efface tous les éléments du DOM
          elementsWithSameId.forEach((element) => {
            element.remove();
          });
          console.log("Travail supprimé");
        } else {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
      } catch (error) {
        console.error("Erreur lors de la suppression: ", error);
      }
    });
  });
}
