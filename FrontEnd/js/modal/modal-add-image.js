// modal-add-image.js - Formulaire d'ajout
import { FormBuilder } from "./form-builder.js";
import { ImagePreview } from "./image-preview.js";
import { displayMessage, MESSAGE_TYPES } from "../ui.js";
import { fetchPostWork } from "../api.js";

export class ModalAddImage {
  constructor(modalManager) {
    this.modalManager = modalManager;
    this.modal = modalManager.modal;
    this.modalContent = modalManager.modalContent;
    this.addImgBtn = modalManager.addImgBtn;
    this.formBuilder = new FormBuilder();
    this.imagePreview = new ImagePreview();
  }

  setupAddButton() {
    this.addImgBtn.addEventListener("click", async () => {
      this.modalManager.showAddImageView();
    });
  }
  // addImageViewListener

  async show() {
    this.hideGalleryElements();
    this.changeTitle("Ajout photo");
    this.createReturnButton();
    await this.buildForm();
    this.setupFormEvents();
    this.hideMessage();
  }

  hide() {
    this.hideDropzone();
    this.hideForm();
    this.hideSubmitButton();
    this.hideReturnButton();
    this.hideMessage();
  }

  async buildForm() {
    const formElements = await this.formBuilder.createElements();
    this.formBuilder.assembleElements(
      formElements,
      this.modal,
      this.modalContent
    );
  }

  createReturnButton() {
    const returnBtn = document.createElement("button");
    returnBtn.id = "returnToGalleryBtn";

    const icon = document.createElement("i");
    icon.className = "fa-solid fa-arrow-left";

    returnBtn.appendChild(icon);
    this.modal.appendChild(returnBtn);

    returnBtn.addEventListener("click", () => {
      this.modalManager.showGalleryView();
    });
  }

  setupFormEvents() {
    this.imagePreview.setup();
    this.setupFormValidation();
  }

  setupFormValidation() {
    const submitBtn = document.getElementById("validImgBtn");
    const messageSpan = document.getElementById("uiMessageSpan");

    submitBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      if (this.validateForm()) {
        try {
          // Récupérer les valeurs du formulaire
          const imageInput = document.getElementById("modalDropZoneImageInput");
          const titleInput = document.getElementById("imgTitleInput");
          const categoryInput = document.getElementById("imgCategoryInput");

          // Récupérer le fichier image (premier fichier sélectionné)
          const imageFile = imageInput.files[0];
          const title = titleInput.value.trim();
          const categoryId = categoryInput.value;

          console.log("Données à envoyer:", { title, imageFile, categoryId });

          // Désactiver le bouton pendant l'envoi
          submitBtn.disabled = true;
          submitBtn.textContent = "Envoi en cours...";

          // Envoyer les données à l'API
          const newWork = await fetchPostWork(title, imageFile, categoryId);

          // Afficher un message de succès
          displayMessage(
            "Formulaire validé !",
            messageSpan,
            MESSAGE_TYPES.SUCCESS
          );
          messageSpan.style.display = "block";

          // Optionnel : fermer la modal après un délai ou revenir à la galerie
          setTimeout(() => {
            this.modalManager.showGalleryView();
            // Vous pourriez aussi vouloir recharger la galerie ici
          }, 1500);
        } catch (error) {
          console.error("Erreur lors de l'ajout du travail:", error);
          displayMessage(
            `Erreur lors de l'ajout : ${error.message}`,
            messageSpan,
            MESSAGE_TYPES.ERROR
          );
          messageSpan.style.display = "block";
        } finally {
          // Réactiver le bouton
          submitBtn.disabled = false;
          submitBtn.textContent = "Valider";
        }
      } else {
        displayMessage(
          "Veuillez remplir tous les champs obligatoires",
          messageSpan,
          MESSAGE_TYPES.ERROR
        );
        messageSpan.style.display = "block";
      }
    });
  }

  validateForm() {
    const imageInput = document.getElementById("modalDropZoneImageInput");
    const titleInput = document.getElementById("imgTitleInput");
    const categoryInput = document.getElementById("imgCategoryInput");

    return (
      imageInput.files.length > 0 &&
      titleInput.value.trim() !== "" &&
      categoryInput.value !== ""
    );
  }

  // ===== Méthodes utitlitaires ===== //
  hideGalleryElements() {
    this.modalManager.gallery.hide();
  }

  hideDropzone() {
    const dropzone = document.querySelector(".dropzone");
    if (dropzone) {
      dropzone.style.display = "none";
      this.imagePreview.cleanup();
    }
  }

  hideForm() {
    const forms = document.querySelectorAll(".modal-content > .imgInputDiv");
    forms.forEach((form) => (form.style.display = "none"));
  }

  hideSubmitButton() {
    const submitBtn = document.getElementById("validImgBtn");
    if (submitBtn) submitBtn.remove();
  }

  hideReturnButton() {
    const returnBtn = document.getElementById("returnToGalleryBtn");
    if (returnBtn) returnBtn.remove();
  }

  hideMessage() {
    const messageSpan = document.getElementById("uiMessageSpan");
    if (messageSpan) {
      messageSpan.style.display = "none";
    }
  }

  changeTitle(title) {
    const modalTitle = this.modal.querySelector("h3");
    modalTitle.textContent = title;
  }
}
