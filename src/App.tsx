/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { MethodSection } from './components/MethodSection';
import { PricingSection } from './components/PricingSection';
import { AudiencesSection } from './components/AudiencesSection';
import { GuaranteeSection } from './components/GuaranteeSection';
import { AutosSection } from './components/AutosSection';
import { ConditionsSection } from './components/ConditionsSection';
import { ContactSection } from './components/ContactSection';
import { OrderDrawer } from './components/OrderDrawer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { CategoryId, OrderItem } from './types';

const STORAGE_KEY = 'lds_order_cart_v1';

export default function App() {
  const [items, setItems] = useState<OrderItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback if local storage is restricted
    }
    return [];
  });

  const [activeCategory, setActiveCategory] = useState<CategoryId>('sillones');
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Persist order in local storage safely
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [items]);

  // Scroll listener for progress bar & mobile bottom bar visibility
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          setScrollY(y);

          const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
          const prog = maxScroll > 0 ? Math.min(1, Math.max(0, y / maxScroll)) : 0;
          setScrollProgress(prog);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for reveals and image color transitions
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            entry.target.classList.add('in');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll('.editorial-img, .rv');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Order Handlers
  const handleAddItem = (newItem: {
    id: string;
    name: string;
    pricePerUnit: number;
    quantity: number;
    isSqMeters?: boolean;
    vehicleTypeLabel?: string;
  }) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === newItem.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }
      return [
        ...prev,
        {
          id: newItem.id,
          name: newItem.name,
          pricePerUnit: newItem.pricePerUnit,
          quantity: newItem.quantity,
          isSqMeters: newItem.isSqMeters,
          vehicleTypeLabel: newItem.vehicleTypeLabel,
        },
      ];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is OrderItem => item !== null);
    });
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearOrder = () => {
    setItems([]);
  };

  const orderItemCount = items.reduce((sum, item) => sum + (item.isSqMeters ? 1 : item.quantity), 0);
  const orderTotalNet = items.reduce((sum, item) => sum + item.pricePerUnit * item.quantity, 0);

  const handleArmarPedido = () => {
    const el = document.getElementById('precios');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#EFEDE8] text-[#101010] flex flex-col justify-between selection:bg-[#101010] selection:text-[#EFEDE8]">
      {/* 0 & 1. Header & Navbar */}
      <Navbar
        orderCount={orderItemCount}
        onOpenOrder={() => setIsOrderOpen(true)}
        scrollProgress={scrollProgress}
      />

      <main>
        {/* 2. Hero */}
        <Hero onArmarPedido={handleArmarPedido} />

        {/* 3. Servicios */}
        <ServicesSection onSelectCategory={(cat) => setActiveCategory(cat)} />

        {/* 4. Método */}
        <MethodSection />

        {/* 5. Precios */}
        <PricingSection
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onAddItem={handleAddItem}
          orderTotalNet={orderTotalNet}
          orderItemCount={orderItemCount}
          onOpenOrder={() => setIsOrderOpen(true)}
        />

        {/* 6. Para quién (Hoteles, Hogares, Oficinas) */}
        <AudiencesSection />

        {/* 7. Garantía y datos */}
        <GuaranteeSection />

        {/* 8. Autos */}
        <AutosSection onAddItem={handleAddItem} />

        {/* 9. Condiciones (FAQ Accordion) */}
        <ConditionsSection />

        {/* 10 & 11. Contacto & Footer */}
        <ContactSection />
      </main>

      {/* "Mi pedido" Drawer / Bottom Sheet */}
      <OrderDrawer
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
        items={items}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearOrder={handleClearOrder}
      />

      {/* Mobile persistent bottom bar (shown after passing hero, hidden while drawer open) */}
      <MobileBottomBar
        isVisible={scrollY > 400 && !isOrderOpen}
        orderCount={orderItemCount}
        onOpenOrder={() => setIsOrderOpen(true)}
      />
    </div>
  );
}
