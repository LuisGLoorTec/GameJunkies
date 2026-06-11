const apiKeyRawg = 'e477df29112544ab8396d8042e83419b';
// Función para obtener parámetros comunes de filtro
function obtenerFiltroNsfw() {
    return '&exclude_tags=nsfw,nudity,eroge,hentai,adult';
}

const carruselInner = document.querySelector('#carruselJuegos .carousel-inner');
const carruselIndicators = document.querySelector('#carruselJuegos .carousel-indicators');
const contenedorGrilla = document.getElementById('contenedor-juegos-grilla');

async function cargarDatosRawg() {
    try {
        const ocultarNsfw = obtenerFiltroNsfw();
        
        // Petición 1: Carrusel -> Estrenos famosos del 2016 hasta la actualidad y bien valorados (-added garantiza fama global)
        const urlCarrusel = `https://api.rawg.io/api/games?key=${apiKeyRawg}&dates=2016-01-01,2026-12-31&ordering=-added&metacritic=80,100&page_size=30${ocultarNsfw}`;
        
        // Petición 2: Grilla Destacados -> Juegos famosos desde el 2020 hasta el 2026 (-added)
        const urlGrilla = `https://api.rawg.io/api/games?key=${apiKeyRawg}&dates=2020-01-01,2026-12-31&ordering=-added&page_size=15${ocultarNsfw}`;

        // Realizamos ambas consultas al mismo tiempo
        const [respCarrusel, respGrilla] = await Promise.all([
            fetch(urlCarrusel),
            fetch(urlGrilla)
        ]);

        const datosCarrusel = await respCarrusel.json();
        const datosGrilla = await respGrilla.json();
        
        if (carruselInner && carruselIndicators) {
            const carruselMezclado = datosCarrusel.results.sort(() => 0.5 - Math.random()).slice(0, 6);
            renderizarCarrusel(carruselMezclado);
        }
        
        if (contenedorGrilla) {
            renderizarGrilla(datosGrilla.results);
        }
        
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
        
        const precioAleatorio = (Math.random() * (69.99 - 19.99) + 19.99).toFixed(2);
        
        const itemCarrusel = `
            <div class="carousel-item ${esActivo}" style="height: 600px;">
                <img src="${juego.background_image}" class="d-block w-100 h-100" alt="${juego.name}" style="object-fit: cover;">
                <div class="carrusel-degradado"></div>
                <div class="carousel-caption d-none d-md-block">
                    <span class="insignia-hero mb-3 d-inline-block">V ${juego.rating}</span>
                    <h5 class="titulo-hero">${juego.name}</h5>
                    <div class="d-flex gap-3 mt-4">
                        <button class="btn btn-principal w-100 mb-2" onclick="if(window.agregarAlCarrito) window.agregarAlCarrito('${juego.id}', '${juego.name.replace(/'/g, "\\'")}', '${precioAleatorio}', '${juego.background_image}')">Añadir al Carrito 🛒</button>
                        <button class="btn btn-outline-light w-100" onclick="window.location.href='Detalles.html?id=${juego.id}'">Ver Detalles</button>
                    </div>
                </div>
            </div>
        `;
        carruselInner.innerHTML += itemCarrusel;
    });
}

