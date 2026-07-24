// app/quien-soy/page.tsx
import type { SVGProps } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

/* ---------- Iconos básicos ---------- */
type IconProps = SVGProps<SVGSVGElement>;

function HeartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M24 42s-16-10-16-20c0-5 4-10 10-10 4 0 6 2 6 2s2-2 6-2c6 0 10 5 10 10 0 10-16 20-16 20Z" />
    </svg>
  );
}

function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M24 4l5.5 13.5L43 18l-11 10.5L34.5 44 24 35.5 13.5 44 16 28.5 5 18l13.5-.5L24 4z" />
    </svg>
  );
}

function FlowerIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="24" cy="24" r="3" />
      <path d="M24 8v8M24 32v8M8 24h8M32 24h8M13.5 13.5l5.5 5.5M29 29l5.5 5.5M13.5 34.5l5.5-5.5M29 19l5.5-5.5" />
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

/* ---------- Datos ---------- */
const valores = [
  { icon: HeartIcon, titulo: 'Pasión por el cuidado', desc: 'Cada tratamiento se realiza con dedicación y atención al detalle, porque tu bienestar es nuestra prioridad.' },
  { icon: StarIcon, titulo: 'Excelencia y tradición', desc: '20+ años de experiencia combinando técnicas ancestrales indias con los mejores productos del mercado.' },
  { icon: FlowerIcon, titulo: 'Atención personalizada', desc: 'Cada cliente es única. Por eso, cada tratamiento se adapta a tus necesidades y estilo personal.' },
];

export default function QuienSoy() {
  return (
    <>
      {/* ===== Header ===== */}
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
            <Link href="/#contacto">Contacto</Link>
          </div>
          <Link href="tel:+34910096036" className={styles.navCta}>Hacer cita</Link>
        </nav>
      </header>

      {/* ===== Hero - Presentación ===== */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroBadge}>✨ Quién soy</span>
          <h1 className={styles.heroTitle}>
            Belleza India: <br />
            <em>tradición, cuidado y excelencia</em>
          </h1>
          <p className={styles.heroSubtitle}>
            <strong>Belleza India Depilación Con Hilo</strong> es el lugar ideal para cuidar de ti mismo, 
            relajarse y dedicarse a su cuerpo, concediéndole un capricho.
          </p>
          <div className={styles.heroStats}>
            <div>
              <span className={styles.statNumber}>20+</span>
              <span className={styles.statLabel}>Años de experiencia</span>
            </div>
            <div>
              <span className={styles.statNumber}>1.200+</span>
              <span className={styles.statLabel}>Clientas satisfechas</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Quiénes somos ===== */}
      <section className={styles.about}>
        <div className={styles.aboutInner}>
          <div className={styles.aboutText}>
            <span className={styles.sectionEyebrow}>Nuestra esencia</span>
            <h2 className={styles.sectionTitle}>Donde el arte y el cuidado se encuentran</h2>
            <p>
              El personal del centro está altamente cualificado para poder ofrecer tratamientos
              específicos y personalizados, respondiendo a todas las solicitudes.
            </p>
            <p>
              Nuestro equipo sabrá aconsejarle lo mejor posible y cuidará de usted con pasión,
              cuidado y amabilidad, para hacer que su tiempo con nosotros sea lo más agradable
              posible y ¡hacerle olvidar un poco del estrés diario!
            </p>
            <Link href="/#contacto" className={styles.btnPrimary}>Reservar cita</Link>
          </div>
          <div className={styles.aboutImage}>
            <Image
              src="/relaje.png"
              alt="Espacio de bienestar y relajación en Belleza India"
              width={600}
              height={450}
              className={styles.aboutImg}
              priority
            />
          </div>
        </div>
      </section>

      {/* ===== Valores ===== */}
      <section className={`${styles.values} ${styles.sectionDark}`}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionEyebrow}>Nuestros valores</span>
          <h2 className={styles.sectionTitle}>Lo que nos define</h2>
        </div>
        <div className={styles.valuesGrid}>
          {valores.map(({ icon: Icon, titulo, desc }) => (
            <div className={styles.valueCard} key={titulo}>
              <Icon className={styles.valueIcon} />
              <h3>{titulo}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA final ===== */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2>¿Listo para una experiencia de belleza única?</h2>
          <p>Reserva tu cita hoy y descubre el cuidado personalizado que te mereces.</p>
          <div className={styles.ctaActions}>
            <Link href="tel:+34910096036" className={styles.btnPrimary}>Llamar ahora</Link>
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