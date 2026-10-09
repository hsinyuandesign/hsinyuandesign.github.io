// if (window.location.pathname.endsWith('.html')) {
//   window.location.href = window.location.pathname.replace('.html', '');
// }
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
  sticker.style.transform = 'rotate(-5deg)';
  sticker.addEventListener("mousedown", (e) => dragStart(e, sticker));
  sticker.addEventListener("touchstart", (e) => dragStart(e, sticker), { passive: false });
});

document.addEventListener("mousemove", dragMove);
document.addEventListener("touchmove", dragMove, { passive: false });

document.addEventListener("mouseup", dragEnd);
document.addEventListener("touchend", dragEnd);



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
        "reflection"
      ];

      const titles = [
        "Overview",
        "Problem",
        "Research",
        "Process",
        "Solution",
        "Reflection"
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

document.getElementById('sidebarToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('collapsed');
});

document.querySelector('.record-player').addEventListener('click', () => {
  document.getElementById('sidebar').classList.remove('collapsed');
});

document.querySelector('.record-player').addEventListener('mouseenter', () => {
  if (document.getElementById('sidebar').classList.contains('collapsed')) {
    cursor.classList.add('cursor-hover');
  }
});

document.querySelector('.record-player').addEventListener('mouseleave', () => {
  cursor.classList.remove('cursor-hover');
});
document.querySelector('.record-player').addEventListener('click', () => {
  document.getElementById('sidebar').classList.remove('collapsed');
  cursor.classList.remove('cursor-hover'); 
});

(function () {
  const scroller = document.querySelector('.iter-scroll');
  const prev = document.querySelector('.iter-prev');
  const next = document.querySelector('.iter-next');
  const count = document.querySelector('.iter-count');
  if (!scroller) return;

  const total = scroller.querySelectorAll('img').length;

  function stepSize() {
    const img = scroller.querySelector('img');
    const gap = parseFloat(getComputedStyle(scroller).columnGap) || 0;
    return img.getBoundingClientRect().width + gap;
  }

  function updateUI() {
    const max = scroller.scrollWidth - scroller.clientWidth;
    const atStart = scroller.scrollLeft <= 2;
    const atEnd = scroller.scrollLeft >= max - 2;
    prev.disabled = atStart;
    next.disabled = atEnd;

    let index = Math.round(scroller.scrollLeft / stepSize()) + 1;
    if (atStart) index = 1;
    if (atEnd) index = total;
    index = Math.min(Math.max(index, 1), total);
    count.textContent = index + '/' + total;
  }

  prev.addEventListener('click', () =>
    scroller.scrollBy({ left: -stepSize(), behavior: 'smooth' }));
  next.addEventListener('click', () =>
    scroller.scrollBy({ left: stepSize(), behavior: 'smooth' }));

  scroller.addEventListener('scroll', updateUI, { passive: true });
  window.addEventListener('resize', updateUI);
  updateUI();

  let isDown = false, startX = 0, startScroll = 0, moved = false;

  scroller.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    isDown = true;
    moved = false;
    startX = e.clientX;
    startScroll = scroller.scrollLeft;
  });

  window.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    const dx = e.clientX - startX;
    if (!moved && Math.abs(dx) > 4) {
      moved = true;
      scroller.classList.add('is-dragging');
    }
    if (moved) scroller.scrollLeft = startScroll - dx;
  });

  function endDrag() {
    if (!isDown) return;
    isDown = false;
    if (!moved) return;
    scroller.classList.remove('is-dragging');
    const step = stepSize();
    const target = Math.round(scroller.scrollLeft / step) * step;
    scroller.scrollTo({ left: target, behavior: 'smooth' });
  }
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);

  scroller.addEventListener('click', (e) => {
    if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
  }, true);
})();