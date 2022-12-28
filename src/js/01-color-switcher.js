const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let intervalId = null;

btnStart.addEventListener('click', onBtnStart);
btnStop.addEventListener('click', onBtnStop);

function onBtnStart() {
  btnStart.disabled = true;
  btnStop.disabled = false;

  body.style.backgroundColor = getRandomHexColor();

  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onBtnStop() {
  btnStart.disabled = false;
  btnStop.disabled = true;
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
