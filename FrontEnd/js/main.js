// main.js - Module principal de lancement

import { initializeGallery } from "./works.js";
import { setupAuthButton, setupModBtn } from "./ui.js";
import { setupModal } from "./modal.js";

// Initialiser l'application
function initializeApp() {
  setupAuthButton();
  setupModBtn();
  setupModal();
  initializeGallery();
}

// Appel de la fonction principale
initializeApp();

// Fermer la modale lors du clic en dehors

// --- //
