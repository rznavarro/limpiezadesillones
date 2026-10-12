import React from 'react';
import { trackEvent } from '../utils/gtm';
import { BUSINESS_INFO } from '../data/pricingData';
import hotelImg from '../assets/images/hotel_interior_1791823536286.jpg';

export const AudiencesSection: React.FC = () => {
  const handleHotelWhatsApp = () => {
    trackEvent('whatsapp_click', { location: 'hoteles_b2b' });
    const msg = encodeURIComponent('Hola, escribo por limpieza y desinfección para un hotel o residencia. ');
    window.location.href = `${BUSINESS_INFO.whatsappUrl}?text=${msg}`;
  };

  return (
    <section id="para-quien" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#101010]/10 bg-[#EFEDE8]">
      <div className="max-w-7xl mx-auto">
        
        {/* Eyebrow */}
        <span className="text-[12px] sm:text-[13px] font-semibold tracking-[0.14em] uppercase text-[#6B6862] block mb-3">
          04 — Hogares, hoteles y oficinas
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[0.96] text-[#101010] mb-12 sm:mb-16 max-w-2xl text-balance">
          Servicio adaptado a cada espacio.
        </h2>

        {/* Lookbook Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Card A: Hogares (Cols 1-6) */}
          <div className="lg:col-span-6 bg-[#F7F6F2] border border-[#101010]/10 rounded-[2px] p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#6B6862] block mb-3">
                Particular
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#101010] tracking-tight mb-4">
                Hogares
              </h3>
              <p className="text-base sm:text-lg text-[#6B6862] leading-relaxed mb-6">
                Sillones, colchones, sillas y alfombras, en tu casa. Minucioso cuidado de cada tela y desmanchado profundo sin alterar la textura.
              </p>
            </div>
            <div className="pt-6 border-t border-[#101010]/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#101010]">
              <span>Lunes a domingo</span>
              <span>10:00 · 14:00 · 17:00</span>
            </div>
          </div>

          {/* Card B: Hoteles y residencias (Cols 7-12, shifted down) */}
          <div className="lg:col-span-6 bg-[#101010] text-[#EFEDE8] rounded-[2px] p-8 sm:p-10 flex flex-col justify-between lg:mt-8 shadow-sm">
            <div>
              <div className="relative aspect-[16/9] rounded-[2px] overflow-hidden mb-6 bg-[#252525]">
                <img
                  src={hotelImg}
                  alt="Habitación de hotel con sillones y ropa de cama sanitizada"
                  loading="lazy"
                  className="editorial-img w-full h-full object-cover"
                />
              </div>

              <span className="text-xs font-extrabold uppercase tracking-widest text-[#EFEDE8]/60 block mb-3">
                B2B & Hospitalidad
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#EFEDE8] tracking-tight mb-4">
                Hoteles y residencias
              </h3>
              <p className="text-base text-[#EFEDE8]/80 leading-relaxed mb-8">
                Imagina cuántos ácaros pueden acumular los sillones, sillas y colchones de tu hotel o residencia. Ofrece a tus huéspedes la posibilidad de descansar tranquilos con una desinfección a vapor profunda y certificable.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#EFEDE8]/70">
                Atención corporativa
              </span>
              <button
                type="button"
                onClick={handleHotelWhatsApp}
                className="h-11 px-5 bg-[#EFEDE8] text-[#101010] hover:bg-white rounded-[2px] font-bold text-xs tracking-[0.1em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-[#1F7A4D]" />
                <span>Cotizar para mi hotel</span>
              </button>
            </div>
          </div>

          {/* Card C: Oficinas y edificios (Cols 3-10 on desktop) */}
          <div className="lg:col-start-3 lg:col-span-8 bg-[#F7F6F2] border border-[#101010]/10 rounded-[2px] p-8 sm:p-10 mt-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#6B6862] block mb-3">
              Corporativo & Áreas Comunes
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#101010] tracking-tight mb-3">
              Oficinas y edificios
            </h3>
            <p className="text-base sm:text-lg text-[#6B6862] leading-relaxed mb-6">
              Pisos flotantes, baños con tratamiento antihongos y desengrase de cocinas y campanas. Tratamiento integral para dependencias laborales o comunitarias.
            </p>
            <div className="p-4 bg-[#EFEDE8] border border-[#101010]/10 rounded-[2px] text-xs text-[#6B6862]">
              <span className="font-bold text-[#101010]">Nota para edificios:</span> En edificios y condominios, te sugerimos consultar previamente con la administración si se permite realizar trabajos de limpieza con maquinaria en las dependencias.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
