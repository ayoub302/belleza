// app/api/reservas/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST - Crear una nueva reserva (con validación de duplicados)
export async function POST(request: Request) {
  console.log('🔍 [API] POST /api/reservas - Iniciando...');
  
  try {
    const body = await request.json();
    console.log('📄 [API] Body recibido:', body);

    const { nombre, telefono, email, servicio, zona, fecha, hora, comentarios } = body;

    // Validación
    if (!nombre?.trim() || !telefono?.trim() || !servicio || !fecha || !hora) {
      console.warn('⚠️ [API] Faltan campos obligatorios');
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      );
    }

    // 🔍 VERIFICAR SI LA HORA YA ESTÁ OCUPADA
    console.log('🔍 [API] Verificando disponibilidad de hora...');
    const fechaObj = new Date(fecha);
    const fechaInicio = new Date(fechaObj);
    fechaInicio.setHours(0, 0, 0, 0);
    
    const fechaFin = new Date(fechaObj);
    fechaFin.setHours(23, 59, 59, 999);

    const reservaExistente = await prisma.reserva.findFirst({
      where: {
        fecha: {
          gte: fechaInicio,
          lte: fechaFin,
        },
        hora: hora,
        estado: {
          not: 'cancelada',
        },
      },
    });

    if (reservaExistente) {
      console.warn('⚠️ [API] La hora ya está ocupada:', fecha, hora);
      return NextResponse.json(
        { 
          error: 'Horario no disponible',
          message: 'Esta hora ya está reservada. Por favor, elige otro horario.'
        },
        { status: 409 }
      );
    }

    console.log('✅ [API] Hora disponible. Guardando en base de datos...');
    
    const nuevaReserva = await prisma.reserva.create({
      data: {
        nombre: nombre.trim(),
        telefono: telefono.trim(),
        email: email?.trim() || null,
        servicio,
        zona: zona?.trim() || null,
        fecha: new Date(fecha),
        hora,
        comentarios: comentarios?.trim() || null,
        estado: 'pendiente',
      },
    });

    console.log('✅ [API] Reserva guardada exitosamente. ID:', nuevaReserva.id);
    return NextResponse.json(nuevaReserva, { status: 201 });
  } catch (error) {
    console.error('❌ [API] Error al crear reserva:', error);
    return NextResponse.json(
      { error: 'Error al guardar la reserva' },
      { status: 500 }
    );
  }
}

// GET - Obtener reservas con filtro por estado
export async function GET(request: Request) {
  console.log('🔍 [API] GET /api/reservas - Iniciando...');
  
  try {
    const { searchParams } = new URL(request.url);
    const estado = searchParams.get('estado');

    const where = estado && estado !== 'todas' ? { estado } : {};

    const reservas = await prisma.reserva.findMany({
      where,
      orderBy: { fecha: 'desc' },
      take: 50,
    });

    console.log(`✅ [API] ${reservas.length} reservas encontradas`);
    return NextResponse.json(reservas);
  } catch (error) {
    console.error('❌ [API] Error al obtener reservas:', error);
    return NextResponse.json(
      { error: 'Error al cargar reservas' },
      { status: 500 }
    );
  }
}