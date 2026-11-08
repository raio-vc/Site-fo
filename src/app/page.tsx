import SectionHero from "@/components/SectionHero";
import SectionProblem from "@/components/SectionProblem";
import SectionConstellation from "@/components/SectionConstellation";
import SectionMetaphor from "@/components/SectionMetaphor";
import SectionApproach from "@/components/SectionApproach";
import SectionServices from "@/components/SectionServices";
import SectionValues from "@/components/SectionValues";
import SectionContact from "@/components/SectionContact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <SectionHero />
      <SectionProblem />
      <SectionConstellation />
      <SectionMetaphor />
      <SectionApproach />
      <SectionServices />
      <SectionValues />
      <SectionContact />
      <Footer />
    </main>
  );
}
