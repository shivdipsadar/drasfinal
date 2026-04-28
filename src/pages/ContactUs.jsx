import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { getImageUrl } from "../utils/api";

export default function AboutSection({ data }) {
  const sectionRef = useRef(null);
  const about = data?.items?.[0];

  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-image", {
        x: -120,
        opacity: 0,
        duration: 1,
      });

      gsap.from(".about-text > *", {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.9,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!about) return null;

  // ✅ Mobile validation (India format)
  const handleMobileChange = (e) => {
    const value = e.target.value;

    // Allow only numbers
    if (!/^\d*$/.test(value)) return;

    setMobile(value);

    // Validate 10 digit Indian mobile number
    if (value.length === 10 && /^[6-9]\d{9}$/.test(value)) {
      setError("");
    } else {
      setError("Enter valid 10-digit mobile number");
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 relative bg-cover bg-center"
      style={{
        backgroundImage: `url(${data?.bgImage || ""})`, // ✅ FIXED
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/80"></div>

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-6 items-center">
        
        {/* IMAGE */}
        <div className="about-image flex justify-center">
          <img
            src={getImageUrl(about.image)}
            alt="about"
            className="w-[300px] shadow-lg"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/fallback.png";
            }}
          />
        </div>

        {/* TEXT */}
        <div className="about-text max-w-xl">
          <p className="text-gray-700 tracking-widest mb-3 text-sm">
            {about.welcome}
          </p>

          <h2 className="text-4xl font-bold mb-4">
            {about.title}{" "}
            <span className="text-blue-600">{about.highlight}</span>
          </h2>

          <div className="w-32 h-[3px] bg-black mb-6"></div>

          <p className="text-gray-700 mb-4">{about.paragraph1}</p>
          <p className="text-gray-700 mb-6">{about.paragraph2}</p>

          {/* ✅ Mobile Input */}
          <div className="mb-4">
            <input
              type="text"
              value={mobile}
              onChange={handleMobileChange}
              placeholder="Enter Mobile Number"
              className="w-full p-3 border rounded"
              maxLength={10}
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>

          <button
            disabled={error || mobile.length !== 10}
            className={`px-6 py-2 text-white rounded ${
              error || mobile.length !== 10
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500"
            }`}
          >
            {about.button}
          </button>
        </div>
      </div>
    </section>
  );
}