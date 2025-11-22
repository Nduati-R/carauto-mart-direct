import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VehicleCard from "@/components/VehicleCard";
import FilterSidebar from "@/components/FilterSidebar";
import { useSearchParams } from "react-router-dom";

// Mock vehicle data
const mockVehicles = [
  {
    id: 1,
    name: "Mazda Cx5 (Exclusive trim)",
    brand: "Mazda",
    model: "CX-5",
    year: 2020,
    price: 3949999,
    transmission: "Automatic",
    engine: "2200 CC",
    condition: "Foreign Used",
    bodyType: "SUV",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
    description: "Step into luxury with this refined Mazda CX-5 that combines premium SUV elegance with advanced features.",
    availability: "Available",
    fuelType: "Diesel",
    mileage: "45,000 km",
    color: "Silver",
    seats: 5
  },
  {
    id: 2,
    name: "Toyota Auris",
    brand: "Toyota",
    model: "Auris",
    year: 2014,
    price: 1439999,
    transmission: "Automatic",
    engine: "1800 CC",
    condition: "Kenyan Used",
    bodyType: "Hatchback",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80",
    description: "Small hatch, big energy! This Auris brings it back with a 1.8L petrol engine for effortless cruising.",
    availability: "Available",
    fuelType: "Petrol",
    mileage: "85,000 km",
    color: "Red",
    seats: 5
  },
  {
    id: 3,
    name: "Toyota Crown Royal Saloon",
    brand: "Toyota",
    model: "Crown",
    year: 2010,
    price: 1299999,
    transmission: "Automatic",
    engine: "2500 CC",
    condition: "Kenyan Used",
    bodyType: "Sedan",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    description: "Step into class that combines prestige, comfort, and smooth V6 power with a sense of nostalgia.",
    availability: "Available",
    fuelType: "Petrol",
    mileage: "120,000 km",
    color: "Black",
    seats: 5
  },
  {
    id: 4,
    name: "Honda CR-V",
    brand: "Honda",
    model: "CR-V",
    year: 2018,
    price: 2850000,
    transmission: "Automatic",
    engine: "2000 CC",
    condition: "Foreign Used",
    bodyType: "SUV",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
    description: "Reliable and spacious SUV perfect for families. Excellent fuel economy and comfortable ride.",
    availability: "Available",
    fuelType: "Petrol",
    mileage: "55,000 km",
    color: "White",
    seats: 7
  },
  {
    id: 5,
    name: "Nissan X-Trail",
    brand: "Nissan",
    model: "X-Trail",
    year: 2016,
    price: 2200000,
    transmission: "Automatic",
    engine: "2000 CC",
    condition: "Kenyan Used",
    bodyType: "SUV",
    image: "https://images.unsplash.com/photo-1607275249058-1c70f4d3d6c6?w=800&q=80",
    description: "Versatile SUV with excellent off-road capability and modern safety features.",
    availability: "Available",
    fuelType: "Petrol",
    mileage: "75,000 km",
    color: "Grey",
    seats: 7
  },
  {
    id: 6,
    name: "Mercedes-Benz C-Class",
    brand: "Mercedes-Benz",
    model: "C-Class",
    year: 2019,
    price: 4500000,
    transmission: "Automatic",
    engine: "2000 CC",
    condition: "Foreign Used",
    bodyType: "Sedan",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
    description: "Luxury sedan with premium features and exceptional performance.",
    availability: "Available",
    fuelType: "Petrol",
    mileage: "35,000 km",
    color: "Blue",
    seats: 5
  },
  {
    id: 7,
    name: "BMW X5",
    brand: "BMW",
    model: "X5",
    year: 2017,
    price: 5200000,
    transmission: "Automatic",
    engine: "3000 CC",
    condition: "Foreign Used",
    bodyType: "SUV",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    description: "Premium SUV with powerful engine and cutting-edge technology.",
    availability: "Available",
    fuelType: "Diesel",
    mileage: "60,000 km",
    color: "Black",
    seats: 7
  },
  {
    id: 8,
    name: "Subaru Forester",
    brand: "Subaru",
    model: "Forester",
    year: 2015,
    price: 1950000,
    transmission: "Automatic",
    engine: "2000 CC",
    condition: "Kenyan Used",
    bodyType: "SUV",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80",
    description: "Reliable all-wheel drive SUV perfect for all weather conditions.",
    availability: "Available",
    fuelType: "Petrol",
    mileage: "95,000 km",
    color: "Silver",
    seats: 5
  },
];

const Vehicles = () => {
  const [searchParams] = useSearchParams();
  const brandParam = searchParams.get("brand");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(brandParam || "");
  const [selectedModel, setSelectedModel] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [selectedBodyType, setSelectedBodyType] = useState("");

  const filteredVehicles = mockVehicles.filter((vehicle) => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = !selectedBrand || vehicle.brand === selectedBrand;
    const matchesModel = !selectedModel || vehicle.model === selectedModel;
    const matchesBodyType = !selectedBodyType || vehicle.bodyType === selectedBodyType;
    
    let matchesBudget = true;
    if (budgetRange) {
      const price = vehicle.price;
      switch (budgetRange) {
        case "0-500K":
          matchesBudget = price <= 500000;
          break;
        case "500K-1M":
          matchesBudget = price > 500000 && price <= 1000000;
          break;
        case "1M-2M":
          matchesBudget = price > 1000000 && price <= 2000000;
          break;
        case "2M-3M":
          matchesBudget = price > 2000000 && price <= 3000000;
          break;
        case "3M-5M":
          matchesBudget = price > 3000000 && price <= 5000000;
          break;
        case "5M-10M":
          matchesBudget = price > 5000000 && price <= 10000000;
          break;
        case "Above 10M":
          matchesBudget = price > 10000000;
          break;
      }
    }
    
    return matchesSearch && matchesBrand && matchesModel && matchesBudget && matchesBodyType;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            Show results of <span className="text-brand-red">Automobiles</span>
          </h1>
          <p className="text-muted-foreground">
            Vehicles showing ({filteredVehicles.length})
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <FilterSidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
              budgetRange={budgetRange}
              setBudgetRange={setBudgetRange}
              selectedBodyType={selectedBodyType}
              setSelectedBodyType={setSelectedBodyType}
              vehicles={mockVehicles}
            />
          </aside>

          <main className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
            
            {filteredVehicles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">
                  No vehicles found matching your criteria.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Vehicles;
