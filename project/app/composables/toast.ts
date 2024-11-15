import { useToast as originalUseToast } from '@/components/ui/toast/use-toast';

export function useToast() {
  return originalUseToast();
}
