// modal-add-image.js - Formulaire d'ajout
import { FormBuilder } from "./form-builder.js";
import { ImagePreview } from "./image-preview.js";

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

  async show() {
    this.hideGalleryElements();
    this.changeTitle("Ajout photo");
    this.createReturnButton();
    await this.buildForm();
    this.setupFormEvents();
  }

  hide() {
    this.hideDropzone();
    this.hideForm();
    this.hideSubmitButton();
    this.hideReturnButton();
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

  changeTitle(title) {
    const modalTitle = this.modal.querySelector("h3");
    modalTitle.textContent = title;
  }
}
