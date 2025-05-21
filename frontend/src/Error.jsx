import { useState } from "react";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        {/* 404 Icon/Illustration */}
        <div className="relative mx-auto mb-4">
          <div className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-200">
            404
          </div>
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {isHovering ? "🤔" : "😵"}
          </div>
        </div>
        
        {/* Message */}
        <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
          Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        
        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            className="cursor-pointer flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
            onClick={() => navigate('/')}
          >
            <Home size={20} />
            <span>Back to Home</span>
          </button>
        </div>
      </div>     
    </div>
  );
}