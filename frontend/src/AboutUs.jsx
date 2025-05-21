import { useEffect, useRef } from "react";
import {
  Battery,
  Leaf,
  BarChart2,
  Recycle,
  Award,
  Users,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AboutUsSection() {
  const sectionRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.15 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // Placeholder for founder images
  const founderImages = [
    "https://randomuser.me/api/portraits/men/44.jpg",
    "https://randomuser.me/api/portraits/men/32.jpg",
  ];

  return (
    <div className="font-sans bg-white text-gray-800">
      {/* Hero Section - Company Introduction */}
      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className="relative bg-gradient-to-br from-green-50 to-white py-16 md:py-24 px-6 md:px-12 opacity-0 transition-opacity duration-1000"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="md:w-1/2 space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-600 font-medium text-sm mb-4">
                <Leaf size={16} className="mr-1" />
                Sustainable Battery Recycling
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                Powering the Future{" "}
                <span className="text-green-600">Sustainably</span>
              </h1>
              <p className="text-xl text-gray-600 font-light">
                We specialize in the eco-friendly recycling of lithium-ion
                batteries to build a cleaner, circular world.
              </p>
              <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-md">
                <p className="text-gray-700 mb-4">
                  At XYZ, our mission is to reduce e-waste, recover valuable
                  materials, and promote sustainable energy solutions for future
                  generations. We're driven by three core values: innovation,
                  responsibility, and measurable environmental impact.
                </p>
                <p className="text-gray-700 font-medium">
                  Our vision is simple yet ambitious: a world where battery
                  waste is minimized and energy materials are continuously
                  reused through circular systems.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition-colors duration-300"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate("/process");
                  }}
                >
                  Our Process
                  <ChevronRight size={18} className="ml-1" />
                </button>
                <button
                  className="cursor-pointer border border-gray-300 hover:border-green-600 hover:text-green-700 px-6 py-3 rounded-lg font-medium flex items-center transition-colors duration-300"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate("/contact");
                  }}
                >
                  Contact Us
                </button>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="w-full h-80 md:h-96 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-2xl overflow-hidden relative flex items-center justify-center">
                <div className="absolute w-40 h-40 bg-green-300/40 rounded-full top-10 left-10 blur-xl animate-pulse"></div>
                <div
                  className="absolute w-32 h-32 bg-blue-300/40 rounded-full bottom-10 right-16 blur-xl animate-pulse"
                  style={{ animationDelay: "2s" }}
                ></div>
                <div className="relative">
                  <div className="flex items-center justify-center">
                    <Battery
                      size={120}
                      className="text-green-600 animate-pulse"
                    />
                    <Recycle size={60} className="text-green-700 absolute" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Battery Recycling Matters */}
      <section
        ref={(el) => (sectionRefs.current[1] = el)}
        className="py-16 md:py-24 px-6 md:px-12 bg-white opacity-0 transition-opacity duration-1000"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Recycle Lithium-Ion Batteries?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Battery recycling is crucial for a sustainable future. Here's why
              our work matters:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {/* Card 1 */}
            <div className="bg-green-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Battery size={24} className="text-red-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Toxic Waste Prevention</h3>
              <p className="text-gray-700 flex-grow">
                Improper disposal of batteries pollutes soil and water with
                harmful chemicals and heavy metals.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-red-600 font-medium text-sm">
                  Lithium-ion batteries in landfills can cause fires and release
                  toxins
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-green-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Leaf size={24} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">
                Environmental Protection
              </h3>
              <p className="text-gray-700 flex-grow">
                Recycling reduces the need for mining rare-earth materials,
                protecting ecosystems and reducing carbon emissions.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-blue-600 font-medium text-sm">
                  Mining for battery materials disrupts 50+ acres of land per
                  site
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-green-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <BarChart2 size={24} className="text-yellow-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Resource Recovery</h3>
              <p className="text-gray-700 flex-grow">
                Our advanced processes recover valuable materials like lithium,
                cobalt, and nickel for reuse in new products.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-yellow-600 font-medium text-sm">
                  Up to 80% of battery materials can be recovered
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-green-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Recycle size={24} className="text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Circular Economy</h3>
              <p className="text-gray-700 flex-grow">
                We enable closed-loop battery production and reuse, reducing
                waste and creating sustainable material cycles.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-green-600 font-medium text-sm">
                  Only 5% of lithium-ion batteries are currently recycled
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment to Circularity */}
      <section
        ref={(el) => (sectionRefs.current[3] = el)}
        className="py-16 md:py-24 px-6 md:px-12 bg-white opacity-0 transition-opacity duration-1000"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Built for the Circular Economy
              </h2>

              <blockquote className="bg-green-50 border-l-4 border-green-500 pl-6 py-4 pr-4 my-6 italic text-lg text-gray-700">
                "Waste isn't waste — it's a resource out of place."
              </blockquote>

              <p className="text-gray-700 mb-4">
                We're committed to reducing reliance on mining by reintegrating
                recovered materials into the supply chain. Our advanced
                recycling process extracts up to 95% of valuable materials from
                lithium-ion batteries and transforms them into battery-grade
                inputs for manufacturers.
              </p>

              <p className="text-gray-700 mb-6">
                Through strategic partnerships with leading battery
                manufacturers, we ensure that recovered materials meet the
                highest quality standards and can be seamlessly integrated into
                new production cycles.
              </p>

              <div className="flex items-center gap-4 mb-6">
                <Award className="text-green-600" size={24} />
                <div>
                  <h4 className="font-bold text-gray-800">
                    Certified Circular
                  </h4>
                  <p className="text-sm text-gray-600">
                    Independent verification of our closed-loop processes
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Users className="text-green-600" size={24} />
                <div>
                  <h4 className="font-bold text-gray-800">
                    Industry Partnerships
                  </h4>
                  <p className="text-sm text-gray-600">
                    Working with 12+ manufacturers to close the loop
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 hidden lg:block">
              <div className="relative">
                {/* Circular flow diagram */}
                <div className="w-full aspect-square max-w-lg mx-auto relative">
                  {/* Central circle */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 bg-green-50 rounded-full border-2 border-green-200 flex items-center justify-center shadow-md">
                    <div className="text-center">
                      <Recycle
                        size={40}
                        className="text-green-600 mx-auto mb-1"
                      />
                      <span className="text-green-800 font-bold">
                        Circular
                        <br />
                        Economy
                      </span>
                    </div>
                  </div>

                  {/* Outer circles */}
                  <div className="absolute w-full h-full">
                    {/* Step 1: Use */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4 bg-blue-50 w-28 h-28 rounded-full flex items-center justify-center shadow-md border border-blue-100">
                      <div className="text-center">
                        <Battery
                          size={24}
                          className="text-blue-600 mx-auto mb-1"
                        />
                        <span className="font-bold text-gray-800">Use</span>
                        <p className="text-xs text-gray-600">
                          EV & Device
                          <br />
                          Batteries
                        </p>
                      </div>
                    </div>

                    {/* Step 2: Collection */}
                    <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/2 bg-yellow-50 w-28 h-28 rounded-full flex items-center justify-center shadow-md border border-yellow-100">
                      <div className="text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-yellow-600 mx-auto mb-1"
                        >
                          <path d="M5 8h14"></path>
                          <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                          <path d="M19 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                          <path d="M5 8v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8"></path>
                          <path d="M10 12h4"></path>
                        </svg>
                        <span className="font-bold text-gray-800">
                          Collection
                        </span>
                        <p className="text-xs text-gray-600">
                          Safe
                          <br />
                          Transport
                        </p>
                      </div>
                    </div>

                    {/* Step 3: Recycling */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4 bg-green-50 w-28 h-28 rounded-full flex items-center justify-center shadow-md border border-green-100">
                      <div className="text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-600 mx-auto mb-1"
                        >
                          <path d="M3 7h5l2 3h6l2-3h3"></path>
                          <path d="M3 7v11h18V7"></path>
                        </svg>
                        <span className="font-bold text-gray-800">
                          Recycling
                        </span>
                        <p className="text-xs text-gray-600">
                          Material
                          <br />
                          Recovery
                        </p>
                      </div>
                    </div>

                    {/* Step 4: Reuse */}
                    <div className="absolute top-1/2 left-0 transform -translate-x-1/4 -translate-y-1/2 bg-purple-50 w-28 h-28 rounded-full flex items-center justify-center shadow-md border border-purple-100">
                      <div className="text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-purple-600 mx-auto mb-1"
                        >
                          <path d="M20 19h-4"></path>
                          <path d="M12 19H8"></path>
                          <path d="M4 19V5"></path>
                          <path d="M20 19V5"></path>
                          <path d="M16 10V6.5a2.5 2.5 0 0 0-5 0V10"></path>
                          <path d="M8 10V6.5a2.5 2.5 0 0 1 5 0V10"></path>
                        </svg>
                        <span className="font-bold text-gray-800">Reuse</span>
                        <p className="text-xs text-gray-600">
                          New
                          <br />
                          Products
                        </p>
                      </div>
                    </div>

                    {/* Connecting arrows (SVG) */}
                    <svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 400 400"
                    >
                      <defs>
                        <marker
                          id="arrowhead"
                          markerWidth="10"
                          markerHeight="7"
                          refX="0"
                          refY="3.5"
                          orient="auto"
                        >
                          <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" />
                        </marker>
                      </defs>
                      <path
                        d="M 200,80 C 250,100 280,150 280,200"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="2"
                        strokeDasharray="4,2"
                        markerEnd="url(#arrowhead)"
                      />
                      <path
                        d="M 280,200 C 280,250 250,300 200,320"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="2"
                        strokeDasharray="4,2"
                        markerEnd="url(#arrowhead)"
                      />
                      <path
                        d="M 200,320 C 150,300 120,250 120,200"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="2"
                        strokeDasharray="4,2"
                        markerEnd="url(#arrowhead)"
                      />
                      <path
                        d="M 120,200 C 120,150 150,100 200,80"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="2"
                        strokeDasharray="4,2"
                        markerEnd="url(#arrowhead)"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Founders */}
      <section
        ref={(el) => (sectionRefs.current[2] = el)}
        className="py-16 md:py-24 px-6 md:px-12 bg-gray-50 opacity-0 transition-opacity duration-1000"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Meet the Founders
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Passionate experts dedicated to revolutionizing battery recycling
              technology and building a more sustainable future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Founder 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative h-128 overflow-hidden">
                <img
                  src={founderImages[0]}
                  alt="Jane Doe"
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-white text-2xl font-bold">Jane Doe</h3>
                    <p className="text-green-300 font-medium">
                      CEO & Co-Founder
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700">
                  Battery technology researcher and sustainability advocate with
                  10+ years in clean energy. Jane previously led R&D at
                  GreenTech Solutions, where she developed innovative approaches
                  to material recovery.
                </p>
                <div className="flex gap-3 mt-4">
                  <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                    Battery Tech
                  </span>
                  <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                    PhD in Chemistry
                  </span>
                  <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">
                    Sustainability
                  </span>
                </div>
              </div>
            </div>

            {/* Founder 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative h-128 overflow-hidden">
                <img
                  src={founderImages[1]}
                  alt="John Smith"
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-white text-2xl font-bold">
                      John Smith
                    </h3>
                    <p className="text-green-300 font-medium">
                      CTO & Co-Founder
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700">
                  Environmental engineer turned entrepreneur, passionate about
                  circular solutions. John pioneered automated battery recycling
                  systems at CircuitRevive before co-founding our company to
                  scale impact.
                </p>
                <div className="flex gap-3 mt-4">
                  <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                    Engineering
                  </span>
                  <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
                    Circular Economy
                  </span>
                  <span className="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full">
                    Automation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
