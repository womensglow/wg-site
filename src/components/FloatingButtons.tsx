import { useState, useEffect } from 'react';
import { ArrowUp, Phone } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';

export function FloatingButtons() {
  const [showScroll, setShowScroll] = useState(false);
  const { itemCount } = useCart();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919634704776';

  return (
    <>
      <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 flex flex-col gap-3 z-40 items-end">
        {/* Scroll to Top */}
        <div
          className={`transition-all duration-300 transform ${
            showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="w-12 h-12 rounded-full bg-white text-foreground shadow-lg hover:bg-gray-50 border border-border"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        </div>

        {/* Call Button */}
        <a href={`tel:+${whatsappNumber}`} target="_blank" rel="noreferrer">
          <Button
            size="icon"
            className="w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
          >
            <Phone className="w-5 h-5" />
          </Button>
        </a>

        {/* WhatsApp Button */}
        <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">
          <Button
            size="icon"
            className="w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20bd5a]"
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </Button>
        </a>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      {location !== '/booking' && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border shadow-[0_-4px_10px_rgba(0,0,0,0.05)] p-4 z-50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-foreground/60 uppercase font-medium tracking-wider">Cart</span>
            <span className="font-bold text-foreground">{itemCount} items</span>
          </div>
          <Link href="/booking">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 shadow-sm">
              Book Appointment
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
