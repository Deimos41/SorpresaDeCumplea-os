function moverBoton() {
    const btn = document.getElementById('btnNo');
    
    // Calculamos el espacio disponible
    // Restamos un poco más de margen para que no se pegue a los bordes
    const x = Math.random() * (window.innerWidth - btn.offsetWidth - 40) + 20;
    const y = Math.random() * (window.innerHeight - btn.offsetHeight - 40) + 20;
    
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
}

function ganar() {
    // Un pequeño mensaje antes de ir al menú
    alert("¡Sabía que no podías decir que no! 😉\n\nBienvenida a tu aventura de cumpleaños...");
    // Redirige al archivo del menú
    window.location.href = "menu.html";
}