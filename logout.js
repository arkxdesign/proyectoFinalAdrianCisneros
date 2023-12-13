// Se obtiene el nombre almacenado en el localStorage con la clave "nombre"
let nombreCompletoLocalStorageExtraer = localStorage.getItem("nombre");
let nombreCompletoLocalStorage = JSON.parse(nombreCompletoLocalStorageExtraer)
let graciasUsuario = document.getElementById("despedidaUsuario")
// Si el nombre está almacenado, se muestra un mensaje de bienvenida
if (nombreCompletoLocalStorage) {
  const graciasDeNuevo = document.createElement("div");
  graciasDeNuevo.innerHTML= `<h5>Gracias! te esperamos pronto :)</h5>
                   <h3>${nombreCompletoLocalStorage}</h3>`
  graciasUsuario.appendChild(graciasDeNuevo);
  
  let hastaPronto = document.getElementById("despedidaUsuarioMenu");
  const tituloHastaPronto = document.createElement("div");
  tituloHastaPronto.innerHTML = `<h5>Sigue administrando tus ahorros!</h5>
                                  <div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups" style="justify-content: center">
                                    <div class="btn-group me-2" role="group" aria-label="First group">
                                      <button type="button" class="btn btn-outline-secondary"><a href="index.html">INGRESA DE NUEVO A TU WALLET</a></button>
                                      <button type="button" class="btn btn-outline-secondary" onclick="{eliminarWallet()}"><a href="index.html">ELIMINAR WALLET</a></button>
                                    </div>
                                  </div>`;
  hastaPronto.appendChild(tituloHastaPronto);
}

function eliminarWallet() {
  localStorage.clear("wallet");
}
