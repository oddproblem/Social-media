const container = document.querySelector(".reels-container");
const reels = document.querySelectorAll(".reel");
const reelHeight = reels[0].offsetHeight;

let currentIndex = 0;
let isAnimating = false;

/* Wheel control */
container.addEventListener("wheel", (e) => {
  if (isAnimating) return;

  if (e.deltaY > 0) {
    // scroll down
    currentIndex = Math.min(currentIndex + 1, reels.length - 1);
  } else {
    // scroll up
    currentIndex = Math.max(currentIndex - 1, 0);
  }

  isAnimating = true;

  container.scrollTo({
    top: currentIndex * reelHeight,
    behavior: "smooth"
  });

  setTimeout(() => {
    isAnimating = false;
  }, 600);
});

/* Touch support (mobile swipe) */
let startY = 0;

container.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
});

container.addEventListener("touchend", (e) => {
  if (isAnimating) return;

  const endY = e.changedTouches[0].clientY;
  const diff = startY - endY;

  if (Math.abs(diff) < 50) return;

  if (diff > 0) {
    currentIndex = Math.min(currentIndex + 1, reels.length - 1);
  } else {
    currentIndex = Math.max(currentIndex - 1, 0);
  }

  isAnimating = true;

  container.scrollTo({
    top: currentIndex * reelHeight,
    behavior: "smooth"
  });

  setTimeout(() => {
    isAnimating = false;
  }, 600);
});

/* Auto play / pause videos */
const videos = document.querySelectorAll(".reel video");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) video.play();
      else video.pause();
    });
  },
  { threshold: 0.6 }
);

videos.forEach(video => observer.observe(video));
