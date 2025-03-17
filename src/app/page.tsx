"use client";

import LandingNavbar from "@/components/LandingNavbar";
import Footer from "../components/Footer";
import Carousel from "@/components/Carousel";
import AboutSection from "@/components/AboutSection";
import SocialMedia from "@/components/Social";
import JoyOfGiving from "@/components/Alumni";
import YoutubeSection from "@/components/LandingYoutube";
import HallShowcase from "@/components/HallSection";
import NewsSection from "@/components/NewsSection";
const LandingPage = () => (
  <div className="min-h-screen flex flex-col overflow-x-hidden">
    <LandingNavbar />
    <Carousel />
    <div className="flex flex-col px-[80px]">
      <HallShowcase />
      <NewsSection />
      <JoyOfGiving />
      <AboutSection />
      <YoutubeSection />
      <SocialMedia />
    </div>
    <Footer />
  </div>
);

export default LandingPage;
