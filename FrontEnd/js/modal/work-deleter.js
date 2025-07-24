// work-deleter.js - Suppression des travaux
import { fetchDeleteWork } from "../api.js";
import { removeWork } from "../works.js";

export class WorkDeleter {
  // Suppression d'un travail par son "data-work-id"
  async deleteById(dataId) {
    try {
      const response = await fetchDeleteWork(dataId);

      if (response.ok) {
        this.removeFromDOM(dataId);
        removeWork(dataId);
        return true;
      } else {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
    } catch (error) {
      console.error(`Erreur lors de la suppression : ${error}`);
      return false;
    }
  }

  // Suppression d'un travail du DOM par son "data-work-id"
  removeFromDOM(dataId) {
    const elements = document.querySelectorAll(`[data-work-id="${dataId}"]`);
    elements.forEach((element) => element.remove());
  }
}
