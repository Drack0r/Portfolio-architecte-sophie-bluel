// form-validator.js - Validation du formulaire

export class FormValidator {
  // Valider le formulaire d'ajout d'image
  validateAddImageForm() {
    const imageInput = document.getElementById("modalDropZoneImageInput");
    const titleInput = document.getElementById("imgTitleInput");
    const categoryInput = document.getElementById("imgCategoryInput");

    return (
      imageInput.files.length > 0 &&
      titleInput.value.trim() !== "" &&
      categoryInput.value !== ""
    );
  }

  // Extraire les données du formulaire
  extractFormData() {
    const imageInput = document.getElementById("modalDropZoneImageInput");
    const titleInput = document.getElementById("imgTitleInput");
    const categoryInput = document.getElementById("imgCategoryInput");

    return {
      imageFile: imageInput.files[0],
      title: titleInput.value.trim(),
      categoryId: categoryInput.value,
    };
  }
}
