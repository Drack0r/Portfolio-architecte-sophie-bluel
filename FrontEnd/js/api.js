// api.js - Module de gestion de l'API

// Constante de configuration
export const CONFIG = {
  API_BASE_URL: "http://localhost:5678/api",
  GALLERY_SELECTOR: ".gallery",
};

// Récupération des travaux depuis l'API
export async function fetchWorks() {
  const response = await fetch(`${CONFIG.API_BASE_URL}/works`);

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  return await response.json();
}

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
