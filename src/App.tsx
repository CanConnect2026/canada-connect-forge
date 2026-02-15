import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import Directory from "./pages/Directory";
import MapPage from "./pages/MapPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import GetInvolved from "./pages/GetInvolved";
import Login from "./pages/Login";
import ListingDetail from "./pages/ListingDetail";
import Admin from "./pages/Admin";
import SuggestService from "./pages/SuggestService";
import CityGuide from "./pages/CityGuide";
import Guides from "./pages/Guides";
import EventDetail from "./pages/EventDetail";
import SubmitEvent from "./pages/SubmitEvent";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/directory" element={<Directory />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/listing/:id" element={<ListingDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/submit-event" element={<SubmitEvent />} />
              <Route path="/get-involved" element={<GetInvolved />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/suggest" element={<SuggestService />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/guides/:city" element={<CityGuide />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
