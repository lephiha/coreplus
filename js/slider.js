// ===================================
// CORE+ FITNESS CLUB - SLIDER JAVASCRIPT
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // SLIDER CONFIGURATION
    // ===================================
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let slideInterval;
    const slideDelay = 8000; 
    let isTransitioning = false;

    // ===================================
    // SHOW SLIDE FUNCTION
    // ===================================
    function showSlide(index) {
        // Prevent rapid clicking during transition
        if (isTransitioning) return;
        isTransitioning = true;

        // Validate index
        if (index >= slides.length) {
            index = 0;
        } else if (index < 0) {
            index = slides.length - 1;
        }

        // Remove active class from all slides and indicators
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });

        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');

        // Update current slide
        currentSlide = index;

        // Reset transition lock after animation completes
        setTimeout(() => {
            isTransitioning = false;
        }, 1000);

        // Log for debugging
        console.log(`Showing slide ${index + 1} of ${slides.length}`);
    }

    // ===================================
    // NEXT SLIDE
    // ===================================
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // ===================================
    // PREVIOUS SLIDE
    // ===================================
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // ===================================
    // START AUTO SLIDE
    // ===================================
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, slideDelay);
    }

    // ===================================
    // STOP AUTO SLIDE
    // ===================================
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // ===================================
    // RESTART AUTO SLIDE
    // ===================================
    function restartAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    // ===================================
    // INDICATOR CLICK EVENTS
    // ===================================
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            showSlide(index);
            restartAutoSlide(); // Restart timer when manually changing slide
        });
    });

    // ===================================
    // CUSTOM DOTS CLICK EVENTS (for slide 2 & 3)
    // ===================================
    const customDots = document.querySelectorAll('.dot-custom');
    
    customDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            // Find parent slide to determine offset
            const parentSlide = this.closest('.slide');
            const parentSlideIndex = Array.from(slides).indexOf(parentSlide);
            
            // If clicking dots in slide 2, we want to navigate between slide 2's dots only
            // This is a visual effect - you might want different behavior
            showSlide(parentSlideIndex);
            restartAutoSlide();
        });
    });

    // ===================================
    // KEYBOARD NAVIGATION
    // ===================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            restartAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            restartAutoSlide();
        }
    });

    // ===================================
    // TOUCH/SWIPE SUPPORT FOR MOBILE
    // ===================================
    let touchStartX = 0;
    let touchEndX = 0;
    const slider = document.querySelector('.hero-slider');

    if (slider) {
        slider.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        slider.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for swipe
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped left - go to next slide
                nextSlide();
            } else {
                // Swiped right - go to previous slide
                prevSlide();
            }
            restartAutoSlide();
        }
    }

    // ===================================
    // MOUSE DRAG SUPPORT FOR DESKTOP
    // ===================================
    let isDragging = false;
    let startX = 0;
    let currentX = 0;

    if (slider) {
        slider.addEventListener('mousedown', function(e) {
            isDragging = true;
            startX = e.pageX;
            slider.style.cursor = 'grabbing';
        });

        slider.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            currentX = e.pageX;
        });

        slider.addEventListener('mouseup', function(e) {
            if (!isDragging) return;
            isDragging = false;
            slider.style.cursor = 'grab';

            const diff = startX - currentX;
            const dragThreshold = 50;

            if (Math.abs(diff) > dragThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                restartAutoSlide();
            }
        });

        slider.addEventListener('mouseleave', function() {
            if (isDragging) {
                isDragging = false;
                slider.style.cursor = 'grab';
            }
        });
    }

    // ===================================
    // PAUSE ON HOVER (Desktop)
    // ===================================
    if (slider) {
        slider.addEventListener('mouseenter', function() {
            stopAutoSlide();
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mouseleave', function() {
            startAutoSlide();
            slider.style.cursor = 'default';
        });
    }

    // ===================================
    // PAUSE WHEN TAB IS NOT VISIBLE
    // ===================================
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });

    // ===================================
    // PROGRESS BAR (Optional Enhancement)
    // ===================================
    // function createProgressBar() {
    //     const progressBar = document.createElement('div');
    //     progressBar.className = 'slide-progress';
    //     progressBar.style.cssText = `
    //         position: absolute;
    //         bottom: 0;
    //         left: 0;
    //         height: 4px;
    //         background: #e74c3c;
    //         width: 0%;
    //         transition: width 0.1s linear;
    //         z-index: 100;
    //     `;
    //     slider.appendChild(progressBar);
    //     return progressBar;
    // }

    let progressBar = null;
    let progressInterval = null;

    // function startProgress() {
    //     if (!progressBar) {
    //         progressBar = createProgressBar();
    //     }
        
    //     progressBar.style.width = '0%';
    //     let progress = 0;
    //     const increment = 100 / (slideDelay / 100);

    //     progressInterval = setInterval(() => {
    //         progress += increment;
    //         if (progress >= 100) {
    //             progress = 100;
    //             clearInterval(progressInterval);
    //         }
    //         progressBar.style.width = progress + '%';
    //     }, 100);
    // }

    // function resetProgress() {
    //     if (progressInterval) {
    //         clearInterval(progressInterval);
    //     }
    //     if (progressBar) {
    //         progressBar.style.width = '0%';
    //     }
    // }

    // ===================================
    // ENHANCED AUTO SLIDE WITH PROGRESS
    // ===================================
    // function startEnhancedAutoSlide() {
    //     slideInterval = setInterval(() => {
    //         nextSlide();
    //         resetProgress();
    //         startProgress();
    //     }, slideDelay);
    //     startProgress();
    // }

    // function stopEnhancedAutoSlide() {
    //     clearInterval(slideInterval);
    //     resetProgress();
    // }

    // function restartEnhancedAutoSlide() {
    //     stopEnhancedAutoSlide();
    //     startEnhancedAutoSlide();
    // }

    // ===================================
    // PRELOAD IMAGES
    // ===================================
    function preloadImages() {
        const images = slider.querySelectorAll('img');
        let loadedImages = 0;

        images.forEach(img => {
            if (img.complete) {
                loadedImages++;
            } else {
                img.addEventListener('load', () => {
                    loadedImages++;
                    if (loadedImages === images.length) {
                        console.log('All slider images loaded');
                    }
                });
            }
        });
    }

    // ===================================
    // INITIALIZE SLIDER
    // ===================================
    function initSlider() {
        // Check if slides exist
        if (slides.length === 0) {
            console.warn('No slides found');
            return;
        }

        // Show first slide
        showSlide(0);

        // Preload images
        preloadImages();

        // Start auto slide with progress bar
        startAutoSlide();

        // Add hover listeners for enhanced version
        if (slider) {
            slider.addEventListener('mouseenter', function() {
                stopEnhancedAutoSlide();
                slider.style.cursor = 'grab';
            });

            slider.addEventListener('mouseleave', function() {
                startEnhancedAutoSlide();
                slider.style.cursor = 'default';
            });
        }

        // Update keyboard navigation to use enhanced version
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                restartEnhancedAutoSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                restartEnhancedAutoSlide();
            }
        });

        // Log initialization
        console.log(`✅ Slider initialized with ${slides.length} slides`);
    }

    // ===================================
    // START SLIDER
    // ===================================
    initSlider();

    // ===================================
    // EXPOSE SLIDER CONTROLS GLOBALLY (Optional)
    // ===================================
    window.sliderControls = {
        next: nextSlide,
        prev: prevSlide,
        goto: showSlide,
        play: startEnhancedAutoSlide,
        pause: stopEnhancedAutoSlide,
        getCurrentSlide: () => currentSlide + 1,
        getTotalSlides: () => slides.length
    };

    // ===================================
    // ACCESSIBILITY IMPROVEMENTS
    // ===================================
    
    // Add ARIA labels to indicators
    indicators.forEach((indicator, index) => {
        indicator.setAttribute('role', 'button');
        indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
        indicator.setAttribute('tabindex', '0');
        
        // Allow keyboard navigation on indicators
        indicator.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showSlide(index);
                restartEnhancedAutoSlide();
            }
        });
    });

    // Add ARIA live region for screen readers
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        white-space: nowrap;
        border: 0;
    `;
    slider.appendChild(liveRegion);

    // Update live region when slide changes
    const originalShowSlide = showSlide;
    showSlide = function(index) {
        originalShowSlide(index);
        liveRegion.textContent = `Slide ${index + 1} of ${slides.length}`;
    };

});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Use requestAnimationFrame for smooth animations
function smoothTransition(callback) {
    requestAnimationFrame(() => {
        requestAnimationFrame(callback);
    });
}

// Debounce resize events
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        console.log('Slider adjusted for window resize');
        // Add any resize-specific logic here
    }, 250);
});