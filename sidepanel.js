const panel = document.getElementById("sidepanel");
const panelToggle = document.getElementById("panelToggle");

panelToggle.addEventListener("click", () => {
    toggleMenu(panel, panelToggle);
});

function toggleMenu(menu, button) {
    menu.classList.toggle("openPanel");
    button.classList.toggle("openPanel2");
    button.classList.toggle("fa-times");
}