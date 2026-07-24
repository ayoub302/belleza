// app/admin/testimonios/page.tsx
'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

interface Testimonio {
  id: number;
  nombre: string;
  comentario: string;
  estrellas: number;
  fecha: string;
  aprobado: boolean;
}

export default function AdminTestimonios() {
  const [testimonios, setTestimonios] = useState<Testimonio[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarTestimonios = async () => {
    console.log('🔍 [ADMIN] Cargando testimonios...');
    setLoading(true);
    try {
      const res = await fetch('/api/testimonios/admin');
      console.log('🔍 [ADMIN] Status:', res.status);
      if (res.ok) {
        const data = await res.json();
        console.log('✅ [ADMIN] Testimonios cargados:', data.length);
        setTestimonios(data);
      } else {
        console.error('❌ [ADMIN] Error:', await res.text());
      }
    } catch (error) {
      console.error('❌ [ADMIN] Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarTestimonios();
  }, []);

  const toggleAprobado = async (id: number, aprobado: boolean) => {
    console.log(`🔍 [ADMIN] Toggle aprobado: ${id} -> ${aprobado}`);
    try {
      const res = await fetch(`/api/testimonios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aprobado }),
      });
      if (res.ok) {
        console.log('✅ [ADMIN] Actualizado');
        cargarTestimonios();
      }
    } catch (error) {
      console.error('❌ [ADMIN] Error:', error);
    }
  };

  const eliminarTestimonio = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este testimonio?')) return;
    console.log(`🔍 [ADMIN] Eliminando testimonio ${id}`);
    try {
      const res = await fetch(`/api/testimonios/${id}`, { method: 'DELETE' });
      if (res.ok) {
        console.log('✅ [ADMIN] Eliminado');
        cargarTestimonios();
      }
    } catch (error) {
      console.error('❌ [ADMIN] Error:', error);
    }
  };

  const pendientes = testimonios.filter(t => !t.aprobado);
  const aprobados = testimonios.filter(t => t.aprobado);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>💬 Gestión de Testimonios</h1>
        <span className={styles.badge}>{pendientes.length} pendientes</span>
      </div>

      {loading && <p>Cargando...</p>}

      {pendientes.length > 0 && (
        <div className={styles.section}>
          <h2>⏳ Pendientes de aprobar</h2>
          {pendientes.map(t => (
            <div key={t.id} className={styles.testimonioCard}>
              <div className={styles.testimonioHeader}>
                <div>
                  <strong>{t.nombre}</strong>
                  <span className={styles.estrellas}>
                    {'★'.repeat(t.estrellas)}{'☆'.repeat(5 - t.estrellas)}
                  </span>
                </div>
                <span className={styles.fecha}>
                  {new Date(t.fecha).toLocaleDateString()}
                </span>
              </div>
              <p className={styles.comentario}>{t.comentario}</p>
              <div className={styles.acciones}>
                <button 
                  className={styles.btnAprobar} 
                  onClick={() => toggleAprobado(t.id, true)}
                >
                  ✅ Aprobar
                </button>
                <button 
                  className={styles.btnEliminar} 
                  onClick={() => eliminarTestimonio(t.id)}
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.section}>
        <h2>✅ Aprobados ({aprobados.length})</h2>
        {aprobados.length === 0 ? (
          <p className={styles.empty}>No hay testimonios aprobados</p>
        ) : (
          aprobados.map(t => (
            <div key={t.id} className={styles.testimonioCard}>
              <div className={styles.testimonioHeader}>
                <div>
                  <strong>{t.nombre}</strong>
                  <span className={styles.estrellas}>
                    {'★'.repeat(t.estrellas)}{'☆'.repeat(5 - t.estrellas)}
                  </span>
                </div>
                <span className={styles.fecha}>
                  {new Date(t.fecha).toLocaleDateString()}
                </span>
              </div>
              <p className={styles.comentario}>{t.comentario}</p>
              <div className={styles.acciones}>
                <button 
                  className={styles.btnDesaprobar} 
                  onClick={() => toggleAprobado(t.id, false)}
                >
                  ⏸️ Desaprobar
                </button>
                <button 
                  className={styles.btnEliminar} 
                  onClick={() => eliminarTestimonio(t.id)}
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}