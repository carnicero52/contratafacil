import { db } from '@/lib/database';
import { verifyPassword, createAdminSession, verifyAdminSession, deleteAdminSession } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

// POST - Login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Buscar negocio por email
    const negocio = await db.negocio.findFirst({
      where: { email: email.toLowerCase() },
    });

    if (!negocio) {
      return NextResponse.json(
        { error: 'Credenciales incorrectas' },
        { status: 401 }
      );
    }

    // Verificar contraseña
    const isValid = await verifyPassword(password, negocio.password as string);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Credenciales incorrectas' },
        { status: 401 }
      );
    }

    // Crear sesión
    const token = await createAdminSession(negocio.id as string);

    const response = NextResponse.json({
      success: true,
      negocio: {
        id: negocio.id,
        nombre: negocio.nombre,
        slug: negocio.slug,
        email: negocio.email,
        telefono: negocio.telefono,
        direccion: negocio.direccion,
        descripcion: negocio.descripcion,
        logoUrl: negocio.logoUrl,
        puestoBuscado: negocio.puestoBuscado,
        activo: negocio.activo,
        buscandoPersonal: negocio.buscandoPersonal,
      },
    });

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}

// GET - Verificar sesión
export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const negocioId = await verifyAdminSession(token);

  if (!negocioId) {
    const response = NextResponse.json({ authenticated: false }, { status: 401 });
    response.cookies.delete('admin_token');
    return response;
  }

  const negocio = await db.negocio.findUnique({
    where: { id: negocioId },
  });

  if (!negocio) {
    const response = NextResponse.json({ authenticated: false }, { status: 401 });
    response.cookies.delete('admin_token');
    return response;
  }

  return NextResponse.json({
    authenticated: true,
    negocio: {
      id: negocio.id,
      nombre: negocio.nombre,
      slug: negocio.slug,
      email: negocio.email,
      telefono: negocio.telefono,
      direccion: negocio.direccion,
      descripcion: negocio.descripcion,
      logoUrl: negocio.logoUrl,
      puestoBuscado: negocio.puestoBuscado,
      activo: negocio.activo,
      buscandoPersonal: negocio.buscandoPersonal,
    }
  });
}

// DELETE - Logout
export async function DELETE(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;

  if (token) {
    await deleteAdminSession(token);
  }

  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin_token');
  return response;
}
