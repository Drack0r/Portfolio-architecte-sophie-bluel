// filters.js

import { displayWorks } from "./works.js";

// Extraire les catégories uniques
function getUniqueCategories(works) {
  return ["Tous", ...new Set(works.map((work) => work.category.name))];
}

// Créer un bouton de filtre
function createFilterButton(category, isActive = false) {
  const button = document.createElement("button");
  button.textContent = category;
  button.classList.add("filter-btn");

  if (isActive) {
    button.classList.add("filter-btn-active");
  }

  return button;
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

  const categories = getUniqueCategories(works);

  categories.forEach((category, index) => {
    const button = createFilterButton(category, index === 0);

    button.addEventListener("click", () => {
      setActiveFilter(button);
      const filtered = filterWorksByCategory(works, category);
      displayWorks(filtered);
    });

    filtersContainer.appendChild(button);
  });
}
