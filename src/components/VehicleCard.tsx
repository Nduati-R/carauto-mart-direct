import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, GitCompare, Eye } from "lucide-react";
import { useComparison } from "@/components/ComparisonContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Vehicle {
  id: number;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  transmission: string;
  engine: string;
  condition: string;
  bodyType: string;
  image: string;
  images?: string[];
  description: string;
  availability: string;
  fuelType: string;
  mileage: string;
  color: string;
  seats: number;
}

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const { addToComparison, isInComparison } = useComparison();
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  
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
        <div className="absolute top-3 right-3 flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-2 bg-white/90 dark:bg-black/90 rounded-full hover:bg-white dark:hover:bg-black transition-colors"
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-brand-red text-brand-red' : 'text-brand-red'}`} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to favorites</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={() => addToComparison(vehicle)}
                  className={`p-2 bg-white/90 dark:bg-black/90 rounded-full hover:bg-white dark:hover:bg-black transition-colors ${isInComparison(vehicle.id) ? 'ring-2 ring-primary' : ''}`}
                >
                  <GitCompare className="h-5 w-5 text-primary" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Compare vehicle</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <button
          onClick={() => navigate(`/vehicles/${vehicle.id}`)}
          className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <div className="flex items-center gap-2 text-white">
            <Eye className="h-6 w-6" />
            <span className="font-semibold">View Details</span>
          </div>
        </button>
      </div>
      
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-sm text-muted-foreground">{vehicle.year}</p>
            <h3 className="font-bold text-lg mb-1">{vehicle.name}</h3>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
          <div><span className="font-semibold">Model:</span> {vehicle.model}</div>
          <div><span className="font-semibold">Transmission:</span> {vehicle.transmission}</div>
          <div><span className="font-semibold">Engine:</span> {vehicle.engine}</div>
          <div><span className="font-semibold">Fuel:</span> {vehicle.fuelType}</div>
          <div><span className="font-semibold">Mileage:</span> {vehicle.mileage}</div>
          <div><span className="font-semibold">Condition:</span> {vehicle.condition}</div>
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
