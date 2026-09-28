# Web de EL TOP JOHN

La página pública del juego: portada, **política de privacidad**, términos de
uso, soporte y borrado de datos. Es lo que hay que enseñarle a App Store
Connect y a Google Play Console para poder publicar la app.

Se sirve con **GitHub Pages** desde este repo. HTML y CSS a pelo, sin build, sin
dependencias: se abre cualquier fichero en el navegador y ya se ve.

## Por qué esto es un repo aparte

El código del juego (`topgame`) es privado y tiene que seguir siéndolo: ahí
están las 130 cartas **con sus respuestas**, que es justo lo que se vende.
GitHub Pages gratis solo publica repos públicos, así que la web va en este repo
suyo, público y sin nada más que HTML.

## Qué hay aquí

| Fichero | URL | Para qué |
| --- | --- | --- |
| `index.html` | `/` | Portada: qué es el juego, capturas, enlaces. La **Marketing URL** de Apple. |
| `privacidad.html` | `/privacidad.html` | Política de privacidad. **Obligatoria en las dos tiendas.** |
| `terminos.html` | `/terminos.html` | Condiciones de uso: qué se compra, devoluciones, contenido. |
| `soporte.html` | `/soporte.html` | Ayuda y contacto. La **Support URL** de Apple, que también es obligatoria. |
| `eliminar-datos.html` | `/eliminar-datos.html` | Cómo borrar los datos. La pide el formulario de **Data safety** de Play. |
| `404.html` | — | La que sale al escribir mal una dirección. |
| `assets/` | — | Estilos, el conmutador de idioma, icono y capturas. |
| `.nojekyll` | — | Le dice a Pages que no procese nada: se sirven los ficheros tal cual. |

## Publicarla

Con el repo ya creado en GitHub (`carcanye/eltopjohn-privacy`), desde esta
carpeta:

```bash
git init -b main && git remote add origin git@github.com:carcanye/eltopjohn-privacy.git && git add -A && git commit -m "Web pública: privacidad, términos, soporte y borrado de datos" && git push -u origin main
```

Y después, **una vez**, en la web de GitHub:

1. `Settings` → `Pages`.
2. *Source*: **Deploy from a branch**.
3. *Branch*: **main**, carpeta **/ (root)** → `Save`.

En un par de minutos queda en:

```
https://carcanye.github.io/eltopjohn-privacy/
```

Los cambios posteriores son `git add`, `git commit`, `git push`: Pages
republica solo, con un minuto o dos de retraso.

Para verla antes de subir, sin sorpresas de rutas:

```bash
python3 -m http.server 8000
```

## Dónde va cada URL

| Dónde | Campo | Qué se pega |
| --- | --- | --- |
| App Store Connect | Privacy Policy URL | `https://carcanye.github.io/eltopjohn-privacy/privacidad.html` |
| App Store Connect | Support URL *(obligatoria)* | `https://carcanye.github.io/eltopjohn-privacy/soporte.html` |
| App Store Connect | Marketing URL *(opcional)* | `https://carcanye.github.io/eltopjohn-privacy/` |
| App Store Connect | License Agreement | El EULA estándar de Apple vale; si prefieres el propio, enlaza `terminos.html`. |
| Play Console → App content | Política de privacidad | `https://carcanye.github.io/eltopjohn-privacy/privacidad.html` |
| Play Console → Data safety | URL de eliminación de datos | `https://carcanye.github.io/eltopjohn-privacy/eliminar-datos.html` |
| Play Console → Ficha | Correo y sitio web | `eltopjohn@gmail.com` y la portada |

La misma URL sirve para español e inglés: cada página lleva las dos versiones
dentro y se enseña una según el idioma del navegador (o con `?lang=en`). Es lo
mismo que hace el juego con las cartas, y por el mismo motivo: con las dos
versiones en el mismo fichero se ve de un vistazo si una se ha quedado atrás.

## Qué contestar en los formularios de privacidad

Los dos cuestionarios —**Data safety** en Play y **App Privacy** en App Store
Connect— hay que rellenarlos a mano, y tienen que cuadrar con lo que dice
`privacidad.html`. Esto es lo que hace la app hoy, sacado de su código
(`src/services/` en el repo del juego):

