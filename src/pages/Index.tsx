import { Header } from "@/components/Header";
import { HeroSection, FeaturesSection, CallToActionSection } from "@/components/Homepage";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;