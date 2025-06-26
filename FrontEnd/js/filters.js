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
  document.querySelectorAll(".filter-btn").forEach((btn) => {
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

// Mise en place des filtres
export function setupFilters(works) {
  const filtersContainer = document.querySelector(".filters");
  filtersContainer.innerHTML = "";

  const worksCategorie = getUniqueCategories(works);

  worksCategorie.forEach((category, index) => {
    const filterBtn = createFilterButton(category, index === 0);

    filterBtn.addEventListener("click", () => {
      setActiveFilter(filterBtn);
      const filteredWorks = filterWorksByCategory(works, category);
      displayWorks(filteredWorks);
    });

    filtersContainer.appendChild(filterBtn);
  });
}
