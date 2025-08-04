// api.js - Fichier de gestion des appels API

// ===== CONFIGURATION ===== //
export const CONFIG = {
  API_BASE_URL: "http://localhost:5678/api",
};

// ===== REQUÊTES GET ===== //
// Récupération des travaux depuis l'API
export async function fetchWorks() {
  const response = await fetch(`${CONFIG.API_BASE_URL}/works`);

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  return await response.json();
}

// ===== REQUÊTES POST ===== //
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

// Envoi d'un nouveau travail à l'API
export async function fetchPostWork(formData) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token d'authentification manquant");

  const response = await fetch(`${CONFIG.API_BASE_URL}/works`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP : ${response.status}`);
  }

  return await response.json();
}

// ===== REQUÊTES DELETE ===== //
// Supprimer un travail
export async function fetchDeleteWork(dataId) {
  // Vérifier si le token existe
  const token = localStorage.getItem("token");

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

  if (!response.ok) {
    throw new Error(`Erreur HTTP : ${response.status}`);
  }

  return response;
}
