import './scss/bootstrap.scss';
import './scss/estilos.scss';

// Solo los componentes de Bootstrap que usa el sitio
import 'bootstrap/js/dist/collapse';
import 'bootstrap/js/dist/carousel';

const WHATSAPP = '59894522752';

// Año del footer siempre actualizado
document.querySelectorAll('[data-anio]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Tienda: las tarjetas giran con hover (escritorio) o con el botón "Ver precio" (celular / teclado)
document.querySelectorAll('.producto').forEach((producto) => {
  const boton = producto.querySelector('.producto__girar');
  producto.addEventListener('click', (e) => {
    if (e.target.closest('a')) return;
    const girada = producto.classList.toggle('producto--girada');
    boton.setAttribute('aria-expanded', girada);
  });
});

// Contacto: mientras no haya backend, el formulario arma el mensaje y abre WhatsApp
const form = document.querySelector('#form-contacto');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    const datos = new FormData(form);
    const texto = `Hola CrossZfit! Soy ${datos.get('nombre')} (${datos.get('email')}).\n\n${datos.get('mensaje')}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
  });
}
