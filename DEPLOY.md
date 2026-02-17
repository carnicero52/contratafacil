# 🚀 ContrataFácil - Guía de Despliegue

## Opción 1: Vercel + Turso (Recomendado - GRATIS)

### Paso 1: Crear cuenta en Turso
1. Ve a [turso.tech](https://turso.tech)
2. Crea una cuenta gratuita
3. Crea una nueva base de datos:
   ```bash
   turso db create contratafacil
   ```
4. Obtén las credenciales:
   ```bash
   turso db show contratafacil --url
   turso db tokens create contratafacil
   ```

### Paso 2: Desplegar en Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu repositorio de GitHub
3. Configura las variables de entorno:
   - `TURSO_DATABASE_URL`: URL de tu base de datos Turso
   - `TURSO_AUTH_TOKEN`: Token de autenticación de Turso

4. ¡Despliega!

---

## Opción 2: Railway (Más fácil, plan gratuito limitado)

1. Ve a [railway.app](https://railway.app)
2. Conecta tu repositorio
3. Railway detectará automáticamente Next.js
4. Agrega un servicio de PostgreSQL
5. Configura `DATABASE_URL` automáticamente

---

## Opción 3: Render

1. Ve a [render.com](https://render.com)
2. Crea un nuevo Web Service
3. Conecta tu repositorio
4. Agrega una base de datos PostgreSQL
5. Configura las variables de entorno

---

## Variables de Entorno para Producción

| Variable | Descripción | Requerido |
|----------|-------------|-----------|
| `DATABASE_URL` | URL de conexión a SQLite (desarrollo) | Sí (dev) |
| `TURSO_DATABASE_URL` | URL de Turso | Sí (prod con Turso) |
| `TURSO_AUTH_TOKEN` | Token de autenticación Turso | Sí (prod con Turso) |

---

## Después del Despliegue

1. Ve a tu URL de producción
2. Registra tu negocio
3. Configura las notificaciones en el panel de administración
4. Comparte tu link único con los aspirantes

---

## Problemas Comunes

### Error: "Can't reach database server"
- Verifica que las credenciales de Turso sean correctas
- Asegúrate de que la base de datos esté activa

### Error: "Prisma Client not generated"
- Ejecuta `bun run db:push` antes de desplegar
- O agrega `prisma generate` al build command

---

¿Necesitas ayuda? Crea un issue en el repositorio.
