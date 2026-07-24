// app/admin/layout.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import styles from "./layout.module.css";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, sessionClaims } = await auth();

  // Si no está autenticado, redirigir al login
  if (!userId) {
    redirect("/sign-in");
  }

  // Obtener el rol de los metadatos públicos
  const role = (sessionClaims?.metadata as { role?: string } | undefined)?.role;

  // Verificar si tiene el rol de administrador
  if (role !== "admin") {
    return (
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center", 
        minHeight: "100vh",
        background: "#f6eedd",
        padding: "20px",
        textAlign: "center"
      }}>
        <h1 style={{ fontSize: "2rem", color: "#1a120f" }}>⛔ Acceso denegado</h1>
        <p style={{ color: "#3d2e28", marginBottom: "20px" }}>
          No tienes permisos de administrador para acceder a esta página.
        </p>
        <a href="/" style={{ 
          color: "#a81657", 
          textDecoration: "underline",
          fontWeight: "500"
        }}>
          Volver a la tienda
        </a>
      </div>
    );
  }

  return (
    <div className={styles.adminLayout}>
      <header className={styles.adminHeader}>
        <div className={styles.headerContent}>
          <Link href="/admin" className={styles.logo}>
            <span>🪷</span>
            <span>Panel Admin</span>
          </Link>
          <div className={styles.headerNav}>
            <Link href="/admin/reservas">📋 Reservas</Link>
            <Link href="/admin/testimonios">💬 Testimonios</Link>
          </div>
          <div className={styles.userSection}>
            <span className={styles.roleBadge}>👑 {role}</span>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>
      <main className={styles.adminMain}>{children}</main>
    </div>
  );
}