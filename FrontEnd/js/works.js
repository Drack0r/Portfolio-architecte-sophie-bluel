// works.js

const CONFIG = {
  API_BASE_URL: "http://localhost:5678/api",
  GALLERY_SELECTOR: ".gallery",
};

// Sélection de l'élément 'gallery'
const gallery = document.querySelector(CONFIG.GALLERY_SELECTOR);

// Créer un élément figure pour un travail
export function createWorkElement(work) {
  const workFigure = document.createElement("figure");

  workFigure.innerHTML = `
    <img src="${work.imageUrl}" alt="${work.title}" />
    <figcaption>${work.title}</figcaption>
  `;

  // createElement

  return workFigure;
}

// Vider le contenu de la gallerie
export function clearGallery() {
  gallery.innerHTML = "";
}

// Afficher les travaux dans la galerie
export function displayWorks(works) {
  clearGallery();
  works.forEach((work) => {
    const workElement = createWorkElement(work);
    gallery.appendChild(workElement);
  });
}
