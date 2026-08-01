import { Link } from 'wouter';
import { Instagram, MapPin, Phone, Mail, Clock, Youtube, Facebook } from 'lucide-react';
import logoUrl from '/images/wg_logo.jpeg';

export function Footer() {
  return (
    <footer className="bg-white border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <img 
                src={logoUrl} 
                alt="Women's Glow Logo" 
                className="w-14 h-14 rounded-full object-cover border border-primary/20" 
              />
              <span className="font-serif text-2xl font-bold text-foreground">
                Women's <span className="text-primary">Glow</span>
              </span>
            </Link>
            <p className="text-foreground/70 mb-6 leading-relaxed">
              Premium home beauty services in Agra. Experience luxury, hygiene, and professional care at your doorstep.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/women_sglow_agra" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Women's Glow on Instagram"
                className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
                
              </a>
              <a 
                href="https://instagram.com/women_sglow_agra" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Women's Glow on YouTube"
                className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <Youtube className="w-5 h-5" />
                
              </a>
              <a 
                href="https://instagram.com/women_sglow_agra" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Women's Glow on Facebook"
                className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
                
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/#about" className="text-foreground/70 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/#services" className="text-foreground/70 hover:text-primary transition-colors">Our Services</Link></li>
              <li><Link href="/#gallery" className="text-foreground/70 hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link href="/#faq" className="text-foreground/70 hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/booking" className="text-foreground/70 hover:text-primary transition-colors">Book Now</Link></li>
            </ul>
          </div>

          {/* Service Categories */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-6">Popular Services</h4>
            <ul className="space-y-4 text-foreground/70">
              <li>Facials & Cleanups</li>
              <li>Luxury Waxing</li>
              <li>Manicure & Pedicure</li>
              <li>Threading & Grooming</li>
              <li>Bridal Pre-Wedding Packages</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground/70">Agra, Uttar Pradesh 282001<br/>(Home Service Available)</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-foreground/70">+91 96347 04776</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <span className="text-foreground/70">Mon - Sun: 9:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} Women's Glow Beauty Services. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Home Beauty Services in Agra, UP</p>
        </div>
      </div>
    </footer>
  );
}
