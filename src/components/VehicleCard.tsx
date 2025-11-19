import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface Vehicle {
  id: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  transmission: string;
  engine: string;
  condition: string;
  bodyType: string;
  image: string;
  description: string;
  availability: string;
}

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const formatPrice = (price: number) => {
    return `KES ${price.toLocaleString()}`;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative">
        <img 
          src={vehicle.image} 
          alt={vehicle.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-600">
          {vehicle.availability}
        </Badge>
        <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
          <Heart className="h-5 w-5 text-brand-red" />
        </button>
      </div>
      
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-sm text-muted-foreground">{vehicle.year}</p>
            <h3 className="font-bold text-lg mb-1">{vehicle.name}</h3>
          </div>
        </div>

        <div className="flex gap-4 text-sm text-muted-foreground mb-3">
          <span>{vehicle.transmission}</span>
          <span>{vehicle.engine}</span>
          <span>{vehicle.condition}</span>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {vehicle.description}
        </p>

        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-brand-red">
            {formatPrice(vehicle.price)}
          </p>
          <Button variant="default" size="sm">
            PRIVATE SELLER
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleCard;
