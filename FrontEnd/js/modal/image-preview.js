// image-preview.js - Gestion de l'aperçu

export class ImagePreview {
  setup() {
    const imageInput = document.getElementById("modalDropZoneImageInput");

    if (!imageInput) {
      console.error("Input d'image introuvable");
      return;
    }

    imageInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        this.display(file);
      }
    });
  }

  display(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const dropzoneContent = document.querySelector(".dropzone-content");
      this.hideDropzoneElements();
      const previewImage = this.createPreviewImage(e.target.result);
      dropzoneContent.appendChild(previewImage);
    };

    reader.readAsDataURL(file);
  }

  createPreviewImage(imageSrc) {
    const img = document.createElement("img");
    img.src = imageSrc;
    img.alt = "Aperçu de l'image";
    img.id = "imagePreview";
    return img;
  }

  cleanup() {
    const preview = document.getElementById("imagePreview");
    if (preview) preview.remove();

    this.showDropzoneElements();

    const imageInput = document.getElementById("modalDropZoneImageInput");
    if (imageInput) imageInput.value = "";
  }

  hideDropzoneElements() {
    const dropzoneContent = document.querySelector(".dropzone-content");
    const icon = dropzoneContent.querySelector("i");
    const button = dropzoneContent.querySelector(".custom-upload-btn");
    const span = dropzoneContent.querySelector("#modalDropZoneImageFormatSpan");

    if (icon) icon.style.display = "none";
    if (button) button.style.display = "none";
    if (span) span.style.display = "none";
  }

  showDropzoneElements() {
    const dropzoneContent = document.querySelector(".dropzone-content");
    const icon = dropzoneContent.querySelector("i");
    const button = dropzoneContent.querySelector(".custom-upload-btn");
    const span = dropzoneContent.querySelector("#modalDropZoneImageFormatSpan");

    if (icon) icon.style.display = "block";
    if (button) button.style.display = "block";
    if (span) span.style.display = "block";
  }
}
