// file-validator.js - Validation des fichiers
import { displayMessage, MESSAGE_TYPES } from "../ui.js";

export class FileValidator {
  constructor() {
    this.maxSize = 4 * 1024 * 1024; // 4Mo
    this.allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
  }

  // Valider un fichier
  validate(file, messageElement) {
    if (!file) return true;

    if (!this.validateSize(file, messageElement)) return false;
    if (!this.validateType(file, messageElement)) return false;

    return true;
  }

  // Valider la taille
  validateSize(file, messageElement) {
    if (file.size > this.maxSize) {
      const message =
        "Le fichier est trop volumineux. Taille maximale autorisée : 4Mo";

      displayMessage(message, messageElement, MESSAGE_TYPES.ERROR);
      return false;
    }
    return true;
  }

  // Valider le type
  validateType(file, messageElement) {
    if (!this.allowedTypes.includes(file.type)) {
      const message =
        "Type de fichier non autorisé. Seuls PNG et JPEG sont acceptés.";

      displayMessage(message, messageElement, MESSAGE_TYPES.ERROR);
      return false;
    }
    return true;
  }
}
