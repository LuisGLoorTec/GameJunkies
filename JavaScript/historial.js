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

    // 3. Renderizar Historial de Compras
    const contenedorHistorial = document.getElementById('contenedor-historial');
    const historial = usuarioActual.historial || [];

    if (historial.length === 0) {
        contenedorHistorial.innerHTML = `
            <div class="card border-0 shadow-sm text-center py-5" style="background-color: var(--panel-oscuro);">
                <div class="card-body">
                    <h4 style="color: var(--texto-principal);">No tienes compras aún</h4>
                    <p class="text-muted mb-4">Explora nuestro catálogo y encuentra tu próximo juego favorito.</p>
                    <a href="Catalogo.html" class="btn btn-principal px-4 py-2 fw-bold">Ir al Catálogo</a>
                </div>
            </div>
        `;
        return;
    }

    // Si hay historial, renderizar tarjetas
    contenedorHistorial.innerHTML = ''; // Limpiar loader

    historial.forEach((orden, index) => {
        // Formatear fecha
        const fechaObj = new Date(orden.fecha);
        const fechaFormateada = fechaObj.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Crear lista de items HTML
        let itemsHTML = '';
        orden.items.forEach(item => {
            // Soportar ambas nomenclaturas (español o inglés) para evitar que los historiales ya guardados se rompan
            const nombreItem = item.name || item.nombre;
            const imagenItem = item.image || item.imagen;
            const cantidadItem = item.quantity || item.cantidad;
            const precioItem = item.price || item.precio;

            itemsHTML += `
                <div class="d-flex align-items-center mb-2">
                    <img src="${imagenItem}" alt="${nombreItem}" class="order-item-img me-3 border" style="border-color: var(--borde-sutil) !important;">
                    <div class="flex-grow-1">
                        <h6 class="mb-0 text-truncate" style="color: var(--texto-principal); max-width: 200px;" title="${nombreItem}">${nombreItem}</h6>
                        <small class="text-muted">Cant: ${cantidadItem}</small>
                    </div>
                    <div class="text-end">
                        <span class="fw-bold" style="color: var(--color-secundario);">$${(parseFloat(precioItem) * cantidadItem).toFixed(2)}</span>
                    </div>
                </div>
            `;
        });

        // Construir Tarjeta
        const cardHTML = `
            <div class="order-card p-4 mb-4" data-aos="fade-up" data-aos-delay="${(index % 10) * 50}">
                <div class="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3" style="border-color: var(--borde-sutil) !important;">
                    <div>
                        <span class="badge bg-success mb-1">Completado</span>
                        <h5 class="mb-0" style="color: var(--texto-principal);">Orden ${orden.id}</h5>
                        <small class="text-muted">Realizada el ${fechaFormateada}</small>
                    </div>
                    <div class="text-end">
                        <small class="text-muted d-block">Total Pagado</small>
                        <h4 class="fw-bold mb-0" style="color: var(--color-principal);">$${orden.total}</h4>
                    </div>
                </div>
                
                <div class="order-items-list">
                    ${itemsHTML}
                </div>
                
                <div class="mt-3 text-end">
                    <button class="btn btn-sm btn-outline-secondary" onclick="window.mostrarToast('Descarga de recibo no disponible en la beta.', 'info')">
                        📄 Descargar Recibo
                    </button>
                </div>
            </div>
        `;
        
        contenedorHistorial.insertAdjacentHTML('beforeend', cardHTML);
    });
});
