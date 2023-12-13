//  Definición de la clase Fecha, que representa la fecha actual
class Fecha {
  constructor() {
    this.fecha = new Date().toLocaleString();
  }
}

// Definición de la clase Transaccion que hereda de Fecha
class Transaccion extends Fecha {
  constructor(fecha, referencia, movimiento) {
    super(fecha); // Llama al constructor de la clase padre (Fecha)
    this.referencia = referencia; // Referencia de la transacción
    this.movimiento = movimiento; // Monto de la transacción
  }
}

// Se obtiene el contenido almacenado en el localStorage con la clave "wallet"
let walletLocalStorage = localStorage.getItem("wallet");
// Se parsea el contenido a JSON para obtener un array de movimientos
let walletMovimientos = JSON.parse(walletLocalStorage);

// Se inicializan las variables 'saldo' y 'wallet'
let saldo, wallet;

// Si hay movimientos almacenados, se cargan en el programa
if (walletMovimientos) {
  // Se recorren los movimientos para obtener el último saldo
  walletMovimientos.forEach(movimiento => {
    saldo = parseFloat(movimiento.movimiento);
    wallet = walletMovimientos;
  });
  // Se recalcula el saldo total
  saldo = calcularTotal(saldo);
} else {
  // Si no hay movimientos almacenados, se inicializa el saldo en cero y 'wallet' como un array vacío
  saldo = 0;
  wallet = [];
}

// Se obtiene el nombre almacenado en el localStorage con la clave "nombre"
let nombreCompletoLocalStorageExtraer = localStorage.getItem("nombre");
let nombreCompletoLocalStorage = JSON.parse(nombreCompletoLocalStorageExtraer)
let bienvenidoUsuario = document.getElementById("bienvenidoUsuario")
// Si el nombre está almacenado, se muestra un mensaje de bienvenida
if (nombreCompletoLocalStorage) {
  const bienvenidoDeNuevo = document.createElement("div")
  bienvenidoDeNuevo.innerHTML= `<h5>Bienvenido de nuevo:</h5>
                   <h3>${nombreCompletoLocalStorage}</h3>`
  bienvenidoUsuario.appendChild(bienvenidoDeNuevo)
  
  let bienvenidoUsuarioSaldo = document.getElementById("bienvenidoUsuario");
  const tituloSaldoInicial = document.createElement("div");
  tituloSaldoInicial.innerHTML = `<h5>Tu saldo es de:</h5>
                                  <h3>$ ${saldo.toFixed(2)} MXN</h3>
                                  <div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups" style="justify-content: center">
                                    <div class="btn-group me-2" role="group" aria-label="First group">
                                      <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#movimientosModal" onclick="{ingresarSaldo()}">INGRESOS</button>
                                      <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#movimientosModal" onclick="{restarSaldo()}">EGRESOS</button>
                                      <button type="button" class="btn btn-outline-secondary" onclick="{redirectToSearch()}">BUSCAR</button>
                                      <button type="button" class="btn btn-outline-secondary"><a href="logout.html">SALIR</a></button>
                                    </div>
                                  </div>`;
  bienvenidoUsuarioSaldo.appendChild(tituloSaldoInicial);

  let movimientosWallet = document.getElementById("wallet");
  
  const tablaMovimientos = document.createElement("table");
  tablaMovimientos.classList.add("table");
  
  const thead = document.createElement("thead");
  const trHead = document.createElement("tr");
  
  const thFecha = document.createElement("th");
  thFecha.scope = "col";
  thFecha.textContent = "Fecha";
  trHead.appendChild(thFecha);
  
  const thReferencia = document.createElement("th");
  thReferencia.scope = "col";
  thReferencia.textContent = "Referencia";
  trHead.appendChild(thReferencia);
  
  const thMovimiento = document.createElement("th");
  thMovimiento.scope = "col";
  thMovimiento.textContent = "Movimiento";
  trHead.appendChild(thMovimiento);
  
  thead.appendChild(trHead);
  tablaMovimientos.appendChild(thead);
  
  const tbody = document.createElement("tbody");
  
  // Iterar sobre cada elemento en el array
  wallet.forEach((movimiento) => {
    const tr = document.createElement("tr");
  
    const tdFecha = document.createElement("td");
    tdFecha.textContent = movimiento.fecha;
    tr.appendChild(tdFecha);
  
    const tdReferencia = document.createElement("td");
    tdReferencia.textContent = movimiento.referencia;
    tr.appendChild(tdReferencia);
  
    const tdMovimiento = document.createElement("td");
    tdMovimiento.innerHTML = `$ ${movimiento.movimiento.toFixed(2)} MXN`;
    tr.appendChild(tdMovimiento);
  
    tbody.appendChild(tr);
  });
  
  tablaMovimientos.appendChild(tbody);
  movimientosWallet.appendChild(tablaMovimientos);
  
} else {
  const tituloNombre = document.createElement("div");
  const inputNombre = document.createElement("input");
  inputNombre.classList.add("form-control");
  const btnSiguiente = document.createElement("button");
  btnSiguiente.type = "button";
  btnSiguiente.classList.add("btn", "btn-outline-secondary" ,"mt-2");
  btnSiguiente.textContent = "Siguiente";

  tituloNombre.innerHTML = `<h1>Bienvenido</h1>
                            <h5>Ingresa tu nombre completo</h5>`;
  bienvenidoUsuario.appendChild(tituloNombre);
  bienvenidoUsuario.appendChild(inputNombre);
  bienvenidoUsuario.appendChild(btnSiguiente);

  btnSiguiente.addEventListener("click", function () {
    const nombreCompleto = inputNombre.value.trim();
    if (nombreCompleto.length >= 5) {
      localStorage.setItem("nombre", JSON.stringify(nombreCompleto));
      const registroUsuarioBienvenida = document.createElement("div");
      registroUsuarioBienvenida.innerHTML = `<h5>Bienvenido:</h5>
                                            <h3>${nombreCompleto}</h3>`;
      bienvenidoUsuario.innerHTML = "";
      bienvenidoUsuario.appendChild(registroUsuarioBienvenida);
      verificarSaldoInicial();
    } else {
      swal("Ingresa un nombre completo válido (mínimo 5 caracteres).");
    }
  });

  inputNombre.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      btnSiguiente.click();
    }
  });
}

