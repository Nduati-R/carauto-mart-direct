import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface FilterSidebarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  budgetRange: string;
  setBudgetRange: (range: string) => void;
  selectedBodyType: string;
  setSelectedBodyType: (type: string) => void;
  vehicles: any[];
}

const FilterSidebar = ({
  searchQuery,
  setSearchQuery,
  selectedBrand,
  setSelectedBrand,
  selectedModel,
  setSelectedModel,
  budgetRange,
  setBudgetRange,
  selectedBodyType,
  setSelectedBodyType,
  vehicles,
}: FilterSidebarProps) => {
  
  const brands = [
    "Toyota", "Honda", "Mercedes-Benz", "BMW", "Nissan", "Mazda",
    "Ford", "Volkswagen", "Audi", "Lexus", "Subaru", "Hyundai"
  ];

  const bodyTypes = [
    "Sedan", "SUV", "Truck", "Van", "Hatchback", "Coupe",
    "Convertible", "Wagon", "Minivan"
  ];

  const budgetRanges = [
    "0-500K", "500K-1M", "1M-2M", "2M-3M", "3M-5M", "5M-10M", "Above 10M"
  ];

  // Get unique models based on selected brand
  const availableModels = selectedBrand
    ? [...new Set(vehicles.filter(v => v.brand === selectedBrand).map(v => v.model))]
    : [];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Search vehicle</CardTitle>
          <p className="text-sm text-muted-foreground">
            Simply write the vehicle name and press the search button
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="Search vehicle name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button size="icon" variant="default">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Filter by budget</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {budgetRanges.map((range) => (
              <Button
                key={range}
                variant={budgetRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setBudgetRange(budgetRange === range ? "" : range)}
                className="text-xs"
              >
                {range}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Brand & Model</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Select value={selectedBrand} onValueChange={(value) => {
            setSelectedBrand(value === "all" ? "" : value);
            setSelectedModel(""); // Reset model when brand changes
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Vehicle Brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={selectedModel} 
            onValueChange={(value) => setSelectedModel(value === "all" ? "" : value)}
            disabled={!selectedBrand}
          >
            <SelectTrigger>
              <SelectValue placeholder="Vehicle Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Models</SelectItem>
              {availableModels.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedBodyType} onValueChange={(value) => setSelectedBodyType(value === "all" ? "" : value)}>
            <SelectTrigger>
              <SelectValue placeholder="Body Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {bodyTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Button variant="link" className="w-full">
        Click here for Advanced search →
      </Button>
    </div>
  );
};

export default FilterSidebar;
