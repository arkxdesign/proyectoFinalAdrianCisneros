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
while (!nombreCompleto || nombreCompleto.length < 5) {
  nombreCompleto = prompt("Ingresa tu nombre");  
  if(nombreCompleto.length < 5){
    alert("Ingresa tu nombre completo ")
  }
}
console.log(`Bienvenido: ${nombreCompleto}`)

let saldoInicial;
while (!saldoInicial || isNaN(saldoInicial) || saldoInicial < 1) {
  saldoInicialFecha = new Fecha
  saldoInicialRef = "Saldo inicial";
  saldoInicial = parseFloat(prompt("Ingresa tu saldo inicial"));
  if (!saldoInicial) {
    alert("Ingresa una cantidad válida, por ejemplo: 1000");
  } else if(isNaN(saldoInicial) && saldoInicial > 1){
    saldoInicial;
  }
}
saldo = new Transaccion(saldoInicialFecha, saldoInicialRef, saldoInicial);
wallet.push(saldo);
alert(`Tu saldo inicial es de: ${saldoInicial.toFixed(2)} MXN`);
console.log(`Tu saldo inicial es de: ${saldoInicial.toFixed(2)} MXN`)
console.table(wallet);

function calcularTotal() {
  let saldo = 0;
  for (let movimientos of wallet) {
    saldo += movimientos.movimiento;
  }
  return saldo;
}

function buscarReferencia() {
  const referenciaBuscada = prompt("Buscar por referencia");
  const referenciaEncontrada = wallet.find(transaccion => transaccion.referencia.toLowerCase().includes(referenciaBuscada.toLowerCase()));

  if (referenciaEncontrada) {
    console.log("Transacción encontrada:");
    console.table(referenciaEncontrada)
  } else {
    console.log("No se encontró ninguna transacción con esa referencia.");
  }
}

function registrarTransaccion(monto) {
  movimientoFecha = new Fecha;
  movimientoReferencia = (prompt("Ingresa la referencia del movimiento"));
  while(!movimientoReferencia){
    movimientoReferencia = (prompt("Ingresa la referencia del movimiento"));
    if(!movimientoReferencia){
      alert("Ingresa una referencia, ejemplo: Ahorro semanal o Gasto en el super")
    } else if(movimientoReferencia.length < 5){
      movimientoReferencia = movimientoReferencia
    }
  }
  movimientos = new Transaccion(movimientoFecha, movimientoReferencia, monto);
  wallet.push(movimientos);
  saldo += monto;

  calcularTotal();

  alert(`Tu saldo actual es de: $${saldo.toFixed(2)} MXN`);
  console.log("Tu movimiento fue acreditado con exito!")
  console.log(`Tu saldo actual es de: $${saldo.toFixed(2)} MXN`)
  console.table(wallet)
}

function ingresarSaldo() {
  let ingresos;
  while (true) {
    ingresos = parseFloat(prompt("Ingresa el monto de ingresos"));
    if (!isNaN(ingresos) && ingresos > 0) {
      break;
    }
    alert("Ingresa una cantidad válida.");
  }
  registrarTransaccion(ingresos);
  
  console.log(`Tu deposito es de $ ${ingresos.toFixed(2)} MXN`)
}

function restarSaldo() {
  let egresos;
  saldo = calcularTotal(saldo);
  while (true) {
    egresos = parseFloat(prompt("Ingresa el monto de egresos"));
    if (!isNaN(egresos) && egresos > 0 && egresos <= saldo) {
      break;
    }
    alert(`Ingresa una cantidad válida, recuerda que tu saldo es de: $${saldo.toFixed(2)}MXN`);
  }
  registrarTransaccion(-egresos);
  
  console.log("Tu retiro es de $" + egresos.toFixed(2) + " MXN")
}

let nombre = nombreCompleto;
let ingresarMovimientos = true
saldo = calcularTotal(saldo);
while (ingresarMovimientos) {
  let walletMovimientos = prompt("Para INGRESOS escribe 0 para EGRESOS escribe 1 para SALIR escribe 2 o B para buscar por referencia")
  switch (walletMovimientos) {
    case "0":
      ingresarSaldo()
      break;
    case "1":
      restarSaldo()
      break;
    case "2":
      ingresarMovimientos = false;
      alert(`Gracias ${nombre}! Tu saldo final es de $ ${saldo.toFixed(2)} MXN`);
 
      console.log(`Gracias ${nombre}! Tu saldo final es de $ ${saldo.toFixed(2)} MXN`);
      break
    case "B":
      buscarReferencia()
      break  
    default:
      ingresarMovimientos = true;
      alert("Esta opción no esta disponible")

      console.log("Esta opción no esta disponible");
      break
  }
}