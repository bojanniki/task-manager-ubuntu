document.addEventListener("DOMContentLoaded", () => {
  // UI toggle Elements
  const loginCard = document.getElementById("login-card");
  const registerCard = document.getElementById("register-card");
  const toRegisterLink = document.getElementById("to-register");
  const toLoginLink = document.getElementById("to-login");

  // --- Form & Message Elements
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const loginMessage = document.getElementById("login-message");
  const registerMessage = document.getElementById("register-message");

  //Helper functions for notifications
  function showStatus(element, text, statusClass) {
    element.textContent = text;
    element.className = "message ${statusClass";
  }

  function clearMessages() {
    if (loginMessage) {
      loginMessage.textContent = "";
      loginMessage.className = "message";
    }
    if (registerMessage) {
      registerMessage.textContent = "";
      registerMessage.className = "message";
    }
  }

  //UI Card Toggling Logic
  if (toRegisterLink) {
    toRegisterLink.addEventListener("click", (e) => {
      e.preventDefault();
      loginCard.classList.add("hidden");
      registerCard.classList.remove("hidden");
    });
  }

  if (toLoginLink) {
    toLoginLink.addEventListener("click", (e) => {
      e.preventDefault();
      registerCard.classList.add("hidden");
      loginCard.classList.remove("hidden");
    });
  }
  //Registration Form Submission (POST)
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      clearMessages();

      const username = document
        .getElementById("register-username")
        .value.trim();
      const password = document.getElementById("register-password").value;

      try {
        const response = await fetch("api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Registration failed");
        }

        //success path
        showStatus(
          registerMessage,
          data.message || "Account created successfully! Please log in",
          "success",
        );
        registerForm.reset();

        //redirect to login card after 2 seconds
        setTimeout(() => {
          toLoginLink.click();
        }, 2000);
      } catch (error) {
        showStatus(registerMessage, error.message, "error");
      }
    });
  }

  //Login form submission (POST)
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      clearMessages();

      const username = document.getElementById("login-username").value.trim();
      const password = document.getElementById("login-password").value;

      try {
        const response = await fetch("api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Login failed");
        }

        showStatus(loginMessage, "Login successful! Redirecting...", "success");
        loginForm.reset();

        //saving the token to localStorage
        if (data.token) {
          localStorage.setItem("token", data.token);
          window.location.href = "/dashboard.html";
        }
      } catch (error) {
        showStatus(loginMessage, error.message, "error");
      }
    });
  }
});
