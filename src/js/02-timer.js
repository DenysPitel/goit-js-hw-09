import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
    calendar: document.querySelector("#datetime-picker"),
    onStartBtn: document.querySelector("[data-start]"),
    timer: document.querySelector(".timer"),
    valueDays: document.querySelector("[data-days]"),
    valueHours: document.querySelector("[data-hours]"),
    valueMinutes: document.querySelector("[data-minutes]"),
    valueSeconds: document.querySelector("[data-seconds]"),
}


// console.log(`${refs.valueDays}:${refs.valueHours}:${refs.valueMinutes}:${refs.valueSeconds}`);

let date = null;

const options = {
    enableTime: true,
    time_24hr: true,
    dateFormat: 'Y-m-d H:i',
    altFormat: 'F j, Y (h:S K)',
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        date = selectedDates[0].getTime();
        if (date <= options.defaultDate.getTime()){
            window.alert("Please choose a date in the future");
            return;
        }
        refs.onStartBtn.disabled = false;
    },
};

const flatPickr = flatpickr(refs.calendar, options);

const timer = {
    intervalId: null,
    isActive: false,
    start() {
        if(this.isActive){
            return
        }

        const selectedTime = flatPickr.selectedDates[0].getTime();
        this.isActive = true;

        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = selectedTime - currentTime;
            const { days, hours, minutes, seconds } = convertMs(deltaTime);
            
            console.log(`${days}:${hours}:${minutes}:${seconds}`);
        }, 1000);
    },
    stop() {
        setInterval(this.intervalId);
        this.isActive = false;
    }
};


// function updateClockface({ days, hours, minutes, seconds }) {
//     refs.valueDays.textContent  = `${days}:${hours}:${minutes}:${seconds}`;
// }


function addLeadingZero(value) {
    return String(value).padStart(2, '0');
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

refs.onStartBtn.addEventListener('click', () => {
    timer.start()
});