function renderizarGrilla(juegos) {
    const contenedorGrilla = document.getElementById('contenedor-juegos-grilla');
    contenedorGrilla.innerHTML = ''; 
    
    juegos.forEach(juego => {
        const precioAleatorio = (Math.random() * (69.99 - 19.99) + 19.99).toFixed(2);
        
        const tarjetaHtml = `
            <div class="col">
                <div class="card card-game h-100">
                    <div class="position-relative">
                        <img src="${juego.background_image}" class="card-img-top img-poster w-100" alt="${juego.name}">
                        <span class="position-absolute top-0 end-0 m-2 badge bg-dark border border-secondary">⭐ ${juego.rating}</span>
                    </div>
                    <div class="card-body d-flex flex-column text-start">
                        <h6 class="card-title text-truncate mb-3" title="${juego.name}">${juego.name}</h6>
                        <div class="mt-auto d-flex flex-column gap-2">
                            <span class="text-precio fs-5 mb-1">$${precioAleatorio}</span>
                            <button class="btn btn-principal btn-sm w-100" onclick="if(window.agregarAlCarrito) window.agregarAlCarrito('${juego.id}', '${juego.name.replace(/'/g, "\\'")}', '${precioAleatorio}', '${juego.background_image}')">Añadir al Carrito 🛒</button>
                            <button class="btn btn-outline-light btn-sm w-100" onclick="window.location.href='Detalles.html?id=${juego.id}'">Ver Detalles</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        contenedorGrilla.innerHTML += tarjetaHtml;
    });
}

cargarDatosRawg();

cargarDatosRawg();

let inputBuscador, btnBuscar, listaSugerencias;
const tituloCatalogo = document.getElementById('titulo-catalogo');
let temporizadorBusqueda; 

document.addEventListener('DOMContentLoaded', () => {
    // Retrasar levemente la asignación para asegurar que layout.js inyectó el HTML
    setTimeout(() => {
        inputBuscador = document.getElementById('input-buscador');
        btnBuscar = document.getElementById('btn-buscar');
        listaSugerencias = document.getElementById('lista-sugerencias'); 

        if(btnBuscar) {
            btnBuscar.addEventListener('click', () => {
                const termino = inputBuscador.value.trim();
                if (termino !== '') {
                    ejecutarBusqueda(termino);
                }
            });
        }

        if(inputBuscador) {
            inputBuscador.addEventListener('keypress', (evento) => {
                if (evento.key === 'Enter') {
                    evento.preventDefault();
                    const termino = inputBuscador.value.trim();
                    if (termino !== '') {
                        ejecutarBusqueda(termino);
                    }
                }
            });

            inputBuscador.addEventListener('input', () => {
                const termino = inputBuscador.value.trim();

                clearTimeout(temporizadorBusqueda);

                if (termino === '') {
                    listaSugerencias.style.display = 'none';
                    return;
                }

                temporizadorBusqueda = setTimeout(() => {
                    const urlSugerencias = `https://api.rawg.io/api/games?key=${apiKeyRawg}&search=${termino}&page_size=5`;

                    fetch(urlSugerencias)
                        .then(response => response.json())
                        .then(respuesta => mostrarSugerencias(respuesta.results))
                        .catch(error => console.log(error));
                }, 400); 
            });
        }
    }, 100);
});

function mostrarSugerencias(juegos) {
    listaSugerencias.innerHTML = ''; 
    if (juegos.length === 0) {
        listaSugerencias.style.display = 'none';
        return;
    }

    juegos.forEach(juego => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex align-items-center';
        const imagen = juego.background_image ? juego.background_image : 'https://via.placeholder.com/40x40/121212/ffffff?text=?';

        li.innerHTML = `
            <img src="${imagen}" class="sugerencia-img" alt="${juego.name}">
            <span class="text-truncate fw-bold">${juego.name}</span>
        `;


        li.addEventListener('click', () => {
            window.location.href = `detalles.html?id=${juego.id}`; 
        });

        listaSugerencias.appendChild(li);
    });

    listaSugerencias.style.display = 'block'; 
}

function ejecutarBusqueda(termino) {
    const ocultarNsfw = obtenerFiltroNsfw();
    const urlBusqueda = `https://api.rawg.io/api/games?key=${apiKeyRawg}&search=${termino}&page_size=15${ocultarNsfw}`;

    fetch(urlBusqueda)
        .then(response => response.json())
        .then(respuesta => {
            tituloCatalogo.textContent = `Resultados de búsqueda: "${termino}"`;
            renderizarGrilla(respuesta.results);
            document.getElementById('contenedor-juegos-grilla').scrollIntoView({ behavior: 'smooth', block: 'start' });
        })
        .catch(error => console.log(error)); 
}

// --- Inicio: Datos Estáticos Merchandising ---

