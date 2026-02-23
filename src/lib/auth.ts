import { db } from '@/lib/database';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

// Hash password con bcrypt
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

// Verificar password - soporta bcrypt y SHA256 (para compatibilidad)
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // Si el hash parece bcrypt (empieza con $2a$ o $2b$)
  if (hash.startsWith('$2a$') || hash.startsWith('$2b$')) {
    return bcrypt.compare(password, hash);
  }
  
  // Fallback a SHA256 para hashes antiguos
  const sha256Hash = crypto.createHash('sha256').update(password).digest('hex');
  return sha256Hash === hash;
}

// Generar token de sesión
export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Crear sesión
export async function createAdminSession(negocioId: string): Promise<string> {
  const token = generateToken();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 días

  await db.sesion.create({
    data: {
      negocioId,
      token,
      expiresAt: expiresAt.toISOString(),
    },
  });

  return token;
}

// Verificar sesión
export async function verifyAdminSession(token: string): Promise<string | null> {
  const session = await db.sesion.findUnique({
    where: { token },
  });

  if (!session) return null;
  if (new Date(session.expiresAt as string) < new Date()) {
    await db.sesion.delete({ where: { token } });
    return null;
  }

  return session.negocioId as string;
}

// Eliminar sesión
export async function deleteAdminSession(token: string): Promise<void> {
  try {
    await db.sesion.delete({ where: { token } });
  } catch {
    // Ignorar si no existe
  }
}
