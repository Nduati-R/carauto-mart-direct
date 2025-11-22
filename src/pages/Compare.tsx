import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useComparison } from "@/components/ComparisonContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Compare = () => {
  const { comparisonList, clearComparison } = useComparison();
  const navigate = useNavigate();

  if (comparisonList.length < 2) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">No Vehicles to Compare</h1>
          <p className="text-muted-foreground mb-6">
            Please select at least 2 vehicles to compare
          </p>
          <Button onClick={() => navigate("/vehicles")}>
            Browse Vehicles
          </Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => `KES ${price.toLocaleString()}`;

  const specs = [
    { label: "Price", key: "price", format: formatPrice },
    { label: "Year", key: "year" },
    { label: "Brand", key: "brand" },
    { label: "Model", key: "model" },
    { label: "Body Type", key: "bodyType" },
    { label: "Transmission", key: "transmission" },
    { label: "Engine", key: "engine" },
    { label: "Fuel Type", key: "fuelType" },
    { label: "Mileage", key: "mileage" },
    { label: "Condition", key: "condition" },
    { label: "Color", key: "color" },
    { label: "Seats", key: "seats" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate("/vehicles")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Vehicles
          </Button>
          <Button variant="outline" onClick={clearComparison}>
            Clear Comparison
          </Button>
        </div>

        <h1 className="text-3xl font-bold mb-8">Compare Vehicles</h1>

        <div className="overflow-x-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-w-max">
            {comparisonList.map((vehicle) => (
              <Card key={vehicle.id} className="p-6">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-bold mb-4">{vehicle.name}</h2>
                
                <div className="space-y-3">
                  {specs.map((spec) => {
                    const value = vehicle[spec.key as keyof typeof vehicle];
                    const displayValue = spec.format 
                      ? spec.format(value as number)
                      : value;
                    
                    return (
                      <div key={spec.key} className="flex justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">{spec.label}</span>
                        <span className="font-semibold">{displayValue}</span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Compare;
