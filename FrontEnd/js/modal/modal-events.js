// modal-events.js - Gestion des événements

export class ModalEvents {
  constructor(modalManager) {
    this.modalManager = modalManager;
    this.modal = modalManager.modal;
    this.showModalBtn = modalManager.showModalBtn;
    this.closeModalBtn = modalManager.closeModalBtn;
  }

  setupEvents() {
    this.setupShowEvent();
    this.setupCloseEvents();
  }

  setupShowEvent() {
    this.showModalBtn.addEventListener("click", async () => {
      this.modal.showModal();
      await this.modalManager.gallery.init();
      this.modalManager.showGalleryView();
    });
  }

  setupCloseEvents() {
    this.closeModalBtn.addEventListener("click", () => {
      this.modal.close();
    });

    this.modal.addEventListener("click", (event) => {
      if (event.target === this.modal) {
        this.modal.close();
      }
    });

    const modalContent = this.modal.querySelector(".modal-content");
    modalContent.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }
}
