// Get the to do list from cookie or initialize as empty array
let todoList = getCookie("todoList") ? JSON.parse(getCookie("todoList")) : [];

// Display the to do list on page load
displayTodoList();

// Add click event listener to the new button
document.getElementById("newBtn").addEventListener("click", function() {
  // Prompt user for a new to do
  let newTodo = prompt("Enter a new to do:");
  // If the user entered something, add it to the top of the list
  if (newTodo) {
    todoList.unshift(newTodo);
    // Update the display and save the updated list to cookie
    displayTodoList();
    setCookie("todoList", JSON.stringify(todoList), 365);
  }
});

// Add click event listener to the to do list
document.getElementById("ft_list").addEventListener("click", function(e) {
  // If the clicked element is a to do, confirm deletion and remove it if confirmed
  if (e.target && e.target.nodeName === "DIV") {
    if (confirm("Are you sure you want to delete this to do?")) {
      let index = Array.from(e.target.parentNode.children).indexOf(e.target);
      todoList.splice(index, 1);
      // Update the display and save the updated list to cookie
      displayTodoList();
      setCookie("todoList", JSON.stringify(todoList), 365);
    }
  }
});

// Function to display the to do list on the page
function displayTodoList() {
  let ftList = document.getElementById("ft_list");
  // Clear the current list
  while (ftList.firstChild) {
    ftList.removeChild(ftList.firstChild);
  }
  // Add each to do to the list in reverse order (newest at the top)
  for (let i = todoList.length - 1; i >= 0; i--) {
    let todoDiv = document.createElement("div");
    todoDiv.innerHTML = todoList[i];
    ftList.appendChild(todoDiv);
  }
}

// Function to get a cookie value by name
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

// Function to set a cookie value with a given name and expiration time
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    console.log("day=",days);
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

