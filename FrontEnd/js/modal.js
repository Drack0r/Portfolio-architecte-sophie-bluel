// modal.js - Module de gestion de modale
import { fetchDelete } from "./api.js";
import { works, createWorkElement } from "./works.js";

const modal = document.getElementById("modal");
const modalContent = document.querySelector(".modal-content");
const modalGallery = document.getElementById("modal-gallery");
const showModalBtn = document.getElementById("showModalBtn");
const closeModalBtn = document.getElementById("closeBtnModal");
const addImgBtn = document.getElementById("addImgBtnModal");

// ===== 1. POINT D'ENTRÉE PRINCIPAL =====

// Orchestrer la modale
export function setupModal() {
  setupModalEvents();
  initModalGallery();
  setupAddImageButton();
}

// ===== 2. ÉVÉNEMENTS PRINCIPAUX DE LA MODALE =====

// Configurer les événements de la modale
function setupModalEvents() {
  showModal();
  closeModal();
}

// Afficher la modale
function showModal() {
  attachShowButtonEvent();
}

// Fermer la modale
function closeModal() {
  attachCloseButtonEvent();
  attachCloseBackdropEvent();
}

function attachShowButtonEvent() {
  showModalBtn.addEventListener("click", async () => {
    modal.showModal();
    // Recharger la galerie à chaque ouverture
    await initModalGallery();
    // Toujours afficher la vue galerie par défaut
    setupGalleryModal();
  });
}

function attachCloseButtonEvent() {
  closeModalBtn.addEventListener("click", () => {
    modal.close();
    return;
  });
}

function attachCloseBackdropEvent() {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });

  // Empêcher la propagation des clics depuis le contenu de la modale
  const modalContent = modal.querySelector(".modal-content");
  modalContent.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

// ===== 3. GESTION DE LA GALERIE =====

// Initialiser la gallerie
function initModalGallery() {
  try {
    refreshModalGallery(works);
  } catch (error) {
    console.error(`Erreur : ${error.message}`);
  }
}

// Rafraîchir la galerie
function refreshModalGallery(works) {
  clearGallery();
  displayWorks(works);
  setupDeleteButtons();
}

// Vider la galerie
function clearGallery() {
  modalGallery.innerHTML = "";
}

// Afficher les travaux dans la galerie
function displayWorks(works) {
  works.forEach((work) => {
    const workElement = createWorkElement(work, "modal");
    modalGallery.appendChild(workElement);
  });
}

// ===== 4. GESTION DES BOUTONS DE SUPPRESSION =====

// Configure tous les boutons de suppression
function setupDeleteButtons() {
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach(attachDeleteEvent);
}

// Attache l'événement de suppression à un bouton
function attachDeleteEvent(button) {
  button.addEventListener("click", async () => {
    const dataId = button.parentNode.getAttribute("data-id");
    await deleteWorkById(dataId);
  });
}

// ===== 5. OPÉRATIONS DE SUPPRESSION =====

