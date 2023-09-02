const gallery = document.querySelector(".images");
const images = document.querySelectorAll(".image-item img");
const popup = document.querySelector(".popup");
const popupImage = document.querySelector(".popup img");
const buttonClose = document.querySelector("#popup-close-button");
const arrowLeft = document.querySelector("#popup-arrow-left");
const arrowRight = document.querySelector("#popup-arrow-right");

let imageIndex;

const nextImage = () => {
  if (imageIndex === images.length - 1) {
    imageIndex = 0;
  } else {
    imageIndex += 1;
  }
  popupImage.src = images[imageIndex].src;
};

const previousImage = () => {
  if (imageIndex === 0) {
    imageIndex = images.length - 1;
  } else {
    imageIndex -= 1;
  }
  popupImage.src = images[imageIndex].src;
};

const closePopup = () => {
  popup.classList.add("popup-hidden");
};

images.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    popup.classList.remove("popup-hidden");
    popupImage.src = e.target.src;
    imageIndex = index;
  });
});

buttonClose.addEventListener("click", closePopup);
arrowLeft.addEventListener("click", previousImage);
arrowRight.addEventListener("click", nextImage);
popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    closePopup();
  }
});

document.addEventListener("keydown", (e) => {
  if (!popup.classList.contains("popup-hidden")) {
    if (e.code === "ArrowRight" || e.keyCode === 39) {
      nextImage();
    } else if (e.code === "ArrowLeft" || e.keyCode === 37) {
      previousImage();
    } else if (e.code === "Escape" || e.keyCode === 27) {
      closePopup();
    }
  }
});
