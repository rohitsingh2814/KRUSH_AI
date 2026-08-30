import { useState } from "react";

import {
  Eye,
  EyeOff,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle,
} from "lucide-react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import api from "../services/api";


function ResetPassword() {

  const { token } = useParams();

  const navigate = useNavigate();


  // =========================
  // FORM STATE
  // =========================

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");


  // =========================
  // UI STATE
  // =========================

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);


  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");


    // Password validation

    if (password.length < 6) {

      setError(
        "Password must be at least 6 characters."
      );

      return;
    }


    // Confirm password

    if (password !== confirmPassword) {

      setError(
        "Passwords do not match."
      );

      return;
    }


    try {

      setLoading(true);


      /*
        Send token + new password
        to backend
      */

      const response = await api.post(
        `/auth/reset-password/${token}`,
        {
          password,
        }
      );


      const data = response.data;


      if (data.success) {

        setSuccess(true);

      }

    } catch (error) {

      console.error(
        "Reset password error:",
        error
      );


      setError(
        error.response?.data?.message ||
        "Unable to reset password. The link may have expired."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="min-h-screen bg-[#faf9f7]">

      <div className="grid min-h-screen lg:grid-cols-2">


        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="relative hidden overflow-hidden bg-gray-900 lg:flex">

          <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-rose-500/20 blur-3xl" />

          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />


          <div className="relative flex w-full flex-col justify-between p-12 xl:p-16">


            {/* Logo */}

            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-bold text-white"
            >

              <Sparkles
                className="h-7 w-7 text-[#D4AF37]"
              />

              Krush

              <span className="text-rose-400">
                AI
              </span>

            </Link>


            {/* Content */}

            <div className="max-w-lg">

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-400">
                Secure Account
              </p>


              <h1 className="mt-5 text-5xl font-bold leading-tight text-white xl:text-6xl">

                Create a new
                <br />

                <span className="text-rose-400">
                  password.
                </span>

              </h1>


              <p className="mt-6 max-w-md text-lg leading-8 text-gray-400">

                Choose a strong password to keep
                your Krush-AI account secure.

              </p>


              <div className="mt-8 space-y-4">

                <Benefit text="Use at least 6 characters" />

                <Benefit text="Keep your password private" />

                <Benefit text="Your reset link is time-limited" />

              </div>

            </div>


            <p className="text-sm text-gray-500">
              © 2026 Krush-AI
            </p>

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

              <Sparkles
                className="h-7 w-7 text-[#D4AF37]"
              />

              Krush

              <span className="text-rose-500">
                AI
              </span>

            </Link>


            {!success ? (

              <>

                {/* Heading */}

                <div className="text-center lg:text-left">

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 lg:mx-0">

                    <Lock size={26} />

                  </div>


                  <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">
                    Reset Password
                  </p>


                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">

                    Create new password

                  </h2>


                  <p className="mt-3 text-gray-500">

                    Enter your new password below.

                  </p>

                </div>


                {/* Form */}

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-5"
                >


                  {/* Password */}

                  <div>

                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      New Password
                    </label>


                    <div className="relative">

                      <input
                        id="password"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        value={password}
                        onChange={(e) =>
                          setPassword(
                            e.target.value
                          )
                        }
                        placeholder="Enter new password"
                        autoComplete="new-password"
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 pr-12 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10"
                      />


                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            !showPassword
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                      >

                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}

                      </button>

                    </div>


                    <p className="mt-2 text-xs text-gray-400">
                      Minimum 6 characters.
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
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        value={confirmPassword}
                        onChange={(e) =>
                          setConfirmPassword(
                            e.target.value
                          )
                        }
                        placeholder="Confirm new password"
                        autoComplete="new-password"
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 pr-12 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10"
                      />


                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            !showConfirmPassword
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
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


                  {/* Submit */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3.5 font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {loading ? (

                      <>
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                        Resetting Password...
                      </>

                    ) : (

                      <>
                        Reset Password

                        <ArrowRight
                          size={18}
                          className="transition-transform group-hover:translate-x-1"
                        />

                      </>

                    )}

                  </button>

                </form>


                {/* Back */}

                <Link
                  to="/login"
                  className="mt-8 flex items-center justify-center text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  Back to Login
                </Link>

              </>

            ) : (

              /* =================================================
                  SUCCESS
              ================================================= */

              <div className="text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-500">

                  <CheckCircle size={34} />

                </div>


                <h2 className="mt-6 text-3xl font-bold text-gray-900">

                  Password reset successful

                </h2>


                <p className="mt-4 leading-7 text-gray-500">

                  Your password has been updated.
                  You can now log in with your new
                  password.

                </p>


                <button
                  onClick={() =>
                    navigate("/login")
                  }
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 font-semibold text-white transition hover:bg-gray-700"
                >

                  Go to Login

                  <ArrowRight size={18} />

                </button>

              </div>

            )}

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

        <CheckCircle size={14} />

      </div>

      <span className="text-sm text-gray-300">
        {text}
      </span>

    </div>

  );
}


export default ResetPassword;