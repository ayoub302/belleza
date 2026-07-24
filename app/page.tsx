// app/page.tsx
'use client';

import type { SVGProps } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useUser, SignInButton, SignOutButton } from '@clerk/nextjs';
import styles from './page.module.css';

/* ---------- Iconos SVG de línea ---------- */

type IconProps = SVGProps<SVGSVGElement>;

function ThreadingIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M12 24c4-10 12-16 20-14M12 24c4 10 12 16 20 14" />
      <circle cx="14" cy="24" r="3" />
      <path d="M17 24h20" strokeDasharray="1 4" />
    </svg>
  );
}

function WaxIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M24 6c6 8 10 14 10 20a10 10 0 1 1-20 0c0-6 4-12 10-20Z" />
    </svg>
  );
}

function HandIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M16 42V22a3 3 0 0 1 6 0v8M22 30v-4a3 3 0 0 1 6 0v4M28 30v-3a3 3 0 0 1 6 0v3" />
      <path d="M34 30v4c0 5-4 8-8 8h-4c-5 0-9-3-11-7l-4-8a2.5 2.5 0 0 1 4.5-2l2.5 4" />
    </svg>
  );
}

function LotusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M24 44c-6 0-10-4-10-10 4 0 7 2 10 6 3-4 6-6 10-6 0 6-4 10-10 10Z" />
      <path d="M24 34c-4-3-6-7-6-13 4 1 7 4 8 8M24 34c4-3 6-7 6-13-4 1-7 4-8 8" />
    </svg>
  );
}

function EyeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M6 24s7-11 18-11 18 11 18 11-7 11-18 11S6 24 6 24Z" />
      <circle cx="24" cy="24" r="5" />
    </svg>
  );
}

function MassageIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <ellipse cx="24" cy="36" rx="14" ry="5" />
      <ellipse cx="24" cy="24" rx="10" ry="4" />
      <ellipse cx="24" cy="14" rx="6" ry="3" />
    </svg>
  );
}

function PinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function ClockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

function PhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M6 3h3l2 5-2.5 2A12 12 0 0 0 14 15.5l2-2.5 5 2v3a2 2 0 0 1-2 2C10.6 20 4 13.4 4 5a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 6 8 7 8-7" />
    </svg>
  );
}

function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M14 9h3V6h-3c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v6h3v-6H16l1-3h-3.5V9.8c0-.5.3-.8.8-.8Z" />
    </svg>
  );
}

function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ---------- Icono Admin ---------- */
function AdminIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
      <path d="M12 7v4" />
      <path d="M10 9h4" />
    </svg>
  );
}

/* ---------- Mandala ---------- */

function Mandala(props: IconProps) {
  const petalos = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="1" {...props}>
      <circle cx="200" cy="200" r="180" />
      <circle cx="200" cy="200" r="140" />
      <circle cx="200" cy="200" r="60" strokeWidth="1.4" />
      {petalos.map((deg) => (
        <g key={deg} transform={`rotate(${deg} 200 200)`}>
          <path d="M200 200 200 20" strokeDasharray="1 7" />
          <path d="M200 60c18 18 18 42 0 60-18-18-18-42 0-60Z" />
        </g>
      ))}
    </svg>
  );
}

/* ---------- Datos ---------- */

const servicios = [
  { icon: ThreadingIcon, nombre: 'Depilación con hilo', desde: '5 €', desc: 'Técnica tradicional india para cejas, labios y rostro completo, sin irritación.' },
  { icon: WaxIcon, nombre: 'Depilación con cera', desde: '8 €', desc: 'Piernas, brazos, espalda e ingles, con un acabado suave y duradero.' },
  { icon: HandIcon, nombre: 'Manicura y pedicura', desde: '12 €', desc: 'Cuidado clásico o permanente en gel, para manos y pies impecables.' },
  { icon: LotusIcon, nombre: 'Henna', desde: '5 €', desc: 'Diseños de henna natural para manos, ideales también para bodas.' },
  { icon: EyeIcon, nombre: 'Pestañas y cejas', desde: '10 €', desc: 'Lifting, laminado, extensiones y tintes con resultado natural.' },
  { icon: MassageIcon, nombre: 'Masajes y faciales', desde: '10 €', desc: 'Masajes de oro y diamante, limpiezas faciales y mascarillas ayurvédicas.' },
];

