// js/impuestos.js

let impuestos = [];

document.getElementById("impuestosForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const mes = document.getElementById("mes").value;
  const ingresos = parseFloat(document.getElementById("ingresos").value);
  const egresos = parseFloat(document.getElementById("egresos").value);

  // Supongamos que impuestos = (Ingresos - Egresos) * 16% (IVA simulado)
  const base = ingresos - egresos;
  const impuestoCalculado = base > 0 ? base * 0.16 : 0;

  const registro = {
    mes,
    ingresos,
    egresos,
    impuestoCalculado,
    estado: "Pendiente"
  };

  impuestos.push(registro);
  mostrarImpuestos();
  this.reset();
});

function mostrarImpuestos() {
  const tbody = document.querySelector("#tablaImpuestos tbody");
  tbody.innerHTML = "";

  impuestos.forEach((i, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${i.mes}</td>
      <td>$${i.ingresos.toFixed(2)}</td>
      <td>$${i.egresos.toFixed(2)}</td>
      <td><strong>$${i.impuestoCalculado.toFixed(2)}</strong></td>
      <td>
        <select onchange="cambiarEstadoImpuesto(${index}, this.value)">
          <option ${i.estado==="Pendiente"?"selected":""}>Pendiente</option>
          <option ${i.estado==="Documentado"?"selected":""}>Documentado</option>
          <option ${i.estado==="Calculado"?"selected":""}>Calculado</option>
          <option ${i.estado==="Formatos Listos"?"selected":""}>Formatos Listos</option>
          <option ${i.estado==="Pagado"?"selected":""}>Pagado</option>
        </select>
      </td>
      <td><button onclick="eliminarImpuesto(${index})">🗑 Eliminar</button></td>
    `;

    tbody.appendChild(row);
  });
}

function cambiarEstadoImpuesto(index, nuevoEstado) {
  impuestos[index].estado = nuevoEstado;
  mostrarImpuestos();
}

function eliminarImpuesto(index) {
  impuestos.splice(index, 1);
  mostrarImpuestos();
}
