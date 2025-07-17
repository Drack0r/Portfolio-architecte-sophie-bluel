// modal-gallery.js - Gestion de la galerie
import { works, createWorkElement } from "./works.js";
import { WorkDeleter } from "./work-deleter.js";

export class ModalGallery {
  constructor(modalManager) {
    this.modalManager = modalManager;
    this.modalGallery = modalManager.modalGallery;
    this.addImgBtn = modalManager.addImgBtn;
    this.workDeleter = new WorkDeleter();
  }

  init() {
    try {
      this.refresh(works);
    } catch (error) {
      console.error(`Erreur : ${error.message}`);
    }
  }

  refresh(works) {
    this.clear();
    this.displayWorks(works);
    this.setupDeleteButtons();
  }

  clear() {
    this.modalGallery.innerHTML = "";
  }

  displayWorks(works) {
    works.forEach((work) => {
      const workElement = createWorkElement(work, "modal");
      this.modalGallery.appendChild(workElement);
    });
  }

  setupDeleteButtons() {
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", async () => {
        const dataId = button.parentNode.getAttribute("data-work-id");
        await this.workDeleter.deleteById(dataId);
      });
    });
  }

  show() {
    this.modalGallery.style.display = "flex";
    this.addImgBtn.style.display = "block";
    this.changeTitle("Galerie photo");
  }

  hide() {
    this.modalGallery.style.display = "none";
    this.addImgBtn.style.display = "none";
  }

  changeTitle(title) {
    const modalTitle = this.modalManager.modal.querySelector("h3");
    modalTitle.textContent = title;
  }
}
