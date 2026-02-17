# 🚀 ContrataFácil

Sistema de recepción de CVs y gestión de candidatos para pequeños negocios.

## ✨ Características

- 🔗 **Link único** para cada negocio
- 📱 **Código QR** para compartir
- 📋 **Formulario simple** para aspirantes
- 📊 **Panel de administración** completo
- 🔔 **Notificaciones** por Telegram, Email y WhatsApp
- 📤 **Exportar a CSV** compatible con Excel
- 🔗 **Integración con Google Sheets** (opcional)

---

## 🚀 Desplegar en 1 Clic

### Opción 1: Vercel (Recomendado - GRATIS)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/contratafacil)

1. Haz clic en el botón arriba
2. Crea una cuenta en Vercel (gratis)
3. ¡Listo! Tendrás tu URL en segundos

### Opción 2: Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new)

---

## 📱 Después del Despliegue

1. Ve a tu URL (ejemplo: `https://contratafacil.vercel.app`)
2. Registra tu negocio
3. Accede al panel en `/admin`
4. Configura las notificaciones
5. Comparte tu link o QR con los aspirantes

---

## 🔧 Variables de Entorno

Para producción, configura estas variables:

| Variable | Descripción |
|----------|-------------|
| `DATABASE_URL` | URL de la base de datos (SQLite para desarrollo) |
| `TURSO_DATABASE_URL` | URL de Turso (producción) |
| `TURSO_AUTH_TOKEN` | Token de Turso (producción) |

---

## 💻 Desarrollo Local

```bash
# Instalar dependencias
bun install

# Configurar base de datos
bun run db:push

# Iniciar servidor
bun run dev
```

---

## 📞 Soporte

¿Problemas? Crea un issue en GitHub.

---

Hecho con ❤️ para pequeños negocios
