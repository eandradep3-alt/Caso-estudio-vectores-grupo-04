const btnContinuar = document.getElementById("btn-continuar");
const txtMonto = document.getElementById("num-ingreso-monto");
const cmbOperacion = document.getElementById("id-select-operaciones");

// Cajas de resultados
const txtDepositos = document.getElementById("num-total-depositado");
const txtRetiros = document.getElementById("num-id-total-retiro");
const txtSaldo = document.getElementById("num-id-saldo-final");
const btnLimpiar = document.getElementById("btn-limpiar");


btnContinuar.addEventListener("click", function(e){
registrarMovimiento()
});

btnLimpiar.addEventListener("click", function(e){
limpiar()
});


// Guarda el tipo de operación
let tipos = [];

// Guarda el monto
let montos = [];



function registrarMovimiento() {
    // Obtener datos del formulario
    let monto = Number(txtMonto.value);
    let operacion = cmbOperacion.value;

    // VALIDACIONES
    if (txtMonto.value == "") {
        alert("Ingrese un monto.");
        txtMonto.focus();
        return;
    }

    if (monto <= 0) {
        alert("El monto debe ser mayor que cero.");
        txtMonto.focus();
        return;
    }
    // CALCULAR SALDO ACTUAL
    let saldo = 0;

    // Recorrer los vectores para conocer el saldo actual
    for (let i = 0; i < montos.length; i++) {
        if (tipos[i] == "Deposito") {
            saldo = saldo + montos[i];

        } else {
            saldo = saldo - montos[i];
        }
    }


    // SWITCH
    switch (operacion) {

        case "Deposito":

            tipos.push("Deposito");
            montos.push(monto);

            alert("Depósito registrado correctamente.");

            break;

        case "Retiro":

            if (monto <= saldo) {

                tipos.push("Retiro");
                montos.push(monto);
                alert("Retiro registrado correctamente.");
            } else {
                alert("Saldo insuficiente.");
            }
            break;
    }

    // Mostrar resultados
    mostrarResumen();

    // Limpiar caja
    txtMonto.value = "";
    txtMonto.focus();

}


// RESUMEN
function mostrarResumen() {

    let totalDepositos = 0;
    let totalRetiros = 0;

    // Recorrer todos los movimientos
    for (let i = 0; i < montos.length; i++) {
        if (tipos[i] == "Deposito") {
            totalDepositos = totalDepositos + montos[i];
        } else {
            totalRetiros = totalRetiros + montos[i];
        }

    }

    // Calcular saldo final
    let saldoFinal = totalDepositos - totalRetiros;

    // Mostrar resultados
    txtDepositos.value = "$ " + totalDepositos.toFixed(2);
    txtRetiros.value = "$ " + totalRetiros.toFixed(2);
    txtSaldo.value = "$ " + saldoFinal.toFixed(2);

}

// LIMPIAR DATOS
function limpiar() {

    // Vaciar los vectores
    tipos = [];
    montos = [];

    // Limpiar las cajas de texto
    txtMonto.value = "";
    txtDepositos.value = "";
    txtRetiros.value = "";
    txtSaldo.value = "";

    // Colocar el cursor nuevamente en el monto
    txtMonto.focus();
    alert("Los datos fueron eliminados correctamente.");

}