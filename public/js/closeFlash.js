const btn = document.querySelector(".flash-close");
const flash = document.querySelector(".flash");

if (btn) {
  btn.addEventListener("click", () => {
    flash.style.display = "none";
  });
}
