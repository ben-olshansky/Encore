let startBtn = document.getElementById('start');
let pauseBtn = document.getElementById('pause');
let finishBtn = document.getElementById('finish');

let seconds = 0
let minutes = 0
let hours = 0

//waits x milliseconds
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let timer = false;
let running = false


startBtn.addEventListener('click', function () {
  timer = true;
  if (!running) {stopwatch();}
});
pauseBtn.addEventListener('click', function () {
  timer = false;
  running = false;
});
finishBtn.addEventListener('click', function () {
  timer = false;
  running = false

  const sessionData = {
    duration: {hours: hours, minutes: minutes, seconds: seconds},
    date: new Date()
  }
  console.log(sessionData);
});

//stopwatch function
async function stopwatch () {
  running = true;
  while (running) {
    if (timer) {
      await wait(1000);
      seconds += 1;

      if (seconds == 60) {
        minutes += Math.floor(seconds/60);
        seconds = seconds % 60; 
      }
      
      if (minutes == 60) {
        hours += Math.floor(minutes/60);
        minutes = minutes % 60;
      }
      updateDisplay()
    }
    else {
      await wait(100)
    }
  }
}

function updateDisplay () {
  //add leading 0
  if (hours < 10) {
    hrString = '0' + String(hours);
  }
  else {
    hrString = String(hours)
  }
  if (minutes < 10) {
    minString = '0' + String(minutes);
  }
  else {
    minString = String(minutes)
  }
  if (seconds < 10) {
    secString = '0' + String(seconds);
  }
  else {
    secString = String(seconds)
  }

  //write to html
  document.getElementById('hr').innerHTML = hrString
  document.getElementById('min').innerHTML = minString
  document.getElementById('sec').innerHTML = secString
}

function exitSession () {
  if (confirm("WARNING: Are you sure you want to leave? Your current session will be lost.")) {
    window.location.href = 'index.html';
  }
}