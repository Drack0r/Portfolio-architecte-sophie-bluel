// app.js

const CONFIG = {
  API_BASE_URL: "http://localhost:5678/api",
  GALLERY_SELECTOR: ".gallery",
};

// Sélection de l'élément 'gallery'
const gallery = document.querySelector(CONFIG.GALLERY_SELECTOR);

// Récupérer les données de l'API
async function fetchWorks() {
  const response = await fetch(`${CONFIG.API_BASE_URL}/works`);

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  return await response.json();
}

// Créer un élément figure pour un travail
function createWorkElement(work) {
  const workFigure = document.createElement("figure");

  workFigure.innerHTML = `
    <img src="${work.imageUrl}" alt="${work.title}" />
    <figcaption>${work.title}</figcaption>
  `;

  return workFigure;
}

// Vider le contenu de la gallerie
function clearGallery() {
  gallery.innerHTML = "";
}

// Afficher les travaux dans la galerie
function displayWorks(works) {
  clearGallery();
  works.forEach((work) => {
    const workElement = createWorkElement(work);
    gallery.appendChild(workElement);
  });
}

// Orchestrer le processus complet
async function initializeGallery() {
  try {
    const works = await fetchWorks();
    displayWorks(works);
  } catch (error) {
    console.error(`Erreur : ${error.message}`);
  }
}

// Appel de la fonction principale
initializeGallery();
