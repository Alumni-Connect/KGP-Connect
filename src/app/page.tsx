"use client"
import  Navbar  from '../components/Nav';
import { Carousel } from '../components/Carousel';
import { FeatureCard } from '../components/FeatureCard';
import { About } from '../components/About';
import { Footer } from '../components/Footer';
import ElegantCards from '@/components/infoCard';

const carouselImages = [
'https://as1.ftcdn.net/v2/jpg/00/99/59/50/1000_F_99595016_E1ZUhVEMr7Q0V109m0q5sSG6x1f0JmaN.jpg',
'https://as1.ftcdn.net/v2/jpg/05/95/47/40/1000_F_595474066_eG9a6YY2uXaZSmFjBMC2HyZY2Wfg7BFi.jpg'
];

const features = [
  {
    title: "Connect",
    description: "Build meaningful connections with your peers and alumni network.",
    icon: "C",
    delay: 0
  },
  {
    title: "Collaborate",
    description: "Work together on projects and share knowledge with your community.",
    icon: "C",
    delay: 0.2
  },
  {
    title: "Grow",
    description: "Expand your horizons and develop your skills through our platform.",
    icon: "G",
    delay: 0.4
  }
];

const LandingPage = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">
      <Carousel images={carouselImages} />
      <section className="py-20 bg-gradient-to-b from-[#F8F9FA] to-[#E9ECEF]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index} 
                {...feature} 
              />
            ))}
          </div>
          <ElegantCards></ElegantCards>
        </div>
      </section>
      <About />
    </main>
    <Footer />
  </div>
);

export default LandingPage;