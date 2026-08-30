import {
  ArrowRight,
  Camera,
  Check,
  Palette,
  ShoppingBag,
  Sparkles,
  Shirt,
  Heart,
  BriefcaseBusiness,
  PartyPopper,
  Gem,
  Coffee,
} from "lucide-react";

import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#faf9f7] text-gray-900">

      <Navbar />

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative overflow-hidden px-6 pb-20 pt-32 sm:pt-36 lg:px-8 lg:pb-28">

        {/* Background Decorations */}

        <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-rose-200/40 blur-3xl" />

        <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-orange-100/60 blur-3xl" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-pink-100/40 blur-3xl" />


        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

          {/* =================================================
              HERO LEFT
          ================================================= */}

          <div className="text-center lg:text-left">

            {/* Badge */}

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-600">

              <Sparkles size={16} />

              AI-Powered Personal Styling

            </div>


            {/* Heading */}

            <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">

              Discover the style

              <br />

              <span className="text-rose-500">
                that is made for you.
              </span>

            </h1>


            {/* Description */}

            <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-gray-600 lg:mx-0">

              Upload your photo and let Krush-AI analyze your
              colors, preferences, and occasion to create
              personalized fashion recommendations.

            </p>


            {/* Buttons */}

            <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">

              <Link
                to="/register"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 px-7 py-3.5 font-semibold text-white shadow-lg shadow-gray-900/10 transition duration-300 hover:-translate-y-0.5 hover:bg-gray-700 sm:w-auto"
              >

                Get Started Free

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />

              </Link>


              <a
                href="#how-it-works"
                className="inline-flex w-full items-center justify-center rounded-full border border-gray-300 bg-white px-7 py-3.5 font-semibold text-gray-800 transition duration-300 hover:bg-gray-50 sm:w-auto"
              >

                See How It Works

              </a>

            </div>


            {/* Trust Points */}

            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-gray-500 lg:justify-start">

              <div className="flex items-center gap-2">

                <Check
                  size={16}
                  className="text-green-500"
                />

                Personalized recommendations

              </div>


              <div className="flex items-center gap-2">

                <Check
                  size={16}
                  className="text-green-500"
                />

                AI color analysis

              </div>

            </div>

          </div>


          {/* =================================================
              HERO RIGHT
          ================================================= */}

          <div className="relative mx-auto w-full max-w-sm">

            {/* Main Fashion Card */}

            <div
              className="
                relative
                mx-auto
                w-[280px]
                overflow-hidden
                rounded-[2rem]
                bg-gray-900
                p-2.5
                shadow-2xl
                rotate-[6deg]
                transition-transform
                duration-500
                hover:rotate-[3deg]
                sm:w-[310px]
              "
            >

              {/* Inner Screen */}

              <div
                className="
                  relative
                  flex
                  h-[440px]
                  items-end
                  overflow-hidden
                  rounded-[1.5rem]
                  bg-gradient-to-br
                  from-rose-100
                  via-orange-50
                  to-stone-200
                "
              >

                {/* Soft Glow */}

                <div className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-white/50 blur-3xl" />


                {/* Center Icon */}

                <div className="absolute inset-0 flex items-center justify-center">

                  <div className="text-center">

                    <Shirt
                      size={75}
                      strokeWidth={1}
                      className="mx-auto text-gray-500/40"
                    />

                    <p className="mt-4 text-sm text-gray-500">
                      Your style analysis
                    </p>

                  </div>

                </div>


                {/* AI Analysis Card */}

                <div
                  className="
                    relative
                    m-3
                    w-full
                    rounded-2xl
                    border
                    border-white/60
                    bg-white/90
                    p-4
                    shadow-lg
                    backdrop-blur
                  "
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
                        AI Analysis
                      </p>

                      <h3 className="mt-1 text-sm font-semibold">
                        Your Color Palette
                      </h3>

                    </div>


                    <div className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-medium text-green-700">
                      94% Match
                    </div>

                  </div>


                  {/* Color Palette */}

                  <div className="mt-3 flex gap-2">

                    <div className="h-7 w-7 rounded-full bg-[#d6a77a]" />

                    <div className="h-7 w-7 rounded-full bg-[#8b5e3c]" />

                    <div className="h-7 w-7 rounded-full bg-[#1f2937]" />

                    <div className="h-7 w-7 rounded-full bg-[#be123c]" />

                    <div className="h-7 w-7 rounded-full bg-[#f5e6d3]" />

                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
                DETECTED TONE BADGE
            ================================================= */}

            <div
              className="
                absolute
                -left-8
                top-14
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-3
                shadow-xl
                animate-[badgeFloat_4s_ease-in-out_infinite]
              "
            >

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-rose-100 p-3 text-rose-500">

                  <Palette size={18} />

                </div>


                <div>

                  <p className="text-[11px] text-gray-500">
                    Detected Tone
                  </p>

                  <p className="text-sm font-semibold">
                    Warm / Autumn
                  </p>

                </div>

              </div>

            </div>


            {/* =================================================
                RECOMMENDATION BADGE
            ================================================= */}

            <div
              className="
                absolute
                -right-8
                bottom-20
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-3
                shadow-xl
                animate-[badgeFloatReverse_5s_ease-in-out_infinite]
              "
            >

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-green-100 p-3 text-green-600">

                  <ShoppingBag size={18} />

                </div>


                <div>

                  <p className="text-[11px] text-gray-500">
                    Recommendations
                  </p>

                  <p className="text-sm font-semibold">
                    24 outfits found
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section
        id="how-it-works"
        className="border-y border-gray-200 bg-white px-6 py-24 lg:px-8"
      >

        <div className="mx-auto max-w-7xl">

          {/* Section Heading */}

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">
              Simple Process
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Find your style in 3 steps
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-500">
              Let Krush-AI do the analysis.
              You just choose what looks good.
            </p>

          </div>


          {/* Steps */}

          <div className="mt-16 grid gap-8 md:grid-cols-3">

            <StepCard
              number="01"
              icon={<Camera size={25} />}
              title="Upload Your Photo"
              description="Upload a clear photo and tell us what kind of event you're dressing for."
              color="gray"
            />

            <StepCard
              number="02"
              icon={<Sparkles size={25} />}
              title="AI Analyzes You"
              description="Krush-AI analyzes your color tone and identifies the palette that suits you."
              color="rose"
            />

            <StepCard
              number="03"
              icon={<Shirt size={25} />}
              title="Get Your Style"
              description="Discover outfits and products personalized specifically for you."
              color="orange"
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section
        id="features"
        className="px-6 py-28 lg:px-8"
      >

        <div className="mx-auto max-w-7xl">

          {/* Heading */}

          <div className="max-w-3xl">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">
              Why Krush-AI
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              More than just fashion recommendations.
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-500">
              Get recommendations that understand your
              appearance, your occasion, and your personal style.
            </p>

          </div>


          {/* Feature Cards */}

          <div className="mt-16 grid gap-6 md:grid-cols-3">

            <FeatureCard
              icon={<Palette size={24} />}
              title="Color Analysis"
              description="Discover whether warm, cool, neutral, or olive tones suit you and get your personalized seasonal palette."
            />


            <FeatureCard
              icon={<Sparkles size={24} />}
              title="Event-Based Styling"
              description="Get outfits specifically designed for weddings, parties, work, dates, casual days, and formal occasions."
            />


            <FeatureCard
              icon={<ShoppingBag size={24} />}
              title="Personalized Shopping"
              description="Find clothing items that match your style and get direct links to shop your recommended looks."
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          EVENTS
      ===================================================== */}

      <section
        id="events"
        className="bg-gray-900 px-6 py-28 text-white lg:px-8"
      >

        <div className="mx-auto max-w-7xl">

          {/* Heading */}

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-400">
              Whatever the occasion
            </p>

            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
              We've got your look.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-gray-400">
              Tell us where you're going and Krush-AI
              will help you decide what to wear.
            </p>

          </div>


          {/* Events */}

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">

            <EventCard
              icon={<PartyPopper />}
              title="Party"
            />

            <EventCard
              icon={<Gem />}
              title="Wedding"
            />

            <EventCard
              icon={<BriefcaseBusiness />}
              title="Work"
            />

            <EventCard
              icon={<Coffee />}
              title="Casual"
            />

            <EventCard
              icon={<Shirt />}
              title="Formal"
            />

            <EventCard
              icon={<Heart />}
              title="Date Night"
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          PERSONALIZATION SECTION
      ===================================================== */}

      <section className="bg-[#faf9f7] px-6 py-28 lg:px-8">

        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

          {/* Left */}

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">
              Your Style Profile
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Fashion recommendations
              <span className="text-rose-500">
                {" "}made for you.
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-500">
              Krush-AI learns your preferences so your
              recommendations become more personalized over time.
            </p>


            <div className="mt-8 space-y-4">

              <CheckItem text="Personal color palette" />

              <CheckItem text="Preferred event styles" />

              <CheckItem text="Saved fashion items" />

              <CheckItem text="Analysis history" />

            </div>

          </div>


          {/* Right */}

          <div className="relative">

            <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-xl">

              {/* Profile Header */}

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs uppercase tracking-wider text-gray-400">
                    Your Style Profile
                  </p>

                  <h3 className="mt-1 text-xl font-bold">
                    Personalized for you
                  </h3>

                </div>

                <div className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-500">
                  AI Profile
                </div>

              </div>


              {/* Palette */}

              <div className="mt-8">

                <p className="text-sm font-medium text-gray-500">
                  Recommended Palette
                </p>

                <div className="mt-3 flex gap-3">

                  <div className="h-12 flex-1 rounded-xl bg-[#d6a77a]" />

                  <div className="h-12 flex-1 rounded-xl bg-[#8b5e3c]" />

                  <div className="h-12 flex-1 rounded-xl bg-[#1f2937]" />

                  <div className="h-12 flex-1 rounded-xl bg-[#be123c]" />

                  <div className="h-12 flex-1 rounded-xl bg-[#f5e6d3]" />

                </div>

              </div>


              {/* Preferences */}

              <div className="mt-8 grid grid-cols-2 gap-4">

                <div className="rounded-2xl bg-gray-50 p-4">

                  <p className="text-xs text-gray-400">
                    Best Style
                  </p>

                  <p className="mt-1 font-semibold">
                    Smart Casual
                  </p>

                </div>


                <div className="rounded-2xl bg-gray-50 p-4">

                  <p className="text-xs text-gray-400">
                    Color Tone
                  </p>

                  <p className="mt-1 font-semibold">
                    Warm / Autumn
                  </p>

                </div>

              </div>


              {/* Recommendation */}

              <div className="mt-4 flex items-center gap-4 rounded-2xl bg-rose-50 p-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500 text-white">

                  <Shirt size={22} />

                </div>

                <div>

                  <p className="text-xs text-gray-500">
                    AI Recommendation
                  </p>

                  <p className="font-semibold">
                    Earth-tone outfit
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="px-6 py-28 lg:px-8">

        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-rose-500 px-8 py-16 text-center text-white shadow-2xl shadow-rose-500/20 sm:px-16">

          {/* Decorative circles */}

          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10" />

          <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/10" />


          <div className="relative">

            <Sparkles
              className="mx-auto"
              size={32}
            />

            <h2 className="mt-6 text-4xl font-bold sm:text-5xl">
              Ready to discover
              <br />
              your best style?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-rose-100">
              Upload your photo and let Krush-AI create
              personalized fashion recommendations for you.
            </p>

            <Link
              to="/register"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-gray-900 transition duration-300 hover:-translate-y-0.5 hover:bg-gray-100"
            >

              Start Styling

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />

            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-gray-200 bg-white px-6 py-10 lg:px-8">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">

          <Link
            to="/"
            className="text-xl font-bold"
          >
            KRUSH<span className="text-rose-500">-AI</span>
          </Link>


          <div className="flex items-center gap-6 text-sm text-gray-500">

            <a
              href="#features"
              className="transition hover:text-gray-900"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="transition hover:text-gray-900"
            >
              How it works
            </a>

            <Link
              to="/login"
              className="transition hover:text-gray-900"
            >
              Login
            </Link>

          </div>


          <p className="text-sm text-gray-400">
            © 2026 Krush-AI
          </p>

        </div>

      </footer>

    </div>
  );
}


