// form-builder.js - Construction du formulaire

import { CategoryService } from "./services.js";
import { FileValidator } from "./validator.js";

export class FormBuilder {
  constructor() {
    this.fileValidator = new FileValidator();
  }

  // Création des éléments du formulaire
  async createElements() {
    const form = document.createElement("form");
    form.id = "addWorkForm";

    const dropzone = this.createDropzone();
    const titleField = this.createTitleField();
    const categoryField = await this.createCategoryField();
    const hr = document.createElement("hr");
    hr.id = "addImageHr";
    const uiMessageSpan = this.createUiMessageSpan();
    const submitButton = this.createSubmitButton();

    form.appendChild(dropzone);
    form.appendChild(titleField);
    form.appendChild(categoryField);
    form.appendChild(uiMessageSpan);
    form.appendChild(hr);
    form.appendChild(submitButton);

    return {
      form,
      dropzone,
      titleField,
      categoryField,
      uiMessageSpan,
      submitButton,
    };
  }

  // Assemblage des éléments du formulaire
  assembleElements({ form }, modalContent) {
    modalContent.appendChild(form);
  }

  // Création de la Dropzone
  createDropzone() {
    const modalDropZone = document.createElement("div");
    modalDropZone.classList.add("dropzone");

    const modalDropZoneContent = document.createElement("div");
    modalDropZoneContent.classList.add("dropzone-content");

    const modalDropZoneImageIcon = document.createElement("i");
    modalDropZoneImageIcon.className = "fa-regular fa-image";

    const customUploadBtn = this.createUploadButton();
    const modalDropZoneImageInput = this.createFileInput();
    const modalDropZoneImageFormatSpan = this.createFormatSpan();

    modalDropZone.appendChild(modalDropZoneContent);
    modalDropZoneContent.appendChild(modalDropZoneImageIcon);
    modalDropZoneContent.appendChild(customUploadBtn);
    modalDropZoneContent.appendChild(modalDropZoneImageInput);
    modalDropZoneContent.appendChild(modalDropZoneImageFormatSpan);

    return modalDropZone;
  }

  // Créer le bouton d'upload
  createUploadButton() {
    const customUploadBtn = document.createElement("button");

    customUploadBtn.type = "button";
    customUploadBtn.textContent = "+ Ajouter photo";
    customUploadBtn.classList.add("custom-upload-btn");

    customUploadBtn.addEventListener("click", () => {
      document.getElementById("modalDropZoneImageInput").click();
    });

    return customUploadBtn;
  }

  // Créer l'input file
  createFileInput() {
    const modalDropZoneImageInput = document.createElement("input");

    modalDropZoneImageInput.id = "modalDropZoneImageInput";
    modalDropZoneImageInput.name = "image";
    modalDropZoneImageInput.type = "file";
    modalDropZoneImageInput.accept = "image/png, image/jpeg";
    modalDropZoneImageInput.style.display = "none";

    modalDropZoneImageInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      const uiMessageSpan = document.getElementById("uiMessageSpan");

      if (!this.fileValidator.validate(file, uiMessageSpan)) {
        event.target.value = "";
      }
    });

    return modalDropZoneImageInput;
  }

  // Créer le span de format
  createFormatSpan() {
    const modalDropZoneImageFormatSpan = document.createElement("span");

    modalDropZoneImageFormatSpan.id = "modalDropZoneImageFormatSpan";
    modalDropZoneImageFormatSpan.textContent = "jpg, png : 4mo max";
    return modalDropZoneImageFormatSpan;
  }

  // Création du champ "titre"
  createTitleField() {
    const imgTitleDiv = document.createElement("div");
    imgTitleDiv.classList.add("imgInputDiv");

    const imgTitleLabel = document.createElement("label");
    imgTitleLabel.textContent = "Titre";
    imgTitleLabel.classList.add("imgLabel");
    imgTitleLabel.setAttribute("for", "imgTitleInput");

    const imgTitleInput = document.createElement("input");
    imgTitleInput.classList.add("imgInput");
    imgTitleInput.setAttribute("id", "imgTitleInput");
    imgTitleInput.setAttribute("name", "title");
    imgTitleInput.setAttribute("type", "text");

    imgTitleDiv.appendChild(imgTitleLabel);
    imgTitleDiv.appendChild(imgTitleInput);

    return imgTitleDiv;
  }

  // Création du champ "catégorie"
  async createCategoryField() {
    const imgCategoryDiv = document.createElement("div");
    imgCategoryDiv.classList.add("imgInputDiv");

    const imgCategoryLabel = document.createElement("label");
    imgCategoryLabel.textContent = "Catégorie";
    imgCategoryLabel.classList.add("imgLabel");
    imgCategoryLabel.setAttribute("for", "imgCategoryInput");

    const imgCategoryInput = document.createElement("select");
    imgCategoryInput.classList.add("imgInput");
    imgCategoryInput.setAttribute("id", "imgCategoryInput");
    imgCategoryInput.setAttribute("name", "category");

    await this.populateCategorySelect(imgCategoryInput);

    imgCategoryDiv.appendChild(imgCategoryLabel);
    imgCategoryDiv.appendChild(imgCategoryInput);

    return imgCategoryDiv;
  }

  // Remplissage de l'élément <select> avec les catégories
  async populateCategorySelect(selectElement) {
    const categories = CategoryService.getUniqueCategories();
    const options = this.createCategoryOptions(categories);

    options.forEach((option) => selectElement.appendChild(option));
  }

  // Créations des options "catégories"
  createCategoryOptions(categories) {
    return categories.map((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      return option;
    });
  }

  // Création du bouton de soumission du formulaire
  createSubmitButton() {
    const validImgBtn = document.createElement("button");
    validImgBtn.textContent = "Valider";
    validImgBtn.setAttribute("id", "validImgBtn");

    return validImgBtn;
  }

  // Création de l'élément <span> pour les messages UI
  createUiMessageSpan() {
    const uiMessageSpan = document.createElement("span");
    uiMessageSpan.textContent = "Message d'erreur";
    uiMessageSpan.id = "uiMessageSpan";
    uiMessageSpan.style.display = "none";

    return uiMessageSpan;
  }
}
