import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

interface BookingSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: string;
}

export function BookingSuccessModal({ open, onOpenChange, bookingId }: BookingSuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md text-center p-8">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
        </div>
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif font-bold text-center mb-2">Booking Request Sent!</DialogTitle>
          <DialogDescription className="text-base text-center">
            Your booking ID is <span className="font-bold text-foreground">{bookingId}</span>.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 text-foreground/70">
          <p>We've prepared your booking details on WhatsApp. Please send the message to complete your reservation.</p>
          <p className="mt-2 text-sm">Our team will confirm your appointment shortly.</p>
        </div>
        
        <div className="mt-6 flex flex-col gap-3">
          <Link href="/">
            <Button variant="outline" className="w-full rounded-full" onClick={() => onOpenChange(false)}>
              Back to Home
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
