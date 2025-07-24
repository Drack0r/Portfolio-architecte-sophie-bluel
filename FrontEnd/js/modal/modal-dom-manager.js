// modal-dom-manager.js - Gestion des éléments DOM

export class ModalDomManager {
  constructor(modal, modalContent) {
    this.modal = modal;
    this.modalContent = modalContent;
  }

  // Créer le bouton de retour
  createReturnButton(onClickCallback) {
    const returnBtn = document.createElement("button");
    returnBtn.id = "returnToGalleryBtn";

    const icon = document.createElement("i");
    icon.className = "fa-solid fa-arrow-left";

    returnBtn.appendChild(icon);
    this.modal.appendChild(returnBtn);

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
        if (element.remove) element.remove();
        else element.style.display = "none";
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
