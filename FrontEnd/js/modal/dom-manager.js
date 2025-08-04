// modal-dom-manager.js - Gestion des éléments DOM

export class ModalDomManager {
  constructor(modal, modalContent) {
    this.modal = modal;
    this.modalContent = modalContent;
  }

  // Créer ou afficher le bouton de retour
  createReturnButton(onClickCallback) {
    // Vérifier si le bouton existe déjà
    let returnBtn = document.getElementById("returnToGalleryBtn");

    if (returnBtn) {
      returnBtn.style.display = "block";
    } else {
      returnBtn = document.createElement("button");
      returnBtn.id = "returnToGalleryBtn";

      const icon = document.createElement("i");
      icon.className = "fa-solid fa-arrow-left";

      returnBtn.appendChild(icon);
      this.modal.appendChild(returnBtn);
    }

    returnBtn.addEventListener("click", onClickCallback);

    return returnBtn;
  }

  // Changer le titre de la modale
  changeTitle(title) {
    const modalTitle = this.modal.querySelector("h3");
    modalTitle.textContent = title;
  }

  // Cacher/Afficher les éléments
  hideElements(selectors) {
    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        element.style.display = "none";
      });
    });
  }

  hideMessage() {
    const messageSpan = document.getElementById("uiMessageSpan");
    if (messageSpan) {
      messageSpan.style.display = "none";
    }
  }

  showMessage(messageSpan) {
    if (messageSpan) {
      messageSpan.style.display = "block";
    }
  }
}
