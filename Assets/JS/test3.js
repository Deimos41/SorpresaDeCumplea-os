const container = document.getElementById('game-container');
const jugador = document.getElementById('jugador');
const puntosDisplay = document.getElementById('puntos');
const vidasDisplay = document.getElementById('vidas');

let puntos = 0;
let vidas = 3;
let juegoActivo = true;

// Movimiento táctil
container.addEventListener('touchmove', (e) => {
    if(!juegoActivo) return;
    e.preventDefault();
    let touch = e.touches[0];
    let x = touch.clientX;
    if (x > 40 && x < window.innerWidth - 40) {
        jugador.style.left = x + 'px';
    }
}, { passive: false });

function crearItem() {
    if(!juegoActivo) return;

    const item = document.createElement('div');
    const esMalo = Math.random() < 0.3; // 30% de probabilidad de corazón falso
    
    item.innerText = esMalo ? '🖤' : '❤️';
    item.className = 'item';
    item.style.left = Math.random() * (window.innerWidth - 40) + 'px';
    item.style.top = '-50px';
    container.appendChild(item);

    let posY = -50;
    let velocidad = esMalo ? 7 : 5; // Los negros caen más rápido

    const caida = setInterval(() => {
        if(!juegoActivo) { clearInterval(caida); item.remove(); return; }

        posY += velocidad;
        item.style.top = posY + 'px';

        const juRect = jugador.getBoundingClientRect();
        const itRect = item.getBoundingClientRect();

        // Colisión
        if (itRect.bottom >= juRect.top && itRect.top <= juRect.bottom &&
            itRect.right >= juRect.left && itRect.left <= juRect.right) {
            
            if(esMalo) {
                finalizarJuego("¡ATRAPASTE UN CORAZÓN FALSO! 💔", "Esos no valen, ¡ten cuidado!");
            } else {
                puntos++;
                puntosDisplay.innerText = puntos;
                if(puntos >= 10) ganar();
            }
            clearInterval(caida);
            item.remove();
        }

        // Si llega al suelo
        if (posY > window.innerHeight) {
            if(!esMalo) { // Si era uno bueno y se cayó
                vidas--;
                actualizarVidas();
                if(vidas <= 0) finalizarJuego("¡TE QUEDASTE SIN VIDAS! 😭", "No dejes que mi amor caiga al suelo.");
            }
            clearInterval(caida);
            item.remove();
        }
    }, 20);
}

function actualizarVidas() {
    vidasDisplay.innerText = "❤️".repeat(vidas);
}

function finalizarJuego(titulo, texto) {
    juegoActivo = false;
    document.getElementById('titulo-error').innerText = titulo;
    document.getElementById('texto-error').innerText = texto;
    document.getElementById('mensaje-perder').style.display = 'block';
}

function ganar() {
    juegoActivo = false;
    document.getElementById('mensaje-ganar').style.display = 'block';
}

setInterval(crearItem, 800);