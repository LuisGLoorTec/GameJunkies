document.addEventListener('DOMContentLoaded', () => {
    const contenedorSubastas = document.getElementById('contenedor-subastas');

    // Datos iniciales si el LocalStorage está vacío, usando merch real de la app
    const subastasIniciales = [
        {
            id: 'subasta_1',
            name: "Estatua Malenia 'Espada de Miquella' (Firma Especial)",
            image: "../img/merch/malenia.webp",
            pujaActual: 450.00,
            usuarioLider: "Tarnished_99",
            fechaFin: new Date(Date.now() + 3600 * 1000 * 24 * 2).toISOString() // +2 días
        },
        {
            id: 'subasta_2',
            name: "Revólver 'Hand Cannon' Prototipo OW",
            image: "../img/merch/macCree.jpg",
            pujaActual: 300.00,
            usuarioLider: "HighNoonFan",
            fechaFin: new Date(Date.now() + 3600 * 1000 * 5 + 60000 * 12).toISOString() // +5 horas 12 min
        },
        {
            id: 'subasta_3',
            name: "Látigo 'Vampire Killer' Réplica del Desarrollador",
            image: "../img/merch/latigoCastl.jpg",
            pujaActual: 850.00,
            usuarioLider: "Belmont_X",
            fechaFin: new Date(Date.now() + 60 * 1000 * 45).toISOString() // +45 minutos
        }
    ];

    // Cargar o inicializar estado en LocalStorage
    let estadoSubastas = JSON.parse(localStorage.getItem('subastasGameJunkies'));
    
    // Validar si las fechas expiraron o están corruptas, para que siempre haya contenido
    if (!estadoSubastas || estadoSubastas.length === 0) {
        estadoSubastas = subastasIniciales;
        localStorage.setItem('subastasGameJunkies', JSON.stringify(estadoSubastas));
    } else {
        let renovar = false;
        estadoSubastas.forEach(sub => {
            if (new Date(sub.fechaFin).getTime() < Date.now()) {
                sub.fechaFin = new Date(Date.now() + 3600 * 1000 * 24).toISOString();
                renovar = true;
            }
        });
        if (renovar) localStorage.setItem('subastasGameJunkies', JSON.stringify(estadoSubastas));
    }

    // Renderizar al inicio
    renderizarSubastas();

    // Timer global para actualizar cuentas regresivas cada segundo
    setInterval(actualizarTemporizadores, 1000);

    function renderizarSubastas(animarId = null) {
        if (!contenedorSubastas) return;
        contenedorSubastas.innerHTML = '';
        
        const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
        const nombreUsuario = usuarioActual ? usuarioActual.nombre : null;

        estadoSubastas.forEach(subasta => {
            const minPuja = parseFloat(subasta.pujaActual) + 10;
            const esLider = nombreUsuario && subasta.usuarioLider === nombreUsuario;
            const animar = subasta.id === animarId ? 'nueva-puja' : '';

            const tarjeta = document.createElement('div');
            tarjeta.className = 'col';
            tarjeta.innerHTML = `
                <div class="card card-game h-100 ${animar}" style="${esLider ? 'border-color: var(--color-exito); box-shadow: 0 0 15px rgba(65, 187, 66, 0.2);' : ''}">
                    <div class="position-relative">
                        <img src="${subasta.image}" class="card-img-top w-100" alt="${subasta.name}" style="height: 300px; object-fit: cover;">
                        ${esLider ? '<span class="position-absolute top-0 end-0 m-2 badge bg-success px-2 py-1 fs-6">¡Vas Ganando! 👑</span>' : ''}
                        <span class="position-absolute top-0 start-0 m-2 badge badge-merch px-2 py-1 fs-6">EN VIVO 🔴</span>
                    </div>
                    <div class="card-body d-flex flex-column text-start">
                        <h5 class="card-title mb-4 fw-bold" style="color: var(--texto-principal);">${subasta.name}</h5>
                        
                        <div class="mb-4 p-3 rounded" style="background-color: var(--fondo-oscuro); border: 1px solid var(--borde-sutil);">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <span class="text-muted fw-bold">Mejor Puja:</span>
                                <span class="text-precio fs-3 fw-bold">$${subasta.pujaActual.toFixed(2)}</span>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="text-muted fw-bold">Líder:</span>
                                <span class="fw-bold fs-6" style="color: ${esLider ? 'var(--color-exito)' : 'var(--texto-principal)'};">
                                    ${esLider ? 'Tú' : subasta.usuarioLider}
                                </span>
                            </div>
                        </div>

                        <div class="text-center mb-4">
                            <span class="text-muted d-block mb-1 text-uppercase fw-bold" style="font-size: 0.8rem;">Tiempo Restante</span>
                            <div class="tiempo-restante" data-fechafin="${subasta.fechaFin}">Calculando...</div>
                        </div>

                        <div class="mt-auto">
                            <div class="input-group mb-3">
                                <span class="input-group-text bid-input border-end-0">$</span>
                                <input type="number" class="form-control bid-input border-start-0 fs-5" id="input-${subasta.id}" min="${minPuja}" value="${minPuja}" step="5">
                            </div>
                            <button class="btn btn-principal w-100 fw-bold fs-5 py-2 d-flex align-items-center justify-content-center gap-2" onclick="realizarPuja('${subasta.id}')">
                                PUJAR AHORA 
                                <img src="../img/icon/martillo.webp" style="width: 24px; height: 24px; object-fit: contain;" alt="Martillo">
                            </button>
                        </div>
                    </div>
                </div>
            `;
            contenedorSubastas.appendChild(tarjeta);
        });
    }

    function actualizarTemporizadores() {
        const elementosTiempo = document.querySelectorAll('.tiempo-restante');
        
        elementosTiempo.forEach(el => {
            const fechaFin = new Date(el.getAttribute('data-fechafin')).getTime();
            const ahora = Date.now();
            const distancia = fechaFin - ahora;

            if (distancia < 0) {
                el.innerHTML = "00:00:00";
                el.style.color = "var(--texto-apagado)";
                el.nextElementSibling?.setAttribute('disabled', 'true'); // Deshabilita inputs/botones si terminara
                return;
            }

            const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
            const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

            let tiempoTexto = "";
            if (dias > 0) tiempoTexto += `${dias}d `;
            tiempoTexto += `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
            
            el.innerHTML = tiempoTexto;
        });
    }

    window.realizarPuja = function(idSubasta) {
        const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
        
        if (!usuarioActual) {
            if (window.mostrarToast) window.mostrarToast('Debes iniciar sesión para hacer una puja.', 'error');
            const modalLogin = new bootstrap.Modal(document.getElementById('modalLogin'));
            modalLogin.show();
            return;
        }

        const inputMonto = document.getElementById(`input-${idSubasta}`);
        const montoStr = inputMonto.value;
        const monto = parseFloat(montoStr);
        
        const index = estadoSubastas.findIndex(s => s.id === idSubasta);
        if (index === -1) return;

        const subasta = estadoSubastas[index];

        if (isNaN(monto) || monto <= parseFloat(subasta.pujaActual)) {
            if (window.mostrarToast) window.mostrarToast(`La puja debe ser mayor a $${subasta.pujaActual}.`, 'error');
            
            // Efecto visual de error
            inputMonto.classList.add('is-invalid');
            setTimeout(() => inputMonto.classList.remove('is-invalid'), 1500);
            return;
        }

        // Actualizar datos de la subasta
        estadoSubastas[index].pujaActual = monto;
        estadoSubastas[index].usuarioLider = usuarioActual.nombre;
        
        // Guardar en el almacenamiento local
        localStorage.setItem('subastasGameJunkies', JSON.stringify(estadoSubastas));
        
        // Re-renderizar con animación en la tarjeta afectada
        renderizarSubastas(idSubasta);
        
        if (window.mostrarToast) window.mostrarToast('¡Puja realizada con éxito! Eres el nuevo líder <img src="../img/icon/martillo.webp" style="width: 20px; height: 20px; object-fit: contain; vertical-align: middle;">.', 'success');
    };
});
