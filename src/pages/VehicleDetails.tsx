import { useParams, useNavigate } from "react-router-dom";
import { mockVehicles } from "@/pages/Vehicles";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageCircle, Heart, GitCompare } from "lucide-react";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import VehicleCard from "@/components/VehicleCard";
import { useComparison } from "@/components/ComparisonContext";

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToComparison, isInComparison } = useComparison();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const vehicle = mockVehicles.find((v) => v.id === Number(id));

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Vehicle Not Found</h1>
          <Button onClick={() => navigate("/vehicles")}>Back to Vehicles</Button>
        </div>
      </div>
    );
  }

  const similarVehicles = mockVehicles
    .filter((v) => v.id !== vehicle.id && (v.brand === vehicle.brand || v.bodyType === vehicle.bodyType))
    .slice(0, 3);

  const formatPrice = (price: number) => `KES ${price.toLocaleString()}`;

  const handleWhatsAppClick = () => {
    const message = `Hi, I'm interested in the ${vehicle.year} ${vehicle.name} listed at ${formatPrice(vehicle.price)}`;
    const phoneNumber = "254722000000"; // Replace with actual WhatsApp number
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/vehicles")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Vehicles
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="relative">
            {/* Background text effect */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <span className="text-[200px] font-display font-bold text-muted/5 select-none whitespace-nowrap">
                {vehicle.brand.toUpperCase()}
              </span>
            </div>
            
            <Carousel className="w-full relative z-10">
              <CarouselContent>
                {vehicle.images?.map((img, index) => (
                  <CarouselItem key={index}>
                    <div 
                      className="relative cursor-pointer group"
                      onClick={() => setSelectedImage(img)}
                    >
                      <img
                        src={img}
                        alt={`${vehicle.name} - ${index + 1}`}
                        className="w-full h-[500px] object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                        <span className="text-white font-semibold">Click to enlarge</span>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>

            {/* Thumbnail gallery */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {vehicle.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75 transition-opacity"
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Vehicle Details */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge className="mb-2 bg-green-500 hover:bg-green-600">
                  {vehicle.availability}
                </Badge>
                <h1 className="text-4xl font-display font-bold mb-2">
                  {vehicle.name}
                </h1>
                <p className="text-xl text-muted-foreground">{vehicle.year}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-brand-red text-brand-red' : ''}`} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => addToComparison(vehicle)}
                  className={isInComparison(vehicle.id) ? 'ring-2 ring-primary' : ''}
                >
                  <GitCompare className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <p className="text-3xl font-bold text-brand-red mb-6">
              {formatPrice(vehicle.price)}
            </p>

            <p className="text-muted-foreground mb-6">{vehicle.description}</p>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-4">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Brand</p>
                    <p className="font-semibold">{vehicle.brand}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Model</p>
                    <p className="font-semibold">{vehicle.model}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Year</p>
                    <p className="font-semibold">{vehicle.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Transmission</p>
                    <p className="font-semibold">{vehicle.transmission}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Engine</p>
                    <p className="font-semibold">{vehicle.engine}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fuel Type</p>
                    <p className="font-semibold">{vehicle.fuelType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Mileage</p>
                    <p className="font-semibold">{vehicle.mileage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Condition</p>
                    <p className="font-semibold">{vehicle.condition}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Body Type</p>
                    <p className="font-semibold">{vehicle.bodyType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Color</p>
                    <p className="font-semibold">{vehicle.color}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Seats</p>
                    <p className="font-semibold">{vehicle.seats}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              className="w-full gap-2"
              onClick={handleWhatsAppClick}
            >
              <MessageCircle className="h-5 w-5" />
              Enquire via WhatsApp
            </Button>
          </div>
        </div>

        {/* Similar Vehicles */}
        {similarVehicles.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-display font-bold mb-6">
              Similar Vehicles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarVehicles.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />

      {/* Image Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-7xl w-full p-0 border-0">
          <img
            src={selectedImage || ""}
            alt="Enlarged view"
            className="w-full h-auto max-h-[90vh] object-contain"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VehicleDetails;
