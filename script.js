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

let activeSticker = null;
let mouseOffsetX = 0;
let mouseOffsetY = 0;
let startX = 0;
let startY = 0;

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

const getCoords = (e) => {
  return e.touches ? e.touches[0] : e;
};

const dragStart = (e, sticker) => {
  if (e.type === "mousedown" && e.button !== 0) return;
  
  activeSticker = sticker;
  const coords = getCoords(e);
  const rect = sticker.getBoundingClientRect();

  mouseOffsetX = coords.clientX - rect.left;
  mouseOffsetY = coords.clientY - rect.top;
  startX = coords.clientX;
  startY = coords.clientY;

  sticker.style.position = "fixed";
  sticker.style.left = rect.left + "px";
  sticker.style.top = rect.top + "px";
  sticker.style.zIndex = "5000";

  cursor.classList.add("cursor-hover");
  if (e.cancelable) e.preventDefault();
};

const dragMove = (e) => {
  if (!activeSticker) return;
  const coords = getCoords(e);

  let newTop = coords.clientY - mouseOffsetY;
  let newLeft = coords.clientX - mouseOffsetX;

  if (newTop < 120) newTop = 120;

  activeSticker.style.top = newTop + "px";
  activeSticker.style.left = newLeft + "px";
  
  if (e.cancelable) e.preventDefault();
};

const dragEnd = (e) => {
  if (!activeSticker) return;

  const coords = e.changedTouches ? e.changedTouches[0] : e;

  const finalLeft = coords.clientX - mouseOffsetX + window.scrollX;
  const finalTop = coords.clientY - mouseOffsetY + window.scrollY;

  activeSticker.style.position = "absolute";
  document.body.appendChild(activeSticker); 
  
  activeSticker.style.left = finalLeft + "px";
  activeSticker.style.top = Math.max(finalTop, 120 + window.scrollY) + "px";
  activeSticker.style.margin = "0";
  activeSticker.style.zIndex = "100";

  const moveDist = Math.sqrt(Math.pow(coords.clientX - startX, 2) + Math.pow(coords.clientY - startY, 2));
  if (moveDist < 5) {
    activeSticker.style.pointerEvents = "none";
    const elementBelow = document.elementFromPoint(coords.clientX, coords.clientY);
    if (elementBelow) {
      const clickable = elementBelow.closest('a') || elementBelow.closest('.playground-img');
      if (clickable) clickable.click();
    }
    activeSticker.style.pointerEvents = "auto";
  }

  activeSticker = null;
  cursor.classList.remove("cursor-hover");
};

stickers.forEach(sticker => {
  const randomRotation = (Math.random() * 15) * (Math.random() < 0.5 ? -1 : 1);
  sticker.style.transform = `rotate(${randomRotation}deg)`;

  sticker.addEventListener("mousedown", (e) => dragStart(e, sticker));
  sticker.addEventListener("touchstart", (e) => dragStart(e, sticker), { passive: false });
});

document.addEventListener("mousemove", dragMove);
document.addEventListener("touchmove", dragMove, { passive: false });

document.addEventListener("mouseup", dragEnd);
document.addEventListener("touchend", dragEnd);