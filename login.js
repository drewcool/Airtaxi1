function togglePassword() {
    const passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }
  
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // You can add validation or backend authentication here
  
    console.log("Logging in:", email, password);
    alert("Login successful! (This is a mockup)");
  
    // Redirect to index.html after successful login
    window.location.href = "index.html";
  });