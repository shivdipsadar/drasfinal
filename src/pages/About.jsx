import React from "react"
import useData from "../hooks/useData";

import AboutSection from "../components/About";
import VisionaryCard from "../components/VisionaryCard";
import ValuesSection from "../components/ValuesSection";

import PageHero from "../components/PageHero";

import { getImageUrl } from "../utils/api";

const About = () => {
  const { data, loading, error } = useData();

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="h-screen flex items-center justify-center text-red-500">Failed to load data</div>;
  }

  if (!data) return null;

  return (
    <>
      {data.aboutPage?.hero?.visible && (
        <PageHero
          title={data.aboutPage.hero.title}
          backgroundImage={(data.about.bg-)}
        />
      )}

      {data.about?.visible && (
        <AboutSection data={data.about} />
      )}

      {data.visionary?.visible && (
        <VisionaryCard data={data.visionary} />
      )}

      {data.values?.visible && (
        <ValuesSection data={data.values} />
      )}

      
    </>
  );
};

export default About;