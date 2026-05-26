const apiKey = 'e477df29112544ab8396d8042e83419b';
const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&page_size=20`;
const carruselInner = document.querySelector('#carruselJuegos .carousel-inner');
const carruselIndicators = document.querySelector('#carruselJuegos .carousel-indicators');

async function cargarCarruselAleatorio() {
    try {
        const respuesta = await fetch(apiUrl);
        const datos = await respuesta.json();
        
        const juegosAleatorios = datos.results.sort(() => 0.5 - Math.random()).slice(0, 3);
        
        renderizarCarrusel(juegosAleatorios);
    } catch (error) {
        console.error(error);
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

cargarCarruselAleatorio();