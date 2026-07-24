// app/admin/page.tsx
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import styles from "./page.module.css";

async function getStats() {
  console.log('🔍 [DASHBOARD] Obteniendo estadísticas...');
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/reservas/stats`, {
      cache: 'no-store',
    });
    
    console.log('📥 [DASHBOARD] Status:', res.status);
    
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    
    const data = await res.json();
    console.log('✅ [DASHBOARD] Estadísticas:', data);
    return data;
  } catch (error) {
    console.error('❌ [DASHBOARD] Error:', error);
    return {
      reservasHoy: 0,
      reservasSemana: 0,
      testimoniosPendientes: 0,
      totalClientes: 0,
      reservasRecientes: [],
    };
  }
}

export default async function AdminDashboard() {
  console.log('🔍 [DASHBOARD] Renderizando...');
  
  const { userId, sessionClaims } = await auth();
  const user = await currentUser();

  if (!userId) redirect("/sign-in");

  const role = (sessionClaims?.metadata as any)?.role as string;
  console.log('🔍 [DASHBOARD] Rol:', role);

  if (role !== "admin") redirect("/");

  const stats = await getStats();

  return (
    <div className={styles.dashboard}>
      <div className={styles.headerSection}>
        <h1>📊 Dashboard</h1>
        <p>Bienvenido, {user?.firstName || "Administrador"} 👋</p>
        <p className={styles.subtitle}>Estadísticas en tiempo real.</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{stats.reservasHoy}</span>
          <span className={styles.statLabel}>Reservas hoy</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{stats.reservasSemana}</span>
          <span className={styles.statLabel}>Reservas esta semana</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{stats.testimoniosPendientes}</span>
          <span className={styles.statLabel}>Testimonios pendientes</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statNumber}>{stats.totalClientes}</span>
          <span className={styles.statLabel}>Clientes totales</span>
        </div>
      </div>

      <div className={styles.recentSection}>
        <h2>📋 Reservas recientes</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Servicio</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {stats.reservasRecientes.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.empty}>No hay reservas recientes</td>
                </tr>
              ) : (
                stats.reservasRecientes.map((reserva: any, index: number) => (
                  <tr key={index}>
                    <td>{reserva.nombre}</td>
                    <td>{reserva.servicio}</td>
                    <td>{new Date(reserva.fecha).toLocaleDateString()}</td>
                    <td>{reserva.hora}</td>
                    <td>
                      <span className={`${styles.estadoBadge} ${styles[reserva.estado]}`}>
                        {reserva.estado === "pendiente" && "⏳ Pendiente"}
                        {reserva.estado === "confirmada" && "✅ Confirmada"}
                        {reserva.estado === "completada" && "✓ Completada"}
                        {reserva.estado === "cancelada" && "✗ Cancelada"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}