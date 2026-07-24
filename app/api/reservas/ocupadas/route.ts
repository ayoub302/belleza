// app/api/reservas/ocupadas/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  console.log('🔍 [API] GET /api/reservas/ocupadas - Iniciando...');
  
  try {
    const { searchParams } = new URL(request.url);
    const fecha = searchParams.get('fecha');

    if (!fecha) {
      return NextResponse.json(
        { error: 'Fecha requerida' },
        { status: 400 }
      );
    }

    console.log('📅 [API] Fecha solicitada:', fecha);

    const fechaObj = new Date(fecha);
    const fechaInicio = new Date(fechaObj);
    fechaInicio.setHours(0, 0, 0, 0);
    
    const fechaFin = new Date(fechaObj);
    fechaFin.setHours(23, 59, 59, 999);

    const reservas = await prisma.reserva.findMany({
      where: {
        fecha: {
          gte: fechaInicio,
          lte: fechaFin,
        },
        estado: {
          not: 'cancelada',
        },
      },
      select: {
        hora: true,
      },
    });

    const horasOcupadas = reservas.map(r => r.hora);
    console.log(`📊 [API] Horas ocupadas para ${fecha}:`, horasOcupadas);

    return NextResponse.json(horasOcupadas);
  } catch (error) {
    console.error('❌ [API] Error al obtener horas ocupadas:', error);
    return NextResponse.json(
      { error: 'Error al cargar horas ocupadas' },
      { status: 500 }
    );
  }
}