import React, { useState } from 'react';
import { trackEvent } from '../utils/gtm';
import { BUSINESS_INFO } from '../data/pricingData';

interface NavbarProps {
  orderCount: number;
  onOpenOrder: () => void;
  scrollProgress: number;
}

export const Navbar: React.FC<NavbarProps> = ({ orderCount, onOpenOrder, scrollProgress }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleWhatsAppClick = (location: string) => {
    trackEvent('whatsapp_click', { location });
    const message = encodeURIComponent('Hola, quiero cotizar una limpieza de tapices a domicilio. Mi comuna es: ');
    window.location.href = `${BUSINESS_INFO.whatsappUrl}?text=${message}`;
  };

  const handleCallClick = (location: string) => {
    trackEvent('call_click', { location });
    window.location.href = `tel:${BUSINESS_INFO.whatsappNumber}`;
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* 0. Top announcement banner */}
      <div className="w-full bg-[#101010] text-[#EFEDE8] text-[12px] font-medium tracking-[0.12em] uppercase py-2.5 px-4 text-center select-none overflow-hidden border-b border-black/10">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="hidden sm:inline">Sin recargo por distancia en la Provincia de Santiago</span>
          <span className="hidden sm:inline opacity-40">·</span>
          <span>Atendemos de lunes a domingo (10:00 · 14:00 · 17:00)</span>
        </div>
      </div>

      {/* 1. Sticky Navigation */}
      <header className="sticky top-0 z-40 w-full bg-[rgba(239,237,232,0.92)] backdrop-blur-md border-b border-[#101010]/10 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Wordmark */}
          <a
            href="#inicio"
            onClick={closeMenu}
            className="text-[14px] font-extrabold tracking-[0.14em] uppercase text-[#101010] shrink-0 hover:opacity-80 transition-opacity"
          >
            Limpieza de Sillones
          </a>

          {/* Zone 2: Navigation Links (>= 900px) */}
          <nav className="hidden min-[900px]:flex items-center gap-7 text-[13px] font-semibold tracking-[0.08em] uppercase text-[#6B6862]">
            <a href="#servicios" className="hover:text-[#101010] transition-colors py-1">Servicios</a>
            <a href="#metodo" className="hover:text-[#101010] transition-colors py-1">Método</a>
            <a href="#precios" className="hover:text-[#101010] transition-colors py-1">Precios</a>
            <a href="#para-quien" className="hover:text-[#101010] transition-colors py-1">Hoteles</a>
            <a href="#autos" className="hover:text-[#101010] transition-colors py-1">Autos</a>
            <a href="#condiciones" className="hover:text-[#101010] transition-colors py-1">Condiciones</a>
            <a href="#contacto" className="hover:text-[#101010] transition-colors py-1">Contacto</a>
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Order counter button */}
            <button
              type="button"
              onClick={() => {
                trackEvent('open_order', { location: 'navbar' });
                onOpenOrder();
              }}
              className="relative flex items-center gap-2 px-3 sm:px-4 py-2 border border-[#101010]/20 hover:border-[#101010] rounded-[2px] text-[13px] font-bold text-[#101010] bg-[#F7F6F2] transition-colors cursor-pointer"
              aria-label={`Ver mi pedido (${orderCount} ítems)`}
            >
              <svg className="w-4 h-4 text-[#101010]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="hidden min-[450px]:inline font-medium uppercase tracking-[0.06em]">Mi pedido</span>
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-extrabold bg-[#101010] text-[#EFEDE8] rounded-[2px] tabular-nums">
                {orderCount}
              </span>
            </button>

            {/* WhatsApp compact button */}
            <button
              type="button"
              onClick={() => handleWhatsAppClick('navbar')}
              className="flex items-center gap-2.5 px-4 py-2 bg-[#101010] text-[#EFEDE8] hover:bg-[#252525] rounded-[2px] text-[12px] font-bold tracking-[0.08em] uppercase transition-colors cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#1F7A4D] shrink-0" aria-hidden="true" />
              <span>WhatsApp</span>
            </button>

            {/* Hamburger trigger for mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-[900px]:hidden p-2 text-[#101010] border border-[#101010]/20 rounded-[2px] hover:border-[#101010] transition-colors cursor-pointer ml-1"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Scroll depth progress bar (#prog) */}
        <div
          id="prog"
          className="h-[2px] bg-[#101010] origin-left transition-transform duration-75"
          style={{ transform: `scaleX(${scrollProgress})` }}
          aria-hidden="true"
        />
      </header>

      {/* Mobile Full Screen Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-28 z-30 bg-[#EFEDE8] flex flex-col justify-between p-6 sm:p-8 border-t border-[#101010]/10 overflow-y-auto min-[900px]:hidden">
          <nav className="flex flex-col gap-5 pt-4">
            <a
              href="#servicios"
              onClick={closeMenu}
              className="text-3xl font-extrabold tracking-[-0.03em] uppercase text-[#101010] hover:text-[#6B6862] transition-colors"
            >
              01 — Servicios
            </a>
            <a
              href="#metodo"
              onClick={closeMenu}
              className="text-3xl font-extrabold tracking-[-0.03em] uppercase text-[#101010] hover:text-[#6B6862] transition-colors"
            >
              02 — Método
            </a>
            <a
              href="#precios"
              onClick={closeMenu}
              className="text-3xl font-extrabold tracking-[-0.03em] uppercase text-[#101010] hover:text-[#6B6862] transition-colors"
            >
              03 — Precios
            </a>
            <a
              href="#para-quien"
              onClick={closeMenu}
              className="text-3xl font-extrabold tracking-[-0.03em] uppercase text-[#101010] hover:text-[#6B6862] transition-colors"
            >
              04 — Hoteles & Oficinas
            </a>
            <a
              href="#autos"
              onClick={closeMenu}
              className="text-3xl font-extrabold tracking-[-0.03em] uppercase text-[#101010] hover:text-[#6B6862] transition-colors"
            >
              05 — Autos
            </a>
            <a
              href="#condiciones"
              onClick={closeMenu}
              className="text-3xl font-extrabold tracking-[-0.03em] uppercase text-[#101010] hover:text-[#6B6862] transition-colors"
            >
              06 — Condiciones
            </a>
            <a
              href="#contacto"
              onClick={closeMenu}
              className="text-3xl font-extrabold tracking-[-0.03em] uppercase text-[#101010] hover:text-[#6B6862] transition-colors"
            >
              07 — Contacto
            </a>
          </nav>

          <div className="pt-8 border-t border-[#101010]/10 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                closeMenu();
                handleWhatsAppClick('mobile_menu');
              }}
              className="w-full h-13 bg-[#101010] text-[#EFEDE8] rounded-[2px] font-bold tracking-[0.08em] uppercase text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#1F7A4D]" />
              Cotizar por WhatsApp
            </button>
            <button
              type="button"
              onClick={() => {
                closeMenu();
                handleCallClick('mobile_menu');
              }}
              className="w-full h-12 border border-[#101010] text-[#101010] rounded-[2px] font-bold tracking-[0.08em] uppercase text-sm flex items-center justify-center cursor-pointer"
            >
              Llamar al +56 9 7791 9980
            </button>
            <p className="text-xs text-[#6B6862] text-center pt-2">
              Lunes a domingo · Santiago, RM
            </p>
          </div>
        </div>
      )}
    </>
  );
};
