// js/pedidos.js

let pedidos = [];

document.getElementById("pedidoForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const pedido = {
    cliente: document.getElementById("cliente").value,
    telefono: document.getElementById("telefono").value,
    correo: document.getElementById("correo").value,
    producto: document.getElementById("producto").value,
    cantidad: document.getElementById("cantidad").value,
    fechaEntrega: document.getElementById("fechaEntrega").value,
    estado: "Pendiente"
  };

  pedidos.push(pedido);
  mostrarPedidos();
  this.reset();
});

function mostrarPedidos() {
  const tbody = document.querySelector("#tablaPedidos tbody");
  tbody.innerHTML = "";

  pedidos.forEach((p, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${p.cliente}</td>
      <td>${p.producto}</td>
      <td>${p.cantidad}</td>
      <td>${p.fechaEntrega}</td>
      <td>
        <select onchange="cambiarEstado(${index}, this.value)">
          <option ${p.estado==="Pendiente"?"selected":""}>Pendiente</option>
          <option ${p.estado==="Facturado"?"selected":""}>Facturado</option>
          <option ${p.estado==="Pagado"?"selected":""}>Pagado</option>
          <option ${p.estado==="Preparado"?"selected":""}>Preparado</option>
          <option ${p.estado==="Entregado"?"selected":""}>Entregado</option>
          <option ${p.estado==="Cerrado"?"selected":""}>Cerrado</option>
        </select>
      </td>
      <td><button onclick="eliminarPedido(${index})">🗑 Eliminar</button></td>
    `;

    tbody.appendChild(row);
  });
}

function cambiarEstado(index, nuevoEstado) {
  pedidos[index].estado = nuevoEstado;
  mostrarPedidos();
}

function eliminarPedido(index) {
  pedidos.splice(index, 1);
  mostrarPedidos();
}
