function getHistory() {
  const gamesHistory = localStorage.getItem('gamesHistory');
  buildTable(JSON.parse(gamesHistory));
}

function buildTable(data) {
  let table = document.getElementById('historyTable');

  for (let i = 0; i < data.length; i++) {
    let row = `
          <tr class="active-row">
            <td>${data[i].player}</td>
            <td>${data[i].points}</td>
            <td>${new Date(data[i].date).toLocaleString()}</td>
          </tr>`;
    table.innerHTML += row;
  }
}

getHistory();
