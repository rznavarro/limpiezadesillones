import React from 'react';
import { BUSINESS_INFO } from '../data/pricingData';
import { trackEvent } from '../utils/gtm';

export const ContactSection: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', { location: 'contacto_footer' });
    const msg = encodeURIComponent('Hola, quiero cotizar una limpieza de tapices a domicilio. Mi comuna es: ');
    window.location.href = `${BUSINESS_INFO.whatsappUrl}?text=${msg}`;
  };

  const handlePhoneClick = (type: string, number: string) => {
    trackEvent('call_click', { type, number });
  };

  return (
    <>
      {/* 10. Contact Section */}
      <section id="contacto" className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#EFEDE8] overflow-hidden border-t border-[#101010]/10">
        
        {/* Giant muted wordmark "LIMPIO." behind content (opacity 6%) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0 overflow-hidden"
        >
          <span className="font-[900] tracking-[-0.04em] text-[#101010] opacity-[0.06] uppercase leading-none text-[clamp(120px,28vw,420px)] text-center w-full block">
            LIMPIO.
          </span>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center mb-16">
          <span className="text-[12px] sm:text-[13px] font-semibold tracking-[0.14em] uppercase text-[#6B6862] block mb-3">
            Atención directa · Lunes a domingo
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.03em] text-[#101010] mb-4 text-balance">
            Agenda tu limpieza hoy.
          </h2>
          <p className="text-lg sm:text-xl text-[#6B6862] max-w-xl mx-auto mb-8">
            Escríbenos con lo que quieres limpiar y tu comuna. Te responderemos a la brevedad con la disponibilidad de turnos.
          </p>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="group inline-flex items-center justify-center gap-3 h-14 px-9 bg-[#101010] text-[#EFEDE8] hover:bg-[#252525] rounded-[2px] font-bold text-sm tracking-[0.1em] uppercase transition-all shadow-md cursor-pointer"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#1F7A4D]" />
            <span>Cotizar por WhatsApp</span>
            <span className="font-sans transition-transform duration-200 group-hover:translate-x-1.5">→</span>
          </button>
        </div>

        {/* 2-column contact details */}
        <div className="relative z-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#F7F6F2] border border-[#101010]/10 p-8 sm:p-10 rounded-[2px]">
          {/* Column 1: Phones & Direct */}
          <div className="space-y-6">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#6B6862] pb-2 border-b border-[#101010]/10">
              Teléfonos y mensajería
            </h3>
            
            <div>
              <div className="text-xs text-[#6B6862] font-semibold uppercase tracking-wider mb-1">
                WhatsApp y Celular principal:
              </div>
              <a
                href={BUSINESS_INFO.whatsappUrl}
                onClick={handleWhatsApp}
                className="text-lg font-extrabold text-[#101010] hover:underline"
              >
                {BUSINESS_INFO.whatsappFormatted}
              </a>
            </div>

            <div>
              <div className="text-xs text-[#6B6862] font-semibold uppercase tracking-wider mb-1">
                Teléfono fijo:
              </div>
              <a
                href={`tel:${BUSINESS_INFO.phoneFixedTel}`}
                onClick={() => handlePhoneClick('fijo', BUSINESS_INFO.phoneFixed)}
                className="text-base font-extrabold text-[#101010] hover:underline"
              >
                {BUSINESS_INFO.phoneFixed}
              </a>
            </div>

            <div>
              <div className="text-xs text-[#6B6862] font-semibold uppercase tracking-wider mb-1">
                Servicio al cliente postventa:
              </div>
              <a
                href={`tel:${BUSINESS_INFO.postVentaTel}`}
                onClick={() => handlePhoneClick('postventa', BUSINESS_INFO.postVentaNumber)}
                className="text-base font-extrabold text-[#101010] hover:underline"
              >
                {BUSINESS_INFO.postVentaNumber}
              </a>
            </div>
          </div>

          {/* Column 2: Email, Hours & Coverage */}
          <div className="space-y-6">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#6B6862] pb-2 border-b border-[#101010]/10">
              Disponibilidad y Cobertura
            </h3>

            <div>
              <div className="text-xs text-[#6B6862] font-semibold uppercase tracking-wider mb-1">
                Correo electrónico oficial:
              </div>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="text-sm sm:text-base font-extrabold text-[#101010] hover:underline break-all"
              >
                {BUSINESS_INFO.email}
              </a>
            </div>

            <div>
              <div className="text-xs text-[#6B6862] font-semibold uppercase tracking-wider mb-1">
                Días y turnos de atención:
              </div>
              <div className="text-sm font-extrabold text-[#101010]">
                {BUSINESS_INFO.hours}
              </div>
            </div>

            <div>
              <div className="text-xs text-[#6B6862] font-semibold uppercase tracking-wider mb-1">
                Zona de cobertura:
              </div>
              <div className="text-sm text-[#101010] leading-relaxed">
                Toda la Región Metropolitana. <strong>Sin recargo</strong> por distancia dentro de la Provincia de Santiago.
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 11. Footer */}
      <footer className="bg-[#101010] text-[#EFEDE8] py-14 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/10">
          <div>
            <div className="text-lg font-extrabold tracking-[0.14em] uppercase text-[#EFEDE8] mb-2">
              Limpieza de Sillones
            </div>
            <p className="text-xs text-[#EFEDE8]/60 max-w-md">
              Limpieza y sanitización de tapices con espuma y vapor a domicilio en la Región Metropolitana de Santiago.
            </p>
          </div>

          <nav className="flex flex-wrap gap-6 text-xs font-semibold tracking-wider uppercase text-[#EFEDE8]/80">
            <a href="#servicios" className="hover:text-white transition-colors">Servicios</a>
            <a href="#metodo" className="hover:text-white transition-colors">Método</a>
            <a href="#precios" className="hover:text-white transition-colors">Precios</a>
            <a href="#para-quien" className="hover:text-white transition-colors">Hoteles</a>
            <a href="#autos" className="hover:text-white transition-colors">Autos</a>
            <a href="#condiciones" className="hover:text-white transition-colors">Condiciones</a>
            <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EFEDE8]/50">
          <div>
            Precios netos, no incluyen IVA (19%). Pedido mínimo $35.000 + IVA.
          </div>
          <div>
            © {currentYear} Limpieza de Sillones · {BUSINESS_INFO.domain}
          </div>
        </div>
      </footer>
    </>
  );
};
