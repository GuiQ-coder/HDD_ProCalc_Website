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
    { text: "Soporte", href: "about.html#contact" },
    { text: "Términos", href: "about.html#terms" }
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

document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    
    // Verifica que los elementos existen
    if(menuBtn && navLinks) {
      menuBtn.addEventListener('click', function() {

        navLinks.classList.toggle('active');
        
        // Cambiar icono de hamburguesa a X y viceversa
        const icon = this.querySelector('i');
        if(navLinks.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    }
    
    
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', function() {
        if(window.innerWidth <= 768) {
          navLinks.classList.remove('active');
          const icon = menuBtn.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  });



document.addEventListener('DOMContentLoaded', function() {
    // Manejar enlaces internos en la misma página
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Si es un enlace a otra página
        if(targetId.includes('.html')) {
          return;
        }
        
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
          const headerHeight = document.querySelector('header').offsetHeight;
          window.scrollTo({
            top: targetElement.offsetTop - headerHeight - 20,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Manejar scroll al cargar página con hash
    if(window.location.hash) {
      const targetElement = document.querySelector(window.location.hash);
      if(targetElement) {
        setTimeout(() => { // Pequeño delay para asegurar que el DOM está listo
          const headerHeight = document.querySelector('header').offsetHeight;
          window.scrollTo({
            top: targetElement.offsetTop - headerHeight - 20,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

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
}, 50);