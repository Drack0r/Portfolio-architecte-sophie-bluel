// main.js - Module principal de lancement

import { initializeGallery } from "./works.js";
import { setupAuthButton, setupModifyButton } from "./ui.js";
import { setupModal } from "./modal/modal-manager.js";

// ===== 1. POINT D'ENTRÉE PRINCIPAL =====

// Initialiser l'application
function initializeApp() {
  try {
    setupAuthButton();
    setupModifyButton();
    setupModal();
    initializeGallery();
  } catch (error) {
    console.error(`Erreur lors de l'initialisation de l'app : ${error}`);
  }
}

// ===== 2. LANCEMENT DE L'APPLICATION =====
initializeApp();

// validator.js ✅
// services.js ✅
// FormData.append() ❌ Il n'y a pas de formulaire qui contient les inputs + conflit reconstitution catégories dans works.js
// Design Pattern
// Factory Pattern
// ES Lint
// const verbe HTTP (énumération)
