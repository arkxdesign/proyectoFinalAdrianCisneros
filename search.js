// //  Definición de la clase Fecha, que representa la fecha actual
// class Fecha {
//     constructor() {
//       this.fecha = new Date().toLocaleString();
//     }
//   }
  
//   // Definición de la clase Transaccion que hereda de Fecha
//   class Transaccion extends Fecha {
//     constructor(fecha, referencia, movimiento) {
//       super(fecha); // Llama al constructor de la clase padre (Fecha)
//       this.referencia = referencia; // Referencia de la transacción
//       this.movimiento = movimiento; // Monto de la transacción
//     }
//   }
  
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
                                        <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#movimientosModal" onclick="{redirectToIndex()}">INICIO</button>
                                        <button type="button" class="btn btn-outline-secondary" onclick="{buscarReferencia()}">BUSCAR</button>
                                        <button type="button" class="btn btn-outline-secondary"><a href="logout.html">SALIR</a></button>
                                      </div>
                                    </div>`;
    bienvenidoUsuarioSaldo.appendChild(tituloSaldoInicial);
    
    let containerBuscar = document.getElementById("buscar");
    const buscador = document.createElement("div");
    buscador.innerHTML = `<form id="buscarForm">
                            <div class="modal-body">
                              <label for="inputReferenciaBuscar">Referencia:</label>
                              <input class="form-control" type="text" id="inputReferenciaBuscar" style="width: 100%;" required>
                            </div>
                            <div class="modal-footer">
                              <button type="submit" class="btn btn-secondary mt-2" onclick="{buscarReferencia()}">Busca referencia</button>
                            </div>
                          </form>`
    containerBuscar.appendChild(buscador);
  } else {
    const tituloNombre = document.createElement("div");
    const inputNombre = document.createElement("input");
    inputNombre.classList.add("form-control");
    tituloNombre.innerHTML = `<h5>Ingresa tu nombre completo</h5>`;
    bienvenidoUsuario.appendChild(tituloNombre);
    bienvenidoUsuario.appendChild(inputNombre);
  
    inputNombre.addEventListener("keydown", function(event){
      if (event.key === "Enter") {
        const nombreCompleto = inputNombre.value.trim();
        if (nombreCompleto.length >= 5) {
          // Se almacena el nombre en el localStorage con la clave "nombre"
          localStorage.setItem("nombre", JSON.stringify(nombreCompleto)); 
          const registroUsuarioBienvenida = document.createElement("div");
          registroUsuarioBienvenida.innerHTML = `<h5>Bienvenido:</h5>
                            <h3>${nombreCompleto}</h3>`;
          bienvenidoUsuario.innerHTML = "";
          bienvenidoUsuario.appendChild(registroUsuarioBienvenida);
          verificarSaldoInicial()        
        } else {
          swal("Ingresa un nombre completo válido (mínimo 5 caracteres).");
        }
      }
    })
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
  
// Función para buscar por referencia
function buscarReferencia() {
    let referenciaBusca = document.getElementById("buscarForm");
    referenciaBusca.addEventListener("submit", function (event) {
      event.preventDefault();
  
      // Limpiar resultados anteriores
      let movimientosWallet = document.getElementById("buscaResultadoResultado");
      movimientosWallet.innerHTML = "";
  
      let referenciaInput = document.getElementById("inputReferenciaBuscar");
      let referenciaBuscada = referenciaInput.value.trim();
  
      const transaccionesEncontradas = wallet.filter(
        transaccion => transaccion.referencia.toLowerCase().includes(referenciaBuscada.toLowerCase())
      );
  
      if (transaccionesEncontradas.length > 0) {
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
        transaccionesEncontradas.forEach((movimiento) => {
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
        swal("No se encontraron transacciones con esa referencia.");
      }
    });
  }

  function redirectToIndex() {
    window.location.href = 'index.html';
  }