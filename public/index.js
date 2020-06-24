const toggle = document.getElementById("toggle");
const pencilMode = document.getElementById("pencil-mode");
const keyboardMode = document.getElementById("keyboard-mode");
const doneBtn = document.getElementById("done-btn");

const canvas = document.querySelector("#scribble-area");
const scribble = new Atrament(canvas, {
  width: 800,
  height: 300,
  color: "#4D38B9",
});

toggle.addEventListener("change", (e) => {
  if (e.target.checked) {
    pencilMode.classList.add("active");
    keyboardMode.classList.remove("active");

    canvas.classList.add("scribble-active");
    doneBtn.classList.add("scribble-active");
  } else {
    keyboardMode.classList.add("active");
    pencilMode.classList.remove("active");

    canvas.classList.remove("scribble-active");
    doneBtn.classList.remove("scribble-active");
  }
});

doneBtn.addEventListener("click", async () => {
  const imageData = scribble.toImage();

  await fetch("/api/search", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      image: imageData.split(",")[1],
    }),
  });
});
