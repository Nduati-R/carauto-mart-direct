import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ComparisonProvider } from "./components/ComparisonContext";
import ComparisonBar from "./components/ComparisonBar";
import Index from "./pages/Index";
import Vehicles from "./pages/Vehicles";
import VehicleDetails from "./pages/VehicleDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Compare from "./pages/Compare";
import Blog from "./pages/Blog";
import SellYourCar from "./pages/SellYourCar";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <ComparisonProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/vehicles/:id" element={<VehicleDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/sell-your-car" element={<SellYourCar />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ComparisonBar />
          </BrowserRouter>
        </TooltipProvider>
      </ComparisonProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
