
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon,
  className 
}: FeatureCardProps) => {
  return (
    <div className={cn(
      "glass-card rounded-xl p-6 flex flex-col items-center text-center",
      "transition-all duration-300 hover:scale-105",
      className
    )}>
      <div className="h-14 w-14 rounded-full bg-gradient-to-br from-astracoin-medium-purple to-astracoin-bright-purple flex items-center justify-center mb-4">
        <Icon className="h-7 w-7 text-white" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-astracoin-text-gray">{description}</p>
    </div>
  );
};

export default FeatureCard;
