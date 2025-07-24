// modal-add-image.js - Formulaire d'ajout
import { FormBuilder } from "./form-builder.js";
import { ImagePreview } from "./image-preview.js";
import { ModalDomManager } from "./modal-dom-manager.js";
import { FormSubmissionService } from "./form-submission-service.js";
import { FormValidator } from "./form-validator.js";
import { displayMessage, MESSAGE_TYPES } from "../ui.js";

export class ModalAddImage {
  constructor(modalManager) {
    this.modalManager = modalManager;
    this.modal = modalManager.modal;
    this.modalContent = modalManager.modalContent;
    this.addImgBtn = modalManager.addImgBtn;

    // Services
    this.formBuilder = new FormBuilder();
    this.imagePreview = new ImagePreview();
    this.domManager = new ModalDomManager(this.modal, this.modalContent);
    this.submissionService = new FormSubmissionService();
    this.formValidator = new FormValidator();
  }

  // Installation du bouton "ajouter"
  setupAddButton() {
    this.addImgBtn.addEventListener("click", async () => {
      this.modalManager.showAddImageView();
    });
  }

  // Affichage de la vue "ajouter une image"
  async show() {
    this.modalManager.gallery.hide();
    this.domManager.changeTitle("Ajout photo");
    this.domManager.createReturnButton(() => {
      this.modalManager.showGalleryView();
    });
    await this.buildForm();
    this.setupFormEvents();
    this.domManager.hideMessage();
  }

  // Camouflage de la vue "ajouter une image"
  hide() {
    const selectors = [
      ".dropzone",
      ".modal-content > .imgInputDiv",
      "#validImgBtn",
      "#returnToGalleryBtn",
    ];

    this.domManager.hideElements(selectors);
    this.imagePreview.cleanup();
    this.domManager.hideMessage();
  }

  // Construction du formulaire
  async buildForm() {
    const formElements = await this.formBuilder.createElements();
    this.formBuilder.assembleElements(
      formElements,
      this.modal,
      this.modalContent
    );
  }

  // Installation des événements du formulaire
  setupFormEvents() {
    this.imagePreview.setup();
    this.setupFormValidation();
  }

  // Installation de la validation du formulaire
  setupFormValidation() {
    const submitBtn = document.getElementById("validImgBtn");
    const messageSpan = document.getElementById("uiMessageSpan");

    submitBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      if (this.formValidator.validateAddImageForm()) {
        const formData = this.formValidator.extractFormData();

        submitBtn.disabled = true;
        submitBtn.textContent = "Envoi en cours...";

        const result = await this.submissionService.submitForm(
          formData,
          messageSpan
        );

        this.domManager.showMessage(messageSpan);

        if (result.success) {
          this.modalManager.gallery.addWork(result.data);
          setTimeout(() => {
            this.modalManager.showGalleryView();
          }, 1500);
        }

        submitBtn.disabled = false;
        submitBtn.textContent = "Valider";
      } else {
        displayMessage(
          "Veuillez remplir tous les champs obligatoires",
          messageSpan,
          MESSAGE_TYPES.ERROR
        );
        this.domManager.showMessage(messageSpan);
      }
    });
  }
}
