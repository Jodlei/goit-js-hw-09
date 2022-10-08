const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};
let changeColor = null;
let flag = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.btnStart.addEventListener('click', () => {
  if (flag) {
    return;
  }
  flag = true;
  changeColor = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

refs.btnStop.addEventListener('click', () => {
  flag = false;
  clearInterval(changeColor);
});
