// Gallery lightbox functionality
(function() {
    console.log('Gallery script loaded');
    
    if (!window.hasGalleryLightbox) {
        window.hasGalleryLightbox = true;

        // Create lightbox element (overlay)
        const lightbox = document.createElement('div');
        lightbox.className = 'fixed inset-0 bg-brand-secondary-dark bg-opacity-90 z-50 hidden flex items-center justify-center overflow-y-auto backdrop-blur-sm';
        lightbox.setAttribute('aria-hidden', 'true');
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('tabindex', '-1');
        
        // Create lightbox content (modal)
        const lightboxContent = document.createElement('div');
        lightboxContent.className = 'relative bg-white rounded-lg shadow-2xl max-w-3xl w-full mx-4 p-4 flex flex-col items-center pointer-events-auto';
        
        // Create close button
        const closeButton = document.createElement('button');
        closeButton.className = 'absolute top-2 right-2 text-3xl text-brand-accent bg-white bg-opacity-80 rounded-full w-10 h-10 flex items-center justify-center shadow-md focus:outline-none hover:bg-brand-primary-light hover:text-brand-secondary-dark transition-colors duration-200 z-10';
        closeButton.innerHTML = '<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>';
        closeButton.setAttribute('aria-label', 'Close image gallery');
        closeButton.addEventListener('click', function(e) {
            e.preventDefault();
            closeLightbox();
        });

        // Create image container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'relative w-full max-h-[80vh] flex items-center justify-center';
        
        // Add loading spinner
        const loadingSpinner = document.createElement('div');
        loadingSpinner.className = 'absolute inset-0 flex items-center justify-center text-brand-primary-dark text-2xl';
        loadingSpinner.innerHTML = '<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary-dark"></div>';
        imageContainer.appendChild(loadingSpinner);
        
        // Add elements to lightbox
        lightboxContent.appendChild(closeButton);
        lightboxContent.appendChild(imageContainer);
        lightbox.appendChild(lightboxContent);
        document.body.appendChild(lightbox);

        // Close lightbox on overlay click (but not when clicking modal content)
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Function to close the lightbox
        function closeLightbox() {
            lightbox.classList.add('hidden');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleEscape);
            imageContainer.innerHTML = '';
        }

        // Function to handle escape key
        function handleEscape(e) {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        }

        // Touch event handlers
        let isDragging = false;
        let startX, startY;
        function handleTouchStart(e) {
            e.preventDefault();
            isDragging = true;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }
        function handleTouchMove(e) {
            if (!isDragging) return;
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = currentX - startX;
            const diffY = currentY - startY;
            if (Math.abs(diffX) > Math.abs(diffY) && diffX > 50) {
                closeLightbox();
            }
        }
        function handleTouchEnd() {
            isDragging = false;
        }

        // Add click event listener to each gallery item
        const galleryItems = document.querySelectorAll('.gallery-item');
        console.log('Found', galleryItems.length, 'gallery items');
        galleryItems.forEach(item => {
            item.removeEventListener('click', handleGalleryClick);
            item.addEventListener('click', handleGalleryClick);
        });

        function handleGalleryClick(e) {
            if (lightbox.classList.contains('hidden')) {
                e.preventDefault();
                e.stopPropagation();
                const img = this.querySelector('.gallery-image');
                if (img) {
                    // Get the original image source
                    const imgSrc = img.getAttribute('src');
                    const imgAlt = img.getAttribute('alt');
                    // Create and set the lightbox image
                    const lightboxImg = document.createElement('img');
                    lightboxImg.className = 'w-full max-h-[80vh] object-contain mx-auto transition-transform duration-300 shadow-xl';
                    lightboxImg.src = imgSrc;
                    lightboxImg.alt = imgAlt;
                    // Add loading state
                    lightboxImg.style.opacity = '0';
                    lightboxImg.style.transform = 'scale(0.95)';
                    lightboxImg.onload = function() {
                        this.style.opacity = '1';
                        this.style.transform = 'scale(1)';
                        loadingSpinner.style.display = 'none';
                    };
                    // Clear existing image and add new one
                    imageContainer.innerHTML = '';
                    imageContainer.appendChild(lightboxImg);
                    // Show lightbox
                    lightbox.classList.remove('hidden');
                    lightbox.setAttribute('aria-hidden', 'false');
                    document.body.style.overflow = 'hidden';
                    document.addEventListener('keydown', handleEscape, { once: true });
                    lightboxImg.addEventListener('touchstart', handleTouchStart);
                    lightboxImg.addEventListener('touchmove', handleTouchMove);
                    lightboxImg.addEventListener('touchend', handleTouchEnd);
                }
            }
        }
    }
})();
