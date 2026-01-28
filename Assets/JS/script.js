function moverBoton() {
    const btn = document.getElementById('btnNo');
    
    // Calculamos posiciones aleatorias dentro de la ventana
    // Restamos un margen para que no se salga de los bordes
    const x = Math.random() * (window.innerWidth - btn.offsetWidth);
    const y = Math.random() * (window.innerHeight - btn.offsetHeight);
    
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
}

function avanzar() {
    alert("¡Sabía que dirías que sí! 😍 Ahora prepárate, porque empezamos con los desafíos...");
    // Aquí es donde en el futuro pondremos el link al Nivel 2
    // window.location.href = "nivel2.html"; 
}