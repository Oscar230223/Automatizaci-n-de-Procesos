// js/nomina.js

let nomina = [];

document.getElementById("nominaForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const empleado = document.getElementById("empleado").value;
  const sueldo = parseFloat(document.getElementById("sueldo").value);
  const faltas = parseInt(document.getElementById("faltas").value) || 0;
  const retardos = parseInt(document.getElementById("retardos").value) || 0;
  const horasExtra = parseInt(document.getElementById("horasExtra").value) || 0;

  // Descuentos: suponemos que cada falta descuenta 1 día (sueldo/6),
  // cada 3 retardos equivalen a 1 falta.
  const sueldoDiario = sueldo / 6;
  const descuento = (faltas + Math.floor(retardos / 3)) * sueldoDiario;

  // Fórmula de horas extra del documento
  const pagoExtra = (sueldo / 48) * 2 * horasExtra;

  const neto = sueldo - descuento + pagoExtra;

  const registro = {
    empleado,
    sueldo,
    faltas,
    retardos,
    horasExtra,
    neto,
    estado: "Pendiente"
  };

  nomina.push(registro);
  mostrarNomina();
  this.reset();
});

function mostrarNomina() {
  const tbody = document.querySelector("#tablaNomina tbody");
  tbody.innerHTML = "";

  nomina.forEach((n, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${n.empleado}</td>
      <td>$${n.sueldo.toFixed(2)}</td>
      <td>${n.faltas}</td>
      <td>${n.retardos}</td>
      <td>${n.horasExtra}</td>
      <td><strong>$${n.neto.toFixed(2)}</strong></td>
      <td>
        <select onchange="cambiarEstadoNomina(${index}, this.value)">
          <option ${n.estado==="Pendiente"?"selected":""}>Pendiente</option>
          <option ${n.estado==="Revisada"?"selected":""}>Revisada</option>
          <option ${n.estado==="Autorizada"?"selected":""}>Autorizada</option>
          <option ${n.estado==="Pagada"?"selected":""}>Pagada</option>
        </select>
      </td>
      <td><button onclick="eliminarRegistro(${index})">🗑 Eliminar</button></td>
    `;

    tbody.appendChild(row);
  });
}

function cambiarEstadoNomina(index, nuevoEstado) {
  nomina[index].estado = nuevoEstado;
  mostrarNomina();
}

function eliminarRegistro(index) {
  nomina.splice(index, 1);
  mostrarNomina();
}
