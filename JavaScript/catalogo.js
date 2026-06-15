// Lógica específica para la página del Catálogo
document.addEventListener('DOMContentLoaded', () => {
    const btnFiltrar = document.getElementById('btn-aplicar-filtros-catalogo');
    const selectCategoria = document.getElementById('filtro-cat-avanzado');
    const selectPlataforma = document.getElementById('filtro-plataforma');
    const rangoPrecio = document.getElementById('rango-precio');
    const selectOrden = document.querySelector('select.form-select.form-select-sm');
    const contenedorResultados = document.getElementById('contenedor-resultados-catalogo');
    
    let paginaActual = 1;
    let urlBaseActual = '';

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
            paginaActual = 1;
            aplicarFiltros();
        });
    }

    // Cargar juegos por defecto al entrar al catálogo
    if (contenedorResultados) {
        paginaActual = 1;
        cargarJuegosCatalogoDefault();
    }

    function cargarJuegosCatalogoDefault() {
        const apiKey = window.apiKeyRawg || 'e477df29112544ab8396d8042e83419b';
        // usar funcion global de api_rawg.js si existe
        const nsfwFilter = typeof obtenerFiltroNsfw === 'function' ? obtenerFiltroNsfw() : '&exclude_tags=nsfw,nudity,eroge,hentai,adult';
        
        urlBaseActual = `https://api.rawg.io/api/games?key=${apiKey}&dates=2018-01-01,2026-12-31&ordering=-added&page_size=20${nsfwFilter}`;
        ejecutarBusqueda();
    }

    function aplicarFiltros() {
        const categoria = selectCategoria.value;
        const plataforma = selectPlataforma.value;
        const ordenStr = selectOrden.value;
        const apiKey = window.apiKeyRawg || 'e477df29112544ab8396d8042e83419b';
        const nsfwFilter = typeof obtenerFiltroNsfw === 'function' ? obtenerFiltroNsfw() : '&exclude_tags=nsfw,nudity,eroge,hentai,adult';
        
        let url = `https://api.rawg.io/api/games?key=${apiKey}&dates=2018-01-01,2026-12-31&page_size=20${nsfwFilter}`;

        if (categoria !== 'todos') {
            if (categoria === 'multiplayer' || categoria === 'horror') {
                url += `&tags=${categoria}`; 
            } else {
                url += `&genres=${categoria}`; 
            }
        }
        
        if (plataforma !== 'todas' && mapaPlataformas[plataforma]) {
            url += `&platforms=${mapaPlataformas[plataforma]}`;
        }
        
        if (mapaOrden[ordenStr]) {
            url += `&ordering=${mapaOrden[ordenStr]}`;
        }

        urlBaseActual = url;
        ejecutarBusqueda();
    }

    function ejecutarBusqueda() {
        const urlFinal = `${urlBaseActual}&page=${paginaActual}`;
        mostrarCargando();
        fetch(urlFinal)
            .then(res => res.json())
            .then(data => {
                if(data.results && data.results.length > 0) {
                    const limpios = window.limpiarJuegos ? window.limpiarJuegos(data.results) : data.results;
                    renderizarJuegos(limpios);
                    renderizarPaginacion(data.next, data.previous, data.count);
                } else {
                    contenedorResultados.innerHTML = `<div class="col-12 text-center text-muted py-5">No se encontraron resultados para los filtros seleccionados.</div>`;
                    const pagContainer = document.getElementById('paginacion-container');
                    if(pagContainer) pagContainer.innerHTML = '';
                }
            })
            .catch(err => {
                console.error(err);
                mostrarError();
            });
    }

    function renderizarPaginacion(hasNext, hasPrev, totalCount) {
        const pagContainer = document.getElementById('paginacion-container');
        if(!pagContainer) return;

        let html = '';
        
        html += `
            <li class="page-item ${hasPrev ? '' : 'disabled'}">
                <a class="page-link" href="#titulo-catalogo" onclick="event.preventDefault(); if(!this.parentElement.classList.contains('disabled')) { window.cambiarPagina(${paginaActual - 1}); }" ${hasPrev ? '' : 'tabindex="-1" aria-disabled="true"'}>Anterior</a>
            </li>
        `;
        
        html += `<li class="page-item active"><a class="page-link" href="#titulo-catalogo" onclick="event.preventDefault();">${paginaActual}</a></li>`;
        
        if(hasNext) {
            html += `<li class="page-item"><a class="page-link" href="#titulo-catalogo" onclick="event.preventDefault(); window.cambiarPagina(${paginaActual + 1});">${paginaActual + 1}</a></li>`;
            
            if (paginaActual === 1) {
                html += `<li class="page-item"><a class="page-link" href="#titulo-catalogo" onclick="event.preventDefault(); window.cambiarPagina(${paginaActual + 2});">${paginaActual + 2}</a></li>`;
            }
        }

        html += `
            <li class="page-item ${hasNext ? '' : 'disabled'}">
                <a class="page-link" href="#titulo-catalogo" onclick="event.preventDefault(); if(!this.parentElement.classList.contains('disabled')) { window.cambiarPagina(${paginaActual + 1}); }" ${hasNext ? '' : 'tabindex="-1" aria-disabled="true"'}>Siguiente</a>
            </li>
        `;

        pagContainer.innerHTML = html;
    }
    
    window.cambiarPagina = function(nuevaPagina) {
        paginaActual = nuevaPagina;
        ejecutarBusqueda();
        document.getElementById('titulo-catalogo').scrollIntoView({ behavior: 'smooth' });
    };

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
                    <div class="card card-game h-100" style="cursor: pointer;" onclick="window.location.href='Detalles.html?id=${juego.id}'">
                        <div class="position-relative">
                            <img src="${imagen}" class="card-img-top img-poster w-100" alt="${juego.name}" style="height: 200px; object-fit: cover;">
                            <span class="position-absolute top-0 end-0 m-2 badge bg-dark border border-secondary d-flex align-items-center gap-1"><span class="material-symbols-outlined" style="font-size: 14px;">star</span> ${juego.rating}</span>
                            <button class="btn btn-outline-danger btn-sm position-absolute top-0 start-0 m-2 rounded-circle btn-deseo d-flex align-items-center justify-content-center p-0" 
                                    style="width: 35px; height: 35px; background-color: rgba(18, 18, 18, 0.8);"
                                    data-id="${juego.id}"
                                    onclick="event.stopPropagation(); if(window.toggleDeseo) window.toggleDeseo('${juego.id}', '${juego.name.replace(/'/g, "\\'")}', '${precioAleatorio}', '${imagen}', this)"><span class="material-symbols-outlined fs-5">favorite_border</span></button>
                        </div>
                        <div class="card-body d-flex flex-column text-start">
                            <h6 class="card-title text-truncate mb-3" title="${juego.name}">${juego.name}</h6>
                            <div class="mt-auto d-flex flex-column gap-2">
                                <span class="text-precio fs-5 mb-1">$${precioAleatorio}</span>
                                <button class="btn btn-principal btn-sm w-100 fw-bold d-flex justify-content-center align-items-center gap-1" onclick="event.stopPropagation(); if(window.agregarAlCarrito) window.agregarAlCarrito('${juego.id}', '${juego.name.replace(/'/g, "\\'")}', '${precioAleatorio}', '${imagen}')"><span class="material-symbols-outlined" style="font-size: 18px;">shopping_cart</span> Añadir al Carrito</button>
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


});
