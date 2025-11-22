import { useComparison } from "@/components/ComparisonContext";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ComparisonBar = () => {
  const { comparisonList, removeFromComparison, clearComparison } = useComparison();
  const navigate = useNavigate();

  if (comparisonList.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg z-40 animate-slide-in-bottom">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 overflow-x-auto">
            <span className="font-semibold whitespace-nowrap">
              Compare ({comparisonList.length}/3)
            </span>
            {comparisonList.map((vehicle) => (
              <div key={vehicle.id} className="flex items-center gap-2 bg-muted px-3 py-2 rounded-lg whitespace-nowrap">
                <span className="text-sm">{vehicle.name}</span>
                <button
                  onClick={() => removeFromComparison(vehicle.id)}
                  className="hover:text-primary"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={clearComparison}>
              Clear All
            </Button>
            <Button 
              onClick={() => navigate("/compare")}
              disabled={comparisonList.length < 2}
            >
              Compare Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonBar;
