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
    const contenedorGrilla = document.getElementById('contenedor-juegos-grilla');
    contenedorGrilla.innerHTML = ''; 
    juegos.forEach(juego => {

        const precioAleatorio = (Math.random() * (69.99 - 19.99) + 19.99).toFixed(2);
        const tarjetaHtml = `
            <div class="col">
                <div class="card card-game h-100">
                    <img src="${juego.background_image}" class="card-img-top img-poster" alt="${juego.name}">
                    <div class="card-body d-flex flex-column text-center">
                        <h6 class="card-title text-truncate fw-bold text-white" title="${juego.name}">${juego.name}</h6>
                        <div class="d-flex justify-content-between align-items-center mt-2 mb-3">
                            <span class="badge bg-secondary">⭐ ${juego.rating}</span>
                            <span class="text-precio fw-bold fs-5">$${precioAleatorio}</span>
                        </div>
                        <button class="btn btn-gaming mt-auto w-100">Ver Detalles</button>
                    </div>
                </div>
            </div>
        `;
        contenedorGrilla.innerHTML += tarjetaHtml;
    });
}

cargarDatosRawg();

const inputBuscador = document.getElementById('input-buscador');
const btnBuscar = document.getElementById('btn-buscar');
const tituloCatalogo = document.getElementById('titulo-catalogo');
const listaSugerencias = document.getElementById('lista-sugerencias'); 
let temporizadorBusqueda; 


btnBuscar.addEventListener('click', () => {
    const termino = inputBuscador.value.trim();
    if (termino !== '') {
        ejecutarBusqueda(termino);
    }
});

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
            inputBuscador.value = juego.name; 
            listaSugerencias.style.display = 'none'; 
            ejecutarBusqueda(juego.name); 
        });

        listaSugerencias.appendChild(li);
    });

    listaSugerencias.style.display = 'block'; 
}

document.addEventListener('click', (evento) => {
    if (!inputBuscador.contains(evento.target) && !listaSugerencias.contains(evento.target)) {
        listaSugerencias.style.display = 'none';
    }
});

function ejecutarBusqueda(termino) {
    const urlBusqueda = `https://api.rawg.io/api/games?key=${apiKeyRawg}&search=${termino}&page_size=8`;
    fetch(urlBusqueda)
        .then(response => response.json())
        .then(respuesta => {
            tituloCatalogo.textContent = `Resultados de búsqueda: "${termino}"`;
            renderizarGrilla(respuesta.results);
            document.getElementById('contenedor-juegos-grilla').scrollIntoView({ behavior: 'smooth', block: 'start' });
        })
        .catch(error => console.log(error)); 
}

// ==========================================
// SECCIÓN: DATOS QUEMADOS - MERCHANDISING
// ==========================================

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

// Captura de los nuevos elementos del DOM
const selectCategoria = document.getElementById('filtro-categoria');
const contenedorMerch = document.getElementById('contenedor-merch-grilla');

// Función encargada de renderizar los productos estáticos en el DOM
function renderizarMerch(productos) {
    contenedorMerch.innerHTML = '';
    
    productos.forEach(producto => {
        const tarjetaMerchHtml = `
            <div class="col">
                <div class="card card-game h-100">
                    <img src="${producto.image}" class="card-img-top img-poster" alt="${producto.name}">
                    <div class="card-body d-flex flex-column text-center">
                        <h6 class="card-title text-truncate fw-bold text-white" title="${producto.name}">${producto.name}</h6>
                        <div class="d-flex justify-content-between align-items-center mt-2 mb-3">
                            <span class="badge badge-merch">${producto.category}</span>
                            <span class="text-precio fw-bold fs-5">$${producto.price}</span>
                        </div>
                        <button class="btn btn-gaming mt-auto w-100">Comprar Artículo</button>
                    </div>
                </div>
            </div>
        `;
        contenedorMerch.innerHTML += tarjetaMerchHtml;
    });
}

// Escuchador de eventos para el select de filtrado
selectCategoria.addEventListener('change', (e) => {
    const opcionSeleccionada = e.target.value;
    
    if (opcionSeleccionada === 'merch') {
        // 1. Cambiar visibilidad de las grillas
        contenedorGrilla.style.display = 'none';
        contenedorMerch.style.display = 'flex';
        
        // 2. Modificar dinámicamente el título principal de la sección
        tituloCatalogo.textContent = "Merchandising & Artículos de Colección";
        
        // 3. Renderizar los datos quemados
        renderizarMerch(listaMerch);
    } else {
        // Si se selecciona cualquier otra opción (todos, acción, rpg, etc.) volver a la API
        contenedorMerch.style.display = 'none';
        contenedorGrilla.style.display = 'flex';
        
        if (opcionSeleccionada === 'todos') {
            tituloCatalogo.textContent = "Video Juegos Destacados";
            cargarDatosRawg(); // Vuelve a rellenar la grilla original con datos de la API
        } else {
            // Aquí puedes mapear en el futuro búsquedas automáticas por género a la API si lo requieres
            tituloCatalogo.textContent = `Videojuegos: Categoria ${opcionSeleccionada.toUpperCase()}`;
            ejecutarBusqueda(opcionSeleccionada);
        }
    }
});