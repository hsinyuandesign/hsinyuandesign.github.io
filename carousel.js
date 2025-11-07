
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const modal = document.getElementById("img-modal");
  const modalImg = document.getElementById("modal-img");

  track.innerHTML = track.innerHTML + track.innerHTML;

  
  const images = track.querySelectorAll(".carousel-img");

  images.forEach((img) => {
    img.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = img.src;

      track.style.animationPlayState = "paused";
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  modalImg.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  function closeModal() {
    modal.style.display = "none";
    track.style.animationPlayState = "running"; 
  }
});
