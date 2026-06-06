document.addEventListener("DOMContentLoaded", () => {
  // 1. Select the DOM elements
  const loginCard = document.getElementById("login-card");
  const registerCard = document.getElementById("register-card");
  const toRegisterLink = document.getElementById("to-register");
  const toLoginLink = document.getElementById("to-login");

  // 2. Add event listeners
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
});
