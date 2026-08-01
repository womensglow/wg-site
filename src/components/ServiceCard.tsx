import { getServicePrice, getSubCategoryLabel, hasServiceVariants, type Service } from '../constants/services';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Clock, Plus, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';

export function ServiceCard({ service }: { service: Service }) {
  const { items, addItem } = useCart();
  const { toast } = useToast();

  const inCart = items.some(item => item.id === service.id);
  const hasVariants = hasServiceVariants(service);

  const handleAdd = () => {
    addItem(service);
    toast({
      title: 'Added to Cart',
      description: `${service.name} has been added.`,
      duration: 2000,
    });
  };


  return (
    <div className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full relative group">
      {service.popular && (
        <span className="absolute -top-3 -right-2 bg-accent text-accent-foreground text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-sm">
          Popular
        </span>
      )}

      <div className="flex-1">
        <div className="mb-4 overflow-hidden rounded-xl">
          <img
            src={service.image}
            alt={service.name}
            width="1448"
            height="1086"
            loading="lazy"
            decoding="async"
            className="w-full h-36 object-cover"
          />
        </div>
        <h3 className="font-serif text-lg font-bold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
          {service.name}
        </h3>

        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium text-primary/80">
          <span className="rounded-full bg-primary/10 px-2.5 py-1">{service.category}</span>
          {service.subCategory && (
            <span className="rounded-full bg-secondary/60 px-2.5 py-1 text-foreground/70">
              {getSubCategoryLabel(service.subCategory)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-foreground/60 mb-4">
          <Clock className="w-4 h-4" />
          <span>{service.duration} mins</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">
              ₹{getServicePrice(service)}
            </span>
            {typeof service.discount === 'number' && service.discount > 0 && (
              <span className="text-sm text-foreground/50 line-through">₹{service.withoutProductPrice}</span>
            )}
          </div>
          {hasVariants && typeof service.withProductPrice === 'number' && (
            <div className="mt-1 text-[11px] text-foreground/60">
              With product ₹{service.withProductPrice}
            </div>
          )}
          {typeof service.discount === 'number' && service.discount > 0 && (
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">{service.discount}% OFF</span>
          )}
        </div>

        {hasVariants ? (
          <Button asChild variant="outline" size="sm" className="rounded-full w-full px-4 font-medium">
            <Link href={`/service/${service.id}`}>View More</Link>
          </Button>
        ) : (
          <Button
            onClick={handleAdd}
            variant={inCart ? 'secondary' : 'default'}
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
        )}
      </div>
    </div>
  );
}
