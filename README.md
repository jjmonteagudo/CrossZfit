
# Proyecto sitio CrossZfit

Sitio web del box CrossZfit.

En CrossZfit creemos que el CrossFit es mucho más que un entrenamiento físico. Es una comunidad de personas apasionadas por mejorar su salud y bienestar. Nuestro box es un espacio donde te sentirás motivado, apoyado y parte de una familia.

¿Qué nos hace diferentes?

Entrenadores certificados: Nuestro equipo de entrenadores altamente capacitados te guiará en cada paso del camino, asegurándose de que ejecutes los movimientos correctamente y alcances tus objetivos.
Comunidad inclusiva: Creemos en un ambiente donde todos son bienvenidos, sin importar su nivel de experiencia.
Entrenamientos variados: Nuestros WODs (Workouts of the Day) están diseñados para desafiarte y mantenerte motivado, siempre con opciones para todos los niveles.
Enfoque en el bienestar integral: Además del entrenamiento físico, nos preocupamos por tu salud mental y emocional. Organizamos eventos sociales y actividades que fomentan el compañerismo y el bienestar.
Únete a nuestra comunidad y descubre el poder transformador del CrossFit.
## Tecnologías utilizadas

HTML5, SCSS (Dart Sass), Bootstrap 5 (solo los módulos que se usan), JavaScript y Vite.

## Desarrollo

Requiere Node.js 20 o superior.

```bash
npm install      # instalar dependencias
npm run dev      # servidor local con recarga automática
npm run build    # genera el sitio listo para publicar en dist/
npm run preview  # sirve dist/ para revisarlo antes de publicar
```

### Estructura

- `index.html` y `pages/*.html`: las páginas. El menú y el footer se escriben una sola vez en
  `vite.config.js` y se insertan donde dice `<!-- @header -->` / `<!-- @footer -->`.
- `src/scss/`: estilos, separados por componente (`componentes/`) con variables en `_variables.scss`.
- `src/main.js`: punto de entrada (estilos, Bootstrap JS, tienda y formulario de contacto).
- `src/img/`: imágenes optimizadas en WebP. Para agregar fotos nuevas:
  `npm run images -- ruta/foto.jpg` (las convierte y las guarda en `src/img/`).

### Publicación

Cada push a `main` compila y publica el sitio en GitHub Pages con el workflow
`.github/workflows/deploy.yml`. En *Settings → Pages* el origen tiene que estar en **GitHub Actions**.

## Autor

- [@jjmonteagudo](https://github.com/jjmonteagudo), Ingeniero Juan Monteagudo
