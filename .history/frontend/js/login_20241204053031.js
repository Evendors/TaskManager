const email = document.getElementById("email");
const password = document.getElementById("password");
const btn = document.getElementById("btn");

// Get the loading bar elements
const loadingBarContainer = document.getElementById("loading-bar-container");
const loadingBar = document.getElementById("loading-bar");

const BASE_URL = "https://taskmanager-app-4eme.onrender.com";

// Handle the login click event
btn.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent form submission

  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  // Basic validation: Ensure all fields are filled
  if (!emailValue || !passwordValue) {
    alert("Please fill in all fields");
    return;
  }

  const loginData = {
    email: emailValue,
    password: passwordValue,
  };

  // Show the loading bar when the request starts
  loadingBarContainer.style.display = "block"; // Show the loading bar container
  loadingBar.style.width = "0"; // Reset the loading bar width
  setTimeout(() => {
    loadingBar.style.width = "100%"; // Animate the loading bar to 100% width
  }, 10); // Slight delay to ensure the animation works

  // Make a POST request to the login API endpoint
  fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
    credentials: "include", // Include cookies for authentication (if needed)
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Parse JSON response if request is successful
      }
      // Handle error response if status is not OK (e.g., 400, 500)
      return response.json().then((errorData) => {
        throw new Error(errorData.message || "Login failed");
      });
    })
    .then((data) => {
      console.log("Login successful:", data); // Log successful login data
      alert("Login successful!");
      window.location.href = "task.html"; // Redirect to dashboard after success
    })
    .catch((error) => {
      console.error("Error:", error); // Log any errors
      alert(`There was an error logging you in: ${error.message}`); // Alert user of error
    })
    .finally(() => {
      // Hide the loading bar when the request is done
      loadingBarContainer.style.display = "none"; // Hide the loading bar container
    });
});
