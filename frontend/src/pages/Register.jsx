import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

import { registerUser, googleLogin } from "../services/authService";

import { Eye, EyeOff, Sparkles, ArrowRight, Check } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  /* =========================
     FORM STATE
  ========================= */

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  /* =========================
     UI STATE
  ========================= */

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  /* =========================
     HANDLE INPUT
  ========================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================
     HANDLE SUBMIT
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // 1. Validate

    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // 2. Show loading

      setLoading(true);

      // 3. Call backend

      const data = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log("Registration response:", data);

      // 4. If successful

      if (data.success) {
        // Save JWT
        localStorage.setItem("token", data.token);

        // Save user
        localStorage.setItem("user", JSON.stringify(data.user));

        // Go to dashboard
        navigate("/dashboard");
      }
    } catch (error) {
      // 5. Show backend error

      console.error("Registration error:", error);

      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      // Stop loading

      setLoading(false);
    }
  };

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
      console.error("Google login failed:", error);

      setError(
        error.response?.data?.message ||
          "Google login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google login was cancelled or failed.");
  };

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* =================================================
          MAIN
      ================================================= */}

      <div className="grid min-h-screen lg:grid-cols-2">
        {/* =================================================
            LEFT SIDE — BRAND
        ================================================= */}

        <div className="relative hidden overflow-hidden bg-gray-900 lg:flex">
          {/* Background gradients */}

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

            {/* Main Message */}

            <div className="max-w-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-400">
                Your Personal AI Stylist
              </p>

              <h1 className="mt-5 text-5xl font-bold leading-tight text-white xl:text-6xl">
                Discover a style
                <br />
                <span className="text-rose-400">made for you.</span>
              </h1>

              <p className="mt-6 max-w-md text-lg leading-8 text-gray-400">
                Upload your photo, tell us where you're going, and let Krush-AI
                help you find the perfect look.
              </p>

              {/* Benefits */}

              <div className="mt-8 space-y-4">
                <Benefit text="Personalized color analysis" />

                <Benefit text="Event-based outfit recommendations" />

                <Benefit text="Personalized shopping suggestions" />
              </div>
            </div>

            {/* Bottom */}

            <p className="text-sm text-gray-500">© 2026 Krush-AI</p>
          </div>
        </div>

        {/* =================================================
            RIGHT SIDE — FORM
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
                Get Started
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Create your account
              </h2>

              <p className="mt-3 text-gray-500">
                Start discovering your personal style.
              </p>
            </div>

            {/* Form */}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Name */}

              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  autoComplete="name"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10"
                />
              </div>

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
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 pr-12 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  Use at least 6 characters.
                </p>
              </div>

              {/* Confirm Password */}

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 pr-12 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Terms */}

              <div className="flex items-start gap-3">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-gray-300 accent-rose-500"
                />

                <label
                  htmlFor="terms"
                  className="text-sm leading-6 text-gray-500"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="font-medium text-gray-900 hover:text-rose-500"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="font-medium text-gray-900 hover:text-rose-500"
                  >
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              {/* Submit */}

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3.5 font-semibold text-white shadow-lg shadow-gray-900/10 transition duration-300 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
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

              {/* Google */}

              <div className="flex w-full justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap={false}
                  width="100%"
                />
              </div>
            </form>

            {/* Login */}

            <p className="mt-8 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-gray-900 transition hover:text-rose-500"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   BENEFIT COMPONENT
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

export default Register;
