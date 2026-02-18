# 📦 RESPALDO - ContrataFácil
**Fecha:** 18 de Febrero, 2025

## 🌐 Producción
- **URL:** https://my-project-five-beta-61.vercel.app
- **Repositorio:** https://github.com/carnicero52/fideliqr-v2

## 🗄️ Base de Datos (Turso)
- **URL:** libsql://fideliqr-carnicero52.aws-us-east-1.turso.io
- **Token:** Guardar en lugar seguro (expira periódicamente)

## 📋 Funcionalidades Implementadas

### 1. Sistema de Autenticación
- Registro de organizaciones
- Login/Logout
- Sesiones persistentes

### 2. Gestión de Candidatos
- Formulario público de aplicación (/aplicar/[slug])
- Lista de candidatos con filtros y búsqueda
- Estados: nuevo, revisado, contactado, contratado, rechazado
- Notas por candidato
- **Eliminar candidato individual**
- **Limpiar toda la lista**
- **Exportar a CSV**

### 3. Panel de Administración
- Dashboard con estadísticas
- **Autorefresh cada 10 segundos**
- Pestañas: Candidatos, Compartir, Notificaciones, Integraciones, Configuración

### 4. Notificaciones
- **Telegram** (Bot Token + Chat ID)
- **Email/SMTP** (Gmail compatible)
- **WhatsApp** (API externa)
- Botón de prueba por cada canal

### 5. Integraciones
- **Google Sheets** (sincronización)

### 6. Compartir
- Link único por organización
- Código QR descargable

### 7. Diseño
- **Logo QR morado** (estilizado)
- Tema emerald/teal
- Responsive (móvil y desktop)
- Textos con "ORGANIZACIÓN"

## 🔐 Credenciales de Prueba
- **Email:** test2@test.com
- **Password:** 123456

## 📁 Estructura Principal
```
src/
├── app/
│   ├── page.tsx              # Landing + Registro
│   ├── admin/page.tsx        # Panel administración
│   ├── aplicar/[slug]/       # Formulario público
│   └── api/
│       ├── admin/
│       │   ├── auth/         # Login/Logout
│       │   └── configuracion/ # Guardar settings
│       ├── candidatos/       # CRUD candidatos
│       └── negocio/          # Registro organizaciones
├── lib/
│   ├── db-libsql.ts          # Cliente Turso
│   └── notificaciones.ts     # Envío notificaciones
└── components/ui/            # shadcn/ui components
```

## 🛠️ Stack Tecnológico
- **Frontend:** Next.js 16, React, TypeScript
- **Estilos:** Tailwind CSS, shadcn/ui
- **Base de datos:** Turso (libSQL)
- **Deploy:** Vercel
- **Icons:** Lucide React

## ⚠️ Notas Importantes
1. El token de Turso expira - regenerar desde turso.io
2. Variables de entorno en Vercel: TURSO_DATABASE_URL, TURSO_AUTH_TOKEN
3. La tabla Negocio tiene ~35 columnas para configuración
4. Los valores booleanos en BD son 0/1, se convierten en frontend
