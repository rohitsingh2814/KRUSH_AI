import { useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Mail,
  Sparkles,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

import {
  forgotPassword,
} from "../services/authService";


function ForgotPassword() {

  const [email, setEmail] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    setSuccess(false);


    // =========================
    // VALIDATION
    // =========================

    if (!email.trim()) {

      setError(
        "Please enter your email address."
      );

      return;
    }


    try {

      setLoading(true);


      // =========================
      // CALL BACKEND
      // =========================

      const data = await forgotPassword(
        email
      );


      console.log(
        "Forgot password response:",
        data
      );


      if (data.success) {

        setSuccess(true);

      }

    } catch (error) {

      console.error(
        "Forgot password error:",
        error
      );


      setError(
        error.response?.data?.message ||
        "Something went wrong. Please try again."
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

          {/* Background decoration */}

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
                Account Recovery
              </p>


              <h1 className="mt-5 text-5xl font-bold leading-tight text-white xl:text-6xl">

                Get back to your
                <br />

                <span className="text-rose-400">
                  style journey.
                </span>

              </h1>


              <p className="mt-6 max-w-md text-lg leading-8 text-gray-400">

                Don't worry. We'll help you get
                back into your Krush-AI account
                securely.

              </p>


              {/* Benefits */}

              <div className="mt-8 space-y-4">

                <Benefit
                  text="Secure password recovery"
                />

                <Benefit
                  text="Reset link expires in 15 minutes"
                />

                <Benefit
                  text="Your account stays protected"
                />

              </div>

            </div>


            {/* Footer */}

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

                    <Mail size={26} />

                  </div>


                  <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">
                    Password Recovery
                  </p>


                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Forgot your password?
                  </h2>


                  <p className="mt-3 text-gray-500">
                    Enter your email and we'll send you
                    a link to reset your password.
                  </p>

                </div>


                {/* Form */}

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-5"
                >

                  <div>

                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>


                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10"
                    />

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
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3.5 font-semibold text-white shadow-lg shadow-gray-900/10 transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {loading ? (

                      <>
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                        Sending Link...
                      </>

                    ) : (

                      <>
                        Send Reset Link

                        <ArrowRight
                          size={18}
                          className="transition-transform group-hover:translate-x-1"
                        />

                      </>

                    )}

                  </button>

                </form>


                {/* Back to Login */}

                <Link
                  to="/login"
                  className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
                >

                  <ArrowLeft size={16} />

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

                  Check your email

                </h2>


                <p className="mt-4 leading-7 text-gray-500">

                  If an account exists for{" "}

                  <span className="font-semibold text-gray-900">
                    {email}
                  </span>

                  , we've sent a password reset
                  link.

                </p>


                <p className="mt-3 text-sm text-gray-400">

                  The reset link will expire in
                  15 minutes.

                </p>


                <Link
                  to="/login"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 font-semibold text-white transition hover:bg-gray-700"
                >

                  Back to Login

                  <ArrowRight size={18} />

                </Link>

              </div>

            )}

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

        <CheckCircle size={14} />

      </div>

      <span className="text-sm text-gray-300">
        {text}
      </span>

    </div>

  );
}


export default ForgotPassword;