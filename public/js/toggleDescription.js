const descriptionTitle = document.querySelector(".description-title");
const description = document.querySelector(".description-wrapper");

let isDescriptionHidden = true;

descriptionTitle.addEventListener("click", () => {
  if (isDescriptionHidden) {
    description.classList.remove("description-hidden");
    descriptionTitle.innerHTML =
      'Opis <span class="material-symbols-outlined">expand_less</span>';
  } else {
    description.classList.add("description-hidden");
    descriptionTitle.innerHTML =
      'Opis <span class="material-symbols-outlined">expand_more</span>';
  }
  isDescriptionHidden = !isDescriptionHidden;
});
