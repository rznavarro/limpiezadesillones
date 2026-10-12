import React, { useEffect, useRef } from 'react';
import { OrderItem } from '../types';
import { BUSINESS_INFO } from '../data/pricingData';
import { formatCLP, trackEvent } from '../utils/gtm';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearOrder: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearOrder,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotalNeto = items.reduce((sum, item) => sum + item.pricePerUnit * item.quantity, 0);
  const iva = Math.round(subtotalNeto * 0.19);
  const totalAprox = subtotalNeto + iva;

  const minOrder = BUSINESS_INFO.minimumOrder;
  const faltante = Math.max(0, minOrder - subtotalNeto);
  const progressPercent = Math.min(100, Math.round((subtotalNeto / minOrder) * 100));

  const handleSendWhatsApp = () => {
    trackEvent('order_sent', {
      subtotalNeto,
      totalAprox,
      itemCount: items.length,
      isBelowMinimum: subtotalNeto < minOrder,
    });

    let messageText = 'Hola, quiero agendar este pedido:\n';
    items.forEach((item) => {
      const lineTotal = item.pricePerUnit * item.quantity;
      const unit = item.isSqMeters ? 'm²' : '';
      messageText += `• ${item.name} × ${item.quantity}${unit} — ${formatCLP(lineTotal)}\n`;
    });

    messageText += `\nSubtotal neto: ${formatCLP(subtotalNeto)} + IVA (total aprox. ${formatCLP(totalAprox)})\n`;
    if (subtotalNeto < minOrder) {
      messageText += `(Nota: Este pedido de referencia está bajo el mínimo de ${formatCLP(minOrder)} + IVA)\n`;
    }
    messageText += 'Mi comuna es: ';

    const encoded = encodeURIComponent(messageText);
    window.location.href = `${BUSINESS_INFO.whatsappUrl}?text=${encoded}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        aria-hidden="true"
      />

      {/* Drawer / Sheet container */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-title"
        className="relative z-10 w-full max-w-[440px] bg-[#EFEDE8] h-full sm:h-full max-h-screen flex flex-col justify-between shadow-2xl border-l border-[#101010]/15 animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#101010]/10 flex items-center justify-between bg-[#F7F6F2]">
          <div className="flex items-center gap-2">
            <h2 id="order-title" className="text-xl font-extrabold uppercase tracking-tight text-[#101010]">
              Mi pedido
            </h2>
            <span className="px-2 py-0.5 bg-[#101010] text-[#EFEDE8] text-xs font-black rounded-[2px] tabular-nums">
              {items.length}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#6B6862] hover:text-[#101010] hover:bg-[#EFEDE8] rounded-[2px] transition-colors cursor-pointer"
            aria-label="Cerrar pedido"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="py-16 text-center text-[#6B6862]">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#101010]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="font-bold text-[#101010] text-base mb-1">Tu pedido está vacío</p>
              <p className="text-sm">Agrega sillones, colchones, sillas, alfombras o autos desde la lista de precios.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs text-[#6B6862] font-semibold uppercase tracking-wider pb-2 border-b border-[#101010]/10">
                <span>Servicios seleccionados</span>
                <button
                  type="button"
                  onClick={onClearOrder}
                  className="hover:text-[#101010] underline cursor-pointer"
                >
                  Vaciar todo
                </button>
              </div>

              {items.map((item) => {
                const lineTotal = item.pricePerUnit * item.quantity;
                return (
                  <div
                    key={item.id}
                    className="p-4 bg-[#F7F6F2] border border-[#101010]/10 rounded-[2px] flex flex-col gap-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-extrabold text-[#101010] text-sm leading-snug">
                          {item.name}
                        </div>
                        <div className="text-xs text-[#6B6862] mt-0.5">
                          {formatCLP(item.pricePerUnit)} {item.isSqMeters ? 'por m²' : 'c/u'}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#6B6862] hover:text-red-700 p-1 text-xs transition-colors cursor-pointer"
                        aria-label={`Eliminar ${item.name}`}
                      >
                        ✕
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#101010]/5">
                      <div className="flex items-center gap-2 bg-[#EFEDE8] border border-[#101010]/15 rounded-[2px] p-0.5">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center font-bold text-sm text-[#101010] hover:bg-white rounded-[2px] cursor-pointer"
                          aria-label="Restar 1"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-extrabold text-xs text-[#101010] tabular-nums">
                          {item.quantity}{item.isSqMeters ? 'm²' : ''}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center font-bold text-sm text-[#101010] hover:bg-white rounded-[2px] cursor-pointer"
                          aria-label="Sumar 1"
                        >
                          +
                        </button>
                      </div>

                      <div className="font-extrabold text-sm text-[#101010] tabular-nums">
                        {formatCLP(lineTotal)} <span className="text-[10px] font-medium text-[#6B6862]">+ IVA</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Drawer Footer & Checkout */}
        <div className="p-6 bg-[#F7F6F2] border-t border-[#101010]/10 flex flex-col gap-4">
          
          {/* Minimum Order Progress Bar */}
          {items.length > 0 && (
            <div className="p-3 bg-[#EFEDE8] border border-[#101010]/10 rounded-[2px]">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-[#101010]">
                  {subtotalNeto >= minOrder ? (
                    <span className="text-[#1F7A4D]">✓ Pedido mínimo alcanzado</span>
                  ) : (
                    <span>Pedido mínimo: {formatCLP(minOrder)} + IVA</span>
                  )}
                </span>
                <span className="text-[#6B6862] tabular-nums">{progressPercent}%</span>
              </div>

              <div className="w-full h-1.5 bg-[#101010]/10 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    subtotalNeto >= minOrder ? 'bg-[#1F7A4D]' : 'bg-[#101010]'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {faltante > 0 && (
                <p className="text-[11px] text-[#6B6862] mt-1.5">
                  Te faltan <strong>{formatCLP(faltante)}</strong> para el pedido mínimo de {formatCLP(minOrder)} + IVA.
                </p>
              )}
            </div>
          )}

          {/* Pricing calculations */}
          <div className="space-y-1.5 text-xs text-[#6B6862] pt-1">
            <div className="flex items-center justify-between">
              <span>Subtotal neto:</span>
              <span className="font-bold text-[#101010] tabular-nums text-sm">{formatCLP(subtotalNeto)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>IVA estimado (19%):</span>
              <span className="tabular-nums font-medium text-[#101010]">{formatCLP(iva)}</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#101010]/10 text-sm font-extrabold text-[#101010]">
              <span>Total de referencia:</span>
              <span className="text-base tabular-nums">{formatCLP(totalAprox)}</span>
            </div>
          </div>

          {/* Fixed shipping note */}
          <p className="text-[11px] text-[#6B6862] leading-tight">
            <strong>Sin recargo por distancia</strong> dentro de la Provincia de Santiago. Otras comunas: cargo adicional según comuna.
          </p>

          {/* WhatsApp Submit Action */}
          <button
            type="button"
            disabled={items.length === 0}
            onClick={handleSendWhatsApp}
            className="w-full h-[52px] bg-[#101010] text-[#EFEDE8] hover:bg-[#252525] disabled:opacity-40 disabled:cursor-not-allowed rounded-[2px] font-bold text-xs tracking-[0.1em] uppercase flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#1F7A4D]" />
            <span>Enviar pedido por WhatsApp</span>
            <span className="font-sans">→</span>
          </button>
        </div>

      </div>
    </div>
  );
};
