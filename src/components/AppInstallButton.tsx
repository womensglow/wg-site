import { Button } from '@/components/ui/button';
import { usePwaPrompt } from '@/hooks/usePwaPrompt';
import { Download } from 'lucide-react';

export function AppInstallButton() {
  const { deferredPrompt, promptInstall, isInstalled } = usePwaPrompt();

  if (!deferredPrompt || isInstalled) {
    return null;
  }

  return (
    <Button
      type="button"
      onClick={async () => {
        await promptInstall();
      }}
      className="inline-flex items-center gap-2 rounded-full bg-secondary/95 text-foreground hover:bg-secondary"
    >
      <Download className="h-4 w-4" />
      Install App
    </Button>
  );
}
