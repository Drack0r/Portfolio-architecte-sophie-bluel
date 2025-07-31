// modal-gallery.js - Gestion de la galerie
import { works, createWorkElement } from "../works.js";
import { WorkDeleter } from "./work-deleter.js";

export class ModalGallery {
  constructor(modalManager) {
    this.modalManager = modalManager;
    this.modalGallery = modalManager.modalGallery;
    this.addImgBtn = modalManager.addImgBtn;
    this.workDeleter = new WorkDeleter();
    this.isInitialized = false;
  }

  // Initialisation de la vue "gallerie"
  init() {
    try {
      this.refresh(works);
      this.isInitialized = true;
    } catch (error) {
      console.error(`Erreur : ${error.message}`);
    }
  }

  // S'assurer que la gallerie est bien initialisée
  ensureInitialized() {
    if (!this.isInitialized) {
      this.init();
    }
  }

  // Rafraîchissement de la vue "gallerie"
  refresh(works) {
    this.clear();
    this.displayWorks(works);
    this.setupDeleteButtons();
  }

  // Ajout d'un nouveau travail
  addWork(newWork) {
    const workElement = createWorkElement(newWork, "modal");

    this.modalGallery.appendChild(workElement);
    this.setupDeleteButtons();
  }

  // Nettoyage de la vue "gallerie"
  clear() {
    this.modalGallery.innerHTML = "";
  }

  // Affichage des travaux
  displayWorks(works) {
    works.forEach((work) => {
      const workElement = createWorkElement(work, "modal");

      this.modalGallery.appendChild(workElement);
    });
  }

  // Installation des boutons "supprimer"
  setupDeleteButtons() {
    const deleteButtons = document.querySelectorAll(".delete-button");

    deleteButtons.forEach((button) => {
      button.addEventListener("click", async () => {
        const dataId = button.parentNode.getAttribute("data-work-id");
        await this.workDeleter.deleteById(dataId);
      });
    });
  }

  // Affichage de la vue "gallerie"
  show() {
    this.modalGallery.style.display = "flex";
    this.addImgBtn.style.display = "block";
    this.changeTitle("Galerie photo");
  }

  // Camouflage de la vue "gallerie"
  hide() {
    this.modalGallery.style.display = "none";
    this.addImgBtn.style.display = "none";
  }

  // Changement du titre de la modale
  changeTitle(title) {
    const modalTitle = this.modalManager.modal.querySelector("h3");
    modalTitle.textContent = title;
  }
}
