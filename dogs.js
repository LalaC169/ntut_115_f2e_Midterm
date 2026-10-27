const dogs = [
  [
    "豆花",
    2,
    "女生",
    "中型",
    ["親人", "喜歡散步"],
    "可以，初次見面需慢慢熟悉",
    "等待領養",
    "douhua",
  ],
  [
    "阿黑",
    3,
    "男生",
    "中型",
    ["親人", "活潑"],
    "可以，喜歡與其他狗一起玩",
    "等待領養",
    "ahei",
  ],
  [
    "奶茶",
    1,
    "女生",
    "小型",
    ["慢熟", "溫柔"],
    "需要時間適應，適合溫和的狗狗",
    "等待領養",
    "milk-tea",
  ],
  [
    "饅頭",
    5,
    "男生",
    "大型",
    ["穩定", "喜歡散步"],
    "可以，與其他狗相處較平靜",
    "等待領養",
    "mantou",
  ],
  [
    "芝麻",
    2,
    "女生",
    "中型",
    ["親人", "慢熟"],
    "需先安排見面，觀察互動情況",
    "等待領養",
    "sesame",
  ],
  [
    "布丁",
    4,
    "男生",
    "小型",
    ["活潑", "喜歡散步"],
    "可以，但互動時容易太興奮",
    "媒合中",
    "pudding",
  ],
];
const grid = document.querySelector("#dog-grid");
const details = document.querySelector("#dog-details");
const dialog = document.querySelector("#dog-dialog");

function card(d, index) {
  const [name, age, gender, size, tags, compatibility, status, photo] = d;
  return `<article class="dog-card"><span class="paw" aria-hidden="true">🐾</span><img src="assets/${photo}.png" alt="${name}的照片" loading="lazy"><div class="identity"><h3>${name}</h3><span>${age}歲 ｜ ${gender} ｜ ${size}</span></div><div class="tags">${tags.map((t) => `<span>${t}</span>`).join("")}</div><dl><dt>狗狗相處</dt><dd>${compatibility}</dd><dt>狀態</dt><dd><span class="status ${status === "媒合中" ? "matching" : ""}">${status}</span></dd></dl><button class="meet" data-dog="${index}">認識牠 →</button></article>`;
}

function render(filter = "全部") {
  grid.innerHTML = dogs
    .map((d, i) =>
      filter === "全部" || d[4].includes(filter) ? card(d, i) : "",
    )
    .join("");
  document.querySelector("#results").textContent =
    `顯示 ${grid.children.length} 隻狗狗`;
}
document.querySelectorAll("[data-filter]").forEach((button) =>
  button.addEventListener("click", () => {
    document
      .querySelectorAll("[data-filter]")
      .forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
    render(button.dataset.filter);
  }),
);
grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-dog]");
  if (!button) return;
  const [name, age, gender, size, tags, compatibility, status, photo] =
    dogs[Number(button.dataset.dog)];
  details.innerHTML = `<img src="assets/${photo}.png" alt="${name}"><h2 id="dialog-title">${name}</h2><p>${age}歲 ｜ ${gender} ｜ ${size}</p><p>${tags.join("・")}</p><h3>與其他狗狗相處</h3><p>${compatibility}</p><p class="status ${status === "媒合中" ? "matching" : ""}">${status}</p>`;
  details.insertAdjacentHTML(
    "beforeend",
    `
      <div class="dog-adopt-actions">
        <a class="dog-adopt-button" href="adoption.html">
          我要領養牠 →
        </a>
      </div>
    `,
  );
  dialog.showModal();
});
document
  .querySelector(".dialog-close")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    )
      dialog.close();
  }
});
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
render();
