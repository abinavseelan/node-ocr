const toggle = document.getElementById('toggle');
const pencilMode = document.getElementById('pencil-mode');
const keyboardMode = document.getElementById('keyboard-mode');
const canvas = document.getElementById("scribble-area");


toggle.addEventListener("change", (e) => {
  if (e.target.checked) {
    pencilMode.classList.add('active');
    keyboardMode.classList.remove("active");

    canvas.classList.add('scribble-active');
  } else {
    keyboardMode.classList.add("active");
    pencilMode.classList.remove("active");

    canvas.classList.remove("scribble-active");
  }
});