export type ServiceType = 'with-product' | 'without-product' | 'both';

export function normalizeServiceType(value?: string | null): ServiceType | undefined {
  if (!value) return undefined;

  const normalized = value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/\//g, '-');

  if (['with-product', 'with-products', 'withproduct', 'withproducts'].includes(normalized)) {
    return 'with-product';
  }

  if (['without-product', 'without-products', 'withoutproduct', 'withoutproducts'].includes(normalized)) {
    return 'without-product';
  }

  if (['both', 'all', 'flexible', 'either', 'both-options', 'with-product-without-product', 'with-products-without-products'].includes(normalized)) {
    return 'both';
  }

  return undefined;
}

export function getServiceTypeLabel(value?: string | null): string {
  const mode = normalizeServiceType(value);

  switch (mode) {
    case 'with-product':
      return 'With product';
    case 'without-product':
      return 'Without product';
    case 'both':
      return 'With / without product';
    default:
      return;
  }
}

export function normalizeSubCategory(value?: string | null): string | undefined {
  if (!value) return undefined;

  return value.toString().trim().toLowerCase().replace(/\s+/g, '-');
}

export function getSubCategoryLabel(value?: string | null): string {
  const normalized = normalizeSubCategory(value);

  switch (normalized) {
    case 'body':
      return 'Body Wax';
    default:
      return value?.toString().trim().replace(/\b\w/g, (letter) => letter.toUpperCase()) ?? '';
  }
}

export function getServiceVariants(service: Service, catalog: Service[] = SERVICES): Service[] {
  if (service.groupId) {
    const variants = catalog.filter((item) => item.groupId === service.groupId);
    return variants.length > 0 ? variants : [service];
  }

  if (normalizeServiceType(service.serviceType ?? service.productMode) === 'both') {
    return [
      {
        ...service,
        id: `${service.id}-with-product`,
        withoutProductPrice: service.withProductPrice ?? service.withoutProductPrice,
        discount: 0,
        serviceType: 'with-product',
      },
      {
        ...service,
        id: `${service.id}-without-product`,
        withoutProductPrice: service.withoutProductPrice,
        serviceType: 'without-product',
      },
    ];
  }

  return [service];
}

export function getServicePrice(service: Service): number {
  const basePrice = service.withoutProductPrice ?? 0;
  const discount = Math.max(0, Math.min(100, service.discount ?? 0));
  return Math.round(basePrice * (1 - discount / 100));
}

export function hasServiceVariants(service: Service): boolean {
  return Boolean(
    service.groupId ||
      typeof service.withProductPrice === 'number' ||
      normalizeServiceType(service.serviceType ?? service.productMode) === 'both',
  );
}

export type Service = {
  id: string;
  category: string;
  name: string;
  /** Default and without-product list price. */
  withoutProductPrice: number;
  withProductPrice?: number;
  duration: number;
  image?: string;
  popular?: boolean;
  serviceType?: ServiceType | string;
  productMode?: ServiceType | string;
  discount?: number;
  subCategory?: string;
  groupId?: string;
};

