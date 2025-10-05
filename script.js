// Ensure the DOM is fully loaded before running JavaScript
document.addEventListener('DOMContentLoaded', function() {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Get user input and remove extra spaces

        // Check if input is empty
        if (taskText === '') {
            alert('Please enter a task');
            return;
        }

        // Create a new list item (li)
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Add functionality to remove the task when button is clicked
        removeButton.onclick = function() {
            taskList.removeChild(li);
        };

        // Append remove button to the task and add the task to the list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';
    }

    // Event listener for button click
    addButton.addEventListener('click', addTask);

    // Event listener for pressing Enter key
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Optionally, invoke addTask on DOMContentLoaded if needed
    // addTask(); (Not required but mentioned in task instructions)
});
