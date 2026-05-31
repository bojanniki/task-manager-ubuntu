const display = document.getElementById("display");
const form = document.getElementById("item-form");

/**
 * FETCH: Gets items from the Express API
 */
async function loadItems() {
  try {
    const res = await fetch("/api/items");
    const items = await res.json();

    // If no items, show a friendly message
    if (items.length === 0) {
      display.innerHTML =
        '<p class="loading">No items found in the database.</p>';
      return;
    }

    // Map through items and create the HTML structure that matches our CSS
    display.innerHTML = items
      .map(
        (item) => `
      <div class="item-card">
        <span class="item-content">${item.content}</span>
        <span class="item-date">${new Date(item.created_at).toLocaleDateString()}</span>
      </div>
    `,
      )
      .join("");
  } catch (err) {
    console.error("Error loading items:", err);
    display.innerHTML =
      '<p class="loading" style="color: red;">Failed to connect to server.</p>';
  }
}

/**
 * POST: Sends new item to the Express API
 */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const input = document.getElementById("item-input");
  const content = input.value;

  try {
    const res = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (res.ok) {
      input.value = ""; // Clear input on success
      loadItems(); // Refresh the list
    }
  } catch (err) {
    console.error("Error saving item:", err);
  }
});

// Initial load when the page opens
loadItems();
