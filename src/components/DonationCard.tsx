import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DonationCardProps {
  amount: number;
  label: string;
  description: string;
  isSelected: boolean;
  onSelect: () => void;
}

const DonationCard = ({
  amount,
  label,
  description,
  isSelected,
  onSelect,
}: DonationCardProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card
      onClick={onSelect}
      className={`cursor-pointer transition-all ${
        isSelected
          ? "border-2 border-primary ring-2 ring-primary/20"
          : "border-border hover:border-primary/50 hover:shadow-md"
      }`}
    >
      <CardContent className="p-4 text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          {isSelected && (
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
              <Check className="h-3 w-3 text-primary-foreground" />
            </div>
          )}
          <span className="font-serif text-2xl font-bold text-foreground">
            {formatCurrency(amount)}
          </span>
        </div>
        <p className="font-medium text-foreground">{label}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default DonationCard;
