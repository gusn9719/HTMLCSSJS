let size;
let curLoc;
let tdNodes;

window.onload = function () {
  const startBtn = document.querySelector("#startBtn");
  startBtn.addEventListener("click", doMoveCell);

  const inputBox = document.querySelector("#inputBox");
  inputBox.addEventListener("keydown", (e) => {
    if (e.key == "Enter") doMoveCell();
  });
};

function doMoveCell() {
  makeTable();
  curLoc = 0;

  // 초기 위치 선정
  curLoc = Math.floor(Math.random() * (size * size));
  console.log(curLoc);

  tdNodes[curLoc].style.backgroundColor = "violet";

  window.onkeydown = function (e) {
    if (e.key < 37 || e.key > 40) return;

    // 이전 셀 초기화
    tdNodes[curLoc].style.backgroundColor = "inherit";

    // row, col

    let row = Math.floor(curLoc / size);
    let col = curLoc % size;

    //
    switch (e.key) {
      case "ArrowLeft":
        if (col > 0) curLoc -= 1;
        else curLoc += size - 1;
        break;
      case "ArrowRight":
        if (col < size - 1) curLoc += 1;
        else curLoc -= size - 1;
        break;
      case "ArrowUp":
        if (row > 0) curLoc -= size;
        else curLoc += size * (size - 1);
        break;
      case "ArrowDown":
        if (row < size - 1) curLoc += size;
        else curLoc -= size * (size - 1);
        break;
    }

    tdNodes[curLoc].style.backgroundColor = "violet";
  };
}

function makeTable() {
  const inputBox = document.querySelector("#inputBox");

  if (inputBox.value == "") return;

  size = Number(inputBox.value);

  const displayArea = document.querySelector(".displayArea");

  // let tableHTML = `<table>${String(`<td>${String(`<tr></tr>`).repeat(size)}</td>`).repeat(size)}</table>`;
  let tableHTML = "<table>\n" + ("\t<tr>" + "<td></td>".repeat(size) + "</tr>\n").repeat(size) + "</table>\n";
  displayArea.innerHTML = tableHTML;
  tdNodes = document.querySelectorAll("td");
}
