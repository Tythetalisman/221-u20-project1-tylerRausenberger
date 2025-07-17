function checkKeyPress(event) {
  if (
    event.key === " " ||
    event.key === "Spacebar" ||
    event.code === "Space" ||
    event.keyCode === 32
  ) {
    event.preventDefault();
    goToLocation("/feed");
  }
}

document.addEventListener("keydown", checkKeyPress);

document.addEventListener("DOMContentLoaded", () => {
  const fadeText = document.getElementById("fade_text");
  if (fadeText) {
    fadeText.addEventListener("click", () => {
      goToLocation("/feed");
    });
  }
});

function goToLocation(path) {
  window.location.href = path;
}