// modal-manager.js - Gestionnaire principal
import { ModalEvents } from "./modal-events.js";
import { ModalGallery } from "./modal-gallery.js";
import { ModalAddImage } from "./modal-add-image.js";

export class ModalManager {
  constructor() {
    this.modal = document.getElementById("modal");
    this.modalContent = document.querySelector(".modal-content");
    this.modalGallery = document.getElementById("modal-gallery");
    this.showModalBtn = document.getElementById("showModalBtn");
    this.closeModalBtn = document.getElementById("closeBtnModal");
    this.addImgBtn = document.getElementById("addImgBtnModal");

    if (!this.modal || !this.modalContent || !this.modalGallery) {
      throw new Error("Éléments DOM requis pour la modale introuvables");
    }

    this.events = new ModalEvents(this);
    this.gallery = new ModalGallery(this);
    this.addImage = new ModalAddImage(this);
  }

  setup() {
    this.events.setupEvents();
    this.gallery.init();
    this.addImage.setupAddButton();
  }

  showGalleryView() {
    this.addImage.hide();
    this.gallery.show();
  }

  showAddImageView() {
    this.gallery.hide();
    this.addImage.show();
  }
}

export function setupModal() {
  const modalManager = new ModalManager();
  modalManager.setup();
}
