let todos = [];
let deletingIndex = null;

/* ===== RENDER TODOS ===== */
const renderTodos = () => {
    const list = document.getElementById("tasksList");
    list.innerHTML = "";

    todos.forEach((todo, index) => {
        const listItem = document.createElement("li");

        //  Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.addEventListener("click", () => {
            todo.completed = !todo.completed;
            saveTodos();
            renderTodos();
        });

        //  Task text
        const textSpan = document.createElement("span");
        textSpan.textContent = todo.text;
        if (todo.completed) textSpan.style.textDecoration = "line-through";

        //  Edit button
        const editBtn = document.createElement("button");
        editBtn.innerHTML = "<i class='fa-solid fa-pencil'></i>";
        editBtn.addEventListener("click", () => openEditPopup(index));

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "<i class='fa-solid fa-trash'></i>";
        deleteBtn.addEventListener("click", () => openDeleteTaskPopup(index));

        // Append everything to the list item
        listItem.appendChild(checkbox);
        listItem.appendChild(textSpan);
        listItem.appendChild(editBtn);
        listItem.appendChild(deleteBtn);

        // Append list item to the ul
        list.appendChild(listItem);
    });
};

/* ===== SAVE TODOS ===== */
const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

/* ===== LOAD TODOS ===== */
const loadTodos = () => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos !== null) {
        todos = JSON.parse(storedTodos);
        renderTodos();
    }
};

/* ===== ADD TASK ===== */
const addTask = () => {
    const input = document.getElementById("todoInput");
    const errorMessage = document.getElementById("inputError");
    const task = input.value.trim();

    errorMessage.textContent = "";

    if (task === "") {
        errorMessage.textContent = "Task cannot be empty.";
        return;
    }
    if (!isNaN(task.charAt(0))) {
        errorMessage.textContent = "Task cannot start with a number.";
        return;
    }
    if (task.length < 5) {
        errorMessage.textContent = "Task must be at least 5 characters long.";
        return;
    }

    todos.push({ text: task, completed: false });
    input.value = "";
    saveTodos();
    renderTodos();
};

/* ===== POPUP FUNCTIONS ===== */
const openDeleteTaskPopup = (index) => {
    deletingIndex = index;
    document.getElementById("delete-task-popup").style.display = "flex";
};

const deleteTask = () => {
    if (deletingIndex !== null) {
        todos.splice(deletingIndex, 1);
        saveTodos();
        closePopup();
        renderTodos();
        deletingIndex = null;
    }
};

const closePopup = () => {
    document.querySelectorAll(".popup").forEach(popup => {
        popup.style.display = "none";
    });
};

/* ===== WINDOW ONLOAD & LISTENERS ===== */
window.addEventListener("load", () => {
    // Add task button
    document.getElementById("addBtn").addEventListener("click", addTask);

    // Delete task confirm button
    document.getElementById("confirm-delete-btn").addEventListener("click", deleteTask);

    // Cancel buttons on popups
    document.querySelectorAll(".cancel-btn").forEach(btn => {
        btn.addEventListener("click", closePopup);
    });

    // Load tasks from localStorage when page loads
    loadTodos();
});
