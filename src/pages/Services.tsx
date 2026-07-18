import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowLeft, Filter, Loader2, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ServiceCard } from '../components/ServiceCard';
import { SERVICES, SERVICE_CATEGORIES, type Service, normalizeServiceType } from '../constants/services';
import { loadServices } from '@/lib/serviceCatalog';

type PriceFilter = 'all' | 'under-500' | '500-1000' | '1000-plus';
type ServiceTypeFilter = 'all' | 'with-product' | 'without-product';
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'duration-asc';

function FilterPanel({
  activeCategory,
  setActiveCategory,
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
  priceRange: PriceFilter;
  setPriceRange: (value: PriceFilter) => void;
  serviceTypeFilter: ServiceTypeFilter;
  setServiceTypeFilter: (value: ServiceTypeFilter) => void;
  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;
  onReset: () => void;
}) {
  return (
    <div className="space-y-6 rounded-3xl border border-border bg-white/80 p-5 shadow-sm backdrop-blur-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">Filters</p>
        <h2 className="mt-2 text-xl font-serif font-semibold text-foreground">Find your ideal service</h2>
      </div>


      <div>
        <p className="mb-3 text-sm font-medium text-foreground/80">Budget</p>
        <div className="space-y-2">
          {[
            { value: 'all', label: 'All prices' },
            { value: 'under-500', label: 'Under ₹500' },
            { value: '500-1000', label: '₹500 - ₹1000' },
            { value: '1000-plus', label: '₹1000+' },
          ].map((option) => (
            <label key={option.value} className="flex cursor-pointer items-center gap-2 text-sm text-foreground/70">
              <input
                type="radio"
                name="priceRange"
                checked={priceRange === option.value}
                onChange={() => setPriceRange(option.value as PriceFilter)}
                className="h-4 w-4 border-border text-primary focus:ring-primary"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-foreground/80">Service type</p>
        <div className="space-y-2">
          {[
            { value: 'all', label: 'All services' },
            { value: 'with-product', label: 'With product' },
            { value: 'without-product', label: 'Without product' },
          ].map((option) => (
            <label key={option.value} className="flex cursor-pointer items-center gap-2 text-sm text-foreground/70">
              <input
                type="radio"
                name="serviceTypeFilter"
                checked={serviceTypeFilter === option.value}
                onChange={() => setServiceTypeFilter(option.value as ServiceTypeFilter)}
                className="h-4 w-4 border-border text-primary focus:ring-primary"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-foreground/80">Sort by</p>
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value as SortOption)}
          className="w-full rounded-full border border-border bg-white px-4 py-2 text-sm outline-none focus:border-primary"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="duration-asc">Duration: Short to Long</option>
        </select>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-foreground/80">Category</p>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant={activeCategory === 'All' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('All')}
            className={`rounded-full ${activeCategory === 'All' ? 'bg-primary text-white' : 'bg-white'}`}
          >
            All
          </Button>
          {SERVICE_CATEGORIES.map((category) => (
            <Button
              key={category}
              type="button"
              variant={activeCategory === category ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full ${activeCategory === category ? 'bg-primary text-white' : 'bg-white'}`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>


      <Button type="button" variant="ghost" className="w-full justify-center text-primary" onClick={onReset}>
        Reset filters
      </Button>
    </div>
  );
}

export default function Services() {
  const [services, setServices] = useState<Service[]>(SERVICES);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<PriceFilter>('all');
  const [serviceTypeFilter, setServiceTypeFilter] = useState<ServiceTypeFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [loading, setLoading] = useState(true);
  const [sourceLabel, setSourceLabel] = useState('Local catalog');

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
      const matchesCategory = activeCategory === 'All' || service.category === activeCategory;
      const displayPrice = service.discountedPrice ?? service.price;
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
          : serviceType === serviceTypeFilter;

      if (!matchesCategory || !matchesPrice || !matchesServiceType) {
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
      const aPrice = a.discountedPrice ?? a.price;
      const bPrice = b.discountedPrice ?? b.price;

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
  }, [activeCategory, priceRange, serviceTypeFilter, searchQuery, services, sortBy]);

  const resetFilters = () => {
    setActiveCategory('All');
    setPriceRange('all');
    setServiceTypeFilter('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-[#FFFDFB] pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-foreground/60 transition-colors hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <div className="mt-8 rounded-[32px] border border-border bg-white/70 p-6 shadow-sm backdrop-blur-sm md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Beauty menu</p>
              <h1 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-5xl">Discover services tailored to your glow routine</h1>
              <p className="mt-4 text-lg text-foreground/70">
                Browse our complete catalog of salon treatments, filter by category or budget, and book the experience that fits your schedule.
              </p>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-secondary/20 px-4 py-3 text-sm text-foreground/70">
              <p className="font-semibold text-foreground">{services.length}+ services available</p>
              <p className="mt-1">Data source: {sourceLabel}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <FilterPanel
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              serviceTypeFilter={serviceTypeFilter}
              setServiceTypeFilter={setServiceTypeFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onReset={resetFilters}
            />
          </aside>

          <div className="space-y-6">
            <div className="flex flex-col gap-4 rounded-[28px] border border-border bg-white/80 p-4 shadow-sm backdrop-blur-sm md:flex-row md:items-center md:justify-between md:p-5">
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
                      setActiveCategory={setActiveCategory}
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
