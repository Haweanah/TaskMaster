// Get elements from the DOM
const registerForm = document.getElementById('register-form');
const tasksContainer = document.getElementById('tasks');

// Base URL for your backend API
const baseURL = 'https://your-backend-api-url.com/api';

// Function to handle user registration
async function registerUser(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  try {
    const response = await fetch(`${baseURL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await response.json();
    
    if (response.ok) {
      alert('Registration successful!');
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Registration failed. Please try again.');
  }
}

// Function to fetch and display tasks
async function fetchTasks() {
  try {
    const response = await fetch(`${baseURL}/tasks`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    const tasks = await response.json();
    
    tasksContainer.innerHTML = '';
    tasks.forEach(task => {
      const taskElement = document.createElement('div');
      taskElement.className = 'task-item';
      taskElement.innerHTML = `
        <div class="task-details">
          <span class="task-title">${task.title}</span>
          <span class="task-deadline">Due: ${new Date(task.deadline).toLocaleDateString()}</span>
        </div>
        <button onclick="deleteTask('${task._id}')">Delete</button>
      `;
      tasksContainer.appendChild(taskElement);
    });
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to load tasks.');
  }
}

// Function to delete a task
async function deleteTask(taskId) {
  try {
    const response = await fetch(`${baseURL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    if (response.ok) {
      alert('Task deleted successfully!');
      fetchTasks(); // Refresh tasks
    } else {
      alert('Failed to delete task.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error deleting task.');
  }
}

// Event listener for registration form
registerForm.addEventListener('submit', registerUser);

// Fetch tasks on page load
window.onload = fetchTasks;
