const cmbProductos = document.getElementById("id-select-productos");
const txtCantidad = document.getElementById("num-id-cantidad");

const btnAgregar = document.getElementById("btn-agregar-producto");
const btnLimpiar = document.getElementById("btn-limpiar");

const txtResumen = document.getElementById("txt-resumen");

const txtSubtotal = document.getElementById("text-id-subtotal");
const txtIVA = document.getElementById("text-id-iva");
const txtDescuento = document.getElementById("text-id-descuento");
const txtTotal = document.getElementById("text-id-total");

btnAgregar.addEventListener("click", function(e){
     agregarProducto()
});
btnLimpiar.addEventListener("click", function(e){
     limpiar()
});

let productos = [];
let cantidades = [];
let precios = [];

// AGREGAR PRODUCTO
function agregarProducto() {

    // Obtener datos del formulario
    let producto = cmbProductos.value;
    let cantidad = Number(txtCantidad.value);

    // Validar cantidad
    if (txtCantidad.value == "") {
        alert("Ingrese una cantidad.");
        txtCantidad.focus();
        return;
    }

    if (cantidad <= 0) {
        alert("Cantidad inválida.");
        txtCantidad.focus();
        return;
    }

    if (cantidad > 10) {
        alert("Solo puede ingresar hasta 10 unidades.");
        txtCantidad.focus();
        return;
    }

    // Variable para guardar el precio
    let precio = 0;

    // Obtener el precio según el producto
    switch (producto) {

        case "Leche":
            precio = 1.10;
            break;

        case "Arroz":
            precio = 1.80;
            break;

        case "Aceite":
            precio = 3.55;
            break;

        case "Azucar":
            precio = 1.23;
            break;

        case "Sal":
            precio = 0.55;
            break;

        case "Harina":
            precio = 1.20;
            break;

        case "Atun":
            precio = 1.49;
            break;

    }

    // Guardar datos en los vectores
    productos.push(producto);
    cantidades.push(cantidad);
    precios.push(precio);

    alert("Producto agregado correctamente.");

    // Mostrar resultados
    mostrarFactura();

    // Limpiar cantidad
    txtCantidad.value = "";
    txtCantidad.focus();

}

// MOSTRAR FACTURA
function mostrarFactura() {

    let subtotal = 0;
    let iva = 0;
    let descuento = 0;
    let total = 0;

    txtResumen.value = "";

    // Recorrer los vectores
    for (let i = 0; i < productos.length; i++) {

        // Calcular subtotal
        subtotal = subtotal + (cantidades[i] * precios[i]);

        // Mostrar productos comprados
            txtResumen.value = txtResumen.value +
            "Producto: " + productos[i] +
            "\nCantidad: " + cantidades[i] +
            "\nPrecio Unitario: $" + precios[i] +
            "\nSubtotal: $" + (cantidades[i] * precios[i]).toFixed(2) +
            "\n\n"
    }

    // Calcular IVA
    iva = subtotal * 0.15;

    // Calcular descuento
    if (subtotal > 20) {
        descuento = subtotal * 0.05;
    } else {
        descuento = 0;
    }

    // Calcular total
    total = subtotal + iva - descuento;

    // Mostrar resultados
    txtSubtotal.value = "$ " + subtotal.toFixed(2);
    txtIVA.value = "$ " + iva.toFixed(2);
    txtDescuento.value = "$ " + descuento.toFixed(2);
    txtTotal.value = "$ " + total.toFixed(2);

}

// LIMPIAR DATOS
function limpiar() {

    // Vaciar los vectores
    productos = [];
    cantidades = [];
    precios = [];

    // Limpiar controles
    txtCantidad.value = "";
    txtResumen.value = "";

    txtSubtotal.value = "";
    txtIVA.value = "";
    txtDescuento.value = "";
    txtTotal.value = "";

    txtCantidad.focus();

    alert("Se eliminaron todos los datos.");

}