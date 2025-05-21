import { useState, useEffect } from "react";
import {
  Battery,
  Zap,
  Package,
  Leaf,
  Server,
  Factory,
  Car,
  Search
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

// Product data
const productData = [
  {
    id: 1,
    name: "Cobalt Compounds",
    description:
      "High-purity cobalt sulfate and oxide recovered from cathode materials, suitable for new battery production.",
    applications: ["Electric Vehicles", "Consumer Electronics"],
    image: "cobalt",
    purity: "99.5%",
  },
  {
    id: 2,
    name: "Lithium Carbonate",
    description:
      "Battery-grade lithium compounds extracted through hydrometallurgical processes, ready for reuse in cell manufacturing.",
    applications: ["Grid Energy Storage", "Electric Vehicles"],
    image: "lithium",
    purity: "99.2%",
  },
  {
    id: 3,
    name: "Nickel Sulfate",
    description:
      "Purified nickel compounds for high-energy density cathode materials in next-generation batteries.",
    applications: ["Electric Vehicles", "Industrial Machinery"],
    image: "nickel",
    purity: "99.8%",
  },
  {
    id: 4,
    name: "Copper Foil",
    description:
      "Recovered copper from battery current collectors, repurposed for electronic components and new cell production.",
    applications: ["Consumer Electronics", "Electric Vehicles"],
    image: "copper",
    purity: "99.9%",
  },
  {
    id: 5,
    name: "Graphite Powder",
    description:
      "Purified carbon material from battery anodes, processed for reuse in energy storage applications.",
    applications: ["Grid Energy Storage", "New Battery Manufacturing"],
    image: "graphite",
    purity: "98.5%",
  },
  {
    id: 6,
    name: "Aluminum Scrap",
    description:
      "Recovered aluminum from battery casings and components, ready for recycling into new products.",
    applications: ["Industrial Machinery", "Consumer Electronics"],
    image: "aluminum",
    purity: "97.0%",
  },
];

// Application data
const applicationData = [
  {
    id: 1,
    name: "Electric Vehicles",
    description: "Powering the next generation of sustainable transportation",
    icon: <Car className="h-12 w-12 text-yellow-500" />,
  },
  {
    id: 2,
    name: "New Battery Manufacturing",
    description:
      "Closing the loop in battery production with recycled materials",
    icon: <Battery className="h-12 w-12 text-yellow-500" />,
  },
  {
    id: 3,
    name: "Consumer Electronics",
    description:
      "Sustainable materials for phones, laptops and portable devices",
    icon: <Zap className="h-12 w-12 text-yellow-500" />,
  },
  {
    id: 4,
    name: "Grid Energy Storage",
    description: "Supporting renewable energy with efficient storage solutions",
    icon: <Server className="h-12 w-12 text-yellow-500" />,
  },
  {
    id: 5,
    name: "Industrial Machinery",
    description: "Powering industrial equipment with recycled energy solutions",
    icon: <Factory className="h-12 w-12 text-yellow-500" />,
  },
];

// Product Card Component
const ProductCard = ({ product }) => {
  const getIconForProduct = (imageName) => {
    switch (imageName) {
      case "cobalt":
        return <Package className="h-16 w-16 text-green-600 mb-4" />;
      case "lithium":
        return <Battery className="h-16 w-16 text-green-600 mb-4" />;
      case "nickel":
        return <Leaf className="h-16 w-16 text-green-600 mb-4" />;
      case "copper":
        return <Zap className="h-16 w-16 text-green-600 mb-4" />;
      case "graphite":
        return <Server className="h-16 w-16 text-green-600 mb-4" />;
      case "aluminum":
        return <Factory className="h-16 w-16 text-green-600 mb-4" />;
      default:
        return <Package className="h-16 w-16 text-green-600 mb-4" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
      <div className="flex flex-col items-center text-center">
        {getIconForProduct(product.image)}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {product.applications.map((app, index) => (
            <span
              key={index}
              className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
            >
              {app}
            </span>
          ))}
        </div>
        <div className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-lg">
          Purity: {product.purity}
        </div>
      </div>
    </div>
  );
};

// Application Card Component
const ApplicationCard = ({ application }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center min-w-[200px] hover:shadow-lg transition-all duration-300">
      {application.icon}
      <h3 className="text-lg font-semibold text-gray-900 mt-3 mb-1">
        {application.name}
      </h3>
      <p className="text-gray-600 text-sm">{application.description}</p>
    </div>
  );
};

// No results component
const NoResults = () => (
  <div className="col-span-full py-10 text-center">
    <div className="flex flex-col items-center gap-2">
      <Package className="h-12 w-12 text-gray-400" />
      <h3 className="text-xl font-medium text-gray-800">No products found</h3>
      <p className="text-gray-600">Try adjusting your search or filter criteria</p>
    </div>
  </div>
);

// Main App Component
export default function Products() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize state from URL parameters
  const [filter, setFilter] = useState(searchParams.get("application") || "All");
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  
  // Listen for header search events
  useEffect(() => {
    const handleHeaderSearch = (event) => {
      setSearchTerm(event.detail.searchTerm);
    };
    
    // Add event listener
    window.addEventListener("header-search", handleHeaderSearch);
    
    // Clean up
    return () => {
      window.removeEventListener("header-search", handleHeaderSearch);
    };
  }, []);
  
  // Update URL when filter or search term changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    
    if (filter === "All") {
      params.delete("application");
    } else {
      params.set("application", filter);
    }
    
    if (!searchTerm) {
      params.delete("search");
    } else {
      params.set("search", searchTerm);
    }
    
    setSearchParams(params, { replace: true });
  }, [filter, searchTerm, setSearchParams, searchParams]);
  
  // Filter products based on application and search term
  const filteredProducts = productData.filter(product => {
    // First filter by application if a specific one is selected
    if (filter !== "All" && !product.applications.includes(filter)) {
      return false;
    }
    
    // Then filter by search term
    if (searchTerm.trim() !== "") {
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    
    return true;
  });
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Clear search term
  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Recycled Battery <span className="text-green-600">Materials</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto tracking-wide">
            High-value products recovered from lithium-ion batteries, creating a
            sustainable cycle for energy storage materials
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Our Products
          </h2>
          
          {/* Search Bar */}
          <div className="mb-6 relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 pr-10 p-2.5"
                placeholder="Search products by name..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <span className="text-gray-400 hover:text-gray-600">✕</span>
                </button>
              )}
            </div>
          </div>
          
          {/* Application Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setFilter("All")}
              className={`px-4 py-2 rounded-full ${
                filter === "All"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } transition-colors duration-300`}
            >
              All Products
            </button>
            {applicationData.map((app) => (
              <button
                key={app.id}
                onClick={() => setFilter(app.name)}
                className={`px-4 py-2 rounded-full ${
                  filter === app.name
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition-colors duration-300`}
              >
                {app.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <NoResults />
          )}
        </div>

        {/* Applications Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Applications of Recycled Materials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {applicationData.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
          </div>
        </div>

        {/* Sustainability Section */}
        <div className="bg-green-50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Our Commitment to Sustainability
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <p className="text-gray-700 mb-4">
                Our recycling process recovers over 95% of valuable materials
                from used lithium-ion batteries, preventing hazardous waste and
                reducing the need for new raw material extraction.
              </p>
              <p className="text-gray-700">
                By using our recycled battery materials, manufacturers can
                reduce their carbon footprint and contribute to a more
                sustainable and circular economy for energy storage
                technologies.
              </p>
              <button
                className="cursor-pointer mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 flex items-center gap-2"
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate("/process");
                }}
              >
                <Leaf className="h-5 w-5" />
                Learn About Our Process
              </button>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white p-4 rounded-xl shadow-md">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <p className="text-2xl font-bold text-green-800">95%</p>
                    <p className="text-sm text-green-700">Recovery Rate</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <p className="text-2xl font-bold text-green-800">-60%</p>
                    <p className="text-sm text-green-700">Carbon Footprint</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <p className="text-2xl font-bold text-green-800">+40k</p>
                    <p className="text-sm text-green-700">Batteries Recycled</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <p className="text-2xl font-bold text-green-800">+200</p>
                    <p className="text-sm text-green-700">Partner Companies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-10 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to integrate recycled materials?
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Contact our team to discuss how our high-quality recycled battery
            materials can meet your manufacturing needs
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
              onClick={() => {
                window.scrollTo(0, 0);
                navigate("/contact");
              }}
            >
              Contact Our Team
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}