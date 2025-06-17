// api.js

const CONFIG = {
  API_BASE_URL: "http://localhost:5678/api",
  GALLERY_SELECTOR: ".gallery",
};

// Récupérer les données de l'API
export async function fetchWorks() {
  const response = await fetch(`${CONFIG.API_BASE_URL}/works`);

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  return await response.json();
}
