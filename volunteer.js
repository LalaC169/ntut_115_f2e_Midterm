// ===== 預約區展開／收合 =====
const bookingToggle = document.querySelector("#booking-toggle");
const bookingPanel = document.querySelector("#booking-panel");
bookingToggle.addEventListener("click", () => {
  const expanded = bookingToggle.getAttribute("aria-expanded") === "true";
  bookingToggle.setAttribute("aria-expanded", String(!expanded));
  bookingPanel.hidden = expanded;
  bookingToggle.querySelector("span").textContent = expanded ? "＋" : "−";
});

// ===== 活動照片輪播：滑動、按鈕與鍵盤皆可操作 =====
const track = document.querySelector("#memory-track");
const previous = document.querySelector("#memory-prev");
const next = document.querySelector("#memory-next");
const carouselReducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

function movePhoto(direction) {
  const distance =
    track.querySelector(".memory-card").getBoundingClientRect().width + 22;
  track.scrollBy({
    left: direction * distance,
    behavior: carouselReducedMotion.matches ? "instant" : "smooth",
  });
}

function updateArrows() {
  previous.disabled = track.scrollLeft < 2;
  next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
}
previous.addEventListener("click", () => movePhoto(-1));
next.addEventListener("click", () => movePhoto(1));
track.addEventListener("scroll", updateArrows, {
  passive: true,
});
window.addEventListener("resize", updateArrows);
track.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    movePhoto(event.key === "ArrowLeft" ? -1 : 1);
  }
});
updateArrows();

// ===== 尚未設定的連結 =====
const notice = document.querySelector("#notice");
document.querySelectorAll("[data-page]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#notice-text").textContent =
      `${button.dataset.page}尚未設定，將於後續製作時接上。`;
    notice.showModal();
  });
});
document
  .querySelector("#close-notice")
  .addEventListener("click", () => notice.close());
