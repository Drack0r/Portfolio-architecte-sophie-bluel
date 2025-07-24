// form-submission-service.js - Service de soumission
import { fetchPostWork } from "../api.js";
import { addNewWork } from "../works.js";
import { displayMessage, MESSAGE_TYPES } from "../ui.js";

export class FormSubmissionService {
  // Soumettre le formulaire d'ajout d'image
  async submitForm(formData, messageElement) {
    const { imageFile, title, categoryId } = formData;

    try {
      const newWork = await fetchPostWork(title, imageFile, categoryId);

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
