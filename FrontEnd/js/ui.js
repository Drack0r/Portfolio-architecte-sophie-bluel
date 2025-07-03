// ui.js - Module d'interface utilisateur

import { isUserLoggedIn, logOut } from "./auth.js";

// Ciblage de la span 'api-error' pour catch les erreurs
export const apiErrorSpan = document.getElementById("api-error");

// Constantes pour les types de messages
export const MESSAGE_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
};

// Afficher les messages
export function displayMessage(message, element, messageType) {
  // Définir le message
  element.textContent = message;

  // Définir la couleur selon le type
  switch (messageType) {
    case MESSAGE_TYPES.SUCCESS:
      element.style.color = "green";
      break;
    case MESSAGE_TYPES.ERROR:
      element.style.color = "red";
      break;
    case MESSAGE_TYPES.INFO:
      element.style.color = "blue";
      break;
    default:
      element.style.color = "black";
  }
}

// Configurer l'apparence du bouton auth
function configureAuthButton(authLink) {
  if (isUserLoggedIn()) {
    authLink.textContent = "logout";
    authLink.href = "#";
  } else {
    authLink.textContent = "login";
    authLink.href = "./pages/auth.html";
  }
}

// Ajouter les événements au bouton auth
function attachAuthEvents(authLink) {
  if (isUserLoggedIn()) {
    authLink.addEventListener("click", (e) => {
      e.preventDefault();
      logOut();
    });
  }
}

// Gérer le bouton login / logout
export function setupAuthButton() {
  const authLink = document.getElementById("auth-link");

  if (!authLink) return;

  configureAuthButton(authLink);
  attachAuthEvents(authLink);
}

// Gérer l'affichage du bouton 'modifier'
export function setupModBtn() {
  const showModalBtn = document.getElementById("showModalBtn");

  if (!isUserLoggedIn()) {
    showModalBtn.classList.add("hidden");
  } else {
    showModalBtn.classList.remove("hidden");
  }
}
