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
                
                <h5 class="border-bottom pb-2 mb-3" style="color: var(--texto-principal); border-color: var(--borde-sutil) !important;">Sinopsis Breve</h5>
                <p style="color: var(--texto-principal); line-height: 1.6; max-height: 150px; overflow-y: auto; padding-right: 10px;">
                    ${descripcion.substring(0, 300)}...
                </p>
                
                <div class="mt-auto pt-4 d-flex gap-3">
                    <button class="btn btn-lg w-100 fw-bold btn-carrito-add" style="background-color: var(--color-principal); color: #ffffff; transition: all 0.3s ease; box-shadow: 0 0 15px var(--color-principal);">
                        🛒 Añadir al Carrito
                    </button>
                    <a href="GameJunkies.html" class="btn btn-secundario btn-lg w-100">Volver</a>
                </div>
            </div>
        </div>

        <!-- TABS SECTION -->
        <div class="mt-5">
            <ul class="nav nav-tabs custom-tabs" id="juegoTabs" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="general-tab" data-bs-toggle="tab" data-bs-target="#general-tab-pane" type="button" role="tab" aria-controls="general-tab-pane" aria-selected="true">Información General</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link" id="resenas-tab" data-bs-toggle="tab" data-bs-target="#resenas-tab-pane" type="button" role="tab" aria-controls="resenas-tab-pane" aria-selected="false">Reseñas</button>
                </li>
            </ul>
            <div class="tab-content p-4 border border-top-0 rounded-bottom" id="juegoTabsContent" style="background-color: var(--panel-oscuro); border-color: var(--borde-sutil) !important;">
                
                <!-- Pestaña: Información General -->
                <div class="tab-pane fade show active" id="general-tab-pane" role="tabpanel" aria-labelledby="general-tab" tabindex="0">
                    <h5 style="color: var(--texto-principal); margin-bottom: 20px;">Descripción Completa</h5>
                    <p style="color: var(--texto-principal); line-height: 1.7; white-space: pre-line;">${descripcion}</p>
                </div>
                
                <!-- Pestaña: Reseñas (Sistema de Comentarios) -->
                <div class="tab-pane fade" id="resenas-tab-pane" role="tabpanel" aria-labelledby="resenas-tab" tabindex="0">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h5 style="color: var(--texto-principal); margin-bottom: 0;">Comentarios y Reseñas</h5>
                    </div>
                    
                    <!-- Formulario de nueva reseña -->
                    <div class="card mb-4 shadow-sm" style="background-color: var(--fondo-oscuro); border-color: var(--borde-sutil);">
                        <div class="card-body">
                            <form id="form-resena">
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label text-muted">Tu Nombre</label>
                                        <input type="text" id="resena-nombre" class="form-control input-busqueda" placeholder="Jugador123" required>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label text-muted">Calificación</label>
                                        <select id="resena-rating" class="form-select select-filtro">
                                            <option value="5">⭐⭐⭐⭐⭐ (Excelente)</option>
                                            <option value="4">⭐⭐⭐⭐ (Muy Bueno)</option>
                                            <option value="3">⭐⭐⭐ (Bueno)</option>
                                            <option value="2">⭐⭐ (Regular)</option>
                                            <option value="1">⭐ (Malo)</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label text-muted">Tu Comentario</label>
                                    <textarea id="resena-texto" class="form-control input-busqueda" rows="3" placeholder="¿Qué te pareció el juego?" required></textarea>
                                </div>
                                <button type="submit" class="btn btn-principal">Publicar Reseña</button>
                            </form>
                        </div>
                    </div>

                    <!-- Lista de reseñas -->
                    <div id="lista-resenas">
                        <!-- Las reseñas se cargarán aquí dinámicamente -->
                    </div>
                </div>
            </div>
        </div>
    `;

    contenedorDetalle.innerHTML = htmlDetalle;
    
    // Inicializar sistema de comentarios
    cargarResenas(juego.id);
    
    const formResena = document.getElementById('form-resena');
    if (formResena) {
        formResena.addEventListener('submit', (e) => {
            e.preventDefault();
            guardarResena(juego.id);
        });
    }

    // Botón de ejemplo para funcionalidad de Toast (añadir a carrito visualmente)
    const btnAddCart = document.querySelector('.btn-carrito-add');
    if (btnAddCart && window.mostrarToast) {
        btnAddCart.addEventListener('click', () => {
            window.mostrarToast(`"${juego.name}" añadido al carrito`, 'success');
        });
    }
}

// Lógica de Comentarios con LocalStorage
function cargarResenas(idJuego) {
    const contenedorResenas = document.getElementById('lista-resenas');
    const resenasGuardadas = JSON.parse(localStorage.getItem(`resenas_${idJuego}`)) || [];
    
    if (resenasGuardadas.length === 0) {
        contenedorResenas.innerHTML = '<p class="text-muted text-center my-4">Aún no hay reseñas. ¡Sé el primero en comentar!</p>';
        return;
    }
    
    let html = '';
    resenasGuardadas.forEach(resena => {
        const estrellas = '⭐'.repeat(resena.rating);
        html += `
            <div class="card mb-3" style="background-color: transparent; border-color: var(--borde-sutil); border-left: 4px solid var(--color-secundario);">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <strong style="color: var(--texto-principal); font-size: 1.1rem;">${resena.nombre}</strong>
                        <small class="text-muted">${resena.fecha}</small>
                    </div>
                    <div class="mb-3">${estrellas}</div>
                    <p style="color: var(--texto-apagado); margin-bottom: 0; line-height: 1.5;">${resena.texto}</p>
                </div>
            </div>
        `;
    });
    
    contenedorResenas.innerHTML = html;
}

function guardarResena(idJuego) {
    const nombre = document.getElementById('resena-nombre').value.trim();
    const rating = document.getElementById('resena-rating').value;
    const texto = document.getElementById('resena-texto').value.trim();
    
    if (!nombre || !texto) return;
    
    const nuevaResena = {
        nombre: nombre,
        rating: parseInt(rating),
        texto: texto,
        fecha: new Date().toLocaleDateString()
    };
    
    const resenasGuardadas = JSON.parse(localStorage.getItem(`resenas_${idJuego}`)) || [];
    resenasGuardadas.unshift(nuevaResena); // Añadir al inicio
    
    localStorage.setItem(`resenas_${idJuego}`, JSON.stringify(resenasGuardadas));
    
    // Limpiar formulario
    document.getElementById('form-resena').reset();
    
    // Mostrar Toast
    if (window.mostrarToast) {
        window.mostrarToast('Reseña publicada correctamente', 'success');
    }
    
    // Recargar lista
    cargarResenas(idJuego);
}