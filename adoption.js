// ===== 圖文隨捲動淡入、淡出；屋子固定交由 CSS sticky 處理 =====
const panels = [...document.querySelectorAll(".adoption-panel")];
const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
let updatePending = false;

function updatePanels() {
  updatePending = false;
  document.body.classList.toggle("motion-ready", !motionPreference.matches);
  const viewportHeight = window.innerHeight;
  panels.forEach((panel) => {
    const rect = panel.getBoundingClientRect();
    const center = (rect.top + rect.height / 2) / viewportHeight;
    // 中段保持清晰，接近畫面上下邊緣才逐漸隱去。
    const opacity = Math.max(
      0,
      Math.min(1, (1.22 - center) / 0.42, (center + 0.2) / 0.42),
    );
    const offset = Math.max(-60, Math.min(60, (center - 0.5) * 90));
    panel.style.setProperty("--panel-opacity", opacity.toFixed(3));
    panel.style.setProperty("--panel-offset", `${offset.toFixed(1)}px`);
  });
}

function requestUpdate() {
  if (!updatePending) {
    updatePending = true;
    requestAnimationFrame(updatePanels);
  }
}
window.addEventListener("scroll", requestUpdate, {
  passive: true,
});
window.addEventListener("resize", requestUpdate);
motionPreference.addEventListener("change", requestUpdate);
updatePanels();

// ===== 尚未設定的社群連結 =====
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

// ===== 領養聯絡表單 =====
const adoptionFormDialog = document.querySelector("#adoption-form-dialog");

const adoptionContactForm = document.querySelector("#adoption-contact-form");

const adoptionFormResult = document.querySelector("#adoption-form-result");

// 開啟表單
document.querySelector("#open-adoption-form").addEventListener("click", () => {
  adoptionFormResult.textContent = "";
  adoptionFormDialog.showModal();
});

// 關閉表單，也支援鍵盤 Esc
document.querySelector("#close-adoption-form").addEventListener("click", () => {
  adoptionFormDialog.close();
});

// 示範確認：不傳送、不儲存資料
adoptionContactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  adoptionFormResult.textContent =
    "欄位已填寫完整。目前為示範表單，資料尚未送出。";
});
