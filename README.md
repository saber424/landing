# Ps. Sara Bernal — Landing Page

Landing page profesional para **Sara Bernal**, psicóloga clínica. Sitio estático
(HTML + CSS + JavaScript vanilla), sin frameworks ni proceso de build, listo
para publicarse en GitHub Pages.

> ⚠️ **Antes de publicar**: este proyecto usa contenido de ejemplo (placeholder).
> Reemplaza el nombre, la cédula profesional (`#000000`), los textos, las
> imágenes y el endpoint del formulario de contacto por los datos reales
> antes de hacer público el sitio.

> ⚠️ **Páginas legales (`terminos.html` y `privacidad.html`)**: son una
> plantilla de referencia basada en la Ley 1581 de 2012 (Habeas Data,
> Colombia), **no son asesoría legal**. Dado que el sitio recolecta datos
> sensibles de salud mental (campo "motivo de consulta"), haz que un
> abogado las revise antes de publicar el sitio.

## Estructura del proyecto

```
/index.html            → página principal (hero, áreas, tarifas, sobre mí,
                          recursos, bienestar, contacto, agenda, testimonios, footer)
/terminos.html          → Términos y Condiciones
/privacidad.html        → Política de tratamiento de datos personales
/css/styles.css         → estilos (paleta, tipografía, layout, responsive)
/js/main.js             → comportamiento (rotación del hero, scroll-spy, menú
                          mobile, selector de horarios en Agenda, consentimiento
                          de cookies)
/assets/                → imágenes del sitio
/assets/icons/          → favicon e íconos de la marca (ver sección SEO abajo)
/favicon.ico            → favicon multi-resolución (16/32/48/256 px)
/site.webmanifest       → manifest para "agregar a inicio" en móvil
/robots.txt             → reglas para rastreadores
/sitemap.xml            → mapa del sitio para Google Search Console
```

## SEO y favicon

- **Ícono de marca**: `assets/icons/logo-mark.svg` — una hoja (crecimiento/
  bienestar) dentro de una silueta de cabeza de perfil (mente/psicología),
  en la paleta del sitio. Es el archivo fuente; todos los demás tamaños
  (`favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`,
  `apple-touch-icon.png`, `android-chrome-*.png`) se generaron a partir de
  él. Si cambias el ícono, regenera estos archivos con la misma fuente.
- **`robots.txt`** permite el rastreo de todo el sitio. `terminos.html` y
  `privacidad.html` no se bloquean ahí a propósito — llevan
  `<meta name="robots" content="noindex">` en su `<head>`, que es la forma
  correcta de excluirlas del índice sin impedir que Google las rastree.
- **`sitemap.xml`** solo incluye `index.html` (las páginas legales son
  `noindex`, por lo que no deben aparecer en el sitemap).
- **Datos estructurados**: `index.html` incluye un bloque `application/ld+json`
  tipo `MedicalBusiness` con datos de contacto — actualiza el campo
  `address` con la dirección real si aplica.
- Antes de publicar, actualiza `https://www.sarabernal.co/` en
  `robots.txt`, `sitemap.xml` y las etiquetas `canonical`/`og:url` de las 3
  páginas si el dominio final cambia.

## Google Analytics y consentimiento de cookies

El sitio incluye Google Analytics (`gtag.js`), pero **no se activa hasta que
el visitante acepta el banner de cookies** que aparece en la primera visita
(ver `initCookieConsent` en `js/main.js`). Si el visitante rechaza o no ha
respondido, no se hace ninguna petición a Google. La elección se guarda en
`localStorage` y se puede cambiar en cualquier momento desde el enlace
"Preferencias de cookies" en el pie de página.

El formulario de contacto también incluye una casilla obligatoria de
autorización de tratamiento de datos, enlazada a `privacidad.html`.

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

## Reemplazar las imágenes de ambiente por fotos reales

El sitio usa dos imágenes de ambiente libres de derechos de autor (licencia
CC0, ver detalle y créditos en `assets/README.md`) como relleno temporal.
Reemplázalas por fotos reales de la psicóloga cuando estén disponibles:

| Sección  | Ruta a reemplazar              | Dónde se usa en `index.html`        |
|----------|---------------------------------|--------------------------------------|
| Hero     | `assets/hero-ambience.jpg`     | `<img>` dentro de `<section id="inicio">`, clase `hero__img` |
| Sobre mí | `assets/sobre-ambience.jpg`    | `<img>` dentro de `<section id="sobre">`, clase `sobre__img` |

Pasos:

1. Coloca tus archivos de imagen en la carpeta `assets/` con esos mismos
   nombres (o cambia el atributo `src` en `index.html` si usas otro nombre).
2. Actualiza también el atributo `alt` de cada `<img>` para que describa la
   foto real en vez de la imagen de ambiente, manteniendo buena accesibilidad.

Mientras no exista el archivo de imagen, el sitio muestra automáticamente un
fondo de color de respaldo (no se rompe el diseño ni aparece un ícono de
imagen rota).

## Conectar el formulario de contacto (Web3Forms)

El formulario de la sección **Contacto** (`#contacto` en `index.html`) no
tiene backend propio. Está conectado a [Web3Forms](https://web3forms.com),
un servicio gratuito que reenvía los envíos del formulario a tu correo sin
necesidad de backend propio.

1. Ve a [web3forms.com](https://web3forms.com) e ingresa el correo donde
   quieres recibir los mensajes. Te generan una **access key** gratis al
   instante (llega por correo, sin necesidad de crear una cuenta).
2. En `index.html`, busca el campo oculto `access_key` dentro del
   `<form id="contactForm">` (sección Contacto) y reemplaza
   `TU_ACCESS_KEY_AQUI` por tu key real:

   ```html
   <input type="hidden" name="access_key" value="TU_ACCESS_KEY_AQUI">
   ```

3. Listo. El formulario ya envía por AJAX (ver `js/main.js`, función
   `initContactForm`): al enviar, muestra "Enviando...", y luego un mensaje
   de éxito o error sin recargar la página. Incluye un campo `botcheck`
   oculto como protección anti-spam (no lo elimines).

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
