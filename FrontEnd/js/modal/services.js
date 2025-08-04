// services.js - Fichier de services de la modale

import { works, addNewWork } from "../works.js";
import { fetchPostWork } from "../api.js";
import { displayMessage, MESSAGE_TYPES } from "../ui.js";

// ===== SERVICES LIÉS AUX CATÉGORIES ===== //
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

// ===== SERVICES LIÉS A LA SOUMISSION DE FORMULAIRE ===== //
export class FormSubmissionService {
  // Soumettre le formulaire d'ajout d'image
  async submitForm(formData, messageElement) {
    try {
      const newWork = await fetchPostWork(formData);

      if (!newWork || !newWork.id) {
        throw new Error("Réponse API invalide");
      }

      // Mettre à jour les données
      addNewWork(newWork);

      displayMessage(
        "Formulaire validé !",
        messageElement,
        MESSAGE_TYPES.SUCCESS
      );

      return { success: true, data: newWork };
    } catch (error) {
      console.error("Erreur lors de l'ajout du travail:", error);

      displayMessage(
        `Erreur lors de l'ajout : ${error.message}`,
        messageElement,
        MESSAGE_TYPES.ERROR
      );

      return { success: false, error: error.message };
    }
  }
}
