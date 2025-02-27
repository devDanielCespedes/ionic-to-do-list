import { isPlatform } from "@ionic/react";

export function useIsMobile() {
  return isPlatform("mobile") || isPlatform("ios") || isPlatform("android");
}
