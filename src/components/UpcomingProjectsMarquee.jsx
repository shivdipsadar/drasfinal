export default function UpcomingProjectsMarquee({ data }) {
  const items = data?.items || [];

  if (!data?.visible || items.length === 0) return null;

  // 🔁 create repeated list
  const repeatedItems = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden bg-white py-24">

      {/* 🔥 HEADING */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
        {data.title || "UPCOMING / ONGOING PROJECTS"}
      </h2>

      <div className="w-40 h-[3px] bg-blue-600 mx-auto mt-4 mb-10"></div>

      {/* 🚀 MARQUEE */}
      <div className="marquee-container">
        <div className="marquee-track flex items-center">

          {repeatedItems.map((p, i) => {
            const isRepeatStart =
              i === items.length || i === items.length * 2;

            return (
              <div key={i} className="flex items-center">

                {/* ✅ Vertical Divider at repeat points */}
                {isRepeatStart && (
                  <div className="h-48 w-[2px] bg-gradient-to-b from-transparent via-gray-400 to-transparent mx-4"></div>
                )}

                {/* 📦 Card */}
                <div className="min-w-[300px] flex-shrink-0 bg-[#264f96] text-white rounded-lg shadow-lg p-4">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-40 w-full object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.onerror = null; // 🔥 prevent infinite loop
                      e.currentTarget.src = "/dras-logo.jpeg";
                    }}
                  />

                  <p className="mt-3 text-base font-semibold text-center line-clamp-2">
                    {p.title}
                  </p>
                </div>

              </div>
            );
          })}

        </div>
      </div>

    </div>
  );
}