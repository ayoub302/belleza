// app/api/testimonios/[id]/route.ts
import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs/server";
import prisma from '@/lib/prisma';

// PUT - Aprobar o desaprobar un testimonio
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('🔍 [API] PUT /api/testimonios/[id] - Iniciando...');
  
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
    const { aprobado } = body;

    const actualizado = await prisma.testimonio.update({
      where: { id },
      data: { aprobado },
    });

    console.log(`✅ [API] Testimonio ${id} actualizado. Aprobado: ${aprobado}`);
    return NextResponse.json(actualizado);
  } catch (error) {
    console.error('❌ [API] Error al actualizar testimonio:', error);
    return NextResponse.json(
      { error: 'Error al actualizar el testimonio' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar un testimonio
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log('🔍 [API] DELETE /api/testimonios/[id] - Iniciando...');
  
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

    await prisma.testimonio.delete({
      where: { id },
    });

    console.log(`✅ [API] Testimonio ${id} eliminado`);
    return NextResponse.json({ message: 'Testimonio eliminado' });
  } catch (error) {
    console.error('❌ [API] Error al eliminar testimonio:', error);
    return NextResponse.json(
      { error: 'Error al eliminar el testimonio' },
      { status: 500 }
    );
  }
}