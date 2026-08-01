import { Link } from 'wouter';
import {
  Scissors,
  Sparkles,
  Droplets,
  Flower2,
  Wind,
  Zap,
  Hand,
  Waves,
  Crown,
  Palette,
} from 'lucide-react';
import { SERVICE_CATEGORIES } from '@/constants/services';

// Map main display categories to their icons
const CATEGORY_DISPLAY_MAP: Record<string, { icon: React.ReactNode; displayName: string }> = {
  'Threading': { icon: <Scissors className="w-8 h-8" />, displayName: 'Threading' },
  'Wax': { icon: <Sparkles className="w-8 h-8" />, displayName: 'Waxing' },
  'Facial': { icon: <Flower2 className="w-8 h-8" />, displayName: 'Facial' },
  'Basic Cleanup': { icon: <Droplets className="w-8 h-8" />, displayName: 'Cleanup' },
  'Mani and Pedi': { icon: <Hand className="w-8 h-8" />, displayName: 'Mani-Pedi' },
  'Bleach': { icon: <Wind className="w-8 h-8" />, displayName: 'De-Tan/Bleach' },
  'Body Scrub': { icon: <Zap className="w-8 h-8" />, displayName: 'Body Scrub' },
  'Body Polishing': { icon: <Zap className="w-8 h-8" />, displayName: 'Body Scrub' },
  'Body Spa & Massage': { icon: <Waves className="w-8 h-8" />, displayName: 'Body Spa' },
  'Spa': { icon: <Waves className="w-8 h-8" />, displayName: 'Body Spa' },
  'Hair Care': { icon: <Crown className="w-8 h-8" />, displayName: 'Hair Care' },
  'Bridal & Combo Packages': { icon: <Palette className="w-8 h-8" />, displayName: 'Hairdo' },
};

// Get unique display categories
function getUniqueDisplayCategories() {
  const seen = new Set<string>();
  const unique: { displayName: string; firstCategory: string; icon: React.ReactNode }[] = [];

  SERVICE_CATEGORIES.forEach((category) => {
    const mapping = CATEGORY_DISPLAY_MAP[category];
    if (mapping && !seen.has(mapping.displayName)) {
      seen.add(mapping.displayName);
      unique.push({
        displayName: mapping.displayName,
        firstCategory: category,
        icon: mapping.icon,
      });
    }
  });

  return unique;
}

export function OurServices() {
  const categories = getUniqueDisplayCategories();

  return (
    <section className="py-20 bg-[#FFFDFB]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4 tracking-wide uppercase">
            Beauty Services
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Our Services
          </h2>
          <div className="flex justify-center mb-6">
            <div className="w-16 h-1 bg-primary rounded-full"></div>
          </div>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Explore our comprehensive range of beauty and wellness services designed to enhance your natural glow
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link key={category.displayName} href={`/services?category=${encodeURIComponent(category.firstCategory)}`}>
              <div className="group cursor-pointer">
                <div className="aspect-square rounded-2xl border-2 border-primary/10 bg-white/80 backdrop-blur-sm p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10 hover:scale-105">
                  <div className="text-primary transition-transform duration-300 group-hover:scale-110">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-center text-foreground text-sm md:text-base leading-tight">
                    {category.displayName}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/services">
            <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20">
              Browse All Services
              <span>→</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
