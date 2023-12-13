      document.addEventListener("DOMContentLoaded", function () {
        const inputMovimiento = document.getElementById("inputMovimiento");
        const inputReferencia = document.getElementById("inputReferencia");
        const botonEnviar = document.getElementById("botonEnviar");
    
        // Agrega event listeners a los inputs para verificar cuando se ingresa algo
        inputMovimiento.addEventListener("input", verificarInputs);
        inputReferencia.addEventListener("input", verificarInputs);
    
        function verificarInputs() {
          // Verifica si ambos inputs tienen datos
          if (inputMovimiento.value.trim() !== "" && inputReferencia.value.trim() !== "") {
            // Muestra el botón si ambos inputs tienen datos
            botonEnviar.style.display = "inline-block";
          } else {
            // Oculta el botón si algún input está vacío
            botonEnviar.style.display = "none";
          }
        }
      });

      
// Obtén referencia al input y al botón
const inputSaldoInicial = document.getElementById("inputSaldoInicial");
const botonEnviarInicial = document.getElementById("botonEnviarInicial");

// Agrega un evento de escucha para el evento "keydown" en el input
inputSaldoInicial.addEventListener("keydown", function (event) {
  // Verifica si la tecla presionada es "Enter"
  if (event.key === "Enter") {
    // Activa la función que maneja el envío del formulario
    botonEnviarInicial.style.display = "inline-block";
  }
});

// Agrega un evento de clic al botón "Enviar"
botonEnviarInicial.addEventListener("click", enviarFormulario);

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
