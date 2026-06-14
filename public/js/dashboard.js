document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    // 1. Guard check
    if (!token) {
        window.location.href = "/";
        return;
    }

    // 2. Fetch and display tasks
    async function loadTasks() {
        try {
            const response = await fetch("/api/tasks", {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.status === 401) {
                localStorage.removeItem("token");
                window.location.href = "/";
                return;
            }
            const tasks = await response.json();
            renderTasks(tasks);
        } catch (err) {
            console.error("Error loading tasks:", err);
        }
    }

    // 3. Add new task
    document.getElementById("task-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const titleInput = document.getElementById("task-title");
        const title = titleInput.value.trim();
        if (!title) return;

        await fetch("/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ title })
        });
        titleInput.value = "";
        loadTasks();
    });

    // 4. Render tasks (with global-accessible buttons)
    window.toggleTask = async (id, currentStatus) => {
        try {
            await fetch(`/api/tasks/${id}`, { // Note: using backticks here!
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ is_completed: !currentStatus })
            });
            loadTasks();
        } catch (err) { console.error("Error toggling:", err); }
    };

    window.deleteTask = async (id) => {
        try {
            await fetch(`/api/tasks/${id}`, { // Note: using backticks here!
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            loadTasks();
        } catch (err) { console.error("Error deleting:", err); }
    };

    function renderTasks(tasks) {
        const list = document.getElementById("task-list");
        list.innerHTML = tasks.map((t) => `
            <li style="${t.is_completed ? 'text-decoration: line-through;' : ''}">
                ${t.title}
                <button onclick="toggleTask(${t.id}, ${t.is_completed})">
                    ${t.is_completed ? 'Undo' : 'Done'}
                </button>
                <button onclick="deleteTask(${t.id})">Delete</button>
            </li>
        `).join("");
    }

    // 5. Logout
    document.getElementById("logout-btn").addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    });

    loadTasks();
});