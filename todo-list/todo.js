let input = document.querySelector("input");
let todos = [];
let localStorageData = localStorage.getItem("todo array");
if (localStorageData != null) {
  let ogData = JSON.parse(localStorageData);
  todos = ogData;
  makeTodo();
}

function addTodo() {
  let inputElement = input.value;
  input.value = "";
  if (inputElement.trim() === "") {
    alert("No Value Entered");
  }
  let todoObj = {
    id: Date.now(),
    text: inputElement,
    completed: false,
  };
  todos.push(todoObj);
  localStorage.setItem("todo array", JSON.stringify(todos));
  makeTodo();
}

function makeTodo() {
  let todoList = "";
  for (let i = 0; i < todos.length; i++) {
    let { id, text, completed } = todos[i];
    const html = `<ul class="list">
          <li class="item">
            <div class="item-left">
              <input type="checkbox" ${
                completed ? "checked" : ""
              } onClick="toggleComplete(${id})"/>
              <p style="text-decoration:${
                completed ? "line-through" : "none"
              }">${text}</p>
            </div>
            <div class="icons">
              <button onclick="editTodo(${id})" class="js-edit icon-button">
                <img src="images/edit.png" alt="edit" />
              </button>
              <button onclick="deleteTodo(${id})" class="js-delete icon-button">
                <img src="images/delete.png" alt="delete" />
              </button>
            </div>
          </li>
          <hr />
        </ul>`;
    todoList += html;
  }
  document.getElementById("todo-list").innerHTML = todoList;
}

//delete Todo
function deleteTodo(deleteId) {
  todos = todos.filter((todo) => todo.id !== deleteId);
  localStorage.setItem("todo array", JSON.stringify(todos));
  makeTodo();
}

//edit Todo
function editTodo(editId) {
  let todoEdit = todos.find((todo) => todo.id === editId);
  let newTodo = prompt("Enter the text", todoEdit.text);
  if (newTodo && newTodo.trim() !== "") {
    todoEdit.text = newTodo;
    localStorage.setItem("todo array", JSON.stringify(todos));
    makeTodo();
  }
}

//complete Todo
function toggleComplete(id) {
  let todo = todos.find((t) => t.id === id);
  todo.completed = !todo.completed;
  localStorage.setItem("todo array", JSON.stringify(todos));
  makeTodo();
}