const porQueElegirnos = [
  { 
    titulo: 'Experiencia y profesionalidad', 
    desc: 'Contamos con especialistas altamente cualificadas en depilación con hilo, manicura, lifting y extensiones de pestañas, masajes faciales y más.' 
  },
  { 
    titulo: 'Atención personalizada', 
    desc: 'Cada tratamiento se adapta a tus necesidades, tipo de piel y estilo personal.' 
  },
  { 
    titulo: 'Ambiente relajante', 
    desc: 'Cuidamos cada detalle para que disfrutes de un momento de desconexión y bienestar.' 
  },
  { 
    titulo: 'Resultados visibles', 
    desc: 'Nuestras técnicas ofrecen resultados duraderos y naturales, resaltando tu belleza sin artificios.' 
  },
];

const pasos = [
  { titulo: 'Consulta personalizada', desc: 'Hablamos de lo que necesitas y te asesoramos según tu piel, pestañas o uñas.' },
  { titulo: 'Preparación de la zona', desc: 'Limpiamos y preparamos el área con productos suaves, con higiene y calma.' },
  { titulo: 'Aplicación del tratamiento', desc: 'Hilo, lifting, manicura o masaje: técnica profesional, resultado impecable.' },
  { titulo: 'Toque final', desc: 'Hidratación, retoques y consejos para mantener el resultado en casa.' },
];

const marqueeItems = ['Threading', 'Henna', 'Manicura', 'Masajes', 'Limpieza facial', 'Pestañas', 'Cera'];

// --- TESTIMONIOS INICIALES (GOOGLE MAPS - SIEMPRE VISIBLES) ---
const testimoniosIniciales = [
  { 
    texto: 'Muy buena experiencia ya que no suelo hacerme nada y la manicura pedicura perfecta y se veía muy profesional la chica joven que me lo hizo, detalladamente y cuidadosa. Los productos se notan de calidad y duraderos. La limpieza y masaje facial y craneal de maravilla, me pusieron una manta encima durante el tratamiento para estar más cómoda. Un detalle muy bueno ❤️ Solo aconsejaría que explicaran en español y se comuniquen más con el cliente, es importante cuando se trata de tu cuerpo saber el proceso bien.',
    nombre: 'María José C.',
    estrellas: 5,
    fecha: 'hace 7 meses'
  },
  { 
    texto: 'Pardeep took great pride and detail in creating my henna. Not only mine, but my 3 daughters. Additionally, she does eye brow threading gently! Thank you Pardeep!',
    nombre: 'Suzanne Cassone',
    estrellas: 5,
    fecha: 'hace 3 meses'
  },
  { 
    texto: '✨ Excelente experiencia en el salón de belleza India. ✨ El servicio fue rapidísimo y muy profesional. Me realizaron depilación con hilo y tinte de cejas, quedando un resultado súper natural que me encantó. Sin duda volveré y tengo muchas ganas de probar más tratamientos. ¡100% recomendable! 🌸',
    nombre: 'Dix Dns',
    estrellas: 5,
    fecha: 'hace 9 meses'
  },
];

