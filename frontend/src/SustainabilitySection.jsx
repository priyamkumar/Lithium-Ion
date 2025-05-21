import ReactPlayer from "react-player/youtube";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SustainabilitySection = () => {
  const shouldReduceMotion = useReducedMotion();
  const navigate = useNavigate();

  return (
    <section
      className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 py-16 px-6 md:px-20 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg,#173b27 0%, #1e2a23 40%, #2a3c33 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.6,
            ease: "easeOut",
          }}
          className="lg:w-1/2"
        >
          <h2 className="text-5xl font-bold mb-6 text-yellow-400 font-serif tracking-tighter">
            Our Commitment to Sustainability
          </h2>
          <p className="text-lg mb-8 text-green-100 leading-relaxed">
            XYZ Pvt. Ltd. is committed to international initiatives related to
            Climate Goals, Energy and Circular Economy including:
          </p>
          <ul className="space-y-4 mb-10">
            <li className="flex items-start">
              <span className="text-yellow-400 mr-3 mt-1">▹</span>
              <span className="text-lg text-green-50">
                UN’s 17 Sustainable Development Goals (SDGs)
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 mr-3 mt-1">▹</span>
              <span className="text-lg text-green-50">Net-Zero by 2070</span>
            </li>
          </ul>
          <motion.button
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
            whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
            className="cursor-pointer bg-yellow-400 text-green-900 px-8 py-4 font-bold rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            onClick={() => {
              window.scrollTo(0, 0);
              navigate("/about");
            }}
          >
            Explore Our Initiatives
          </motion.button>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.6,
            ease: "easeOut",
            delay: 0.1,
          }}
          className="md:w-3/4"
        >
          <div className="w-full h-[320px] md:h-[400px] rounded-xl overflow-hidden shadow-2xl border-4">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=0XTBYMfZyrM"
              controls
              width="100%"
              height="400px"
            />
          </div>
        </motion.div>
      </div>

      {/* Decorative blobs */}
      <motion.div
        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 1.2, ease: "easeOut" }}
        className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"
      />
      <motion.div
        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 1.2,
          ease: "easeOut",
          delay: 0.2,
        }}
        className="absolute top-0 right-0 w-48 h-48 bg-green-400/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"
      />
    </section>
  );
};

export default SustainabilitySection;
