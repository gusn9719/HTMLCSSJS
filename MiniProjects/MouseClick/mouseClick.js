let size;
let curLoc;
let tdNodes;
window.onload = function () {
  const startBtn = document.querySelector("#startBtn");
  startBtn.addEventListener("click", doMouseClick);

  const inputBox = document.querySelector("#inputBox");
  inputBox.addEventListener("keydown", function (e) {
    if (e.key === "Enter") doMouseClick();
  });
};

function doMouseClick() {
  //   const numInput = inputBox.value;
  const inputBox = document.querySelector("#inputBox");

  if (inputBox.value == "") return;

  size = Number(inputBox.value);

  const displayArea = document.querySelector(".displayArea");

  // let tableHTML = `<table>${String(`<td>${String(`<tr></tr>`).repeat(size)}</td>`).repeat(size)}</table>`;
  let tableHTML = "<table>\n" + ("\t<tr>" + "<td></td>".repeat(size) + "</tr>\n").repeat(size) + "</table>\n";
  displayArea.innerHTML = tableHTML;
  tdNodes = document.querySelectorAll("td");

  curLoc = 0;
  randomLocText();
}

function randomLocText() {
  tdNodes[curLoc].innerText = "";
  // tdNodes[curLoc].reMoveEventListener("click", randomLocText);
  tdNodes[curLoc].onclick = null;

  //랜덤 위치 선정
  curLoc = Math.floor(Math.random() * (size * size));

  // 해당 위치의 td셀에 텍스트를 출력, 이벤트 핸들러 add

  tdNodes[curLoc].innerText = "하이염";
  // tdNodes[curLoc].addEventListener("click", randomLocText);
  tdNodes[curLoc].onclick = randomLocText;
}
