# Ps. Sara Bernal — Landing Page

Landing page profesional para **Sara Bernal**, psicóloga clínica. Sitio estático
(HTML + CSS + JavaScript vanilla), sin frameworks ni proceso de build, listo
para publicarse en GitHub Pages.

> ⚠️ **Antes de publicar**: este proyecto usa contenido de ejemplo (placeholder).
> Reemplaza el nombre, la cédula profesional (`#000000`), los textos, las
> imágenes y el endpoint del formulario de contacto por los datos reales
> antes de hacer público el sitio.

## Estructura del proyecto

```
/index.html         → toda la página (secciones: hero, áreas, tarifas, sobre mí,
                       recursos, bienestar, contacto, agenda, testimonios, footer)
/css/styles.css      → estilos (paleta, tipografía, layout, responsive)
/js/main.js          → comportamiento (rotación del hero, scroll-spy, menú
                       mobile, selector de horarios en Agenda)
/assets/             → imágenes del sitio (placeholders por ahora)
```

## Cómo probarlo localmente

Puedes abrir `index.html` directamente con doble clic en tu navegador — no
requiere servidor ni instalación de dependencias. Si prefieres un servidor
local (por ejemplo para evitar restricciones del navegador con rutas
relativas), puedes usar cualquiera de estas opciones desde la carpeta del
proyecto:

```bash
# Con Python
python3 -m http.server 8000

# Con Node (npx)
npx serve .
```

Luego visita `http://localhost:8000`.

## Publicar en GitHub Pages

1. Sube este proyecto a un repositorio de GitHub.
2. Ve a **Settings → Pages**.
3. En **Source**, selecciona la rama `main` y la carpeta `/ (root)`.
4. Guarda. GitHub Pages publicará el sitio en unos minutos en
   `https://<tu-usuario>.github.io/<tu-repo>/`.

No se requiere ningún paso de build: el repositorio se sirve tal cual.

## Reemplazar las imágenes placeholder

El sitio usa dos imágenes de referencia que debes reemplazar por fotos reales:

| Sección  | Ruta a reemplazar              | Dónde se usa en `index.html`        |
|----------|---------------------------------|--------------------------------------|
| Hero     | `assets/placeholder-hero.jpg`  | `<img>` dentro de `<section id="inicio">`, clase `hero__img` |
| Sobre mí | `assets/placeholder-about.jpg` | `<img>` dentro de `<section id="sobre">`, clase `sobre__img` |

Pasos:

1. Coloca tus archivos de imagen en la carpeta `assets/` con esos mismos
   nombres (o cambia el atributo `src` en `index.html` si usas otro nombre).
2. Actualiza también el atributo `alt` de cada `<img>` si el contenido de la
   foto cambia sustancialmente, para mantener buena accesibilidad.

Mientras no exista el archivo de imagen, el sitio muestra automáticamente un
fondo de color de respaldo (no se rompe el diseño ni aparece un ícono de
imagen rota).

## Cambiar el endpoint del formulario de contacto

El formulario de la sección **Contacto** (`#contacto` en `index.html`) no
tiene backend propio. Está pensado para conectarse a un servicio como
[Formspree](https://formspree.io) u otro equivalente compatible con sitios
estáticos.

1. Crea una cuenta y un formulario en Formspree (o el servicio que prefieras).
2. Copia el endpoint que te entregan (ej. `https://formspree.io/f/xxxxxxxx`).
3. En `index.html`, busca la etiqueta `<form class="contact-form" action="" method="POST">`
   (hay un comentario justo arriba indicando este punto) y reemplaza el
   `action=""` vacío por tu endpoint real:

   ```html
   <form class="contact-form" action="https://formspree.io/f/xxxxxxxx" method="POST">
   ```

## Integrar un sistema de agendamiento real

La sección **Agenda** (`#agenda`) incluye actualmente un selector de
horarios solo de interfaz (JavaScript vanilla, sin backend). Hay un
comentario en `index.html` marcando el punto exacto donde se debería
integrar un widget real, por ejemplo un embed de
[Calendly](https://calendly.com):

```html
<div class="calendly-inline-widget" data-url="https://calendly.com/tu-usuario/primera-sesion"></div>
<script src="https://assets.calendly.com/assets/external/widget.js" async></script>
```

## Datos placeholder pendientes de reemplazar

- Nombre de marca: `Sara Bernal` (usado en todo el sitio).
- Cédula profesional: `#000000` (footer).
- Correo y redes sociales (footer).
- Textos de "Sobre mí", tarifas y testimonios (contenido de ejemplo).

## Accesibilidad y SEO

- Estructura semántica (`<nav>`, `<header>`, `<section>`, `<footer>`).
- Todas las imágenes tienen atributo `alt` descriptivo.
- Metaetiquetas básicas (`title`, `description`, `viewport`, Open Graph) en
  `<head>`.
- Paleta de colores verificada para contraste AA mínimo entre texto y fondo.
