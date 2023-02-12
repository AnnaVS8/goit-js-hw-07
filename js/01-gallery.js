import { galleryItems } from "./gallery-items.js";
// console.log(galleryItems);
const galleryContainer = document.querySelector(".gallery");
// console.log(galleryContainer);

const imgsMarkup = createGalleryImgMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", imgsMarkup);

function createGalleryImgMarkup(galleryItems) {
  return galleryItems
    .map(
      ({ preview, original, description }) =>
        `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
        </div>`
    )
    .join("");
}

galleryContainer.addEventListener("click", clickImage);

function clickImage(e) {
  e.preventDefault();
  if (!e.target.classList.contains("gallery__image")) {
    return;
  }
  const instance = basicLightbox.create(
    ` <img src=${e.target.dataset.source}>`,
    {
      onShow() {
        window.addEventListener("keydown", onCloseImg);
      },
      onClose() {
        window.removeEventListener("keydown", onCloseImg);
      },
    }
  );
  instance.show();
}
const onCloseImg = (event) => {
  if (event.code === "Escape") {
    instance.close();
  }
};
