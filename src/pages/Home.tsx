import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import {
  SERVICES,
  REFERRAL_PROGRAM,
  BRAND_PARTNERS
} from '../constants/services';
import { IMAGE_REVIEWS } from '../constants/reviews';
import { ServiceCard } from '../components/ServiceCard';
import { OurServices } from '../components/OurServices';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Star, ShieldCheck, Home as HomeIcon, Sparkles, ArrowRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  const { itemCount } = useCart();
  const [, setLocation] = useLocation();

  const handleBookAppointment = () => {
    if (itemCount === 0) {
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setLocation('/booking');
    }
  };

  const popularServices = SERVICES
    .filter(service => service.popular)
    .slice(0, 8);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const reviews = IMAGE_REVIEWS;

  const faqs = [
    { q: "How do I book an appointment?", a: "You can book an appointment by selecting your desired services, going to your cart, and filling out the booking form. This will prepare a WhatsApp message to confirm your slot." },
    { q: "Do you bring your own products and tools?", a: "Yes! We bring a complete professional kit including sanitized tools, premium products, disposable sheets, and even towels. You just need to provide a comfortable place to sit or lie down." },
    { q: "Is home service available everywhere in Agra?", a: "We cover most major residential areas in Agra. If you live in the outskirts, please contact us on WhatsApp to confirm availability." },
    { q: "What is your cancellation policy?", a: "We request you to cancel or reschedule at least 4 hours before your appointment to avoid any inconvenience." },
    { q: "How do I pay?", a: "You can pay via Cash, UPI, or Online after the service is completed." },
    { q: "Which wax should I choose?", a: "Honey wax is great for normal skin. Rica wax is excellent for sensitive skin, removes tan, and is less painful. Gel wax offers a smooth finish and is soothing." },
    { q: "Are your beauticians certified?", a: "Absolutely. All our professionals have 5+ years of experience and undergo regular training and background checks." },
    { q: "Do I need to WhatsApp to confirm?", a: "Yes, currently our booking system finalizes the appointment over WhatsApp to ensure direct communication and personalized service." },
    { q: "Is threading painful?", a: "Our experts use specific techniques to minimize discomfort, though sensitivity varies from person to person." },
    { q: "How long does a service take?", a: "Each service has an estimated duration listed. Please allow an additional 10-15 minutes for setup and pack-up." },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDFB]">
      {/* Hero Section */}

      <section className="relative min-h-screen flex items-center overflow-hidden">

        <img
          src="/images/wg-hero-home.webp"
          alt="Women's Glow home beauty service"
          width="1768"
          height="889"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[70%] sm:object-[40%_center] md:object-[90%_center] lg:object-right z-0"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-pink-50/75 via-pink-50/45 to-transparent lg:bg-gradient-to-r lg:from-pink-50/92 lg:via-pink-50/70 lg:to-transparent" />



        {/* Content */}
        <div className="container relative z-20 mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-start lg:items-start justify-end text-left pb-16 lg:text-left min-h-screen">

          {/* Badge */}
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <span className="inline-block rounded-full bg-primary/10 px-5 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wide text-primary">
              Premium Home Salon in Agra
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="mt-6 font-serif font-bold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
          >
            Glow at Home.
            <br />
            <span className="text-primary">Beauty at Your Door.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="mt-4 sm:mt-6 max-w-md sm:max-w-lg md:max-w-xl text-sm sm:text-base md:text-lg lg:text-xl text-foreground/80 leading-relaxed"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Experience luxury salon services in the comfort of your home.
            Professional beauticians, premium products, and impeccable hygiene.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
          >
            <Button
              size="lg"
              onClick={handleBookAppointment}
              className="h-12 sm:h-14 w-full sm:w-auto rounded-full px-6 sm:px-8 text-base sm:text-lg bg-primary hover:bg-primary/90 shadow-lg"
            >
              Book Appointment
            </Button>

            <Button
              size="lg"
              onClick={() => setLocation("/services")}
              className="h-12 sm:h-14 w-full sm:w-auto rounded-full px-6 sm:px-8 text-base sm:text-lg bg-white/50 backdrop-blur border border-primary/20 hover:bg-white"
            >
              View Services
            </Button>
          </motion.div>

        </div>
      </section>


      {/* Stats */}
      <motion.div
        className="mt-8 sm:mt-10 grid grid-cols-2 gap-4 sm:gap-6 w-full sm:w-auto"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {[
          { icon: <Star className="w-6 h-6 text-primary" />, value: "4.9", label: "Average Rating" },
          { icon: <HomeIcon className="w-6 h-6 text-primary" />, value: "500+", label: "Happy Customers" },
          { icon: <ShieldCheck className="w-6 h-6 text-primary" />, value: "Certified", label: "Professionals" },
          { icon: <Sparkles className="w-6 h-6 text-primary" />, value: "Premium", label: "Products" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            className="rounded-xl border border-white/60 bg-white/80 backdrop-blur-md p-4 shadow-md text-center"
          >
            <div className="flex justify-center">{stat.icon}</div>
            <div className="mt-2 text-lg sm:text-xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs sm:text-sm uppercase tracking-wide text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>


      {/* Our Services Section */}
      <OurServices />


      {/* Popular Services Section */}
      <section id="services" className="py-20 bg-[#FFFDFB]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Popular Services</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto text-lg">Our most-loved treatments, picked by clients across Agra.</p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base border-primary text-primary hover:bg-primary hover:text-white">
                All Services <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Refer & Earn Banner */}
      <section className="py-14 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold mb-1">Refer & Earn</h3>
                <p className="text-white/90 max-w-xl">
                  Refer a friend and get <span className="font-bold">₹{REFERRAL_PROGRAM.cashback} cashback</span>, or choose a free service on your next booking —{' '}
                  {REFERRAL_PROGRAM.freeServiceOptions.join(', ')}.
                </p>
              </div>
            </div>
            <a href="https://wa.me/919634704776?text=Hi!%20I'd%20like%20to%20refer%20a%20friend%20to%20Women's%20Glow." target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 whitespace-nowrap">
                Refer a Friend
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Brands We Use */}
      <section className="py-10 bg-white border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
            <p className="text-center text-sm uppercase tracking-wider text-foreground/70 mb-6">Premium Products We Use</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {BRAND_PARTNERS.map((brand) => (
              <span key={brand} className="font-serif text-xl md:text-2xl font-semibold text-foreground/70">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">The Experience</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto text-lg">A glimpse into our luxurious at-home setups.</p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4">
            {[
              '/images/services/threading.jpg',
              '/images/services/nail-tools.jpg',
              '/images/services/korean-mani.jpg',
              '/images/services/waxing.jpg',
              '/images/services/facial.jpg',
              '/images/services/beauty-kit.jpg',
              '/images/services/pedicure.jpg',
              '/images/services/bridal.jpg'
            ].map((img, i) => (
              <div key={i} className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-secondary/10 aspect-[3/4]">
                <img
                  src={img}
                  alt={`Gallery Image ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.classList.add('bg-gradient-to-br', 'from-secondary', 'to-primary/20');
                  }}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 bg-[#FFFDFB]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Client Love</h2>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-foreground/70">Trusted by hundreds of women in Agra.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="w-full h-56 bg-secondary/10">
                  <img
                    src={review.imageSrc}
                    alt={review.caption}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-bold text-foreground">{review.name}</div>
                    <div className="text-xs text-foreground/70">{review.location}</div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground/70 text-sm">{review.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link href="/reviews">
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base border-primary text-primary hover:bg-primary hover:text-white">
                View More Reviews <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="aspect-square rounded-3xl overflow-hidden">
                {/* Fallback image if generator doesn't work */}
                <div className="w-full h-full bg-secondary/20 flex items-center justify-center">
                  <img src="/attached_assets/generated_images/beauty-kit.jpg" alt="Beauty Kit" className="w-full h-full object-cover" onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }} />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay"></div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-border max-w-[240px]">
                <p className="font-serif italic text-lg text-foreground mb-2">"True beauty is self-care, delivered with elegance."</p>
                <p className="text-sm text-primary font-bold">— Women's Glow</p>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Redefining Home Beauty</h2>
              <p className="text-foreground/70 mb-8 text-lg leading-relaxed">
                Women's Glow brings the luxury and expertise of a high-end salon directly to your living room. We believe that self-care shouldn't require fighting traffic or waiting in lines.
              </p>

              <div className="space-y-6">
                {[
                  { title: "Certified Staff", desc: "Vetted professionals with years of salon experience." },
                  { title: "Hygienic Process", desc: "Disposable sheets, sanitized tools, and strict protocols." },
                  { title: "Premium Products", desc: "We use only genuine, top-tier brand products." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center shrink-0">
                      <Check className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-foreground/70">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Frequent Questions</h2>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-[#FFFDFB] border border-border rounded-2xl px-6">
                <AccordionTrigger className="text-left font-bold text-lg hover:no-underline hover:text-primary py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 text-base leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,white_0%,transparent_100%)]"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Ready to Glow?</h2>
          <p className="text-white/80 mb-10 max-w-xl mx-auto text-lg">
            Book your premium at-home beauty service today and experience the difference.
          </p>
          <Link href="/booking">
            <Button size="lg" className="bg-white text-primary hover:bg-secondary hover:text-primary-foreground rounded-full px-10 h-14 text-lg shadow-xl font-bold">
              Book Your Appointment
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
