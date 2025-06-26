// auth.js - Module de gestion d'authentification

import { CONFIG } from "../js/api.js";

const loginForm = document.getElementById("login-form");

// Gestionnaire d'événement pour la soumission du formulaire de connexion
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Empêche le rechargement de la page

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const message = document.getElementById("loginMessage");

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
      message.style.color = "green";
      message.textContent = "Connexion réussie !";

      // Redirection vers la page principale après une courte pause
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 1000);
    } else {
      // Gestion des différents cas d'erreur d'authentification
      if (response.status === 401) {
        message.textContent = "E-mail ou mot de passe incorrect";
      } else {
        message.textContent = data.message || "Erreur de connexion";
      }
    }
  } catch (error) {
    // Gestion des erreurs réseau ou autres exceptions
    console.error("Erreur lors de la connexion:", error);
    message.textContent = "Erreur réseau. Veuillez réessayer.";
  }
});
