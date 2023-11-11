import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    day: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
    startButton: document.querySelector('[data-start]'),
};

refs.startButton.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0].getTime();

        if (selectedDate <= Date.now()) {
            refs.startButton.disabled = true;
            Notiflix.Notify.warning('Please choose a date in the future');
            return
        }
        refs.startButton.disabled = false;
    },
};

let countdownInterval = null;

const flatpickrInstance = flatpickr('input#datetime-picker', options);
refs.startButton.addEventListener('click', startCountdown);

function startCountdown() {
    const selectedDate = flatpickrInstance.selectedDates[0];
    if (selectedDate > Date.now()) {
        refs.startButton.disabled = true;
        countdownInterval = setInterval(() => {
            const timeRemaining = selectedDate - Date.now();
            if (timeRemaining <= 0) {
                clearInterval(countdownInterval);
                refs.startButton.disabled = false;
                updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                const { days, hours, minutes, seconds } = convertMs(timeRemaining);
                updateTimer({ days, hours, minutes, seconds });
            }
        }, 1000);
    }    
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
    refs.day.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
}