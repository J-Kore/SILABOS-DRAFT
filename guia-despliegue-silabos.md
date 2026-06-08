# Guía: desplegar apps en `silabos.es/nombre-app` (Vercel, proyectos separados)

Objetivo: que cada app (ConVozJugator, Conjuanjugator, Ponlo…) se vea como una
**subruta de tu web** —por ejemplo `silabos.es/convozjugator`— aunque cada una
sea un **proyecto independiente** en Vercel. El usuario nunca sale de
`silabos.es`: misma marca, misma barra de direcciones.

Hay **dos partes**: una en cada app, y una sola vez en el proyecto de la web
SILABOS. Hazlas en este orden.

---

## PARTE 1 — En CADA app (repetir por app)

### 1.1 · Configurar la "base" en Vite

Cada app debe saber que vivirá en una subcarpeta, para que sus archivos (JS, CSS,
imágenes) se carguen desde la ruta correcta y no desde la raíz.

En el archivo `vite.config.js` de la app, deja la configuración así (cambiando el
nombre de la subruta por el de cada app):

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  // En producción la app vive en /nombre-app/ ; en local, en la raíz.
  base: command === "build" ? "/nombre-app/" : "/",
  plugins: [react()],
}));
```

Sustituye `nombre-app` por la subruta real de cada una:
- ConVozJugator → `"/convozjugator/"`
- Conjuanjugator → `"/conjuanjugator/"`
- Ponlo → `"/ponlo/"`

> En ConVozJugator esto **ya está hecho** (con `/convozjugator/`).

**Importante sobre rutas internas:** si la app usa React Router, hay que pasarle
también la base con `basename="/nombre-app"`. Si la app no usa router (como
ConVozJugator, que navega por estado), no hace falta.

### 1.2 · Desplegar la app en Vercel

Cada app sigue siendo su propio proyecto en Vercel, como hasta ahora. No cambia
nada de cómo la subes. Solo anota su **URL de Vercel**, que será algo como:

```
https://convozjugator.vercel.app
```

La necesitarás en la Parte 2.

---

## PARTE 2 — En el proyecto de la WEB SILABOS (una sola vez)

Aquí está la magia: le dices a tu web que, cuando alguien entre a una subruta,
sirva la app correspondiente desde su proyecto de Vercel, sin cambiar la URL.

En la **raíz del proyecto de tu web SILABOS**, crea (o edita) el archivo
`vercel.json` con una regla `rewrites` por cada app:

```json
{
  "rewrites": [
    {
      "source": "/convozjugator/:path*",
      "destination": "https://convozjugator.vercel.app/convozjugator/:path*"
    },
    {
      "source": "/conjuanjugator/:path*",
      "destination": "https://conjuanjugator.vercel.app/conjuanjugator/:path*"
    }
  ]
}
```

Qué hace cada regla: "cuando alguien pida `silabos.es/convozjugator/...`, tráelo
en silencio desde el proyecto de esa app". El usuario sigue viendo `silabos.es`
en la barra de direcciones.

> Nota: el `destination` repite `/convozjugator/` porque esa es la `base` que
> configuraste en la Parte 1.1. Las dos piezas tienen que coincidir.

Tras editar `vercel.json`, vuelve a desplegar el proyecto de la web (un push a
git, o "Redeploy" en el panel de Vercel).

---

## Enlazar desde tu web

En tu web SILABOS, los enlaces a las apps son simplemente rutas internas:

```html
<a href="/convozjugator/">Abrir ConVozJugator</a>
```

No uses la URL `.vercel.app` en los enlaces: usa siempre la subruta de tu
dominio, para que el usuario se quede en `silabos.es`.

---

## Comprobaciones finales

1. `silabos.es/convozjugator/` abre la app a pantalla completa.
2. La barra de direcciones sigue mostrando `silabos.es`.
3. Los estilos, imágenes y el logo cargan bien (si algo sale "sin estilo",
   suele ser que la `base` de la Parte 1.1 no coincide con el `vercel.json`).
4. En ConVozJugator concretamente: el **micrófono** funciona (al no usar iframe,
   no hay problemas de permisos).

---

## Resumen rápido para cada app nueva

1. En la app: poner `base: "/nombre-app/"` en `vite.config.js` (solo en build).
2. Desplegar la app en Vercel, anotar su URL `.vercel.app`.
3. En la web SILABOS: añadir una regla `rewrite` en `vercel.json`.
4. Redeploy de la web. Enlazar con `/nombre-app/`.

---

## Si prefieres preguntarme en el chat de cada app

Puedes hacerlo en el chat de desarrollo de cada app. Para que te ayude bien,
dile algo como:

> "Quiero desplegar esta app como subruta de silabos.es/NOMBRE en Vercel.
> Necesito configurar la `base` de Vite y saber qué poner en el vercel.json de
> mi web. ¿Usa React Router esta app?"

Con eso, quien te ayude tendrá el contexto para darte los pasos exactos según
cómo esté hecha esa app en concreto (sobre todo si usa React Router, que cambia
un detalle).
