// ui.js - Module d'interface utilisateur

import { isUserLoggedIn, logOut } from "./auth.js";

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

// Gérer l'affichage du bouton login / logout
export function setupAuthButton() {
  const authLink = document.getElementById("auth-link");

  if (!authLink) return;

  if (isUserLoggedIn()) {
    // Utilisateur connecté : afficher logout
    authLink.textContent = "logout";
    authLink.href = "#";

    // Supprimer les anciens événements avant d'en ajouter un nouveau
    authLink.replaceWith(authLink.cloneNode(true)); //!
    const newAuthLink = document.getElementById("auth-link");

    // Ajouter l'événement "déconnexion"
    newAuthLink.addEventListener("click", (e) => {
      e.preventDefault();
      logOut();
    });
  } else {
    // Utilisateur non connecté : afficher login
    authLink.textContent = "login";
    authLink.href = "./pages/auth.html";
  }
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

// fz icon trash
