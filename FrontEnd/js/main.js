// main.js - Module principal de lancement

import { initializeGallery } from "./works.js";
import { setupAuthButton, setupModBtn } from "./ui.js";
import { setupModal } from "./modal.js";

// ===== 1. POINT D'ENTRÉE PRINCIPAL =====

// Initialiser l'application
function initializeApp() {
  // Configuration de l'interface utilisateur
  setupAuthButton();
  setupModBtn();

  // Configuration des fonctionnalités interactives
  setupModal();

  // Chargement des données et affichage
  initializeGallery();
}

// ===== 2. LANCEMENT DE L'APPLICATION =====
initializeApp();
