// auth.js - Module de gestion d'authentification

import { CONFIG } from "../js/api.js";

// Fonction de connexion
async function logIn(email, password, messageElement) {
  try {
    // Envoi des identifiants à l'API pour authentification
    const response = await fetch(`${CONFIG.API_BASE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Authentification réussie
      localStorage.setItem("token", data.token);
      messageElement.style.color = "green";
      messageElement.textContent = "Connexion réussie !";

      // Redirection vers la page principale après une courte pause
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 1000);
    } else {
      // Gestion des différents cas d'erreur d'authentification
      if (response.status === 401) {
        messageElement.textContent = "E-mail ou mot de passe incorrect";
      } else {
        messageElement.textContent = data.message || "Erreur de connexion";
      }
    }
  } catch (error) {
    // Gestion des erreurs réseau ou autres exceptions
    messageElement.textContent = "Erreur réseau. Veuillez réessayer.";
  }
}

// Sélection du formulaire de connexion
const loginForm = document.getElementById("login-form");

if (loginForm) {
  // Gestionnaire d'événement simplifié
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("loginMessage");

    await logIn(email, password, message);
  });
}

// Fonction pour savoir si l'utilisateur est connecté
export function isUserLoggedIn() {
  const token = localStorage.getItem("token");

  return token !== null && token !== undefined && token.trim() !== "";
}

// Fonction déconnexion
export function logOut() {
  localStorage.removeItem("token");

  window.location.href = "./index.html";
}
