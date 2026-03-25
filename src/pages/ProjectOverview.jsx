import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData, getImageUrl } from "../utils/api";
import PageHero from "../components/PageHero";

export default function ProjectOverview() {
  const { projectId, cardId } = useParams();

  const [project, setProject] = useState(null);
  const [card, setCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData();

        const foundProject = res?.projects?.items?.find(
          (p) => String(p.id) === String(projectId)
        );

        const foundCard = foundProject?.cards?.find(
          (c) => String(c.id) === String(cardId)
        );

        setProject(foundProject);
        setCard(foundCard);
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };

    fetchData();
  }, [projectId, cardId]);

  if (!project || !card) {
    return (
      <div className="text-center py-20 text-lg">
        Loading Project...
      </div>
    );
  }

  return (
    <div className="bg-white">

      {/* 🔹 HERO (use card image) */}
      <PageHero
        title="Project Overview"
        backgroundImage={
          getImageUrl(card.image) ||
          "https://via.placeholder.com/1200x400"
        }
      />

      {/* 🔹 CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* PROJECT NAME */}
        <div className="border-b py-4">
          <span className="font-semibold">Project Name :</span>{" "}
          {project.client}
        </div>

        {/* CLIENT NAME */}
        <div className="border-b py-4">
          <span className="font-semibold">Client Name :</span>{" "}
          {card.title}
        </div>

        {/* CHALLENGE */}
        <div className="border-b py-6">
          <h3 className="text-lg font-semibold mb-2">
            1. The Challenge
          </h3>
          <p className="text-gray-600 text-sm">
            {card?.overview?.challenge || "No data available"}
          </p>
        </div>

        {/* VISUAL PROOF (same image) */}
        <div className="border-b py-6">
          <h3 className="text-lg font-semibold mb-4">
            2. Visual Proof Of Expertise
          </h3>

          <div className="flex justify-center">
            <img
              src={
                getImageUrl(card.image) ||
                "https://via.placeholder.com/400"
              }
              alt="Project"
              className="max-h-80 object-contain"
            />
          </div>
        </div>

        {/* RESULT */}
        <div className="py-6">
          <h3 className="text-lg font-semibold mb-2">
            3. Result
          </h3>
          <p className="text-gray-600 text-sm">
            {card?.overview?.result || "No data available"}
          </p>
        </div>

      </div>
    </div>
  );
}