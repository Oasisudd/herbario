# Herbario Digital OASIS — Webapp

Versión web (estática, sin frameworks) del catálogo de flora de humedales altoandinos del
Parque Nacional Nevado Tres Cruces y el sitio RAMSAR Laguna del Negro Francisco / Laguna
Santa Rosa. Es una adaptación de la app Expo/React Native original, pensada para publicarse
gratis en **GitHub Pages**.

Las fotos de las especies se cargan directamente desde tu repo
[`Oasisudd/herbario`](https://github.com/Oasisudd/herbario) (servidas vía
`https://oasisudd.github.io/herbario/...`), así que este proyecto no las duplica: pesa solo
unos 3 MB.

## Estructura

```
index.html          # Punto de entrada
css/style.css        # Estilos (colores/tipografía tomados de constants/colors.ts)
js/data.js            # Datos de especies, paisajes y mapa de Chile (generados desde tus .ts)
js/app.js              # Router + toda la lógica de las pantallas
assets/                 # Logos, ícono, fotos de portada de cada paisaje
```

No hay build step: es HTML/CSS/JS plano. Puedes abrir `index.html` directamente en el
navegador para probarlo localmente (o mejor, sírvelo con un servidor local, ver abajo).

## Publicar en GitHub Pages

1. **Crea un repositorio nuevo** en tu cuenta, por ejemplo `Oasisudd/herbario-web`
   (no lo hagas dentro del repo `herbario` que ya tienes, ese solo debe tener las fotos).

2. **Sube estos archivos** a la rama `main`. Desde tu computador, dentro de esta carpeta:

   ```bash
   git init
   git add .
   git commit -m "Herbario Digital OASIS — versión web"
   git branch -M main
   git remote add origin https://github.com/Oasisudd/herbario-web.git
   git push -u origin main
   ```

3. **Activa GitHub Pages**: en el repo, ve a `Settings → Pages`, en "Source" elige la rama
   `main` y la carpeta `/ (root)`, y guarda.

4. Espera 1–2 minutos. Tu sitio quedará publicado en:

   ```
   https://oasisudd.github.io/herbario-web/
   ```

## Probar localmente antes de subir

No abras `index.html` con doble clic (algunos navegadores bloquean `fetch`/módulos con
`file://`). Mejor levanta un servidor simple desde esta carpeta:

```bash
python3 -m http.server 8000
# luego abre http://localhost:8000
```

## Actualizar contenido

- **Agregar/editar especies o paisajes**: hazlo en tu app Expo original
  (`constants/species.ts`, `constants/paisajes.ts`) y pide que se regenere `js/data.js`,
  o edítalo directamente si te sientes cómodo con JSON.
- **Agregar fotos nuevas**: solo súbelas al repo `Oasisudd/herbario` (organizadas igual que
  ahora, por especie y categoría) y referencia la nueva ruta en `js/data.js`. No hace falta
  tocar este repo salvo para actualizar esa referencia.

## Notas técnicas

- El mapa de distribución usa el mismo SVG vectorial de las 16 regiones de Chile que ya
  tenías codificado en `constants/chileRegions.ts`.
- El routing es por hash (`#/catalogo`, `#/species/:id`, etc.) para que funcione en GitHub
  Pages sin configuración de servidor adicional.
- Diseño responsive: se ve bien tanto en celular como en escritorio (ancho máximo de
  contenido 720px, centrado).
