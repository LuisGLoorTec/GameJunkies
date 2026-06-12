// Lógica específica para la página del Catálogo
document.addEventListener('DOMContentLoaded', () => {
    const btnFiltrar = document.getElementById('btn-aplicar-filtros-catalogo');
    const selectCategoria = document.getElementById('filtro-cat-avanzado');
    const selectPlataforma = document.getElementById('filtro-plataforma');
    const rangoPrecio = document.getElementById('rango-precio');
    const selectOrden = document.querySelector('select.form-select.form-select-sm');
    const contenedorResultados = document.getElementById('contenedor-resultados-catalogo');
    
    // Mapeo de plataformas RAWG: pc=4, playstation5=187, xbox-series-x=186, nintendo-switch=7
    const mapaPlataformas = {
        'pc': 4,
        'playstation': 187,
        'xbox': 186,
        'nintendo': 7
    };
    
    // Mapeo de orden para la API de RAWG
    const mapaOrden = {
        'relevancia': '-rating',
        'precio-asc': 'name', // RAWG no tiene orden por precio, simularemos orden alfabético como fallback
        'precio-desc': '-name',
        'alfabetico': 'name'
    };

    if (btnFiltrar) {
        btnFiltrar.addEventListener('click', () => {
            aplicarFiltros();
        });
    }

    // Cargar juegos por defecto al entrar al catálogo
    if (contenedorResultados) {
        cargarJuegosCatalogoDefault();
    }

    function cargarJuegosCatalogoDefault() {
        const apiKey = window.apiKeyRawg || 'e477df29112544ab8396d8042e83419b';
        // usar funcion global de api_rawg.js si existe
        const nsfwFilter = typeof obtenerFiltroNsfw === 'function' ? obtenerFiltroNsfw() : '&exclude_tags=nsfw,nudity,eroge,hentai,adult';
        
        const url = `https://api.rawg.io/api/games?key=${apiKey}&dates=2020-01-01,2026-12-31&ordering=-added&page_size=20${nsfwFilter}`;
        
        mostrarCargando();
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const limpios = window.limpiarJuegos ? window.limpiarJuegos(data.results) : data.results;
                renderizarJuegos(limpios);
            })
            .catch(err => {
                console.error(err);
                mostrarError();
            });
    }

    function aplicarFiltros() {
        const categoria = selectCategoria.value;
        
        if (categoria === 'merch') {
            if (typeof listaMerch !== 'undefined') {
                renderizarMerchCatalogo(listaMerch);
            } else {
                contenedorResultados.innerHTML = `<div class="col-12 text-center text-muted py-5">No se pudo cargar la mercancía.</div>`;
            }
            return;
        }

        const plataforma = selectPlataforma.value;
        const ordenStr = selectOrden.value;
        const apiKey = window.apiKeyRawg || 'e477df29112544ab8396d8042e83419b';
        const nsfwFilter = typeof obtenerFiltroNsfw === 'function' ? obtenerFiltroNsfw() : '&exclude_tags=nsfw,nudity,eroge,hentai,adult';
        
        let url = `https://api.rawg.io/api/games?key=${apiKey}&page_size=20${nsfwFilter}`;

        if (categoria !== 'todos') {
            url += `&search=${categoria}`; 
        }
        
        if (plataforma !== 'todas' && mapaPlataformas[plataforma]) {
            url += `&platforms=${mapaPlataformas[plataforma]}`;
        }
        
        if (mapaOrden[ordenStr]) {
            url += `&ordering=${mapaOrden[ordenStr]}`;
        }

        mostrarCargando();
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if(data.results && data.results.length > 0) {
                    const limpios = window.limpiarJuegos ? window.limpiarJuegos(data.results) : data.results;
                    renderizarJuegos(limpios);
                } else {
                    contenedorResultados.innerHTML = `<div class="col-12 text-center text-muted py-5">No se encontraron resultados para los filtros seleccionados.</div>`;
                }
            })
            .catch(err => {
                console.error(err);
                mostrarError();
            });
    }

    function mostrarCargando() {
        contenedorResultados.innerHTML = `
            <div class="col-12 text-center py-5 w-100">
                <div class="spinner-border text-principal" role="status" style="color: var(--color-principal);"></div>
                <p class="mt-3 text-muted fs-5">Buscando en el catálogo...</p>
            </div>
        `;
    }
    
    function mostrarError() {
        contenedorResultados.innerHTML = `<div class="col-12 text-center text-danger py-5">Ocurrió un error al cargar los datos desde RAWG API. Inténtalo más tarde.</div>`;
    }

    function renderizarJuegos(juegos) {
        contenedorResultados.innerHTML = ''; 
        let cantidadMostrada = 0;
        
        juegos.forEach(juego => {
            const precioAleatorio = (Math.random() * (69.99 - 19.99) + 19.99).toFixed(2);
            
            const maxPrecio = parseFloat(rangoPrecio.value);
            if(parseFloat(precioAleatorio) > maxPrecio) {
                return; // Omitir si excede el precio filtrado
            }
            
            cantidadMostrada++;
            const imagen = juego.background_image || 'https://via.placeholder.com/300x200/121212/ffffff?text=No+Image';
            
            const tarjetaHtml = `
                <div class="col">
                    <div class="card card-game h-100">
                        <div class="position-relative">
                            <img src="${imagen}" class="card-img-top img-poster w-100" alt="${juego.name}" style="height: 200px; object-fit: cover;">
                            <span class="position-absolute top-0 end-0 m-2 badge bg-dark border border-secondary">⭐ ${juego.rating}</span>
                            <button class="btn btn-outline-danger btn-sm position-absolute top-0 start-0 m-2 rounded-circle btn-deseo d-flex align-items-center justify-content-center p-0" 
                                    style="width: 35px; height: 35px; background-color: rgba(18, 18, 18, 0.8);"
                                    data-id="${juego.id}"
                                    onclick="if(window.toggleDeseo) window.toggleDeseo('${juego.id}', '${juego.name.replace(/'/g, "\\'")}', '${precioAleatorio}', '${imagen}', this)">🤍</button>
                        </div>
                        <div class="card-body d-flex flex-column text-start">
                            <h6 class="card-title text-truncate mb-3" title="${juego.name}">${juego.name}</h6>
                            <div class="mt-auto d-flex flex-column gap-2">
                                <span class="text-precio fs-5 mb-1">$${precioAleatorio}</span>
                                <button class="btn btn-principal btn-sm w-100 fw-bold" onclick="if(window.agregarAlCarrito) window.agregarAlCarrito('${juego.id}', '${juego.name.replace(/'/g, "\\'")}', '${precioAleatorio}', '${imagen}')">Añadir al Carrito 🛒</button>
                                <button class="btn btn-tema-custom btn-sm w-100" onclick="window.location.href='Detalles.html?id=${juego.id}'">Ver Detalles</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            contenedorResultados.innerHTML += tarjetaHtml;
        });
        
        if (cantidadMostrada === 0) {
            contenedorResultados.innerHTML = `<div class="col-12 text-center py-5 text-muted w-100">Ningún artículo cumple con el filtro de precio ($${rangoPrecio.value}).</div>`;
        }
        
        if(window.actualizarCorazonesUI) window.actualizarCorazonesUI();
    }

    function renderizarMerchCatalogo(productos) {
        contenedorResultados.innerHTML = '';
        let cantidadMostrada = 0;
        
        productos.forEach(producto => {
            const maxPrecio = parseFloat(rangoPrecio.value);
            if(parseFloat(producto.price) > maxPrecio) {
                return;
            }
            
            cantidadMostrada++;
            const tarjetaMerchHtml = `
                <div class="col">
                    <div class="card card-game h-100">
                        <div class="position-relative">
                            <img src="${producto.image}" class="card-img-top img-poster w-100" alt="${producto.name}" style="height: 200px; object-fit: cover;">
                            <span class="position-absolute top-0 end-0 m-2 badge badge-merch px-2 py-1">${producto.category}</span>
                            <button class="btn btn-outline-danger btn-sm position-absolute top-0 start-0 m-2 rounded-circle btn-deseo d-flex align-items-center justify-content-center p-0" 
                                    style="width: 35px; height: 35px; background-color: rgba(18, 18, 18, 0.8);"
                                    data-id="${producto.id}_merch"
                                    onclick="if(window.toggleDeseo) window.toggleDeseo('${producto.id}_merch', '${producto.name.replace(/'/g, "\\'")}', '${producto.price}', '${producto.image}', this)">🤍</button>
                        </div>
                        <div class="card-body d-flex flex-column text-start">
                            <h6 class="card-title text-truncate mb-3" title="${producto.name}">${producto.name}</h6>
                            <div class="mt-auto d-flex justify-content-between align-items-center">
                                <span class="text-precio fs-5 fw-bold">$${producto.price}</span>
                                <button class="btn btn-principal btn-sm fw-bold" onclick="if(window.agregarAlCarrito) window.agregarAlCarrito('${producto.id}_merch', '${producto.name.replace(/'/g, "\\'")}', '${producto.price}', '${producto.image}', '${producto.category}')">Añadir 🛒</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            contenedorResultados.innerHTML += tarjetaMerchHtml;
        });
        
        if (cantidadMostrada === 0) {
            contenedorResultados.innerHTML = `<div class="col-12 text-center py-5 text-muted w-100">Ningún artículo de mercancía cumple con el filtro de precio ($${rangoPrecio.value}).</div>`;
        }

        if(window.actualizarCorazonesUI) window.actualizarCorazonesUI();
    }
});
