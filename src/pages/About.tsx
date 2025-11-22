import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Car, DollarSign, RefreshCw, Award } from "lucide-react";

const About = () => {
  const services = [
    {
      icon: DollarSign,
      title: "Car Financing",
      description: "Our finance department provides flexible and competitive financing options to help you purchase your dream car with ease. We work with trusted lenders to offer the best rates."
    },
    {
      icon: Car,
      title: "Looking For a Car?",
      description: "Our cars are delivered fully-registered with all requirements completed. We'll deliver your car wherever you are."
    },
    {
      icon: RefreshCw,
      title: "Vehicle Trade-in",
      description: "Car Automart Limited offers a secure, verified and transparent platform where cars can be traded. We ensure all transactions are safe and transparent."
    }
  ];

  const stats = [
    { value: "500+", label: "Vehicles in Stock" },
    { value: "1000+", label: "Happy Customers" },
    { value: "50+", label: "Expert Staff" },
    { value: "15+", label: "Years Experience" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-16">
        {/* Hero Section */}
        <div className="relative h-64 bg-gradient-to-br from-primary/20 via-background to-background flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">About Us</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto font-body">
              Learn more about Car Automart Limited and our commitment to excellence
            </p>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-lg text-muted-foreground mb-4 font-body">Welcome to</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              CAR AUTOMART LIMITED
            </h2>
            <p className="text-lg leading-relaxed font-body">
              We are a trusted and reputable car dealership, dedicated to delivering exceptional sales experiences that go beyond the ordinary. With a knowledgeable and passionate team, we take pride in guiding our customers through the car-buying journey, ensuring they find the perfect vehicle to match their lifestyle and needs. Our commitment to customer satisfaction is unwavering, and we consistently strive to exceed expectations at every turn, making your experience with us smooth, personalized, and rewarding.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <p className="text-sm text-muted-foreground font-body">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Services */}
          <div className="mb-16">
            <h2 className="text-3xl font-display font-bold text-center mb-12">
              Our Products & Services
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-display font-bold mb-3">{service.title}</h3>
                      <p className="text-muted-foreground font-body">{service.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-display font-bold mb-4 flex items-center gap-2">
                  <Award className="h-6 w-6 text-primary" />
                  Our Mission
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  To provide our customers with the highest quality vehicles and exceptional service, ensuring every purchase is a confident and satisfying experience. We aim to build lasting relationships through trust, transparency, and dedication to excellence.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-display font-bold mb-4 flex items-center gap-2">
                  <Award className="h-6 w-6 text-primary" />
                  Our Vision
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  To be Kenya's most trusted and innovative car dealership, recognized for our commitment to customer satisfaction, quality vehicles, and outstanding service. We strive to set new standards in the automotive industry.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
