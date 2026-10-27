// 社群連結尚未設定時的提示視窗。
const notice = document.querySelector("#notice");
document.querySelectorAll("[data-page]").forEach((button) =>
  button.addEventListener("click", () => {
    document.querySelector("#notice-text").textContent =
      `${button.dataset.page}尚未設定，將於後續製作時接上。`;
    notice.showModal();
  }),
);
document
  .querySelector("#close-notice")
  .addEventListener("click", () => notice.close());
const count = document.querySelector("#count");
count.textContent = count.dataset.total;

// 進入可視範圍後播放一次數字動畫。
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      const start = performance.now(),
        total = Number(count.dataset.total);

      function tick(now) {
        const progress = Math.min((now - start) / 1400, 1);
        count.textContent = Math.round(total * (1 - Math.pow(1 - progress, 3)));
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    },
    {
      threshold: 0.5,
    },
  );
  observer.observe(count);
}
