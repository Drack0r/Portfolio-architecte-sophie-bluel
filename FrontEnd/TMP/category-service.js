// category-service.js - Service de gestion des catégories

/*
import { works } from "../works.js";

export class CategoryService {
  // Obtenir les catégories sans doublons
  static getUniqueCategories() {
    try {
      const categoryMap = new Map();

      works.forEach((work) => {
        if (!categoryMap.has(work.category.id)) {
          categoryMap.set(work.category.id, {
            id: work.category.id,
            name: work.category.name,
          });
        }
      });

      return Array.from(categoryMap.values());
    } catch (error) {
      console.error(`Erreur lors du chargement des catégories : ${error}`);
      return [];
    }
  }
}
*/
