const taskInput = document.getElementById("taskInput");
const todoList = document.getElementById("todoList");

taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter" && taskInput.value.trim() !== "") {
    addTask(taskInput.value.trim());
    taskInput.value = "";
  }
});

function addTask(taskText) {
  const li = document.createElement("li");
  li.classList.add("todo-item");
  li.setAttribute("draggable", true);
  li.innerHTML = `
                ${taskText}
                <button class="delete-btn">X</button>
            `;

  li.addEventListener("dragstart", function () {
    li.classList.add("dragging");
  });

  li.addEventListener("dragend", function () {
    li.classList.remove("dragging");
  });

  li.querySelector(".delete-btn").addEventListener("click", function () {
    li.remove();
  });

  li.addEventListener("click", function () {
    li.classList.toggle("completed");
  });

  todoList.appendChild(li);
}

todoList.addEventListener("dragover", function (event) {
  event.preventDefault();
  const draggingItem = document.querySelector(".dragging");
  const afterElement = getDragAfterElement(todoList, event.clientY);
  if (afterElement == null) {
    todoList.appendChild(draggingItem);
  } else {
    todoList.insertBefore(draggingItem, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const elements = [...container.querySelectorAll(".todo-item:not(.dragging)")];

  return elements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
