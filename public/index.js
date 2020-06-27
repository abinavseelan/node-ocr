const pencilMode = document.getElementById("pencil-mode");
const keyboardMode = document.getElementById("keyboard-mode");

const toggle = document.getElementById("toggle");
const doneBtn = document.getElementById("done-btn");
const searchInput = document.getElementById("search");

const scribbleArea = document.getElementById("scribble-area");

const canvas = new Atrament(scribbleArea.querySelector('canvas'), {
  width: 800,
  height: 300,
  color: "#4D38B9",
});

const markAsActive = (mode) => {
  if (mode === 'pencil') {
    pencilMode.classList.add("active");
    keyboardMode.classList.remove("active");

    scribbleArea.classList.add("scribble-active");
  } else {
    keyboardMode.classList.add("active");
    pencilMode.classList.remove("active");

    scribbleArea.classList.remove("scribble-active");
  }
}

toggle.addEventListener("change", (e) => {
  if (e.target.checked) {
    markAsActive('pencil')
  } else {
    markAsActive('keyboard')
  }
});

doneBtn.addEventListener("click", async () => {
  const imageData = canvas.toImage();

  const response = await fetch("/api/search", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      image: imageData.split(",")[1],
    }),
  });

  const data = await response.json();

  searchInput.value = data.responses[0].fullTextAnnotation.text;
  
  canvas.clear();

  toggle.checked = false;
  markAsActive('keyboard');
});