let resultados = []
let puntos = 0
let respondido = false
let piezas = []
let vacio = 8

function empezar() {
    document.body.style.overflow = "auto";
    document.getElementById("historia").style.display = "block";
    document.getElementById("inicio").style.display = "none";
    iniciarCorazones()
}

function mostrarRecuerdos() {
    detenerCorazones();

    const recuerdos = document.getElementById("recuerdos");
    const historia = document.getElementById("historia");
    const fotos = document.querySelectorAll(".foto");

    recuerdos.style.display = "block";
    historia.style.display = "none";

    // 🔥 RESETEAR ANIMACIONES
    fotos.forEach(foto => {
        foto.classList.remove("visible");
    });

    // 🔥 SCROLL ARRIBA REAL
    setTimeout(() => {
        window.scrollTo({
        top: 0,
        behavior: "instant"
        });
    }, 50);
}

/* animacion al hacer scroll */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.3
});

document.querySelectorAll(".foto").forEach(foto => {
  observer.observe(foto);
});
function volverHistoria(){

  const recuerdos = document.getElementById("recuerdos");
  const historia = document.getElementById("historia");

  historia.style.visibility = "hidden";
  historia.style.display = "block";
  recuerdos.style.display = "none";

  window.scrollTo(0, 0);

  requestAnimationFrame(() => {
    historia.style.visibility = "visible";
  });
  iniciarCorazones()

}

function Poema () {

  const poema = document.getElementById("textopoema");
  const recuerdos = document.getElementById("recuerdos");

  // 🔒 oculto para evitar el titileo
  poema.style.visibility = "hidden";
  poema.style.display = "block";
  recuerdos.style.display = "none";

  // 📍 lo mando arriba ANTES de mostrarlo
  window.scrollTo(0, poema.offsetTop - 60);

  // 👁 lo muestro ya bien posicionado
  requestAnimationFrame(() => {
    poema.style.visibility = "visible";
  });
  iniciarCorazones()

}

function volverPoema(){
  
  detenerCorazones();
  const poema = document.getElementById("textopoema");
  const recuerdos = document.getElementById("recuerdos");

  recuerdos.style.visibility = "hidden";
  recuerdos.style.display = "block";
  poema.style.display = "none";

  window.scrollTo(0, 0);

  requestAnimationFrame(() => {
    recuerdos.style.visibility = "visible";
  });

}
function Texto () {

  const textito = document.getElementById("textito");
  const poema = document.getElementById("textopoema");

  // 🔒 oculto para evitar el titileo
  textito.style.visibility = "hidden";
  textito.style.display = "block";
  poema.style.display = "none";

  // 📍 lo mando arriba ANTES de mostrarlo
  window.scrollTo(0, poema.offsetTop - 60);

  // 👁 lo muestro ya bien posicionado
  requestAnimationFrame(() => {
    textito.style.visibility = "visible";
  });
  iniciarCorazones()

}
function volverTexto(){

  const textito = document.getElementById("textito");
  const poema = document.getElementById("textopoema");

  poema.style.visibility = "hidden";
  poema.style.display = "block";
  textito.style.display = "none";

  window.scrollTo(0, 0);

  requestAnimationFrame(() => {
    poema.style.visibility = "visible";
  });
  iniciarCorazones()

}

function abrirPuzzle() {

  detenerCorazones();
  const textito = document.getElementById("textito");
  const puzzle = document.getElementById("puzzlePantalla");

  // 🔥 oculto temporal para que no se vea el salto
  puzzle.style.visibility = "hidden";
  puzzle.style.display = "block";
  textito.style.display = "none";

  // 🔥 lo mando arriba INSTANTÁNEO
  window.scrollTo(0, 0);

  // 🔥 ahora sí lo muestro ya bien posicionado
  setTimeout(() => {
  puzzle.style.visibility = "visible";
  puzzle.classList.add("mostrar");
}, 50);

  iniciarPuzzle();
}

function iniciarPuzzle() {
  piezas = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
  vacio = 14;

  mezclar();
  render();
}

