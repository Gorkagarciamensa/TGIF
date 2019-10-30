function createTaula(array, id) {
  var body = document.getElementById(id);

  for (var i = 0; i < array.length; i++) {
    var row = document.createElement("tr");
    var cell1 = document.createElement("td");
    var cell2 = document.createElement("td");
    var cell3 = document.createElement("td");
    var cell4 = document.createElement("td");
    var cell5 = document.createElement("td");
    var link1 = document.createElement("a");
    link1.setAttribute("href", array[i].url);
    link1.setAttribute("target", array[i].url);
    link1.innerHTML =
      array[i].first_name +
      " " +
      (array[i].middle_name || " ") + //los () son un if (condición) para que cuando vea null ponga espacio o el nombre sino hay null
      " " +
      array[i].last_name;

    cell2.innerHTML = array[i].party;
    cell3.innerHTML = array[i].state;
    cell4.innerHTML = array[i].seniority;
    cell5.innerHTML = array[i].votes_with_party_pct;

    body.append(row);
    row.append(cell1, cell2, cell3, cell4, cell5);
    cell1.appendChild(link1);
  }
}
createTaula(data.results[0].members, "house-data");
