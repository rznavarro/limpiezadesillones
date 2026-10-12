import { PricingItem, AutoPricingItem } from '../types';

export const BUSINESS_INFO = {
  brandName: 'Limpieza de Sillones',
  domain: 'limpiezadesillones.cl',
  whatsappNumber: '+56977919980',
  whatsappFormatted: '+56 9 7791 9980',
  whatsappUrl: 'https://wa.me/56977919980',
  phoneFixed: '(2) 2703 5051',
  phoneFixedTel: '+56227035051',
  postVentaNumber: '+56 9 5800 0838',
  postVentaTel: '+56958000838',
  email: 'limpiezadesillones.rm@gmail.com',
  hours: 'Lunes a domingo: 10:00 · 14:00 · 17:00',
  minimumOrder: 35000,
  slogan: 'Realizamos un minucioso trabajo con un acabado perfecto.',
};

export const PRICING_ITEMS: PricingItem[] = [
  // Sillones
  {
    id: 'sillon-1',
    name: 'Sillón 1 cuerpo',
    category: 'sillones',
    price: 25000,
    unitLabel: 'por sillón',
    description: 'Vapor y espuma profunda, tratamiento de manchas, neutralización de olores y retiro de pelos.',
  },
  {
    id: 'sillon-2',
    name: 'Sillón 2 cuerpos',
    category: 'sillones',
    price: 35000,
    unitLabel: 'por sillón',
    description: 'Vapor y espuma profunda, tratamiento de manchas, neutralización de olores y retiro de pelos.',
  },
  {
    id: 'sillon-3',
    name: 'Sillón 3 cuerpos',
    category: 'sillones',
    price: 40000,
    unitLabel: 'por sillón',
    description: 'Vapor y espuma profunda, tratamiento de manchas, neutralización de olores y retiro de pelos.',
  },

  // Colchones
  {
    id: 'colchon-1',
    name: 'Colchón 1 plaza',
    category: 'colchones',
    price: 30000,
    unitLabel: 'por colchón',
    description: 'Sanitización profunda con vapor de alta temperatura, eliminación de ácaros y olores.',
  },
  {
    id: 'colchon-2',
    name: 'Colchón 2 plazas',
    category: 'colchones',
    price: 40000,
    unitLabel: 'por colchón',
    description: 'Sanitización profunda con vapor de alta temperatura, desmanchado y neutralización.',
  },
  {
    id: 'colchon-qk',
    name: 'Colchón Queen o King',
    category: 'colchones',
    price: 45000,
    unitLabel: 'por colchón',
    description: 'Sanitización integral ambas caras con vapor de alta temperatura, ácaros y neutralización.',
  },

  // Sillas
  {
    id: 'silla',
    name: 'Silla (asiento y respaldo)',
    category: 'sillas',
    price: 7000,
    unitLabel: 'por silla',
    description: 'Limpieza y sanitización de tela en asiento y respaldo con vapor y espuma activa.',
  },

  // Hogar
  {
    id: 'hogar-bano',
    name: 'Baño (sanitización con vapor)',
    category: 'hogar',
    price: 60000,
    unitLabel: 'por unidad',
    description: 'Limpieza profunda y sanitización integral de baño con tratamiento antihongos.',
  },
  {
    id: 'hogar-cocina',
    name: 'Cocina y campana',
    category: 'hogar',
    price: 60000,
    unitLabel: 'por unidad',
    description: 'Limpieza profunda y desengrase especializado de superficies de cocina y campanas.',
  },
  {
    id: 'hogar-piso-limpieza',
    name: 'Piso flotante, cerámica o baldosa',
    category: 'hogar',
    price: 3500,
    unitLabel: 'por m²',
    isSqMeters: true,
    minSqMeters: 1,
    description: 'Solo limpieza profesional con vapor y productos específicos de suelo.',
  },
  {
    id: 'hogar-piso-recuperacion',
    name: 'Piso flotante (recuperación)',
    category: 'hogar',
    price: 4500,
    unitLabel: 'por m²',
    isSqMeters: true,
    minSqMeters: 1,
    description: 'Limpieza y tratamiento de recuperación de piso flotante desgastado.',
  },
  {
    id: 'hogar-alfombra-muro-sobre30',
    name: 'Alfombra muro a muro (sobre 30 m²)',
    category: 'hogar',
    price: 3500,
    unitLabel: 'por m²',
    isSqMeters: true,
    minSqMeters: 30,
    badge: 'Mejor precio',
    description: 'Lavado con espuma activa y vapor para superficies amplias de más de 30 m².',
  },
  {
    id: 'hogar-alfombra-muro-bajo30',
    name: 'Alfombra bajo 30 m² y alfombras sueltas',
    category: 'hogar',
    price: 5000,
    unitLabel: 'por m²',
    isSqMeters: true,
    minSqMeters: 1,
    description: 'Tratamiento delicado para alfombras sueltas y áreas compactas de muro a muro.',
  },
];