**Google Play — Data safety**

- ¿Recopila o comparte datos de usuario? **Sí.**
- *Identificadores del dispositivo o de otro tipo*: **se recopila**, no se
  comparte. Fines: **funcionalidad de la app** y **estadísticas**. Es el id
  aleatorio de instalación de `deviceId.ts`.
- *Actividad en la app → interacciones con la app*: **se recopila**. Fin:
  **estadísticas**. Son los contadores del muro (`wallEvents.ts`).
- *Actividad en la app → otro contenido generado por el usuario*: **se
  recopila**. Fin: **funcionalidad de la app**. Es el comentario libre del
  reporte de una carta (`cardReports.ts`).
- Datos cifrados en tránsito: **sí** (todo va por HTTPS).
- ¿Se pueden pedir que se borren? **Sí** → URL de `eliminar-datos.html`.
- Nada de esto se usa para publicidad ni se vende: **no** hay anuncios ni
  intermediarios de datos.

**App Store Connect — App Privacy**

- *Data Used to Track You*: **ninguno**. No hay IDFA ni seguimiento entre apps,
  así que tampoco hace falta el permiso de seguimiento (ATT).
- *Data Linked to You*: **ninguno**. No hay cuentas.
- *Data Not Linked to You*:
  - **Identifiers → User ID**: el id aleatorio de instalación. Fines: App
    Functionality, Analytics.
  - **Usage Data → Product Interaction**: los contadores del muro. Fin:
    Analytics.
  - **User Content → Other User Content**: el comentario del reporte. Fin: App
    Functionality.
  - **Purchases → Purchase History**: lo que trata el SDK de RevenueCat. Fin:
    App Functionality. (RevenueCat publica su propia guía de qué declarar;
    conviene mirarla al conectar la app de verdad.)

## Antes de publicar, rellenar

- [ ] **Crear la cuenta `eltopjohn@gmail.com`** y comprobar que llegan los
      correos. Sale en las cinco páginas; si no existe, el enlace de soporte que
      revisa la tienda no lleva a ningún sitio.
- [ ] **El nombre del responsable.** Ahora pone «Gestiamigos», que es el nombre
      de desarrollador que ya usas en `app.json` y en el id del paquete. Mientras
      la app sea gratis, con eso y un correo que conteste vale.
      El día que se cobre cambia el cuadro, y no por esta página: **la tienda
      publica tu identidad de todas formas**. Google Play exige una **dirección
      física pública** en la ficha a quien tenga app de pago o compras dentro, y
      Apple muestra como vendedor el **nombre legal del titular** cuando la
      cuenta es de particular. Cuando llegue ese momento, que la política diga lo
      mismo que la ficha: se cambia en `privacidad.html` y en `terminos.html`.
- [ ] **Los botones de tienda.** En `index.html` están como «Pronto en…»
      (`<span class="store soon">`). Cuando cada ficha esté publicada, cambia el
      `span` por el `<a href="…">` que hay comentado justo encima.
- [x] **Dónde está la base de datos.** El proyecto de Supabase va en
      `eu-west-1` (Irlanda), así que la política ya dice que los reportes y los
      contadores se guardan **en la Unión Europea**. Si algún día se migra el
      proyecto a otra región, esa frase deja de ser verdad y hay que cambiarla.

## Mantenerla

La regla es corta: **si la app empieza a enviar algo que hoy no envía, esta
página se toca el mismo día**. Una política de privacidad que no cuadra con lo
que hace el binario es peor que no tenerla, y las dos tiendas la revisan.

Lo que hoy sale del móvil y de dónde sale, para poder comprobarlo:

| Qué | Fichero en el repo del juego |
| --- | --- |
| Id aleatorio de instalación | `src/services/deviceId.ts` |
| Reportes de cartas | `src/services/cardReports.ts` |
| Contadores del muro | `src/services/wallEvents.ts` |
| Compras (RevenueCat) | `src/services/purchases.ts` |
| Descarga del mazo | `src/services/cardSyncService.ts` |
| Actualizaciones del código | `updates.url` en `app.json` (Expo) |

Al cambiar el texto de una página, cambia también **la fecha** de
«Última actualización» y **la versión en inglés** que tiene al lado.
