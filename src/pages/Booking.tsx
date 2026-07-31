import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCart } from '../contexts/CartContext';
import { ADDON_CHARGES, getServiceTypeLabel } from '../constants/services';
import { CartSummary } from '../components/CartSummary';
import { BookingSuccessModal } from '../components/BookingSuccessModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, ArrowLeft, Loader2 } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  whatsapp: z.string().regex(/^[0-9]{10}$/, 'WhatsApp number must be 10 digits'),
  gender: z.enum(['Female', 'Male', 'Other']),
  address: z.string().min(10, 'Please provide a complete address'),
  landmark: z.string().optional(),
  area: z.string().min(2, 'Area is required'),
  pincode: z.string().regex(/^[0-9]{6}$/, 'Pincode must be 6 digits'),
  preferredDate: z.date({ required_error: 'Please select a date' }),
  preferredTime: z.string().min(1, 'Please select a time'),
  paymentMode: z.enum(['Cash', 'UPI', 'Online']),
  specialInstructions: z.string().optional(),
  website: z.string().max(0, 'Spam detected').optional(), // honeypot
});

type FormValues = z.infer<typeof formSchema>;

const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
  "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM"
];

export default function Booking() {
  const { items, totalPrice, itemCount, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedBookingId, setGeneratedBookingId] = useState('');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      whatsapp: '',
      address: '',
      landmark: '',
      area: '',
      pincode: '',
      specialInstructions: '',
      website: '', // honeypot
      gender: 'Female',
      paymentMode: 'UPI',
      preferredTime: '',
    },
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (itemCount === 0 && !showSuccess) {
      toast({
        title: "Cart is empty",
        description: "Please add services before booking.",
        variant: "destructive"
      });
      setLocation('/');
    }
  }, [itemCount, setLocation, showSuccess, toast]);

  const onSubmit = async (data: FormValues) => {
    if (data.website) return; // Spam honeypot triggered

    if (itemCount === 0) return;

    setIsSubmitting(true);

    try {
      // 1. Generate ID
      const dateStr = format(new Date(), 'yyyyMMdd');
      const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
      const bookingId = `WG-${dateStr}-${randomStr}`;

      const grandTotal = totalPrice + ADDON_CHARGES.disposableKit.price + ADDON_CHARGES.transport.price;

      const payload = {
        bookingId,
        timestamp: new Date().toISOString(),
        ...data,
        preferredDate: format(data.preferredDate, 'yyyy-MM-dd'),
        services: items.map(i => `${i.name}${getServiceTypeLabel(i.serviceType) ? ` - ${getServiceTypeLabel(i.serviceType)}` : ''} (Qty: ${i.quantity})`).join(', '),
        servicesSubtotal: totalPrice,
        disposableKitFee: ADDON_CHARGES.disposableKit.price,
        transportFee: ADDON_CHARGES.transport.price,
        totalAmount: grandTotal,
        source: 'website'
      };

      // 2. Post to Google Script if exists
      const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
      if (scriptUrl) {
        try {
          await fetch(scriptUrl, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' },
            mode: 'no-cors' // usually needed for google scripts
          });
        } catch (e) {
          console.error("Failed to save to sheet", e);
          // Don't throw, let them proceed to WhatsApp
        }
      }

      // 3. Build WhatsApp Message
      const serviceLines = items
        .map(i => `  • ${i.name}${getServiceTypeLabel(i.serviceType) ? ` - ${getServiceTypeLabel(i.serviceType)}` : ''}${i.quantity > 1 ? ` × ${i.quantity}` : ''} — ₹${i.price * i.quantity}`)
        .join('\n');

      const message = `✨ *WOMEN'S GLOW BEAUTY SERVICES* ✨
_Premium Home Salon, Agra_

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
📋 *NEW BOOKING REQUEST*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
🆔 *Booking ID:* \`${bookingId}\`

👤 *CUSTOMER DETAILS*
  • *Name:* ${data.name}
  • *Phone:* ${data.phone}
  • *WhatsApp:* ${data.whatsapp}
  • *Gender:* ${data.gender}

📍 *SERVICE ADDRESS*
  • ${data.address}${data.landmark ? `\n  • Landmark: ${data.landmark}` : ''}
  • Area: ${data.area}
  • Pincode: ${data.pincode}

📅 *APPOINTMENT SLOT*
  • *Date:* ${format(data.preferredDate, 'EEEE, dd MMM yyyy')}
  • *Time:* ${data.preferredTime}

💅 *SERVICES REQUESTED*
${serviceLines}

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
Services Subtotal: ₹${totalPrice}
${ADDON_CHARGES.disposableKit.label}: ₹${ADDON_CHARGES.disposableKit.price}
${ADDON_CHARGES.transport.label}: ₹${ADDON_CHARGES.transport.price}
💰 *TOTAL AMOUNT: ₹${grandTotal}*
💳 *Payment Mode:* ${data.paymentMode}
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
${data.specialInstructions ? `\n📝 *Special Instructions:*\n_${data.specialInstructions}_\n` : ''}
_Please confirm this appointment at your earliest convenience._

🙏 *Thank you for choosing Women's Glow!*`;

      const waNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "919634704776";
      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

      // 4. Open WhatsApp
      window.open(waUrl, '_blank');

      // 5. Show Success
      setGeneratedBookingId(bookingId);
      setShowSuccess(true);
      clearCart();

    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (itemCount === 0 && !showSuccess) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-[#FFFDFB] pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <Link href="/" className="inline-flex items-center text-foreground/60 hover:text-primary transition-colors mb-8 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
        </Link>

        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-foreground">Complete Your Booking</h1>

        <div className="lg:col-span-1 space-y-6 mb-2">
          <CartSummary />
        </div>


        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-border">
              <form id="booking-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Honeypot */}
                <input type="text" {...form.register('website')} className="hidden" tabIndex={-1} autoComplete="off" />

                <div className="space-y-4">
                  <h3 className="text-xl font-serif font-bold border-b border-border pb-2">Personal Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
                      <Input id="name" {...form.register('name')} placeholder="Your name" className={form.formState.errors.name ? "border-destructive" : ""} />
                      {form.formState.errors.name && <p className="text-destructive text-xs">{form.formState.errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender <span className="text-destructive">*</span></Label>
                      <Select
                        onValueChange={(val) => form.setValue('gender', val as any)}
                        defaultValue={form.getValues('gender')}
                      >
                        <SelectTrigger className={form.formState.errors.gender ? "border-destructive" : ""}>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number <span className="text-destructive">*</span></Label>
                      <Input id="phone" type="tel" {...form.register('phone')} placeholder="10 digit number" maxLength={10} className={form.formState.errors.phone ? "border-destructive" : ""} />
                      {form.formState.errors.phone && <p className="text-destructive text-xs">{form.formState.errors.phone.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">WhatsApp Number <span className="text-destructive">*</span></Label>
                      <Input id="whatsapp" type="tel" {...form.register('whatsapp')} placeholder="10 digit number" maxLength={10} className={form.formState.errors.whatsapp ? "border-destructive" : ""} />
                      {form.formState.errors.whatsapp && <p className="text-destructive text-xs">{form.formState.errors.whatsapp.message}</p>}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-serif font-bold border-b border-border pb-2">Address</h3>
                  <div className="space-y-2">
                    <Label htmlFor="address">House No. / Flat / Street <span className="text-destructive">*</span></Label>
                    <Textarea id="address" {...form.register('address')} placeholder="Complete address" className={`resize-none ${form.formState.errors.address ? "border-destructive" : ""}`} />
                    {form.formState.errors.address && <p className="text-destructive text-xs">{form.formState.errors.address.message}</p>}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="landmark">Landmark</Label>
                      <Input id="landmark" {...form.register('landmark')} placeholder="Near..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="area">Area / Locality <span className="text-destructive">*</span></Label>
                      <Input id="area" {...form.register('area')} placeholder="e.g. Taj Ganj" className={form.formState.errors.area ? "border-destructive" : ""} />
                      {form.formState.errors.area && <p className="text-destructive text-xs">{form.formState.errors.area.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode <span className="text-destructive">*</span></Label>
                      <Input id="pincode" {...form.register('pincode')} placeholder="282001" maxLength={6} className={form.formState.errors.pincode ? "border-destructive" : ""} />
                      {form.formState.errors.pincode && <p className="text-destructive text-xs">{form.formState.errors.pincode.message}</p>}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-serif font-bold border-b border-border pb-2">Appointment Schedule</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2 flex flex-col">
                      <Label>Preferred Date <span className="text-destructive">*</span></Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal ${!form.watch('preferredDate') ? "text-muted-foreground" : ""} ${form.formState.errors.preferredDate ? "border-destructive" : ""}`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {form.watch('preferredDate') ? format(form.watch('preferredDate'), "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={form.watch('preferredDate')}
                            onSelect={(date) => date && form.setValue('preferredDate', date)}
                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {form.formState.errors.preferredDate && <p className="text-destructive text-xs">{form.formState.errors.preferredDate.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label>Preferred Time <span className="text-destructive">*</span></Label>
                      <Select
                        onValueChange={(val) => form.setValue('preferredTime', val)}
                      >
                        <SelectTrigger className={form.formState.errors.preferredTime ? "border-destructive" : ""}>
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {TIME_SLOTS.map(slot => (
                            <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {form.formState.errors.preferredTime && <p className="text-destructive text-xs">{form.formState.errors.preferredTime.message}</p>}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-serif font-bold border-b border-border pb-2">Payment Mode</h3>
                  <div className="space-y-3">
                    <RadioGroup
                      defaultValue="UPI"
                      onValueChange={(val) => form.setValue('paymentMode', val as any)}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-3 space-y-0 p-3 border rounded-lg hover:bg-secondary/10 cursor-pointer">
                        <RadioGroupItem value="UPI" id="UPI" />
                        <Label htmlFor="UPI" className="flex-1 cursor-pointer font-medium">UPI (GPay, PhonePe, Paytm)</Label>
                      </div>
                      <div className="flex items-center space-x-3 space-y-0 p-3 border rounded-lg hover:bg-secondary/10 cursor-pointer">
                        <RadioGroupItem value="Cash" id="Cash" />
                        <Label htmlFor="Cash" className="flex-1 cursor-pointer font-medium">Cash on Service</Label>
                      </div>
                      <div className="flex items-center space-x-3 space-y-0 p-3 border rounded-lg hover:bg-secondary/10 cursor-pointer">
                        <RadioGroupItem value="Online" id="Online" />
                        <Label htmlFor="Online" className="flex-1 cursor-pointer font-medium">Online Link</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-serif font-bold border-b border-border pb-2">Additional Requests</h3>
                  <Textarea {...form.register('specialInstructions')} placeholder="Any specific requirements or instructions for the beautician?" className="resize-none" />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-7 text-lg font-bold shadow-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</>
                    ) : (
                      'Confirm Booking Request'
                    )}
                  </Button>
                  <p className="text-xs text-center text-foreground/50 mt-3">
                    By confirming, a WhatsApp message will be generated to finalize your slot.
                  </p>
                </div>
              </form>
            </div>
          </div>


        </div>
      </div>

      <BookingSuccessModal
        open={showSuccess}
        onOpenChange={(open) => {
          setShowSuccess(open);
          if (!open) setLocation('/');
        }}
        bookingId={generatedBookingId}
      />
    </div>
  );
}
