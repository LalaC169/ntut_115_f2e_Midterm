// 所有入口共用同一個動畫狀態，滑鼠移開後恢復平常速度。
const area = document.querySelector(".tail-area");
const tail = document.querySelector(".tail");
const navItems = [...document.querySelectorAll("nav a, nav button")];
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
let phase = 0,
  angle = 0,
  previousTime;
let navHovered = null;
let tailHovered = false;
navItems.forEach((item) => {
  item.addEventListener("pointerenter", () => {
    navHovered = item;
  });
  item.addEventListener("pointerleave", () => {
    if (navHovered === item) navHovered = null;
  });
});
area.addEventListener("pointerenter", () => {
  tailHovered = true;
});
area.addEventListener("pointerleave", () => {
  tailHovered = false;
});

function animateTail(now) {
  const delta =
    previousTime === undefined
      ? 0
      : Math.min((now - previousTime) / 1000, 0.05);
  previousTime = now;
  const focusedNav = navItems.includes(document.activeElement)
    ? document.activeElement
    : null;
  const activeNav = navHovered || focusedNav;
  const adoptionHovered =
    activeNav?.dataset.page === "領養資訊" ||
    activeNav?.dataset.tail === "adoption";
  const excited = activeNav || tailHovered || document.activeElement === area;
  if (!reducedMotion.matches) {
    // 領養資訊每秒搖動五次，其他互動三次；只左右擺動。
    const frequency = adoptionHovered ? 5 : excited ? 3 : 1 / 1.1;
    phase += delta * Math.PI * 2 * frequency;
    const target = Math.sin(phase) * (excited ? 14 : 7);
    const difference = ((((target - angle) % 360) + 540) % 360) - 180;
    angle += difference * (1 - Math.exp(-delta * 45));
    angle = ((angle % 360) + 360) % 360;
    tail.style.transform = `rotate(${angle}deg)`;
  } else {
    tail.style.transform = "none";
  }
  requestAnimationFrame(animateTail);
}
requestAnimationFrame(animateTail);
