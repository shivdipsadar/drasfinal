import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../utils/api";
import { useMemo } from "react";
import React from "react";

function ProjectCard({ image, title, projectId, cardId }) {
  const navigate = useNavigate();

  const imageUrl = useMemo(() => getImageUrl(image), [image]);

  return (
    <div
      onClick={() => navigate(`/project/${projectId}/${cardId}`)}
      className="bg-white overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
    >
      {/* IMAGE */}
      <div className="bg-gray-200 flex items-center justify-center h-40">
        <img
          src={imageUrl}
          alt={title}
          className="max-h-20 object-contain"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/dras-logo.jpeg";
          }}
        />
      </div>

      {/* TITLE */}
      <div className="bg-gray-400 text-white text-sm p-4 text-center font-medium">
        {title}
      </div>
    </div>
  );
}

export default React.memo(ProjectCard);