let startStopBtn = document.getElementById("start-stop-btn");
let lapResetBtn = document.getElementById("lap-reset-btn");
let timeDisplay = document.getElementById("time-display");
let lapList = document.getElementById("lap-list");

let running = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapTimes = [];
let timer;

function formatTime() {
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startStopwatch() {
  timer = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
    timeDisplay.textContent = formatTime();
  }, 1000);
}

function stopStopwatch() {
  clearInterval(timer);
}

function resetStopwatch() {
  clearInterval(timer);
  seconds = 0;
  minutes = 0;
  hours = 0;
  timeDisplay.textContent = formatTime();
  lapList.innerHTML = '';
  lapTimes = [];
}

startStopBtn.addEventListener("click", function() {
  if (running) {
    stopStopwatch();
    startStopBtn.textContent = "Start";
    startStopBtn.classList.remove("stop-btn");
    startStopBtn.classList.add("start-btn");
    lapResetBtn.textContent = "Lap";
    lapResetBtn.classList.remove("reset-btn");
    lapResetBtn.classList.add("lap-btn");
  } else {
    startStopwatch();
    startStopBtn.textContent = "Stop";
    startStopBtn.classList.remove("start-btn");
    startStopBtn.classList.add("stop-btn");
    lapResetBtn.textContent = "Reset";
    lapResetBtn.classList.remove("lap-btn");
    lapResetBtn.classList.add("reset-btn");
  }
  running = !running;
});

lapResetBtn.addEventListener("click", function() {
  if (running) {
    let lapTime = formatTime();
    lapTimes.unshift(lapTime);
    let lapItem = document.createElement("li");
    lapItem.textContent = lapTime;
    lapItem.classList.add("lap-item");
    lapList.prepend(lapItem);
  } else {
    resetStopwatch();
    startStopBtn.textContent = "Start";
    startStopBtn.classList.remove("stop-btn");
    startStopBtn.classList.add("start-btn");
    lapResetBtn.textContent = "Lap";
    lapResetBtn.classList.remove("reset-btn");
    lapResetBtn.classList.add("lap-btn");
  }
});
