
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initVideoLoaders();
    initFormHandler();
    initParallaxEffect();
    initCyberGlowEffect();
});


function initCyberGlowEffect() {
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.video-card, .about-card, .skill-category');
        
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', x + 'px');
            card.style.setProperty('--mouse-y', y + 'px');
        });
    });
}


function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fade-in-up 0.8s ease-out forwards';
                
                if (entry.target.classList.contains('skill-level')) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0';
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 100);
                }
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.video-card, .experience-item, .skill-category').forEach(el => {
        observer.observe(el);
    });

    document.querySelectorAll('.skill-level').forEach(el => {
        observer.observe(el);
    });
}


function initVideoLoaders() {
    const videos = document.querySelectorAll('.project-video');
    
    videos.forEach((video, index) => {
        const wrapper = video.closest('.video-wrapper');
        const placeholder = wrapper.querySelector('.video-placeholder');
        
        video.controls = true;
        video.style.display = 'none';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'contain';
        video.style.backgroundColor = '#000';
        
        if (placeholder) {
            placeholder.style.cursor = 'pointer';
            placeholder.style.display = 'flex';
            placeholder.style.alignItems = 'center';
            placeholder.style.justifyContent = 'center';
            
            placeholder.addEventListener('click', () => {
                placeholder.style.transition = 'opacity 0.3s ease';
                placeholder.style.opacity = '0';
                setTimeout(() => {
                    placeholder.style.pointerEvents = 'none';
                }, 300);
                
                video.style.display = 'block';
                video.play().catch(err => {
                    console.log('Autoplay prevented:', err.message);
                });
            });
        }
        
        video.addEventListener('error', () => {
            console.error(`Video ${index + 1} failed to load:`, video.error?.message);
        });
    });
}

function initFormHandler() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            
            const inputs = form.querySelectorAll('input, textarea');
            const data = {
                name: inputs[0].value,
                email: inputs[1].value,
                message: inputs[2].value
            };

            if (!data.name || !data.email || !data.message) {
                showNotification('Wypełnij wszystkie pola!', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                showNotification('Wpisz poprawny email!', 'error');
                return;
            }

            showNotification('Wiadomość wysłana! 🚀', 'success');
            form.reset();
        });
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        padding: 15px 25px;
        background: ${type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(244, 67, 54, 0.9)'};
        color: white;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 5000;
        animation: slide-in 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slide-out 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function initParallaxEffect() {
    const elements = document.querySelectorAll('.hero-content, .about-visual, .section-header');
    
    window.addEventListener('scroll', () => {
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const scrollY = window.scrollY;
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const offset = (rect.top - window.innerHeight / 2) * 0.1;
                element.style.transform = `translateY(${offset}px)`;
            }
        });
    });
}

function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        const text = element.textContent;
        element.setAttribute('data-text', text);
    });
}

initGlitchEffect();

document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    document.documentElement.style.setProperty('--mouse-x', x);
    document.documentElement.style.setProperty('--mouse-y', y);
});

window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
        } else {
            link.style.textShadow = 'none';
        }
    });
});

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        console.log('Command palette would open here');
    }
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
    }
});

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

const style = document.createElement('style');
style.textContent = `
    @keyframes slide-in {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slide-out {
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .nav-link.active {
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5) !important;
    }
`;
document.head.appendChild(style);

function createConfetti() {
    const colors = ['#ffffff', '#888888', '#aaaaaa'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: -10px;
            opacity: 0.8;
            z-index: 999;
            animation: confetti-fall ${2 + Math.random() * 2}s linear forwards;
            pointer-events: none;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }
}

const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confetti-fall {
        to {
            transform: translateY(${window.innerHeight + 100}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

document.addEventListener('dblclick', () => {
    if (event.target === document.body) {
        createConfetti();
    }
});

if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time: ' + pageLoadTime + 'ms');
    });
}
