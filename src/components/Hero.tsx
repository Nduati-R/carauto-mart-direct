import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroCarImage from "@/assets/hero-car.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 px-4">
      {/* Hero Content */}
      <div className="container mx-auto text-center space-y-8 z-10">
        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Your Premier <span className="font-bold">Used Car</span> Marketplace
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover quality pre-owned vehicles that fit your lifestyle, dream, and budget
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            variant="hero" 
            size="lg"
            className="min-w-[200px]"
            onClick={() => document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Vehicles
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="min-w-[200px] hover:bg-secondary transition-all duration-300"
            onClick={() => document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Buy a Bike
          </Button>
          <Button 
            variant="secondary" 
            size="lg"
            className="min-w-[200px] hover:bg-muted transition-all duration-300"
          >
            Sell Your Car
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="pt-8 animate-bounce">
          <p className="text-sm italic text-muted-foreground mb-2 font-serif">Scroll down</p>
          <ChevronDown className="mx-auto h-6 w-6 text-muted-foreground" />
        </div>
      </div>

      {/* Hero Car Image */}
      <div className="container mx-auto mt-12">
        <img 
          src={heroCarImage} 
          alt="Premium luxury SUV available at Car Automart Limited" 
          className="w-full max-w-5xl mx-auto object-contain"
        />
      </div>
    </section>
  );
};

export default Hero;
