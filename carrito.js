//Se guarda en una variable todos los elementos que pertenezcan a la clase "agregarProducto" (todos los botones)
const botonesComprar = document.querySelectorAll(`.agregarProducto`);
botonesComprar.forEach((botonComprar)=>{
  botonComprar.addEventListener(`click`, botonComprarClickeado);
})

const btnComprar = document.querySelector(".comprarButton");
btnComprar.addEventListener("click", carritoComprado)

const productosAgregados = document.querySelector(".productosAgregados")

//funcion para verificar en que boton se esta clickeando
function botonComprarClickeado(event){
  const boton = event.target;
  const item = boton.closest(`.item`)
  
  //se guardan en variables el titulo y el precio correspondiente al producto que se clickeo
  const itemTitulo= item.querySelector(`.item-titulo`).textContent;
  const itemPrecio = item.querySelector(`.item-precio`).textContent;
  
  agregarProducto(itemTitulo, itemPrecio)
 
}

function agregarProducto (itemTitulo, itemPrecio){

  const titulosRepetidos = productosAgregados.getElementsByClassName("shoppingCartItemTitle");

  for (let i = 0; i < titulosRepetidos.length; i++) {
    if (titulosRepetidos[i].innerText === itemTitulo) {
      let elementQuantity = titulosRepetidos[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.shoppingCartItemQuantity'
      );
      elementQuantity.value++;
      $('.toast').toast('show');
      updateShoppingCartTotal();
      return;
    }
  }

  

  //variable para crear una nueva fila con los datos del producto comprado
  const productoAgregado = document.createElement(`div`);
 //variable para crear cada elemento contenido en el carrito 
  const contenidoCarrito = `
  <div class="row shoppingCartItem">
                    <div class="col-6">
                        <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                            
                            <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitulo}</h6>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                            <p class="item-price mb-0 shoppingCartItemPrice">${itemPrecio}</p>
                        </div>
                    </div>
                    <div class="col-4">
                        <div
                            class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                            <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                                value="1">
                            <button class="btn btn-danger buttonDelete" type="button">X</button>
                        </div>
                    </div>
                </div>
  `
  productoAgregado.innerHTML = contenidoCarrito;
  productosAgregados.append(productoAgregado)

  productoAgregado.querySelector(`.buttonDelete`).addEventListener(`click`, eliminarProducto)
  productoAgregado.querySelector(`.shoppingCartItemQuantity`).addEventListener("change", modificarCantidad)
  updateShoppingCartTotal()
}

function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice'
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace('$', '')
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity'
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `$${total.toFixed(2)}`;
}

function eliminarProducto(event){
  const botonBorrar = event.target;
  botonBorrar.closest(`.shoppingCartItem`).remove();
  updateShoppingCartTotal();

}

function modificarCantidad(event){
  const cantidad = event.target;
  if (cantidad.value <=0){
    cantidad.value=1;
  }
  updateShoppingCartTotal();
} 

function carritoComprado(){
  productosAgregados.innerHTML="";
  updateShoppingCartTotal();
}