import { NextResponse } from 'next/server'
import { createClient } from '@libsql/client'

export async function GET() {
  const tursoUrl = process.env.TURSO_DATABASE_URL
  const databaseUrl = process.env.DATABASE_URL
  const tursoToken = process.env.TURSO_AUTH_TOKEN
  
  const diagnostics: Record<string, unknown> = {
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    variables: {
      TURSO_DATABASE_URL: tursoUrl ? `${tursoUrl.substring(0, 50)}...` : 'NO DEFINIDO',
      DATABASE_URL: databaseUrl ? databaseUrl.substring(0, 50) : 'NO DEFINIDO',
      TURSO_AUTH_TOKEN: tursoToken ? `✅ ${tursoToken.length} chars` : 'NO DEFINIDO',
    },
  }
  
  // Para conectar a Turso necesitamos TURSO_DATABASE_URL y TURSO_AUTH_TOKEN
  const hasAllVars = !!(tursoUrl && tursoToken && tursoUrl.startsWith('libsql://'))
  
  diagnostics.hasAllVars = hasAllVars
  
  // Intentar conectar a Turso
  if (hasAllVars) {
    try {
      const client = createClient({
        url: tursoUrl as string,
        authToken: tursoToken as string,
      })
      
      // Verificar tablas
      const tables = await client.execute('SELECT name FROM sqlite_master WHERE type="table"')
      diagnostics.tables = tables.rows.map(r => r.name)
      
      diagnostics.connectionTest = '✅ EXITOSO - Turso funcionando correctamente'
      
    } catch (error: unknown) {
      diagnostics.connectionTest = '❌ ERROR'
      diagnostics.error = error instanceof Error ? error.message : String(error)
    }
  } else {
    diagnostics.connectionTest = '❌ Variables incompletas'
    diagnostics.required = ['TURSO_DATABASE_URL (debe empezar con libsql://)', 'TURSO_AUTH_TOKEN']
    diagnostics.missing = []
    if (!tursoUrl) (diagnostics.missing as string[]).push('TURSO_DATABASE_URL')
    if (!tursoToken) (diagnostics.missing as string[]).push('TURSO_AUTH_TOKEN')
    if (tursoUrl && !tursoUrl.startsWith('libsql://')) (diagnostics.missing as string[]).push('TURSO_DATABASE_URL debe empezar con libsql://')
  }
  
  return NextResponse.json(diagnostics, { status: 200 })
}
