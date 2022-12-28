import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const btnStart = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
let selectedDate = null;
let timerId = null;
let timer = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      btnStart.disabled = true;
      Notify.failure('Будь ласка, оберіть дату в майбутньому');
    } else {
      selectedDate = selectedDates[0];
      btnStart.disabled = false;
    }
  },
};
btnStart.disabled = true;

flatpickr('#datetime-picker', options);

btnStart.addEventListener('click', onBtnStart);

function onBtnStart() {
  btnStart.disabled = true;
  timerId = setInterval(() => {
    timer = selectedDate - new Date();
    if (timer < 1000) {
      clearInterval(timerId);
    }
    const { days, hours, minutes, seconds } = convertMs(timer);
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
