const featuresData = [
    {
        icon: "fa-calculator",
        title: "Cálculos Precisos",
        description: "Diferentes calculadoras ofrecidas al usuario."
    },
    {
        icon: "fa-users",
        title: "Planificación",
        description: "Asesoramiento personalizado."
    },
    {
        icon: "fa-file-export",
        title: "Reportes PDF",
        description: "Generación automática de documentación."
    }
];

const footerLinks = [
    { text: "Características", href: "#features" },
    { text: "Demo", href: "#showcase" },
    { text: "Soporte", href: "#contact" },
    { text: "Términos", href: "#" }
];

document.addEventListener('DOMContentLoaded', () => {
    renderFeatures();
    renderFooterLinks();
    setupMenu();
    setupScrollEffects();
});


function renderFeatures() {
    const container = document.querySelector('.features-grid');
    container.innerHTML = featuresData.map(feature => `
        <div class="feature-card">
            <i class="fas ${feature.icon}"></i>
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
        </div>
    `).join('');
}

function renderFooterLinks() {
    const container = document.getElementById('footerLinks');
    container.innerHTML = footerLinks.map(link => `
        <li><a href="${link.href}">${link.text}</a></li>
    `).join('');
}

function setupMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuBtn.querySelector('i').classList.toggle('fa-times');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                menuBtn.querySelector('i').classList.remove('fa-times');
            }
        });
    });
}

function setupScrollEffects() {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });


    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        header.style.boxShadow = window.scrollY > 10 ? 
            '0 2px 15px rgba(0, 0, 0, 0.7)' : 
            '0 2px 10px rgba(0, 0, 0, 0.5)';
    });
}

const heroTitle = document.querySelector('.hero h2');
const originalText = heroTitle.textContent;

heroTitle.style.visibility = 'hidden';
heroTitle.style.height = 'auto';
heroTitle.style.display = 'inline-block';

const width = heroTitle.offsetWidth;
const height = heroTitle.offsetHeight;

heroTitle.style.visibility = 'visible';
heroTitle.style.height = height + 'px';
heroTitle.textContent = '';

let i = 0;
const typeWriter = setInterval(() => {
    heroTitle.textContent += originalText[i];
    i++;
    if (i === originalText.length) {
        clearInterval(typeWriter);
        heroTitle.style.height = 'auto';
    }
}, 60);