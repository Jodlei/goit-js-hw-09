import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

let chosenTime = null;
let timerIsValid = false;
let timerDecrease = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      timerIsValid = true;
      chosenTime = selectedDates[0];
    } else {
      Notiflix.Notify.warning('Please choose a date in the future');
      timerIsValid = false;
    }
  },
};
flatpickr(refs.input, options);

refs.startBtn.addEventListener('click', handleStartClick);

function handleStartClick() {
  Notiflix.Notify.warning('Timer Started');
  timerDecrease = setInterval(() => {
    if (!timerIsValid) {
      return;
    }
    const currentTime = Date.now();
    const deltaTime = chosenTime - currentTime;

    if (chosenTime < currentTime) {
      clearInterval(timerDecrease);
      return;
    }
    updateTimer(convertMs(deltaTime));
  }, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function addLeadingZero(val) {
  return String(val).padStart(2, '0');
}
