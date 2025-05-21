import { useEffect, useState } from "react";
import { Lock, Mail, EyeOff, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "./main";
import { Box } from "@mui/material";
import Loader from "./Loader";
import toast from "react-hot-toast";

export default function Login() {
  const [user, setUser] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    if (validateForm()) {
      setIsLoading(true);
      try {
        const { data } = await axios.post(
          `${server}/api/user/login`,
          { email, password },
          config
        );
        setUser(data);
        toast.success("Logged In Successfully");
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/admin");
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) navigate("/admin");
  }, [navigate]);

  return isLoading ? (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Loader />{" "}
    </Box>
  ) : (
    <div className="bg-green-100 flex items-center justify-center min-h-[91vh]">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md transition duration-300 ease-in-out animate-fadeIn">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="mx-auto bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <Lock className="text-green-700" size={28} />
          </div>
          <h1 className="text-green-700 text-2xl font-bold">Admin Portal</h1>
          <p className="text-gray-500 text-sm mt-1">
            Enter your credentials to continue
          </p>
        </div>

        {/* Form */}
        <div>
          {/* Email input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 mb-1 block"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="admin@company.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Password input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 mb-1 block"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="••••••••"
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>
          </div>

          {/* Login button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="cursor-pointer bg-yellow-400 text-gray-800 font-medium w-full py-2 px-4 rounded-md hover:bg-yellow-500 transition duration-200 flex items-center justify-center"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
