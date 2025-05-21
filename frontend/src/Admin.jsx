import { useState, useEffect } from "react";
import { LogOut, MessageCircle, Search, Trash2, Check } from "lucide-react";
import { AdminState } from "../context/AdminProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "./main";

export default function AdminDashboard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const { user, setUser } = AdminState();
  const navigate = useNavigate();

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${server}/api/contact/`);
      setMessages(data.messages);
    } catch (err) {
      console.error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  // Simulate API call
  useEffect(() => {
    fetchMessages();
  }, []);

  // Filter and search messages
  const filteredMessages = messages.filter((message) => {
    const matchesFilter = filter === "all" || message.read === filter;
    const matchesSearch =
      message.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.contactPurpose?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Message Actions
  const markAsRead = async (id) => {
    try {
      const { data } = await axios.put(`${server}/api/contact/read`, { id });
      setMessages(data.messages);
      setSelectedMessage(data.message);
      toast.success("Marked as read");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMessage = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        const { data } = await axios.delete(`${server}/api/contact/delete`, {
          data: { id },
        });
        setMessages(data.messages);
        setSelectedMessage(null);
        toast.success("Deleted Successfully");
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    navigate("/admin/login");
    toast.success("Logged Out");
  };

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navbar */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-10 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-slate-800">Messages</h1>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <span className="text-emerald-600 font-medium">
                  {user?.name?.[0]?.toUpperCase()}
                </span>
              </div>
              <span className="ml-2 text-slate-700 hidden sm:inline">
                {user?.name}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="cursor-pointer p-2 rounded hover:bg-gray-100 flex items-center"
            >
              <LogOut size={18} className="text-slate-600" />
              <span className="ml-1 text-sm text-slate-600 hidden sm:inline">
                Logout
              </span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6 bg-gray-50 min-h-full">
          {/* Search and Filters */}
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search
                size={18}
                className="absolute left-3 top-2.5 text-gray-400"
              />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  filter === "all"
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-slate-700 border border-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter(false)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  filter === false
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-slate-700 border border-gray-200"
                }`}
              >
                Unread
              </button>
              <button
                onClick={() => setFilter(true)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  filter === true
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-slate-700 border border-gray-200"
                }`}
              >
                Read
              </button>
            </div>
          </div>

          {/* Message Container */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Message List with Scrollbar */}
            <div className="col-span-1 lg:col-span-1">
              <div className="h-96 overflow-y-auto pr-2">
                {loading ? (
                  // Loading state
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-xl shadow p-4 animate-pulse"
                      >
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                      </div>
                    ))}
                  </div>
                ) : filteredMessages.length === 0 ? (
                  // Empty state
                  <div className="bg-white rounded-xl shadow p-6 text-center">
                    <MessageCircle
                      size={40}
                      className="mx-auto text-gray-400 mb-2"
                    />
                    <p className="text-gray-500 italic">No messages found</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Try adjusting your search or filters
                    </p>
                  </div>
                ) : (
                  // Message list
                  <div className="space-y-3">
                    {filteredMessages.map((message) => (
                      <div
                        key={message._id}
                        className={`bg-white rounded-xl shadow p-4 hover:shadow-md transition cursor-pointer border-l-4 ${
                          selectedMessage?._id === message._id
                            ? "border-emerald-500"
                            : message.read === false
                            ? "border-amber-400"
                            : "border-transparent"
                        }`}
                        onClick={() => setSelectedMessage(message)}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-medium text-slate-800 truncate">
                            {message.name}
                          </h3>
                          {message.read === false && (
                            <span className="bg-amber-200 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {message.email}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {message.phone}
                        </p>
                        <p className="text-sm font-medium text-slate-700 mt-1 truncate">
                          {message.contactPurpose}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-gray-500">
                            {formatDate(message.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {!loading && filteredMessages.length > 0 && (
                <div className="mt-4 text-sm text-gray-500">
                  Total: {filteredMessages.length} message
                  {filteredMessages.length !== 1 ? "s" : ""}
                </div>
              )}
            </div>

            {/* Message Detail */}
            <div className="col-span-1 lg:col-span-2">
              {selectedMessage ? (
                <div className="bg-white rounded-xl shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-800">
                        {selectedMessage.contactPurpose}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        From:{" "}
                        <span className="font-medium text-slate-700">
                          {selectedMessage.name}
                        </span>{" "}
                        &lt;{selectedMessage.email}&gt;
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Phone:{" "}
                        <span className="font-medium text-slate-700">
                          {selectedMessage.phone}
                        </span>{" "}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Received: {formatDate(selectedMessage.createdAt)}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {selectedMessage.read === false && (
                        <button
                          onClick={() => markAsRead(selectedMessage._id)}
                          className="cursor-pointer p-2 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
                          title="Mark as read"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteMessage(selectedMessage._id)}
                        className="cursor-pointer p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                        title="Delete message"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4 mt-2">
                    <p className="text-slate-700 whitespace-pre-line">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center h-full min-h-64">
                  <MessageCircle size={48} className="text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg text-center">
                    Select a message to view its content
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
