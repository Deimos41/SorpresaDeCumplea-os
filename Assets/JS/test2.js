// --- AQUÍ EDITAS TUS PREGUNTAS ---
const preguntas = [
    {
        p: "¿ Que dia nos conocimos mi amorsssshhh?",
        opciones: ["Qsy yo ando pendiente a eso", "8-8-2025", "15-7-2025", "8 de agosto de 2024"],
        correcta: 1 // El número de la opción correcta (empezando desde 0)
    },
    {
        p: "¿Qué fue lo primero que pensé cuando te vi?",
        opciones: ["Y esa mami?", "Qué nervios", "Le gustare todavia despues de habernos conocido?", "Todas las anteriores"],
        correcta: 2
    },
    {
        p: "¿Cual fue la primera cosa que te pedi cuando nos conocimos?",
        opciones: ["Te quieres casar conmigo?", "Te puedes subir arriba mio?", "Me das un besito?", "No recuerdo nada"],
        correcta: 0
    }
];

let indiceActual = 0;

function cargarPregunta() {
    const data = preguntas[indiceActual];
    document.getElementById('pregunta').innerText = data.p;
    document.getElementById('paso').innerText = `Pregunta ${indiceActual + 1} de ${preguntas.length}`;
    
    const contenedor = document.getElementById('opciones-contenedor');
    contenedor.innerHTML = ""; // Limpiar opciones anteriores

    data.opciones.forEach((opcion, i) => {
        const boton = document.createElement('button');
        boton.innerText = opcion;
        boton.classList.add('opcion-btn');
        boton.onclick = () => verificar(i);
        contenedor.appendChild(boton);
    });
}

function verificar(seleccionada) {
    // CONDICIÓN ESPECIAL: Pregunta 1 (índice 0) y elige la primera opción (índice 0)
    if (indiceActual === 0 && seleccionada === 0) {
        alert("OOOOOHHHHHH care qlo como que tu no sabe? 😂");
        return; // El return hace que se detenga aquí y no avance
    }

    // Lógica normal del juego
    if (seleccionada === preguntas[indiceActual].correcta) {
        indiceActual++;
        if (indiceActual < preguntas.length) {
            cargarPregunta();
        } else {
            alert("¡Nivel Superado! Eres la mejor novia del mundo. ❤️");
            window.location.href = "menu.html"; 
        }
    } else {
        alert("¡Caaaaasi! Intenta de nuevo amor. 🤔");
    }
}

// Iniciar el juego
cargarPregunta();