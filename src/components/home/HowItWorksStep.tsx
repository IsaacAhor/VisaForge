
import { LucideIcon } from "lucide-react";

interface HowItWorksStepProps {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  isLast?: boolean;
}

export function HowItWorksStep({ number, title, description, icon: Icon, isLast }: HowItWorksStepProps) {
  return (
    <div className="relative flex items-start gap-6">
      <div className="flex-shrink-0">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-visa-blue/10">
          <Icon className="h-6 w-6 text-visa-blue" />
        </div>
        {!isLast && (
          <div className="absolute left-7 top-14 h-full w-[2px] bg-gradient-to-b from-visa-blue/20 to-transparent" />
        )}
      </div>
      <div className="pb-12">
        <div className="mb-2 inline-flex h-8 items-center justify-center rounded-full bg-visa-blue/5 px-3 text-sm font-medium text-visa-blue">
          {number}
        </div>
        <h3 className="mb-2 text-xl font-semibold text-visa-dark">{title}</h3>
        <p className="text-visa-dark/60">{description}</p>
      </div>
    </div>
  );
}
