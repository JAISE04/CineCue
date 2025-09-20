import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Navbar from "./components/Navbar";
import MobileNavbar from "./components/MobileNavbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import MyList from "./pages/MyList";
import SearchResults from "./pages/SearchResults";
import Auth from "./pages/Auth";
import SignUp from "./pages/SignUp";
import { supabase } from "./supabaseClient";
import { MovieListProvider } from "./context/MovieListContext";
import { SeriesProvider } from "./context/SeriesContext";
import { AuthProvider } from "./context/AuthContext";

// Wrapper component to use location
function AppContent() {
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data: { user: currentUser } }) => {
      setUser(currentUser);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handler for search in Navbar
  const handleGlobalSearch = (query) => {
    setGlobalSearchQuery(query);
  };

  const clearSearch = () => {
    setGlobalSearchQuery("");
  };

  return (
    <>
      {/* Desktop Navbar - Hidden on mobile */}
      <div className="hidden md:block">
        <Navbar
          onSearch={handleGlobalSearch}
          searchQuery={globalSearchQuery}
          onClearSearch={clearSearch}
          user={user}
        />
      </div>

      {/* Mobile Navbar - Hidden on desktop */}
      <div className="block md:hidden">
        <MobileNavbar
          onSearch={handleGlobalSearch}
          searchQuery={globalSearchQuery}
          onClearSearch={clearSearch}
          user={user}
          onAuthClick={() => {}}
        />
      </div>

      <div className="app">
        <Routes>
          <Route
            path="/"
            element={<Home globalSearchQuery={globalSearchQuery} />}
          />
          <Route
            path="/movies"
            element={<Movies globalSearchQuery={globalSearchQuery} />}
          />
          <Route
            path="/tv-shows"
            element={
              <TVShows globalSearchQuery={globalSearchQuery} user={user} />
            }
          />
          <Route path="/my-list" element={<MyList />} />
          <Route
            path="/search"
            element={
              <SearchResults
                searchQuery={globalSearchQuery}
                onClearSearch={clearSearch}
                user={user}
              />
            }
          />
          <Route
            path="/auth"
            element={
              <div className="auth-wrapper">
                <Auth />
              </div>
            }
          />
          <Route
            path="/signup"
            element={
              <div className="auth-wrapper">
                <SignUp />
              </div>
            }
          />
        </Routes>
        {!location.pathname.includes("auth") &&
          !location.pathname.includes("signup") && <Footer />}
      </div>
    </>
  );
}

// Main App component with Router
function App() {
  return (
    <AuthProvider>
      <MovieListProvider>
        <SeriesProvider>
          <Router>
            <AppContent />
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 2000,
                style: {
                  background: "#363636",
                  color: "#fff",
                },
                success: {
                  duration: 2000,
                  iconTheme: {
                    primary: "#e50914",
                    secondary: "#fff",
                  },
                },
              }}
            />
          </Router>
        </SeriesProvider>
      </MovieListProvider>
    </AuthProvider>
  );
}

export default App;
