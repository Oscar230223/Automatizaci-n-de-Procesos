// js/main.js
function cargarModulo(modulo) {
  fetch(`modules/${modulo}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById("main-content").innerHTML = html;
    });
}
