import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AnimatedSearchBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSearch = () => {
    if (searchValue.trim()) {
      // Preserve existing query parameters (except search)
      const currentParams = new URLSearchParams(searchParams);
      
      // Update the search parameter
      currentParams.set("search", searchValue.trim());
      
      // Get current location path
      const currentPath = window.location.pathname;
      
      if (currentPath === "/products") {
        // If already on products page, use setSearchParams to update URL without navigation
        // We need to create and dispatch a custom event to notify the Products component
        window.dispatchEvent(new CustomEvent("header-search", { 
          detail: { searchTerm: searchValue.trim() } 
        }));
        // Update URL without full navigation
        window.history.pushState({}, "", `/products?${currentParams.toString()}`);
      } else {
        // Navigate to products page with the updated search params
        navigate(`/products?${currentParams.toString()}`);
      }
      setSearchValue("");
      // Close the search bar after search
      setIsExpanded(false);
    }
  };

  const clearSearch = () => {
    setSearchValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    } else if (e.key === "Escape") {
      setIsExpanded(false);
    }
  };

  const handleClickOutside = (e) => {
    if (
      inputRef.current && 
      !inputRef.current.contains(e.target) && 
      !e.target.closest('button')
    ) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex items-center">
      <button
        type="button"
        onClick={toggleSearch}
        className="cursor-pointer p-2 rounded-full bg-green-500 text-white hover:bg-green-600 focus:outline-none transition-all duration-300"
        aria-label="Search"
      >
        <Search size={20} />
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isExpanded ? "w-40 opacity-100 ml-2 md:w-60" : "w-0 opacity-0"
      }`}>
        <div className="relative w-full">
          <input
            ref={inputRef}
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search Products"
            className="w-full px-4 py-2 pr-16 text-gray-800 bg-white border-2 border-yellow-400 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
            aria-label="Search input"
          />
          
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            {searchValue && (
              <button
                onClick={clearSearch}
                className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
            
            <button
              onClick={handleSearch}
              className="cursor-pointer text-green-500 hover:text-green-700 transition-colors duration-200 px-2 py-1 text-sm font-medium"
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}