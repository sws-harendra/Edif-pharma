import CareerComponent from "./components/CareersSection";
import CertificationsSection from "./components/CertificationsSection";
import CTASection from "./components/CTASection";
import GlobalPresenceSection from "./components/GlobalPresenceSection";
import Hero from "./components/Hero";
import InsightsSection from "./components/InsightsSection";
import ManufacturingSection from "./components/ManufacturingSection";
import PartnersSection from "./components/PartnersSection";
import PressMediaSection from "./components/PressMediaSection";
import ProductsSection from "./components/ProductsSection";
import ResponsibilitySection from "./components/ResponsibilitySection";
import RnDSection from "./components/RnDSection";
import StatsSection from "./components/StatsSection";
import TestimonialsSection from "./components/TestimonialsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <ProductsSection />
      <RnDSection />
      <ManufacturingSection />
      <CertificationsSection />
      <GlobalPresenceSection />
      <InsightsSection />
      <PressMediaSection />
      <ResponsibilitySection />
      <CareerComponent />
      <TestimonialsSection />
      <PartnersSection />
      <CTASection />
    </>
  );
}
