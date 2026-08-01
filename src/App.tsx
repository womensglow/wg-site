import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { lazy, Suspense, useEffect } from 'react';
import { CartProvider } from './contexts/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingButtons } from './components/FloatingButtons';

const Home = lazy(() => import('./pages/Home'));
const Booking = lazy(() => import('./pages/Booking'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetails = lazy(() => import('./pages/ServiceDetails'));
const Reviews = lazy(() => import('./pages/Reviews'));
const NotFound = lazy(() => import('./pages/not-found'));

const queryClient = new QueryClient();

function PageLoadingFallback() {
  return <div aria-hidden="true" className="min-h-screen bg-[#FFFDFB]" />;
}

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const target = hash ? document.getElementById(hash) : null;

    if (target) {
      window.setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 0);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    const analyticsWindow = window as Window & {
      gtag?: (...args: unknown[]) => void;
    };
    analyticsWindow.gtag?.('event', 'page_view', {
      page_path: location,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location]);
  return null;
}

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageLoadingFallback />}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/services" component={Services} />
            <Route path="/service/:id" component={ServiceDetails} />
            <Route path="/reviews" component={Reviews} />
            <Route path="/booking" component={Booking} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}

function App() {
  const routerBase = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <WouterRouter base={routerBase}>
            <Router />
          </WouterRouter>
          <Toaster />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
