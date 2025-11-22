import { createContext, useContext, useState, ReactNode } from "react";

interface Vehicle {
  id: number;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  transmission: string;
  engine: string;
  condition: string;
  bodyType: string;
  image: string;
  description: string;
  availability: string;
  fuelType: string;
  mileage: string;
  color: string;
  seats: number;
}

interface ComparisonContextType {
  comparisonList: Vehicle[];
  addToComparison: (vehicle: Vehicle) => void;
  removeFromComparison: (id: number) => void;
  clearComparison: () => void;
  isInComparison: (id: number) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider = ({ children }: { children: ReactNode }) => {
  const [comparisonList, setComparisonList] = useState<Vehicle[]>([]);

  const addToComparison = (vehicle: Vehicle) => {
    if (comparisonList.length >= 3) {
      alert("You can only compare up to 3 vehicles");
      return;
    }
    if (!comparisonList.find(v => v.id === vehicle.id)) {
      setComparisonList([...comparisonList, vehicle]);
    }
  };

  const removeFromComparison = (id: number) => {
    setComparisonList(comparisonList.filter(v => v.id !== id));
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  const isInComparison = (id: number) => {
    return comparisonList.some(v => v.id === id);
  };

  return (
    <ComparisonContext.Provider value={{
      comparisonList,
      addToComparison,
      removeFromComparison,
      clearComparison,
      isInComparison
    }}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error("useComparison must be used within ComparisonProvider");
  }
  return context;
};
