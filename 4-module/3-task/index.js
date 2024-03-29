function highlight(table) {
  for (let i = 0; i < table.rows.length; i++) {
    let row = table.rows[i];

    if (row.cells[3].dataset.available === "true") {
      row.classList.add("available");
    } else {
      row.classList.add("unavailable");
    }

    if (!row.cells[3].dataset.available) {
      row.setAttribute("hidden", true);
    }

    if (row.cells[2].textContent === "m") {
      row.classList.add("male");
    } else {
      row.classList.add("female");
    }

    if (parseInt(row.cells[1].textContent) < 18) {
      row.style.textDecoration = "line-through";
    }
  }
}

// Обязательно ли парсить возраст? И без этого все работает,
// но я оставил ради целостной структуры
