import React, { useState } from 'react';
import { PRICING_ITEMS } from '../data/pricingData';
import { CategoryId, PricingItem } from '../types';
import { formatCLP, trackEvent } from '../utils/gtm';

interface PricingSectionProps {
  activeCategory: CategoryId;
  onCategoryChange: (cat: CategoryId) => void;
  onAddItem: (item: { id: string; name: string; pricePerUnit: number; quantity: number; isSqMeters?: boolean }) => void;
  orderTotalNet: number;
  orderItemCount: number;
  onOpenOrder: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  activeCategory,
  onCategoryChange,
  onAddItem,
  orderTotalNet,
  orderItemCount,
  onOpenOrder,
}) => {
  const [addedButtonId, setAddedButtonId] = useState<string | null>(null);
  const [sillaQty, setSillaQty] = useState<number>(6);
  const [m2Values, setM2Values] = useState<Record<string, number>>({
    'hogar-piso-limpieza': 25,
    'hogar-piso-recuperacion': 25,
    'hogar-alfombra-muro-sobre30': 35,
    'hogar-alfombra-muro-bajo30': 15,
  });

  const categories: { id: CategoryId; label: string }[] = [
    { id: 'sillones', label: 'Sillones' },
    { id: 'colchones', label: 'Colchones' },
    { id: 'sillas', label: 'Sillas' },
    { id: 'hogar', label: 'Hogar & Pisos' },
  ];

  const filteredItems = PRICING_ITEMS.filter((item) => item.category === activeCategory);

  const handleAdd = (item: PricingItem) => {
    let qty = 1;
    if (item.id === 'silla') {
      qty = sillaQty;
    } else if (item.isSqMeters) {
      qty = m2Values[item.id] || item.minSqMeters || 1;
    }

    onAddItem({
      id: item.id,
      name: item.name,
      pricePerUnit: item.price,
      quantity: qty,
      isSqMeters: item.isSqMeters,
    });

    trackEvent('add_to_order', { item: item.name, quantity: qty, category: item.category });

    setAddedButtonId(item.id);
    setTimeout(() => {
      setAddedButtonId(null);
    }, 1300);
  };

  const handleM2Change = (itemId: string, val: number, min: number = 1) => {
    const safeVal = Math.max(min, isNaN(val) ? min : val);
    setM2Values((prev) => ({ ...prev, [itemId]: safeVal }));
  };

  return (
    <section id="precios" className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[#101010]/10 bg-[#EFEDE8]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-10 sm:mb-14">
          <span className="text-[12px] sm:text-[13px] font-semibold tracking-[0.14em] uppercase text-[#6B6862] block mb-3">
            03 — Precios claros & armador
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[0.96] text-[#101010]">
                Arma tu pedido.
              </h2>
              <p className="text-base sm:text-lg text-[#6B6862] mt-3">
                Valores netos, no incluyen IVA (19%). Pedido mínimo total: $35.000 + IVA.
              </p>
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#101010] bg-[#F7F6F2] py-2 px-3 border border-[#101010]/10 rounded-[2px] self-start md:self-auto">
              Prov. Santiago: Sin recargo de traslado
            </div>
          </div>
        </div>

        {/* Category Segmented Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F7F6F2] border border-[#101010]/10 rounded-[2px] max-w-xl mb-10 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryChange(cat.id)}
              className={`flex-1 min-w-[100px] py-2.5 px-4 text-xs sm:text-sm font-bold tracking-[0.06em] uppercase rounded-[2px] transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-[#101010] text-[#EFEDE8] shadow-sm'
                  : 'text-[#6B6862] hover:text-[#101010]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid of pricing cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isAdded = addedButtonId === item.id;
            const currentM2 = m2Values[item.id] || item.minSqMeters || 1;
            const lineTotal = item.isSqMeters
              ? item.price * currentM2
              : item.id === 'silla'
              ? item.price * sillaQty
              : item.price;

            return (
              <div
                key={item.id}
                className="group relative bg-[#F7F6F2] border border-[#101010]/10 rounded-[2px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 hover:border-[#101010]"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-xl font-extrabold text-[#101010] tracking-tight">
                      {item.name}
                    </h3>
                    {item.badge && (
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#101010] border border-[#101010] px-2 py-0.5 rounded-[2px] bg-[#EFEDE8]">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-[#6B6862] leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Quantitative controls if needed */}
                <div className="pt-4 border-t border-[#101010]/10 flex flex-col gap-4">
                  
                  {/* Sillas Quantity Selector */}
                  {item.id === 'silla' && (
                    <div className="flex items-center justify-between bg-[#EFEDE8] p-2.5 rounded-[2px] border border-[#101010]/10">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#6B6862]">Cantidad:</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setSillaQty((q) => Math.max(1, q - 1))}
                          className="w-7 h-7 bg-[#F7F6F2] border border-[#101010]/20 flex items-center justify-center font-bold text-sm text-[#101010] hover:border-[#101010] cursor-pointer"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-extrabold text-[#101010] text-sm tabular-nums">
                          {sillaQty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setSillaQty((q) => q + 1)}
                          className="w-7 h-7 bg-[#F7F6F2] border border-[#101010]/20 flex items-center justify-center font-bold text-sm text-[#101010] hover:border-[#101010] cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Square Meters input */}
                  {item.isSqMeters && (
                    <div className="flex items-center justify-between bg-[#EFEDE8] p-2.5 rounded-[2px] border border-[#101010]/10">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#6B6862]">
                        Metros cuadrados (m²):
                      </span>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          min={item.minSqMeters || 1}
                          value={currentM2}
                          onChange={(e) => handleM2Change(item.id, parseInt(e.target.value) || 1, item.minSqMeters || 1)}
                          className="w-16 h-8 text-center font-extrabold text-sm text-[#101010] bg-[#F7F6F2] border border-[#101010]/20 focus:border-[#101010] rounded-[2px] tabular-nums"
                        />
                        <span className="text-xs font-bold text-[#6B6862]">m²</span>
                      </div>
                    </div>
                  )}

                  {/* Price display and CTA button */}
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-2xl font-extrabold text-[#101010] tabular-nums tracking-tight">
                        {formatCLP(lineTotal)}{' '}
                        <span className="text-xs font-semibold text-[#6B6862] tracking-normal">+ IVA</span>
                      </div>
                      <div className="text-[11px] text-[#6B6862]">
                        {item.unitLabel}
                        {item.id === 'silla' && sillaQty > 1 && ` (${formatCLP(item.price)} c/u)`}
                        {item.isSqMeters && ` (${formatCLP(item.price)} por m²)`}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAdd(item)}
                      className={`h-11 px-5 rounded-[2px] font-bold text-xs tracking-[0.1em] uppercase transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                        isAdded
                          ? 'bg-[#1F7A4D] text-[#EFEDE8]'
                          : 'bg-[#101010] text-[#EFEDE8] hover:bg-[#252525]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <span>Agregado</span>
                          <span>✓</span>
                        </>
                      ) : (
                        <span>+ Agregar</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lower informational strip */}
        <div className="mt-12 p-5 bg-[#F7F6F2] border border-[#101010]/10 rounded-[2px] flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-[#6B6862]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-[#101010]">Condiciones clave:</span>
            <span>Sin recargo por distancia en Prov. Santiago</span>
            <span>·</span>
            <span>Conexión eléctrica a menos de 30 m</span>
            <span>·</span>
            <span>Turnos 10:00, 14:00 y 17:00</span>
          </div>
          <a href="#condiciones" className="text-[#101010] font-bold uppercase tracking-wider hover:underline flex items-center gap-1">
            <span>Ver todas las condiciones</span>
            <span>→</span>
          </a>
        </div>
      </div>

      {/* Sticky mini summary on desktop if order has items */}
      {orderItemCount > 0 && (
        <div className="hidden lg:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-30 bg-[#101010] text-[#EFEDE8] py-3 px-6 rounded-[2px] shadow-xl border border-white/10 items-center gap-6">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#EFEDE8]/70">
            Resumen activo
          </div>
          <div className="font-extrabold text-sm tabular-nums">
            {orderItemCount} {orderItemCount === 1 ? 'servicio' : 'servicios'} · Subtotal {formatCLP(orderTotalNet)}{' '}
            <span className="text-xs font-normal text-[#EFEDE8]/70">+ IVA</span>
          </div>
          <button
            type="button"
            onClick={onOpenOrder}
            className="px-4 py-1.5 bg-[#EFEDE8] text-[#101010] hover:bg-white text-xs font-bold uppercase tracking-wider rounded-[2px] transition-colors cursor-pointer"
          >
            Ver mi pedido →
          </button>
        </div>
      )}
    </section>
  );
};
