const btn = document.querySelector('button');
const money = document.querySelector('h2');
const presses = document.querySelector('h3');
let value = 0;
let times = 0;

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', { scope: '/Sorry' });
  }

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    value = localStorage.getItem('value') || 0;
    times = localStorage.getItem('times') || 0;
    console.log(value);
    value = JSON.parse(value);
    times = JSON.parse(times);
    console.log(times, value)
    money.innerText = `£${value}`;
    presses.innerText = `${times} sorrys`;
});


btn.onclick = () => {
    value += 0.10;
    times++;
    round = value.toFixed(2);
    localStorage.setItem('value',round);
    localStorage.setItem('times', times);
    money.innerText = `£${round}`;
    presses.innerText = `${times} sorrys`;

};

