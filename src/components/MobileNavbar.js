import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, User, Home, Film, Tv, List } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/cinecue-logo-transparent.png";

const MobileNavbar = ({
  onSearch,
  searchQuery,
  onClearSearch,
  user,
  onAuthClick,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  const navigationItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/movies", label: "Movies", icon: Film },
    { path: "/tv-shows", label: "TV Shows", icon: Tv },
    { path: "/my-list", label: "My List", icon: List },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = e.target.search.value.trim();
    if (query) {
      onSearch(query);
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black bg-opacity-95 backdrop-blur-md shadow-xl border-b border-gray-800"
            : "bg-gradient-to-b from-black via-black/90 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center" onClick={onClearSearch}>
              <motion.img
                src={logo}
                alt="CineCue Logo"
                className="h-10 sm:h-12 w-auto object-contain"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              />
            </Link>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 sm:p-2.5 rounded-full transition-all duration-200 ${
                  isSearchOpen
                    ? "bg-netflix-red text-white"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                <Search size={20} className="sm:w-5 sm:h-5" />
              </motion.button>

              {/* User Profile Button - Enhanced */}
              {user ? (
                <Link to="/my-list">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 p-1.5 sm:p-2 rounded-full bg-gradient-to-r from-netflix-red to-red-600 hover:from-red-600 hover:to-netflix-red transition-all duration-300 shadow-lg"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center backdrop-blur-sm">
                      <User size={16} className="sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="hidden sm:block text-white text-sm font-medium truncate max-w-24 pr-1">
                      {user.email?.split("@")[0] || "User"}
                    </span>
                  </motion.div>
                </Link>
              ) : (
                <Link to="/auth">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 sm:p-2.5 rounded-full text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200"
                  >
                    <User size={20} className="sm:w-5 sm:h-5" />
                  </motion.button>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 sm:p-2.5 rounded-full transition-all duration-200 ${
                  isMobileMenuOpen
                    ? "bg-netflix-red text-white"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={22} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={22} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-gray-800 bg-black bg-opacity-95 backdrop-blur-md"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    name="search"
                    placeholder="Search movies and TV shows..."
                    defaultValue={searchQuery}
                    autoFocus
                    className="w-full px-4 py-3 pl-12 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-netflix-red focus:ring-2 focus:ring-netflix-red focus:ring-opacity-50 transition-all duration-200"
                  />
                  <Search
                    size={20}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-netflix-red text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors duration-200"
                  >
                    Search
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-60 md:hidden backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 bottom-0 w-72 bg-gradient-to-b from-gray-900 to-black z-50 md:hidden overflow-y-auto shadow-2xl border-l border-gray-800"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8 pt-16">
                <div className="flex items-center space-x-3">
                  <img
                    src={logo}
                    alt="CineCue"
                    className="h-8 w-auto object-contain"
                  />
                  <h2 className="text-white text-xl font-bold">Menu</h2>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors duration-200"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="space-y-3">
                {navigationItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                          isActive
                            ? "text-white bg-gradient-to-r from-netflix-red to-red-600 shadow-lg transform scale-105"
                            : "text-gray-300 hover:text-white hover:bg-gray-800 hover:transform hover:scale-105"
                        }`}
                      >
                        <Icon size={22} />
                        <span className="font-medium text-lg">
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* User Section */}
              <div className="mt-10 pt-6 border-t border-gray-800">
                {user ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-4 px-4 py-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-netflix-red to-red-600 flex items-center justify-center shadow-lg">
                        <User size={24} className="text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-white font-semibold text-base truncate">
                          {user.email?.split("@")[0] || "User"}
                        </p>
                        <p className="text-gray-400 text-sm truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/my-list"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-xl transition-all duration-200"
                    >
                      <List size={20} />
                      <span className="font-medium">My List</span>
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Link
                      to="/auth"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-4 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-xl transition-all duration-200"
                    >
                      <User size={22} />
                      <span className="font-medium text-lg">Sign In</span>
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavbar;
