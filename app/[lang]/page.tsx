import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Quote from "@/components/Quote";
import Portfolio from "@/components/Portfolio";
import Partners from "@/components/Partners";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Process />
      <Quote />
      <Portfolio />
      <Partners />
      <Cta />
      <Footer />
    </main>
  );
}