function verificarSaldoInicial() {
  // Se obtiene el saldo inicial almacenado en el localStorage con la clave "wallet"
  let saldoInicialLocalStorage = localStorage.getItem("wallet");
  let bienvenidoUsuarioSaldo = document.getElementById("bienvenidoUsuario");
  let inputSaldoInicial = document.getElementById("inputSaldoInicial")
  
  if (saldoInicialLocalStorage) {
    bienvenidoSaldo()
  } else {
    const tituloSaldoInicial = document.createElement("div");
    tituloSaldoInicial.innerHTML = `
    <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#saldoInicial">
    INGRESA TU SALDO INICIAL
    </button>
    `;
    bienvenidoUsuarioSaldo.appendChild(tituloSaldoInicial);
    // bienvenidoUsuarioSaldo.appendChild(inputSaldoInicial);    
    inputSaldoInicial.addEventListener("keydown", function(event){
      if (event.key === "Enter") {
        // Evitar la acción predeterminada del formulario al presionar Enter
        event.preventDefault();
    
        const inputSI = inputSaldoInicial.value.trim();
        const saldoInicial = parseFloat(inputSI);
    
        if (isNaN(saldoInicial) || saldoInicial <= 0) {
          swal("Ingresa una cantidad válida, por ejemplo: 1000");
        } else if (saldoInicial >= 1) {
          saldoInicialFecha = new Fecha();
          saldoInicialRef = "SALDO INICIAL";
          saldoInicial;
    
          // Se crea una nueva transacción con el saldo inicial y se agrega al array 'wallet'
          saldo = new Transaccion(saldoInicialFecha, saldoInicialRef, saldoInicial);
          wallet.push(saldo);
    
          // Se almacena 'wallet' en el localStorage con la clave "wallet"
          localStorage.setItem("wallet", JSON.stringify(wallet));
          swal(`Tu saldo inicial es de: ${saldoInicial.toFixed(2)} MXN`);
          setTimeout(() => {
            location.reload();
          }, 1000);
        }
      }
    });
    
  }
}

