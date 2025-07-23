// work-deleter.js - Suppression des travaux
import { fetchDeleteWorks } from "../api.js";
import { removeWork } from "../works.js";

export class WorkDeleter {
  async deleteById(dataId) {
    try {
      const response = await fetchDeleteWorks(dataId);

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

  removeFromDOM(dataId) {
    const elements = document.querySelectorAll(`[data-work-id="${dataId}"]`);
    elements.forEach((element) => element.remove());
  }
}
