//GENERAL VARIABLES
var members = " ";
let url = document.URL;

//VARIABLES FOR THE SHOWMORE/LESS
var dots = document.getElementById("dots");
var moreText = document.getElementById("more");
var btnText = document.getElementById("myBtn");

if (url.includes("senate")) {
  url = "https://api.propublica.org/congress/v1/113/senate/members.json";
} else if (url.includes("house")) {
  url = "https://api.propublica.org/congress/v1/113/house/members.json";
} else if (url.includes("index")) {
  btnText.addEventListener("click", myFunction);
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
    members = data.results[0].members;
    callOfTheFunctions();
  })
  .catch(error => {
    console.log(error);
  });

//CALLING FUNCTIONS

function callOfTheFunctions() {
  filterParty(members, "senate-data");
  dropdown(filterByState(members), "filter");
}

//MAKE BUTTONS FOR DEMOCRATS, REPUBLICANS, INDEPENDENTS

var btnDemocrat = document.getElementById("democratBox");
var btnRepublican = document.getElementById("republicanBox");
var btnIndependent = document.getElementById("independentBox");
const stateSelector = document.getElementById("filter");

btnDemocrat.addEventListener("click", function() {
  filterParty(classifyState(members), "senate-data");
});

btnRepublican.addEventListener("click", function() {
  filterParty(classifyState(members), "senate-data");
});
btnIndependent.addEventListener("click", function() {
  filterParty(classifyState(members), "senate-data");
});

stateSelector.addEventListener("change", function() {
  filterParty(classifyState(members), "senate-data");
});

//MAKE ARRAY FOR PARTY

function filterParty(array, id) {
  var checkboxArray = []; //En esta array nos dirá el partido según los vayamos clicando.

  for (let i = 0; i < array.length; i++) {
    if (
      //esto nos clasifica cual partido enviaremos a la array, si se ha clicado el elemento de la ID (republican -> republicanBox, etc.).
      document.getElementById("republicanBox").checked &&
      array[i].party == "R"
    ) {
      checkboxArray.push(array[i]);
    } else if (
      document.getElementById("democratBox").checked &&
      array[i].party == "D"
    ) {
      checkboxArray.push(array[i]);
    } else if (
      document.getElementById("independentBox").checked &&
      array[i].party == "I"
    ) {
      checkboxArray.push(array[i]);
    }
  }

  //ALERT
  let dg_alert = document.getElementById("danger");

  if (
    document.getElementById("independentBox").checked && //si ind/rep/dem están checked y la array esta vacía, saldrá un mensaje.
    checkboxArray.length == 0
  ) {
    dg_alert.innerHTML = "There are no Independents";
    dg_alert.classList.remove("alert", "alert-info");
    dg_alert.classList.add("alert", "alert-danger");
  } else if (
    document.getElementById("republicanBox").checked &&
    checkboxArray.length == 0
  ) {
    dg_alert.innerHTML = "There are no Republicans";
    dg_alert.classList.remove("alert", "alert-info");
    dg_alert.classList.add("alert", "alert-danger");
  } else if (
    document.getElementById("democratBox").checked &&
    checkboxArray.length == 0
  ) {
    dg_alert.innerHTML = "There are no Democrats";
    dg_alert.classList.remove("alert", "alert-info");
    dg_alert.classList.add("alert", "alert-danger");
  } else if (checkboxArray.length !== 0) {
    dg_alert.innerHTML = " "; //si la array no está vacía (se ha rellenado mediante algún checkbox), el mensaje y la clase desaparecerán.
    dg_alert.classList.remove("alert", "alert-info");
  } else {
    dg_alert.innerHTML = "Please, select a Party"; //si nada de eso ocurre, saldrá la clase y un mensaje predeterminado.
    dg_alert.classList.remove("alert", "alert-danger");
    dg_alert.classList.add("alert", "alert-info");
  }
  createTaula(checkboxArray, id);
}

//STATES WITHOUT DUPLICATES

function filterByState(array) {
  var filterArray = [];

  for (let i = 0; i < array.length; i++) {
    if (filterArray.includes(array[i].state) === false) {
      filterArray.push(array[i].state);
    }
  }

  filterArray.sort();
  return filterArray;
}

function classifyState(array) {
  var selector = stateSelector.value;
  var classifyArray = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].state == selector || selector == "All") {
      classifyArray.push(array[i]);
    }
  }
  return classifyArray;
}

console.log(classifyState(members));
//DROPDOWN BY STATES

function dropdown(array, id) {
  var select = document.getElementById(id);

  for (let i = 0; i < array.length; i++) {
    var options = document.createElement("option");
    options.innerHTML = array[i];
    select.append(options);
  }
}

//CREATE TABLE

function createTaula(array, id) {
  var body = document.getElementById(id);
  body.innerHTML = " "; //el body empieza vacio, por que sino a la hora de filtrar por partidos, se duplicaban, por lo que se "limpia" antes para
  //que se rellene automaticamente.
  for (var i = 0; i < array.length; i++) {
    var row = document.createElement("tr");
    var cell1 = document.createElement("td");
    var cell2 = document.createElement("td");
    var cell3 = document.createElement("td");
    var cell4 = document.createElement("td");
    var cell5 = document.createElement("td");
    var link1 = document.createElement("a");
    link1.setAttribute("href", array[i].url);
    link1.setAttribute("target", array[i].url); //con esto, cuando se clica el link se abrirá en una nueva pestaña.

    link1.innerHTML =
      array[i].first_name +
      " " +
      (array[i].middle_name || " ") + //los () son un if (condición) para que cuando vea null ponga espacio o el nombre sino hay null
      " " +
      array[i].last_name;

    //Explicación del LINK: creamos el elemento tag <a> con una nueva variable = link1. Después le atribuimos la url con href y buscando el array [i].url.
    //Luego atribuimos los nombres de los políticos con el link1, para finalmente "meter" el link1 <a> dentro de la cell1<td>.
    cell2.innerHTML = array[i].party;
    cell3.innerHTML = array[i].state;
    cell4.innerHTML = array[i].seniority;
    cell5.innerHTML = array[i].votes_with_party_pct + " %";

    body.append(row);
    row.append(cell1, cell2, cell3, cell4, cell5);
    cell1.appendChild(link1); //para poner el link1 dentro de cell1, hay que hacer appendChild (porque link1 (<a>) es hijo de cell1(td))
  }
}
function myFunction() {
  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}
