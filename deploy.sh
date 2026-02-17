#!/bin/bash

# ============================================
# 🚀 ContrataFácil - Script de Despliegue
# ============================================

echo "🚀 ContrataFácil - Despliegue Automático"
echo "=========================================="
echo ""

# Opción 1: Vercel
echo "📦 Opción 1: Desplegar en Vercel (GRATIS)"
echo "   1. Ejecuta: vercel login"
echo "   2. Luego ejecuta: vercel --prod"
echo "   ¡Listo! Tendrás tu URL en segundos."
echo ""

# Opción 2: Railway
echo "📦 Opción 2: Desplegar en Railway"
echo "   1. Ejecuta: railway login"
echo "   2. Luego ejecuta: railway up"
echo ""

# Opción 3: Manual
echo "📦 Opción 3: Manual (Más fácil)"
echo "   1. Ve a https://vercel.com"
echo "   2. Haz clic en 'Add New Project'"
echo "   3. Importa desde GitHub o sube la carpeta"
echo "   4. ¡Listo!"
echo ""

read -p "¿Quieres desplegar en Vercel ahora? (s/n): " choice

if [[ $choice == "s" || $choice == "S" ]]; then
    echo ""
    echo "🔐 Iniciando sesión en Vercel..."
    vercel login
    echo ""
    echo "🚀 Desplegando..."
    vercel --prod
fi
