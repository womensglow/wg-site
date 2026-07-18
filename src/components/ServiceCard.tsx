import { getServiceTypeLabel, type Service } from '../constants/services';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Clock, Plus, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ServiceCard({ service }: { service: Service }) {
  const { items, addItem } = useCart();
  const { toast } = useToast();

  const inCart = items.some(item => item.id === service.id);

  const handleAdd = () => {
    addItem(service);
    toast({
      title: "Added to Cart",
      description: `${service.name} has been added.`,
      duration: 2000,
    });
  };

  const getServiceImage = (service: Service) => {
    const category = service.category.toLowerCase();
    if (category.includes('thread')) return '/images/services/threading.jpg';
    if (category.includes('wax')) return '/images/services/waxing.jpg';
    if (category.includes('mani') || category.includes('pedi') || category.includes('nail')) return '/images/services/pedicure.jpg';
    if (category.includes('facial')) return '/images/services/facial.jpg';
    if (category.includes('bridal') || category.includes('combo') || category.includes('package')) return '/images/services/bridal.jpg';
    if (category.includes('spa') || category.includes('massage') || category.includes('polishing') || category.includes('body')) return '/images/services/bridal.jpg';
    return '/images/services/beauty-kit.jpg';
  };

  const imageUrl = getServiceImage(service);

  return (
    <div className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full relative group">
      {service.popular && (
        <span className="absolute -top-3 -right-2 bg-accent text-accent-foreground text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-sm">
          Popular
        </span>
      )}

      <div className="flex-1">
        <div className="mb-4 overflow-hidden rounded-xl">
          <img src={imageUrl} alt={service.name} className="w-full h-36 object-cover" />
        </div>
        <h3 className="font-serif text-lg font-bold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
          {service.name}
        </h3>

        {service.serviceType && (
          <div className="mb-3 inline-flex rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary">
            {getServiceTypeLabel(service.serviceType)}
          </div>
        )}
        
        <div className="flex items-center gap-2 text-sm text-foreground/60 mb-4">
          <Clock className="w-4 h-4" />
          <span>{service.duration} mins</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">
              ₹{service.discountedPrice ?? service.price}
            </span>
            {typeof service.discountedPrice === 'number' && service.discountedPrice < service.price && (
              <span className="text-sm text-foreground/50 line-through">₹{service.price}</span>
            )}
          </div>
          {typeof service.discountedPrice === 'number' && service.discountedPrice < service.price && (
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">After Discount</span>
          )}
        </div>

        <Button
          onClick={handleAdd}
          variant={inCart ? "secondary" : "default"}
          size="sm"
          className="rounded-full px-4 font-medium"
        >
          {inCart ? (
            <>
              <Check className="w-4 h-4 mr-1" /> Added
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-1" /> Add
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
