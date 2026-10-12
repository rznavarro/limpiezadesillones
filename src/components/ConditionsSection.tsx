import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/pricingData';

export const ConditionsSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  const toggleAccordion = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="condiciones" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#101010]/10 bg-[#F7F6F2]">
      <div className="max-w-4xl mx-auto">
        
        {/* Eyebrow */}
        <span className="text-[12px] sm:text-[13px] font-semibold tracking-[0.14em] uppercase text-[#6B6862] block mb-3">
          07 — Antes de agendar
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[0.96] text-[#101010] mb-4">
          Preguntas frecuentes y condiciones.
        </h2>
        <p className="text-base sm:text-lg text-[#6B6862] mb-12">
          Todo lo que necesitas saber antes de recibir a nuestro equipo en tu domicilio.
        </p>

        {/* Accordion list */}
        <div className="border-t border-[#101010]/15 divide-y divide-[#101010]/15">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-4">
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between text-left py-2 gap-4 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#101010]"
                >
                  <span className="text-lg sm:text-xl font-extrabold text-[#101010] group-hover:text-[#6B6862] transition-colors">
                    {faq.question}
                  </span>
                  <span className="w-8 h-8 rounded-full border border-[#101010]/20 flex items-center justify-center font-mono text-base font-bold text-[#101010] shrink-0 group-hover:border-[#101010] transition-colors">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="pt-2 pb-3 text-sm sm:text-base text-[#6B6862] leading-relaxed max-w-3xl animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
