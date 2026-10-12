import React from 'react';
import { BUSINESS_INFO } from '../data/pricingData';
import { trackEvent } from '../utils/gtm';

export const GuaranteeSection: React.FC = () => {
  const metrics = [
    {
      value: '7',
      label: 'Días a la semana',
      sub: 'Atención continua de lunes a domingo',
    },
    {
      value: '4',
      unit: 'días',
      label: 'Días de garantía',
      sub: 'En tapices, interiores, sillones y alfombras',
    },
    {
      value: '6',
      unit: 'meses',
      label: 'Meses de garantía',
      sub: 'En servicio de pulido y simonizado',
    },
    {
      value: '$0',
      label: 'Recargo de traslado',
      sub: 'En todas las comunas de la Prov. de Santiago',
    },
  ];

  return (
    <section id="garantia" className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#101010] text-[#EFEDE8]">
      <div className="max-w-7xl mx-auto">
        
        {/* Eyebrow */}
        <span className="text-[12px] sm:text-[13px] font-semibold tracking-[0.14em] uppercase text-[#EFEDE8]/60 block mb-4">
          05 — Con respaldo & garantía
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[0.98] text-[#EFEDE8] mb-14 max-w-2xl text-balance">
          Condiciones claras y garantía por escrito.
        </h2>

        {/* 4 Quantitative Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-12 border-b border-white/10">
          {metrics.map((item, index) => (
            <div key={index} className="flex flex-col justify-between">
              <div>
                <div className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight tabular-nums text-[#EFEDE8] mb-3">
                  {item.value}
                  {item.unit && <span className="text-2xl font-bold ml-1 text-[#EFEDE8]/60">{item.unit}</span>}
                </div>
                <div className="text-base font-extrabold text-[#EFEDE8] uppercase tracking-wider mb-1">
                  {item.label}
                </div>
              </div>
              <p className="text-xs text-[#EFEDE8]/60 leading-relaxed mt-2">
                {item.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Postventa line */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#EFEDE8]/60">
            Canal directo de seguimiento y atención post-servicio
          </div>
          <a
            href={`tel:${BUSINESS_INFO.postVentaTel}`}
            onClick={() => trackEvent('call_click', { channel: 'postventa' })}
            className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#EFEDE8] hover:text-white transition-colors"
          >
            <span>Servicio al cliente postventa:</span>
            <span className="underline underline-offset-4 font-mono">{BUSINESS_INFO.postVentaNumber}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
