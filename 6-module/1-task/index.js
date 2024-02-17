/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.createTable();
  }

  createTable() {
    const table = document.createElement("table");
    table.innerHTML = `<thead>
          <tr>
            <td>Имя</td>
            <td>Возраст</td>
            <td>Зарплата</td>
            <td>Город</td>
            <td></td>
          </tr>
      </thead>
      <tbody>
          ${this.rows
            .map(
              (row) => `
              <tr>
                <td>${row.name}</td>
                <td>${row.age}</td>
                <td>${row.salary}</td>
                <td>${row.city}</td>
                <td>
                  <button>X</button>
                </td>
              </tr>
            `
            )
            .join("")}
      </tbody>
    `;

    table.addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") {
        event.target.closest("tr").remove();
      }
    });

    return table;
  }
}

// А нормальная практика засовывать прослушку в конструктор?
