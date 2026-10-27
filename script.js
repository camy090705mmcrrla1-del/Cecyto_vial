
document.addEventListener("DOMContentLoaded", function () {

    const contenedor = document.getElementById("preguntas-test");
    const botonCalificar = document.getElementById("btn-calificar");
    const botonReiniciar = document.getElementById("btn-reiniciar");
    const resultado = document.getElementById("resultado-test");

    const preguntas = [
        {
            pregunta: "1. ¿Qué debes hacer cuando el semáforo está en rojo?",
            opciones: [
                "Acelerar para pasar rápidamente",
                "Detenerte antes de la línea de alto",
                "Tocar el claxon y continuar",
                "Pasar si no hay otros vehículos"
            ],
            correcta: 1
        },
        {
            pregunta: "2. ¿Para qué sirve el cinturón de seguridad?",
            opciones: [
                "Para evitar que el vehículo consuma combustible",
                "Para conducir a mayor velocidad",
                "Para reducir el riesgo de lesiones en un accidente",
                "Para sustituir las bolsas de aire"
            ],
            correcta: 2
        },
        {
            pregunta: "3. ¿Qué debes hacer si necesitas usar tu teléfono mientras conduces?",
            opciones: [
                "Leer los mensajes rápidamente",
                "Sostenerlo con una mano",
                "Esperar a detenerte en un lugar seguro",
                "Usarlo solamente cuando hay poco tráfico"
            ],
            correcta: 2
        },
        {
            pregunta: "4. ¿Qué debes hacer al acercarte a un cruce peatonal?",
            opciones: [
                "Aumentar la velocidad",
                "Prestar atención y ceder el paso cuando corresponda",
                "Tocar el claxon para que las personas se aparten",
                "Rebasar a los vehículos detenidos sin verificar"
            ],
            correcta: 1
        },
        {
            pregunta: "5. ¿Qué debes hacer antes de cambiar de carril?",
            opciones: [
                "Revisar el entorno, verificar los espejos y señalizar",
                "Cambiar rápidamente sin avisar",
                "Frenar de golpe",
                "Confiar únicamente en el claxon"
            ],
            correcta: 0
        }
    ];

    function mostrarPreguntas() {
        contenedor.innerHTML = "";

        preguntas.forEach((pregunta, indice) => {
            const tarjeta = document.createElement("div");
            tarjeta.className = "mb-4 p-3 border rounded";

            const titulo = document.createElement("h5");
            titulo.className = "mb-3";
            titulo.textContent = pregunta.pregunta;
            tarjeta.appendChild(titulo);

            pregunta.opciones.forEach((opcion, posicion) => {
                const etiqueta = document.createElement("label");
                etiqueta.className = "d-block p-2 rounded mb-2";
                etiqueta.style.cursor = "pointer";

                const radio = document.createElement("input");
                radio.type = "radio";
                radio.name = "pregunta-" + indice;
                radio.value = posicion;
                radio.className = "form-check-input me-2";

                etiqueta.appendChild(radio);
                etiqueta.appendChild(document.createTextNode(opcion));
                tarjeta.appendChild(etiqueta);
            });

            contenedor.appendChild(tarjeta);
        });

        resultado.innerHTML = "";
        botonCalificar.disabled = false;
    }

    function calificarTest() {
        let aciertos = 0;
        let sinResponder = 0;

        preguntas.forEach((pregunta, indice) => {
            const seleccionada = document.querySelector(
                'input[name="pregunta-' + indice + '"]:checked'
            );

            if (!seleccionada) {
                sinResponder++;
            } else if (Number(seleccionada.value) === pregunta.correcta) {
                aciertos++;
            }
        });

        if (sinResponder > 0) {
            resultado.innerHTML =
                '<div class="alert alert-warning">' +
                'Te faltan ' + sinResponder +
                ' pregunta(s) por responder. Contesta todas antes de calificar.' +
                '</div>';
            return;
        }

        const porcentaje = Math.round(
            (aciertos / preguntas.length) * 100
        );

        let mensaje = "";

        if (porcentaje === 100) {
            mensaje = "¡Excelente! Respondiste todas correctamente.";
        } else if (porcentaje >= 60) {
            mensaje = "¡Buen trabajo! Puedes seguir aprendiendo sobre seguridad vial.";
        } else {
            mensaje = "Repasa las normas de seguridad vial e inténtalo de nuevo.";
        }

        resultado.innerHTML =
            '<div class="alert alert-info">' +
            '<h4>Resultado del test</h4>' +
            '<p>Aciertos: ' + aciertos + ' de ' + preguntas.length + '</p>' +
            '<p>Calificación: ' + porcentaje + '%</p>' +
            '<p class="mb-0">' + mensaje + '</p>' +
            '</div>';

        botonCalificar.disabled = true;
    }

    function reiniciarTest() {
        mostrarPreguntas();
    }

    botonCalificar.addEventListener("click", calificarTest);
    botonReiniciar.addEventListener("click", reiniciarTest);

    // Mostrar las preguntas al cargar la página.
    mostrarPreguntas();

});
