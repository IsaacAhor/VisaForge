
import { LucideIcon } from "lucide-react";

interface HowItWorksStepProps {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  motionIcon?: LucideIcon;
  isLast?: boolean;
}

export function HowItWorksStep({ number, title, description, icon: Icon, isLast }: HowItWorksStepProps) {
  return (
    <div className="relative flex items-start gap-4 md:gap-6 group">
      <div className="flex-shrink-0">
        <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-visa-blue/10 transition-colors group-hover:bg-visa-blue/20">
          <Icon className="h-5 w-5 md:h-6 md:w-6 text-visa-blue" />
        </div>
        {!isLast && (
          <div className="absolute left-6 md:left-7 top-12 md:top-14 h-full w-[2px] bg-gradient-to-b from-visa-blue/20 to-transparent" />
        )}
      </div>
      <div className="pb-8 md:pb-12">
        <div className="mb-2 inline-flex h-7 md:h-8 items-center justify-center rounded-full bg-visa-blue/5 px-3 text-sm font-medium text-visa-blue">
          {number}
        </div>
        <h3 className="mb-2 text-lg md:text-xl font-semibold text-visa-dark">{title}</h3>
        <p className="text-sm md:text-base text-visa-dark/60">{description}</p>
      </div>
    </div>
  );
}
