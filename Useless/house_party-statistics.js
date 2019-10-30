// function votes(array) {
//   var republican = [];
//   var democrat = [];
//   var independent = [];

//   for (var i = 0; i < array.length; i++) {
//     if (array[i].party == "R") {
//       republican.push(array[i].party);
//     } else if (array[i].party == "D") {
//       democrat.push(array[i].party);
//     } else if (array[i].party == "I") {
//       independent.push(array[i].party);
//     }

//     var rep = document.getElementById("numrep");
//     rep.innerHTML = republican.length;
//     var dem = document.getElementById("numdem");
//     dem.innerHTML = democrat.length;
//     var ind = document.getElementById("numind");
//     ind.innerHTML = independent.length;
//     var sumaTotal = document.getElementById("numtotal");
//     sumaTotal.innerHTML =
//       republican.length + democrat.length + independent.length;
//   }
//   console.log(republican.length, democrat.length, independent.length);
//   console.log(republican.length + democrat.length + independent.length);
// }

// votes(data.results[0].members);

// function average(array) {
//   var avgRep = [];
//   var avgDem = [];
//   var avgInd = [];
//   var suma = 0;
//   var suma1 = 0;
//   var averageRep;
//   var averageDem;
//   var republicanVotes;
//   var democratsVotes;
//   var averageTotal;
//   var totalVotes;

//   for (let i = 0; i < array.length; i++) {
//     if (array[i].party == "R") {
//       avgRep.push(array[i].votes_with_party_pct);
//     } else if (array[i].party == "D") {
//       avgDem.push(array[i].votes_with_party_pct);
//     } else if (array[i].party == "I") {
//       avgInd.push(array[i].votes_with_party_pct);
//     }
//   }

//   console.log("this is avgrep " + avgRep);
//   for (let j = 0; j < avgRep.length; j++) {
//     if ((suma += avgRep[j])) {
//       averageRep = suma / avgRep.length;
//     }
//   }
//   for (let k = 0; k < avgDem.length; k++) {
//     if ((suma1 += avgDem[k])) {
//       averageDem = suma1 / avgDem.length;
//     }
//   }

//   republicanVotes = document.getElementById("avrrep");
//   republicanVotes.innerHTML = averageRep.toFixed(2);
//   democratsVotes = document.getElementById("avgdem");
//   democratsVotes.innerHTML = averageDem.toFixed(2);

//   console.log("this is % suma of democrats = " + avgDem.length);
//   console.log("this is % suma of republicans = " + suma);
//   console.log("this is % suma of republicans = " + suma1);
//   console.log("this is average rep = " + averageRep);

//   averageTotal = parseFloat(
//     (suma + suma1) / (avgRep.length + avgDem.length + avgInd.length)
//   );
//   console.log(averageTotal);

//   totalVotes = document.getElementById("avgtotal");
//   totalVotes.innerHTML = averageTotal.toFixed(2);
// }
// average(data.results[0].members);

// function bottomTen(array) {
//   var votesParty = array.sort(function(a, b) {
//     return a.votes_with_party_pct - b.votes_with_party_pct;
//   });
//   console.log(votesParty);
// }
// function topTen(array) {
//   var pctParty = array.sort(function(a, b) {
//     return a.votes_with_party_pct - b.votes_with_party_pct;
//   });

//   pctParty.reverse();
//   console.log(pctParty);
// }

// function leastLoyal(array, id) {
//   bottomTen(array);
//   var body = document.getElementById(id);

//   for (let k = 0; k < 0.1 * array.length; k++) {
//     var row1 = document.createElement("tr");
//     var cell1 = document.createElement("td");
//     var cell2 = document.createElement("td");
//     var cell3 = document.createElement("td");
//     var link1 = document.createElement("a");
//     link1.setAttribute("href", array[k].length);
//     link1.setAttribute("target", array[k].length);
//     link1.innerHTML =
//       array[k].first_name +
//       " " +
//       (array[k].middle_name || " ") +
//       " " +
//       array[k].last_name;

//     body.append(row1);
//     row1.append(cell1, cell2, cell3);
//     cell1.appendChild(link1);
//     cell2.innerHTML = array[k].total_votes;
//     cell3.innerHTML = array[k].votes_with_party_pct;
//   }
// }

// function mostLoyal(array, id) {
//   topTen(array);
//   var body = document.getElementById(id);

//   for (let m = 0; m < 0.1 * array.length; m++) {
//     var row = document.createElement("tr");
//     var cell1 = document.createElement("td");
//     var cell2 = document.createElement("td");
//     var cell3 = document.createElement("td");
//     var link1 = document.createElement("a");
//     link1.setAttribute("href", array[m].length);
//     link1.setAttribute("target", array[m].url);
//     link1.innerHTML =
//       array[m].first_name +
//       " " +
//       (array[m].middle_name || " ") +
//       " " +
//       array[m].last_name;

//     body.append(row);
//     row.append(cell1, cell2, cell3);
//     cell1.appendChild(link1);
//     cell2.innerHTML = array[m].total_votes;
//     cell3.innerHTML = array[m].votes_with_party_pct;
//   }
// }
// leastLoyal(data.results[0].members, "leastTable");
// mostLoyal(data.results[0].members, "mostTable");