export const AUTO_ITEMS: AutoPricingItem[] = [
  {
    id: 'auto-promo-tapiz-motor',
    name: 'Tapiz e interior premium + Lavado de motor',
    badge: 'Más solicitado',
    prices: {
      city: 70000,
      station: 75000,
      tres_corridas: 85000,
    },
    description: 'Paquete completo: aspirado, maletero, techo, asientos, plásticos, motor a vapor y antibacteria.',
  },
  {
    id: 'auto-promo-aspirado-motor',
    name: 'Aspirado premium más plásticos + Lavado de motor',
    prices: {
      city: 45000,
      station: 45000,
      tres_corridas: 50000,
    },
    description: 'Aspirado minucioso de habitáculo, reacondicionamiento de plásticos y lavado de motor a vapor.',
  },
  {
    id: 'auto-tapiz-interior',
    name: 'Limpieza de tapiz e interior premium',
    badge: 'Mejor precio',
    prices: {
      city: 55000,
      station: 60000,
      tres_corridas: 70000,
    },
    description: 'Aspirado premium, maletero, techo, asientos, alfombra, plásticos, tablero, antibacteria y pelos.',
  },
  {
    id: 'auto-asientos-cuero',
    name: 'Solo lavado de asientos o hidratación de cuero',
    prices: {
      city: 35000,
      station: 35000,
      tres_corridas: 45000,
    },
    description: 'Tratamiento focalizado en butacas: lavado en profundidad o nutrición para tapicería de cuero.',
  },
  {
    id: 'auto-antibacterial',
    name: 'Antibacterial para sistema de ventilación',
    prices: {
      city: 30000,
      station: 30000,
      tres_corridas: 30000,
    },
    description: 'Sanitización y purificación de conductos de aire y climatización para eliminar bacterias y olores.',
  },
  {
    id: 'auto-aspirado-plasticos',
    name: 'Aspirado premium más plásticos',
    prices: {
      city: 30000,
      station: 35000,
      tres_corridas: 40000,
    },
    description: 'Aspirado meticuloso en recovecos y tratamiento restaurador mate para plásticos y tablero.',
  },
  {
    id: 'auto-motor',
    name: 'Lavado de motor a vapor',
    note: '$15.000 si se agrega a una limpieza de tapiz',
    prices: {
      city: 35000,
      station: 35000,
      tres_corridas: 40000,
    },
    description: 'Desengrase a vapor con cuidado de sensores. Mantiene el motor limpio para evitar averías.',
  },
  {
    id: 'auto-pulido',
    name: 'Pulido y simonizado de carrocería',
    prices: {
      city: 55000,
      station: 60000,
      tres_corridas: 70000,
    },
    description: 'Lavado de carrocería, eliminación de rayaduras superficiales y abrillantado espejo (6 meses de garantía).',
  },
];

export const FAQ_ITEMS = [
  {
    question: '¿Hay un pedido mínimo?',
    answer: 'Sí, el pedido mínimo total de servicios es de $35.000 + IVA. Puedes combinar distintos tipos de piezas o servicios para alcanzar el monto.',
  },
  {
    question: '¿Cobran por distancia?',
    answer: 'No cobramos recargo por distancia dentro de la Provincia de Santiago. Las comunas fuera de la Provincia de Santiago tienen un cargo adicional que se consulta y confirma según la comuna.',
  },
  {
    question: '¿Qué necesito tener en casa para el servicio?',
    answer: 'El domicilio debe contar con conexión eléctrica a no más de 30 metros del lugar donde se realizará el trabajo.',
  },
  {
    question: '¿Trabajan en edificios?',
    answer: 'Sí, trabajamos en departamentos y edificios. Es importante consultar previamente con la administración de tu comunidad si está permitido realizar el trabajo en las dependencias.',
  },
  {
    question: '¿Qué garantía tiene el trabajo realizado?',
    answer: 'Ofrecemos 4 días de garantía para limpieza de tapiz e interior, lavado de carrocería, motor, sillón, silla y alfombra. Y 6 meses de garantía para el servicio de pulido y simonizado de carrocería.',
  },
  {
    question: '¿Qué pasa si no se puede hacer el servicio el día agendado?',
    answer: 'Si el móvil llega al domicilio agendado y el servicio no se puede realizar por causas ajenas a la empresa, se cobran $10.000 más el cargo según comuna por costos operacionales.',
  },
  {
    question: '¿Los precios incluyen IVA?',
    answer: 'No, todos los precios informados en el sitio web son valores netos y no incluyen IVA (19%).',
  },
  {
    question: '¿Qué días y horarios atienden?',
    answer: 'Atendemos de lunes a domingo. Los horarios disponibles para iniciar el servicio en tu domicilio son a las 10:00, 14:00 y 17:00.',
  },
];
