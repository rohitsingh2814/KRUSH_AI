import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Sparkles, User, History } from 'lucide-react';

const Navbar = ({ isAuthenticated, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const goToHistoryTab = () => {
    navigate('/profile?tab=history'); // pass tab in query
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-xl border-b border-primary-100/50' 
          : 'bg-gradient-to-r from-white via-primary-50/30 to-white shadow-lg border-b border-gray-100/50'
      }`}>
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="group flex items-center space-x-3 relative">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-primary-600 to-primary-400 p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 via-primary-400 to-primary-800 bg-clip-text text-transparent">
                  Krush AI
                </span>
                <span className="text-xs text-gray-500 font-medium">Smart Fit. Styled Right.</span>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-primary-600/10 to-primary-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              <NavLink to="/" label="Home" />
              <NavLink to="/questionnaire" label="Style Quiz" />
              {isAuthenticated && (
                <NavLink to="/dashboard" label="Studio" />
              )}
            </div>

            {/* Right Side */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  {/* Notification Bell */}
                  {/* <button className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200 hover:bg-primary-50 rounded-xl">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></span>
                  </button> */}

                  {/* Profile Dropdown */}
                  <div className="relative" ref={profileMenuRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="group flex items-center space-x-3 p-2 rounded-2xl hover:bg-gray-50 transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-primary-100"
                    >
                      <div className="relative">
                        <img
                          src={user?.photoURL || 'https://randomuser.me/api/portraits/lego/1.jpg'}
                          alt="User"
                          className="h-10 w-10 rounded-full border-2 border-primary-200 group-hover:border-primary-400 transition-all duration-300 shadow-lg"
                        />
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-2 border-white shadow-sm"></div>
                      </div>
                      <div className="hidden lg:block text-left">
                        <p className="text-sm font-semibold text-gray-900">{user?.name || 'User'}</p>
                        {/* <p className="text-[0.50rem] text-gray-500">{user?.email || 'User'}</p> */}
                      </div>
                    </button>

                    {/* Enhanced Dropdown */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl z-20 animate-in slide-in-from-top-2 duration-200">
                        <div className="p-4 border-b border-gray-100">
                          <div className="flex items-center space-x-3">
                            <img
                              src={user?.photoURL || 'https://randomuser.me/api/portraits/lego/1.jpg'}
                              alt="user"
                              className="h-12 w-12 rounded-full border-2 border-primary-200"
                            />
                            <div>
                              <p className="font-semibold text-gray-900">{user?.name || 'User'}</p>
                              <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-2">
                          <DropdownItem
                            icon={<User className="h-4 w-4" />}
                            label="Profile"
                            onClick={() => {
                              navigate('/profile');
                              setIsDropdownOpen(false);
                            }}
                          />
                          <DropdownItem
                            icon={<History className="h-4 w-4" />}
                            label="History"
                            onClick={() => {
                              goToHistoryTab();
                              setIsDropdownOpen(false);
                            }}
                          />
                          <div className="my-2 border-t border-gray-100"></div>
                          <DropdownItem
                            icon={<LogOut className="h-4 w-4" />}
                            label="Logout"
                            onClick={() => {
                              handleLogout();
                              setIsDropdownOpen(false);
                            }}
                            danger
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link 
                    to="/login" 
                    className="px-6 py-2.5 text-gray-700 font-medium hover:text-primary-600 transition-colors duration-200 rounded-xl hover:bg-primary-50"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="group relative px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-400 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
                  >
                    <span className="relative z-10">Sign Up</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200 hover:bg-primary-50 rounded-xl"
              >
                <div className="relative h-6 w-6">
                  <Menu className={`absolute h-6 w-6 transition-all duration-300 ${isMenuOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`} />
                  <X className={`absolute h-6 w-6 transition-all duration-300 ${isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-180 opacity-0'}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100/50 shadow-xl">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-4">
                <MobileNavLink to="/" label="Home" onClick={() => setIsMenuOpen(false)} />
                <MobileNavLink to="/questionnaire" label="Style Quiz" onClick={() => setIsMenuOpen(false)} />
                {isAuthenticated && (
                  <MobileNavLink to="/dashboard" label="Studio" onClick={() => setIsMenuOpen(false)} />
                )}
                
                {isAuthenticated ? (
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-3 mb-4 p-3 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl">
                      <img
                        src={user?.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                        alt="User"
                        className="h-12 w-12 rounded-full border-2 border-primary-200"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{user?.displayName || 'User'}</p>
                        <p className="text-xs text-primary-600">{user?.email || 'User'}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <MobileButton
                        icon={<User className="h-4 w-4" />}
                        label="Profile"
                        onClick={() => {
                          navigate('/profile');
                          setIsMenuOpen(false);
                        }}
                      />
                      <MobileButton
                        icon={<History className="h-4 w-4" />}
                        label="History"
                        onClick={() => {goToHistoryTab();
                          setIsMenuOpen(false);
                        }}
                      />
                      <MobileButton
                        icon={<LogOut className="h-4 w-4" />}
                        label="Logout"
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        danger
                      />
                    </div>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    <Link
                      to="/login"
                      className="block w-full px-6 py-3 text-center text-gray-700 font-medium hover:text-primary-600 transition-colors duration-200 rounded-xl hover:bg-primary-50 border border-gray-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="block w-full px-6 py-3 text-center bg-gradient-to-r from-primary-600 to-primary-400 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-20"></div>
      
      {/* Mobile menu backdrop */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

// Helper Components
const NavLink = ({ to, label }) => (
  <Link
    to={to}
    className="group relative px-4 py-2 text-gray-700 font-medium hover:text-primary-600 transition-colors duration-200 rounded-xl hover:bg-primary-50"
  >
    {label}
    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-primary-400 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full"></span>
  </Link>
);

const MobileNavLink = ({ to, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-4 py-3 text-gray-700 font-medium hover:text-primary-600 transition-colors duration-200 rounded-xl hover:bg-primary-50 border-l-4 border-transparent hover:border-primary-600"
  >
    {label}
  </Link>
);

const DropdownItem = ({ icon, label, onClick, danger = false }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-colors duration-200 ${
      danger 
        ? 'text-red-600 hover:bg-red-50' 
        : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

const MobileButton = ({ icon, label, onClick, danger = false }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors duration-200 ${
      danger 
        ? 'text-red-600 hover:bg-red-50' 
        : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

export default Navbar;