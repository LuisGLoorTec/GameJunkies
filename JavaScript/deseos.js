// --- Lógica Global de Lista de Deseos ---
document.addEventListener('DOMContentLoaded', () => {
    // Si estamos en una página que requiere actualizar visualmente los corazones al cargar
    actualizarCorazonesUI();
});

// Obtener la lista de deseos actual del usuario (desde usuarioActual)
function obtenerDeseos() {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    if (!usuarioActual) return [];
    return usuarioActual.deseos || [];
}

// Verificar si un juego está en la lista de deseos
function esDeseado(id) {
    const deseos = obtenerDeseos();
    return deseos.some(item => item.id == id);
}

// Agregar o Quitar un juego de la lista de deseos
window.toggleDeseo = function(id, name, price, image, buttonElement) {
    let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    
    // 1. Validar que el usuario esté logueado
    if (!usuarioActual) {
        if(window.mostrarToast) window.mostrarToast('Debes iniciar sesión para añadir a favoritos', 'error');
        
        const modalLogin = typeof bootstrap !== 'undefined' ? bootstrap.Modal.getInstance(document.getElementById('modalLogin')) || new bootstrap.Modal(document.getElementById('modalLogin')) : null;
        if (modalLogin) {
            modalLogin.show();
        } else {
            window.location.href = 'Login.html';
        }
        return;
    }

    if (!usuarioActual.deseos) {
        usuarioActual.deseos = [];
    }

    const index = usuarioActual.deseos.findIndex(item => item.id == id);
    let agregado = false;

    if (index !== -1) {
        // Ya existe, lo quitamos
        usuarioActual.deseos.splice(index, 1);
        if(window.mostrarToast) window.mostrarToast(`"${name}" removido de tu lista de deseos`, 'info');
    } else {
        // No existe, lo agregamos
        usuarioActual.deseos.push({
            id: id,
            name: name,
            price: parseFloat(price).toFixed(2),
            image: image,
            addedAt: new Date().toISOString()
        });
        agregado = true;
        if(window.mostrarToast) window.mostrarToast(`"${name}" añadido a tu lista de deseos <span class="material-symbols-outlined fs-6 align-text-bottom">favorite</span>`, 'success');
    }

    // Guardar cambios en el usuario actual
    localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));

    // Actualizar también en el array global de usuarios
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const idxGlobal = usuarios.findIndex(u => u.email === usuarioActual.email);
    if (idxGlobal !== -1) {
        usuarios[idxGlobal] = usuarioActual;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    // Actualizar la interfaz del botón clickeado inmediatamente
    if (buttonElement) {
        if (agregado) {
            buttonElement.classList.remove('btn-outline-danger');
            buttonElement.classList.add('btn-danger');
            buttonElement.innerHTML = '<span class="material-symbols-outlined fs-5">favorite</span>';
        } else {
            buttonElement.classList.remove('btn-danger');
            buttonElement.classList.add('btn-outline-danger');
            buttonElement.innerHTML = '<span class="material-symbols-outlined fs-5">favorite_border</span>';
        }
    }
    
    // Actualizar cualquier otra instancia en la pantalla
    actualizarCorazonesUI();
};

// Función para sincronizar todos los botones de corazón en la pantalla
window.actualizarCorazonesUI = function() {
    const botonesDeseo = document.querySelectorAll('.btn-deseo');
    const deseos = obtenerDeseos();
    
    botonesDeseo.forEach(btn => {
        const idJuego = btn.getAttribute('data-id');
        const estaEnDeseos = deseos.some(item => item.id == idJuego);
        
        if (estaEnDeseos) {
            btn.classList.remove('btn-outline-danger');
            btn.classList.add('btn-danger');
            if (btn.classList.contains('texto-largo')) {
                btn.innerHTML = '<span class="material-symbols-outlined fs-5 align-text-bottom">favorite</span> Quitar de Deseos';
            } else {
                btn.innerHTML = '<span class="material-symbols-outlined fs-5">favorite</span>';
            }
        } else {
            btn.classList.remove('btn-danger');
            btn.classList.add('btn-outline-danger');
            if (btn.classList.contains('texto-largo')) {
                btn.innerHTML = '<span class="material-symbols-outlined fs-5 align-text-bottom">favorite_border</span> Añadir a Deseos';
            } else {
                btn.innerHTML = '<span class="material-symbols-outlined fs-5">favorite_border</span>';
            }
        }
    });
};