function mezclar() {
  for (let i = 0; i < 38; i++) {
    let vecinos = getVecinos(vacio);
    let randomIndex = vecinos[Math.floor(Math.random() * vecinos.length)];

    // intercambiar
    let temp = piezas[vacio];
    piezas[vacio] = piezas[randomIndex];
    piezas[randomIndex] = temp;

    vacio = randomIndex;
  }
}

function render() {
  const puzzle = document.getElementById("puzzle");
  puzzle.innerHTML = "";

  piezas.forEach((valor, index) => {
    let div = document.createElement("div");

    if (valor === 14) {
      div.className = "vacio";
    } else {
      div.className = "pieza";

      let x = (valor % 3) * -150;
      let y = Math.floor(valor / 3) * -150;

      div.style.backgroundPosition = `${x}px ${y}px`;
    }

    div.addEventListener("click", () => mover(index));

    puzzle.appendChild(div);
  });
}

function mover(index) {
  let vecinos = getVecinos(vacio);

  if (vecinos.includes(index)) {
    let temp = piezas[index];
    piezas[index] = piezas[vacio];
    piezas[vacio] = temp;

    vacio = index;

    render();
    checkGanado();
  }
}

function getVecinos(i) {
  let vecinos = [];

  if (i % 3 !== 0) vecinos.push(i - 1);
  if (i % 3 !== 2) vecinos.push(i + 1);
  if (i - 3 >= 0) vecinos.push(i - 3);
  if (i + 3 < 15) vecinos.push(i + 3);

  return vecinos;
}

function checkGanado() {
  let correcto = piezas.every((val, i) => val === i);

  if (correcto) {

    render(); // 🔥 muestra la última pieza

    let overlay = document.getElementById("overlayFinal");

    // mostrar overlay
    overlay.classList.add("mostrar");

    // ocultar después de 2 segundos
    setTimeout(() => {
      overlay.classList.remove("mostrar");

      // mostrar mensaje arriba fijo
      document.getElementById("mensajeFinal").style.display = "block";

      document.getElementById("botonPreguntas").style.display = "block";

      document.getElementById("tituloPuzzle").style.display = "none";

    }, 3000);
  }
}
function puzzleCompleto() {
  return piezas.every((val, i) => val === i);
}
function resolverPuzzle() {
  piezas = piezas.map((_, i) => i); // ordena todo
  render();
  checkGanado();
}
function mostrarMensaje() {
    detenerCorazones()
    document.getElementById("puzzlePantalla").style.display = "none";
    document.getElementById("mensaje").style.display = "block";
}

function volverRecuerdos(){

  const puzzlePantalla = document.getElementById("puzzlePantalla");
  const textito = document.getElementById("textito");

  textito.style.visibility = "hidden";
  textito.style.display = "block";
  puzzlePantalla.style.display = "none";

  window.scrollTo(0, 0);

  requestAnimationFrame(() => {
    textito.style.visibility = "visible";
  });
  iniciarCorazones()

}
function volverPuzzle(){

document.getElementById("mensaje").style.display = "none"
document.getElementById("puzzlePantalla").style.display = "block"

}
function siguientePregunta(num){

document.getElementById("pregunta"+num).style.display = "none"

document.getElementById("pregunta"+(num+1)).style.display = "block"

}

function responder1(respuesta){
if(document.getElementById("sig1").style.display === "inline-block") return
let textoRespuesta
let estado

textoRespuesta = respuesta

if(respuesta == "Vos"){

document.getElementById("resultado1").innerHTML = "❤️ Muy bieennn amorrr, te re amo."
puntos++

textoRespuesta = "Vos"
estado = "Correcto"

}
else{

document.getElementById("resultado1").innerHTML = "❌ Nooo amorrr, vos fuisteee."

textoRespuesta = "Otra respuesta"
estado = "Incorrecto"

}

resultados.push({

pregunta: "¿Quién dijo Te amo primero?",
respuesta: textoRespuesta,
correcta: "Vos",
estado: estado

})

document.getElementById("sig1").style.display = "inline-block"
respondido = false

}


