import GlobalBackground from "./components/GlobalBackground";
import HeroSection from "./components/HeroSection";
import ThreeDScrollExperience from "./components/ThreeDScrollExperience";
import AboutArtworkSection from "./components/AboutArtworkSection";
import ConceptSection from "./components/ConceptSection";
import ManifestoSection from "./components/ManifestoSection";
import ArtScienceTechSection from "./components/ArtScienceTechSection";
import ProcessSection from "./components/ProcessSection";
import TechnicalSheetSection from "./components/TechnicalSheetSection";
import FinalSection from "./components/FinalSection";

export default function App() {
  return (
    <main className="relative text-white">
      <GlobalBackground />
      <HeroSection />
      <ThreeDScrollExperience />
      <AboutArtworkSection />
      <ConceptSection />
      <ManifestoSection />
      <ArtScienceTechSection />
      <ProcessSection />
      <TechnicalSheetSection />
      <FinalSection />
    </main>
  );
}
