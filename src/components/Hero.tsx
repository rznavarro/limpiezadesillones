import React, { useEffect, useState } from 'react';
import { trackEvent } from '../utils/gtm';
import { BUSINESS_INFO } from '../data/pricingData';
import heroSofaImg from '../assets/images/sofa_hero_1791823463000.jpg';

interface HeroProps {
  onArmarPedido: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onArmarPedido }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', { location: 'hero' });
    const msg = encodeURIComponent('Hola, quiero cotizar una limpieza de tapices a domicilio. Mi comuna es: ');
    window.location.href = `${BUSINESS_INFO.whatsappUrl}?text=${msg}`;
  };

  // Parallax offsets
  const wordmarkY = Math.min(scrollY * 0.14, 120);
  const sofaY = Math.max(-scrollY * 0.05, -50);

  return (
    <section
      id="inicio"
      className="relative min-h-[calc(100svh-5rem)] flex flex-col justify-between overflow-hidden px-4 sm:px-6 lg:px-8 pt-8 pb-10 bg-[#EFEDE8]"
    >
      {/* Corner label: Top-Left (absolute, z-20) */}
      <div className="absolute top-6 left-4 sm:left-8 z-20 text-[11px] sm:text-[13px] font-semibold tracking-[0.14em] uppercase text-[#6B6862]">
        Limpieza de tapices con espuma y vapor
      </div>

      {/* Corner label: Bottom-Right (absolute, z-20) */}
      <div className="hidden sm:block absolute bottom-10 right-6 sm:right-8 z-20 text-[12px] font-semibold tracking-[0.12em] uppercase text-[#6B6862] text-right">
        A domicilio · Región Metropolitana · Lunes a domingo
      </div>

      {/* Central Visual Layer: Wordmark behind the sofa */}
      <div className="relative flex-1 flex items-center justify-center min-h-[380px] sm:min-h-[460px] md:min-h-[520px] w-full">
        {/* Giant Editorial Wordmark "SILLONES" - behind (z-1) */}
        <div
          aria-hidden="true"
          style={{ transform: `translateY(${wordmarkY}px)` }}
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-1 overflow-hidden"
        >
          <span className="font-[900] tracking-[-0.04em] text-[#101010] opacity-[0.14] uppercase leading-[0.82] text-[clamp(90px,21vw,340px)] text-center w-full block transition-transform duration-75">
            SILLONES
          </span>
        </div>

        {/* Sofa Cutout Layer - front (z-10) with mix-blend-multiply to blend cleanly */}
        <div
          style={{ transform: `translateY(${sofaY}px)` }}
          className="relative z-10 w-full max-w-[980px] px-2 sm:px-6 transition-transform duration-75 flex justify-center"
        >
          <img
            src={heroSofaImg}
            alt="Sofá tapizado de tres cuerpos en tela clara de lino recién higienizado"
            fetchPriority="high"
            className="w-full h-auto object-contain max-h-[52vh] sm:max-h-[58vh] mix-blend-multiply drop-shadow-sm select-none"
          />
        </div>
      </div>

      {/* Lower Hero Content: H1, Price Badge and CTAs */}
      <div className="relative z-20 max-w-7xl mx-auto w-full pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          
          {/* Left Column: Heading and Price chip */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-[#101010] text-balance max-w-xl">
              Limpieza de sillones a domicilio en Santiago
            </h1>

            <div className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#101010]">
              <span className="px-2.5 py-1 bg-[#101010] text-[#EFEDE8] text-xs font-extrabold uppercase tracking-wider rounded-[2px]">
                Valor neto
              </span>
              <span>Sillones desde $25.000 <span className="text-xs font-semibold text-[#6B6862]">+ IVA</span></span>
              <span className="text-xs text-[#6B6862] hidden sm:inline">· Despacho $0 en Prov. Santiago</span>
            </div>
          </div>

          {/* Right Column: High-conversion CTAs */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:justify-end">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="group h-[52px] px-7 bg-[#101010] text-[#EFEDE8] hover:bg-[#252525] rounded-[2px] font-bold text-[13px] tracking-[0.1em] uppercase flex items-center justify-center gap-3 transition-all cursor-pointer shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#1F7A4D]" />
              <span>Cotizar por WhatsApp</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1.5 font-sans">
                →
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                trackEvent('cta_click', { action: 'armar_pedido', location: 'hero' });
                onArmarPedido();
              }}
              className="h-[52px] px-6 border border-[#101010] text-[#101010] hover:bg-[#101010] hover:text-[#EFEDE8] rounded-[2px] font-bold text-[13px] tracking-[0.1em] uppercase transition-colors flex items-center justify-center cursor-pointer"
            >
              Armar mi pedido
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden md:flex items-center gap-3 pt-8 pb-1 text-[#6B6862] text-[11px] font-semibold tracking-[0.16em] uppercase">
          <span>Desplaza para conocer servicios</span>
          <div className="w-12 h-[1px] bg-[#101010]/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#101010] animate-[pulse_2s_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
};
