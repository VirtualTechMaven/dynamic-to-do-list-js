// Wait until the HTML document is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Get text and remove whitespace

        // Validate input
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create a new list item (li)
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');

        // Add event to remove the task
        removeBtn.onclick = function () {
            taskList.removeChild(li);
        };

        // Append button to list item
        li.appendChild(removeBtn);

        // Append list item to the task list
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";
    }

    // ✅ Add event listener for the Add Task button
    addButton.addEventListen
