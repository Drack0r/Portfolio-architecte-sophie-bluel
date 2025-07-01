// main.js - Module principal de lancement

import { fetchWorks } from "./api.js";
import { setupFilters } from "./filters.js";
import { displayWorks } from "./works.js";
import { setupAuthButton, setupModBtn } from "./ui.js";
import { setupModal } from "./modal.js";

// Ciblage de la span 'api-error' pour catch les erreurs
const apiErrorSpan = document.getElementById("api-error");

// Orchestrer le processus complet
async function initializeGallery() {
  try {
    const works = await fetchWorks();
    displayWorks(works);
    setupFilters(works);
  } catch (error) {
    apiErrorSpan.innerText = `Erreur : ${error.message}`;
  }
}

// Initialiser l'application
function initializeApp() {
  setupAuthButton();
  setupModBtn();
  setupModal();
  initializeGallery();
}

// Appel de la fonction principale
initializeApp();

// document.getElementById("modal").showModal();
