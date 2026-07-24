// app/reserva/page.tsx
'use client';

import type { SVGProps } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

/* ---------- Iconos ---------- */
type IconProps = SVGProps<SVGSVGElement>;

function CalendarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function UserIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function PhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ClockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function MessageIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

// Iconos para el footer
function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  );
}

/* ---------- TODOS LOS SERVICIOS DEL CATÁLOGO ---------- */
const serviciosDisponibles = [
  { id: 'threading', nombre: 'Depilación con hilo', icon: '🧵' },
  { id: 'cera', nombre: 'Depilación con cera', icon: '🕯️' },
  { id: 'manicura', nombre: 'Manicura', icon: '💅' },
  { id: 'manicura_permanente', nombre: 'Manicura permanente', icon: '💅' },
  { id: 'pedicura', nombre: 'Pedicura', icon: '🦶' },
  { id: 'pedicura_permanente', nombre: 'Pedicura permanente', icon: '🦶' },
  { id: 'henna', nombre: 'Henna', icon: '🌿' },
  { id: 'lifting_pestanas', nombre: 'Lifting de pestañas + tinte', icon: '👁️' },
  { id: 'laminado_cejas', nombre: 'Laminado de cejas', icon: '👁️' },
  { id: 'extensiones_pestanas', nombre: 'Extensiones de pestañas', icon: '👁️' },
  { id: 'tinte_pestanas', nombre: 'Tinte de pestañas', icon: '👁️' },
  { id: 'tinte_cejas', nombre: 'Tinte de cejas con heena', icon: '👁️' },
  { id: 'conoterapia', nombre: 'Cono oídos (Conoterapia)', icon: '👂' },
  { id: 'masaje_facial', nombre: 'Masaje facial completo', icon: '💆' },
  { id: 'limpieza_cutis', nombre: 'Limpieza de cutis completa', icon: '🧖' },
  { id: 'limpieza_masaje_cabeza', nombre: 'Limpieza de cutis + masaje de cabeza', icon: '🧖' },
  { id: 'masaje_oro', nombre: 'Masaje de oro', icon: '✨' },
  { id: 'masaje_diamante', nombre: 'Masaje de diamante', icon: '💎' },
  { id: 'mascarilla_ayurveda', nombre: 'Mascarilla ayurveda', icon: '🌿' },
  { id: 'masaje_frutas', nombre: 'Masaje de frutas', icon: '🍓' },
  { id: 'masaje_cabeza', nombre: 'Masaje de cabeza', icon: '💆' },
];

/* ---------- ZONAS DE DEPILACIÓN ---------- */
const zonasDepilacion = [
  'Diseño de cejas', 'Labios', 'Patilla', 'Frente', 'Barbilla', 'Mejillas',
  'Todo el rostro', 'Cara y cuello', 'Axila con hilo', 'Manos', 'Cuello',
  'Espalda', 'Medio brazo', 'Media pierna', 'Brazo entero',
  'Pierna entera', 'Inglés', 'Inglés entera', 'Dedos'
];

/* ---------- GENERAR HORAS DISPONIBLES ---------- */
function generarHorasDisponibles(fecha: string | null): string[] {
  if (!fecha) return [];

  const diaSemana = new Date(fecha).getDay();
  if (diaSemana === 0) return [];
  if (diaSemana === 6) {
    return generarSlots('09:00', '20:00');
  }
  return generarSlots('10:00', '20:00');
}

function generarSlots(inicio: string, fin: string): string[] {
  const slots: string[] = [];
  let horaActual = new Date(`2000-01-01T${inicio}`);
  const horaFin = new Date(`2000-01-01T${fin}`);

  while (horaActual < horaFin) {
    const horas = String(horaActual.getHours()).padStart(2, '0');
    const minutos = String(horaActual.getMinutes()).padStart(2, '0');
    slots.push(`${horas}:${minutos}`);
    horaActual.setMinutes(horaActual.getMinutes() + 30);
  }
  return slots;
}

