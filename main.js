const gameFields = document.querySelector('.game__field');

// deal with coordinates
function coordAssign() {
  const carrots = document.querySelectorAll('.carrot');
  const bugs = document.querySelectorAll('.bug');
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
  setTimer(10, 0);
  startBtn.classList.remove('show');
  stopBtn.classList.add('show');
  startBgAudio();
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
    pullBugAudio();
    stopTimer();
    showModal('lose');
    target.remove();
  }
}
gameFields.addEventListener('click', gameFieldsListener);


// Timer
let timerId;
function setTimer(from, to) {
  let current = from;
  const timer = document.querySelector('.game__timer');
  timerId = setInterval(() => {
    timer.innerText = `0:0${--current}`;
    if (current === to) {
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
  pullCarrotAudio();

  if (gameCounter.innerText == 0) {
    stopTimer();
    showModal('win');
  }
}

// modals
const modal = document.querySelector('.game__modals');
const modalWin = document.querySelector('.modal--win');
const modalLose = document.querySelector('.modal--lose');
const modalRetry = document.querySelector('.modal--retry');

function showModal(property) {
  switch (property) {
    case 'win' :
      modal.classList.add('show');
      modalWin.classList.add('show');
      winGameAudio();
      break;
    case 'lose' :
      modal.classList.add('show');
      modalLose.classList.add('show');
      alertGameAudio();
      break;
    case 'retry' :
      modal.classList.add('show');
      modalRetry.classList.add('show');
      alertGameAudio();
      break;
    default:
      console.error('property에 case가 아닌 값이 들어옴');
  }

  stopBtn.removeEventListener('click', stopBtnListener);
  gameFields.removeEventListener('click', gameFieldsListener);
}

// audio
const bgAudio = document.querySelector('.bg-audio');
function startBgAudio() {
  bgAudio.volume = 0.5;
  bgAudio.play();
}
function pauseBgAudio() {
  bgAudio.pause();
}

const carrotAudio = document.querySelector('.carrot-audio');
function pullCarrotAudio() {
  carrotAudio.volume = 0.5;
  carrotAudio.play();
}

const bugAudio = document.querySelector('.bug-audio');
function pullBugAudio() {
  bugAudio.volume = 0.5;
  bugAudio.play();
}

const winAudio = document.querySelector('.win-audio');
function winGameAudio() {
  pauseBgAudio();
  winAudio.volume = 0.5;
  winAudio.play();
}

const alertAudio = document.querySelector('.alert-audio');
function alertGameAudio() {
  pauseBgAudio();
  alertAudio.volume = 0.5;
  alertAudio.play();
}