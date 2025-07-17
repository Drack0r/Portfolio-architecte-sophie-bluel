// form-builder.js - Construction du formulaire
import { works } from "./works.js";

export class FormBuilder {
  async createElements() {
    const dropzone = this.createDropzone();
    const titleField = this.createTitleField();
    const categoryField = await this.createCategoryField();
    const submitButton = this.createSubmitButton();

    return { dropzone, titleField, categoryField, submitButton };
  }

  assembleElements(
    { dropzone, titleField, categoryField, submitButton },
    modal,
    modalContent
  ) {
    const modalTitle = modal.querySelector("h3");
    modalTitle.insertAdjacentElement("afterend", dropzone);
    dropzone.insertAdjacentElement("afterend", titleField);
    titleField.insertAdjacentElement("afterend", categoryField);
    modalContent.appendChild(submitButton);
  }

  createDropzone() {
    const modalDropZone = document.createElement("div");
    modalDropZone.classList.add("dropzone");

    const modalDropZoneContent = document.createElement("div");
    modalDropZoneContent.classList.add("dropzone-content");

    const modalDropZoneImageIcon = document.createElement("i");
    modalDropZoneImageIcon.className = "fa-regular fa-image";

    // Bouton personnalisé
    const customUploadBtn = document.createElement("button");
    customUploadBtn.type = "button";
    customUploadBtn.textContent = "+ Ajouter photo";
    customUploadBtn.classList.add("custom-upload-btn");

    // Input file caché
    const modalDropZoneImageInput = document.createElement("input");
    modalDropZoneImageInput.id = "modalDropZoneImageInput";
    modalDropZoneImageInput.type = "file";
    modalDropZoneImageInput.accept = "image/png, image/jpeg";
    modalDropZoneImageInput.style.display = "none";

    // Événement pour déclencher l'input
    customUploadBtn.addEventListener("click", () => {
      modalDropZoneImageInput.click();
    });

    const modalDropZoneImageFormatSpan = document.createElement("span");
    modalDropZoneImageFormatSpan.id = "modalDropZoneImageFormatSpan";
    modalDropZoneImageFormatSpan.textContent = "jpg, png : 4mo max";

    modalDropZone.appendChild(modalDropZoneContent);
    modalDropZoneContent.appendChild(modalDropZoneImageIcon);
    modalDropZoneContent.appendChild(customUploadBtn);
    modalDropZoneContent.appendChild(modalDropZoneImageInput);
    modalDropZoneContent.appendChild(modalDropZoneImageFormatSpan);

    return modalDropZone;
  }

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
    imgTitleInput.setAttribute("type", "text");

    imgTitleDiv.appendChild(imgTitleLabel);
    imgTitleDiv.appendChild(imgTitleInput);

    return imgTitleDiv;
  }

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

    await this.populateCategorySelect(imgCategoryInput);

    imgCategoryDiv.appendChild(imgCategoryLabel);
    imgCategoryDiv.appendChild(imgCategoryInput);

    return imgCategoryDiv;
  }

  async populateCategorySelect(selectElement) {
    const categories = this.getUniqueCategories();
    const options = this.createCategoryOptions(categories);

    options.forEach((option) => selectElement.appendChild(option));
  }

  createCategoryOptions(categories) {
    return categories.map((categoryName) => {
      const option = document.createElement("option");
      option.value = categoryName;
      option.textContent = categoryName;
      return option;
    });
  }

  createSubmitButton() {
    const validImgBtn = document.createElement("button");
    validImgBtn.textContent = "Valider";
    validImgBtn.setAttribute("id", "validImgBtn");

    return validImgBtn;
  }

  getUniqueCategories() {
    try {
      return [...new Set(works.map((work) => work.category.name))];
    } catch (error) {
      console.error(`Erreur lors du chargement des catégories : ${error}`);
      return [];
    }
  }
}
