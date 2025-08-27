// js/inventario.js

let inventario = [];

document.getElementById("entradaForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const equipo = document.getElementById("equipo").value;
  const factura = document.getElementById("factura").value;
  const fecha = document.getElementById("fechaFactura").value;
  const monto = parseFloat(document.getElementById("monto").value);
  const cantidad = parseInt(document.getElementById("cantidad").value);

  const registro = {
    equipo,
    factura,
    fecha,
    monto,
    cantidad,
    estado: "En stock"
  };

  inventario.push(registro);
  mostrarInventario();
  this.reset();
});

function mostrarInventario() {
  const tbody = document.querySelector("#tablaInventario tbody");
  tbody.innerHTML = "";

  inventario.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.equipo}</td>
      <td>${item.factura}</td>
      <td>${item.fecha}</td>
      <td>$${item.monto.toFixed(2)}</td>
      <td>${item.cantidad}</td>
      <td>
        <select onchange="cambiarEstadoInventario(${index}, this.value)">
          <option ${item.estado==="En stock"?"selected":""}>En stock</option>
          <option ${item.estado==="Reservado"?"selected":""}>Reservado</option>
          <option ${item.estado==="Entregado"?"selected":""}>Entregado</option>
        </select>
      </td>
      <td><button onclick="eliminarInventario(${index})">🗑 Eliminar</button></td>
    `;
    tbody.appendChild(row);
  });
}

function cambiarEstadoInventario(index, nuevoEstado) {
  inventario[index].estado = nuevoEstado;
  mostrarInventario();
}

function eliminarInventario(index) {
  inventario.splice(index, 1);
  mostrarInventario();
}
