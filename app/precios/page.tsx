// app/precios/page.tsx
'use client';

import type { SVGProps } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './page.module.css';

/* ---------- Iconos ---------- */
type IconProps = SVGProps<SVGSVGElement>;

function DownloadIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function EyeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M18 6L6 18M6 6l12 12" />
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

/* ---------- Datos de precios ---------- */
const servicios = {
  threading: {
    titulo: 'Depilación con Hilo • Threading',
    items: [
      { es: 'Diseño de cejas', en: 'Eyebrow Design', precio: '11 €' },
      { es: 'Labios', en: 'Upper Lip', precio: '6 €' },
      { es: 'Patilla', en: 'Sideburns', precio: '8 €' },
      { es: 'Frente', en: 'Forehead', precio: '6 €' },
      { es: 'Barbilla', en: 'Chin', precio: '7 €' },
      { es: 'Mejillas', en: 'Cheeks', precio: '5 €' },
      { es: 'Dedos', en: 'Fingers', precio: '8 €' },
      { es: 'Todo el rostro', en: 'Full Face', precio: '32 €' },
      { es: 'Cara y cuello', en: 'Face & Neck', precio: '37 €' },
      { es: 'Axila con hilo', en: 'Underarms (Threading)', precio: '16 €' },
      { es: 'Manos', en: 'Hands', precio: '15 €' },
      { es: 'Cuello', en: 'Neck', precio: '10 €' },
      { es: 'Pack (cejas + labios)', en: 'Pack (Eyebrows + Upper Lip)', precio: '15 €' },
      { es: 'Espalda', en: 'Back', precio: '20 €' },
      { es: 'Medio brazo', en: 'Half Arm', precio: '12 €' },
      { es: 'Media pierna', en: 'Half Leg', precio: '16 €' },
      { es: 'Brazo entero', en: 'Full Arm', precio: '16 €' },
      { es: 'Pierna entera', en: 'Full Leg', precio: '25 €' },
      { es: 'Axila', en: 'Underarms', precio: '8 €' },
      { es: 'Inglés', en: 'Bikini Line', precio: '12 €' },
      { es: 'Inglés entera', en: 'Full Bikini', precio: '25 €' },
    ]
  },
  manicura: {
    titulo: 'Manicura y Pedicura • Manicure & Pedicure',
    items: [
      { es: 'Manicura', en: 'Manicure', precio: '12 €' },
      { es: 'Manicura permanente', en: 'Gel Manicure', precio: '15 €' },
      { es: 'Pedicura', en: 'Pedicure', precio: '25 €' },
      { es: 'Pedicura permanente', en: 'Gel Pedicure', precio: '30 €' },
    ]
  },
  henna: {
    titulo: 'Henna • Henna',
    items: [
      { es: 'Desde', en: 'From', precio: '5 €' },
    ]
  },
  pestanas: {
    titulo: 'Pestañas • Eyelashes',
    items: [
      { es: 'Lifting de pestañas + tinte', en: 'Eyelash Lift + Tint', precio: '32 €' },
      { es: 'Laminado de cejas', en: 'Brow Lamination', precio: '20 €' },
      { es: 'Extensiones de pestañas', en: 'Eyelash Extensions', precio: '45 €' },
      { es: 'Tinte de pestañas', en: 'Eyelash Tint', precio: '10 €' },
      { es: 'Tinte de cejas con heena', en: 'Henna Eyebrow Tint', precio: '10 €' },
    ]
  },
  conoterapia: {
    titulo: 'Conoterapia • Conotherapy',
    items: [
      { es: 'Cono oídos', en: 'Ear Candling', precio: '16 €' },
    ]
  },
  faciales: {
    titulo: 'Limpiezas Faciales • Facial Cleansing',
    items: [
      { es: 'Masaje facial completo', en: 'Full Facial Massage', precio: '30 €' },
      { es: 'Limpieza de cutis completa', en: 'Deep Cleansing Facial', precio: '40 €' },
      { es: 'Limpieza de cutis completa + masaje de cabeza', en: 'Deep Cleansing Facial + Head Massage', precio: '45 €' },
    ]
  },
  masajes: {
    titulo: 'Masajes y Tratamientos Especiales • Massages & Special Treatments',
    items: [
      { es: 'Masaje de oro', en: 'Gold Massage', precio: '45 €' },
      { es: 'Masaje de diamante', en: 'Diamond Massage', precio: '40 €' },
      { es: 'Mascarilla ayurveda', en: 'Ayurveda Mask', precio: '10 €' },
      { es: 'Masaje de frutas', en: 'Fruit Massage', precio: '25 €' },
      { es: 'Masaje de cabeza', en: 'Head Massage', precio: '25 €' },
    ]
  }
};

