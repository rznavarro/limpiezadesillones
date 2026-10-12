import React from 'react';
import { BUSINESS_INFO } from '../data/pricingData';
import { trackEvent } from '../utils/gtm';

interface MobileBottomBarProps {
  isVisible: boolean;
  orderCount: number;
  onOpenOrder: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  isVisible,
  orderCount,
  onOpenOrder,
}) => {
  if (!isVisible) return null;

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', { location: 'mobile_bottom_bar' });
    const msg = encodeURIComponent('Hola, quiero cotizar una limpieza de tapices a domicilio. Mi comuna es: ');
    window.location.href = `${BUSINESS_INFO.whatsappUrl}?text=${msg}`;
  };

  const handleCall = () => {
    trackEvent('call_click', { location: 'mobile_bottom_bar' });
    window.location.href = `tel:${BUSINESS_INFO.whatsappNumber}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#EFEDE8]/95 backdrop-blur-md border-t border-[#101010]/15 px-3 py-2.5 flex items-center justify-between gap-2 shadow-lg min-[900px]:hidden safe-area-bottom animate-in slide-in-from-bottom duration-200">
      
      {/* WhatsApp action (60% width) */}
      <button
        type="button"
        onClick={handleWhatsApp}
        className="flex-1 h-12 bg-[#101010] text-[#EFEDE8] rounded-[2px] font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-xs active:bg-[#252525]"
      >
        <span className="w-2 h-2 rounded-full bg-[#1F7A4D]" />
        <span>WhatsApp</span>
      </button>

      {/* Direct Call action */}
      <button
        type="button"
        onClick={handleCall}
        className="h-12 px-4 border border-[#101010] text-[#101010] rounded-[2px] font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 cursor-pointer bg-[#F7F6F2] active:bg-[#EFEDE8]"
        aria-label="Llamar por teléfono"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span className="hidden min-[380px]:inline">Llamar</span>
      </button>

      {/* Cart / Order button */}
      <button
        type="button"
        onClick={() => {
          trackEvent('open_order', { location: 'mobile_bottom_bar' });
          onOpenOrder();
        }}
        className="relative h-12 px-4 bg-[#F7F6F2] border border-[#101010]/20 rounded-[2px] flex items-center justify-center text-[#101010] cursor-pointer active:bg-[#EFEDE8]"
        aria-label={`Ver pedido (${orderCount} ítems)`}
      >
        <svg className="w-5 h-5 text-[#101010]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 bg-[#101010] text-[#EFEDE8] text-[10px] font-extrabold flex items-center justify-center rounded-[2px] tabular-nums">
          {orderCount}
        </span>
      </button>

    </div>
  );
};
