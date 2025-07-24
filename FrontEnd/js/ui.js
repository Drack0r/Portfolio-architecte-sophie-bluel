// ui.js - Module d'interface utilisateur
import { isUserLoggedIn, logOut } from "./auth.js";

// ===== CONSTANTES ET ÉLÉMENTS DOM ===== //
// Ciblage de la span 'api-error' pour catch les erreurs
export const apiErrorSpan = document.getElementById("api-error");

// Constantes pour les types de messages
export const MESSAGE_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
};

// ===== GESTION DES MESSAGES ===== //
// Afficher les messages
export function displayMessage(message, element, messageType) {
  element.textContent = message;

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

// ===== GESTION DU BOUTON D'AUTHENTIFICATION ===== //
// Gérer le bouton login / logout
export function setupAuthButton() {
  const authLink = document.getElementById("auth-link");

  if (!authLink) return;

  configureAuthButton(authLink);

  attachAuthEvents(authLink);
}

// Configurer l'apparence du bouton 'auth'
function configureAuthButton(authLink) {
  if (isUserLoggedIn()) {
    authLink.textContent = "logout";
    authLink.href = "#";
  } else {
    authLink.textContent = "login";
    authLink.href = "./pages/auth.html";
  }
}

// Ajouter les événements au bouton 'auth'
function attachAuthEvents(authLink) {
  if (isUserLoggedIn()) {
    authLink.addEventListener("click", (e) => {
      e.preventDefault();

      logOut();
    });
  }
}

// ===== GESTION DES ÉLÉMENTS D'INTERFACE CONDITIONNELS ===== //
// Gérer l'affichage du bouton 'modifier'
export function setupModifyButton() {
  const showModalButton = document.getElementById("showModalBtn");

  if (!isUserLoggedIn()) {
    showModalButton.classList.add("hidden");
  } else {
    showModalButton.classList.remove("hidden");
  }
}
