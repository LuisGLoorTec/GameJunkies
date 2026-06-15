document.addEventListener('DOMContentLoaded', () => {
    // 1. Renderizar Subastas
    const contenedorSubastas = document.getElementById('contenedor-inicio-subastas');
    if (contenedorSubastas) {
        const subastasGuardadas = localStorage.getItem('estadoSubastas');
        let subastasArray = [];
        if (subastasGuardadas) {
            subastasArray = JSON.parse(subastasGuardadas);
        } else {
            // Fallback si no han entrado a la página de subastas aún
            subastasArray = [
                {
                    id: 'subasta_1',
                    name: "Estatua Malenia 'Espada de Miquella' (Firma Especial)",
                    image: "img/merch/malenia.webp",
                    pujaActual: 450.00,
                    usuarioLider: "Tarnished_99"
                },
                {
                    id: 'subasta_2',
                    name: "Revólver 'Hand Cannon' Prototipo OW",
                    image: "img/merch/macCree.jpg",
                    pujaActual: 300.00,
                    usuarioLider: "HighNoonFan"
                },
                {
                    id: 'subasta_3',
                    name: "Látigo 'Vampire Killer' Réplica del Desarrollador",
                    image: "img/merch/latigoCastl.jpg",
                    pujaActual: 150.00,
                    usuarioLider: "Belmont_Heir"
                },
                {
                    id: 'subasta_4',
                    name: "Casco T-51b Power Armor (Edición Limitada)",
                    image: "img/merch/cascoFallouut.jpg",
                    pujaActual: 800.00,
                    usuarioLider: "VaultDweller_101"
                }
            ];
        }

        const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
        const nombreLogueado = usuarioActual ? usuarioActual.nombre : null;

        // Tomamos los primeros 3
        const subastasMostrar = subastasArray.slice(0, 3);
        
        let htmlSubastas = '';
        subastasMostrar.forEach(subasta => {
            const esLider = nombreLogueado && subasta.usuarioLider === nombreLogueado;
            const imgRuta = subasta.image.startsWith('../') ? subasta.image.substring(3) : subasta.image;
            
            htmlSubastas += `
                <div class="col">
                    <div class="card card-game h-100" style="cursor: pointer; ${esLider ? 'border-color: var(--color-exito); box-shadow: 0 0 15px rgba(65, 187, 66, 0.2);' : ''}" onclick="window.location.href='HTML/DetallesSubasta.html?id=${subasta.id}'">
                        <div class="position-relative">
                            <img src="${imgRuta}" class="card-img-top w-100" alt="${subasta.name}" style="height: 250px; object-fit: cover;">
                            ${esLider ? '<span class="position-absolute top-0 end-0 m-2 badge bg-success px-2 py-1 fs-6">¡Vas Ganando! 👑</span>' : ''}
                            <span class="position-absolute top-0 start-0 m-2 badge badge-merch px-2 py-1 fs-6 d-flex align-items-center gap-1">EN VIVO <span class="material-symbols-outlined text-danger" style="font-size: 14px; font-variation-settings: 'FILL' 1;">circle</span></span>
                        </div>
                        <div class="card-body d-flex flex-column text-start">
                            <h5 class="card-title mb-4 fw-bold" style="color: var(--texto-principal);">${subasta.name}</h5>
                            
                            <div class="mb-3 mt-auto p-3 rounded" style="background-color: var(--fondo-oscuro); border: 1px solid var(--borde-sutil);">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <span class="text-muted fw-bold">Mejor Puja:</span>
                                    <span class="text-precio fs-4 fw-bold">$${parseFloat(subasta.pujaActual).toFixed(2)}</span>
                                </div>
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class="text-muted fw-bold">Líder:</span>
                                    <span class="fw-bold fs-6" style="color: ${esLider ? 'var(--color-exito)' : 'var(--texto-principal)'};">
                                        ${esLider ? 'Tú' : subasta.usuarioLider}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        contenedorSubastas.innerHTML = htmlSubastas;
    }

    // 2. Renderizar Merch
    const contenedorMerch = document.getElementById('contenedor-inicio-merch');
    if (contenedorMerch && typeof catalogoMerch !== 'undefined') {
        // Tomar 4 productos aleatorios o los 4 primeros
        const merchMostrar = catalogoMerch.slice(0, 4);
        
        let htmlMerch = '';
        merchMostrar.forEach(producto => {
            htmlMerch += `
                <div class="col">
                    <div class="card card-game h-100" style="cursor: pointer;" onclick="window.location.href='HTML/DetallesMerch.html?id=${producto.id}'">
                        <div class="position-relative">
                            <img src="img/merch/${producto.img}" class="card-img-top w-100 p-3" alt="${producto.nombre}" style="height: 250px; object-fit: contain; background-color: #1a1a1a;">
                            <span class="position-absolute top-0 end-0 m-2 badge badge-merch px-2 py-1 text-white">${producto.categoria}</span>
                        </div>
                        <div class="card-body d-flex flex-column text-start">
                            <h5 class="card-title fw-bold mb-3" style="color: var(--texto-principal);">${producto.nombre}</h5>
                            <div class="mt-auto d-flex justify-content-between align-items-center">
                                <span class="fw-bold fs-4" style="color: var(--color-exito);">$${parseFloat(producto.precio).toFixed(2)}</span>
                                <button class="btn btn-sm btn-outline-light d-flex align-items-center gap-1" onclick="event.stopPropagation(); window.location.href='HTML/DetallesMerch.html?id=${producto.id}'">
                                    <span class="material-symbols-outlined fs-6">visibility</span> Detalles
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        contenedorMerch.innerHTML = htmlMerch;
    }
});
