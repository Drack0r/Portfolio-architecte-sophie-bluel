// filters.js - Module de gestion des filtres

import { displayWorks } from "./works.js";

// Extraire les catégories uniques
function getUniqueCategories(works) {
  return ["Tous", ...new Set(works.map((work) => work.category.name))];
}

// Créer un bouton de filtre
function createFilterButton(category, isActive = false) {
  const filterBtn = document.createElement("button");
  filterBtn.textContent = category;
  filterBtn.classList.add("filter-btn");

  if (isActive) {
    filterBtn.classList.add("filter-btn-active");
  }

  return filterBtn;
}

// Gérer l'état actif des boutons
function setActiveFilter(clickedButton) {
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach((btn) => {
    btn.classList.remove("filter-btn-active");
  });

  clickedButton.classList.add("filter-btn-active");
}

// Filtrer les travaux par catégorie
function filterWorksByCategory(works, category) {
  return category === "Tous"
    ? works
    : works.filter((work) => work.category.name === category);
}

// Vider les filtres
function clearFilterContainer() {
  const filtersContainer = document.querySelector(".filters");
  filtersContainer.innerHTML = "";
}

// Attacher les événements à un bouton
function attachFilterEvents(filterBtn, works, category) {
  filterBtn.addEventListener("click", () => {
    setActiveFilter(filterBtn);
    const filteredWorks = filterWorksByCategory(works, category);
    displayWorks(filteredWorks);
  });
}

// Mise en place des filtres
export function setupFilters(works) {
  const filtersContainer = document.querySelector(".filters");

  clearFilterContainer();

  const categories = getUniqueCategories(works);

  categories.forEach((category, index) => {
    const filterBtn = createFilterButton(category, index === 0);
    attachFilterEvents(filterBtn, works, category);
    filtersContainer.appendChild(filterBtn);
  });
}
