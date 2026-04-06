import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Impact from "@/components/Impact";
import Process from "@/components/Process";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Work />
      <Impact />
      <Process />
      <Cta />
      <Footer />
    </main>
  );
}