function responder2(respuesta){
if(document.getElementById("sig2").style.display === "inline-block") return
let textoRespuesta
let estado

textoRespuesta = respuesta
if(respuesta == "Mucho" || respuesta == "Demasiado" || respuesta == "Infinitamente"){

document.getElementById("resultado2").innerHTML = "❤️ Eran todas correctas obviamente amor, aunque te amo mucho mas que cualquier opcion que elegiste."

puntos++
estado = "Correcto"

}
else{

document.getElementById("resultado2").innerHTML = "nada"

estado = "Incorrecto"

}

resultados.push({

pregunta: "¿Cuánto te amo?",
respuesta: textoRespuesta,
correcta: "Todas",
estado: estado

})

document.getElementById("sig2").style.display = "inline-block"
respondido = false

}
function responder3(respuesta){
if(document.getElementById("sig3").style.display === "inline-block") return
let textoRespuesta
let estado

textoRespuesta = respuesta

if(respuesta == "Pizza"){

document.getElementById("resultado3").innerHTML = "❤️ Tii amorr muy bien."
puntos++
estado = "Correcto"

}
else{

document.getElementById("resultado3").innerHTML = "❌ Como no vas a saberr amorr, muuyy mal."
estado = "Incorrecto"

}

resultados.push({

pregunta: "¿Cuál es mi comida favorita?",
respuesta: textoRespuesta,
correcta: "Pizza",
estado: estado

})

document.getElementById("sig3").style.display = "inline-block"
respondido = false

}
function responder4(respuesta){
if(document.getElementById("sig4").style.display === "inline-block") return
let textoRespuesta
let estado

textoRespuesta = respuesta

if(respuesta == "Obvio que si" || respuesta == "Hasta que me muera" || respuesta == "Sin dudarlo para toda la vida"){

document.getElementById("resultado4").innerHTML = "❤️ TE RE MIL AMOO AMORRR DE MI VIDA."
puntos++
estado = "Correcto"

}
else{

document.getElementById("resultado4").innerHTML = "❌ Como vas a responder que si nomas amorrr, re mal bebe."
estado = "Incorrecto"

}
resultados.push({

pregunta: "¿Queres estar conmigo para siempre?",
respuesta: textoRespuesta,
correcta: "Todas",
estado: estado

})

document.getElementById("sig4").style.display = "inline-block"
respondido = false

}
function responder5(respuesta){
if(document.getElementById("sig5").style.display === "inline-block") return
let textoRespuesta
let estado

textoRespuesta = respuesta

if(respuesta == "Italia"){

document.getElementById("resultado5").innerHTML = "❤️ Muyy bien amor, es lo que mas quiero, vivir con vos en Italia."
puntos++
estado = "Correcto"

}
else{

document.getElementById("resultado5").innerHTML = "❌ Amoorrr, es obvio que era Italia."
estado = "Incorrecto"

}
resultados.push({

pregunta: "¿Dónde me gustaría vivir?",
respuesta: textoRespuesta,
correcta: "Italia",
estado: estado

})

document.getElementById("sig5").style.display = "inline-block"
respondido = false

}
function responder6(respuesta){
if(document.getElementById("sig6").style.display === "inline-block") return
let textoRespuesta
let estado

textoRespuesta = respuesta

if(respuesta == "Tu humor"){

document.getElementById("resultado6").innerHTML = "❤️ Re bienn bebe, amo tu humor, es lo que mas me encanta de vos."
puntos++
estado = "Correcto"

}
else{

document.getElementById("resultado6").innerHTML = "❌ No amoorrrr, me re gustan las otras cosas pero me gusta mas tu humor mi cielito."
estado = "Incorrecto"

}
resultados.push({

pregunta: "¿Qué me gusta mas de tu personalidad?",
respuesta: textoRespuesta,
correcta: "Tu humor",
estado: estado

})

document.getElementById("sig6").style.display = "inline-block"
respondido = false

setTimeout(() => {
  document.getElementById("sig6").scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}, 200);

}
function responder7(respuesta){
if(document.getElementById("sig7").style.display === "inline-block") return
let textoRespuesta
let estado

textoRespuesta = respuesta

if(respuesta == "Transformers"){

document.getElementById("resultado7").innerHTML = "❤️ Bienn amorcito, imposible que respondas mal esta, me lo mire como 500 mil veces."
puntos++
estado = "Correcto"

}
else{

document.getElementById("resultado7").innerHTML = "❌ Amorrr, es re obvio que era Transformers."
estado = "Incorrecto"

}
resultados.push({

pregunta: "¿Cuál es mí pelicula favorita?",
respuesta: textoRespuesta,
correcta: "Transformers",
estado: estado

})

document.getElementById("sig7").style.display = "inline-block"
respondido = false

}
function responder8(respuesta){
if(document.getElementById("sig8").style.display === "inline-block") return
let textoRespuesta
let estado

textoRespuesta = respuesta

if(respuesta == "Naruto"){

document.getElementById("resultado8").innerHTML = "❤️ Aham amor bien, te amo."
puntos++
estado = "Correcto"

}
else{

document.getElementById("resultado8").innerHTML = "❌ Amoorrr, claramente era Naruto bebee, me lo mire como 4 veces amorrr."
estado = "Incorrecto"

}
resultados.push({

pregunta: "¿Cuál anime mire más veces?",
respuesta: textoRespuesta,
correcta: "Naruto",
estado: estado

})

document.getElementById("sig8").style.display = "inline-block"
respondido = false

setTimeout(() => {
  document.getElementById("sig8").scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}, 200);

}
function responder9(respuesta){
if(document.getElementById("finalBtn").style.display === "inline-block") return
let textoRespuesta
let estado

textoRespuesta = respuesta

if(respuesta == "Tus piernas"){

document.getElementById("resultado9").innerHTML = "❤️ Sii amorr muy bien, obviamente tus piernas es lo que mas me gusta de vos amore mio."
puntos++
estado = "Correcto"

}
else{

document.getElementById("resultado9").innerHTML = "❌ Amoorrrr, tus piernas me gustan mas, igual sea lo que sea que hayas respondido, me encanta también, te amo."
estado = "Incorrecto"

}
resultados.push({

pregunta: "¿Qué parte de tu cuerpo me gusta mas?",
respuesta: textoRespuesta,
correcta: "Tus piernas",
estado: estado

})

document.getElementById("finalBtn").style.display = "inline-block"
respondido = false

setTimeout(() => {
  document.getElementById("finalBtn").scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}, 200);

}
function mostrarFinal(){

  // 🔥 subir arriba INSTANTÁNEO antes de mostrar
  window.scrollTo({
    top: 0,
    behavior: "instant"
  });

  // ocultar pregunta
  document.getElementById("pregunta9").style.display = "none"

  // mostrar final
  const final = document.getElementById("final")

  // 🔥 evitar glitch visual
  final.style.visibility = "hidden"
  final.style.display = "block"

  // 🔥 ahora sí lo mostrás ya bien posicionado
  requestAnimationFrame(() => {
    final.style.visibility = "visible"
  })

  mostrarResultados()
}

