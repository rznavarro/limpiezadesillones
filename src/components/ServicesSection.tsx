import React from 'react';
import { trackEvent } from '../utils/gtm';
import sofaImg from '../assets/images/service_sofa_1791823472663.jpg';
import mattressImg from '../assets/images/service_mattress_1791823481890.jpg';
import chairsImg from '../assets/images/service_chairs_1791823490706.jpg';
import rugImg from '../assets/images/service_rug_1791823499824.jpg';
import { CategoryId } from '../types';

interface ServicesSectionProps {
  onSelectCategory: (cat: CategoryId) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectCategory }) => {
  const services = [
    {
      id: 'sillones' as CategoryId,
      name: 'Sillones',
      priceText: 'Desde $25.000',
      description: '1, 2 y 3 cuerpos. Espuma profunda, sanitización a vapor y desmanchado.',
      image: sofaImg,
    },
    {
      id: 'colchones' as CategoryId,
      name: 'Colchones',
      priceText: 'Desde $30.000',
      description: '1 plaza, 2 plazas, Queen y King. Eliminación de ácaros y desodorización.',
      image: mattressImg,
    },
    {
      id: 'sillas' as CategoryId,
      name: 'Sillas',
      priceText: '$7.000 c/u',
      description: 'Asiento y respaldo tapizado. Limpieza activa a vapor y recuperación.',
      image: chairsImg,
    },
    {
      id: 'hogar' as CategoryId,
      name: 'Alfombras',
      priceText: 'Desde $3.500/m²',
      description: 'Muro a muro y alfombras sueltas. Tratamiento cuidadoso de fibras.',
      image: rugImg,
    },
  ];

  const handleClick = (cat: CategoryId, name: string) => {
    trackEvent('category_click', { category: name });
    onSelectCategory(cat);
    const element = document.getElementById('precios');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="servicios" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#101010]/10 bg-[#EFEDE8]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <span className="text-[12px] sm:text-[13px] font-semibold tracking-[0.14em] uppercase text-[#6B6862] block mb-3">
            01 — Qué limpiamos
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[0.96] text-[#101010] max-w-2xl text-balance">
              Tapices como recién llegados.
            </h2>
            <p className="text-base sm:text-lg text-[#6B6862] max-w-md leading-relaxed">
              Sillones, colchones, sillas y alfombras, limpiados en tu casa con espuma y vapor.
            </p>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item.id, item.name)}
              className="group cursor-pointer bg-[#F7F6F2] border border-[#101010]/10 rounded-[2px] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#101010]"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#EFEDE8]">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="editorial-img w-full h-full object-cover transition-transform duration-900 ease-out group-hover:scale-105"
                />
              </div>

              <div className="p-6 flex flex-col justify-between flex-1 gap-4">
                <div>
                  <h3 className="text-xl font-extrabold text-[#101010] tracking-tight mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-[#6B6862] line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#101010]/10 flex items-center justify-between">
                  <div className="font-extrabold text-[#101010] text-base">
                    {item.priceText} <span className="text-xs font-semibold text-[#6B6862]">+ IVA</span>
                  </div>
                  <span className="w-8 h-8 rounded-full border border-[#101010]/20 flex items-center justify-center text-sm font-bold text-[#101010] group-hover:bg-[#101010] group-hover:text-[#EFEDE8] group-hover:border-[#101010] transition-all">
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cross-service note */}
        <div className="mt-12 pt-8 border-t border-[#101010]/10 flex flex-wrap items-center justify-between gap-4 text-sm font-medium text-[#6B6862]">
          <p>Líneas complementarias para tu hogar o empresa:</p>
          <div className="flex flex-wrap gap-6 text-[#101010] font-bold">
            <a href="#precios" onClick={() => onSelectCategory('hogar')} className="hover:underline flex items-center gap-1.5">
              <span>Baños y cocinas</span>
              <span>→</span>
            </a>
            <a href="#precios" onClick={() => onSelectCategory('hogar')} className="hover:underline flex items-center gap-1.5">
              <span>Pisos flotantes</span>
              <span>→</span>
            </a>
            <a href="#autos" className="hover:underline flex items-center gap-1.5">
              <span>Limpieza de autos</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
