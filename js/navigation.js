const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("nav ul");

function openMenu() {
  navMenu.classList.add("open");
  hamburger.setAttribute("aria-expanded", "true");
  document.addEventListener("click", outsideClickListener);
  document.addEventListener("keydown", escKeyListener);
}

function closeMenu() {
  navMenu.classList.remove("open");
  hamburger.setAttribute("aria-expanded", "false");
  hamburger.focus();
  document.removeEventListener("click", outsideClickListener);
  document.removeEventListener("keydown", escKeyListener);
}

hamburger.addEventListener("click", () => {
  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  if (expanded) {
    closeMenu();
  } else {
    openMenu();
  }
});

hamburger.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    hamburger.click();
  }
});

navMenu.addEventListener("keydown", (e) => {
  if (!navMenu.classList.contains("open")) return;
  if (e.key === "Escape") {
    closeMenu();
  }

  const focusable = navMenu.querySelectorAll("a");
  if (e.key === "Tab") {
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

function outsideClickListener(event) {
  if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
    closeMenu();
  }
}

function escKeyListener(event) {
  if (event.key === "Escape") {
    closeMenu();
  }
}
