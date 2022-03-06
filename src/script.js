import "./styles/style.css";
import "./img/1.jpg";
import "./img/2.jpg";
import "./img/3.jpg";
import "./img/4.jpg";
import "./img/5.jpg";
import "./img/6.jpg";

const gallery = document.querySelectorAll(".imgs img");
const closeBtn = document.querySelector(".fa-xmark");
const currntIMG = document.querySelector(".preview-img");

function showGallery(item) {
  currntIMG.src = item.src;
}

for (let i = 0; i < gallery.length; i++) {
  let newIndex = i;
  gallery[i].addEventListener("click", () => {
    document.querySelector(".preview").classList.add("show");
    document.querySelector(".dark").classList.add("show");

    showGallery(gallery[newIndex]);

    const left_arw = document.querySelector(".left-arw");
    const right_arw = document.querySelector(".right-arw");
    left_arw.addEventListener("click", () => {
      newIndex--;
      if (newIndex < 0) {
        newIndex = 5;
      }
      showGallery(gallery[newIndex]);
    });
    right_arw.addEventListener("click", () => {
      newIndex++;
      if (newIndex == 6) {
        newIndex = 0;
      }
      showGallery(gallery[newIndex]);
    });
  });
}
closeBtn.addEventListener("click", () => {
  document.querySelector(".preview").classList.remove("show");
  document.querySelector(".dark").classList.remove("show");
});
