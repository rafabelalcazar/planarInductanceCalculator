// Author: Rafael Alejandro Belalcázar Burbano

// Formula 1
const c1 = 1.07;
const c2 = 2.29;
const c3 = 0;
const c4 = 3.55;
const permeabilidad = 1.256637061 / 1000000;

// Formula 2
const beta = 1.33 / 1000;
const a1 = -1.21;
const a2 = -0.163;
const a3 = 2.43;
const a4 = 1.75;
const a5 = -0.049;
const micro = 1000000;
console.log(beta, a1, a2, a3, a4, a5);

var inductor = document.getElementById("result");
var inductor2 = document.getElementById("result2");
// var freq = document.getElementById("freq").value;

// SLIDER D_OUT
var dout = document.getElementById("myRange");
var d_outText = document.getElementById("d_out");
var z_in = document.getElementById("impedance");
d_outText.innerHTML = dout.value; // Display the default slider value

function davgFinal() {
  //   var numerador = parseFloat(dout.value) - parseFloat(din.value);
  //   var denomidador = parseFloat(dout.value) + parseFloat(din.value);
  return (parseFloat(dout.value / micro) + parseFloat(din.value / micro)) * 0.5;
}

// Update the current slider value (each time you drag the slider handle)
dout.oninput = function () {
  d_outText.innerHTML = this.value;
  //   console.log(davgFinal());
  calcInductor();
};

// SLIDER d_in
var din = document.getElementById("mydin");
var d_inText = document.getElementById("din");
d_inText.innerHTML = din.value;

din.oninput = function () {
  d_inText.innerHTML = this.value;
  calcInductor();
  //   console.log(davgFinal());
};

// SLIDER WIDTH
var w = document.getElementById("myWidth");
var wText = document.getElementById("w");
wText.innerHTML = w.value;

w.oninput = function () {
  wText.innerHTML = this.value;
  calcInductor();
};

// SLIDER Numero de Vueltas
var n = document.getElementById("n_vueltas");
var nText = document.getElementById("n_text");
nText.innerHTML = nVueltas(n.value);

n.oninput = function () {
  nText.innerHTML = nVueltas(this.value);
  calcInductor();
};

// SLIDER s: Spacing
var s = document.getElementById("s");
var sText = document.getElementById("s_text");
sText.innerHTML = s.value;

s.oninput = function () {
  sText.innerHTML = this.value;
  calcInductor();
};

// SLIDER f:frecuencia
var f = document.getElementById("f");
var fText = document.getElementById("f_text");
fText.innerHTML = f.value / 10;

f.oninput = function () {
  fText.innerHTML = this.value / 10;
  calcInductor();
};

function nVueltas(vueltas) {
  return vueltas / 10;
}

function calcInductor() {
  let d_out = parseFloat(dout.value / micro);
  let d_in = parseFloat(din.value / micro);
  let width = parseFloat(w.value / micro);
  let vueltas = nVueltas(parseFloat(n.value));
  let spacing = parseFloat(s.value / micro);
  let freq = parseFloat(f.value / 10);
  let omega = 2 * Math.PI * freq * 1000000000;
  let p = (d_out - d_in) / (d_out + d_in);
  var L =
    beta *
    Math.pow(d_out, a1) *
    Math.pow(width, a2) *
    Math.pow(davgFinal(), a3) *
    Math.pow(vueltas, a4) *
    Math.pow(spacing, a5);
  // inductor.innerHTML = L*Math.pow(10,9);
  z_in.innerHTML = L * omega;
  
  var L2 =
  0.5 *
  permeabilidad *
  Math.pow(vueltas, 2) *
  davgFinal() *
  c1 *
  (Math.log(c2 / p) + c3 * Math.pow(p, 2));
  inductor2.innerHTML = L2*Math.pow(10,9)
  console.log(L2);
}
// SLIDER s
// var slider_s = document.getElementById("mydin");
// var s = document.getElementById("din");
// s.innerHTML = slider_s.value;

// slider_s.oninput = function () {
//   s.innerHTML = this.value;
// };

// const calcularInd = (d_out, w, d_avg, n, s) => {
//   const inductor = beta * Math.pow(d_out, a1);
//   console.log(inductor);
// };
