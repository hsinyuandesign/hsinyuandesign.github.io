if (window.location.pathname.endsWith('.html')) {
  window.location.href = window.location.pathname.replace('.html', '');
}

document.addEventListener("DOMContentLoaded", () => {

  const cursor = document.querySelector(".custom-cursor");

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  const hoverTargets = document.querySelectorAll("a, button");

  hoverTargets.forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("cursor-hover");
    });

    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("cursor-hover");
    });
  });

  document.addEventListener("mousedown", () => {
    cursor.classList.add("cursor-click");
  });

  document.addEventListener("mouseup", () => {
    cursor.classList.remove("cursor-click");
  });

});

const observerOptions = {
  root: null,
  rootMargin: "-10% 0px -80% 0px",
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");

      document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${id}`
        );
      });
    }
  });
}, observerOptions);
document.querySelectorAll("section[id]").forEach(section => {
  observer.observe(section);
});

const vinyl = document.querySelector(".vinyl");
const nowPlaying = document.getElementById("nowPlayingTrack");
const needle = document.getElementById("needle");

let rotation = 0;
let spinning = false;

function spinVinyl() {
  if (spinning) {
    rotation += 1.5;
    vinyl.style.transform = `rotate(${rotation}deg)`;
  }
  requestAnimationFrame(spinVinyl);
}

spinVinyl();

let scrollTimeout;

window.addEventListener("scroll", () => {

  spinning = true;

  clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout(() => {
    spinning = false;
  }, 120);

});


const observerOptions2 = {
  root: null,
  rootMargin: "-10% 0px -80% 0px",
  threshold: 0
};

const observer2 = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      const id = entry.target.getAttribute("id");

      const sections = [
        "overview",
        "problem",
        "research",
        "process",
        "solution",
        "conclusion"
      ];

      const titles = [
        "Overview",
        "Context / Problem",
        "Research",
        "Process",
        "Solution",
        "Conclusion"
      ];

      const index = sections.indexOf(id);

      if (index !== -1) {

        nowPlaying.textContent = titles[index];

        const angle = -25 + (index * 8);
        needle.style.transform = `rotate(${angle}deg)`;

      }

    }

  });

}, observerOptions2);

document.querySelectorAll("section[id]").forEach(section => {
  observer2.observe(section);
});

window.addEventListener("load", () => {
  const needle = document.querySelector(".needle-img");

  setTimeout(() => {
    needle.classList.add("engaged");
  }, 400);
});

const needleImg = document.querySelector(".needle-img");

window.addEventListener("scroll", () => {

  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;

  const progress = scrollTop / docHeight;

  const startAngle = 15;
  const endAngle = 35;

  const angle = startAngle + (endAngle - startAngle) * progress;

  needleImg.style.transform = `rotate(${angle}deg)`;

});

const stickers = document.querySelectorAll(".sticker");
const cursor = document.querySelector(".custom-cursor");

stickers.forEach(sticker => {

  const randomRotation = (Math.random() * 15)* (Math.random() < 0.5 ? -1 : 1);
  sticker.style.transform = `rotate(${randomRotation}deg)`;

  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  sticker.addEventListener("dragstart", (e) => {
    e.preventDefault();
  });

  sticker.addEventListener("mousedown", (e) => {
  e.preventDefault();
  dragging = true;

  offsetX = e.clientX - sticker.offsetLeft;
  offsetY = e.clientY - sticker.offsetTop;

  cursor.classList.add("cursor-hover");
});

  document.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    sticker.style.left = (e.clientX - offsetX) + "px";
    sticker.style.top = (e.clientY - offsetY) + "px";
  });

  document.addEventListener("mouseup", () => {
    dragging = false;
    cursor.classList.remove("cursor-hover");
  });

});

