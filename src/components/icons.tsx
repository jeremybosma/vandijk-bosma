import type { ComponentType, SVGProps } from "react";
import {
  IconBriefcase,
  IconCalendar,
  IconCar,
  IconCheckmark,
  IconClock,
  IconHouse,
  IconLine3Horizontal,
  IconMappin,
  IconMoonStars,
  IconShield,
  IconSofa,
  IconSparkles,
  IconStar,
  IconWind,
  IconXmark,
} from "symbols-react";

type SymbolIcon = ComponentType<
  SVGProps<SVGSVGElement> & {
    fill?: string;
    width?: string | number;
    height?: string | number;
  }
>;

function symbol(Icon: SymbolIcon, label: string) {
  function Symbol({
    className,
    size = 18,
  }: {
    className?: string;
    size?: number;
  }) {
    return (
      <Icon
        aria-hidden
        width={size}
        height={size}
        fill="currentColor"
        className={className}
      />
    );
  }
  Symbol.displayName = label;
  return Symbol;
}

export const Icons = {
  Briefcase: symbol(IconBriefcase, "IconBriefcase"),
  Calendar: symbol(IconCalendar, "IconCalendar"),
  Car: symbol(IconCar, "IconCar"),
  Checkmark: symbol(IconCheckmark, "IconCheckmark"),
  Clock: symbol(IconClock, "IconClock"),
  House: symbol(IconHouse, "IconHouse"),
  Menu: symbol(IconLine3Horizontal, "IconMenu"),
  Mappin: symbol(IconMappin, "IconMappin"),
  MoonStars: symbol(IconMoonStars, "IconMoonStars"),
  Shield: symbol(IconShield, "IconShield"),
  Sofa: symbol(IconSofa, "IconSofa"),
  Sparkles: symbol(IconSparkles, "IconSparkles"),
  Star: symbol(IconStar, "IconStar"),
  Wind: symbol(IconWind, "IconWind"),
  Close: symbol(IconXmark, "IconClose"),
} as const;
