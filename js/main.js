// ===================================
// CORE+ FITNESS CLUB - MAIN JAVASCRIPT
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // HEADER SCROLL EFFECT
    // ===================================
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ===================================
    // SEARCH OVERLAY
    // ===================================
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.querySelector('.search-input');

    // Open search
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            searchOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
            // Focus on search input after animation
            setTimeout(() => {
                if (searchInput) searchInput.focus();
            }, 300);
        });
    }

    // Close search
    if (searchClose) {
        searchClose.addEventListener('click', closeSearch);
    }

    function closeSearch() {
        searchOverlay.classList.remove('open');
        document.body.style.overflow = '';
        if (searchInput) searchInput.value = ''; // Clear search input
    }

    // Close search on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSearch();
            closeSidebar();
        }
    });

    // Handle search form submit
    const searchForm = document.querySelector('.search-container');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                console.log('Searching for:', query);
                // Add your search functionality here
                alert('Tìm kiếm: ' + query);
            }
        });
    }

    // ===================================
    // SMOOTH SCROLL FOR NAVIGATION
    // ===================================
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // BMI CALCULATOR
    // ===================================
    const bmiForm = document.getElementById('bmiForm');
    const bmiResult = document.getElementById('bmiResult');

    if (bmiForm) {
        bmiForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get input values
            const height = parseFloat(document.getElementById('height').value);
            const weight = parseFloat(document.getElementById('weight').value);
            const age = parseInt(document.getElementById('age').value);

            // Validate inputs
            if (!height || !weight || !age || height <= 0 || weight <= 0 || age <= 0) {
                bmiResult.innerHTML = '<p style="color: #e74c3c;">Vui lòng nhập thông tin hợp lệ!</p>';
                return;
            }

            // Calculate BMI
            const heightInMeters = height / 100;
            const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

            // Determine BMI category and color
            let category = '';
            let color = '';
            let advice = '';

            if (bmi < 18.5) {
                category = 'Thiếu cân';
                color = '#3498db';
                advice = 'Bạn nên tăng cân và xây dựng cơ bắp.';
            } else if (bmi >= 18.5 && bmi < 25) {
                category = 'Bình thường';
                color = '#27ae60';
                advice = 'Cân nặng của bạn rất tốt! Hãy duy trì.';
            } else if (bmi >= 25 && bmi < 30) {
                category = 'Thừa cân';
                color = '#f39c12';
                advice = 'Bạn nên giảm cân và tập luyện nhiều hơn.';
            } else {
                category = 'Béo phì';
                color = '#e74c3c';
                advice = 'Bạn nên tham khảo ý kiến chuyên gia dinh dưỡng.';
            }

            // Display result
            bmiResult.innerHTML = `
                <div style="padding: 20px; background: rgba(231, 76, 60, 0.1); border-left: 4px solid ${color}; border-radius: 4px;">
                    <h4 style="color: ${color}; margin-bottom: 10px; font-size: 20px;">Chỉ số BMI của bạn: ${bmi}</h4>
                    <p style="margin-bottom: 8px;"><strong>Phân loại:</strong> ${category}</p>
                    <p style="margin-bottom: 0; opacity: 0.9;">${advice}</p>
                </div>
            `;

            // Smooth scroll to result
            bmiResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    // ===================================
    // CONTACT FORM
    // ===================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const email = formData.get('email');
            const message = formData.get('message');

            // Validate
            if (!name || !phone || !email || !message) {
                alert('Vui lòng điền đầy đủ thông tin!');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Email không hợp lệ!');
                return;
            }

            // Phone validation (Vietnamese format)
            const phoneRegex = /^(0|\+84)[0-9]{9}$/;
            if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
                alert('Số điện thoại không hợp lệ!');
                return;
            }

            // Success message
            alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
            
            // Reset form
            contactForm.reset();

            // Here you would normally send the data to a server
            console.log('Form submitted:', { name, phone, email, message });
        });
    }

    // ===================================
    // PRICING CARDS HOVER EFFECT
    // ===================================
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Remove active class from all cards
            pricingCards.forEach(c => c.classList.remove('active'));
            // Add active class to hovered card
            this.classList.add('active');
        });
    });

    // ===================================
    // ADD TO CART FUNCTIONALITY
    // ===================================
    const addCartButtons = document.querySelectorAll('.add-cart-btn');
    
    addCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;

            // Show notification
            showNotification(`Đã thêm "${productName}" vào giỏ hàng!`);

            // Add animation to button
            this.textContent = '✓ ĐÃ THÊM';
            this.style.background = '#27ae60';
            
            setTimeout(() => {
                this.textContent = 'THÊM VÀO GIỎ';
                this.style.background = '';
            }, 2000);

            // Here you would normally add the product to a cart array/object
            console.log('Added to cart:', { productName, productPrice });
        });
    });

    // ===================================
    // JOIN NOW BUTTONS
    // ===================================
    const joinButtons = document.querySelectorAll('.join-btn');
    
    joinButtons.forEach(button => {
        button.addEventListener('click', function() {
            const pricingCard = this.closest('.pricing-card');
            const planName = pricingCard.querySelector('.pricing-title').textContent;
            const planPrice = pricingCard.querySelector('.pricing-price').textContent;

            // Show confirmation
            const confirmed = confirm(`Bạn muốn đăng ký gói ${planName} với giá ${planPrice}?`);
            
            if (confirmed) {
                showNotification(`Cảm ơn! Chúng tôi sẽ liên hệ với bạn về gói ${planName}.`);
                // Scroll to contact form
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // ===================================
    // CTA BUTTONS IN SLIDES
    // ===================================
    const ctaButtons = document.querySelectorAll('.cta-btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Scroll to pricing section
            const pricingSection = document.getElementById('pricing');
            if (pricingSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = pricingSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // NOTIFICATION SYSTEM
    // ===================================
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            font-weight: 600;
        `;

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Add to DOM
        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // ===================================
    // ANIMATE ON SCROLL
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // ===================================
    // LAZY LOADING IMAGES
    // ===================================
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ===================================
    // PERFORMANCE: Debounce scroll events
    // ===================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ===================================
    // LOG INITIALIZATION
    // ===================================
    console.log('%c🏋️ CORE+ Fitness Club Initialized! 💪', 'color: #e74c3c; font-size: 20px; font-weight: bold;');
    console.log('%cWebsite đang chạy tốt! Chúc bạn có trải nghiệm tuyệt vời! 🎉', 'color: #27ae60; font-size: 14px;');

});

// ===================================
// PREVENT ZOOM ON DOUBLE TAP (Mobile)
// ===================================
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

const programVideos = document.querySelectorAll('.program-video');

const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const video = entry.target;
            video.play();
        } else {
            entry.target.pause();
        }
    });
}, { threshold: 0.5 });

programVideos.forEach(video => {
    videoObserver.observe(video);
});

// ================================
// ULTRA SMOOTH COUNTER
// ================================
function animateCounter(el, duration = 2000) {
    const text = el.textContent.trim();

    const target = parseInt(text.replace(/\D/g, '')) || 0;
    const suffix = text.replace(/[0-9]/g, '');

    let startTime = null;

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / duration;

        // clamp
        const t = Math.min(progress, 1);

        // easeOutCubic (rất mượt)
        const ease = 1 - Math.pow(1 - t, 3);

        const value = Math.floor(ease * target);

        // ❗ CHỈ format khi cần (giảm lag)
        el.textContent = value + suffix;

        if (t < 1) {
            requestAnimationFrame(animate);
        } else {
            el.textContent = target + suffix;
        }
    }

    requestAnimationFrame(animate);
}

// ================================
// OBSERVER (trigger đúng lúc)
// ================================
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const nums = entry.target.querySelectorAll('.stat-number');

            nums.forEach(el => animateCounter(el));

            counterObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5 // đợi hiện rõ mới chạy → đỡ lag
});

// ================================
// INIT
// ================================
window.addEventListener('load', () => {
    const stats = document.querySelector('.stats');
    if (stats) counterObserver.observe(stats);
});


document.addEventListener('DOMContentLoaded', function () {

    // HERO VIDEO
    const heroVideo = document.querySelector('.hero-video');

    if (heroVideo) {
        heroVideo.muted = true;
        heroVideo.play().catch(() => {});

        // loop mượt
        heroVideo.addEventListener('ended', function () {
            this.currentTime = 0;
            this.play();
        });
    }

    // PROGRAM VIDEOS
    const programVideos = document.querySelectorAll('.program-video');

    programVideos.forEach(function (video) {
        video.muted = true;
        video.play().catch(() => {});

        video.addEventListener('ended', function () {
            this.currentTime = 0;
            this.play();
        });
    });

    // OVERLAY CLICK PLAY (testimonial)
    const overlays = document.querySelectorAll('.video-overlay');

    overlays.forEach(function (overlay) {
        overlay.addEventListener('click', function () {
            const video = this.previousElementSibling;

            if (video) {
                video.play();
                this.style.opacity = '0';
            }
        });
    });

});

const allVideos = document.querySelectorAll('video'); 
allVideos.forEach(function(video) { 
    video.addEventListener('click', function() { 
    if (video.paused) 
        { video.play(); } else { video.pause(); } }); });

// ==========================================
// CONTACT FORM - SEND TO GMAIL
// ==========================================
function sendToEmail(event) {
    event.preventDefault();

    const name = document.getElementById('userName').value;
    const phone = document.getElementById('userPhone').value;
    const message = document.getElementById('userMessage').value;

    const subject = encodeURIComponent('Đăng ký tập luyện - ' + name);
    const body = encodeURIComponent(
        'THÔNG TIN ĐĂNG KÝ\n\n' +
        '👤 Họ và tên: ' + name + '\n' +
        '📞 Số điện thoại: ' + phone + '\n' +
        '🎯 Mục tiêu: ' + message
    );

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=khanhlyfitx@gmail.com&su=${subject}&body=${body}`;

    // mở gmail
    window.open(gmailUrl, '_blank');

    // reset form
    document.getElementById('contactForm').reset();
}

// ===================================
// SIDEBAR — 3 gạch
// ===================================
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('overlay');

function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        sidebar.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
}
if (closeBtn) closeBtn.addEventListener('click', closeSidebar);

// ===================================
// MOBILE NAV — grid icon
// ===================================
const gridBtn = document.getElementById('gridBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileNavClose = document.getElementById('mobileNavClose');

function closeMobileNav() {
    if (mobileNav) mobileNav.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

if (gridBtn) {
    gridBtn.addEventListener('click', () => {
        mobileNav.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
}
if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
});

// ===================================
// OVERLAY + ESC
// ===================================
if (overlay) {
    overlay.addEventListener('click', () => {
        closeSidebar();
        closeMobileNav();
    });
}
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeSidebar(); closeMobileNav(); }
});

// ===================================
// DRAGGABLE FLOATING BUBBLES
// ===================================
const floatBubbles = document.querySelector('.float-bubbles');

if (floatBubbles) {
    let isDragging = false;
    let startX, startY, startLeft, startBottom;
    let moved = false;

    // Mouse events (desktop)
    floatBubbles.addEventListener('mousedown', (e) => {
        isDragging = true;
        moved = false;
        startX = e.clientX;
        startY = e.clientY;
        const rect = floatBubbles.getBoundingClientRect();
        startLeft = rect.left;
        startBottom = window.innerHeight - rect.bottom;
        floatBubbles.style.transition = 'none';
        floatBubbles.style.cursor = 'grabbing';
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) moved = true;

        let newLeft = startLeft + dx;
        let newBottom = startBottom - dy;

        // Giới hạn trong màn hình
        const w = floatBubbles.offsetWidth;
        const h = floatBubbles.offsetHeight;
        newLeft = Math.max(10, Math.min(window.innerWidth - w - 10, newLeft));
        newBottom = Math.max(10, Math.min(window.innerHeight - h - 10, newBottom));

        floatBubbles.style.left = newLeft + 'px';
        floatBubbles.style.bottom = newBottom + 'px';
        floatBubbles.style.right = 'auto';
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        floatBubbles.style.cursor = 'grab';
        floatBubbles.style.transition = 'transform 0.2s ease';
    });

    // Touch events (mobile)
    floatBubbles.addEventListener('touchstart', (e) => {
        isDragging = true;
        moved = false;
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        const rect = floatBubbles.getBoundingClientRect();
        startLeft = rect.left;
        startBottom = window.innerHeight - rect.bottom;
        floatBubbles.style.transition = 'none';
    }, { passive: true });

    floatBubbles.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) moved = true;

        let newLeft = startLeft + dx;
        let newBottom = startBottom - dy;

        const w = floatBubbles.offsetWidth;
        const h = floatBubbles.offsetHeight;
        newLeft = Math.max(10, Math.min(window.innerWidth - w - 10, newLeft));
        newBottom = Math.max(10, Math.min(window.innerHeight - h - 10, newBottom));

        floatBubbles.style.left = newLeft + 'px';
        floatBubbles.style.bottom = newBottom + 'px';
        floatBubbles.style.right = 'auto';
        e.preventDefault();
    }, { passive: false });

    floatBubbles.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Nếu kéo thì không trigger click
    floatBubbles.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (moved) e.preventDefault();
        });
    });
}