import { Link, useLocation } from 'wouter';
import { useState, useEffect } from 'react';
import { ShoppingBag, Menu } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AppInstallButton } from './AppInstallButton';
import logoUrl from '/images/wg_logo.webp';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Reviews', href: '/#reviews' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Contact', href: '/#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('/#') && location === '/') {
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-border py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img 
            src={logoUrl} 
            alt="Women's Glow Logo" 
            width="48"
            height="48"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-primary/20 shadow-sm group-hover:shadow-md transition-shadow" 
          />
          <span className="font-serif text-xl md:text-2xl font-bold tracking-tight text-foreground">
            Women's <span className="text-primary">Glow</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors uppercase tracking-wider"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link href="/booking" aria-label="Open booking cart" className="relative p-2 text-foreground/80 hover:text-primary transition-colors">
            <ShoppingBag className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold">
                {itemCount}
              </span>
            )}
          </Link>
          
          <div className="hidden md:flex items-center gap-3">
            <AppInstallButton />
            <Link href="/booking">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 font-medium shadow-sm">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background">
              <div className="flex flex-col h-full mt-10">
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto pb-6 space-y-4">
                  <SheetClose asChild>
                    <div>
                      <AppInstallButton />
                    </div>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/booking" className="w-full">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full text-lg py-6 shadow-sm">
                        Book Appointment
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
