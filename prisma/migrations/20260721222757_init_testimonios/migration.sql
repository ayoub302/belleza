-- CreateTable
CREATE TABLE "testimonios" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "comentario" TEXT NOT NULL,
    "estrellas" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aprobado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "testimonios_pkey" PRIMARY KEY ("id")
);
