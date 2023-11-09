let wallet = [];
let saldo = 0;

class Fecha {
  constructor() {
    this.fecha = new Date().toLocaleString();
  }
}

class Transaccion extends Fecha {
  constructor(fecha, referencia, movimiento) {
    super(fecha)
    this.referencia = referencia
    this.movimiento = movimiento
  }
}

let nombreCompleto;
while (true) {
  nombreCompleto = prompt("Ingresa tu nombre");
  if (nombreCompleto.length >= 1) {
    break;
  }
  alert("Ingresa tu nombre completo ")
}
console.log("Bienvenido: " + nombreCompleto)

let saldoInicial;
while (true) {
  saldoInicialFecha = new Fecha
  saldoInicialRef = "Saldo inicial";
  saldoInicial = parseFloat(prompt("Ingresa tu saldo inicial"));
  if (!isNaN(saldoInicial) && saldoInicial >= 1) {
    break;
  }
  alert("Ingresa una cantidad válida, por ejemplo: 1000");
}

saldo = new Transaccion(saldoInicialFecha, saldoInicialRef, saldoInicial);
wallet.push(saldo);
alert(`Tu saldo inicial es de: ${saldoInicial.toFixed(2)} MXN`);
console.log(`Tu saldo inicial es de: ${saldoInicial.toFixed(2)} MXN`)
console.log(wallet)

function calcularTotal() {
  let saldo = 0;
  for (let movimientos of wallet) {
    saldo += movimientos.movimiento;
  }
  return saldo;
}

function registrarTransaccion(monto) {
  saldo = calcularTotal(saldo);
  movimientoFecha = new Fecha;
  movimientoReferencia = (prompt("Ingresa la referencia del movimiento"));
  movimientos = new Transaccion(movimientoFecha, movimientoReferencia, monto);
  wallet.push(movimientos);
  saldo += monto;

  calcularTotal();
  alert(`Tu saldo actual es de: $${saldo.toFixed(2)} MXN`);
  console.log("Tu movimiento fue acreditado con exito!")
  console.log(`Tu saldo actual es de: $${saldo.toFixed(2)} MXN`)
  console.log(wallet)
}

function ingresarSaldo() {
  let ingresos;
  while (true) {
    ingresos = parseFloat(prompt("Ingresa el monto de ingresos"));
    if (!isNaN(ingresos) && ingresos >= 0) {
      break;
    }
    alert("Ingresa una cantidad válida.");
  }
  console.log(`Tu deposito es de $ ${ingresos.toFixed(2)} MXN`)
  registrarTransaccion(ingresos);
}

function restarSaldo() {
  let egresos;
  saldo = calcularTotal(saldo);
  while (true) {
    egresos = parseFloat(prompt("Ingresa el monto de egresos"));
    if (!isNaN(egresos) && egresos >= 0 && egresos <= saldo) {
      break;
    }
    alert(`Ingresa una cantidad válida, recuerda que tu saldo es de: $${saldo.toFixed(2)}MXN`);
  }
  console.log("Tu retiro es de $" + egresos.toFixed(2) + " MXN")
  registrarTransaccion(-egresos);
}

let nombre = nombreCompleto;
let ingresarMovimientos = true
saldo = calcularTotal(saldo);
while (ingresarMovimientos) {
  let walletMovimientos = prompt("Para INGRESOS escribe 0 para EGRESOS escribe 1 para SALIR escribe 2")
  switch (walletMovimientos) {
    case "0":
      ingresarSaldo()
      break;
    case "1":
      restarSaldo()
      break;
    case "2":
      alert(`Gracias ${nombre}! Tu saldo final es de $ ${saldo.toFixed(2)} MXN`);
      console.log(`Gracias ${nombre}! Tu saldo final es de $ ${saldo.toFixed(2)} MXN`);
      ingresarMovimientos = false;
      break
    default:
      ingresarMovimientos = true;
      alert("Esta opción no esta disponible")
      break
  }
}