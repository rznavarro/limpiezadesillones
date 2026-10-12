import React, { useState } from 'react';
import { AUTO_ITEMS, BUSINESS_INFO } from '../data/pricingData';
import { VehicleTypeId, AutoPricingItem } from '../types';
import { formatCLP, trackEvent } from '../utils/gtm';
import autoImg from '../assets/images/auto_interior_1791823526332.jpg';

interface AutosSectionProps {
  onAddItem: (item: { id: string; name: string; pricePerUnit: number; quantity: number; vehicleTypeLabel?: string }) => void;
}

export const AutosSection: React.FC<AutosSectionProps> = ({ onAddItem }) => {
  const [vehicleType, setVehicleType] = useState<VehicleTypeId>('city');
  const [addedId, setAddedId] = useState<string | null>(null);

  const vehicleOptions: { id: VehicleTypeId; label: string; short: string }[] = [
    {
      id: 'city',
      label: 'City car, hatchback y sedán',
      short: 'City car / Sedán',
    },
    {
      id: 'station',
      label: 'Station, camionetas y jeep (2 corridas)',
      short: 'Station / Jeep 2 corridas',
    },
    {
      id: 'tres_corridas',
      label: 'Autos de 3 corridas de asientos',
      short: '3 corridas de asientos',
    },
  ];

  const currentVehicle = vehicleOptions.find((v) => v.id === vehicleType)!;

  const handleAddAuto = (item: AutoPricingItem) => {
    const price = item.prices[vehicleType];
    onAddItem({
      id: `${item.id}-${vehicleType}`,
      name: `${item.name} (${currentVehicle.short})`,
      pricePerUnit: price,
      quantity: 1,
      vehicleTypeLabel: currentVehicle.label,
    });

    trackEvent('add_to_order', {
      item: item.name,
      vehicle: currentVehicle.label,
      category: 'autos',
    });

    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1300);
  };

  const handleWhatsAppAuto = () => {
    trackEvent('whatsapp_click', { location: 'autos_section', vehicle: currentVehicle.label });
    const msg = encodeURIComponent(`Hola, quiero cotizar limpieza para mi auto. Tipo de vehículo: ${currentVehicle.label}`);
    window.location.href = `${BUSINESS_INFO.whatsappUrl}?text=${msg}`;
  };

  return (
    <section id="autos" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#101010]/10 bg-[#EFEDE8]">
      <div className="max-w-7xl mx-auto">
        
        {/* Eyebrow */}
        <span className="text-[12px] sm:text-[13px] font-semibold tracking-[0.14em] uppercase text-[#6B6862] block mb-3">
          06 — Tu auto también
        </span>

        {/* Split top */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-14">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[0.98] text-[#101010] mb-6 text-balance">
              Limpieza de tapiz e interior premium con vapor.
            </h2>
            <p className="text-base sm:text-lg text-[#6B6862] mb-6 leading-relaxed">
              El servicio integral de habitáculo incluye aspirado de alta potencia, lavado de tapicería a vapor, sanitización profunda y acondicionado de superficies:
            </p>

            {/* Inclusions 2 compact cols */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs sm:text-sm font-semibold text-[#101010] mb-6">
              <div className="flex items-center gap-2">
                <span className="text-[#6B6862]">✓</span>
                <span>Aspirado premium maletero y habitáculo</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#6B6862]">✓</span>
                <span>Limpieza de techo, asientos y alfombra</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#6B6862]">✓</span>
                <span>Plásticos, tablero y paneles de puerta</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#6B6862]">✓</span>
                <span>Tratamiento antibacteria y desodorización</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#6B6862]">✓</span>
                <span>Desmanchado difícil y retiro de pelos</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#6B6862]">✓</span>
                <span>Hidratación para tapiz de cuero</span>
              </div>
            </div>

            {/* Technical notes */}
            <div className="p-4 bg-[#F7F6F2] border border-[#101010]/10 rounded-[2px] text-xs text-[#6B6862] space-y-2">
              <p>
                <strong className="text-[#101010]">Cuidado del motor:</strong> El motor moderno tiene múltiples sensores electrónicos; conviene mantenerlo limpio para evitar averías y lavarlo con vapor al menos una vez al año.
              </p>
              <p>
                <strong className="text-[#101010]">Pulido y simonizado:</strong> Lavado de carrocería, eliminación de rayaduras superficiales y abrillantado espejo con 6 meses de garantía.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-[2px] overflow-hidden border border-[#101010]/10 bg-[#F7F6F2]">
              <img
                src={autoImg}
                alt="Interior automotriz impecable y tapiz sanitizado"
                loading="lazy"
                className="editorial-img w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Vehicle Selector Tabs */}
        <div className="mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-[#6B6862] mb-3">
            Selecciona el tamaño de tu vehículo para actualizar precios:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-1 bg-[#F7F6F2] border border-[#101010]/10 rounded-[2px]">
            {vehicleOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setVehicleType(opt.id)}
                className={`py-3 px-4 text-xs sm:text-sm font-bold tracking-[0.04em] uppercase rounded-[2px] text-center transition-all cursor-pointer ${
                  vehicleType === opt.id
                    ? 'bg-[#101010] text-[#EFEDE8]'
                    : 'text-[#6B6862] hover:text-[#101010]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {AUTO_ITEMS.map((item) => {
            const price = item.prices[vehicleType];
            const isAdded = addedId === item.id;

            return (
              <div
                key={item.id}
                className="bg-[#F7F6F2] border border-[#101010]/10 rounded-[2px] p-5 sm:p-6 flex flex-col justify-between hover:border-[#101010] transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-base sm:text-lg font-extrabold text-[#101010] leading-snug">
                      {item.name}
                    </h3>
                    {item.badge && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#101010] border border-[#101010] px-1.5 py-0.5 rounded-[2px] shrink-0 bg-[#EFEDE8]">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#6B6862] leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {item.note && (
                    <div className="text-[11px] font-bold text-[#101010] bg-[#EFEDE8] px-2 py-1 rounded-[2px] mb-4">
                      {item.note}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#101010]/10 flex items-center justify-between">
                  <div className="text-xl font-extrabold text-[#101010] tabular-nums">
                    {formatCLP(price)}{' '}
                    <span className="text-xs font-semibold text-[#6B6862]">+ IVA</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddAuto(item)}
                    className={`h-10 px-4 rounded-[2px] font-bold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center justify-center gap-1 ${
                      isAdded
                        ? 'bg-[#1F7A4D] text-[#EFEDE8]'
                        : 'bg-[#101010] text-[#EFEDE8] hover:bg-[#252525]'
                    }`}
                  >
                    {isAdded ? 'Agregado ✓' : '+ Agregar'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lower Banner & Vehicle WhatsApp CTA */}
        <div className="p-6 bg-[#F7F6F2] border border-[#101010]/10 rounded-[2px] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#6B6862]">
            <span className="font-bold text-[#101010]">Requisito del servicio automotriz:</span> El vehículo debe entregarse sin objetos de valor en su interior; la empresa no se responsabiliza por su pérdida.
          </div>
          <button
            type="button"
            onClick={handleWhatsAppAuto}
            className="w-full sm:w-auto shrink-0 h-11 px-6 bg-[#101010] text-[#EFEDE8] hover:bg-[#252525] rounded-[2px] font-bold text-xs tracking-[0.1em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#1F7A4D]" />
            <span>Cotizar mi auto por WhatsApp</span>
          </button>
        </div>

      </div>
    </section>
  );
};
