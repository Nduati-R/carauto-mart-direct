import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const openingHours = [
    { day: "Monday", hours: "8:00 AM to 6:00 PM" },
    { day: "Tuesday", hours: "8:00 AM to 6:00 PM" },
    { day: "Wednesday", hours: "8:00 AM to 6:00 PM" },
    { day: "Thursday", hours: "8:00 AM to 6:00 PM" },
    { day: "Friday", hours: "8:00 AM to 6:00 PM" },
    { day: "Saturday", hours: "8:00 AM to 6:00 PM" },
    { day: "Sunday", hours: "Closed" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        {/* Hero Section */}
        <div className="relative h-64 bg-gradient-to-br from-primary/20 via-background to-background flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Contact Us</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto font-body">
              We'd love to hear from you. Get in touch with us today!
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-display font-bold mb-6">LET'S GET IN TOUCH!</h2>
                <p className="text-muted-foreground font-body mb-8">
                  Visit our showroom or reach out to us through any of the channels below.
                </p>
              </div>

              <Card>
                <CardContent className="pt-6 space-y-6">
                  {/* Address */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold mb-1">Address</h3>
                      <p className="font-body text-muted-foreground">
                        Car Nation, Lang'ata Road, Nairobi
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold mb-1">Phone</h3>
                      <div className="font-body text-muted-foreground space-y-1">
                        <a href="tel:+254703840814" className="block hover:text-primary transition-colors">
                          +254 7 0384 0814
                        </a>
                        <a href="tel:+254719848282" className="block hover:text-primary transition-colors">
                          +254 719 84 82 82
                        </a>
                        <a href="tel:+254740666444" className="block hover:text-primary transition-colors">
                          +254 740 666 444
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold mb-1">Email</h3>
                      <a 
                        href="mailto:info@carnationkenya.com" 
                        className="font-body text-muted-foreground hover:text-primary transition-colors"
                      >
                        info@carnationkenya.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Opening Hours */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-display text-lg font-bold">Opening Hours</h3>
                  </div>
                  <div className="space-y-2 font-body">
                    {openingHours.map((item) => (
                      <div key={item.day} className="flex justify-between py-2 border-b border-border last:border-0">
                        <span className="font-semibold">{item.day}</span>
                        <span className={item.hours === "Closed" ? "text-muted-foreground" : "text-foreground"}>
                          {item.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map */}
            <div className="h-[600px] rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8229!2d36.7419!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMzEuNiJTIDM2wrA0NCczMC45IkU!5e0!3m2!1sen!2ske!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Car Automart Limited Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
