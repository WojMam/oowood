// ===================================
// STICKY HEADER
// ===================================

const header = document.getElementById('header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===================================
// SMOOTH SCROLLING FOR NAVIGATION
// ===================================

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
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
// INTERSECTION OBSERVER - SCROLL ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Odznacz element po animacji, aby zaoszczędzić zasoby
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Obserwuj wszystkie elementy z atrybutem data-animate
const animatedElements = document.querySelectorAll('[data-animate]');
animatedElements.forEach(el => observer.observe(el));

// ===================================
// GALLERY MODAL / LIGHTBOX
// ===================================

const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.querySelector('.modal-close');
const galleryItems = document.querySelectorAll('.gallery-item');

// Otwórz modal po kliknięciu w element galerii
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.getAttribute('data-title');
        
        modal.classList.add('show');
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalCaption.textContent = title;
        
        // Zablokuj scroll body
        document.body.style.overflow = 'hidden';
    });
});

// Zamknij modal
const closeModal = () => {
    modal.classList.remove('show');
    document.body.style.overflow = '';
};

modalClose.addEventListener('click', closeModal);

// Zamknij modal po kliknięciu poza obrazem
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Zamknij modal klawiszem ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }
});

// ===================================
// FORM HANDLING
// ===================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Pobierz dane z formularza
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Tu można dodać wysyłkę danych do serwera
    console.log('Dane formularza:', formData);
    
    // Symulacja wysyłki - pokaż komunikat
    alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
    
    // Wyczyść formularz
    contactForm.reset();
    
    // W rzeczywistej aplikacji tutaj należałoby:
    // 1. Walidować dane po stronie klienta
    // 2. Wysłać dane do backendu (fetch/axios)
    // 3. Obsłużyć odpowiedź serwera
    // 4. Pokazać odpowiedni komunikat (sukces/błąd)
    
    /*
    Przykład wysyłki do backendu:
    
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Wiadomość została wysłana!');
        contactForm.reset();
    })
    .catch(error => {
        alert('Wystąpił błąd. Spróbuj ponownie.');
        console.error('Error:', error);
    });
    */
});

// ===================================
// HOVER EFFECTS FOR CARDS
// ===================================

const cards = document.querySelectorAll('.why-us-card, .offer-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('visible')) {
            this.style.transform = '';
        }
    });
});

// ===================================
// PARALLAX EFFECT (OPTIONAL - SUBTLE)
// ===================================

const heroImage = document.querySelector('.hero-image');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroSection = document.querySelector('.hero');
    
    if (heroSection && heroImage) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        
        if (scrolled < heroBottom) {
            // Subtelny efekt parallax
            const parallaxSpeed = 0.3;
            heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    }
});

// ===================================
// ACTIVE NAVIGATION LINK ON SCROLL
// ===================================

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Usuń klasę active ze wszystkich linków
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Dodaj klasę active do odpowiedniego linku
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Debounce function dla optymalizacji scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Można zastosować debounce do scroll events dla lepszej wydajności
// Przykład:
// window.addEventListener('scroll', debounce(handleScroll, 10));

// ===================================
// LAZY LOADING IMAGES (OPTIONAL)
// ===================================

// Jeśli chcesz dodać lazy loading dla obrazków w galerii,
// możesz użyć Intersection Observer:

const lazyImages = document.querySelectorAll('img[data-src]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
} else {
    // Fallback dla starszych przeglądarek
    lazyImages.forEach(img => {
        img.src = img.dataset.src;
    });
}

// ===================================
// CONSOLE INFO
// ===================================

console.log('%c🌲 OOWood - Wyspy Handlowe', 'font-size: 20px; font-weight: bold; color: #1a3a2e;');
console.log('%cStrona zaprojektowana i zrealizowana z dbałością o szczegóły', 'font-size: 12px; color: #6a6a6a;');