/* =========================================================
   STEP CARD
========================================================= */

function StepCard({
  number,
  icon,
  title,
  description,
  color,
}) {
  const colors = {
    gray: "bg-gray-900",
    rose: "bg-rose-500",
    orange: "bg-orange-500",
  };

  return (
    <div className="group relative rounded-3xl bg-[#faf9f7] p-8 transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white ${colors[color]}`}
      >
        {icon}
      </div>


      <span className="mt-8 block text-sm font-semibold tracking-wider text-rose-500">
        STEP {number}
      </span>


      <h3 className="mt-2 text-2xl font-bold">
        {title}
      </h3>


      <p className="mt-4 leading-7 text-gray-500">
        {description}
      </p>

    </div>
  );
}


/* =========================================================
   FEATURE CARD
========================================================= */

function FeatureCard({
  icon,
  title,
  description,
}) {
  return (
    <div className="group rounded-3xl border border-gray-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-xl">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-500 transition duration-300 group-hover:bg-rose-500 group-hover:text-white">
        {icon}
      </div>


      <h3 className="mt-6 text-xl font-bold">
        {title}
      </h3>


      <p className="mt-3 leading-7 text-gray-500">
        {description}
      </p>

    </div>
  );
}


/* =========================================================
   EVENT CARD
========================================================= */

function EventCard({
  icon,
  title,
}) {
  return (
    <div className="group flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/10">

      <div className="text-rose-400 transition duration-300 group-hover:scale-110">
        {icon}
      </div>


      <span className="mt-4 text-sm font-medium">
        {title}
      </span>

    </div>
  );
}


/* =========================================================
   CHECK ITEM
========================================================= */

function CheckItem({
  text,
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">

        <Check size={14} />

      </div>

      <span className="font-medium text-gray-700">
        {text}
      </span>

    </div>
  );
}


export default Home;