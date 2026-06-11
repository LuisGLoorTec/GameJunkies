document.addEventListener('DOMContentLoaded', () => {
    // 1. Verificar si hay sesión iniciada
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    
    if (!usuarioActual) {
        window.location.href = 'Login.html';
        return;
    }

    // 2. Cargar Sidebar (Nombre y Avatar)
    const sidebarNombre = document.getElementById('sidebar-nombre');
    const avatarImg = document.getElementById('avatar-img');

    if (sidebarNombre) sidebarNombre.textContent = usuarioActual.nombre.split(' ')[0];
    
    if (avatarImg) {
        if (usuarioActual.avatar) {
            avatarImg.src = usuarioActual.avatar;
        } else {
            const seed = encodeURIComponent(usuarioActual.email);
            avatarImg.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}&backgroundColor=121212`;
        }
    }

    // 3. Renderizar Lista de Deseos
    const contenedorDeseos = document.getElementById('contenedor-deseos');
    
    function renderizarListaDeseos() {
        const deseos = window.obtenerDeseos ? window.obtenerDeseos() : (JSON.parse(localStorage.getItem('usuarioActual')).deseos || []);

        if (deseos.length === 0) {
            contenedorDeseos.innerHTML = `
                <div class="col-12 w-100">
                    <div class="card border-0 shadow-sm text-center py-5" style="background-color: var(--panel-oscuro);">
                        <div class="card-body">
                            <h4 style="color: var(--texto-principal);">Tu lista de deseos está vacía</h4>
                            <p class="text-muted mb-4">Añade juegos usando el ícono del corazón (❤️) mientras exploras la tienda.</p>
                            <a href="Catalogo.html" class="btn btn-principal px-4 py-2 fw-bold">Explorar Juegos</a>
                        </div>
                    </div>
                </div>
            `;
            return;
        }

        let html = '';
        deseos.forEach(item => {
            html += `
                <div class="col">
                    <div class="deseo-card h-100 d-flex flex-column">
                        <img src="${item.image}" class="deseo-img" alt="${item.name}">
                        <div class="p-3 d-flex flex-column flex-grow-1">
                            <h6 class="mb-2 text-truncate" style="color: var(--texto-principal);" title="${item.name}">${item.name}</h6>
                            <h5 class="fw-bold text-precio mb-3">$${item.price}</h5>
                            
                            <div class="mt-auto d-flex flex-column gap-2">
                                <button class="btn btn-principal btn-sm fw-bold w-100" 
                                        onclick="if(window.agregarAlCarrito) window.agregarAlCarrito('${item.id}', '${item.name.replace(/'/g, "\\'")}', '${item.price}', '${item.image}')">
                                    Añadir al Carrito 🛒
                                </button>
                                <button class="btn btn-outline-danger btn-sm w-100" 
                                        onclick="removerDeListaDeseos('${item.id}', '${item.name.replace(/'/g, "\\'")}')">
                                    ❌ Quitar de Lista
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        contenedorDeseos.innerHTML = html;
    }

    // Función auxiliar para remover desde la página y volver a renderizar
    window.removerDeListaDeseos = function(id, name) {
        if (window.toggleDeseo) {
            window.toggleDeseo(id, name, '0', '', null); // Elimina de localStorage
            renderizarListaDeseos(); // Refresca la vista
        }
    };

    // Renderizado inicial
    renderizarListaDeseos();
});
