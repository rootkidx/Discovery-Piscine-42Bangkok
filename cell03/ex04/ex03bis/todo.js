let todoList = getCookie("todoList") ? JSON.parse(getCookie("todoList")) : [];

displayTodoList();

$("#newBtn").on("click", function () {
  let newTodo = prompt("Enter a new to do:");
  if (newTodo) {
    todoList.unshift(newTodo);
    displayTodoList();
    setCookie("todoList", JSON.stringify(todoList), 365);
  }
});

$("#ft_list").on("click", "div", function () {
  if (confirm("Are you sure you want to delete this to do?")) {
    let index = $(this).index();
    todoList.splice(index, 1);
    displayTodoList();
    setCookie("todoList", JSON.stringify(todoList), 365);
  }
});

function displayTodoList() {
  let ftList = $("#ft_list");
  ftList.empty();
  for (let i = todoList.length - 1; i >= 0; i--) {
    let todoDiv = $("<div>").html(todoList[i]);
    ftList.append(todoDiv);
  }
}

function getCookie(name) {
  let cookieArr = document.cookie.split("; ");
  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");
    if (name === cookiePair[0]) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

