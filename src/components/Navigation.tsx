import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary rounded flex items-center justify-center">
                <img src="/images/logo.png" alt="CarNation Automart Logo" className="h-6 w-6" />
              </div>
              <h1 className="text-xl font-display font-bold tracking-tight">
                CARNATION <span className="text-primary">AUTOMART</span>
              </h1>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">

            {/* Vehicles Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
                <span>Vehicles</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start" className="w-56 p-0 shadow-lg">
                {/* Top Section - highlighted like screenshot */}
                <DropdownMenuItem className="px-4 py-2 font-medium cursor-pointer bg-primary/10 hover:bg-primary/20">
                  <a href="/vehicles" className="w-full text-sm text-foreground">
                  All Vehicles
                  </a>
                </DropdownMenuItem>

                <div className="border-b border-gray-700" />

                {/* Lower items */}
                <DropdownMenuItem className="px-4 py-2">
                  <a href="/vehicles/kenya" className="w-full text-sm">
                    Available in Kenya
                  </a>
                </DropdownMenuItem>

                <DropdownMenuItem className="px-4 py-2">
                  <a href="/vehicles/import" className="w-full text-sm">
                    Direct Import / International Stock
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Other Nav Items */}
            <a href="/sell-your-car" className="text-sm font-medium hover:text-primary transition-colors">
              Sell Your Car
            </a>
            <a href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </a>
            <a href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              Blog
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
            <a href="/sell-your-car" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              Sell Your Car
            </a>
            <a href="/about" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              About
            </a>
            <a href="/blog" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
              Blog
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
