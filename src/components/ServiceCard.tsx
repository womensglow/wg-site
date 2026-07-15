import { Service } from '../constants/services';
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

  return (
    <div className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full relative group">
      {service.popular && (
        <span className="absolute -top-3 -right-2 bg-accent text-accent-foreground text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-sm">
          Popular
        </span>
      )}
      
      <div className="flex-1">
        <h3 className="font-serif text-lg font-bold text-foreground leading-snug mb-2 group-hover:text-primary transition-colors">
          {service.name}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-foreground/60 mb-4">
          <Clock className="w-4 h-4" />
          <span>{service.duration} mins</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <span className="text-xl font-bold text-primary">
          ₹{service.price}
        </span>
        
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
