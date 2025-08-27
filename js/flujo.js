// js/flujo.js

let movimientos = [];
let chart;

// Registrar movimiento
document.getElementById("flujoForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const fecha = document.getElementById("fecha").value;
  const concepto = document.getElementById("concepto").value;
  const monto = parseFloat(document.getElementById("monto").value);
  const tipo = document.getElementById("tipo").value;

  const movimiento = { fecha, concepto, monto, tipo };
  movimientos.push(movimiento);

  mostrarMovimientos();
  actualizarSaldo();
  actualizarGrafica();

  this.reset();
});

// Mostrar movimientos en tabla
function mostrarMovimientos() {
  const tbody = document.querySelector("#tablaFlujo tbody");
  tbody.innerHTML = "";

  movimientos.forEach((m, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${m.fecha}</td>
      <td>${m.concepto}</td>
      <td>${m.tipo}</td>
      <td>$${m.monto.toFixed(2)}</td>
      <td><button onclick="eliminarMovimiento(${index})">🗑 Eliminar</button></td>
    `;
    tbody.appendChild(row);
  });
}

// Calcular saldo
function actualizarSaldo() {
  let saldo = 0;
  movimientos.forEach(m => {
    saldo += m.tipo === "Ingreso" ? m.monto : -m.monto;
  });
  document.getElementById("saldo").textContent = `$${saldo.toFixed(2)}`;
}

// Eliminar movimiento
function eliminarMovimiento(index) {
  movimientos.splice(index, 1);
  mostrarMovimientos();
  actualizarSaldo();
  actualizarGrafica();
}

// Actualizar gráfica
function actualizarGrafica() {
  const ctx = document.getElementById("graficoFlujo").getContext("2d");

  const fechas = movimientos.map(m => m.fecha);
  let saldoAcumulado = 0;
  const saldos = movimientos.map(m => {
    saldoAcumulado += m.tipo === "Ingreso" ? m.monto : -m.monto;
    return saldoAcumulado;
  });

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: fechas,
      datasets: [{
        label: "Evolución del Saldo",
        data: saldos,
        borderColor: "blue",
        fill: false,
        tension: 0.2
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}
