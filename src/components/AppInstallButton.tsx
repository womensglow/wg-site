import { Button } from '@/components/ui/button';
import { usePwaPrompt } from '@/hooks/usePwaPrompt';
import { Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppInstallButtonProps {
  className?: string;
  onInstalled?: () => void;
}

export function AppInstallButton({ className, onInstalled }: AppInstallButtonProps) {
  const { deferredPrompt, promptInstall, isInstalled } = usePwaPrompt();

  if (!deferredPrompt || isInstalled) {
    return null;
  }

  return (
    <Button
      type="button"
      onClick={async () => {
        const installed = await promptInstall();
        if (installed) onInstalled?.();
      }}
      className={cn(
        'inline-flex items-center gap-2 rounded-full bg-secondary/95 text-foreground hover:bg-secondary',
        className,
      )}
    >
      <Download className="h-4 w-4" />
      Install App
    </Button>
  );
}
