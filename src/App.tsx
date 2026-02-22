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
import HowToGuides from "./pages/HowToGuides";
import ArticleDetail from "./pages/ArticleDetail";
import FAQ from "./pages/FAQ";
import HowWeVerify from "./pages/HowWeVerify";
import HelpCentre from "./pages/HelpCentre";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import HowWeChooseFeatured from "./pages/HowWeChooseFeatured";
import Advertise from "./pages/Advertise";
import ConfirmNewsletter from "./pages/ConfirmNewsletter";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
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
              <Route path="/how-to" element={<HowToGuides />} />
              <Route path="/how-to/:slug" element={<ArticleDetail />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/how-we-verify" element={<HowWeVerify />} />
              <Route path="/help" element={<HelpCentre />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/how-we-choose-featured" element={<HowWeChooseFeatured />} />
              <Route path="/advertise" element={<Advertise />} />
              <Route path="/confirm" element={<ConfirmNewsletter />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
