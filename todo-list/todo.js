let todos = JSON.parse(localStorage.getItem("todo-array")) || [];
let editId = null;

makeTodo();

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
              <button onclick="startEdit(${id})" class="js-edit icon-button">
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

//add or update
function addOrUpdateTodo() {
  const inputElement = document.getElementById("todo-input");
  const text = inputElement.value.trim();

  if (text === "") return;

  if (editId) {
    todos = todos.map((todo) =>
      todo.id === editId ? { ...todo, text } : todo
    );
    editId = null;
    document.getElementById("add-btn").innerText = "Add";
  } else {
    const todoObj = {
      id: Date.now(),
      text,
      completed: false,
    };
    todos.push(todoObj);
  }
  localStorage.setItem("todo array", JSON.stringify(todos));
  makeTodo();
  inputElement.value = "";
}

//mark Todo complete
function toggleComplete(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  localStorage.setItem("todo array", JSON.stringify(todos));
  makeTodo();
}

//delete Todo
function deleteTodo(deleteId) {
  todos = todos.filter((todo) => todo.id !== deleteId);
  localStorage.setItem("todo array", JSON.stringify(todos));
  makeTodo();
}

//edit Todo
function startEdit(id) {
  const todo = todos.find((t) => t.id === id);
  document.getElementById("todo-input").value = todo.text;
  editId = id;
  document.getElementById("add-btn").innerText = "Save";
}

