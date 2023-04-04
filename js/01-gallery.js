import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryUl = document.querySelector(".gallery");

const galleryLi = galleryItems
  .map(
    ({ description, original, preview }) =>
      `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `
  )
  .join("");
galleryUl.insertAdjacentHTML("afterbegin", galleryLi);

galleryUl.addEventListener("click", onClick);

function onClick(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }

  const cardImg = evt.target;
  const data = cardImg.dataset.source;
  const dataCard = galleryItems.find(({ original }) => original === data);

  const instance = basicLightbox.create(
    `
  <div><img src="${dataCard.original}" alt="${dataCard.description}"></div>
  `,
    {
      onShow: () => document.addEventListener("keydown", onEscClose),
      onClose: () => document.addEventListener("keydown", onEscClose),
    }
  );

  function onEscClose(evt) {
    if (evt.code === "Escape") {
      instance.close();
    }
  }

  instance.show();
}
