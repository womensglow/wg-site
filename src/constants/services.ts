export type Service = {
  id: string;
  category: string;
  name: string;
  price: number;
  duration: number;
  popular?: boolean;
};

export const SERVICES: Service[] = [
  // Threading
  { id: 't-1', category: 'Threading', name: 'Eyebrow', price: 30, duration: 5 },
  { id: 't-2', category: 'Threading', name: 'Upper Lip', price: 30, duration: 5 },
  { id: 't-3', category: 'Threading', name: 'Lower Lip', price: 30, duration: 5 },
  { id: 't-4', category: 'Threading', name: 'Chin', price: 30, duration: 5 },
  { id: 't-5', category: 'Threading', name: 'Side Lock', price: 60, duration: 8 },
  { id: 't-6', category: 'Threading', name: 'Full Face', price: 180, duration: 30 },

  // Peel Off Wax
  { id: 'pow-1', category: 'Peel Off Wax', name: 'Forehead', price: 60, duration: 5 },
  { id: 'pow-2', category: 'Peel Off Wax', name: 'Upper Lip', price: 60, duration: 5 },
  { id: 'pow-3', category: 'Peel Off Wax', name: 'Lower Lip', price: 60, duration: 5 },
  { id: 'pow-4', category: 'Peel Off Wax', name: 'Chin', price: 60, duration: 5 },
  { id: 'pow-5', category: 'Peel Off Wax', name: 'Side Lock', price: 139, duration: 10 },
  { id: 'pow-6', category: 'Peel Off Wax', name: 'Full Face', price: 369, duration: 25 },
  { id: 'pow-7', category: 'Peel Off Wax', name: 'Underarms', price: 80, duration: 8 },

  // Honey Wax
  { id: 'hw-1', category: 'Honey Wax', name: 'Full Arms + Full Legs + Underarms', price: 549, duration: 65, popular: true },
  { id: 'hw-2', category: 'Honey Wax', name: 'Full Arms + Half Legs + Underarms', price: 449, duration: 60 },
  { id: 'hw-3', category: 'Honey Wax', name: 'Full Arms + Underarms', price: 249, duration: 31 },
  { id: 'hw-4', category: 'Honey Wax', name: 'Only Underarms', price: 59, duration: 8 },
  { id: 'hw-5', category: 'Honey Wax', name: 'Only Half Legs', price: 159, duration: 12 },
  { id: 'hw-6', category: 'Honey Wax', name: 'Full Hand', price: 155, duration: 15 },
  { id: 'hw-7', category: 'Honey Wax', name: 'Full Body', price: 1299, duration: 122 },
  { id: 'hw-8', category: 'Honey Wax', name: 'Bikini', price: 599, duration: 60 },
  { id: 'hw-9', category: 'Honey Wax', name: 'Half Back', price: 220, duration: 25 },
  { id: 'hw-10', category: 'Honey Wax', name: 'Full Back', price: 385, duration: 30 },
  { id: 'hw-11', category: 'Honey Wax', name: 'Stomach', price: 240, duration: 25 },

  // Rica Wax
  { id: 'rw-1', category: 'Rica Wax', name: 'Full Arms + Full Legs + Underarms', price: 899, duration: 65, popular: true },
  { id: 'rw-2', category: 'Rica Wax', name: 'Full Arms + Half Legs + Underarms', price: 799, duration: 60 },
  { id: 'rw-3', category: 'Rica Wax', name: 'Full Arms + Underarms', price: 499, duration: 31 },
  { id: 'rw-4', category: 'Rica Wax', name: 'Only Underarms', price: 79, duration: 8 },
  { id: 'rw-5', category: 'Rica Wax', name: 'Only Half Legs', price: 399, duration: 12 },
  { id: 'rw-6', category: 'Rica Wax', name: 'Full Hand', price: 399, duration: 15 },
  { id: 'rw-7', category: 'Rica Wax', name: 'Full Body', price: 1699, duration: 122 },
  { id: 'rw-8', category: 'Rica Wax', name: 'Bikini', price: 699, duration: 60 },
  { id: 'rw-9', category: 'Rica Wax', name: 'Half Back', price: 299, duration: 25 },
  { id: 'rw-10', category: 'Rica Wax', name: 'Full Back', price: 469, duration: 30 },
  { id: 'rw-11', category: 'Rica Wax', name: 'Stomach', price: 349, duration: 25 },

  // Gel Wax
  { id: 'gw-1', category: 'Gel Wax', name: 'Full Arms + Full Legs + Underarms', price: 699, duration: 65 },
  { id: 'gw-2', category: 'Gel Wax', name: 'Full Arms + Half Legs + Underarms', price: 599, duration: 60 },
  { id: 'gw-3', category: 'Gel Wax', name: 'Full Arms + Underarms', price: 449, duration: 31 },
  { id: 'gw-4', category: 'Gel Wax', name: 'Only Underarms', price: 75, duration: 8 },
  { id: 'gw-5', category: 'Gel Wax', name: 'Only Half Legs', price: 389, duration: 12 },
  { id: 'gw-6', category: 'Gel Wax', name: 'Full Hand', price: 389, duration: 15 },
  { id: 'gw-7', category: 'Gel Wax', name: 'Full Body', price: 1499, duration: 122 },
  { id: 'gw-8', category: 'Gel Wax', name: 'Half Back', price: 295, duration: 25 },
  { id: 'gw-9', category: 'Gel Wax', name: 'Full Back', price: 395, duration: 30 },
  { id: 'gw-10', category: 'Gel Wax', name: 'Stomach', price: 299, duration: 25 },

  // Roll On Rica Wax
  { id: 'rorw-1', category: 'Roll On Rica Wax', name: 'Full Arms + Full Legs + Underarms', price: 799, duration: 80 },
  { id: 'rorw-2', category: 'Roll On Rica Wax', name: 'Full Arms + Half Legs + Underarms', price: 699, duration: 60 },
  { id: 'rorw-3', category: 'Roll On Rica Wax', name: 'Full Body', price: 1599, duration: 122 },
  { id: 'rorw-4', category: 'Roll On Rica Wax', name: 'Hand Wax', price: 380, duration: 15 },
  { id: 'rorw-5', category: 'Roll On Rica Wax', name: 'Leg Wax', price: 499, duration: 30 },
  { id: 'rorw-6', category: 'Roll On Rica Wax', name: 'Half Leg', price: 395, duration: 20 },
  { id: 'rorw-7', category: 'Roll On Rica Wax', name: 'Full Back', price: 390, duration: 25 },

  // Mani and Pedi
  { id: 'mp-1', category: 'Mani and Pedi', name: 'De-Tan Mani Pedi', price: 795, duration: 145, popular: true },
  { id: 'mp-2', category: 'Mani and Pedi', name: 'O3+ Luxury Crystal Spa Mani Pedi', price: 1250, duration: 140 },
  { id: 'mp-3', category: 'Mani and Pedi', name: 'O3+ Pedicure', price: 649, duration: 60 },
  { id: 'mp-4', category: 'Mani and Pedi', name: 'Korean Mani Pedi', price: 1199, duration: 100, popular: true },
  { id: 'mp-5', category: 'Mani and Pedi', name: 'Korean Pedicure', price: 699, duration: 60 },
  { id: 'mp-6', category: 'Mani and Pedi', name: 'Korean Manicure', price: 600, duration: 45 },
  { id: 'mp-7', category: 'Mani and Pedi', name: 'De-Tan Pedicure', price: 599, duration: 60 },
  { id: 'mp-8', category: 'Mani and Pedi', name: 'O3+ Manicure', price: 595, duration: 45 },
  { id: 'mp-9', category: 'Mani and Pedi', name: 'Cut + File + Polish', price: 120, duration: 20 },
  { id: 'mp-10', category: 'Mani and Pedi', name: 'Nail Paint Apply', price: 59, duration: 10 },

  // Hair Care
  { id: 'hc-1', category: 'Hair Care', name: 'Root Touch-Up', price: 399, duration: 30 },
  { id: 'hc-2', category: 'Hair Care', name: 'Root Touch-Up (Your Own Product)', price: 180, duration: 30 },
  { id: 'hc-3', category: 'Hair Care', name: 'Henna Application', price: 240, duration: 40 },

  // Bleach
  { id: 'bl-1', category: 'Bleach', name: 'Full Face + Neck', price: 195, duration: 30 },
  { id: 'bl-2', category: 'Bleach', name: 'Full Arm', price: 349, duration: 30 },
  { id: 'bl-3', category: 'Bleach', name: 'Full Back', price: 409, duration: 30 },
  { id: 'bl-4', category: 'Bleach', name: 'Half Back', price: 285, duration: 20 },
  { id: 'bl-5', category: 'Bleach', name: 'Full Body', price: 795, duration: 60 },

  // Body Scrub
  { id: 'bs-1', category: 'Body Scrub', name: 'Full Body Scrub', price: 549, duration: 60 },
  { id: 'bs-2', category: 'Body Scrub', name: 'Full Hand Scrub', price: 299, duration: 20 },
  { id: 'bs-3', category: 'Body Scrub', name: 'Full Back Scrub', price: 359, duration: 30 },
  { id: 'bs-4', category: 'Body Scrub', name: 'Full Leg Scrub', price: 299, duration: 20 },
  { id: 'bs-5', category: 'Body Scrub', name: 'Half Back Scrub', price: 285, duration: 20 },

  // Body Polishing
  { id: 'bp-1', category: 'Body Polishing', name: 'Full Body Polishing', price: 1599, duration: 100 },
  { id: 'bp-2', category: 'Body Polishing', name: 'Hydra Glow Body Polishing', price: 4999, duration: 165, popular: true },

  // Body Spa & Massage
  { id: 'bm-1', category: 'Body Spa & Massage', name: 'Full Body Spa', price: 1049, duration: 60, popular: true },
  { id: 'bm-2', category: 'Body Spa & Massage', name: 'Head Massage (15 min)', price: 90, duration: 15 },
  { id: 'bm-3', category: 'Body Spa & Massage', name: 'Head Massage (20 min)', price: 120, duration: 20 },
  { id: 'bm-4', category: 'Body Spa & Massage', name: 'Head Massage (30 min)', price: 180, duration: 30 },
  { id: 'bm-5', category: 'Body Spa & Massage', name: 'Head + Neck + Shoulder Massage', price: 460, duration: 30 },
  { id: 'bm-6', category: 'Body Spa & Massage', name: 'Full Back Massage', price: 499, duration: 30 },
  { id: 'bm-7', category: 'Body Spa & Massage', name: 'Foot Massage', price: 299, duration: 20 },
  { id: 'bm-8', category: 'Body Spa & Massage', name: 'Head + Foot Massage', price: 320, duration: 30 },

  // Spa Treatments
  { id: 'sp-1', category: 'Spa', name: 'Aroma Relaxation Spa', price: 799, duration: 75, popular: true },
  { id: 'sp-2', category: 'Spa', name: 'Detox Body Spa', price: 999, duration: 90 },
  { id: 'sp-3', category: 'Spa', name: 'Hydra Glow Spa', price: 1299, duration: 100 },
  { id: 'sp-4', category: 'Spa', name: 'Foot Spa & Massage', price: 459, duration: 45 },
  { id: 'sp-5', category: 'Spa', name: 'Mini Spa Refresh', price: 549, duration: 40 },

  // Basic Cleanup
  { id: 'cu-1', category: 'Basic Cleanup', name: 'Fruit Cleanup', price: 499, duration: 45 },
  { id: 'cu-2', category: 'Basic Cleanup', name: 'De-Tan Cleanup', price: 490, duration: 45 },
  { id: 'cu-3', category: 'Basic Cleanup', name: 'Red Wine Skin Tightening Cleanup', price: 495, duration: 45 },

  // Basic Facial
  { id: 'bf-1', category: 'Basic Facial', name: 'Fruit Facial', price: 699, duration: 65 },
  { id: 'bf-2', category: 'Basic Facial', name: 'De-Tan Facial', price: 695, duration: 65 },
  { id: 'bf-3', category: 'Basic Facial', name: 'Red Wine Skin Tightening Facial', price: 795, duration: 65 },
  { id: 'bf-4', category: 'Basic Facial', name: 'Gold Facial', price: 599, duration: 65 },
  { id: 'bf-5', category: 'Basic Facial', name: 'Diamond Facial', price: 595, duration: 65 },

  // Classic Facial
  { id: 'cf-1', category: 'Classic Facial', name: 'Korean Facial', price: 1199, duration: 75, popular: true },
  { id: 'cf-2', category: 'Classic Facial', name: "Shine's Glow O3+ Facial", price: 1295, duration: 70 },
  { id: 'cf-3', category: 'Classic Facial', name: 'O3+ Bridal Facial V-C', price: 1549, duration: 100 },
  { id: 'cf-4', category: 'Classic Facial', name: 'O3+ Radiant Glow Bridal Facial', price: 1599, duration: 100 },
  { id: 'cf-5', category: 'Classic Facial', name: 'Hydra Facial', price: 1699, duration: 80 },
  { id: 'cf-6', category: 'Classic Facial', name: 'FYC Bridal Glow Facial', price: 1799, duration: 85 },

  // Advance Facial (Hydra)
  { id: 'af-1', category: 'Advance Facial', name: 'Hydra Boost Facial', price: 2499, duration: 90, popular: true },
  { id: 'af-2', category: 'Advance Facial', name: 'Korean Advance Facial', price: 2595, duration: 100 },
  { id: 'af-3', category: 'Advance Facial', name: 'De-Tan Cleanup Advance', price: 1800, duration: 70 },
  { id: 'af-4', category: 'Advance Facial', name: 'FYC Bridal Glow Advance Facial', price: 3899, duration: 100 },
  { id: 'af-5', category: 'Advance Facial', name: 'Cashmara Facial', price: 3995, duration: 100 },
  { id: 'af-6', category: 'Advance Facial', name: 'Gogi Facial', price: 4599, duration: 100 },

  // Bridal & Combo Packages
  { id: 'bcp-1', category: 'Bridal & Combo Packages', name: 'Rica Wax + De-Tan Facial + Threading Combo', price: 1624, duration: 145 },
  { id: 'bcp-2', category: 'Bridal & Combo Packages', name: 'Rica Wax + Red Wine Skin-Tightening Facial + O3 Pedicure Combo', price: 1999, duration: 205 },
  { id: 'bcp-3', category: 'Bridal & Combo Packages', name: 'Bridal Shine Special Package', price: 7040, duration: 215, popular: true },
];

export const SERVICE_CATEGORIES = Array.from(new Set(SERVICES.map(s => s.category)));

// Fixed add-on charges applied at checkout (from salon policy)
export const ADDON_CHARGES = {
  disposableKit: { label: 'Disposable Kit (Hygiene Essential)', price: 59 },
  transport: { label: 'Transport / Home Visit', price: 99 },
};

// Referral program shown on the site
export const REFERRAL_PROGRAM = {
  cashback: 100,
  freeServiceOptions: ['Eyebrow Threading', 'Upper Lip Threading', 'Forehead Waxing'],
};

// Product brands used at the salon
export const BRAND_PARTNERS = ['FYC', 'O3+', 'Aroma', 'Biotica', 'Korean'];
