var statistics = {
  Democrats: 0,
  Republicans: 0,
  Independents: 0
};

let members = " ";
let url = document.URL;

if (url.includes("senate")) {
  url = "https://api.propublica.org/congress/v1/113/senate/members.json";
} else if (url.includes("house")) {
  url = "https://api.propublica.org/congress/v1/113/house/members.json";
} else {
  console.log("Not in the correct page");
}

fetch(url, {
  method: "GET",
  headers: {
    "X-API-Key": "iv8xhKePWd131dL5VdWp6ZRlYZ4fggTNWEX1ZEH4"
  }
})
  .then(response => {
    return response.json();
  })
  .then(data => {
    document.getElementById("loading").classList.remove("lds-hourglass");
    members = data.results[0].members;
    callOfTheFunctions();
  })
  .catch(error => {
    console.log(error);
  });

function callOfTheFunctions() {
  votes(members);
  average(members);
  let bottomTenVar = bottomTen(members);
  let topTenVar = topTen(members);
  leastMostLoyal(bottomTenVar, "bottomParty");
  leastMostLoyal(topTenVar, "topParty");
}

function votes(array) {
  var republican = [];
  var democrat = [];
  var independent = [];

  for (var i = 0; i < array.length; i++) {
    if (array[i].party == "R") {
      republican.push(array[i].party);
    } else if (array[i].party == "D") {
      democrat.push(array[i].party);
    } else if (array[i].party == "I") {
      independent.push(array[i].party);
    }

    var rep = document.getElementById("numrep");
    rep.innerHTML = republican.length;
    var dem = document.getElementById("numdem");
    dem.innerHTML = democrat.length;
    var ind = document.getElementById("numind");
    ind.innerHTML = independent.length;
    var sumaTotal = document.getElementById("numtotal");
    sumaTotal.innerHTML =
      republican.length + democrat.length + independent.length;
  }
  console.log(republican.length, democrat.length, independent.length);
  console.log(republican.length + democrat.length + independent.length);
}

function average(array) {
  var avgRep = [];
  var avgDem = [];
  var avgInd = [];
  var suma = 0;
  var suma1 = 0;
  var suma2 = 0;
  var averageRep;
  var averageDem;
  var averageInd = 0;
  var republicanVotes;
  var democratsVotes;
  var independentVotes;
  var averageTotal;
  var totalVotes;

  for (let i = 0; i < array.length; i++) {
    if (array[i].party == "R") {
      avgRep.push(array[i].votes_with_party_pct);
    } else if (array[i].party == "D") {
      avgDem.push(array[i].votes_with_party_pct);
    } else if (array[i].party == "I") {
      avgInd.push(array[i].votes_with_party_pct);
    }
  }

  for (let j = 0; j < avgRep.length; j++) {
    suma += avgRep[j];
    averageRep = suma / avgRep.length;
  }
  for (let k = 0; k < avgDem.length; k++) {
    suma1 += avgDem[k];
    averageDem = suma1 / avgDem.length;
  }

  for (let l = 0; l < avgInd.length; l++) {
    suma2 += avgInd[l];
    averageInd = suma2 / avgInd.length;
  }

  republicanVotes = document.getElementById("avrrep");
  republicanVotes.innerHTML = averageRep.toFixed(2) + " %";
  democratsVotes = document.getElementById("avgdem");
  democratsVotes.innerHTML = averageDem.toFixed(2) + " %";
  independentVotes = document.getElementById("avgind");
  independentVotes.innerHTML = averageInd.toFixed(2) + " %";

  averageTotal = parseFloat(
    (suma + suma1 + suma2) / (avgRep.length + avgDem.length + avgInd.length)
  );

  totalVotes = document.getElementById("avgtotal");
  totalVotes.innerHTML = averageTotal.toFixed(2) + " %";
}

//PARTY LOYALTY

function bottomTen(array) {
  return [
    ...array.sort(function(a, b) {
      return a.votes_with_party_pct - b.votes_with_party_pct;
    })
  ];
}
function topTen(array) {
  return [
    ...array.sort(function(a, b) {
      return b.votes_with_party_pct - a.votes_with_party_pct;
    })
  ];
}

function leastMostLoyal(array, id) {
  var body = document.getElementById(id);

  for (let k = 0; k < 0.1 * array.length; k++) {
    var row1 = document.createElement("tr");
    var cell1 = document.createElement("td");
    var cell2 = document.createElement("td");
    var cell3 = document.createElement("td");
    var link1 = document.createElement("a");
    link1.setAttribute("href", array[k].url);
    link1.setAttribute("target", array[k].url);
    link1.innerHTML =
      array[k].first_name +
      " " +
      (array[k].middle_name || " ") +
      " " +
      array[k].last_name;

    body.append(row1);
    row1.append(cell1, cell2, cell3);
    cell1.appendChild(link1);
    cell2.innerHTML = array[k].total_votes;
    cell3.innerHTML = array[k].votes_with_party_pct;
  }
}
