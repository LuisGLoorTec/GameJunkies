const apiKeyRawg = 'e477df29112544ab8396d8042e83419b';
const urlRawg = `https://api.rawg.io/api/games?key=${apiKeyRawg}&page_size=15`;

const carruselInner = document.querySelector('#carruselJuegos .carousel-inner');
const carruselIndicators = document.querySelector('#carruselJuegos .carousel-indicators');
const contenedorGrilla = document.getElementById('contenedor-juegos-grilla');

async function cargarDatosRawg() {
    try {
        const respuesta = await fetch(urlRawg);
        const datos = await respuesta.json();
        
        const juegosMezclados = datos.results.sort(() => 0.5 - Math.random());
        
        const juegosCarrusel = juegosMezclados.slice(0, 6);
        renderizarCarrusel(juegosCarrusel);
        
        const juegosGrilla = juegosMezclados.slice(6, 14);
        renderizarGrilla(juegosGrilla);
        
    } catch (error) {
        console.error("Error al cargar la API:", error);
    }
}

function renderizarCarrusel(juegos) {
    carruselInner.innerHTML = '';
    carruselIndicators.innerHTML = '';
    
    juegos.forEach((juego, index) => {
        const esActivo = index === 0 ? 'active' : '';
        
        const botonIndicador = `
            <button type="button" data-bs-target="#carruselJuegos" data-bs-slide-to="${index}" class="${esActivo}"></button>
        `;
        carruselIndicators.innerHTML += botonIndicador;
        
        const itemCarrusel = `
            <div class="carousel-item ${esActivo}">
                <img src="${juego.background_image}" class="d-block w-100" alt="${juego.name}" style="height: 400px; object-fit: cover; filter: brightness(0.7);">
                <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded p-2">
                    <h5>${juego.name}</h5>
                    <p>Rating: ⭐ ${juego.rating}</p>
                </div>
            </div>
        `;
        carruselInner.innerHTML += itemCarrusel;
    });
}

function renderizarGrilla(juegos) {
    contenedorGrilla.innerHTML = '';
    
    juegos.forEach(juego => {
        const precioAleatorio = (Math.random() * (69.99 - 19.99) + 19.99).toFixed(2);
        
        const tarjetaHtml = `
            <div class="col">
                <div class="card h-100 bg-dark text-white border-secondary">
                    <img src="${juego.background_image}" class="card-img-top" alt="${juego.name}" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-truncate" title="${juego.name}">${juego.name}</h5>
                        <p class="card-text text-success fw-bold">$ ${precioAleatorio}</p>
                        <button class="btn btn-outline-light mt-auto" style="border-color: var(--primary-purple);">Ver detalles</button>
                    </div>
                </div>
            </div>
        `;
        contenedorGrilla.innerHTML += tarjetaHtml;
    });
}

cargarDatosRawg();