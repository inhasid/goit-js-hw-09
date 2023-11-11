const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

let colorInterval = 0;

refs.btnStart.addEventListener('click', startColorChange);
refs.btnStop.addEventListener('click', stopColorChange);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function startColorChange() {
    refs.btnStart.disabled = true;
    refs.btnStop.disabled = false;
    colorInterval = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopColorChange() {
    refs.btnStart.disabled = false;
    refs.btnStop.disabled = true;
    clearInterval(colorInterval);
}