function mostrarResultados(){

detenerCorazones()

let html = "<h2>Resultados del juego ❤️</h2>"

let totalPreguntas = resultados.length

html += "<h3>Puntos: " + puntos + " / " + totalPreguntas + "</h3>"

let mensaje = ""

if(puntos == totalPreguntas){
mensaje = "💖 AMORRR te amooo, respondiste todo bien, que capa que sos amor."
}
else if(puntos >= totalPreguntas * 0.7){
mensaje = "💖 AMORR te amo, respondiste casi todo bien, te re amo preciosa."
}
else if(puntos >= totalPreguntas * 0.4){
mensaje = "💖 Amorrr medio mal pero bueno, aunque no hayas respondido todo bien te amo igual pero vas a tener que estudiar mas de mi amorr."
}
else{
mensaje = "💖 Amorrrr re mall bebe, pero te amo tanto tanto igual amor, vas a tener que estudiar mucho de mi nomás después amor."
}
html += "<p style='font-size:30px'>" + mensaje + "</p>"

html += "<h3 style='margin-top:30px'>❤️ Gracias por jugar amor de mi vida ❤️</h3>"

for(let i = 0; i < resultados.length; i++){

html += "<p><b>Pregunta:</b> " + resultados[i].pregunta + "</p>"

html += "<p>Tu respuesta: " + resultados[i].respuesta + "</p>"

html += "<p>Respuesta correcta: " + resultados[i].correcta + "</p>"

html += "<p>Resultado: " + resultados[i].estado + "</p>"

html += "<hr>"

}

html += "<button onclick='abrirCarta()'>💌 Abrir carta</button>"


document.getElementById("contenidoFinal").innerHTML = html


}
function crearCorazonFondo(){

let corazon = document.createElement("div")

corazon.innerHTML = "❤️"

corazon.classList.add("corazon-fondo")

corazon.style.left = Math.random()*100 + "vw"

if(window.matchMedia("(hover: none)").matches){

// 📱 CELULAR
corazon.style.fontSize = (Math.random()*15 + 60) + "px"

}else{

// 💻 PC
corazon.style.fontSize = (Math.random()*25 + 35) + "px"

}

corazon.style.animationDuration = (Math.random()*5 + 5) + "s"


let yaExplotado = false

function explotarCorazon(corazon){
  if(yaExplotado) return
  yaExplotado = true

  let rect = corazon.getBoundingClientRect()

  let x = rect.left + rect.width/2
  let y = rect.top + rect.height/2

  explosionMiniCorazones(x,y)

  corazon.remove()
}

// 🔥 DETECTAR SI ES CELULAR
const esMobile = "ontouchstart" in window

if(esMobile){

  corazon.addEventListener("touchstart", (e) => {
    e.preventDefault()
    explotarCorazon(corazon)
  }, { passive: false })

}else{

  corazon.addEventListener("click", () => {
    explotarCorazon(corazon)
  })

}


document.body.appendChild(corazon)

setTimeout(function(){
corazon.remove()
},25000)

}
function explosionMiniCorazones(x,y){

for(let i=0;i<10;i++){

let mini = document.createElement("div")

mini.innerHTML = "❤️"

mini.style.position = "fixed"
mini.style.left = x + "px"
mini.style.top = y + "px"
mini.style.fontSize = "16px"
mini.style.pointerEvents = "none"

let angulo = Math.random()*360
let distancia = Math.random()*80 + 40

mini.animate([

{transform:"translate(0,0)",opacity:1},

{transform:"translate("+
Math.cos(angulo*Math.PI/180)*distancia+"px,"+
Math.sin(angulo*Math.PI/180)*distancia+"px)",opacity:0}

],{duration:600})

document.body.appendChild(mini)

setTimeout(()=>{
mini.remove()
},600)

}

}

function abrirCarta(){
detenerCorazones();

document.getElementById("pagina").style.display = "none"

document.getElementById("carta").style.display = "flex"

}

let intervaloCorazones = null

function iniciarCorazones(){

if(intervaloCorazones == null){

crearCorazonFondo();

intervaloCorazones = setInterval(crearCorazonFondo, 850)

}

}

function detenerCorazones(){

clearInterval(intervaloCorazones)

intervaloCorazones = null

document.querySelectorAll(".corazon-fondo").forEach(c => c.remove());

}

function abrirSobre(){

document.querySelector(".sobre").classList.add("abrir")

}
function contadorDias(){

let inicio = new Date("2025-10-31")  // CAMBIA ESTA FECHA

let hoy = new Date()

let diferencia = hoy - inicio

let dias = Math.floor(diferencia / (1000*60*60*24))

document.getElementById("contadorDias").innerHTML =
"❤️ Llevamos " + dias + " días juntos ❤️"

}

contadorDias()
function escribirTexto(elemento,texto,velocidad){

let i = 0

function escribir(){

if(i < texto.length){

elemento.innerHTML += texto.charAt(i)

i++

setTimeout(escribir,velocidad)

}

}

escribir()

}