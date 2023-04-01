const gameFields = document.querySelector('.game__field');

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

const startBtn = document.querySelector('.game__start-btn');
const stopBtn = document.querySelector('.game__stop-btn');
startBtn.addEventListener('click', () => {
  gameFields.classList.add('show');
  coordAssign();
  setTimer(10, 0);
  startBtn.classList.remove('show');
  stopBtn.classList.add('show');
});

gameFields.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList[0] !== 'game__field') {
    target.remove();
  }
});

function setTimer(from, to) {
  let current = from;
  const timer = document.querySelector('.game__timer');
  let timerId = setInterval(() => {
    timer.innerText = `0:0${--current}`;
    if (current === to) {
      clearInterval(timerId);
    }
  }, 1000)
}