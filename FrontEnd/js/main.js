// main.js

import { fetchWorks } from "./api.js";
import { setupFilters } from "./filters.js";
import { displayWorks } from "./works.js";

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

// Appel de la fonction principale
initializeGallery();
