// app/admin/layout.tsx
'use client';

import { useUser } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import styles from "./layout.module.css";

function AdminLayoutContent({ children, role }: { children: React.ReactNode; role: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, []);

  return (
    <div className={styles.adminLayout}>
      <header className={styles.adminHeader}>
        <div className={styles.headerContent}>
          <Link href="/admin" className={styles.logo}>
            <span>🪷</span>
            <span>Panel Admin</span>
          </Link>

          <nav className={styles.headerNav}>
            <Link href="/admin">📊 Dashboard</Link>
            <Link href="/admin/reservas">📋 Reservas</Link>
            <Link href="/admin/testimonios">💬 Testimonios</Link>
          </nav>

          <div className={styles.userSection}>
            <span className={styles.roleBadge}>👑 {role}</span>
            <UserButton afterSignOutUrl="/" />
          </div>

          {/* HAMBURGUESA */}
          <button 
            className={`${styles.hamburger} ${menuOpen ? styles.active : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Overlay */}
        <div 
          className={`${styles.mobileOverlay} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Menú móvil */}
        <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
          <Link href="/admin" onClick={() => setMenuOpen(false)}>📊 Dashboard</Link>
          <Link href="/admin/reservas" onClick={() => setMenuOpen(false)}>📋 Reservas</Link>
          <Link href="/admin/testimonios" onClick={() => setMenuOpen(false)}>💬 Testimonios</Link>
          <Link href="/" onClick={() => setMenuOpen(false)}>🏠 Volver a la tienda</Link>
        </div>
      </header>
      <main className={styles.adminMain}>{children}</main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded: isAuthLoaded, userId } = useAuth();
  const { isLoaded: isUserLoaded, user } = useUser();

  if (!isAuthLoaded || !isUserLoaded) {
    return <div className={styles.loading}>Cargando...</div>;
  }

  if (!userId) {
    redirect("/sign-in");
  }

  // Obtener el rol de los metadatos públicos del usuario
  const role = (user?.publicMetadata as any)?.role as string || '';

  if (role !== "admin") {
    return (
      <div className={styles.accesoDenegado}>
        <h1>⛔ Acceso denegado</h1>
        <p>No tienes permisos de administrador.</p>
        <Link href="/">Volver a la tienda</Link>
      </div>
    );
  }

  return <AdminLayoutContent role={role}>{children}</AdminLayoutContent>;
}