# 🤖 PLAN - Chatbot Inteligente para Negocios
**Fecha:** 18 de Febrero, 2025

## 📋 Descripción
Plataforma SaaS de chatbots inteligentes para pequeños negocios, consultorios, abogados, etc.

## 🎯 Objetivos
- Responder preguntas frecuentes automáticamente
- Agendar citas
- Tomar pedidos
- Derivar a humano cuando sea necesario

## 📊 Estimaciones
- **Volumen:** 50-60 mensajes diarios máximo
- **Negocios:** ~10 en primera etapa (2-3 meses)
- **Canales:** WhatsApp, Web, Telegram

## 🏗️ Arquitectura Propuesta

```
┌─────────────────────────────────────────────────┐
│  Plataforma Chatbot SaaS                        │
├─────────────────────────────────────────────────┤
│                                                 │
│  🏪 Negocio 1    🏢 Negocio 2    ⚖️ Negocio 3  │
│  (Consultorio)   (Abogado)       (Tienda)       │
│       ↓              ↓               ↓          │
│  ┌─────────────────────────────────────────┐   │
│  │         Vercel + Next.js (APIs)         │   │
│  └─────────────────────────────────────────┘   │
│       ↓              ↓               ↓          │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    │
│  │  Turso  │    │   LLM   │    │WhatsApp │    │
│  │ (datos) │    │  (IA)   │    │  (API)  │    │
│  └─────────┘    └─────────┘    └─────────┘    │
└─────────────────────────────────────────────────┘
```

## 💰 Costos Estimados Mensuales

| Servicio | Costo |
|----------|-------|
| Vercel | $0 (free) |
| Turso | $0 (free) |
| LLM (OpenAI/similar) | ~$15-25 USD |
| WhatsApp Business API | $0 (proveedor externo) |
| **Total** | **~$20-25 USD/mes** |

## 📱 Funcionalidades por Negocio

### Panel de Administración
- [ ] Configurar información del negocio
- [ ] Subir base de conocimientos (FAQs, horarios, servicios)
- [ ] Configurar horarios de atención
- [ ] Ver historial de conversaciones
- [ ] Ver citas agendadas
- [ ] Ver pedidos recibidos

### Chatbot
- [ ] Respuestas automáticas basadas en conocimientos
- [ ] Agendar citas (verificar disponibilidad)
- [ ] Tomar pedidos simples
- [ ] Derivar a humano cuando no sepa responder
- [ ] Recordatorios automáticos

### Canales
- [ ] Widget web (embebible)
- [ ] WhatsApp Business API
- [ ] Telegram (opcional)

## 🗄️ Estructura de Datos (Inicial)

### Negocio
- id, nombre, descripcion
- horarios, zona horaria
- whatsapp, email, telefono
- configuración del bot

### BaseConocimiento
- id, negocioId
- pregunta, respuesta
- categoria (faq, servicio, horario, etc.)

### Conversacion
- id, negocioId, clienteId
- canal (web, whatsapp, telegram)
- estado (activa, cerrada, derivada)
- mensajes (JSON)

### Cita
- id, negocioId, clienteId
- fecha, hora
- estado (pendiente, confirmada, cancelada)
- notas

### Pedido
- id, negocioId, clienteId
- items (JSON)
- total, estado
- direccion entrega

## 🔧 Stack Tecnológico
- **Frontend:** Next.js 16, React, TypeScript
- **Estilos:** Tailwind CSS, shadcn/ui
- **Base de datos:** Turso (libSQL)
- **IA:** OpenAI API o similar (z-ai-web-dev-sdk)
- **Deploy:** Vercel
- **WhatsApp:** API externa (Twilio, MessageBird, o similar)

## 📝 Siguientes Pasos
1. [ ] Definir nombre del proyecto
2. [ ] Crear repositorio nuevo
3. [ ] Diseñar UI del panel de administración
4. [ ] Implementar CRUD de base de conocimientos
5. [ ] Integrar LLM para respuestas
6. [ ] Implementar widget de chat web
7. [ ] Integrar WhatsApp

## ❓ Preguntas Pendientes
- ¿Nombre del proyecto?
- ¿Qué LLM usar? (OpenAI, Claude, otro)
- ¿Qué proveedor de WhatsApp? (Twilio, MessageBird, WhatsApp Business directo)
- ¿Se necesita multi-idioma?