// === FONCTION PRINCIPALE ===
// Supprime un travail avec le data-id
async function deleteWorkById(dataId) {
  try {
    // Vérifier le token avant la requête
    const token = localStorage.getItem("token");

    const response = await fetchDelete(dataId);

    if (response.ok) {
      const elementsWithSameId = selectSameDataId(dataId);
      removeElements(elementsWithSameId);
      return true;
    } else {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
  } catch (error) {
    console.error("Erreur lors de la suppression: ", error);
    return false;
  }
}

// === FONCTIONS UTILITAIRES ===
// Sélectionne un élément avec le même ID
function selectSameDataId(dataId) {
  const elementsWithSameId = document.querySelectorAll(`[data-id="${dataId}"]`); //? workId
  return elementsWithSameId;
}

// Supprime un élément du DOM
function removeElements(elements) {
  elements.forEach((element) => {
    element.remove();
  });
}

// ===== 6. GESTION DU FORMULAIRE D'AJOUT =====

// === FONCTIONS PRINCIPALES ===
function setupAddImageButton() {
  addImgBtn.addEventListener("click", async () => {
    await setupAddImageModal();
  });
}

async function setupAddImageModal() {
  switchToAddImageView();
  createReturnToGalleryButton();
  await buildAddImageForm();
  setupAddImageFormEvents();
}

function setupGalleryModal() {
  switchToGalleryView();
  revealGaleryModalElements();
  setupDeleteButtons();
}

// === FONCTIONS DE COORDINATION ===
function switchToAddImageView() {
  hideGalleryModal();
  hideGalleryModalButton();
  changeModalTitle("Ajout photo");
}

function switchToGalleryView() {
  hideModalDropzone();
  hideModalForm();
  hideAddImageSubmitButton();
  hideReturnToGalleryButton();
  changeModalTitle("Galerie photo");
}

async function buildAddImageForm() {
  const formElements = await createFormElements();
  assembleFormElements(formElements);
}

async function createFormElements() {
  const modalTitle = modal.querySelector("h3");
  const dropzone = createModalDropzone();
  const titleField = createImageTitleElement();
  const categoryField = await createImageCategoryElement();
  const submitButton = createValidateButton();

  return { modalTitle, dropzone, titleField, categoryField, submitButton };
}

function assembleFormElements({
  modalTitle,
  dropzone,
  titleField,
  categoryField,
  submitButton,
}) {
  modalTitle.insertAdjacentElement("afterend", dropzone);
  dropzone.insertAdjacentElement("afterend", titleField);
  titleField.insertAdjacentElement("afterend", categoryField);
  modalContent.appendChild(submitButton);
}

function createReturnToGalleryButton() {
  createReturnToGalleryButtonElement();
  attachReturnToGalleryEvent();
}

function createReturnToGalleryButtonElement() {
  const returnToGalleryBtn = document.createElement("button");
  returnToGalleryBtn.id = "returnToGalleryBtn";

  const returnToGalleryBtnIcon = document.createElement("i");
  returnToGalleryBtnIcon.className = "fa-solid fa-arrow-left";

  modal.appendChild(returnToGalleryBtn);
  returnToGalleryBtn.appendChild(returnToGalleryBtnIcon);
}

function attachReturnToGalleryEvent() {
  const returnToGalleryBtn = document.getElementById("returnToGalleryBtn");
  returnToGalleryBtn.addEventListener("click", () => {
    setupGalleryModal();
  });
}

function revealGaleryModalElements() {
  modalGallery.style.display = "flex";
  addImgBtn.style.display = "block";
}

function setupAddImageFormEvents() {
  setupImagePreview();
}

// === FONCTIONS DE GESTION DE L'APERÇU D'IMAGE ===
function setupImagePreview() {
  const imageInput = document.getElementById("modalDropZoneImageInput");

  imageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (file) {
      displayImagePreview(file);
    } else {
      console.error("Veuillez sélectionner une image valide (jpg, png).");
    }
  });
}

function displayImagePreview(file) {
  const reader = new FileReader();

  reader.onload = function (e) {
    const dropzoneContent = document.querySelector(".dropzone-content");
    hideDropzonElements();
    const previewImage = createPreviewImage(e.target.result);
    dropzoneContent.appendChild(previewImage);
  };

  reader.readAsDataURL(file);
}

function createPreviewImage(imageSrc) {
  const previewImage = document.createElement("img");
  previewImage.src = imageSrc;
  previewImage.alt = "Aperçu de l'image";
  previewImage.id = "imagePreview";

  return previewImage;
}

function cleanupImagePreview() {
  const previewImage = document.getElementById("imagePreview");
  if (previewImage) {
    previewImage.remove();
  }
  showDropzoneElements();
  const imageInput = document.getElementById("modalDropZoneImageInput");
  if (imageInput) {
    imageInput.value = "";
  }
}

