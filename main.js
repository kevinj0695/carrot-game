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

coordAssign();