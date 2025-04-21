// Datos iniciales (en español por defecto)
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

// Variables globales
let currentLang = 'es';

// Cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', async () => {
  // Configurar elementos iniciales
  renderFooterLinks();
  setupMenu();
  setupScrollEffects();
  
  // Configurar internacionalización
  await initLanguage();
  
  // Configurar efecto de escritura (si existe el elemento)
  if (document.querySelector('.hero h2')) {
      setupTypewriterEffect();
  }
});

// Inicializar el sistema de idiomas
async function initLanguage() {
  // Cargar idioma preferido (guardado o del navegador)
  const preferredLang = localStorage.getItem('preferredLang') || 
                       navigator.language.split('-')[0] || 
                       'es';
  
  // Aplicar traducciones
  await applyTranslations(['es', 'en'].includes(preferredLang) ? preferredLang : 'es');
  
  // Configurar eventos para los botones de idioma
  document.querySelectorAll('.lang-btn').forEach(button => {
      button.addEventListener('click', async () => {
          const lang = button.getAttribute('data-lang');
          await applyTranslations(lang);
      });
  });
}

// Función para aplicar traducciones
async function applyTranslations(lang) {
  try {
      currentLang = lang;
      const translations = await loadTranslations(lang);
      
      // 1. Cambiar atributo lang del HTML
      document.documentElement.lang = lang;
      
      // 2. Traducir elementos con data-i18n
      document.querySelectorAll('[data-i18n]').forEach(element => {
          const keys = element.getAttribute('data-i18n').split('.');
          let translation = translations;
          
          keys.forEach(key => {
              translation = translation?.[key];
          });
          
          if (translation) {
              element.textContent = translation;
          }
      });
      
      // 3. Traducir elementos con HTML (data-i18n-html)
      document.querySelectorAll('[data-i18n-html]').forEach(element => {
          const keys = element.getAttribute('data-i18n-html').split('.');
          let translation = translations;
          
          keys.forEach(key => {
              translation = translation?.[key];
          });
          
          if (translation) {
              element.innerHTML = translation;
          }
      });
      
      // 4. Actualizar botones de idioma
      document.querySelectorAll('.lang-btn').forEach(btn => {
          btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
      });
      
      // 5. Traducir características
      await renderFeatures();
      
      // 6. Traducir footer links
      await renderFooterLinks();
      
      // 7. Guardar preferencia
      localStorage.setItem('preferredLang', lang);
      
  } catch (error) {
      console.error('Error applying translations:', error);
  }
}

// Función para cargar traducciones
async function loadTranslations(lang) {
  try {
      const response = await fetch(`js/lang/${lang}.json`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
  } catch (error) {
      console.error('Error loading translations:', error);
      return {};
  }
}

// Renderizar características (traducidas)
async function renderFeatures() {
  try {
      const translations = await loadTranslations(currentLang);
      const container = document.querySelector('.features-grid');
      
      if (!container) return;
      
      // Usar datos traducidos si existen, sino los datos por defecto
      const featuresToRender = translations.features?.items || featuresData;
      
      container.innerHTML = featuresToRender.map(feature => `
          <div class="feature-card">
              <i class="fas ${feature.icon}"></i>
              <h3>${feature.title}</h3>
              <p>${feature.description}</p>
          </div>
      `).join('');
  } catch (error) {
      console.error('Error rendering features:', error);
  }
}

// Renderizar footer links (traducidos)
function getFooterLinkStructure() {
  const currentPage = window.location.pathname.split('/').pop();
  
  // Si estamos en about.html
  if (currentPage === 'about.html') {
    return {
      features: { href: "index.html#features" },
      demo: { href: "index.html#showcase" },
      support: { href: "#contact" },
      terms: { href: "#terms" }
    };
  }
  
  // Para index.html u otras páginas
  return {
    features: { href: "#features" },
    demo: { href: "#showcase" },
    support: { href: "about.html#contact" },
    terms: { href: "about.html#terms" }
  };
}

// Función para renderizar los links del footer
async function renderFooterLinks() {
  try {
    const translations = await loadTranslations(currentLang);
    const linkStructure = getFooterLinkStructure();
    
    const container = document.getElementById('footerLinks');
    if (!container) return;
    
    // Mapear la estructura a los links reales
    const links = [
      { text: "features", href: linkStructure.features.href },
      { text: "demo", href: linkStructure.demo.href },
      { text: "support", href: linkStructure.support.href },
      { text: "terms", href: linkStructure.terms.href }
    ];
    
    container.innerHTML = links.map(link => {
      const translatedText = translations.footer?.[link.text] || 
                           link.text.charAt(0).toUpperCase() + link.text.slice(1);
      return `<li><a href="${link.href}">${translatedText}</a></li>`;
    }).join('');
  } catch (error) {
    console.error('Error rendering footer links:', error);
  }
}

// Efecto de máquina de escribir
function setupTypewriterEffect() {
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
}

// Configurar menú hamburguesa
function setupMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  
  if (menuBtn && navLinks) {
      menuBtn.addEventListener('click', function() {
          navLinks.classList.toggle('active');
          const icon = this.querySelector('i');
          if (navLinks.classList.contains('active')) {
              icon.classList.replace('fa-bars', 'fa-times');
          } else {
              icon.classList.replace('fa-times', 'fa-bars');
          }
      });
      
      document.querySelectorAll('.nav-links a').forEach(link => {
          link.addEventListener('click', function() {
              if (window.innerWidth <= 768) {
                  navLinks.classList.remove('active');
                  const icon = menuBtn.querySelector('i');
                  icon.classList.replace('fa-times', 'fa-bars');
              }
          });
      });
  }
}

// Configurar efectos de scroll
function setupScrollEffects() {
  // Manejar enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          const targetId = this.getAttribute('href');
          if (targetId.includes('.html')) return;
          
          e.preventDefault();
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              const headerHeight = document.querySelector('header').offsetHeight;
              window.scrollTo({
                  top: targetElement.offsetTop - headerHeight - 20,
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Manejar hash al cargar
  if (window.location.hash) {
      const targetElement = document.querySelector(window.location.hash);
      if (targetElement) {
          setTimeout(() => {
              const headerHeight = document.querySelector('header').offsetHeight;
              window.scrollTo({
                  top: targetElement.offsetTop - headerHeight - 20,
                  behavior: 'smooth'
              });
          }, 100);
      }
  }
}