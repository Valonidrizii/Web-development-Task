const board = document.querySelector('#board');
let row = 0;
let column = 0;
const target = { row: 4, column: 4 };
for (let r = 0; r < 5; r += 1) {
  const line = document.createElement('div');
  line.setAttribute('role', 'row');
  line.setAttribute('aria-rowindex', r + 1);
  for (let c = 0; c < 5; c += 1) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = `cell-${r}-${c}`;
    cell.setAttribute('role', 'gridcell');
    cell.setAttribute('aria-colindex', c + 1);
    const isTarget = r === target.row && c === target.column;
    cell.setAttribute('aria-label', `Rreshti ${r + 1}, kolona ${c + 1}${isTarget ? ', objektivi' : ''}`);
    if (isTarget) cell.classList.add('target');
    line.append(cell);
  }
  board.append(line);
}
function render() {
  board.querySelectorAll('.cell').forEach(function (cell) {
    const active = cell.id === `cell-${row}-${column}`;
    cell.setAttribute('aria-selected', String(active));
    cell.textContent = cell.classList.contains('target') ? '★' : active ? '●' : '';
  });
  board.setAttribute('aria-activedescendant', `cell-${row}-${column}`);
  document.querySelector('#position').textContent = `Pozicioni: rreshti ${row + 1}, kolona ${column + 1}.`;
  document.querySelector('#target-message').textContent = row === target.row && column === target.column ? 'E arrite objektivin! ★' : '';
}
board.addEventListener('keydown', function (event) {
  const moves = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
  const move = moves[event.key];
  if (!move || document.activeElement !== board) return;
  event.preventDefault();
  row = Math.min(4, Math.max(0, row + move[0]));
  column = Math.min(4, Math.max(0, column + move[1]));
  render();
});
board.addEventListener('click', function () { board.focus(); });
document.querySelector('#reset').addEventListener('click', function () { row = 0; column = 0; render(); board.focus(); });
render();
