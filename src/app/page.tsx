import Hero from "@/components/ui/Hero";
import Manifesto from "@/components/ui/Manifesto";
import ForWho from "@/components/ui/ForWho";
import Services from "@/components/ui/Services";
import Projects from "@/components/ui/Projects";
import Testimonials from "@/components/ui/Testimonials";
import Contact from "@/components/ui/Contact";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-background text-foreground overflow-hidden">
      <div data-theme="dark"><Hero /></div>
      <div id="manifesto" data-theme="dark"><Manifesto /></div>
      <div id="for-who" data-theme="dark"><ForWho /></div>
      <div id="services" data-theme="dark"><Services /></div>
      <div id="projects" data-theme="dark"><Projects /></div>
      <div id="testimonials" data-theme="dark"><Testimonials /></div>

      <div id="contact" data-theme="light">
        <Contact />
        <Footer />
      </div>

      <Navbar />
    </main>
  );
}