// === FONCTIONS DE MANIPULATION DOM ===
function hideGalleryModal() {
  modalGallery.style.display = "none";
}

function hideGalleryModalButton() {
  addImgBtn.style.display = "none";
}

function hideDropzonElements() {
  const dropzoneContent = document.querySelector(".dropzone-content");
  const icon = dropzoneContent.querySelector("i");
  const button = dropzoneContent.querySelector(".custom-upload-btn");
  const span = dropzoneContent.querySelector("#modalDropZoneImageFormatSpan");

  if (icon) icon.style.display = "none";
  if (button) button.style.display = "none";
  if (span) span.style.display = "none";
}

function showDropzoneElements() {
  const dropzoneContent = document.querySelector(".dropzone-content");
  const icon = dropzoneContent.querySelector("i");
  const button = dropzoneContent.querySelector(".custom-upload-btn");
  const span = dropzoneContent.querySelector("#modalDropZoneImageFormatSpan");

  if (icon) icon.style.display = "block";
  if (button) button.style.display = "block";
  if (span) span.style.display = "block";
}

function hideModalDropzone() {
  const modalDropZone = document.querySelector(".dropzone");
  if (modalDropZone) {
    modalDropZone.style.display = "none";
    cleanupImagePreview();
  }
}

function hideModalForm() {
  const modalForms = document.querySelectorAll(".modal-content > .imgInputDiv");
  modalForms.forEach((form) => {
    form.style.display = "none";
  });
}

function hideAddImageSubmitButton() {
  const submitButton = document.getElementById("validImgBtn");
  if (submitButton) {
    submitButton.remove();
  }
}

function hideReturnToGalleryButton() {
  const returnToGalleryBtn = document.getElementById("returnToGalleryBtn");
  if (returnToGalleryBtn) {
    returnToGalleryBtn.remove();
  }
}

function changeModalTitle(title) {
  const modalTitle = modal.querySelector("h3");
  modalTitle.textContent = title;
  return modalTitle;
}

// === FONCTIONS DE CRÉATION D'ÉLÉMENTS ===
function createModalDropzone() {
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

function createImageTitleElement() {
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

async function createImageCategoryElement() {
  const imgCategoryDiv = document.createElement("div");
  imgCategoryDiv.classList.add("imgInputDiv");

  const imgCategoryLabel = document.createElement("label");
  imgCategoryLabel.textContent = "Catégorie";
  imgCategoryLabel.classList.add("imgLabel");
  imgCategoryLabel.setAttribute("for", "imgCategoryInput");

  const imgCategoryInput = document.createElement("select");
  imgCategoryInput.classList.add("imgInput");
  imgCategoryInput.setAttribute("id", "imgCategoryInput");

  await populateCategorySelect(imgCategoryInput);

  imgCategoryDiv.appendChild(imgCategoryLabel);
  imgCategoryDiv.appendChild(imgCategoryInput);

  return imgCategoryDiv;
}

function createValidateButton() {
  const validImgBtn = document.createElement("button");
  validImgBtn.textContent = "Valider";
  validImgBtn.setAttribute("id", "validImgBtn");

  return validImgBtn;
}

// === FONCTIONS DE GESTION DES CATÉGORIES ===
async function populateCategorySelect(selectElement) {
  const categories = getUniqueCategories();
  const options = createCategoryOptions(categories);

  options.forEach((option) => selectElement.appendChild(option));
}

function getUniqueCategories() {
  try {
    return [...new Set(works.map((work) => work.category.name))];
  } catch (error) {
    console.error(`Erreur lors du chargement des catégories : ${error}`);
    return [];
  }
}

function createCategoryOptions(categories) {
  return categories.map((categoryName) => {
    const option = document.createElement("option");
    option.value = categoryName;
    option.textContent = categoryName;
    return option;
  });
}
