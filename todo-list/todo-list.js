const todoList = [
  { name: "go trip", dueDate: "2023-10-01" },
  { name: "buy watch", dueDate: "2023-09-20" },
];

renderTodoList();

function renderTodoList() {
  let todoListHTML = "";

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    const { name, dueDate } = todoObject;
    const html = `
    <div>${name}</div>
    <div>${dueDate}</div>
    <button 
    class='delete-button'
    onClick=
    "todoList.splice(${i}, 1);
    renderTodoList()"
    >Delete</button>
    `;
    todoListHTML += html;
  }

  document.querySelector(".js-todo-list").innerHTML = todoListHTML;
}

function addTodo() {
  const inputElement = document.querySelector(".js-todo-input");
  const name = inputElement.value;
  const dateElement = document.querySelector(".js-due-date");
  const dueDate = dateElement.value;
  todoList.push({
    name,
    dueDate,
  });
  inputElement.value = "";
  renderTodoList();
}