export default function Home() {
  const { isSignedIn, user } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // --- TESTIMONIOS: INICIALIZAR CON LOS DE GOOGLE MAPS ---
  const [testimonios, setTestimonios] = useState(testimoniosIniciales);
  const [loading, setLoading] = useState(false);

  const cargarTestimonios = async () => {
    console.log('🔍 [CLIENTE] Cargando testimonios desde API...');
    setLoading(true);
    try {
      const res = await fetch('/api/testimonios');
      console.log('🔍 [CLIENTE] Status:', res.status);
      if (res.ok) {
        const data = await res.json();
        console.log('✅ [CLIENTE] Testimonios de API:', data.length);
        if (data && data.length > 0) {
          setTestimonios(data);
        } else {
          console.log('ℹ️ [CLIENTE] API vacía, manteniendo testimonios iniciales');
        }
      } else {
        console.error('❌ [CLIENTE] Error al cargar:', await res.text());
      }
    } catch (error) {
      console.error('❌ [CLIENTE] Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    cargarTestimonios();
  }, []);

  // --- FORMULARIO DE TESTIMONIOS ---
  const [formData, setFormData] = useState({
    nombre: '',
    comentario: '',
    estrellas: 5
  });
  const [charCount, setCharCount] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'comentario') {
      setCharCount(value.length);
    }
  };

  const handleStarClick = (stars: number) => {
    setFormData(prev => ({ ...prev, estrellas: stars }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🔍 [CLIENTE] Enviando testimonio...');
    
    if (!formData.nombre.trim() || !formData.comentario.trim() || formData.estrellas === 0) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }

    try {
      const res = await fetch('/api/testimonios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre.trim(),
          comentario: formData.comentario.trim(),
          estrellas: formData.estrellas,
        }),
      });

      console.log('📥 [CLIENTE] Status:', res.status);
      const data = await res.json();
      console.log('📄 [CLIENTE] Respuesta:', data);

      if (res.ok) {
        console.log('✅ [CLIENTE] Testimonio guardado correctamente (pendiente de aprobación)');
        setSubmitStatus('success');
        setFormData({ nombre: '', comentario: '', estrellas: 5 });
        setCharCount(0);
        await cargarTestimonios();
      } else {
        console.error('❌ [CLIENTE] Error:', data);
        setSubmitStatus('error');
      }
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      console.error('❌ [CLIENTE] Error de red:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
    <>
      {/* ===== HEADER ===== */}
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
            <Link href="#nosotros">Quién soy</Link>
            <Link href="#servicios">Servicios</Link>
            <Link href="#proceso">Cómo funciona</Link>
            <Link href="#testimonios">Opiniones</Link>
            <Link href="#contacto">Contacto</Link>
          </div>
          <div className={styles.navActions}>
            <Link href="/reserva" className={styles.navCta}>Reservar cita</Link>
            
            {!isSignedIn ? (
              <SignInButton mode="modal">
                <button className={styles.adminButton}>
                  <AdminIcon className={styles.adminIcon} />
                  <span>Admin</span>
                </button>
              </SignInButton>
            ) : (
              <div className={styles.adminDropdown}>
                <button 
                  className={styles.adminButton} 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <img 
                    src={user?.imageUrl} 
                    alt="Avatar" 
                    className={styles.avatar} 
                  />
                  <span className={styles.userName}>{user?.firstName}</span>
                  <AdminIcon className={styles.adminIcon} />
                  <span className={styles.arrow}>▼</span>
                </button>
                {dropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    <Link 
                      href="/admin" 
                      className={styles.dropdownItem}
                      onClick={() => setDropdownOpen(false)}
                    >
                      📊 Panel de Administración
                    </Link>
                    <SignOutButton>
                      <button 
                        className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`}
                        onClick={() => setDropdownOpen(false)}
                      >
                        🚪 Cerrar sesión
                      </button>
                    </SignOutButton>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <Mandala className={styles.mandala} />
        <span className={styles.script}>Belleza India</span>
        <h1 className={styles.heroTitle}>
          El arte del hilo, <em>tejido a mano</em> en el corazón de Madrid
        </h1>
        <p className={styles.heroSubtitle}>
          El único salón de Madrid especializado en depilación con hilo tradicional,
          henna y rituales de belleza ayurvédicos.
        </p>
        <div className={styles.heroActions}>
          <Link href="/reserva" className={styles.btnPrimary}>Reservar cita</Link>
          <Link href="#servicios" className={styles.btnGhost}>Ver servicios</Link>
        </div>
        <p className={styles.trustLine}>
          Con la confianza de más de <strong>1.200 clientas</strong> en su camino hacia el bienestar
        </p>
      </section>

      {/* ===== MARQUESINA ===== */}
      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span className={styles.marqueeItem} key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* ===== QUIÉN SOY ===== */}
      <section id="nosotros" className={styles.section}>
        <div className={styles.about}>
          <div className={styles.statStack}>
            <div>
              <span className={styles.statNumber}>20+</span>
              <span className={styles.statLabel}>Años de experiencia</span>
            </div>
            <div>
              <span className={styles.statNumber}>1.200+</span>
              <span className={styles.statLabel}>Clientas satisfechas</span>
            </div>
          </div>
          <div className={styles.aboutText}>
            <p className={styles.sectionEyebrow}>Quién soy</p>
            <h2 className={styles.sectionTitle}>Estética con raíces, cuidado con alma</h2>
            <p>
              <strong>Belleza India Depilación Con Hilo</strong> es el lugar ideal para
              cuidar de ti mismo, relajarse y dedicarse a su cuerpo, concediéndole un capricho.
              Nuestro equipo está altamente cualificado para ofrecer tratamientos específicos y
              personalizados, respondiendo a todas las solicitudes. 
            </p>
            <p>
              El catálogo de Belleza India está lleno de tratamientos estéticos para la cara,
              el cuerpo y las uñas, perfectos para todas las necesidades y para todas las ocasiones.
            </p>
            <p className={styles.aboutCta}>
              <em>&quot;Nuestro equipo sabrá aconsejarle lo mejor posible y cuidará de usted con pasión, 
              cuidado y amabilidad, para hacer que su tiempo con nosotros sea lo más agradable posible 
              y ¡hacerle olvidar un poco del estrés diario!&quot;</em>
            </p>
            <div className={styles.aboutActions}>
              <Link href="/quien-soy" className={styles.btnGhost}>Saber más</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== POR QUÉ ELEGIRNOS ===== */}
      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.sectionHead}>
          <p className={styles.sectionEyebrow}>¿Por qué elegirnos?</p>
          <h2 className={styles.sectionTitle}>¿Por qué elegir BELLEZA INDIA?</h2>
          <p className={styles.sectionText}>
            Entre nuestros servicios podrá elegir muchos tratamientos faciales y corporales,
            depilación con hilo árabe en todas las zonas del cuerpo, limpieza facial,
            mascarillas regeneradoras, masajes, tratamientos para pestañas y cejas.
          </p>
        </div>
        <div className={styles.whyList}>
          {porQueElegirnos.map(({ titulo, desc }, i) => (
            <div className={styles.whyItem} key={titulo}>
              <span className={styles.whyIndex}>0{i + 1}</span>
              <h3 className={styles.whyTitle}>{titulo}</h3>
              <p className={styles.sectionText}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SERVICIOS ===== */}
      <section id="servicios" className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.sectionEyebrow}>Servicios</p>
          <h2 className={styles.sectionTitle}>Nuestro menú de tratamientos</h2>
        </div>
        <div className={styles.menu}>
          {servicios.map(({ icon: Icon, nombre, desde, desc }) => (
            <div className={styles.menuRow} key={nombre}>
              <Icon className={styles.menuIcon} />
              <span className={styles.menuName}>{nombre}</span>
              <span className={styles.menuLeader} />
              <span className={styles.menuPrice}>Desde <b>{desde}</b></span>
              <p className={styles.menuDesc}>{desc}</p>
            </div>
          ))}
        </div>
        <div className={styles.viewAllWrap}>
          <Link href="/precios" className={styles.btnPrimary} style={{ color: 'var(--parchment)' }}>
            Ver lista de precios completa
          </Link>
        </div>
      </section>

      {/* ===== CÓMO FUNCIONA ===== */}
<section id="proceso" className={`${styles.section} ${styles.sectionDark}`}>
  <div className={styles.sectionHead}>
    <p className={styles.sectionEyebrow}>Cómo funciona</p>
    <h2 className={styles.sectionTitle}>Tu experiencia paso a paso</h2>
    <p className={styles.sectionText}>
      Te guiamos en cada etapa para que disfrutes de una experiencia única y personalizada.
    </p>
  </div>
  <div className={styles.timeline}>
    {pasos.map(({ titulo, desc }, i) => (
      <div className={styles.timelineStep} key={titulo}>
        <div className={styles.timelineNumber}>0{i + 1}</div>
        <h3 className={styles.timelineTitle}>{titulo}</h3>
        <p className={styles.sectionText}>{desc}</p>
      </div>
    ))}
  </div>
  <div className={styles.viewAllWrap}>
    <Link href="/como-funciona" className={styles.btnPrimary} style={{ color: 'var(--parchment)' }}>
      Conocer más →
    </Link>
  </div>
</section>

      {/* ===== TESTIMONIOS ===== */}
      <section id="testimonios" className={styles.section}>
        <div className={styles.sectionHead}>
          <p className={styles.sectionEyebrow}>Opiniones</p>
          <h2 className={styles.sectionTitle}>Lo que dicen nuestras clientas</h2>
          <p className={styles.sectionSubtitle}>
            Valoraciones de clientas que confían en nosotros
          </p>
        </div>

        <div className={styles.quotes}>
          {loading ? (
            <p>Cargando testimonios...</p>
          ) : testimonios.length === 0 ? (
            <p className={styles.emptyMessage}>
              Todavía no hay opiniones. ¡Anímate a compartir tu experiencia y ayuda a otras personas a conocernos! 💫
            </p>
          ) : (
            testimonios.map(({ nombre, texto, estrellas, fecha }, index) => (
              <div className={styles.quoteCard} key={index}>
                <div className={styles.quoteStars}>
                  {'★'.repeat(estrellas)}{'☆'.repeat(5 - estrellas)}
                </div>
                <span className={styles.quoteMark}>&ldquo;</span>
                <p className={styles.quoteText}>{texto}</p>
                <p className={styles.quoteAuthor}>{nombre}</p>
                <p className={styles.quoteDate}>{fecha}</p>
              </div>
            ))
          )}
        </div>

        {/* ===== FORMULARIO DE TESTIMONIOS ===== */}
        <div className={styles.formContainer}>
          <h3 className={styles.formTitle}>Deja tu opinión</h3>
          <p className={styles.formSubtitle}>
            Tu experiencia nos ayuda a mejorar. ¡Todos los campos son obligatorios!
          </p>
          
          {submitStatus === 'success' && (
            <div className={styles.successMessage}>
              ✅ ¡Gracias por compartir tu experiencia! Tu opinión es muy valiosa para nosotros.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className={styles.errorMessage}>
              ⚠️ Por favor, completa todos los campos antes de publicar.
            </div>
          )}

          <form className={styles.testimonialForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="nombre">Nombre completo *</label>
              <input 
                type="text" 
                id="nombre" 
                name="nombre" 
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Ej: María García" 
                required 
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="comentario">Tu comentario (máximo 250 caracteres) *</label>
              <textarea 
                id="comentario" 
                name="comentario" 
                value={formData.comentario}
                onChange={handleInputChange}
                placeholder="Comparte tu experiencia..." 
                maxLength={250} 
                required
                rows={4}
              />
              <span className={styles.charCount}>{charCount} / 250</span>
            </div>

            <div className={styles.formGroup}>
              <label>Valoración *</label>
              <div className={styles.starRating}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`${styles.starBtn} ${star <= formData.estrellas ? styles.starActive : ''}`}
                    onClick={() => handleStarClick(star)}
                    aria-label={`${star} estrellas`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className={styles.btnPrimary}>
              Publicar comentario
            </button>
          </form>
          <p className={styles.formDisclaimer}>
            * Tu opinión nos ayuda a crecer. Todos los comentarios son revisados antes de publicarse para garantizar la calidad de nuestra comunidad.
          </p>
        </div>
      </section>

      {/* ===== CONTACTO ===== */}
      <section id="contacto" className={styles.contact}>
        <div className={styles.contactInner}>
          <div>
            <p className={styles.sectionEyebrow}>Visítanos</p>
            <h2 className={styles.sectionTitle}>Te esperamos</h2>
            <ul className={styles.contactList}>
              <li>
                <PinIcon />
                <a href="https://maps.app.goo.gl/Jf2EuTLGxry211fm9" target="_blank" rel="noopener noreferrer">
                  C. del Arenal, 8, Centro Comercial, Centro, 28013 Madrid
                </a>
              </li>
              <li>
                <ClockIcon />
                <div className={styles.scheduleContainer}>
                  <strong>Horario de atención</strong>
                  <div className={styles.scheduleGrid}>
                    <span>Lunes</span>
                    <span>10:00–20:00</span>
                    <span>Martes</span>
                    <span>10:00–20:00</span>
                    <span>Miércoles</span>
                    <span>10:00–20:00</span>
                    <span>Jueves</span>
                    <span>10:00–20:00</span>
                    <span>Viernes</span>
                    <span>10:00–20:00</span>
                    <span>Sábado</span>
                    <span>09:00–20:00</span>
                    <span className={styles.scheduleClosed}>Domingo</span>
                    <span className={styles.scheduleClosed}>Cerrado</span>
                  </div>
                </div>
              </li>
              <li><PhoneIcon /> <a href="tel:+34910096036">910 09 60 36</a></li>
              <li><MailIcon /> <a href="mailto:kaurpardeep51@gmail.com">kaurpardeep51@gmail.com</a></li>
            </ul>
          </div>
          <div className={styles.mapPlaceholder}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.123456789!2d-3.703790!3d40.416775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI1JzAwLjAiTiAzwrA0MicxMy42Ilc!5e0!3m2!1ses!2ses!4v1234567890" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
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
            <a href="https://www.facebook.com/hindhu.depilacion.con.hilo/about" aria-label="Facebook"><FacebookIcon /></a>
            <a href="https://x.com/IndiaBelleza" aria-label="X"><XIcon /></a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          © {new Date().getFullYear()} Belleza India · Todos los derechos reservados
        </div>
      </footer>
    </>
  );
}