window.onload = function () {
  const savedToList = JSON.parse(localStorage.getItem("todoList"));

  if (savedToList) {
    for (let todo of savedToList) {
      createToDO(todo);
    }
  }
  const inputBox = document.querySelector("#inputBox");
  inputBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") createToDO();
  });

  const startBtn = document.querySelector("#addBtn");
  startBtn.addEventListener("click", () => createToDO());

  // 전체 삭제 버튼 클릭 시 모든 항목 제거 및 저장소 초기화
  const allDeleteBtn = document.querySelector("#allDeleteBtn");
  allDeleteBtn.addEventListener("click", () => {
    const ulNode = document.querySelector("ul");

    // 할 일이 하나도 없으면 안내 메시지
    if (ulNode.innerHTML == "") {
      alert("해야 할 일이 없습니다. 할 일 좀 작성하시지요? 🤬🤬🤬");
      return;
    }

    // 진짜 삭제할지 묻는 거 추가
    if (confirm("정말 다 삭제하시겠습니까?")) {
      // 로컬스토리지에서 todoList 제거
      localStorage.removeItem("todoList");
      // 화면의 모든 li 요소 제거
      ulNode.innerHTML = "";
    }
  });
};

function createToDO(todo) {
  //  trim 추가.
  if (!todo && inputBox.value.trim() == "") return;

  // 새로운 li노드 생성
  const liNode = document.createElement("li");

  const checkBtn = document.createElement("button");
  checkBtn.classList.add("checkBtn");

  const todoText = document.createElement("span");
  if (todo) {
    todoText.innerText = todo.contents;
    if (todo.check) {
      todoText.classList.add("check");
      checkBtn.innerText = "V";
    }
  } else {
    todoText.innerText = inputBox.value;
  }

  checkBtn.addEventListener("click", () => {
    todoText.classList.toggle("check");

    if (checkBtn.innerText == "") checkBtn.innerText = "V";
    else checkBtn.innerText = "";

    // 상태 변경 후 로컬스토리지에 저장
    saveToDoList();
  });

  todoText.addEventListener("click", () => {
    todoText.classList.toggle("check");

    if (checkBtn.innerText == "") checkBtn.innerText = "V";
    else checkBtn.innerText = "";

    saveToDoList();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "X";
  deleteBtn.classList.add("deleteBtn");

  deleteBtn.addEventListener("click", () => {
    liNode.remove();
    saveToDoList();
  });

  // 수정하기 버튼 생성
  const editBtn = document.createElement("button");
  editBtn.innerText = "수정하기";
  editBtn.classList.add("editBtn");

  editBtn.addEventListener("click", () => {
    const newText = prompt("수정할 내용을 입력하세요:", todoText.innerText);

    // 비어있거나 공백만 넣으면 실행 안 됨
    if (newText.trim() !== "") {
      todoText.innerText = newText;
      saveToDoList();
    }
  });

  // 왼쪽, 오른쪽 그룹으로 나눠서 시각적으로 조금 보기 편하게
  const leftGroup = document.createElement("div");
  leftGroup.classList.add("left-group");
  leftGroup.appendChild(checkBtn);
  leftGroup.appendChild(todoText);

  const rightGroup = document.createElement("div");
  rightGroup.classList.add("right-group");
  rightGroup.appendChild(editBtn);
  rightGroup.appendChild(deleteBtn);

  liNode.appendChild(leftGroup);
  liNode.appendChild(rightGroup);

  // ul에 생성된 new li를 append
  const ulNode = document.querySelector("ul");
  ulNode.appendChild(liNode);

  document.querySelector("#todoList").style.display = "block";

  saveToDoList();
  //새로운 할일 입력되면 inputBox 비워주기
  inputBox.value = "";
}

function saveToDoList() {
  const todoList = document.querySelectorAll("li");
  // if (todoList.length == 0) return;

  const saveItems = [];
  for (let node of todoList) {
    const todoObj = {
      contents: node.querySelector("span").innerText,
      check: node.querySelector("span").classList.contains("check"),
    };
    saveItems.push(todoObj);
  }

  const list = JSON.stringify(saveItems);
  localStorage.setItem("todoList", list);
}
