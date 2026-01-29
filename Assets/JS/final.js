const mazeContainer = document.getElementById('maze-container');
const player = document.getElementById('player');
const vidasDisplay = document.getElementById('vidas-count');

const CELL_SIZE = 35;
let vidas = 3;

// 1=Pared, 0=Camino, 2=Inicio, 3=Meta, 4=Enemigo
const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 3, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// Definimos las arañas: posición inicial y dirección (dr: fila, dc: columna)
let enemigos = [
    { r: 3, c: 1, dr: 0, dc: 1 }, // Se mueve horizontal en la fila 3
    { r: 5, c: 6, dr: 0, dc: -1 }, // Se mueve horizontal en la fila 5
    { r: 7, c: 2, dr: 0, dc: 1 }  // Se mueve horizontal en la fila 7
];

let playerPos = { r: 1, col: 1 };
let startPos = { r: 1, col: 1 };

function initMaze() {
    mazeContainer.style.gridTemplateColumns = `repeat(${maze[0].length}, ${CELL_SIZE}px)`;
    renderizarTodo();
}

function renderizarTodo() {
    mazeContainer.innerHTML = '<div id="player" class="player">👧🏻</div>';
    
    // Dibujar celdas, paredes y meta
    for (let r = 0; r < maze.length; r++) {
        for (let c = 0; c < maze[r].length; c++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            if (maze[r][c] === 1) cell.className += ' wall';
            if (maze[r][c] === 3) { cell.id = 'finish'; cell.innerText = '💌'; }
            mazeContainer.appendChild(cell);
        }
    }
    
    // Dibujar enemigos (arañas)
    enemigos.forEach(ene => {
        const spider = document.createElement('div');
        spider.className = 'player'; // Usamos la misma clase para que el tamaño sea igual
        spider.style.top = ene.r * CELL_SIZE + 'px';
        spider.style.left = ene.c * CELL_SIZE + 'px';
        spider.innerText = '👾'; 
        mazeContainer.appendChild(spider);
    });

    actualizarPos();
}

// Función mágica: Mueve a los enemigos cada 500ms
setInterval(() => {
    enemigos.forEach(ene => {
        let nr = ene.r + ene.dr;
        let nc = ene.c + ene.dc;

        // Si choca con pared (1) o meta (3), cambia de dirección
        if (maze[nr][nc] === 1 || maze[nr][nc] === 3) {
            ene.dr *= -1;
            ene.dc *= -1;
        } else {
            ene.r = nr;
            ene.c = nc;
        }
    });
    renderizarTodo();
    chequearColision(); // Ver si la araña chocó con ella al moverse
}, 500);

function chequearColision() {
    enemigos.forEach(ene => {
        if (ene.r === playerPos.r && ene.c === playerPos.col) {
            quitarVida();
        }
    });
}

function actualizarPos() {
    const p = document.getElementById('player');
    p.style.top = playerPos.r * CELL_SIZE + 'px';
    p.style.left = playerPos.col * CELL_SIZE + 'px';
}

// ... (Aquí mantén tus funciones de move(), quitarVida() y descargarCarta() que ya tienes)

        function move(dr, dc) {
    let nr = playerPos.r + dr;
    let nc = playerPos.col + dc;

    // Verificamos que la nueva posición esté dentro del mapa
    if (nr >= 0 && nr < maze.length && nc >= 0 && nc < maze[0].length) {
        // Solo permitimos el movimiento si NO es una pared (1)
        if (maze[nr][nc] !== 1) {
            playerPos.r = nr;
            playerPos.col = nc;
            actualizarPos();

            // Lógica de trampas y meta...
            if (maze[nr][nc] === 4) {
                quitarVida();
            }
            if (maze[nr][nc] === 3) {
                document.getElementById('final-message').style.display = 'block';
                descargarCarta();
            }
        }
    }
}

        function quitarVida() {
            vidas--;
            vidasDisplay.innerText = "❤️".repeat(vidas);
            if (vidas > 0) {
                alert("¡Cuidado con los monstruos! Pierdes una vida. 💔");
                playerPos = { ...startPos }; // Regresa al inicio del laberinto
                actualizarPos();
            } else {
                document.getElementById('game-over').style.display = 'block';
            }
        }

function descargarCarta() {
    const link = document.createElement('a');
    // Debe ser el nombre exacto que aparece en tu carpeta de archivos
    link.href = 'Felices 19 amada mia.pdf'; 
    link.download = 'Para_Mi_Amor.pdf'; // Este es el nombre que ella verá al descargar
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

        // Botones
        document.getElementById('up').onclick = () => move(-1, 0);
        document.getElementById('down').onclick = () => move(1, 0);
        document.getElementById('left').onclick = () => move(0, -1);
        document.getElementById('right').onclick = () => move(0, 1);

        
        initMaze();

