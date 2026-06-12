// --- Inicio: Eventos al Cargar la Página ---
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        actualizarContadorCarrito();
    }, 100);

    const contenedorCarrito = document.getElementById('contenedor-items-carrito');
    if (contenedorCarrito) {
        renderizarCarrito();
    }

    const btnIrCheckout = document.getElementById('btn-ir-checkout');
    if (btnIrCheckout) {
        btnIrCheckout.addEventListener('click', () => {
            const usuario = localStorage.getItem('usuarioActual');
            if (!usuario) {
                if(window.mostrarToast) window.mostrarToast('Debes iniciar sesión para comprar', 'error');
                
                const modalLogin = new bootstrap.Modal(document.getElementById('modalLogin'));
                if (modalLogin) {
                    modalLogin.show();
                } else {
                    window.location.href = window.location.pathname.includes('/HTML/') ? 'Login.html' : 'HTML/Login.html';
                }
                return;
            }
            window.location.href = window.location.pathname.includes('/HTML/') ? 'Checkout.html' : 'HTML/Checkout.html';
        });
    }
});
// --- Fin: Eventos al Cargar la Página ---

// --- Inicio: Obtener Carrito ---
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}
// --- Fin: Obtener Carrito ---

// --- Inicio: Agregar al Carrito ---
window.agregarAlCarrito = function(id, name, price, image, category = 'Videojuego') {
    let carrito = obtenerCarrito();
    const index = carrito.findIndex(item => item.id == id);

    if (index !== -1) {
        carrito[index].quantity += 1;
    } else {
        carrito.push({
            id: id,
            name: name,
            price: parseFloat(price).toFixed(2),
            image: image,
            category: category,
            quantity: 1
        });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    
    if(window.mostrarToast) {
        window.mostrarToast(`"${name}" añadido al carrito`, 'success');
    }
};
// --- Fin: Agregar al Carrito ---

// --- Inicio: Renderizar Carrito Visual ---
function renderizarCarrito() {
    const contenedor = document.getElementById('contenedor-items-carrito');
    if (!contenedor) return;

    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div class="text-center py-5">
                <h4 class="text-muted mb-4">Tu carrito está vacío</h4>
                <a href="${window.location.pathname.includes('/HTML/') ? '../index.html' : 'index.html'}" class="btn btn-principal">Explorar Catálogo</a>
            </div>
        `;
        actualizarResumen(0);
        return;
    }

    let html = '';
    let subtotal = 0;

    carrito.forEach((item, index) => {
        subtotal += parseFloat(item.price) * item.quantity;
        
        html += `
            <div class="row align-items-center mb-3 pb-3 border-bottom" style="border-color: var(--borde-sutil) !important;">
                <div class="col-md-2 col-4">
                    <img src="${item.image}" class="img-fluid rounded border" alt="${item.name}" style="border-color: var(--borde-sutil) !important; aspect-ratio: 16/9; object-fit: cover;">
                </div>
                <div class="col-md-5 col-8">
                    <h6 class="mb-1 text-truncate" style="color: var(--texto-principal);" title="${item.name}">${item.name}</h6>
                    <small class="text-muted">Categoría: ${item.category}</small>
                </div>
                <div class="col-md-2 col-4 mt-3 mt-md-0 d-flex align-items-center">
                    <button class="btn btn-sm btn-outline-secondary px-2" onclick="cambiarCantidad(${index}, -1)">-</button>
                    <span class="mx-3 fw-bold" style="color: var(--texto-principal);">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary px-2" onclick="cambiarCantidad(${index}, 1)">+</button>
                </div>
                <div class="col-md-2 col-4 mt-3 mt-md-0 text-end">
                    <strong class="text-precio fs-5">$${(parseFloat(item.price) * item.quantity).toFixed(2)}</strong>
                </div>
                <div class="col-md-1 col-4 mt-3 mt-md-0 text-end">
                    <button class="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center p-2" title="Eliminar del carrito" onclick="eliminarItem(${index})">
                        <span class="material-symbols-outlined fs-6">delete</span>
                    </button>
                </div>
            </div>
        `;
    });

    contenedor.innerHTML = html;
    actualizarResumen(subtotal);
}
// --- Fin: Renderizar Carrito Visual ---

// --- Inicio: Modificar Cantidad y Eliminar Item ---
window.cambiarCantidad = function(index, delta) {
    let carrito = obtenerCarrito();
    if (carrito[index]) {
        carrito[index].quantity += delta;
        if (carrito[index].quantity <= 0) {
            carrito.splice(index, 1);
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarCarrito();
        actualizarContadorCarrito();
    }
};

window.eliminarItem = function(index) {
    let carrito = obtenerCarrito();
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
    actualizarContadorCarrito();
    
    if(window.mostrarToast) {
        window.mostrarToast('Artículo eliminado del carrito', 'info');
    }
};
// --- Fin: Modificar Cantidad y Eliminar Item ---

// --- Inicio: Resumen y Panel de Pago ---
function actualizarResumen(subtotal) {
    const elSubtotal = document.getElementById('resumen-subtotal');
    const elImpuestos = document.getElementById('resumen-impuestos');
    const elTotal = document.getElementById('resumen-total');
    const elCantidad = document.getElementById('resumen-cantidad');
    const btnIrCheckout = document.getElementById('btn-ir-checkout');

    if (elSubtotal && elImpuestos && elTotal && elCantidad) {
        const carrito = obtenerCarrito();
        const cantidadTotal = carrito.reduce((acc, item) => acc + item.quantity, 0);
        const impuestos = subtotal * 0.12;
        const total = subtotal + impuestos;

        elCantidad.textContent = cantidadTotal;
        elSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        elImpuestos.textContent = `$${impuestos.toFixed(2)}`;
        elTotal.textContent = `$${total.toFixed(2)}`;

        if (btnIrCheckout) {
            btnIrCheckout.disabled = carrito.length === 0;
        }
    }
}

window.actualizarContadorCarrito = function() {
    const carrito = obtenerCarrito();
    let cantidadTotal = 0;
    let subtotal = 0;
    
    carrito.forEach(item => {
        cantidadTotal += item.quantity;
        subtotal += parseFloat(item.price) * item.quantity;
    });
    
    const btnMiniCarrito = document.getElementById('btn-mini-carrito');
    if (btnMiniCarrito) {
        btnMiniCarrito.innerHTML = `🛒 (${cantidadTotal})`;
        if (cantidadTotal > 0) {
            btnMiniCarrito.classList.replace('btn-outline-warning', 'btn-warning');
        } else {
            btnMiniCarrito.classList.replace('btn-warning', 'btn-outline-warning');
        }
    }

    const contenedorMini = document.getElementById('mini-carrito-items');
    const elSubtotalMini = document.getElementById('mini-carrito-total');
    
    if (contenedorMini && elSubtotalMini) {
        if (carrito.length === 0) {
            contenedorMini.innerHTML = '<div class="text-center py-5 text-muted">Tu carrito está vacío</div>';
        } else {
            let htmlMini = '';
            carrito.forEach((item, index) => {
                htmlMini += `
                    <div class="d-flex align-items-center mb-3 pb-3 border-bottom" style="border-color: var(--borde-sutil) !important;">
                        <img src="${item.image}" class="rounded me-3" style="width: 60px; height: 60px; object-fit: cover; border: 1px solid var(--borde-sutil);">
                        <div class="flex-grow-1 overflow-hidden">
                            <h6 class="mb-1 text-truncate" style="font-size: 0.9rem;" title="${item.name}">${item.name}</h6>
                            <div class="text-muted" style="font-size: 0.8rem;">${item.quantity} x $${item.price}</div>
                        </div>
                        <div class="ms-2 text-end">
                            <strong class="text-precio d-block mb-1">$${(parseFloat(item.price) * item.quantity).toFixed(2)}</strong>
                            <button class="btn btn-sm btn-link text-danger p-0 text-decoration-none" onclick="eliminarItem(${index})"><small>Eliminar</small></button>
                        </div>
                    </div>
                `;
            });
            contenedorMini.innerHTML = htmlMini;
        }
        elSubtotalMini.textContent = `$${subtotal.toFixed(2)}`;
    }
};
// --- Fin: Resumen y Panel de Pago ---
