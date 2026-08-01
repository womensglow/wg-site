import { useEffect, useMemo, useState } from 'react';
import { useLocation, useRoute } from 'wouter';
import { Button } from '@/components/ui/button';
import { Check, Clock, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { loadServices } from '@/lib/serviceCatalog';
import { getServicePrice, getServiceTypeLabel, getServiceVariants, type Service } from '@/constants/services';

export default function ServiceDetails() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute('/service/:id');
  const [service, setService] = useState<Service | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const { items, addItem } = useCart();
  const { toast } = useToast();

  const id = (params as { id?: string } | null)?.id;

  useEffect(() => {
    let ignore = false;

    const loadCatalog = async () => {
      setLoading(true);
      try {
        const data = await loadServices();
        if (!ignore) {
          setServices(data);
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

  useEffect(() => {
    if (!services.length || !id) {
      return;
    }

    const current = services.find((item) => item.id === id);
    if (!current) {
      setService(null);
      setSelectedVariant(null);
      return;
    }

    setService(current);
    setSelectedVariant(getServiceVariants(current, services).length > 1 ? null : current);
  }, [id, services]);

  const variants = useMemo(() => {
    if (!service) {
      return [];
    }

    return getServiceVariants(service, services);
  }, [service, services]);

  const inCart = selectedVariant ? items.some((item) => item.id === selectedVariant.id) : false;

  const handleAdd = () => {
    if (!selectedVariant) return;

    addItem(selectedVariant);
    toast({
      title: 'Added to Cart',
      description: `${selectedVariant.name} has been added to your cart.`,
      duration: 2000,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDFB] py-20">
        <div className="rounded-[32px] border border-border bg-white/80 p-10 shadow-sm">Loading service details...</div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-[#FFFDFB] py-20">
        <div className="container mx-auto px-4 md:px-6">
          <Button variant="ghost" onClick={() => setLocation('/services')}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to services
          </Button>
          <div className="rounded-[32px] border border-border bg-white/80 p-10 shadow-sm mt-8 text-center">
            <h1 className="text-2xl font-semibold text-foreground">Service not found</h1>
            <p className="mt-3 text-foreground/70">Please return to the services list and choose another service.</p>
          </div>
        </div>
      </div>
    );
  }

  const selectedVariants = variants.length > 1 ? variants : [service];

  return (
    <div className="min-h-screen bg-[#FFFDFB] py-20">
      <div className="container mx-auto px-4 md:px-6">
        <Button variant="ghost" onClick={() => setLocation('/services')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to services
        </Button>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[32px] border border-border bg-white/80 p-8 shadow-sm">
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">{service.category} &gt; <span>{service.subCategory}</span></p>
                <h1 className="mt-3 text-4xl font-serif font-bold text-foreground">{service.name}</h1>
                <p className="mt-4 text-base text-foreground/70">Explore details, pricing, and available variants for this service.</p>
              </div>

              {variants.length > 1 && (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-foreground/80">Choose your option</p>
                  <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label="Choose your option">
                    {variants.map((variant) => {
                      const isSelected = selectedVariant?.id === variant.id;
                      const optionLabel = getServiceTypeLabel(variant.serviceType) ?? 'Standard';

                      return (
                        <Button
                          key={variant.id}
                          type="button"
                          variant={isSelected ? 'default' : 'outline'}
                          aria-pressed={isSelected}
                          onClick={() => setSelectedVariant(variant)}
                          className="h-auto min-h-16 justify-between rounded-2xl px-4 py-3 text-left"
                        >
                          <span className="flex flex-col items-start gap-1">
                            <span>{optionLabel}</span>
                            <span className="text-xs font-normal opacity-80">{variant.duration} mins</span>
                          </span>
                          <span>₹{getServicePrice(variant)}</span>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-border bg-secondary/10 p-6">
                  <p className="text-sm font-semibold text-foreground/70">Duration</p>
                  <p className="mt-3 text-2xl font-semibold text-foreground">{selectedVariant?.duration ?? service.duration} mins</p>
                </div>
                <div className="rounded-3xl border border-border bg-secondary/10 p-6">
                  <p className="text-sm font-semibold text-foreground/70">Service type</p>
                  <p className="mt-3 text-2xl font-semibold text-foreground">{getServiceTypeLabel(selectedVariant?.serviceType ?? service.serviceType) ?? 'Standard'}</p>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-secondary/10 p-6">
                <p className="text-sm font-semibold text-foreground/70">Description</p>
                <p className="mt-3 text-foreground/70">
                  {selectedVariant?.subCategory
                    ? `This ${selectedVariant.subCategory} service is available under ${service.category}.`
                    : `This service is offered as part of our ${service.category} collection.`}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-border bg-white/80 p-8 shadow-sm">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-foreground/70">Price</p>
                <div className="mt-3 flex items-end gap-3">
                  <span className="text-4xl font-bold text-primary">₹{selectedVariant ? getServicePrice(selectedVariant) : 0}</span>
                  {selectedVariant && selectedVariant.discount && selectedVariant.discount > 0 && (
                    <span className="text-sm text-foreground/50 line-through">₹{selectedVariant.withoutProductPrice}</span>
                  )}
                  {selectedVariant?.discount ? <span className="text-sm font-semibold text-accent">{selectedVariant.discount}% OFF</span> : null}
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-3xl border border-border bg-secondary/10 p-5">
                  <p className="text-sm font-semibold text-foreground/70">Included details</p>
                  <ul className="mt-3 space-y-2 text-sm text-foreground/70">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Professional service by trained staff</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Premium products where applicable</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Hygiene-first safety standards</li>
                  </ul>
                </div>

                <Button onClick={handleAdd} disabled={!selectedVariant} variant={inCart ? 'secondary' : 'default'} className="w-full rounded-full py-4 text-base font-medium">
                  {inCart ? 'Added to Cart' : 'Add to Cart'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
