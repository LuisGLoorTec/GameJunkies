// Inject Lightbox HTML Structure
(function inicializarLightbox() {
    const lightboxHTML = `
        <div id="gamejunkies-lightbox" class="lightbox-overlay d-none">
            <div class="lightbox-content">
                <button id="lightbox-close" class="lightbox-btn" title="Cerrar"><span class="material-symbols-outlined">close</span></button>
                <button id="lightbox-prev" class="lightbox-btn" title="Anterior"><span class="material-symbols-outlined">chevron_left</span></button>
                <img id="lightbox-img" src="" alt="Lightbox Image">
                <button id="lightbox-next" class="lightbox-btn" title="Siguiente"><span class="material-symbols-outlined">chevron_right</span></button>
                <div id="lightbox-counter" class="lightbox-counter">1 / 1</div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    const overlay = document.getElementById('gamejunkies-lightbox');
    const imgEl = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const counterEl = document.getElementById('lightbox-counter');

    let currentImages = [];
    let currentIndex = 0;

    window.abrirLightbox = function(images, initialIndex = 0) {
        if (!images || images.length === 0) return;
        currentImages = Array.isArray(images) ? images : [images];
        currentIndex = initialIndex;
        
        actualizarImagen();
        
        overlay.classList.remove('d-none');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        if (currentImages.length > 1) {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
            counterEl.style.display = 'block';
        } else {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            counterEl.style.display = 'none';
        }
    };

    function actualizarImagen() {
        imgEl.src = currentImages[currentIndex];
        counterEl.textContent = `${currentIndex + 1} / ${currentImages.length}`;
    }

    function cerrarLightbox() {
        overlay.classList.add('d-none');
        document.body.style.overflow = 'auto'; // Restore scrolling
        currentImages = [];
    }

    function nextImage(e) {
        if (e) e.stopPropagation();
        if (currentImages.length <= 1) return;
        currentIndex = (currentIndex + 1) % currentImages.length;
        actualizarImagen();
    }

    function prevImage(e) {
        if (e) e.stopPropagation();
        if (currentImages.length <= 1) return;
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        actualizarImagen();
    }

    // Event Listeners
    closeBtn.addEventListener('click', cerrarLightbox);
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target === imgEl) {
            cerrarLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (overlay.classList.contains('d-none')) return;
        if (e.key === 'Escape') cerrarLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });
})();
