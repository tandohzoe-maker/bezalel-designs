import { BrandIntro } from "@/components/sections/BrandIntro";
import { Hero } from "@/components/home/Hero";
import { Bento } from "@/components/home/Bento";
import { SelectedWork } from "@/components/home/SelectedWork";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { Details } from "@/components/home/Details";
import { TrackRecord } from "@/components/home/TrackRecord";
import { clients, trackRecord } from "@/config/about";
import { serviceCategories } from "@/config/services";
import { projects } from "@/config/portfolio";

export default function HomePage() {
  return (
    <>
      <BrandIntro />
      <Hero />
      <Bento clients={clients} />
      <SelectedWork projects={projects.filter((p) => p.featured).slice(0, 4)} />
      <ServicesShowcase services={serviceCategories} />
      <Details />
      <TrackRecord stats={trackRecord} clients={clients} />
    </>
  );
}
