const timer = document.querySelector('.timer');
const startPause = document.querySelector('.startPause');
const reset = document.querySelector('.reset');
let lapsList = document.querySelector('.laps-list')
const lapButton = document.querySelector('.lap');
const lapTime = document.querySelector('.lap-time')
const lapNumber = document.querySelector('.lap-number')

let isRunning = false
let stopwatch
let lapTimer
let laps = [];

const leadZero = (num) => {
  return num < 10 ? '0' + num : num;
}

let milliseconds = 0;
let seconds = 0;
let minutes = 0;

//LAPS
let lapMilli = 0;
let lapSec = 0;
let lapMin = 0;
let currentLap = 1;

let currenTime = timer.innerHTML = `${leadZero(minutes)}:${leadZero(seconds)}:${leadZero(milliseconds)}`;

startPause.addEventListener("click", () => toggleStart())

let toggleStart = () => {
  if (isRunning) {
    isRunning = false
    clearInterval(stopwatch)
    startPause.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>'
    clearInterval(lapTimer);
  } else {
    startPause.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z"/></svg>'
    isRunning = true;
    stopwatch = setInterval(() => {
      timer.innerHTML = `${leadZero(minutes)}:${leadZero(seconds)}:${leadZero(milliseconds)}`;
      if (milliseconds > 98) {
        seconds++
        milliseconds = 0;
      } else if (seconds > 60) {
        minutes++
        seconds = 0;
      }
      milliseconds++
    }, 10)
    lapTimerStart()

  }
}

const lapTimerStart = () => {
  lapTimer = setInterval(() => {
    lapTime.innerHTML = `${leadZero(lapMin)}:${leadZero(lapSec)}:${leadZero(lapMilli)}`;
    if (lapMilli > 98) {
      lapSec++
      lapMilli = 0;
    } else if (lapSec > 60) {
      lapMin++
      lapSec = 0;
    }
    lapMilli++
  }, 10)
}


reset.addEventListener("click", () => resetTimer())

const resetTimer = () => {
  clearInterval(stopwatch)
  clearInterval(lapTimer)
  startPause.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>'
  isRunning = false
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  lapMilli = 0;
  lapSec = 0;
  lapMin = 0;
  currentLap = 1;
  lapNumber.innerHTML = 'Lap 1'
  timer.innerHTML = "00:00:00"
  lapTime.innerHTML = "00:00:00"
  laps = []
  lapsList.innerHTML = ""
}


lapButton.addEventListener('click', () => addLap())


const addLap = () => {
  if (isRunning) {
    lapNumber.innerHTML = `Lap ${currentLap + 1}`
    lapsList.innerHTML = ""
    clearInterval(lapTimer)
    laps.push({ time: lapTime.innerHTML, index: currentLap })
    lapTime.innerHTML = "00:00:00"
    lapMilli = 0;
    lapSec = 0;
    lapMin = 0;
    currentLap++
    lapTimerStart();

    laps.forEach((item) => {

      let div = document.createElement('div')
      div.classList.add('lap-container')
      div.innerHTML = `
      <div class="lap-label">
        <svg xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512">
          <path
            d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32L0 64 0 368 0 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128 64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30l0-247.7c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48l0-16z" />
        </svg>
        <p class="lap-number">Lap ${item.index}</p>
      </div>
      <p class="lap-time">${item.time}</p>
  `
      lapsList.appendChild(div)
    })


  }

}