export const SERVICES: Service[] = [
  // Threading
  { id: 't-1', category: 'Threading', name: 'Eyebrow', withoutProductPrice: 30, duration: 5, image: '/images/services/threading/eyebrow.webp' },
  { id: 't-2', category: 'Threading', name: 'Upper Lip', withoutProductPrice: 30, duration: 5, image: '/images/services/threading/upper-lip.webp' },
  { id: 't-3', category: 'Threading', name: 'Lower Lip', withoutProductPrice: 30, duration: 5, image: '/images/services/threading/lower-lip.webp' },
  { id: 't-4', category: 'Threading', name: 'Chin', withoutProductPrice: 30, duration: 5, image: '/images/services/threading/chin.webp' },
  { id: 't-5', category: 'Threading', name: 'Side Lock', withoutProductPrice: 60, duration: 15, image: '/images/services/threading/side-lock.webp' },
  { id: 't-6', category: 'Threading', name: 'Full Face', withoutProductPrice: 180, duration: 30, image: '/images/services/threading/full-face.webp' },
  { id: 't-7', category: 'Threading', name: 'Forehead', withoutProductPrice: 30, duration: 5, image: '/images/services/threading/forehead.webp' },
  
  // Peel Off Wax
  { id: 'pow-1', category: 'Wax', subCategory: 'Peel-Off Brazilian', name: 'forehead', withoutProductPrice: 59, withProductPrice: 69, serviceType: 'both', duration: 5, image: '/images/services/waxing/peel-off/forehead.png',
  { id: 'pow-2', category: 'Wax', subCategory: 'Peel-Off Brazilian', name: 'upper lip', withoutProductPrice: 59, withProductPrice: 69, serviceType: 'both', duration: 5, image:'/images/services/waxing/peel-off/upperlip.png'},
  { id: 'pow-3', category: 'Wax', subCategory: 'Peel-Off Brazilian', name: 'lower lip', withoutProductPrice: 59, withProductPrice: 69, serviceType: 'both', duration: 5, image: '/images/services/waxing/peel-off/lowerlip.png' },
  { id: 'pow-4', category: 'Wax', subCategory: 'Peel-Off Brazilian', name: 'chin', withoutProductPrice: 59, withProductPrice: 69, serviceType: 'both', duration: 5, image: '/images/services/waxing/peel-off/chin.png' },
  { id: 'pow-5', category: 'Wax', subCategory: 'Peel-Off Brazilian', name: 'side lock', withoutProductPrice: 60, withProductPrice: 149, serviceType: 'both', duration: 12, image: '/images/services/waxing/peel-off/side-lock.png' },
  { id: 'pow-6', category: 'Wax', subCategory: 'Peel-Off Brazilian', name: 'Full face', withoutProductPrice: 150, withProductPrice: 349, serviceType: 'both', duration: 30, image: '/images/services/waxing/peel-off/Full-face.png' },
  { id: 'pow-7', category: 'Wax', subCategory: 'Peel-Off Brazilian', name: 'underarms', withoutProductPrice: 59, withProductPrice: 80, serviceType: 'both', duration: 8, image: '/images/services/waxing/peel-off/underarms.png' },

  // Honey Wax
  { id: 'hw-1', category: 'Wax', subCategory: 'Honey', name: 'Full Arms + Full Legs + Underarms', withoutProductPrice: 380, withProductPrice: 549, serviceType: 'both', duration: 65, popular: true, image:'/images/services/waxing/honey/Full-Arms-Full-Legs- Underarms.png'},
  { id: 'hw-2', category: 'Wax', subCategory: 'Honey', name: 'Full Arms + Half Legs + Underarms ', withoutProductPrice: 300, withProductPrice: 449, serviceType: 'both', duration: 60, popular: true, image: '/images/services/waxing/honey/Full- Arms- Half Legs- Underarms.png' },
  { id: 'hw-3', category: 'Wax', subCategory: 'honey', name: 'Full Arms + Underarms', withoutProductPrice: 150, withProductPrice: 249, serviceType: 'both', duration: 31, image: '/images/services/waxing/honey/honey-Full-Arms- Underarms.png' },
  { id: 'hw-4', category: 'Wax', subCategory: 'Honey', name: 'Only Underarms', withoutProductPrice: 48, withProductPrice: 59, serviceType: 'both', duration: 8, image: '/images/services/waxing/honey/honey-Only-Underarms.png' },
  { id: 'hw-5', category: 'Wax', subCategory: 'Honey', name: 'Only Full Legs', withoutProductPrice: 200, withProductPrice: 259, serviceType: 'both', duration: 30, image: '/images/services/waxing/honey/honey-only-full-legs.png' },
  { id: 'hw-6', category: 'Wax', subCategory: 'Honey', name: 'Only Half Legs', withoutProductPrice: 150, withProductPrice: 249, serviceType: 'both', duration: 12, image: '/images/services/waxing/honey/honey-half-leg.png' },
  { id: 'hw-7', category: 'Wax', subCategory: 'Honey', name: 'Full Hand', withoutProductPrice: 150, withProductPrice: 249, serviceType: 'both', duration: 15, image: '/images/services/waxing/honey/honey-full-hand.png' },
  { id: 'hw-8', category: 'Wax', subCategory: 'Honey', name: 'Half Back', withoutProductPrice: 120, withProductPrice: 155, serviceType: 'both', duration: 25, image: '/images/services/waxing/honey/honey-half-back.png' },
  { id: 'hw-9', category: 'Wax', subCategory: 'Honey', name: 'Full Back', withoutProductPrice: 180, withProductPrice: 320, serviceType: 'both', duration: 30, image: '/images/services/waxing/honey/honey-full-back.png' },
  { id: 'hw-10', category: 'Wax', subCategory: 'Honey', name: 'bikini', withoutProductPrice: 300, withProductPrice: 599, serviceType: 'both', duration: 60, image: '/images/services/waxing/honey/honey-bikini.jpg' },
  { id: 'hw-11', category: 'Wax', subCategory: 'Honey', name: 'bikini + butt line', withoutProductPrice: 289, withProductPrice: 390, serviceType: 'both', duration: 70, image: '/images/services/waxing/honey/bikkini-butt-line.jpg' },
  { id: 'hw-12', category: 'Wax', subCategory: 'Honey', name: 'full Body', withoutProductPrice: 720, withProductPrice: 1299, serviceType: 'both', duration: 122, image: '/images/services/waxing/honey/honey-full-body.png' },
  { id: 'hw-13', category: 'Wax', subCategory: 'Honey', name: 'Stomach', withoutProductPrice: 120, withProductPrice: 240, serviceType: 'both',  duration: 25, image: '/images/services/waxing/honey/honey-stomach.png' },

  // Rica Wax
  { id: 'rw-1', category: 'Wax', subCategory: 'Rica', name: 'Full Arms + Full Legs + Underarms', withoutProductPrice: 385, withProductPrice: 899, serviceType: 'both', duration: 65, popular: true,image:'/images/services/waxing/rica-wax/Rica-Full-Arms-Full-Legs-Underarms.png'},
  { id: 'rw-2', category: 'Wax', subCategory: 'Rica', name: 'Full Arms + Half Legs + Underarms', withoutProductPrice: 300, withProductPrice: 799, serviceType: 'both', duration: 60, image:'/images/services/waxing/rica-wax/RIca-Full-Arms-Half-Legs-Underarms.png'},
  { id: 'rw-3', category: 'Wax', subCategory: 'Rica', name: 'Full Arms + Underarms', withoutProductPrice: 150, withProductPrice: 299, serviceType: 'both', duration: 31, image:'/images/services/waxing/rica-wax/Rica-Full-Arms-Underarms.png'},
  { id: 'rw-4', category: 'Wax', subCategory: 'Rica', name: 'Only Underarms', withoutProductPrice: 48, withProductPrice: 59, serviceType: 'both', duration: 8, image:'/images/services/waxing/rica-wax/Rica-Only-Underarms.png' },
  { id: 'rw-5', category: 'Wax', subCategory: 'Rica', name: 'Half Legs', withoutProductPrice: 150, withProductPrice: 399, serviceType: 'both', duration: 12, image:'/images/services/waxing/rica-wax/Rica-Half-Back.png'},
  { id: 'rw-6', category: 'Wax', subCategory: 'Rica', name: 'Full Legs', withoutProductPrice: 200, withProductPrice: 399, serviceType: 'both', duration: 30, image:'/images/services/waxing/rica-wax/Rica-Full-Legs.png'},
  { id: 'rw-7', category: 'Wax', subCategory: 'Rica', name: 'Full Arms', withoutProductPrice: 150, withProductPrice: 290, serviceType: 'both', duration: 15, image:'/images/services/waxing/rica-wax/Rica-Full-Arms.png' },
  { id: 'rw-8', category: 'Wax', subCategory: 'Rica', name: 'Half Back', withoutProductPrice: 120, withProductPrice: 280, serviceType: 'both', duration: 25, image:'/images/services/waxing/rica-wax/Rica-Half-Back.png' },
  { id: 'rw-9', category: 'Wax', subCategory: 'Rica', name: 'Full Back', withoutProductPrice: 180, withProductPrice: 459, serviceType: 'both', duration: 30, image:'/images/services/waxing/rica-wax/Rica-Full-Back.png'},
  { id: 'rw-10', category: 'Wax', subCategory: 'Rica', name: 'Bikini', withoutProductPrice: 300, withProductPrice: 699, serviceType: 'both', duration: 60, image:'/images/services/waxing/rica-wax/honey-bikini.jpg'},
  { id: 'rw-11', category: 'Wax', subCategory: 'Rica', name: 'Bikini + Butt Line', withoutProductPrice: 390, withProductPrice: 799, serviceType: 'both', duration: 70, image:'/images/services/waxing/rica-wax/bikkini-butt-line.jpg' },
  { id: 'rw-12', category: 'Wax', subCategory: 'Rica', name: 'Stomach', withoutProductPrice: 120, withProductPrice: 349, serviceType: 'both', duration: 25, image:'/images/services/waxing/rica-wax/Rica-Stomach.png' },
  { id: 'rw-13', category: 'Wax', subCategory: 'Rica', name: 'Full Body', withoutProductPrice: 720, withProductPrice: 1599, serviceType: 'both', duration: 120, image:'/images/services/waxing/rica-wax/Rica-Full Body.png'},

  // Gel Wax
  { id: 'gw-1', category: 'Wax', subCategory: 'Gel', name: 'Full Arms + Full Legs + Underarms', withoutProductPrice: 385, withProductPrice: 699, serviceType: 'both', duration: 65 },
  { id: 'gw-2', category: 'Wax', subCategory: 'Gel', name: 'Full Arms + Half Legs + Underarms', withoutProductPrice: 300, withProductPrice: 599, serviceType: 'both', duration: 60 },
  { id: 'gw-3', category: 'Wax', subCategory: 'Gel', name: 'Full Arms + Underarms', withoutProductPrice: 150, withProductPrice: 449, serviceType: 'both', duration: 31 },
  { id: 'gw-4', category: 'Wax', subCategory: 'Gel', name: 'Only Underarms', withoutProductPrice: 48, withProductPrice: 75, serviceType: 'both', duration: 8 },
  { id: 'gw-5', category: 'Wax', subCategory: 'Gel', name: 'Half Legs', withoutProductPrice: 150, withProductPrice: 389, serviceType: 'both', duration: 15 },
  { id: 'gw-6', category: 'Wax', subCategory: 'Gel', name: 'Full Hand', withoutProductPrice: 200, withProductPrice: 399, serviceType: 'both', duration: 30 },
  { id: 'gw-7', category: 'Wax', subCategory: 'Gel', name: 'Only Arms', withoutProductPrice: 150, withProductPrice: 389, serviceType: 'both', duration: 15 },
  { id: 'gw-8', category: 'Wax', subCategory: 'Gel', name: 'Half Back', withoutProductPrice: 120, withProductPrice: 295, serviceType: 'both', duration: 25 },
  { id: 'gw-9', category: 'Wax', subCategory: 'Gel', name: 'Full Back', withoutProductPrice: 180, withProductPrice: 395, serviceType: 'both', duration: 30 },
  { id: 'gw-10', category: 'Wax', subCategory: 'Gel', name: 'Bikini', withoutProductPrice: 300, withProductPrice: 699, serviceType: 'both', duration: 60 },
  { id: 'gw-11', category: 'Wax', subCategory: 'Gel', name: 'Bikini + Butt Line', withoutProductPrice: 390, withProductPrice: 799, serviceType: 'both', duration: 70 },
  { id: 'gw-12', category: 'Wax', subCategory: 'Gel', name: 'Stomach', withoutProductPrice: 120, withProductPrice: 299, serviceType: 'both', duration: 25 },
  { id: 'gw-13', category: 'Wax', subCategory: 'Gel', name: 'Full Body', withoutProductPrice: 720,  withProductPrice: 1499, serviceType: 'both',duration: 120 },

  // Roll On Rica Wax
  { id: 'rorw-1', category: 'Wax', subCategory: 'Roll-ON', name: 'Full Arms + Full Legs + Underarms', withoutProductPrice: 799, duration: 80 },
  { id: 'rorw-2', category: 'Wax', subCategory: 'Roll-ON', name: 'Full Arms + Half Legs + Underarms', withoutProductPrice: 699, duration: 60 },
  { id: 'rorw-3', category: 'Wax', subCategory: 'Roll-ON', name: 'Full Body', withoutProductPrice: 1599, duration: 140 },
  { id: 'rorw-4', category: 'Wax', subCategory: 'Roll-ON', name: 'Hand Wax', withoutProductPrice: 380, duration: 25 },
  { id: 'rorw-5', category: 'Wax', subCategory: 'Roll-ON', name: 'Leg Wax', withoutProductPrice: 499, duration: 30 },
  { id: 'rorw-6', category: 'Wax', subCategory: 'Roll-ON', name: 'Half Leg', withoutProductPrice: 395, duration: 25 },
  { id: 'rorw-7', category: 'Wax', subCategory: 'Roll-ON', name: 'Full Back', withoutProductPrice: 390, duration: 30 },
  { id: 'rorw-8', category: 'Wax', subCategory: 'Roll-ON', name: 'Stomach', withoutProductPrice: 380, duration: 25 },

  // Mani and Pedi
  { id: 'mp-1', category: 'Mani and Pedi', name: 'De-Tan Mani Pedi', withoutProductPrice: 795, duration: 145, popular: true },
  { id: 'mp-2', category: 'Mani and Pedi', name: 'O3+ Luxury Crystal Spa Mani Pedi', withoutProductPrice: 1250, duration: 140 },
  { id: 'mp-3', category: 'Mani and Pedi', name: 'O3+ Pedicure', withoutProductPrice: 649, duration: 60 },
  { id: 'mp-4', category: 'Mani and Pedi', name: 'Korean Mani Pedi', withoutProductPrice: 1199, duration: 100, popular: true },
  { id: 'mp-5', category: 'Mani and Pedi', name: 'Korean Pedicure', withoutProductPrice: 699, duration: 60 },
  { id: 'mp-6', category: 'Mani and Pedi', name: 'Korean Manicure', withoutProductPrice: 600, duration: 45 },
  { id: 'mp-7', category: 'Mani and Pedi', name: 'De-Tan Pedicure', withoutProductPrice: 599, duration: 60 },
  { id: 'mp-8', category: 'Mani and Pedi', name: 'O3+ Manicure', withoutProductPrice: 595, duration: 45 },
  { id: 'mp-9', category: 'Mani and Pedi', name: 'Cut + File + Polish', withoutProductPrice: 120, duration: 20 },
  { id: 'mp-10', category: 'Mani and Pedi', name: 'Nail Paint Apply', withoutProductPrice: 59, duration: 10 },

  // Hair Care
  { id: 'hc-1', category: 'Hair Care', name: 'Touch-Up - On Product', withoutProductPrice: 399, duration: 30 },
  { id: 'hc-2', category: 'Hair Care', name: 'Henna Application', withoutProductPrice: 240, duration: 40},

  // Bleach
  { id: 'bl-1', category: 'Bleach', name: 'Full Face + Neck', withoutProductPrice: 120, withProductPrice: 195, serviceType: 'both', duration: 30 },
  { id: 'bl-2', category: 'Bleach', name: 'Full Arm', withoutProductPrice: 150, withProductPrice: 349, serviceType: 'both', duration: 30 },
  { id: 'bl-3', category: 'Bleach', name: 'Full Back', withoutProductPrice: 200, withProductPrice: 409, serviceType: 'both', duration: 30 },
  { id: 'bl-4', category: 'Bleach', name: 'Half Back', withoutProductPrice: 150, withProductPrice: 280, serviceType: 'both', duration: 35 },
  { id: 'bl-5', category: 'Bleach', name: 'Full Body', withoutProductPrice: 510, withProductPrice: 759, serviceType: 'both', duration: 60 },
  { id: 'bl-6', category: 'Bleach', name: 'Stomach', withoutProductPrice: 180, withProductPrice: 409, serviceType: 'both' ,duration: 30 },
  { id: 'bl-7', category: 'Bleach', name: 'Only Underarms', withoutProductPrice: 99, withProductPrice: 199, serviceType: 'both', duration: 20 },

  // Body Scrub
  { id: 'bs-1', category: 'Body Scrub', name: 'Full Body Scrub', withoutProductPrice: 549, duration: 60 },
  { id: 'bs-2', category: 'Body Scrub', name: 'Full Hand Scrub', withoutProductPrice: 299, duration: 20 },
  { id: 'bs-3', category: 'Body Scrub', name: 'Full Back Scrub', withoutProductPrice: 359, duration: 30 },
  { id: 'bs-4', category: 'Body Scrub', name: 'Full Leg Scrub', withoutProductPrice: 299, duration: 20 },
  { id: 'bs-5', category: 'Body Scrub', name: 'Half Back Scrub', withoutProductPrice: 285, duration: 20 },

  // Body Polishing
  { id: 'bp-1', category: 'Body Polishing', name: 'Full Body Polishing', withoutProductPrice: 1599, duration: 100 },
  { id: 'bp-2', category: 'Body Polishing', name: 'Hydra Glow Body Polishing', withoutProductPrice: 4999, duration: 165, popular: true },

  // Body Spa & Massage
  { id: 'bm-1', category: 'Body Spa & Massage', name: 'Full Body Spa', withoutProductPrice: 1049, duration: 60, popular: true },
  { id: 'bm-2', category: 'Body Spa & Massage', name: 'Head Massage (15 min)', withoutProductPrice: 90, duration: 15 },
  { id: 'bm-3', category: 'Body Spa & Massage', name: 'Head Massage (20 min)', withoutProductPrice: 120, duration: 20 },
  { id: 'bm-4', category: 'Body Spa & Massage', name: 'Head Massage (30 min)', withoutProductPrice: 180, duration: 30 },
  { id: 'bm-5', category: 'Body Spa & Massage', name: 'Head + Neck + Shoulder Massage', withoutProductPrice: 460, duration: 30 },
  { id: 'bm-6', category: 'Body Spa & Massage', name: 'Full Back Massage', withoutProductPrice: 499, duration: 30 },
  { id: 'bm-7', category: 'Body Spa & Massage', name: 'Foot Massage', withoutProductPrice: 299, duration: 20 },
  { id: 'bm-8', category: 'Body Spa & Massage', name: 'Head + Foot Massage', withoutProductPrice: 320, duration: 30 },

  // Spa Treatments
  { id: 'sp-1', category: 'Spa', name: 'Aroma Relaxation Spa', withoutProductPrice: 799, duration: 75, popular: true },
  { id: 'sp-2', category: 'Spa', name: 'Detox Body Spa', withoutProductPrice: 999, duration: 90 },
  { id: 'sp-3', category: 'Spa', name: 'Hydra Glow Spa', withoutProductPrice: 1299, duration: 100 },
  { id: 'sp-4', category: 'Spa', name: 'Foot Spa & Massage', withoutProductPrice: 459, duration: 45 },
  { id: 'sp-5', category: 'Spa', name: 'Mini Spa Refresh', withoutProductPrice: 549, duration: 40 },

  // Basic Cleanup
  { id: 'cu-1', category: 'Basic Cleanup', name: 'Fruit Cleanup - 5 Steps', withoutProductPrice: 270, withProductPrice: 499, serviceType: 'both', duration: 45 },
  { id: 'cu-2', category: 'Basic Cleanup', name: 'De-Tan Cleanup - 6 Steps', withoutProductPrice: 270, withProductPrice: 499, serviceType: 'both', duration: 45 },
  { id: 'cu-3', category: 'Basic Cleanup', name: 'Red Wine Skin Tightening Cleanup - 6 Steps', withoutProductPrice: 270, withProductPrice: 499, serviceType: 'both', duration: 45 },

  // Basic Facial
  { id: 'bf-1', category: 'Facial', subCategory: 'Basic', name: 'Fruit Facial - 5 Steps', withoutProductPrice: 380,  withProductPrice: 599, serviceType: 'both', duration: 65 },
  { id: 'bf-2', category: 'Facial', subCategory: 'Basic', name: 'De-Tan Facial - 6 Steps', withoutProductPrice: 380, withProductPrice: 699, serviceType: 'both', duration: 65 },
  { id: 'bf-3', category: 'Facial', subCategory: 'Basic', name: 'Red Wine Skin Tightening Facial - 6 Steps', withoutProductPrice: 380, withProductPrice: 699, serviceType: 'both', duration: 65 },
  { id: 'bf-4', category: 'Facial', subCategory: 'Basic', name: 'Gold Facial - 4 Steps', withoutProductPrice: 380, withProductPrice: 599, serviceType: 'both', duration: 65 },
  { id: 'bf-5', category: 'Facial', subCategory: 'Basic', name: 'Diamond Facial - 4 Steps', withoutProductPrice: 380, withProductPrice: 599, serviceType: 'both', duration: 65 },
  { id: 'bf-6', category: 'Facial', subCategory: 'Basic', name: 'Aroma Magic Facial - 7 Steps', withoutProductPrice: 380, withProductPrice: 699, serviceType: 'both', duration: 65 },

  // Classic Facial
  { id: 'cf-1', category: 'Facial', subCategory: 'Classic', name: 'Korean Facial', withoutProductPrice: 599, withProductPrice: 1199, serviceType: 'both', duration: 75, popular: true },
  { id: 'cf-2', category: 'Facial', subCategory: 'Classic', name: "Shine's Glow O3+ Facial", withoutProductPrice: 420, withProductPrice: 1295, serviceType: 'both', duration: 60 },
  { id: 'cf-3', category: 'Facial', subCategory: 'Classic', name: 'O3+ Bridal Facial V-C', withoutProductPrice: 599, withProductPrice: 1549, serviceType: 'both', duration: 100 },
  { id: 'cf-4', category: 'Facial', subCategory: 'Classic', name: 'O3+ Radiant Glow Bridal Facial', withoutProductPrice: 599, withProductPrice: 1599, serviceType: 'both', duration: 100 },
  { id: 'cf-5', category: 'Facial', subCategory: 'Classic', name: 'Hydra Facial', withoutProductPrice: 599, withProductPrice: 1099, serviceType: 'both', duration: 70 },
  { id: 'cf-6', category: 'Facial', subCategory: 'Classic', name: 'FYC Bridal Glow Facial', withoutProductPrice: 599, withProductPrice: 1099, serviceType: 'both', duration: 70 },

  // Bridal & Combo Packages
  { id: 'bcp-1', category: 'Bridal & Combo Packages', name: 'Rica Wax + De-Tan Facial + Threading Combo', withoutProductPrice: 1624, duration: 145 },
  { id: 'bcp-2', category: 'Bridal & Combo Packages', name: 'Rica Wax + Red Wine Skin-Tightening Facial + O3 Pedicure Combo', withoutProductPrice: 1999, duration: 205 },
  { id: 'bcp-3', category: 'Bridal & Combo Packages', name: 'Bridal Shine Special Package', withoutProductPrice: 7040, duration: 215, popular: true },
];

export const SERVICE_CATEGORIES = Array.from(new Set(SERVICES.map(s => s.category)));

// Fixed add-on charges applied at checkout (from salon policy)
export const ADDON_CHARGES = {
  disposableKit: { label: 'Disposable Kit (Hygiene Essential)', price: 49 },
  transport: { label: 'Transport / Home Visit', price: 59 },
};

// Referral program shown on the site
export const REFERRAL_PROGRAM = {
  cashback: 100,
  freeServiceOptions: ['Eyebrow Threading', 'Upper Lip Threading', 'Forehead Waxing'],
};

// Product brands used at the salon
export const BRAND_PARTNERS = ['FYC', 'O3+', 'Aroma', 'Biotica', 'Korean'];