export default function Precios() {
  const [catalogoAbierto, setCatalogoAbierto] = useState(false);

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

      {/* ===== Hero ===== */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroBadge}>💰 Precios</span>
          <h1 className={styles.heroTitle}>
            Tu belleza, <em>nuestra pasión</em>
          </h1>
          <p className={styles.heroSubtitle}>
            <strong>Belleza India</strong> • Your beauty, our passion
          </p>
          <div className={styles.heroActions}>
            <Link href="#lista-precios" className={styles.btnPrimary}>Ver lista de precios</Link>
            <button onClick={() => setCatalogoAbierto(true)} className={styles.btnGhost}>
              <EyeIcon className={styles.iconSmall} />
              Ver catálogo
            </button>
          </div>
        </div>
      </section>

      {/* ===== Lista de Precios ===== */}
      <section id="lista-precios" className={styles.prices}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionEyebrow}>Lista de Precios</span>
          <h2 className={styles.sectionTitle}>Price List</h2>
          <p className={styles.sectionSubtitle}>
            Todos nuestros servicios con sus precios actualizados
          </p>
        </div>

        <div className={styles.priceGrid}>
          {Object.values(servicios).map((categoria, idx) => (
            <div className={styles.categoryCard} key={idx}>
              <h3 className={styles.categoryTitle}>{categoria.titulo}</h3>
              <div className={styles.priceTable}>
                {categoria.items.map((item, i) => (
                  <div className={styles.priceRow} key={i}>
                    <div className={styles.priceName}>
                      <span className={styles.es}>{item.es}</span>
                      <span className={styles.en}>{item.en}</span>
                    </div>
                    <span className={styles.priceLeader} />
                    <span className={styles.priceAmount}>{item.precio}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.verCatalogoSection}>
          <p className={styles.verCatalogoText}>
            ¿Prefieres ver nuestro catálogo completo con imágenes?
          </p>
          <button onClick={() => setCatalogoAbierto(true)} className={styles.btnPrimary}>
            <EyeIcon className={styles.iconSmall} />
            Ver catálogo completo
          </button>
        </div>
      </section>

      {/* ===== Modal del Catálogo ===== */}
      {catalogoAbierto && (
        <div className={styles.modalOverlay} onClick={() => setCatalogoAbierto(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.modalClose} 
              onClick={() => setCatalogoAbierto(false)}
              aria-label="Cerrar catálogo"
            >
              <XIcon />
            </button>
            
            <div className={styles.modalImageWrapper}>
              <Image
                src="/catalogo.jpeg"
                alt="Catálogo completo de Belleza India"
                width={1200}
                height={1600}
                className={styles.modalImage}
                priority
                unoptimized
              />
            </div>

            <div className={styles.modalFooter}>
              <a 
                href="/catalogo.jpeg" 
                download="Catalogo_Belleza_India.jpeg"
                className={styles.btnDownload}
              >
                <DownloadIcon className={styles.iconSmall} />
                Descargar catálogo
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ===== CTA ===== */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2>¿Listo para tu próxima cita?</h2>
          <p>Reserva ahora y descubre el cuidado personalizado que te mereces.</p>
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