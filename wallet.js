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

let walletLocalStorage = localStorage.getItem("wallet")
let walletMovimientos = JSON.parse(walletLocalStorage)
if (walletMovimientos){
  walletMovimientos.forEach(movimiento => {
    saldo = parseFloat(movimiento.movimiento);
    wallet = walletMovimientos
  });
    saldo = calcularTotal(saldo);
} else {
    saldo = 0;
    wallet = [];
}

let nombreCompleto;
let nombreCompletoLocalStorage = localStorage.getItem("nombre")
if(nombreCompletoLocalStorage){
  console.log(`Bienvenido de nuevo: ${nombreCompletoLocalStorage}`)    
} else {
  while (!nombreCompleto || nombreCompleto.length < 5) {
      nombreCompleto = prompt("Ingresa tu nombre");  
      if(nombreCompleto.length < 5){
        alert("Ingresa tu nombre completo ")
      } 
    localStorage.setItem("nombre", JSON.stringify(nombreCompleto))
  }
  console.log(`Bienvenido: ${nombreCompleto}`)
}

let saldoInicial;
let saldoInicialLocalStorage = localStorage.getItem("wallet");
if(saldoInicialLocalStorage){
  alert(`Bienvenido! ${nombreCompletoLocalStorage}, Tu saldo es de ${saldo.toFixed(2)} MXN`);
  console.log(`Tu saldo es de ${saldo.toFixed(2)} MXN`); 
  menu();
}else{
  while (!saldoInicial || isNaN(saldoInicial) || saldoInicial < 1) {
    saldoInicialFecha = new Fecha
    saldoInicialRef = "SALDO INICIAL";
    saldoInicial = parseFloat(prompt("Ingresa tu saldo inicial"));
    if (!saldoInicial) {
      alert("Ingresa una cantidad válida, por ejemplo: 1000");
    } else if(isNaN(saldoInicial) && saldoInicial > 1){
      saldoInicial;
    }
  }
  saldo = new Transaccion(saldoInicialFecha, saldoInicialRef, saldoInicial);
  wallet.push(saldo);
  localStorage.setItem("wallet", JSON.stringify(wallet))
  alert(`Tu saldo inicial es de: ${saldoInicial.toFixed(2)} MXN`);
  console.log(`Tu saldo inicial es de: ${saldoInicial.toFixed(2)} MXN`)
  console.table(wallet);
  menu();
}

function calcularTotal() {
  if (walletMovimientos) {
    let saldo = 0;
    for (let movimientos of walletMovimientos) {
      saldo += movimientos.movimiento;
    }
    return saldo;
  } else {
    let saldo = 0;
    for (let movimientos of wallet) {
      saldo += movimientos.movimiento;
    }
    return saldo
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
  localStorage.setItem("wallet", JSON.stringify(wallet))
  saldo += monto;
  
  calcularTotal();
  
  alert(`Tu saldo actual es de: $${saldo.toFixed(2)} MXN`);
  console.log("Tu movimiento fue acreditado con exito!")
  console.log(`Tu saldo actual es de: $${saldo.toFixed(2)} MXN`)
  console.table(wallet)
}

function ingresarSaldo() {
  let ingresos;

  ingresos = parseFloat(prompt("Ingresa el monto de ingresos"));
  if (!isNaN(ingresos) && ingresos > 0) {
    registrarTransaccion(ingresos);
    console.log(`Tu deposito es de $ ${ingresos.toFixed(2)} MXN`)
  } else {
    alert("Ingresa una cantidad válida.");
  }
}

function restarSaldo() {
  let egresos;
  saldo = calcularTotal(saldo);

  egresos = parseFloat(prompt("Ingresa el monto de egresos"));
  if (!isNaN(egresos) && egresos > 0 && egresos <= saldo && saldo > 0) {
    registrarTransaccion(-egresos);
    console.log(saldo)
    console.log("Tu retiro es de $" + egresos.toFixed(2) + " MXN")
  } else {
    alert(`Ingresa una cantidad válida, recuerda que tu saldo es de: $${saldo.toFixed(2)}MXN`);
  } 
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

function menu() {
  let nombre = nombreCompletoLocalStorage ? nombreCompletoLocalStorage : nombreCompleto;
  let ingresarMovimientos = true
  saldo = calcularTotal(saldo);
  while (ingresarMovimientos) {
  let walletMovimientos = prompt(
    "Selecciona una opción:\n" +
    "0 - INGRESOS\n" +
    "1 - EGRESOS\n" +
    "2 - SALIR\n" +
    "B - Buscar por referencia"
  );
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
}