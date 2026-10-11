import {
  Bath,
  Building2,
  ClipboardCheck,
  Fence,
  Hammer,
  Home,
  HousePlus,
  Layers,
  Paintbrush,
  Siren,
  Store,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Bath,
  Building2,
  ClipboardCheck,
  Fence,
  Hammer,
  Home,
  HousePlus,
  Layers,
  Paintbrush,
  Siren,
  Store,
  Wrench,
  Zap,
};

export default function ServiceIcon({ name, className }: { name?: string; className?: string }) {
  const Icon = (name && icons[name]) || Wrench;
  return <Icon className={className} />;
}
