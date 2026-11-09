import { defineConfig } from 'vite';
import path from 'node:path';
import { resolve } from 'node:path';

// Datos de contacto en un solo lugar
const WHATSAPP = '59894522752';

const PAGINAS = [
  { archivo: 'index.html', texto: 'Inicio' },
  { archivo: 'index.html#quienes', texto: '¿Quiénes somos?' },
  { archivo: 'index.html#equipo', texto: 'Equipo' },
  { archivo: 'index.html#modalidades', texto: 'Modalidades' },
  { archivo: 'pages/galeria.html', texto: 'Galería' },
  { archivo: 'pages/tienda.html', texto: 'Tienda' },
  { archivo: 'pages/contacto.html', texto: 'Contacto' },
  { archivo: 'pages/faqs.html', texto: 'Preguntas frecuentes' },
];

function header(raiz, actual) {
  const items = PAGINAS.map(({ archivo, texto }) => {
    const activo = archivo === actual;
    return `
          <li class="nav-item">
            <a class="nav-link${activo ? ' active' : ''}"${activo ? ' aria-current="page"' : ''} href="${raiz}${archivo}">${texto}</a>
          </li>`;
  }).join('');

  return `
  <a class="skip-link" href="#contenido">Saltar al contenido</a>
  <header>
    <nav class="navbar navbar-expand-lg bg-dark fixed-top" data-bs-theme="dark" aria-label="Navegación principal">
      <div class="container-fluid">
        <a class="navbar-brand" href="${raiz}index.html">
          <img src="/src/img/logo.webp" width="60" height="60" alt="CrossZfit - Inicio">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu-principal"
          aria-controls="menu-principal" aria-expanded="false" aria-label="Abrir menú">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="menu-principal">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">${items}
          </ul>
        </div>
      </div>
    </nav>
  </header>`;
}

function footer() {
  return `
  <footer class="pie">
    <p class="pie__copy">© <span data-anio>${new Date().getFullYear()}</span> CrossZfit · Sitio desarrollado por ElafSoftware</p>
    <ul class="pie__redes">
      <li><a href="https://www.instagram.com/crosszfit/" target="_blank" rel="noopener" aria-label="Instagram de CrossZfit">
        <img src="/src/img/instagram.webp" width="40" height="40" alt=""></a></li>
      <li><a href="https://www.facebook.com/profile.php?id=598626583" target="_blank" rel="noopener" aria-label="Facebook de CrossZfit">
        <img src="/src/img/facebook.webp" width="40" height="40" alt=""></a></li>
      <li><a href="https://wa.me/${WHATSAPP}" target="_blank" rel="noopener" aria-label="WhatsApp de CrossZfit">
        <img src="/src/img/whatsapp.webp" width="40" height="40" alt=""></a></li>
    </ul>
  </footer>
  <a class="whatsapp-flotante" href="https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hola CrossZfit! Quiero hacer una consulta.')}"
    target="_blank" rel="noopener" aria-label="Escribinos por WhatsApp">
    <img src="/src/img/whatsapp-blanco.svg" width="34" height="34" alt="">
  </a>`;
}

// Reemplaza <!-- @header --> y <!-- @footer --> en cada página
function parciales() {
  return {
    name: 'crosszfit-parciales',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const relativo = path.relative(__dirname, ctx.filename).split(path.sep).join('/');
        const raiz = relativo.includes('/') ? '../' : './';
        return html
          .replace('<!-- @header -->', header(raiz, relativo).trim())
          .replace('<!-- @footer -->', footer().trim());
      },
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [parciales()],
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        galeria: resolve(__dirname, 'pages/galeria.html'),
        tienda: resolve(__dirname, 'pages/tienda.html'),
        contacto: resolve(__dirname, 'pages/contacto.html'),
        faqs: resolve(__dirname, 'pages/faqs.html'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Bootstrap 5.3 todavía usa @import y funciones viejas de Sass
        silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'mixed-decls'],
        quietDeps: true,
      },
    },
  },
});
