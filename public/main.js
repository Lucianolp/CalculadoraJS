var pantalla = document.getElementById("textoPantalla");
var x = "0"; //número en pantalla
var xi = 1; //1 cuando empieza a escribir un nuevo numero y 0 cuando añado cifras al numero existente
var coma = 0; //estado de coma decimal. Presente o ausente
var ni = 0; //primer numero
var op = "no"; //operación en curso
var estilosBtn = document.getElementById("estilosBtn");
var estilosPopup = document.getElementById("estilosPopup");
var cuerpo = document.getElementById("cuerpo");
var botonNumero = document.getElementsByClassName("botonNumero");
var botonLarge = document.getElementsByClassName("large");

//Service Worker
let swLocation = "sw.js";
if(navigator.serviceWorker){
  navigator.serviceWorker.register(swLocation);
}

//código de teclas
window.onload = function () {
  document.onkeydown = teclas;
};
//uso del teclado
function teclas(e) {
  ei = e || window.event;
  key = ei.keyCode;
  if (key > 47 && key < 58) {
    p = key - 48;
    p = String(p);
    numero(p);
  }
  if (key > 95 && key < 106) {
    p = key - 96;
    p = String(p);
    numero(p);
  }
  if (key == 110 || key == 190) {
    numero(".");
  }
  if (key == 106) {
    operar("*");
  }
  if (key == 107) {
    operar("+");
  }
  if (key == 109) {
    operar("-");
  }
  if (key == 111) {
    operar("/");
  }
  if (key == 32 || key == 13) {
    igualar();
  }
  if (key == 46) {
    borradoTotal();
  }
  if (key == 8) {
    retro();
  }
  if (key == 36) {
    borradoParcial();
  }
}
//funcion que toma el numero en pantalla como argumento
function numero(xx) {
  //primer dígito
  if (x == "0" || xi == 1) {
    pantalla.innerHTML = xx;
    x = xx;
    if (xx == ".") {
      pantalla.innerHTML = "0.";
      x = xx;
      coma = 1;
    }
  } else {
    //agregar dígito
    if (xx == "." && coma == 0) {
      pantalla.innerHTML += xx;
      x += xx;
      coma = 1;
    }
    //previene repetir coma
    else if (xx == "." && coma == 1) {
    }
    //agregar dígitos
    else {
      pantalla.innerHTML += xx;
      x += xx;
    }
  }
  xi = 0; //número iniciado
}

function operar(s) {
  igualar(); //si hay operaciones pendientes las resuelve al apretar el signo
  ni = x; //guardo primer numero
  op = s; //tipo de operación
  xi = 1;
}
function igualar() {
  if (op == "no") {
    //si no hay operación pendiente se muestra el mismo numero
    pantalla.innerHTML = x;
  } else {
    sl = ni + op + x;
    sol = eval(sl); //convertir cadena a código y resolver
    pantalla.innerHTML = sol;
    x = sol;
    op = "no";
    xi = 1;
  }
}
function raizc() {
  x = Math.sqrt(x);
  pantalla.innerHTML = x;
  op = "no";
  xi = 1;
}
function porcent() {
  x = x / 100;
  pantalla.innerHTML = x;
  igualar();
  op = "no";
  xi = 1;
}
function opuest() {
  nx = Number(x); //convierte a numero;
  nx = -nx;
  x = String(nx); //vuelvo a convertir a cadena
  pantalla.innerHTML = x;
}
function inve() {
  nx = Number(x);
  nx = 1 / nx;
  x = String(nx);
  pantalla.innerHTML = x;
  xi = 1;
}
//borrar último número escrito
function retro() {
  cifras = x.length;
  br = x.substring(cifras - 1, cifras); //encontrar último caracter
  x = x.substring(0, cifras - 1); //quitar el último
  if (x == "") {
    x = "0";
  } //si no hay más caracteres mostrar 0
  if (br == ".") {
    coma = 0;
  } //si quita la coma, se permite escribirla de nuevo
  pantalla.innerHTML = x;
}
function borradoParcial() {
  pantalla.innerHTML = 0;
  x = 0;
  coma = 0;
}
function borradoTotal() {
  pantalla.innerHTML = 0;
  x = "0";
  coma = 0;
  ni = 0;
  op = "no";
}
//ver estilos
estilosBtn.addEventListener("click", () => {
  if (estilosPopup.style.display === "none") {
    estilosPopup.style.display = "block";
  } else {
    estilosPopup.style.display = "none";
  }
});

//elegir estilos
function mostrarClasico() {
  cuerpo.classList.remove("moderno");
  estilosPopup.style.display = "none";
  for (let i = 0; i < botonNumero.length; i++) {
    botonNumero[i].classList.remove("botonModerno");
  }
  for (let i = 0; i < botonLarge.length; i++) {
    botonLarge[i].classList.remove("botonModernoLarge");
  }
}
function mostrarModerno() {
  estilosPopup.style.display = "none";
  cuerpo.classList.add("moderno");
  for (let i = 0; i < botonNumero.length; i++) {
    botonNumero[i].classList.add("botonModerno");
  }
  for (let i = 0; i < botonLarge.length; i++) {
    botonLarge[i].classList.add("botonModernoLarge");
  }
}
