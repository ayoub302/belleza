// app/api/testimonios/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET - Obtener testimonios APROBADOS (para la página principal)
export async function GET() {
  console.log('🔍 [API] GET /api/testimonios - Iniciando...');
  
  try {
    const testimonios = await prisma.testimonio.findMany({
      where: { aprobado: true },
      orderBy: { fecha: 'desc' },
      take: 20,
    });
    console.log(`✅ [API] ${testimonios.length} testimonios aprobados encontrados`);
    return NextResponse.json(testimonios);
  } catch (error) {
    console.error('❌ [API] Error al obtener testimonios:', error);
    return NextResponse.json(
      { error: 'Error al cargar testimonios' },
      { status: 500 }
    );
  }
}

// POST - Crear un nuevo testimonio (pendiente de aprobación)
export async function POST(request: Request) {
  console.log('🔍 [API] POST /api/testimonios - Iniciando...');
  
  try {
    const body = await request.json();
    console.log('📄 [API] Body recibido:', body);
    
    const { nombre, comentario, estrellas } = body;

    if (!nombre?.trim() || !comentario?.trim() || !estrellas) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios' },
        { status: 400 }
      );
    }

    if (comentario.length > 250) {
      return NextResponse.json(
        { error: 'El comentario no puede exceder 250 caracteres' },
        { status: 400 }
      );
    }

    const nuevo = await prisma.testimonio.create({
      data: {
        nombre: nombre.trim(),
        comentario: comentario.trim(),
        estrellas,
        aprobado: false, // ← PENDIENTE DE APROBACIÓN
      },
    });

    console.log('✅ [API] Testimonio guardado (pendiente de aprobación). ID:', nuevo.id);
    return NextResponse.json(nuevo, { status: 201 });
  } catch (error) {
    console.error('❌ [API] Error al guardar testimonio:', error);
    return NextResponse.json(
      { error: 'Error al guardar el testimonio' },
      { status: 500 }
    );
  }
}