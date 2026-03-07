"use client"

import { useEffect } from "react"
import API from "@/lib/api"
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServiceCategories from "@/components/ServiceCategories";
import HowItWorks from "@/components/HowItWorks"
import Footer from "@/components/Footer"

export default function Home() {



  return (
    <>
      <main className="bg-gray-100 min-h-screen">

        <Navbar />

        <HeroSection />

        <ServiceCategories />

        <HowItWorks />

        <Footer />

      </main>
    </>
  );
}
