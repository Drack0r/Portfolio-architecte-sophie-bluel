// work-deleter.js - Suppression des travaux
import { fetchDelete } from "./api.js";

export class WorkDeleter {
  async deleteById(dataId) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetchDelete(dataId);

      if (response.ok) {
        this.removeFromDOM(dataId);
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
    const elements = document.querySelectorAll(`[data-id="${dataId}"]`);
    elements.forEach((element) => element.remove());
  }
}
