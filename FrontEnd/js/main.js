// main.js - Module principal de lancement

import { initializeGallery } from "./works.js";
import { setupAuthButton, setupModBtn } from "./ui.js";
import { setupModal } from "./modal-manager.js";

// ===== 1. POINT D'ENTRÉE PRINCIPAL =====

// Initialiser l'application
function initializeApp() {
  setupAuthButton();
  setupModBtn();

  setupModal();

  initializeGallery();
}

// ===== 2. LANCEMENT DE L'APPLICATION =====
initializeApp();
