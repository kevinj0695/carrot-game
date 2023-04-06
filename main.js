`use strict`;

const gameFields = document.querySelector('.game__field');
const carrots = document.querySelectorAll('.carrot');
const bugs = document.querySelectorAll('.bug');

const modal = document.querySelector('.game__modals');
const modalWin = document.querySelector('.modal--win');
const modalLose = document.querySelector('.modal--lose');
const modalRetry = document.querySelector('.modal--retry');

const bgAudio = document.querySelector('.bg-audio');
const carrotAudio = document.querySelector('.carrot-audio');
const bugAudio = document.querySelector('.bug-audio');
const winAudio = document.querySelector('.win-audio');
const alertAudio = document.querySelector('.alert-audio');


// deal with coordinates
function coordAssign() {
  carrots.forEach(carrot => {
    carrot.style.top = `${getCoordY()}px`;
    carrot.style.left = `${getCoordX()}px`;
  });
  bugs.forEach(bug => {
    bug.style.top = `${getCoordY()}px`;
    bug.style.left = `${getCoordX()}px`;
  })
}
function getCoordX() {
  const x = gameFields.getBoundingClientRect().x;
  const right = gameFields.getBoundingClientRect().right;
  return Math.random() * (right - x);
}
function getCoordY() {
  const y = gameFields.getBoundingClientRect().y;
  const bottom = gameFields.getBoundingClientRect().bottom;
  return Math.random() * (bottom - y);
}

// deal with Btns
const startBtn = document.querySelector('.game__start-btn');
const stopBtn = document.querySelector('.game__stop-btn');
const retryBtn = document.querySelector('.game__retry-btn');
startBtn.addEventListener('click', () => {
  gameFields.classList.add('show');
  coordAssign();
  setTimer(GAME_DURATION_SEC);
  startBtn.classList.remove('show');
  stopBtn.classList.add('show');
  startSound(bgAudio);
});
const stopBtnListener = () => {
  stopTimer();
  showModal('retry');
}
stopBtn.addEventListener('click', stopBtnListener);
retryBtn.addEventListener('click', () => {
  document.location.reload();
});

// Game Fields Listener
const gameFieldsListener = (event) => {
  const target = event.target;
  if (target.classList[0] === 'carrot') {
    carrotCounter();
    target.remove();
  } else if (target.classList[0] === 'bug') {
    stopSound(bgAudio);
    startSound(bugAudio);
    stopTimer();
    showModal('lose');
    target.remove();
  }
}
gameFields.addEventListener('click', gameFieldsListener);


// Timer
let timerId;
function setTimer(from) {
  let current = from;
  const timer = document.querySelector('.game__timer');
  timerId = setInterval(() => {
    timer.innerText = `0:0${--current}`;
    if (current === 0) {
      clearInterval(timerId);
      showModal('lose');
    }
  }, 1000);
}
function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

// counter
function carrotCounter() {
  const gameCounter = document.querySelector('.game__counter');
  gameCounter.innerText = gameCounter.innerText - 1;
  startSound(carrotAudio);
  
  if (gameCounter.innerText == 0) {
    stopTimer();
    showModal('win');
  }
}

function showModal(property) {
  switch (property) {
    case 'win' :
      modal.classList.add('show');
      modalWin.classList.add('show');
      stopSound(bgAudio);
      startSound(winAudio);
      break;
    case 'lose' :
      modal.classList.add('show');
      modalLose.classList.add('show');
      break;
    case 'retry' :
      modal.classList.add('show');
      modalRetry.classList.add('show');
      stopSound(bgAudio);
      startSound(alertAudio);
      break;
  }

  stopBtn.removeEventListener('click', stopBtnListener);
  gameFields.removeEventListener('click', gameFieldsListener);
}

function startSound(sound) {
  sound.currentTime = 0;
  sound.volume = 0.5;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}