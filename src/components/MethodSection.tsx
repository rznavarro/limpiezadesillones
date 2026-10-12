import React from 'react';
import steamImg from '../assets/images/method_steam_fabric_1791823517138.jpg';

export const MethodSection: React.FC = () => {
  const steps = [
    {
      term: 'Vapor y espuma activa',
      desc: 'Inyección profunda que disuelve suciedad arraigada y desinfecta las fibras sin empapar la tela.',
    },
    {
      term: 'Tratamiento de manchas',
      desc: 'Aplicación localizada de agentes desmanchadores específicos según el tipo de mancha y tejido.',
    },
    {
      term: 'Neutralización de olores',
      desc: 'Eliminación molecular de olores orgánicos, humedad y bacterias en el relleno interno.',
    },
    {
      term: 'Eliminación de pelo de mascotas',
      desc: 'Extracción minuciosa de pelos incrustados en costuras y texturas profundas del tapiz.',
    },
  ];

  return (
    <section id="metodo" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#101010]/10 bg-[#F7F6F2]">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Eyebrow */}
        <span className="text-[12px] sm:text-[13px] font-semibold tracking-[0.14em] uppercase text-[#6B6862] block mb-4">
          02 — Método & Proceso
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Slogan, intro and definition list */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[0.98] text-[#101010] mb-6 text-balance">
                "Realizamos un minucioso trabajo con un acabado perfecto."
              </h2>
              <p className="text-lg font-medium text-[#6B6862] mb-8">
                Cada servicio de limpieza y sanitización de tapices incluye de forma estándar:
              </p>
            </div>

            {/* Definition List with 1px hairline dividers */}
            <dl className="border-t border-[#101010]/15 divide-y divide-[#101010]/15 mb-10">
              {steps.map((step, idx) => (
                <div key={idx} className="py-4.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6">
                  <dt className="text-base font-extrabold text-[#101010] shrink-0 sm:w-1/3">
                    {step.term}
                  </dt>
                  <dd className="text-sm text-[#6B6862] sm:w-2/3 leading-relaxed">
                    {step.desc}
                  </dd>
                </div>
              ))}
            </dl>

            <div>
              <a
                href="#precios"
                className="inline-flex items-center gap-3 px-7 h-[52px] bg-[#101010] text-[#EFEDE8] hover:bg-[#252525] rounded-[2px] font-bold text-xs tracking-[0.12em] uppercase transition-colors"
              >
                <span>Ver lista de precios</span>
                <span className="font-sans">→</span>
              </a>
            </div>
          </div>

          {/* Right Column: High-fidelity image of steam on fabric */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-[2px] overflow-hidden border border-[#101010]/10 bg-[#EFEDE8] shadow-sm">
              <img
                src={steamImg}
                alt="Detalle de tejido de lino con vapor sanitizante activo"
                loading="lazy"
                className="editorial-img w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#EFEDE8]/90 backdrop-blur-sm p-4 border border-[#101010]/10 text-xs text-[#101010] font-semibold flex items-center justify-between">
                <span>Vapor de alta temperatura + Espuma activa</span>
                <span className="text-[#6B6862]">Sin saturación de agua</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
