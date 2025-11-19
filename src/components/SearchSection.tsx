import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const SearchSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const budgetRanges = [
    "0 - 500K",
    "500K - 1M",
    "1M - 2M",
    "2M - 3M",
    "3M - 5M",
    "5M - 10M",
    "Above 10M",
  ];

  const brands = [
    "Toyota", "Honda", "Mercedes-Benz", "BMW", "Nissan", "Mazda", 
    "Ford", "Volkswagen", "Audi", "Lexus", "Subaru", "Hyundai"
  ];

  const bodyTypes = [
    "Sedan", "SUV", "Truck", "Van", "Hatchback", "Coupe", 
    "Convertible", "Wagon", "Minivan"
  ];

  return (
    <section id="search" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Find Your <span className="text-primary">Perfect Match</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our extensive inventory with powerful search and filtering tools
          </p>
        </div>

        <Card className="max-w-5xl mx-auto">
          <CardHeader>
            <Tabs defaultValue="name" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="name">Search by Name</TabsTrigger>
                <TabsTrigger value="brand">Filter by Brand</TabsTrigger>
                <TabsTrigger value="bodytype">Filter by Body Type</TabsTrigger>
              </TabsList>

              <TabsContent value="name" className="mt-6">
                <CardTitle className="mb-2">Search Vehicle</CardTitle>
                <CardDescription className="mb-4">
                  Simply write the vehicle name and press the search button (e.g., Camry or Civic)
                </CardDescription>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter vehicle name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="hero" size="lg">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="brand" className="mt-6">
                <CardTitle className="mb-4">Select Brand</CardTitle>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {brands.map((brand) => (
                    <Button
                      key={brand}
                      variant="outline"
                      className="justify-start hover:bg-accent"
                      onClick={() => navigate(`/vehicles?brand=${brand}`)}
                    >
                      {brand}
                    </Button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="bodytype" className="mt-6">
                <CardTitle className="mb-4">Select Body Type</CardTitle>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {bodyTypes.map((type) => (
                    <Button
                      key={type}
                      variant="outline"
                      className="justify-start hover:bg-accent"
                      onClick={() => navigate('/vehicles')}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>

          <CardContent className="pt-6 border-t">
            <h3 className="font-semibold mb-4">Filter by Budget</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {budgetRanges.map((range) => (
                <Button
                  key={range}
                  variant="secondary"
                  className="text-sm hover:bg-muted"
                  onClick={() => navigate('/vehicles')}
                >
                  {range}
                </Button>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button variant="link" onClick={() => navigate('/vehicles')}>
                Click here for Advanced Search →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SearchSection;
