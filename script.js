let todos = [];

/* ===== SAVE TODOS ===== */
const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

/* ===== LOAD TODOS ===== */
const loadTodos = () => {
    const storedTodos = localStorage.getItem("todos");

    if (storedTodos !== null) {
        todos = JSON.parse(storedTodos);
        renderTodos(); // to show the current data on the screen
    }
};

/* ===== ADD TASK ===== */
const addTask = () => {
    //  Get input value
    const input = document.getElementById("todoInput");
    const errorMessage = document.getElementById("inputError");
    const task = input.value.trim();

    // Clear previous errors
    errorMessage.textContent = "";

    // 3️⃣ Validation
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

    // to Clear input field
    input.value = "";

    saveTodos();

    //  Update the UI
    renderTodos();
};


window.addEventListener("load", () => {
    // Attach listener to the Add button
    document.getElementById("addBtn").addEventListener("click", addTask);


      // Delete Task button listener
    document.getElementById("confirm-delete-btn").addEventListener("click", deleteTask);


        // Cancel popup
    document.querySelectorAll(".cancel-btn").forEach(btn => {
        btn.addEventListener("click", closePopup);
    });

    // Also load tasks when page opens
    loadTodos();
});

/* ===== RENDER TODOS ===== */
const renderTodos = () => {
    const list = document.getElementById("tasksList");
    list.innerHTML = "";

    todos.forEach((todo, index) => {
        const listItem = document.createElement("li");

        // 1️⃣ Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.addEventListener("click", () => {
            todo.completed = !todo.completed;
            saveTodos();
            renderTodos();
        });

        // 2️⃣ Task text
        const textSpan = document.createElement("span");
        textSpan.textContent = todo.text;
        if (todo.completed) textSpan.style.textDecoration = "line-through";

        // 3️⃣ Edit button
        const editBtn = document.createElement("button");
        editBtn.innerHTML = "<i class='fa-solid fa-pencil'></i>";
        editBtn.addEventListener("click", () => openEditPopup(index));

        // 4️⃣ Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "<i class='fa-solid fa-trash'></i>";
        deleteBtn.addEventListener("click", () => openDeleteTaskPopup(index));

        // Append to listItem
        listItem.appendChild(checkbox);
        listItem.appendChild(textSpan);
        listItem.appendChild(editBtn);
        listItem.appendChild(deleteBtn);

        list.appendChild(listItem);
    });
};



const deleteTask = () => {
    todos.splice(deletingIndex, 1);
    saveTodos();
    closePopup();
    renderTodos();
};
