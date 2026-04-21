export default function UpcomingProjectsMarquee({ data }) {
  const items = data?.items || [];

  if (!data?.visible || items.length === 0) return null;

  return (
    <div className="overflow-hidden bg-white py-24">

      {/* 🔥 MATCHED HEADING */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
        {data.title || "UPCOMING / ONGOING PROJECTS"}
      </h2>

      <div className="w-40 h-[3px] bg-blue-600 mx-auto mt-4 mb-10"></div>

      {/* MARQUEE */}
      <div className="marquee-container">
        <div className="marquee-track">

          {[...items, ...items, ...items].map((p, i) => (
           <div
  key={i}
  className="min-w-[300px] flex-shrink-0 bg-[#264f96] text-white rounded-lg shadow-lg p-4"
>
  <img
    src={p.image}
    alt={p.title}
    className="h-40 w-full object-cover rounded"
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = "/dras-logo.jpeg";
    }}
  />

  <p className="mt-3 text-base font-semibold text-center line-clamp-2">
    {p.title}
  </p>
</div>
          ))}

        </div>
      </div>

    </div>
  );
}