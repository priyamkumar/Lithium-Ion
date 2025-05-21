import { memo } from "react";
import { Button, Typography } from "@mui/material";
import { ArrowForward, Recycling } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaLeaf, FaRecycle } from "react-icons/fa";

const FloatingIcons = memo(() => (
  <>
    <motion.div
      className="absolute bottom-8 left-8 text-[#D8F3DC]"
      animate={{ y: [-10, 10, -10] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <FaLeaf className="w-12 h-12 opacity-80" />
    </motion.div>
    <motion.div
      className="absolute top-8 right-8 text-[#D8F3DC]"
      animate={{
        y: [0, 15, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{ duration: 6, repeat: Infinity }}
    >
      <FaRecycle className="w-10 h-10 opacity-80" />
    </motion.div>
  </>
));

const HeroGradientBackground = memo(() => (
  <motion.div
    className="absolute w-full h-full max-w-4xl max-h-4xl bg-[#95D5B2] rounded-full opacity-20 blur-3xl"
    initial={{ scale: 0.8, rotate: 0 }}
  />
));

const HeroContent = memo(() => {
  const navigate = useNavigate();
  
  const handleExploreClick = () => {
    window.scrollTo(0, 0);
    navigate("/process");
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-6 max-w-2xl"
    >
      <Typography
        variant="h1"
        className="!text-5xl !md:text-6xl font-bold text-green-900 leading-tight"
        sx={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 800,
          letterSpacing: "-0.05em",
        }}
      >
        Sustainable Energy
        <br />
        <span className="bg-gradient-to-r from-[#2D6A4F] to-[#52B788] bg-clip-text text-transparent">
          For Everyone, Always
        </span>
      </Typography>

      <Typography
        variant="body1"
        className="text-xl text-gray-700 leading-relaxed"
        sx={{ lineHeight: 1.7 }}
      >
        Producing battery grade materials by recycling end-of-life{" "}
        <span className="font-semibold text-[#2D6A4F]">
          <Recycling className="mr-2" />
          Lithium Ion Batteries
        </span>{" "}
        to create a sustainable energy source which is also eco-friendly.
      </Typography>

      <Button
        variant="contained"
        color="success"
        size="large"
        endIcon={<ArrowForward />}
        onClick={handleExploreClick}
        sx={{
          mt: 3,
          px: 5,
          py: 2,
          borderRadius: "12px",
          textTransform: "none",
          fontSize: "1.1rem",
          boxShadow: "0 10px 20px -5px rgba(45, 106, 79, 0.3)",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 15px 25px -5px rgba(45, 106, 79, 0.4)",
          },
        }}
      >
        Explore Our Process
      </Button>
    </motion.div>
  );
});

const HeroImage = memo(() => (
  <motion.div
    className="relative z-10 bg-white bg-opacity-90 rounded-3xl shadow-2xl p-1 backdrop-blur-sm mx-auto"
    initial={{ y: 50, opacity: 0, rotate: -5 }}
    animate={{ y: 0, opacity: 1, rotate: 0 }}
    transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
  >
    <div className="relative overflow-hidden rounded-xl group">
      <img
        src="2.png"
        alt="Sustainable development goals"
        className="w-full max-w-xl rounded-xl transform transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/40 to-transparent" />
    </div>
    <div className="absolute inset-0 border-2 border-white/30 rounded-3xl pointer-events-none" />
  </motion.div>
));

// Main component
const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row min-h-full">
      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-white flex items-center px-6 md:px-20 py-24">
        <HeroContent />
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 relative flex justify-center items-center bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#40916C] px-6 md:px-10 py-24 overflow-hidden">
        {/* Enhanced animated gradient background */}
        <HeroGradientBackground />
        <HeroImage />
        <FloatingIcons />
      </div>
    </section>
  );
};

export default HeroSection;