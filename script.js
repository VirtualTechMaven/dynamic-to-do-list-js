// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Initialize tasks array from localStorage (or empty array if none)
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Save current tasks array to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create a task list element (li) with a remove button
    function createTaskElement(taskText) {
        const li = document.createElement('li');

        // Text node for task
        const span = document.createElement('span');
        span.textContent = taskText;

        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn'); // required class name

        // Remove handler: remove from DOM and update localStorage
        removeBtn.onclick = function () {
            taskList.removeChild(li);

            // Remove first occurrence from tasks array and save
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        };

        li.appendChild(span);
        li.appendChild(removeBtn);
        return li;
    }

    /**
     * Add a task to the DOM and optionally save to localStorage.
     * If taskText is provided (e.g., when loading), set save = false to avoid duplicate saving.
     * @param {string} taskText - The text of the task to add (optional).
     * @param {boolean} save - Whether to persist to localStorage (default true).
     */
    function addTask(taskText, save = true) {
        // Determine the text to use: parameter (when loading) or input value (when user adds)
        const text = (typeof taskText !== 'undefined' && taskText !== null)
            ? String(taskText).trim()
            : taskInput.value.trim();

        // Validate non-empty
        if (text === '') {
            // Only alert the user if they attempted to add via input (no param passed)
            if (typeof taskText === 'undefined' || taskText === null) {
                alert('Please enter a task');
            }
            return;
        }

        // Create and append task element
        const taskElement = createTaskElement(text);
        taskList.appendChild(taskElement);

        // If this is a new task from the user, save it
        if (save) {
            tasks.push(text);
            saveTasks();
        }

        // Clear the input field when user adds a task
        if (typeof taskText === 'undefined' || taskText === null) {
            taskInput.value = '';
        }
    }

    // Load tasks from localStorage and render them
    function loadTasks() {
        // Use localStorage.getItem('tasks') as required
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false => don't save again
    }

    // Add event listener for the Add Task button (required token: addButton.addEventListener)
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Add event listener for Enter key press in the input (required tokens: taskInput.addEventListener, "keypress", "Enter", event.key)
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initial load of tasks from localStorage
    loadTasks();

});
