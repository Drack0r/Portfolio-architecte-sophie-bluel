// ui.js - Module d'interface utilisateur

import { isUserLoggedIn, logOut } from "./auth.js";

// Gérer l'affichage du bouton login / logout
export function setupAuthButton() {
  const authLink = document.getElementById("auth-link");

  if (!authLink) return;

  if (isUserLoggedIn()) {
    // Utilisateur connecté : afficher logout
    authLink.textContent = "logout";
    authLink.href = "#";

    // Supprimer les anciens événements avant d'en ajouter un nouveau
    authLink.replaceWith(authLink.cloneNode(true));
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
