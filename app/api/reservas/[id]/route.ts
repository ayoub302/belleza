// app/api/reservas/[id]/route.ts
import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs/server";
import prisma from '@/lib/prisma';

// PUT - Actualizar estado de una reserva
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('🔍 [API] PUT /api/reservas/[id] - Iniciando...');
  console.log('🔍 [API] ID:', params.id);
  
  try {
    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as any)?.role as string;

    if (!userId || role !== "admin") {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 403 }
      );
    }

    const id = parseInt(params.id);
    const body = await request.json();
    const { estado } = body;

    if (!estado) {
      return NextResponse.json(
        { error: 'El estado es requerido' },
        { status: 400 }
      );
    }

    const estadosValidos = ['pendiente', 'confirmada', 'completada', 'cancelada'];
    if (!estadosValidos.includes(estado)) {
      return NextResponse.json(
        { error: 'Estado no válido' },
        { status: 400 }
      );
    }

    const actualizada = await prisma.reserva.update({
      where: { id },
      data: { estado },
    });
    
    console.log('✅ [API] Reserva actualizada:', actualizada);
    return NextResponse.json(actualizada);
  } catch (error) {
    console.error('❌ [API] Error al actualizar reserva:', error);
    return NextResponse.json(
      { error: 'Error al actualizar la reserva' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar una reserva
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('🔍 [API] DELETE /api/reservas/[id] - Iniciando...');
  console.log('🔍 [API] ID:', params.id);
  
  try {
    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as any)?.role as string;

    if (!userId || role !== "admin") {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 403 }
      );
    }

    const id = parseInt(params.id);

    await prisma.reserva.delete({
      where: { id },
    });

    console.log('✅ [API] Reserva eliminada. ID:', id);
    return NextResponse.json({ message: 'Reserva eliminada' });
  } catch (error) {
    console.error('❌ [API] Error al eliminar reserva:', error);
    return NextResponse.json(
      { error: 'Error al eliminar la reserva' },
      { status: 500 }
    );
  }
}