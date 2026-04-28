import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AgeGate from "@/components/AgeGate";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Locations from "./pages/Locations";
import LocationDetail from "./pages/LocationDetail";
import About from "./pages/About";
import HouseRules from "./pages/HouseRules";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AgeGate>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/locations/:slug" element={<LocationDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/house-rules" element={<HouseRules />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/find-us" element={<Navigate to="/locations/bijlmer" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AgeGate>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
