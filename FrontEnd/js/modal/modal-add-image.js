// modal-add-image.js - Formulaire d'ajout
import { FormBuilder } from "./form-builder.js";
import { ImagePreview } from "./image-preview.js";
import { ModalDomManager } from "./modal-dom-manager.js";
import { FormSubmissionService } from "./services.js";
import { FormValidator } from "./validator.js";
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

    // Indicateur pour savoir si le formulaire a été créé
    this.isFormBuilt = false;
    this.formElements = null;
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

    // Ne construire le formulaire qu'une seule fois
    if (!this.isFormBuilt) {
      await this.buildForm();
      this.setupFormEvents();
      this.isFormBuilt = true;
    } else {
      // Simplement afficher les éléments existants
      this.showFormElements();
    }

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
    this.clearForm();
  }

  // Vider le formulaire
  clearForm() {
    const titleInput = document.getElementById("imgTitleInput");
    const categoryInput = document.getElementById("imgCategoryInput");

    if (titleInput) {
      titleInput.value = "";
    }

    if (categoryInput) {
      categoryInput.selectedIndex = 0;
    }
  }

  // Afficher les éléments du formulaire
  showFormElements() {
    const selectors = [
      ".dropzone",
      ".modal-content > .imgInputDiv",
      "#validImgBtn",
    ];

    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        element.style.display = "";
      });
    });
  }

  // Construction du formulaire
  async buildForm() {
    this.formElements = await this.formBuilder.createElements();
    this.formBuilder.assembleElements(
      this.formElements,
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
