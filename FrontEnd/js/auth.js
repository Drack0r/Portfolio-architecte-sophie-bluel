// auth.js - Module de gestion de l'authentification

import { fetchLogIn } from "./api.js";
import { MESSAGE_TYPES, displayMessage } from "./ui.js";

// ===== 1. FONCTIONS UTILITAIRES =====

// Stockage du token
function storeToken(token) {
  localStorage.setItem("token", token);
}

// Gérer la redirection
function redirectTo(url, delay = 0) {
  setTimeout(() => {
    window.location.href = url;
  }, delay);
}

// Convertir l'erreur en message utilisateur
function getErrorMessage(error) {
  const status = error.message.includes("401") ? 401 : null;

  switch (status) {
    case 401:
      return "E-mail ou mot de passe incorrect";
    default:
      return "Erreur de connexion";
  }
}

// ===== 2. GESTION DE LA SESSION =====

// Savoir si l'utilisateur est connecté
export function isUserLoggedIn() {
  const token = localStorage.getItem("token");
  return token !== null && token !== undefined && token.trim() !== "";
}

// Déconnecte l'utilisateur
export function logOut() {
  localStorage.removeItem("token");
  redirectTo("./index.html");
}

// ===== 3. PROCESSUS DE CONNEXION =====

// Orchestrer la connexion
async function logIn(email, password, messageElement) {
  try {
    const data = await fetchLogIn(email, password);
    storeToken(data.token);
    displayMessage(
      "Connexion réussie !",
      messageElement,
      MESSAGE_TYPES.SUCCESS
    );
    redirectTo("../index.html", 1000);
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    displayMessage(errorMessage, messageElement, MESSAGE_TYPES.ERROR);
  }
}

// ===== 4. INITIALISATION DU FORMULAIRE =====

// Sélection du formulaire de connexion
const loginForm = document.getElementById("login-form");

if (loginForm) {
  // Gestionnaire de soumission du formulaire de connexion
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("loginMessage");

    await logIn(email, password, message);
  });
}
