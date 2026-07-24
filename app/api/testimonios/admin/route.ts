// app/api/testimonios/admin/route.ts
import { NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs/server";
import prisma from '@/lib/prisma';

// GET - Obtener TODOS los testimonios (para el admin)
export async function GET() {
  console.log('🔍 [API ADMIN] Obteniendo todos los testimonios...');
  
  try {
    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as any)?.role as string;

    if (!userId || role !== "admin") {
      console.warn('⚠️ [API ADMIN] No autorizado');
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 403 }
      );
    }

    const testimonios = await prisma.testimonio.findMany({
      orderBy: { fecha: 'desc' },
    });

    console.log(`✅ [API ADMIN] ${testimonios.length} testimonios encontrados`);
    return NextResponse.json(testimonios);
  } catch (error) {
    console.error('❌ [API ADMIN] Error:', error);
    return NextResponse.json(
      { error: 'Error al cargar testimonios' },
      { status: 500 }
    );
  }
}