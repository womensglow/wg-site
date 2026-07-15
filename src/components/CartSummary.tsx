import { useCart } from '../contexts/CartContext';
import { Clock, Trash2 } from 'lucide-react';
import { ADDON_CHARGES } from '../constants/services';

export function CartSummary() {
  const { items, removeItem, totalPrice, totalDuration, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <div className="bg-white rounded-2xl border border-border p-8 text-center shadow-sm">
        <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 className="w-6 h-6 text-primary opacity-50" />
        </div>
        <h3 className="font-serif text-xl font-bold mb-2">Your cart is empty</h3>
        <p className="text-foreground/60 mb-6">Add services to book an appointment.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-border p-6 shadow-sm sticky top-24">
      <h3 className="font-serif text-xl font-bold mb-6 flex items-center justify-between">
        <span>Booking Summary</span>
        <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </span>
      </h3>
      
      <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-start group">
            <div className="flex-1 pr-4">
              <p className="font-medium text-sm leading-tight mb-1">{item.name}</p>
              <div className="flex items-center gap-2 text-xs text-foreground/60">
                <span>₹{item.price}</span>
                <span>•</span>
                <span>Qty: {item.quantity}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="font-bold text-sm">₹{item.price * item.quantity}</span>
              <button 
                onClick={() => removeItem(item.id)}
                className="text-destructive/70 hover:text-destructive transition-colors"
                aria-label="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-border pt-4 mb-4 space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-foreground/70">Estimated Time</span>
          <span className="font-medium flex items-center gap-1">
            <Clock className="w-4 h-4 text-primary" />
            {Math.floor(totalDuration / 60) > 0 && `${Math.floor(totalDuration / 60)}h `}
            {totalDuration % 60}m
          </span>
        </div>
        <div className="flex justify-between items-center text-sm text-foreground/70">
          <span>Services Subtotal</span>
          <span>₹{totalPrice}</span>
        </div>
        <div className="flex justify-between items-center text-sm text-foreground/70">
          <span>{ADDON_CHARGES.disposableKit.label}</span>
          <span>₹{ADDON_CHARGES.disposableKit.price}</span>
        </div>
        <div className="flex justify-between items-center text-sm text-foreground/70">
          <span>{ADDON_CHARGES.transport.label}</span>
          <span>₹{ADDON_CHARGES.transport.price}</span>
        </div>
      </div>

      <div className="border-t border-border pt-4 mb-6">
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total</span>
          <span className="text-primary">₹{totalPrice + ADDON_CHARGES.disposableKit.price + ADDON_CHARGES.transport.price}</span>
        </div>
      </div>
      
    </div>
  );
}
