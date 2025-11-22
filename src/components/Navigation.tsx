import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const vehicleTypes = ["SUVs", "Sedans", "Trucks", "Vans", "Luxury Cars", "Sports Cars"];
  const bikeTypes = ["Sport Bikes", "Cruisers", "Touring", "Off-Road"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">C</span>
              </div>
              <h1 className="text-xl font-display font-bold tracking-tight">
                CARNATION <span className="text-primary">AUTOMART</span>
              </h1>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/vehicles" className="text-sm font-medium hover:text-primary transition-colors">
              Vehicles
            </a>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
                <span>Vehicles</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {vehicleTypes.map((type) => (
                  <DropdownMenuItem key={type}>
                    <a href="#" className="w-full">{type}</a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <a href="#sell" className="text-sm font-medium hover:text-primary transition-colors">
              Sell Your Car
            </a>
            <a href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </a>
            <a href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-border">
            <a href="/vehicles" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              Vehicles
            </a>
            <a href="#sell" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              Sell Your Car
            </a>
            <a href="/about" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              About
            </a>
            <a href="/contact" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
