// api.js - Module de gestion de l'API

// ===== 1. CONFIGURATION =====

export const CONFIG = {
  API_BASE_URL: "http://localhost:5678/api",
  GALLERY_SELECTOR: ".gallery",
};

// ===== 2. REQUÊTES GET =====

// Récupération des travaux depuis l'API
export async function fetchWorks() {
  const response = await fetch(`${CONFIG.API_BASE_URL}/works`);

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  return await response.json();
}

// ===== 3. REQUÊTES POST =====

// Envoi du formulaire de connexion à l'API
export async function fetchLogIn(email, password) {
  const response = await fetch(`${CONFIG.API_BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP : ${response.status}`);
  }

  return await response.json();
}

// ===== 4. REQUÊTES DELETE =====

// Requête DELETE pour supprimer un travail
export async function fetchDelete(dataId) {
  const token = localStorage.getItem("token");

  // Vérifier si le token existe
  if (!token) {
    throw new Error("Token d'authentification manquant");
  }

  const response = await fetch(`${CONFIG.API_BASE_URL}/works/${dataId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response;
}
