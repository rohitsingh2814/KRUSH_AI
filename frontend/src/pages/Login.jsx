import { useState } from "react";

import { Eye, EyeOff, Sparkles, ArrowRight, Check } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { GoogleLogin } from "@react-oauth/google";

import { loginUser, googleLogin } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  // =========================
  // FORM STATE
  // =========================

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // =========================
  // UI STATE
  // =========================

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // NORMAL LOGIN
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Validation

    if (!formData.email.trim()) {
      setError("Please enter your email.");

      return;
    }

    if (!formData.password) {
      setError("Please enter your password.");

      return;
    }

    try {
      // Start loading

      setLoading(true);

      // Call backend

      const data = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      console.log("Login response:", data);

      // Successful login

      if (data.success) {
        // Save token

        localStorage.setItem("token", data.token);

        // Save user

        localStorage.setItem("user", JSON.stringify(data.user));

        // Go to dashboard

         window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GOOGLE LOGIN
  // =========================

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setError("");

      setLoading(true);

      const data = await googleLogin(credentialResponse.credential);

      if (data.success) {
        localStorage.setItem("token", data.token);

        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Google login error:", error);

      setError(
        error.response?.data?.message ||
          "Google login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // GOOGLE ERROR
  // =========================

  const handleGoogleError = () => {
    setError("Google login was cancelled or failed.");
  };

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="relative hidden overflow-hidden bg-gray-900 lg:flex">
          {/* Background decorations */}

          <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-rose-500/20 blur-3xl" />

          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />

          <div className="relative flex w-full flex-col justify-between p-12 xl:p-16">
            {/* Logo */}

            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-bold text-white"
            >
              <Sparkles className="h-7 w-7 text-[#D4AF37]" />
              Krush
              <span className="text-rose-400">AI</span>
            </Link>

            {/* Content */}

            <div className="max-w-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-400">
                Welcome Back
              </p>

              <h1 className="mt-5 text-5xl font-bold leading-tight text-white xl:text-6xl">
                Your style journey
                <br />
                <span className="text-rose-400">continues here.</span>
              </h1>

              <p className="mt-6 max-w-md text-lg leading-8 text-gray-400">
                Sign in to access your personalized fashion recommendations,
                saved looks, and AI style analysis.
              </p>

              {/* Benefits */}

              <div className="mt-8 space-y-4">
                <Benefit text="Access your personal style profile" />

                <Benefit text="View your AI fashion analysis" />

                <Benefit text="Manage your saved outfits" />
              </div>
            </div>

            {/* Footer */}

            <p className="text-sm text-gray-500">© 2026 Krush-AI</p>
          </div>
        </div>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}

            <Link
              to="/"
              className="mb-10 flex items-center justify-center gap-2 text-2xl font-bold text-gray-900 lg:hidden"
            >
              <Sparkles className="h-7 w-7 text-[#D4AF37]" />
              Krush
              <span className="text-rose-500">AI</span>
            </Link>

            {/* Heading */}

            <div className="text-center lg:text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">
                Welcome Back
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Login to Krush-AI
              </h2>

              <p className="mt-3 text-gray-500">
                Continue your personal style journey.
              </p>
            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Email */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10"
                />
              </div>

              {/* Password */}

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-rose-500 hover:text-rose-600"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 pr-12 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Error */}

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Login button */}

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3.5 font-semibold text-white shadow-lg shadow-gray-900/10 transition duration-300 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing In...
                  </>
                ) : (
                  <>
                    Login
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

              {/* Divider */}

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>

                <div className="relative flex justify-center">
                  <span className="bg-[#faf9f7] px-4 text-sm text-gray-400">
                    OR
                  </span>
                </div>
              </div>

              {/* Google Login */}

              <div className="flex w-full justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap={false}
                />
              </div>
            </form>

            {/* Register */}

            <p className="mt-8 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-gray-900 transition hover:text-rose-500"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   BENEFIT
========================================================= */

function Benefit({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/10 text-rose-400">
        <Check size={14} />
      </div>

      <span className="text-sm text-gray-300">{text}</span>
    </div>
  );
}

export default Login;
