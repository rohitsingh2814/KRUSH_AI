import { useEffect, useRef, useState } from "react";

import {
  Sparkles,
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function Navbar() {
  // ==========================================
  // AUTH
  // ==========================================

  const { user, isAuthenticated, logout } = useAuth();

  // ==========================================
  // ROUTER
  // ==========================================

  const navigate = useNavigate();

  const location = useLocation();

  // ==========================================
  // DROPDOWN STATE
  // ==========================================

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Reference to dropdown/user button area

  const dropdownRef = useRef(null);

  // ==========================================
  // CLOSE DROPDOWN WHEN CLICKING ANYWHERE
  // OUTSIDE THE DROPDOWN
  // ==========================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ==========================================
  // CLOSE DROPDOWN WHEN ROUTE CHANGES
  // ==========================================

  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    logout();

    setDropdownOpen(false);

    navigate("/login");
  };

  // ==========================================
  // USER INITIAL
  // ==========================================

  const getUserInitial = () => {
    if (!user?.name) {
      return "U";
    }

    return user.name.charAt(0).toUpperCase();
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* ==================================================
            LOGO
        ================================================== */}

        <Link
          to="/"
          onClick={() => setDropdownOpen(false)}
          className="flex items-center gap-2 text-2xl font-bold tracking-tight text-gray-900"
        >
          <Sparkles className="h-7 w-7 text-[#D4AF37]" />
          Krush
          <span className="text-rose-500">AI</span>
        </Link>

        {/* ==================================================
            DESKTOP NAVIGATION
        ================================================== */}

        <div className="hidden items-center gap-8 md:flex">
          {!isAuthenticated ? (
            /* ==============================================
               LOGGED OUT NAVIGATION
            ============================================== */

            <>
              <Link
                to="/"
                onClick={() => setDropdownOpen(false)}
                className={`text-sm font-medium transition ${
                  location.pathname === "/"
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Home
              </Link>

              <a
                href="/#features"
                onClick={() => setDropdownOpen(false)}
                className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
              >
                Features
              </a>

              <a
                href="/#how-it-works"
                onClick={() => setDropdownOpen(false)}
                className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
              >
                How It Works
              </a>
            </>
          ) : (
            /* ==============================================
               LOGGED IN NAVIGATION
            ============================================== */

            <>
              <Link
                to="/analysis"
                onClick={() => setDropdownOpen(false)}
                className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
              >
                AI Analysis
              </Link>

              <Link
                to="/dashboard"
                onClick={() => setDropdownOpen(false)}
                className={`text-sm font-medium transition ${
                  location.pathname === "/dashboard"
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Dashboard
              </Link>

              <Link
                to="/profile"
                onClick={() => setDropdownOpen(false)}
                className={`text-sm font-medium transition ${
                  location.pathname === "/profile"
                    ? "text-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Profile
              </Link>
            </>
          )}
        </div>

        {/* ==================================================
            RIGHT SIDE
        ================================================== */}

        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            /* ==================================================
               LOGGED OUT
            ================================================== */

            <>
              {/* Login */}

              <Link
                to="/login"
                onClick={() => setDropdownOpen(false)}
                className="hidden rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 sm:block"
              >
                Login
              </Link>

              {/* Get Started */}

              <Link
                to="/register"
                onClick={() => setDropdownOpen(false)}
                className="rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-700"
              >
                Get Started
              </Link>
            </>
          ) : (
            /* ==================================================
               LOGGED IN
            ================================================== */

            <div ref={dropdownRef} className="relative">
              {/* ==============================================
                  USER BUTTON
              ============================================== */}

              <button
                type="button"
                onClick={() => setDropdownOpen((previous) => !previous)}
                aria-label="Open user menu"
                aria-expanded={dropdownOpen}
                className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-gray-100"
              >
                {/* Profile Image */}

                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                    {getUserInitial()}
                  </div>
                )}

                {/* Arrow */}

                <ChevronDown
                  size={16}
                  className={`hidden text-gray-500 transition-transform sm:block ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* ==============================================
                  USER DROPDOWN
              ============================================== */}

              {dropdownOpen && (
                <div className="absolute right-0 top-14 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-900/10">
                  {/* ==========================================
                      USER INFO
                  ========================================== */}

                  <div className="border-b border-gray-100 px-4 py-4">
                    <div className="flex items-center gap-3">
                      {user?.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt={user.name}
                          className="h-11 w-11 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-900 font-semibold text-white">
                          {getUserInitial()}
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {user?.name}
                        </p>

                        <p className="truncate text-xs text-gray-500">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ==========================================
                      MENU OPTIONS
                  ========================================== */}

                  <div className="p-2">
                    {/* Dashboard */}

                    <Link
                      to="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </Link>

                    {/* Profile */}

                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      <User size={18} />
                      Profile
                    </Link>

                    {/* Divider */}

                    <div className="my-1 border-t border-gray-100" />

                    {/* Logout */}

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
