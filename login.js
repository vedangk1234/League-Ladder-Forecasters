// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Collect form data
    const formData = new FormData(event.target);
    
    // Send form data to the server
    fetch('/login', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Redirect to the main page upon successful login
        window.location.href = '/main-page'; // Adjust this path as needed
      } else {
        // Show an error message
        alert('Login failed. Please try again.');
      }
    })
    .catch(error => console.error('Error logging in:', error));
  });
  