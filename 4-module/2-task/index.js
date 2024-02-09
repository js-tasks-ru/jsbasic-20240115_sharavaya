function makeDiagonalRed(table) {
  for (let i = 0; i < table.rows.length; i++) {
    let row = table.rows[i];
    let cell = row.cells[i];
    cell.style.backgroundColor = "red";
  }
}

// Можно уместить в одну строку, через tr.cells
// table.rows[i].cells[i].style.backgroundColor = "red";
