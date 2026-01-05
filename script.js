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

    // Also load tasks when page opens
    loadTodos();
});

/* ===== RENDER TODOS ===== */
const renderTodos = () => {
    const list = document.getElementById("tasksList");
    list.innerHTML = "";

    todos.forEach((todo, index) => {
        // Create list item
        const listItem = document.createElement("li");
        listItem.textContent = todo.text;

        // Optional: add checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.addEventListener("click", () => {
            todo.completed = !todo.completed;
            saveTodos();
            renderTodos();
        });

        listItem.prepend(checkbox); // checkbox before text
        list.appendChild(listItem);
    });
};
