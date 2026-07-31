import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import { ArrowLeft, ChevronDown, ChevronUp, Filter, Loader2, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ServiceCard } from '../components/ServiceCard';
import {
  getSubCategoryLabel,
  getServicePrice,
  normalizeSubCategory,
  SERVICES,
  SERVICE_CATEGORIES,
  type Service,
  normalizeServiceType,
} from '../constants/services';
import { loadServices } from '@/lib/serviceCatalog';

type PriceFilter = 'all' | 'under-500' | '500-1000' | '1000-plus';
type ServiceTypeFilter = 'all' | 'with-product' | 'without-product';
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'duration-asc';

const CATEGORY_ALIASES: Record<string, string[]> = {
  Wax: ['Wax', 'Roll On Rica Wax'],
  Bleach: ['Bleach'],
  'Bridal & Combo Packages': ['Bridal & Combo Packages'],
  'Body Scrub': ['Body Scrub', 'Body Polishing'],
  'Body Spa & Massage': ['Body Spa & Massage', 'Spa'],
};

function categoryMatches(serviceCategory: string, activeCategory: string) {
  return activeCategory === 'All' || (CATEGORY_ALIASES[activeCategory] ?? [activeCategory]).includes(serviceCategory);
}

function FilterPanel({
  activeCategory,
  setActiveCategory,
  activeSubCategory,
  setActiveSubCategory,
  subCategories,
  priceRange,
  setPriceRange,
  serviceTypeFilter,
  setServiceTypeFilter,
  sortBy,
  setSortBy,
  onReset,
}: {
  activeCategory: string;
  setActiveCategory: (value: string) => void;
  activeSubCategory: string;
  setActiveSubCategory: (value: string) => void;
  subCategories: string[];
  priceRange: PriceFilter;
  setPriceRange: (value: PriceFilter) => void;
  serviceTypeFilter: ServiceTypeFilter;
  setServiceTypeFilter: (value: ServiceTypeFilter) => void;
  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;
  onReset: () => void;
}) {
  const [expandedCategory, setExpandedCategory] = useState(activeCategory === 'All' ? 'Wax' : activeCategory);

  useEffect(() => {
    if (activeCategory !== 'All') {
      setExpandedCategory(activeCategory);
    }
  }, [activeCategory]);

  const categoryGroups = [
    { value: 'Threading', label: 'Threading', categories: ['Threading'] },
    { value: 'Wax', label: 'Waxing', categories: ['Wax', 'Roll On Rica Wax'] },
    { value: 'Hair Care', label: 'Hair Care', categories: ['Hair Care'] },
    { value: 'Add On', label: 'Add On', categories: ['Add On'] },
    { value: 'Bleach', label: 'De-Tan/Bleach', categories: ['Bleach'] },
    { value: 'Bridal & Combo Packages', label: 'Packages', categories: ['Bridal & Combo Packages'] },
    { value: 'Facial', label: 'Facial', categories: ['Facial'] },
    { value: 'Body Scrub', label: 'Body Scrub / Body Polish', categories: ['Body Scrub', 'Body Polishing'] },
    { value: 'Face Mask', label: 'Face Mask', categories: ['Face Mask'] },
    { value: 'Makeup', label: 'Makeup', categories: ['Makeup'] },
    { value: 'Basic Cleanup', label: 'Cleanup', categories: ['Basic Cleanup'] },
    { value: 'Mani and Pedi', label: 'Mani-Pedi', categories: ['Mani and Pedi'] },
    { value: 'Body Spa & Massage', label: 'Body Spa', categories: ['Body Spa & Massage', 'Spa'] },
  ];

  return (
    <div className="space-y-6 rounded-3xl border border-border bg-white/80 p-5 shadow-sm backdrop-blur-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Filters</p>
        <h2 className="mt-2 text-xl font-serif font-semibold text-foreground">Find your ideal service</h2>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-foreground/80">Categories:</p>

        <div className="space-y-1">
          {categoryGroups.map((group) => {
            const isActive = group.categories.includes(activeCategory);
            const isExpanded = expandedCategory === group.value;
            const hasChildren = isActive && subCategories.length > 0;

            return (
              <div key={group.value}>
                <button
                  type="button"
                  className={`flex w-full items-center gap-2 py-2 text-left text-sm transition-colors ${isActive ? 'font-semibold text-foreground' : 'text-foreground/80 hover:text-primary'}`}
                  onClick={() => {
                    setExpandedCategory(isExpanded ? '' : group.value);
                    setActiveCategory(group.value);
                  }}
                >
                  <span className={`h-3 w-3 rounded-full border ${isActive ? 'border-primary bg-primary/70' : 'border-foreground/25 bg-white'}`} />
                  <span className="flex-1">{group.label}</span>
                  {hasChildren && (isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)}
                </button>
                {isExpanded && hasChildren && (
                  <div className="ml-7 space-y-1 pb-2">
                    {subCategories.map((subcategory) => (
                      <button
                        key={subcategory}
                        type="button"
                        className={`block w-full py-1 text-left text-sm ${activeSubCategory === subcategory ? 'font-medium text-primary' : 'text-foreground/75 hover:text-primary'}`}
                        onClick={() => setActiveSubCategory(subcategory)}
                      >
                        {getSubCategoryLabel(subcategory)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Button type="button" variant="outline" className="w-full rounded-full" onClick={() => setActiveCategory('All')}>
        All categories
      </Button>

      <Button type="button" variant="ghost" className="w-full justify-center text-primary" onClick={onReset}>
        Reset filters
      </Button>
    </div>
  );
}

export default function Services() {
  const [location] = useLocation();
  const [services, setServices] = useState<Service[]>(SERVICES);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<PriceFilter>('all');
  const [serviceTypeFilter, setServiceTypeFilter] = useState<ServiceTypeFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [loading, setLoading] = useState(true);
  const [sourceLabel, setSourceLabel] = useState('Local catalog');

  // Parse URL search parameters and set category filter
  const subCategoryOptions = useMemo(() => {
    if (activeCategory === 'All') {
      return [];
    }

    return Array.from(
      new Set(
        services
          .filter((service) => categoryMatches(service.category, activeCategory) && service.subCategory)
          .map((service) => normalizeSubCategory(service.subCategory)!),
      ),
    );
  }, [activeCategory, services]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('category');
    const subCategoryParam = params.get('subcategory');

    const decodedCategory = categoryParam ? decodeURIComponent(categoryParam) : '';
    const decodedSubcategory = subCategoryParam
      ? normalizeSubCategory(decodeURIComponent(subCategoryParam)) ?? ''
      : '';

    if (decodedCategory && (SERVICE_CATEGORIES.includes(decodedCategory) || CATEGORY_ALIASES[decodedCategory])) {
      setActiveCategory(decodedCategory);

      const validSubcategories = Array.from(
        new Set(
          services
            .filter((service) => categoryMatches(service.category, decodedCategory) && service.subCategory)
            .map((service) => normalizeSubCategory(service.subCategory)!),
        ),
      );

      if (decodedSubcategory && validSubcategories.includes(decodedSubcategory)) {
        setActiveSubCategory(decodedSubcategory);
      } else {
        setActiveSubCategory('All');
      }
    } else {
      setActiveCategory('All');
      setActiveSubCategory('All');
    }
  }, [location, services]);

  useEffect(() => {
    let ignore = false;

    const loadCatalog = async () => {
      setLoading(true);
      try {
        const data = await loadServices();
        if (!ignore) {
          setServices(data);
          setSourceLabel(import.meta.env.VITE_SUPABASE_URL ? 'Supabase' : 'Local catalog');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadCatalog();
    return () => {
      ignore = true;
    };
  }, []);

  const filteredServices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const result = services.filter((service) => {
      const matchesCategory = categoryMatches(service.category, activeCategory);
      const displayPrice = getServicePrice(service);
      const matchesPrice = (() => {
        switch (priceRange) {
          case 'under-500':
            return displayPrice < 500;
          case '500-1000':
            return displayPrice >= 500 && displayPrice <= 1000;
          case '1000-plus':
            return displayPrice > 1000;
          default:
            return true;
        }
      })();
      const serviceType = normalizeServiceType((service.serviceType ?? service.productMode) as string | undefined);
      const matchesServiceType =
        serviceTypeFilter === 'all'
          ? true
          : serviceType === serviceTypeFilter || serviceType === 'both';

      const matchesSubCategory =
        activeSubCategory === 'All' || normalizeSubCategory(service.subCategory) === normalizeSubCategory(activeSubCategory);

      if (!matchesCategory || !matchesPrice || !matchesServiceType || !matchesSubCategory) {
        return false;
      }

      if (!query) {
        return true;
      }

      const haystack = `${service.name} ${service.category}`.toLowerCase();
      const words = query.split(/\s+/).filter(Boolean);
      return words.every((word) => haystack.includes(word));
    });

    result.sort((a, b) => {
      const aPrice = getServicePrice(a);
      const bPrice = getServicePrice(b);

      switch (sortBy) {
        case 'price-asc':
          return aPrice - bPrice;
        case 'price-desc':
          return bPrice - aPrice;
        case 'duration-asc':
          return a.duration - b.duration;
        default:
          if (a.popular && !b.popular) return -1;
          if (!a.popular && b.popular) return 1;
          return aPrice - bPrice;
      }
    });

    return result;
  }, [activeCategory, activeSubCategory, priceRange, serviceTypeFilter, searchQuery, services, sortBy]);

  const resetFilters = () => {
    setActiveCategory('All');
    setActiveSubCategory('All');
    setPriceRange('all');
    setServiceTypeFilter('all');
    setSearchQuery('');
    setSortBy('featured');
    window.history.pushState({}, '', '/services');
  };

  const handleSubCategoryChange = (subcategory: string) => {
    setActiveSubCategory(subcategory);
    const params = new URLSearchParams();

    if (activeCategory !== 'All') {
      params.set('category', activeCategory);
    }

    if (subcategory !== 'All') {
      params.set('subcategory', subcategory);
    }

    const query = params.toString();
    window.history.pushState({}, '', `/services${query ? `?${query}` : ''}`);
  };

  // Wrapper function to update URL when category changes
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setActiveSubCategory('All');
    if (category !== 'All') {
      const params = new URLSearchParams();
      params.set('category', category);
      window.history.pushState({}, '', `/services?${params.toString()}`);
    } else {
      window.history.pushState({}, '', '/services');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDFB] pt-20 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <FilterPanel
              activeCategory={activeCategory}
              setActiveCategory={handleCategoryChange}
              activeSubCategory={activeSubCategory}
              setActiveSubCategory={handleSubCategoryChange}
              subCategories={subCategoryOptions}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              serviceTypeFilter={serviceTypeFilter}
              setServiceTypeFilter={setServiceTypeFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onReset={resetFilters}
            />
          </aside>

          <div className="space-y-2 md:space-y-4">
            <div className="flex flex-col gap-4 rounded-[28px] p-2 md:flex-row md:items-center md:justify-between md:p-2">
              <div className="relative w-full md:max-w-xl">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search by service or category"
                  className="h-11 rounded-full border-border pl-10"
                  autoFocus
                />
              </div>

              <div className="flex items-center gap-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="rounded-full lg:hidden">
                      <Filter className="mr-2 h-4 w-4" /> Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="overflow-y-auto">
                    <SheetHeader className="mb-6 text-left">
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <FilterPanel
                      activeCategory={activeCategory}
                      setActiveCategory={handleCategoryChange}
                      activeSubCategory={activeSubCategory}
                      setActiveSubCategory={handleSubCategoryChange}
                      subCategories={subCategoryOptions}
                      priceRange={priceRange}
                      setPriceRange={setPriceRange}
                      serviceTypeFilter={serviceTypeFilter}
                      setServiceTypeFilter={setServiceTypeFilter}
                      sortBy={sortBy}
                      setSortBy={setSortBy}
                      onReset={resetFilters}
                    />
                  </SheetContent>
                </Sheet>

                <div className="flex items-center gap-2 rounded-full border border-border bg-secondary/20 px-3 py-2 text-sm text-foreground/70">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>{filteredServices.length} results</span>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex min-h-[260px] items-center justify-center rounded-[28px] border border-dashed border-border bg-white/70">
                <div className="flex items-center gap-3 text-foreground/70">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading services...
                </div>
              </div>
            ) : filteredServices.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-border bg-white/70 p-10 text-center">
                <p className="text-lg font-medium text-foreground">No services match that combination yet.</p>
                <p className="mt-2 text-foreground/60">Try clearing a few filters or searching by another keyword.</p>
                <Button type="button" variant="link" className="mt-4 text-primary" onClick={resetFilters}>
                  Reset filters
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(index, 8) * 0.04 }}
                  >
                    <ServiceCard service={service} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
