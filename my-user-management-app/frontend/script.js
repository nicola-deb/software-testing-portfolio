document.addEventListener('DOMContentLoaded', () => {
	// Add event listener for the login form if it exists
	const loginForm = document.getElementById('loginForm');
	if (loginForm) {
		loginForm.addEventListener('submit', handleLogin);
	}

	// Add event listener for the View Users button
	const viewUsersButton = document.getElementById('viewUsersButton');
	if (viewUsersButton) {
		viewUsersButton.addEventListener('click', fetchUserData);
	}
	fetchUserData();
});

// Function to handle login
function handleLogin(event) {
	event.preventDefault(); // Prevent the default form submission

	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	console.log('Logging in with:', { username, password });

	// Make a POST request to the login endpoint
	fetch('http://localhost:3000/api/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ username, password })
	})
		.then(response => {
			if (!response.ok) {
				throw new Error('Invalid username or password');
			}
			return response.json();
		})
		.then(data => {
			// Successful login
			alert(data.message); // Display success message
			// Redirect to the homepage
			window.location.href = 'homepage.html?username=' + encodeURIComponent(data.username);
		})
		.catch(error => {
			// Handle errors
			alert(error.message); // Display error message
		});
}

// Function to fetch user data from the database
function fetchUserData() {
	console.log('Inside fetchUserData');
	fetch('http://localhost:3000/api/users') // Adjust the API endpoint as needed
		.then(response => {
			if (!response.ok) {
				throw new Error('Failed to fetch user data');
			}
			return response.json(); // Assuming the response is in JSON format
		})
		.then(data => {
			populateTable(data); // Call function to populate the table
		})
		.catch(error => {
			console.error('Error fetching user data:', error);
			alert('Failed to fetch user data. Please try again later.'); // Notify user of the error
		});
}

// Function to populate the user table
function populateTable(users) {
	const userTableBody = document.getElementById('userTable').getElementsByTagName('tbody')[0];

	// Clear existing rows
	userTableBody.innerHTML = '';

	if (users.length === 0) {
		const row = userTableBody.insertRow();
		const cell = row.insertCell(0);
		cell.colSpan = 3; // Span across all columns
		cell.textContent = 'No users found'; // Message when no users are present
		cell.style.textAlign = 'center'; // Center the message
	} else {
		users.forEach(user => {
			const row = userTableBody.insertRow();

			const idCell = row.insertCell(0);
			const usernameCell = row.insertCell(1);
			const roleCell = row.insertCell(2);

			idCell.textContent = user.id; // Assuming user object has an id property
			usernameCell.textContent = user.username; // Assuming user object has a username property
                        roleCell.textContent=user.role;
			// Add click event to the row for selection
			row.addEventListener('click', () => {
				// Remove 'selected' class from all rows
				const rows = userTableBody.getElementsByTagName('tr');
				for (let r of rows) {
					r.classList.remove('selected');
				}
				// Add 'selected' class to the clicked row
				row.classList.add('selected');
				// Show action buttons
		                const userId = user.id; // Assuming the user object has an id property
                		showActionButtons(userId); // Call function to show buttons
			});

		});
	}
}
// Function to show the action buttons for the selected user
function showActionButtons(userId) {
    const actionButtons = document.getElementById('actionButtons');
    actionButtons.style.display = 'block';

    // Set up event listeners for the buttons
    document.getElementById('updateUserButton').onclick = () => {
        updateUser(userId); // Call function to update user with userId
    };

    document.getElementById('deleteUserButton').onclick = () => {
        deleteUser(userId); // Call function to delete user with userId
    };
}

// Placeholder functions for updating and deleting users
function updateUser(userId) {
    console.log(`Update user with ID: ${userId}`);
    // Implement logic to show update form or send request to update the user
}


function deleteUser(userId) {
    // Prompt for confirmation before deletion
    const confirmation = confirm('Are you sure you want to delete this user?');
    if (!confirmation) {
        return; // Exit if the user cancels
    }

    // Get the username and password of the admin from a form or storage
    const adminUsername = prompt("Enter Admin Username:");
    const adminPassword = prompt("Enter Admin Password:");

    // Make a DELETE request to the API endpoint
    fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            // Include credentials if required for authentication
            'Authorization': 'Basic ' + btoa(`${adminUsername}:${adminPassword}`)
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete user: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert(data.message); // Display success message
        fetchUserData(); // Refresh the user list
    })
    .catch(error => {
        console.error('Error deleting user:', error);
        alert(error.message); // Display error message
    });
}

