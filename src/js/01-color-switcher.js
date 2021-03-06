const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    body: document.querySelector('body')
};

let timerId = null;

refs.startBtn.addEventListener("click", () => {
    
    timerId = setInterval(() => {
        refs.startBtn.setAttribute('disabled', true);
        refs.stopBtn.removeAttribute('disabled');
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);

    function getRandomHexColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
});

refs.stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    refs.startBtn.removeAttribute('disabled');
    refs.stopBtn.setAttribute('disabled', true);
});