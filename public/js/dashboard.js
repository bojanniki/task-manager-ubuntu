document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  //1. Guard check: redirect if no token
  if (!token) {
    window.location.href = "/";
    return;
  }
  //2. Fetch tasks with Authorization headers
  async function loadTasks() {
    const response = await fetch("/api/tasks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // This is how the server knows who you are!
      },
    });
    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
      return;
    }
    const tasks = await response.json();
    renderTasks(tasks);
  }
  function renderTasks(tasks) {
    const list = document.getElementById("task-list");
    list.innerHTML = tasks.map((t) => `<li>${t.title}</li>`).join("");
  }
  //3.logout handler
  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  });
  loadTasks();
});
