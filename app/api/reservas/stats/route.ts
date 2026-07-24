// app/api/reservas/stats/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  console.log('🔍 [STATS] Obteniendo estadísticas...');
  
  try {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const inicioSemana = new Date(hoy);
    inicioSemana.setDate(hoy.getDate() - hoy.getDay());

    const [reservasHoy, reservasSemana, testimoniosPendientes, totalClientes] = await Promise.all([
      prisma.reserva.count({ where: { fecha: { gte: hoy } } }),
      prisma.reserva.count({ where: { fecha: { gte: inicioSemana } } }),
      prisma.testimonio.count({ where: { aprobado: false } }),
      prisma.reserva.count(),
    ]);

    const reservasRecientes = await prisma.reserva.findMany({
      orderBy: { fecha: 'desc' },
      take: 5,
      select: {
        nombre: true,
        servicio: true,
        fecha: true,
        hora: true,
        estado: true,
      },
    });

    return NextResponse.json({
      reservasHoy,
      reservasSemana,
      testimoniosPendientes,
      totalClientes,
      reservasRecientes,
    });
  } catch (error) {
    console.error('❌ [STATS] Error al obtener estadísticas:', error);
    return NextResponse.json(
      { error: 'Error al cargar estadísticas' },
      { status: 500 }
    );
  }
}