function enviarFormulario() {
  // Obtén el valor del saldo inicial
  const inputSI = inputSaldoInicial.value.trim();
  const saldoInicial = parseFloat(inputSI);

  // Verifica si el saldo inicial es válido
  if (isNaN(saldoInicial) || saldoInicial <= 0) {
    swal("Ingresa una cantidad válida, por ejemplo: 1000");
  } else if (saldoInicial >= 1) {
    // Crea una nueva transacción con el saldo inicial y agrégala al array 'wallet'
    saldoInicialFecha = new Fecha();
    saldoInicialRef = "SALDO INICIAL";
    saldoInicial;

    saldo = new Transaccion(saldoInicialFecha, saldoInicialRef, saldoInicial);
    wallet.push(saldo);

    // Almacena 'wallet' en el localStorage con la clave "wallet"
    localStorage.setItem("wallet", JSON.stringify(wallet));

    // Muestra un mensaje de éxito
    swal(`Tu saldo inicial es de: ${saldoInicial.toFixed(2)} MXN`);
    
    // Recarga la página después de un breve retraso
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
}


// Función de bienvenida y mostrar saldo
function bienvenidoSaldo() {
  const bienvenidoEsteEsTuSaldo = document.createElement("div");
    bienvenidoEsteEsTuSaldo.innerHTML= `<h5>Tu saldo es de:</h5>
                                        <h3>${saldo.toFixed(2)} MXN</h3>`
    bienvenidoUsuarioSaldo.appendChild(bienvenidoEsteEsTuSaldo);
}

// Función para calcular el saldo total sumando todos los movimientos
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
    return saldo;
  }
}

// Función para registrar una nueva transacción y actualizar el saldo
function registrarTransaccion(monto) {
  let referenciaInput = document.getElementById("inputReferencia");
  movimientoFecha = new Fecha();
  movimientoReferencia = referenciaInput.value.trim()
  movimientos = new Transaccion(movimientoFecha, movimientoReferencia, monto);
  wallet.push(movimientos);
  localStorage.setItem("wallet", JSON.stringify(wallet));
  saldo += monto;
  
  swal("Tu movimiento fue aplicado por $" + monto.toFixed(2) + " MXN");

  calcularTotal();

  setTimeout(() => {
    location.reload()
  },2000)
}

// Función para ingresar un monto como ingreso
function ingresarSaldo() {
  let ingresosModal = document.getElementById("movimientosForm");
  ingresosModal.addEventListener("submit", function(event) {
    event.preventDefault();

    let ingresosInput = document.getElementById("inputMovimiento");
    let referenciaInput = document.getElementById("inputReferencia");

    const inputIngreso = ingresosInput.value.trim();
    const ingresos = parseFloat(inputIngreso);
    const movimientoReferencia = referenciaInput.value.trim();
    
    if (!isNaN(ingresos) && ingresos > 0 && movimientoReferencia.length >= 1) {
      registrarTransaccion(ingresos);
      ingresosInput.value = "";
      referenciaInput.value = "";
    } else {
      swal("Ingresa una cantidad válida mayor a 0 y una referencia con al menos 1 caracter.");
    }
  });
}

// Función para ingresar un monto como egreso
function restarSaldo() {
    let egresosModal = document.getElementById("movimientosForm");
    egresosModal.addEventListener("submit", function(event) {
    event.preventDefault();
    
    let movimientosInput = document.getElementById("inputMovimiento");
    let referenciaInput = document.getElementById("inputReferencia");
    
    const inputIngreso = movimientosInput.value.trim();
    const egresos = parseFloat(inputIngreso);
    const movimientoReferencia = referenciaInput.value.trim();

    saldo = calcularTotal(saldo);
    
    if (!isNaN(egresos) && egresos > 0 && egresos <= saldo && saldo > 0 && movimientoReferencia.length >= 1) {
      registrarTransaccion(-egresos);
      movimientosInput.value = "";
      referenciaInput.value = "";
    } else {
      swal(`Ingresa una cantidad válida, recuerda que tu saldo es de: $${saldo.toFixed(2)} MXN`);
    }
  });
}

function redirectToSearch() {
  window.location.href = 'search.html';
}