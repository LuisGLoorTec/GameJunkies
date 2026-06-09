const apiKeyRawg = 'e477df29112544ab8396d8042e83419b';
const parametrosUrl = new URLSearchParams(window.location.search);
const idJuego = parametrosUrl.get('id');
const contenedorDetalle = document.getElementById('contenedor-detalle');
if (idJuego) {
    cargarDetallesDelJuego(idJuego);
} else {
    contenedorDetalle.innerHTML = '<h2 class="text-center mt-5 text-danger">Error: No se seleccionó ningún juego.</h2>';
}


function cargarDetallesDelJuego(id) {
    const urlDetalle = `https://api.rawg.io/api/games/${id}?key=${apiKeyRawg}`;

    fetch(urlDetalle)
        .then(response => response.json())
        .then(juego => renderizarPantallaDetalle(juego))
        .catch(error => {
            console.log("Error al cargar detalles:", error);
            contenedorDetalle.innerHTML = '<h2 class="text-center mt-5 text-danger">Ocurrió un error al cargar el juego.</h2>';
        });
}

function renderizarPantallaDetalle(juego) {

    const precioAleatorio = (Math.random() * (69.99 - 19.99) + 19.99).toFixed(2);
    
    const descripcion = juego.description_raw ? juego.description_raw : "Description not available for this title.";
    const generos = juego.genres.map(g => `<span class="badge bg-secondary me-1">${g.name}</span>`).join('');

    const htmlDetalle = `
        <div class="row p-4 rounded shadow-lg border" style="background-color: var(--panel-oscuro) !important; border-color: var(--borde-sutil) !important;">
            <div class="col-md-5 mb-4 mb-md-0">
                <img src="${juego.background_image}" class="img-fluid rounded border shadow" alt="${juego.name}" style="width: 100%; object-fit: cover; border-color: var(--color-principal) !important;">
            </div>
            
            <div class="col-md-7 d-flex flex-column">
                <h1 class="mb-3" style="color: var(--texto-principal);">${juego.name}</h1>
                <div class="mb-3">
                    ${generos}
                    <span class="badge bg-warning text-dark ms-2">⭐ Rating: ${juego.rating}</span>
                    <span class="badge bg-info text-dark ms-2">📅 Lanzamiento: ${juego.released}</span>
                </div>
                
                <h3 class="text-precio display-5 fw-bold mb-4">$${precioAleatorio}</h3>
                
                <h5 class="border-bottom pb-2 mb-3" style="color: var(--texto-principal); border-color: var(--borde-sutil) !important;">Sinopsis</h5>
                <p style="color: var(--texto-principal); line-height: 1.6; max-height: 250px; overflow-y: auto; padding-right: 10px;">
                    ${descripcion}
                </p>
                
                <div class="mt-auto pt-4 d-flex gap-3">
                    <button class="btn btn-lg w-100 fw-bold" style="background-color: var(--color-principal); color: #ffffff; transition: all 0.3s ease; box-shadow: 0 0 15px var(--color-principal);">
                        🛒 Añadir al Carrito
                    </button>
                    <a href="GameJunkies.html" class="btn btn-secundario btn-lg w-100">Volver</a>
                </div>
            </div>
        </div>
    `;

    contenedorDetalle.innerHTML = htmlDetalle;
}