


/*
 * Check ascii code for spacebar and call goToLocation in global to change URL
 */
function checkKeyPress(e) {
  if (e.keyCode == 32) {
    goToLocation('/feed');
  }
}


function checkKeyPress(event) {

    if (event.key === " " || event.key === "Spacebar" || event.code === "Space") {
        
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
