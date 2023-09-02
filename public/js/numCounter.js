const counters = document.querySelectorAll('.num');
const interval = 2000;

counters.forEach((counter) => {
    let startValue = 0;
    const endValue = parseInt(counter.getAttribute('data-val'));
    const duration = Math.floor(interval / (endValue - startValue));
    const counterInterval = setInterval(function () {
        startValue += 1;
        counter.textContent = startValue;
        if (startValue === endValue) {
            clearInterval(counterInterval);
        }
    }, duration);
});