//Para crear que haya un desplegable cuando se clica el botón "read more" se tiene que hacer, en este caso:
//1-Creamos las variables necesarias (dots, que recoge el <span>...</span>, moreText que recoge el texto que se quiere esconder y myBtn que se refiere al botón
//2-Para que haya "event" (es decir, que ocurra algo cuando hacemos click/mouseover/etc...) tenemos que añadir un evento con 2 parámetros: el event (click)
// y la función que vamos a llamar (myFunction)
//!!!Atención: la función que llamamos no hay que abrirla en () ya que es un parámetro, no una función en si.
//3-Creamos la función del parámetro, y dentro hacemos un condicionante.
var dots = document.getElementById("dots");
var moreText = document.getElementById("more");
var btnText = document.getElementById("myBtn");

btnText.addEventListener("click", myFunction);

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