const listaMerch = [
    {
        id: 1,
        name: "Estatua Malenia 'Espada de Miquella' - Edición Coleccionista",
        category: "Coleccionables",
        price: "189.99",
        image: "../img/merch/malenia.webp"
    },
    {
        id: 2,
        name: "Chaqueta Bomber 'Raccoon Police Dept' (R.P.D.) - Resident Evil",
        category: "Ropa",
        price: "49.99",
        image: "../img/merch/chaquetaRE.avif" 
    },
    {
        id: 3,
        name: "Réplica Révolver 'Hand Cannon' - Colección Overwatch",
        category: "Réplicas",
        price: "120.00",
        image: "../img/merch/macCree.jpg" 
    },
    {
        id: 4,
        name: "Sudadera con Capucha Premium 'Golden Order' - Elden Ring",
        category: "Ropa",
        price: "49.99",
        image: "../img/merch/chaquetaER.webp" 
    },
    {
        id: 5,
        name: "Gorra Ajustable 'Umbrella Corporation' - Textura Impermeable",
        category: "Accesorios",
        price: "14.95",
        image: "../img/merch/gorraUmbr.jpg" 
    },
    {
        id: 6,
        name: "Mousepad XXL Gamer 'Overwatch 2' - Superficie de Control Speed",
        category: "Accesorios",
        price: "11.99",
        image: "../img/merch/mousepadOW.jpg" 
    },
    {
        id: 7,
        name: "Camiseta Deportiva 'Blue Lock' - Edición Especial Bastard München",
        category: "Ropa",
        price: "35.00",
        image: "../img/merch/camisetaBastard.jpg" 
    },
    {
        id: 8,
        name: "Termo de Acero Inoxidable 'First Aid Spray' - Resident Evil",
        category: "Accesorios",
        price: "10.50",
        image: "../img/merch/TermoRE.avif" 
    },
    {
        id: 9,
        name: "Chaqueta Universitaria 'J High School' - Lookism / Universo PTJ",
        category: "Ropa",
        price: "40.00",
        image: "../img/merch/chaquetaLookims.jpg" 
    },
    {
        id: 10,
        name: "Réplica 'Vampire Killer' Látigo de Cuero - Castlevania",
        category: "Réplicas",
        price: "90.00",
        image: "../img/merch/latigoCastl.jpg" 
    },
    {
        id: 11,
        name: "Lámpara de Noche LED 'Frasco de Lágrimas Carmesí' - Elden Ring",
        category: "Accesorios",
        price: "25.00",
        image: "../img/merch/lamparaElden.avif" 
    },
    {
        id: 12,
        name: "Peluche Pachimari Original Oficial - Overwatch",
        category: "Coleccionables",
        price: "19.99",
        image: "../img/merch/pelucheOW.jpg" 
    }
];

const selectCategoria = document.getElementById('filtro-categoria');
const contenedorMerch = document.getElementById('contenedor-merch-grilla');

function renderizarMerch(productos) {
    contenedorMerch.innerHTML = '';
    
    productos.forEach(producto => {
        const tarjetaMerchHtml = `
            <div class="col">
                <div class="card card-game h-100">
                    <div class="position-relative">
                        <img src="${producto.image}" class="card-img-top img-poster w-100" alt="${producto.name}">
                        <span class="position-absolute top-0 end-0 m-2 badge badge-merch">${producto.category}</span>
                    </div>
                    <div class="card-body d-flex flex-column text-start">
                        <h6 class="card-title text-truncate mb-3" title="${producto.name}">${producto.name}</h6>
                        <div class="mt-auto d-flex justify-content-between align-items-center">
                            <span class="text-precio fs-5">$${producto.price}</span>
                            <button class="btn btn-principal btn-sm" onclick="if(window.agregarAlCarrito) window.agregarAlCarrito('${producto.id}_merch', '${producto.name.replace(/'/g, "\\'")}', '${producto.price}', '${producto.image}', '${producto.category}')">Añadir 🛒</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        contenedorMerch.innerHTML += tarjetaMerchHtml;
    });
}
// --- Fin: Datos Estáticos Merchandising ---

// --- Inicio: Lógica de Filtrado ---
if (selectCategoria) {
    selectCategoria.addEventListener('change', (e) => {
        const opcionSeleccionada = e.target.value;
    
    if (opcionSeleccionada === 'merch') {
        contenedorGrilla.style.display = 'none';
        contenedorMerch.style.display = 'flex';
        tituloCatalogo.textContent = "Merchandising & Artículos de Colección";
        renderizarMerch(listaMerch);
    } else {
        contenedorMerch.style.display = 'none';
        contenedorGrilla.style.display = 'flex';
        
        if (opcionSeleccionada === 'todos') {
            tituloCatalogo.textContent = "Video Juegos Destacados";
            cargarDatosRawg(); 
        } else {
            tituloCatalogo.textContent = `Videojuegos: Categoria ${opcionSeleccionada.toUpperCase()}`;
            ejecutarBusqueda(opcionSeleccionada);
        }
    }
    });
}