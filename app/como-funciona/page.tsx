// app/como-funciona/page.tsx
'use client';

import type { SVGProps } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

/* ---------- Iconos ---------- */
type IconProps = SVGProps<SVGSVGElement>;

function UserIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function SparklesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M17 5.6l1.4 1.4M5.6 17l1.4 1.4" />
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

function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <polyline points="20 6 9 17 4 12" />
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

function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
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

/* ---------- Data ---------- */
const pasosDetallados = [
  {
    numero: '01',
    titulo: 'Consulta personalizada',
    descripcion: 'Comenzamos con una conversación para conocer tus necesidades, inquietudes y objetivos. Te asesoramos sobre qué tratamiento se adapta mejor a tu tipo de piel, pestañas o uñas, y resolvemos todas tus dudas. Queremos que te sientas segura y tranquila desde el primer momento.',
    icon: UserIcon,
    duracion: '10-15 minutos'
  },
  {
    numero: '02',
    titulo: 'Preparación de la zona',
    descripcion: 'Antes de comenzar, preparamos la zona a tratar con productos suaves y específicos para tu tipo de piel. Realizamos una limpieza profunda y aplicamos productos calmantes para minimizar cualquier molestia. Todo el proceso se realiza con total higiene y en un ambiente relajante.',
    icon: SparklesIcon,
    duracion: '5-10 minutos'
  },
  {
    numero: '03',
    titulo: 'Aplicación del tratamiento',
    descripcion: 'Llegó el momento de tu tratamiento. Ya sea depilación con hilo, lifting de pestañas, manicura o masaje, aplicamos técnicas profesionales con la máxima precisión y cuidado. Trabajamos con productos de alta calidad y seguimos protocolos estrictos para garantizar los mejores resultados.',
    icon: ClockIcon,
    duracion: '15-60 minutos'
  },
  {
    numero: '04',
    titulo: 'Toque final y consejos',
    descripcion: 'Finalizamos con hidratación y retoques para que el resultado sea impecable. Te damos consejos personalizados para mantener el tratamiento en casa y prolongar sus efectos. Además, programamos tu próxima cita para que tu cuidado sea continuo y efectivo.',
    icon: CheckIcon,
    duracion: '5-10 minutos'
  }
];

export default function ComoFunciona() {
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
            <Link href="/#nosotros">Quién soy</Link>
            <Link href="/#servicios">Servicios</Link>
            <Link href="/como-funciona">Cómo funciona</Link>
            <Link href="/#testimonios">Opiniones</Link>
            <Link href="/#contacto">Contacto</Link>
          </div>
          <Link href="/reserva" className={styles.navCta}>Reservar cita</Link>
        </nav>
      </header>

      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroBadge}>📋 Proceso</span>
          <h1 className={styles.heroTitle}>
            Cómo funciona <em>Belleza India</em>
          </h1>
          <p className={styles.heroSubtitle}>
            Descubre paso a paso cómo cuidamos de ti para que disfrutes de una experiencia única.
          </p>
        </div>
      </section>

      {/* ===== PASOS DETALLADOS ===== */}
      <section className={styles.pasosSection}>
        <div className={styles.pasosContainer}>
          {pasosDetallados.map((paso, index) => (
            <div key={paso.numero} className={styles.pasoCard}>
              <div className={styles.pasoHeader}>
                <div className={styles.pasoNumero}>{paso.numero}</div>
                <div className={styles.pasoIcon}>
                  <paso.icon />
                </div>
              </div>
              <h2 className={styles.pasoTitulo}>{paso.titulo}</h2>
              <p className={styles.pasoDescripcion}>{paso.descripcion}</p>
              <div className={styles.pasoFooter}>
                <span className={styles.pasoDuracion}>⏱️ {paso.duracion}</span>
              </div>
              {index < pasosDetallados.length - 1 && (
                <div className={styles.pasoConector}>
                  <ArrowRightIcon />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ===== BENEFICIOS ===== */}
      <section className={styles.beneficiosSection}>
        <div className={styles.beneficiosContainer}>
          <h2>¿Por qué elegir nuestro proceso?</h2>
          <p>Nos tomamos el tiempo necesario para que te sientas especial y cuidada.</p>
          <div className={styles.beneficiosGrid}>
            <div className={styles.beneficioCard}>
              <span>🧴</span>
              <h3>Productos de calidad</h3>
              <p>Utilizamos marcas premium y productos hipoalergénicos para tu seguridad.</p>
            </div>
            <div className={styles.beneficioCard}>
              <span>👩‍⚕️</span>
              <h3>Profesionales expertas</h3>
              <p>Nuestro equipo está altamente cualificado en cada una de las técnicas.</p>
            </div>
            <div className={styles.beneficioCard}>
              <span>🌿</span>
              <h3>Ambiente relajante</h3>
              <p>Disfruta de un espacio tranquilo y acogedor durante todo el tratamiento.</p>
            </div>
            <div className={styles.beneficioCard}>
              <span>💫</span>
              <h3>Resultados duraderos</h3>
              <p>Técnicas que garantizan resultados visibles y que se mantienen en el tiempo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2>¿Lista para vivir la experiencia Belleza India?</h2>
          <p>Reserva tu primera cita y descubre el cuidado personalizado que mereces.</p>
          <div className={styles.ctaActions}>
            <Link href="/reserva" className={styles.btnPrimary}>Reservar cita</Link>
            <Link href="/#contacto" className={styles.btnGhost}>Contactar</Link>
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