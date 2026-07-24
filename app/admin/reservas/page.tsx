// app/admin/reservas/page.tsx
'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

interface Reserva {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
  servicio: string;
  zona: string;
  fecha: string;
  hora: string;
  comentarios: string;
  estado: 'pendiente' | 'confirmada' | 'completada' | 'cancelada';
}

export default function AdminReservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [filtro, setFiltro] = useState('todas');
  const [loading, setLoading] = useState(true);

  const cargarReservas = async () => {
    setLoading(true);
    try {
      const url = filtro === 'todas' ? '/api/reservas' : `/api/reservas?estado=${filtro}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setReservas(data);
      }
    } catch (error) {
      console.error('Error al cargar reservas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarReservas();
  }, [filtro]);

  const cambiarEstado = async (id: number, nuevoEstado: Reserva['estado']) => {
    try {
      const res = await fetch(`/api/reservas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado }),
      });
      if (res.ok) {
        cargarReservas();
      } else {
        alert('Error al actualizar el estado');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const eliminarReserva = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar esta reserva?')) return;
    try {
      const res = await fetch(`/api/reservas/${id}`, { method: 'DELETE' });
      if (res.ok) {
        cargarReservas();
      } else {
        alert('Error al eliminar la reserva');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const totalReservas = reservas.length;
  const pendientes = reservas.filter(r => r.estado === 'pendiente').length;
  const confirmadas = reservas.filter(r => r.estado === 'confirmada').length;
  const completadas = reservas.filter(r => r.estado === 'completada').length;
  const canceladas = reservas.filter(r => r.estado === 'cancelada').length;

  const getEstadoColor = (estado: string) => {
    const colores = {
      pendiente: '#f39c12',
      confirmada: '#2ecc71',
      completada: '#3498db',
      cancelada: '#e74c3c'
    };
    return colores[estado as keyof typeof colores] || '#999';
  };

  const getEstadoLabel = (estado: string) => {
    const labels = {
      pendiente: '⏳ Pendiente',
      confirmada: '✅ Confirmada',
      completada: '✓ Completada',
      cancelada: '✗ Cancelada'
    };
    return labels[estado as keyof typeof labels] || estado;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>📋 Gestión de Reservas</h1>
        <div className={styles.filtros}>
          <button
            className={`${styles.filtroBtn} ${filtro === 'todas' ? styles.active : ''}`}
            onClick={() => setFiltro('todas')}
          >
            Todas ({totalReservas})
          </button>
          <button
            className={`${styles.filtroBtn} ${filtro === 'pendiente' ? styles.active : ''}`}
            onClick={() => setFiltro('pendiente')}
          >
            Pendientes ({pendientes})
          </button>
          <button
            className={`${styles.filtroBtn} ${filtro === 'confirmada' ? styles.active : ''}`}
            onClick={() => setFiltro('confirmada')}
          >
            Confirmadas ({confirmadas})
          </button>
          <button
            className={`${styles.filtroBtn} ${filtro === 'completada' ? styles.active : ''}`}
            onClick={() => setFiltro('completada')}
          >
            Completadas ({completadas})
          </button>
          <button
            className={`${styles.filtroBtn} ${filtro === 'cancelada' ? styles.active : ''}`}
            onClick={() => setFiltro('cancelada')}
          >
            Canceladas ({canceladas})
          </button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Servicio</th>
              <th>Zona</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className={styles.loading}>Cargando...</td>
              </tr>
            ) : reservas.length === 0 ? (
              <tr>
                <td colSpan={7} className={styles.empty}>No hay reservas</td>
              </tr>
            ) : (
              reservas.map((reserva) => (
                <tr key={reserva.id}>
                  <td>
                    <strong>{reserva.nombre}</strong>
                    <br />
                    <small className={styles.contactInfo}>{reserva.telefono}</small>
                  </td>
                  <td>{reserva.servicio}</td>
                  <td>{reserva.zona || '—'}</td>
                  <td>{new Date(reserva.fecha).toLocaleDateString()}</td>
                  <td>{reserva.hora}</td>
                  <td>
                    <span className={styles.estadoBadge} style={{ background: getEstadoColor(reserva.estado) }}>
                      {getEstadoLabel(reserva.estado)}
                    </span>
                  </td>
                  <td>
                    <div className={styles.acciones}>
                      {reserva.estado === 'pendiente' && (
                        <>
                          <button
                            className={styles.btnConfirmar}
                            onClick={() => cambiarEstado(reserva.id, 'confirmada')}
                          >
                            ✅ Confirmar
                          </button>
                          <button
                            className={styles.btnCancelar}
                            onClick={() => cambiarEstado(reserva.id, 'cancelada')}
                          >
                            ❌ Cancelar
                          </button>
                        </>
                      )}
                      {reserva.estado === 'confirmada' && (
                        <>
                          <button
                            className={styles.btnCompletar}
                            onClick={() => cambiarEstado(reserva.id, 'completada')}
                          >
                            ✅ Completar
                          </button>
                          <button
                            className={styles.btnCancelar}
                            onClick={() => cambiarEstado(reserva.id, 'cancelada')}
                          >
                            ❌ Cancelar
                          </button>
                        </>
                      )}
                      {reserva.estado === 'completada' && (
                        <button
                          className={styles.btnCancelar}
                          onClick={() => cambiarEstado(reserva.id, 'cancelada')}
                        >
                          ❌ Cancelar
                        </button>
                      )}
                      {reserva.estado === 'cancelada' && (
                        <span className={styles.estadoEliminado}>🗑️ Eliminada</span>
                      )}
                      <button
                        className={styles.btnEliminar}
                        onClick={() => eliminarReserva(reserva.id)}
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}