/* ---------- VALIDAR Y FORMATEAR TELÉFONO ---------- */
function formatearTelefono(value: string): string {
  const soloNumeros = value.replace(/\D/g, '');
  const numeros = soloNumeros.slice(0, 9);
  
  if (numeros.length === 0) return '';
  if (numeros.length <= 3) {
    return numeros;
  } else if (numeros.length <= 5) {
    return numeros.slice(0, 3) + ' ' + numeros.slice(3);
  } else if (numeros.length <= 7) {
    return numeros.slice(0, 3) + ' ' + numeros.slice(3, 5) + ' ' + numeros.slice(5);
  } else {
    return numeros.slice(0, 3) + ' ' + numeros.slice(3, 5) + ' ' + numeros.slice(5, 7) + ' ' + numeros.slice(7, 9);
  }
}

function validarTelefono(telefono: string): boolean {
  const soloNumeros = telefono.replace(/\s/g, '');
  return soloNumeros.length === 9 && /^\d{9}$/.test(soloNumeros);
}

export default function Reserva() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    servicio: '',
    zona: '',
    fecha: '',
    hora: '',
    comentarios: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [horasDisponibles, setHorasDisponibles] = useState<string[]>([]);
  const [horasOcupadas, setHorasOcupadas] = useState<string[]>([]);
  const [esDomingo, setEsDomingo] = useState(false);
  const [telefonoError, setTelefonoError] = useState('');
  const [loadingHoras, setLoadingHoras] = useState(false);

  // Actualizar horas disponibles cuando cambia la fecha
  useEffect(() => {
    const horas = generarHorasDisponibles(formData.fecha);
    setHorasDisponibles(horas);
    
    if (formData.fecha) {
      const dia = new Date(formData.fecha).getDay();
      setEsDomingo(dia === 0);
    } else {
      setEsDomingo(false);
    }

    if (formData.hora && !horas.includes(formData.hora)) {
      setFormData(prev => ({ ...prev, hora: '' }));
    }
  }, [formData.fecha]);

  // Cargar horas ocupadas cuando cambia la fecha
  useEffect(() => {
    if (!formData.fecha) {
      setHorasOcupadas([]);
      return;
    }

    const cargarHorasOcupadas = async () => {
      setLoadingHoras(true);
      try {
        const res = await fetch(`/api/reservas/ocupadas?fecha=${formData.fecha}`);
        if (res.ok) {
          const data = await res.json();
          setHorasOcupadas(data);
        }
      } catch (error) {
        console.error('Error al cargar horas ocupadas:', error);
      } finally {
        setLoadingHoras(false);
      }
    };

    cargarHorasOcupadas();
  }, [formData.fecha]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'telefono') {
      const formateado = formatearTelefono(value);
      setFormData(prev => ({ ...prev, [name]: formateado }));
      
      const soloNumeros = formateado.replace(/\s/g, '');
      if (soloNumeros.length === 9) {
        setTelefonoError('');
      } else if (soloNumeros.length > 0) {
        setTelefonoError(`Faltan ${9 - soloNumeros.length} dígito(s) - Ej: 612 345 678`);
      } else {
        setTelefonoError('');
      }
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const soloNumeros = formData.telefono.replace(/\s/g, '');
    if (soloNumeros.length !== 9) {
      setTelefonoError('El teléfono debe tener 9 dígitos - Ej: 612 345 678');
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }
    
    if (!formData.nombre || !formData.telefono || !formData.servicio || !formData.fecha || !formData.hora) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }

    try {
      const datosEnvio = {
        ...formData,
        telefono: formData.telefono.replace(/\s/g, '')
      };
      
      const res = await fetch('/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosEnvio),
      });

      const responseData = await res.json();

      if (res.ok) {
        setSubmitStatus('success');
        setFormData({
          nombre: '',
          telefono: '',
          email: '',
          servicio: '',
          zona: '',
          fecha: '',
          hora: '',
          comentarios: ''
        });
        setTelefonoError('');
        setHorasOcupadas([]);
      } else if (res.status === 409) {
        setSubmitStatus('error');
        setTelefonoError('');
        const refreshRes = await fetch(`/api/reservas/ocupadas?fecha=${formData.fecha}`);
        if (refreshRes.ok) {
          const data = await refreshRes.json();
          setHorasOcupadas(data);
        }
        setTimeout(() => {
          alert('❌ Lo sentimos, esta hora ya está reservada. Por favor, elige otro horario.');
        }, 500);
      } else {
        setSubmitStatus('error');
      }
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const getNombreDia = (fecha: string | null): string => {
    if (!fecha) return '';
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return dias[new Date(fecha).getDay()];
  };

  const horasDisponiblesFiltradas = horasDisponibles.filter(
    hora => !horasOcupadas.includes(hora)
  );

  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.logoLink}>
          <Image 
            src="/logo2.ico" 
            alt="Belleza India" 
            width={500} 
            height={500} 
            unoptimized={true}
            className={styles.logoImg}
            priority
            style={{ objectFit: 'contain', maxWidth: '220px', maxHeight: '100px', width: 'auto', height: 'auto' }} 
          />
        </Link>
        <nav className={styles.nav}>
          <div className={styles.navLinks}>
            <Link href="/#nosotros">Quién soy</Link>
            <Link href="/#servicios">Servicios</Link>
            <Link href="/#proceso">Cómo funciona</Link>
            <Link href="/#testimonios">Opiniones</Link>
            <Link href="/#contacto">Contacto</Link>
          </div>
          <Link href="/reserva" className={styles.navCta}>Reservar cita</Link>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroBadge}>📅 Reserva</span>
          <h1 className={styles.heroTitle}>
            Reserva tu <em>cita</em>
          </h1>
          <p className={styles.heroSubtitle}>
            Elige el servicio que deseas y te esperamos en Belleza India para cuidar de ti.
          </p>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h2>Información de la cita</h2>
            <p>Completa todos los campos para reservar tu tratamiento.</p>
          </div>

          {submitStatus === 'success' && (
            <div className={styles.successMessage}>
              ✅ ¡Reserva enviada con éxito! Te llamaremos para confirmar la cita.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className={styles.errorMessage}>
              ⚠️ Por favor, revisa los campos obligatorios.
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="nombre">Nombre completo *</label>
              <div className={styles.inputWithIcon}>
                <UserIcon className={styles.inputIcon} />
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ej: María García"
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="telefono">Teléfono *</label>
                <div className={styles.inputWithIcon}>
                  <PhoneIcon className={styles.inputIcon} />
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="612 345 678"
                    required
                  />
                </div>
                {telefonoError && (
                  <span className={styles.telefonoError}>{telefonoError}</span>
                )}
                <span className={styles.fieldHint}>Formato: 612 345 678 (9 dígitos)</span>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Correo electrónico</label>
                <div className={styles.inputWithIcon}>
                  <MailIcon className={styles.inputIcon} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="servicio">Servicio *</label>
              <select
                id="servicio"
                name="servicio"
                value={formData.servicio}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un servicio</option>
                {serviciosDisponibles.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.icon} {s.nombre}
                  </option>
                ))}
              </select>
            </div>

            {formData.servicio === 'threading' || formData.servicio === 'cera' ? (
              <div className={styles.formGroup}>
                <label htmlFor="zona">Zona a tratar *</label>
                <select
                  id="zona"
                  name="zona"
                  value={formData.zona}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona una zona</option>
                  {zonasDepilacion.map((z) => (
                    <option key={z} value={z}>{z}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div className={styles.formGroup}>
                <label htmlFor="zona">Zona / Detalle adicional</label>
                <input
                  type="text"
                  id="zona"
                  name="zona"
                  value={formData.zona}
                  onChange={handleChange}
                  placeholder="Ej: Manos y pies, diseño específico..."
                />
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="fecha">Fecha *</label>
              <div className={styles.inputWithIcon}>
                <CalendarIcon className={styles.inputIcon} />
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  value={formData.fecha}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              {formData.fecha && (
                <span className={styles.dayIndicator}>
                  {getNombreDia(formData.fecha)}
                  {esDomingo && <span className={styles.domingoCerrado}> — DOMINGO CERRADO ❌</span>}
                </span>
              )}
            </div>

            {formData.fecha && !esDomingo && (
              <div className={styles.formGroup}>
                <label htmlFor="hora">Hora *</label>
                <div className={styles.inputWithIcon}>
                  <ClockIcon className={styles.inputIcon} />
                  <select
                    id="hora"
                    name="hora"
                    value={formData.hora}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona una hora</option>
                    {loadingHoras ? (
                      <option value="" disabled>Cargando horas...</option>
                    ) : horasDisponiblesFiltradas.length === 0 ? (
                      <option value="" disabled>No hay horas disponibles</option>
                    ) : (
                      horasDisponiblesFiltradas.map((hora) => (
                        <option key={hora} value={hora}>{hora}</option>
                      ))
                    )}
                  </select>
                </div>
                <span className={styles.fieldHint}>
                  {getNombreDia(formData.fecha) === 'Sábado' 
                    ? 'Horario sábado: 09:00 - 20:00' 
                    : 'Horario: 10:00 - 20:00'}
                </span>
              </div>
            )}

            {esDomingo && (
              <div className={styles.domingoMensaje}>
                ❌ Los domingos estamos cerrados. Por favor, elige otro día.
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="comentarios">Comentarios adicionales</label>
              <div className={styles.inputWithIcon}>
                <MessageIcon className={styles.inputIcon} />
                <textarea
                  id="comentarios"
                  name="comentarios"
                  value={formData.comentarios}
                  onChange={handleChange}
                  placeholder="¿Algo que debamos saber? (alergias, preferencias, etc.)"
                  rows={4}
                />
              </div>
            </div>

            <button type="submit" className={styles.btnPrimary}>
              <CalendarIcon className={styles.iconSmall} />
              Reservar cita
            </button>

            <p className={styles.formDisclaimer}>
              * Te contactaremos por teléfono para confirmar tu cita.
            </p>
          </form>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <Image 
            src="/logo2.ico" 
            alt="Belleza India" 
            width={500}
            height={500}
            unoptimized={true}
            className={styles.footerLogoImg}
            style={{ objectFit: 'contain', maxWidth: '180px', maxHeight: '80px', width: 'auto', height: 'auto' }}
          />
          <div className={styles.footerLinks}>
            <div className={styles.footerCol}>
              <h4>Enlaces</h4>
              <ul>
                <li><Link href="#nosotros">Quién soy</Link></li>
                <li><Link href="#servicios">Servicios</Link></li>
                <li><Link href="/precios">Precios</Link></li>
                <li><Link href="#testimonios">Opiniones</Link></li>
                <li><Link href="#contacto">Contacto</Link></li>
              </ul>
            </div>
            <div className={styles.footerCol}>
              <h4>Servicios</h4>
              <ul>
                <li>Depilación con hilo</li>
                <li>Henna</li>
                <li>Manicura</li>
                <li>Masajes</li>
              </ul>
            </div>
          </div>
          <div className={styles.footerSocial}>
            <a href="https://www.facebook.com/hindhu.depilacion.con.hilo/about" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <FacebookIcon />
            </a>
            <a href="https://x.com/IndiaBelleza" aria-label="X" target="_blank" rel="noopener noreferrer">
              <XIcon />
            </a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} Belleza India · Todos los derechos reservados</p>
          <p className={styles.footerCredit}>
            Diseño y desarrollo por{' '}
            <a 
              href="https://ayoub-gamma.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.footerCreditLink}
            >
              Ayoub Ben Said
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}