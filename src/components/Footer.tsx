import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">C</span>
              </div>
              <h3 className="font-bold text-lg">
                CAR <span className="text-primary">AUTOMART</span>
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted partner in finding quality pre-owned vehicles at the best prices.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#vehicles" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse Vehicles
                </a>
              </li>
              <li>
                <a href="#bikes" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse Bikes
                </a>
              </li>
              <li>
                <a href="#sell" className="text-muted-foreground hover:text-primary transition-colors">
                  Sell Your Car
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold">Services</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Vehicle Inspection</li>
              <li className="text-muted-foreground">Financing Options</li>
              <li className="text-muted-foreground">Trade-In Services</li>
              <li className="text-muted-foreground">After Sales Support</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 mt-0.5" />
                <span>+254 XXX XXX XXX</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 mt-0.5" />
                <span>info@carautomart.com</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Car Automart Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
