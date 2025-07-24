// filters.js - Module de gestion des filtres
import { displayWorks } from "./works.js";

// ===== POINT D'ENTRÉE PRINCIPAL ===== //
// Mise en place des filtres
export function setupFilters(works) {
  const filtersContainer = document.querySelector(".filters");

  clearFiltersContainer();

  const categories = getUniqueCategories(works);

  categories.forEach((category, index) => {
    const filterBtn = createFilterButton(category, index === 0);

    attachFilterEvents(filterBtn, works, category);

    filtersContainer.appendChild(filterBtn);
  });
}

// ===== GESTION DES CATÉGORIES ===== //
// Extraire les catégories uniques
function getUniqueCategories(works) {
  return ["Tous", ...new Set(works.map((work) => work.category.name))];
}

// Filtrer les travaux par catégorie
function filterWorksByCategory(works, category) {
  return category === "Tous"
    ? works
    : works.filter((work) => work.category.name === category);
}

// ===== CRÉATION ET GESTION DES BOUTONS ===== //
// Créer un bouton de filtre
function createFilterButton(category, isActive = false) {
  const filterButton = document.createElement("button");
  filterButton.textContent = category;
  filterButton.classList.add("filter-btn");

  if (isActive) {
    filterButton.classList.add("filter-btn-active");
  }

  return filterButton;
}

// Gérer l'état actif des boutons
function setActiveFilter(clickedButton) {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((btn) => {
    btn.classList.remove("filter-btn-active");
  });

  clickedButton.classList.add("filter-btn-active");
}

// Attacher les événements à un bouton
function attachFilterEvents(filterButton, works, category) {
  filterButton.addEventListener("click", () => {
    setActiveFilter(filterButton);

    const filteredWorks = filterWorksByCategory(works, category);

    displayWorks(filteredWorks);
  });
}

// ===== MANIPULATION DU DOM ===== //
// Vider les filtres
function clearFiltersContainer() {
  const filtersContainer = document.querySelector(".filters");
  filtersContainer.innerHTML = "";
}
