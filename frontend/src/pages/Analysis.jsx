import { useState } from "react";

import {
  Upload,
  Sparkles,
  Loader2,
  X,
  Image as ImageIcon,
  CheckCircle2,
  ShoppingBag,
} from "lucide-react";

import Navbar from "../components/layout/Navbar";

import { analyzeOutfit } from "../services/analysisService";


function Analysis() {

  // ==========================================
  // PHOTO STATE
  // ==========================================

  const [photo, setPhoto] = useState(null);

  const [preview, setPreview] = useState(null);


  // ==========================================
  // OCCASION STATE
  // ==========================================

  const [occasion, setOccasion] = useState("casual");


  // ==========================================
  // UI STATE
  // ==========================================

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [result, setResult] = useState(null);


  // ==========================================
  // HANDLE PHOTO
  // ==========================================

  const handlePhotoChange = (event) => {

    const selectedPhoto = event.target.files?.[0];

    if (!selectedPhoto) {
      return;
    }


    // Allowed image types

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(selectedPhoto.type)) {

      setError(
        "Please upload a JPG, PNG or WEBP image."
      );

      return;
    }


    // Backend limit = 5 MB

    if (selectedPhoto.size > 5 * 1024 * 1024) {

      setError(
        "Image size must be less than 5MB."
      );

      return;
    }


    // Save photo

    setPhoto(selectedPhoto);


    // Create preview

    const imageUrl =
      URL.createObjectURL(selectedPhoto);

    setPreview(imageUrl);


    // Clear previous state

    setError("");

    setResult(null);
  };


  // ==========================================
  // REMOVE PHOTO
  // ==========================================

  const handleRemovePhoto = () => {

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPhoto(null);

    setPreview(null);

    setResult(null);

    setError("");
  };


  // ==========================================
  // ANALYZE
  // ==========================================

  const handleAnalyze = async () => {

    setError("");

    setResult(null);


    // Check photo

    if (!photo) {

      setError(
        "Please upload a photo first."
      );

      return;
    }


    // Check occasion

    if (!occasion) {

      setError(
        "Please select an occasion."
      );

      return;
    }


    try {

      setLoading(true);


      console.log(
        "Starting outfit analysis..."
      );

      console.log(
        "Photo:",
        photo.name
      );

      console.log(
        "Occasion:",
        occasion
      );


      // ========================================
      // SEND TO BACKEND
      // ========================================

      const data = await analyzeOutfit(
        photo,
        occasion
      );


      console.log(
        "Analysis response:",
        data
      );


      // ========================================
      // HANDLE RESPONSE
      // ========================================

      if (data.success) {

        setResult(data);

      } else {

        setError(
          data.message ||
          "Unable to analyze your outfit."
        );

      }

    } catch (error) {

      console.error(
        "Analysis error:",
        error
      );


      setError(
        error.response?.data?.message ||
        "Something went wrong while analyzing your photo."
      );

    } finally {

      setLoading(false);

    }

  };


  return (
    <>
      {/* ==========================================
          NAVBAR
      ========================================== */}

      <Navbar />


      {/* ==========================================
          PAGE
      ========================================== */}

      <main className="min-h-screen bg-[#faf9f7] px-4 pb-16 pt-24 sm:px-6">

        <div className="mx-auto max-w-6xl">


          {/* ==========================================
              HEADER
          ========================================== */}

          <div className="mx-auto max-w-2xl text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">

              <Sparkles size={26} />

            </div>


            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-rose-500">

              Krush-AI

            </p>


            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">

              AI Outfit Analysis

            </h1>


            <p className="mt-3 text-gray-500">

              Upload your photo and let Krush-AI
              create a personalized fashion recommendation
              for you.

            </p>

          </div>


          {/* ==========================================
              UPLOAD CARD
          ========================================== */}

          <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">


            {/* ========================================
                PHOTO UPLOAD
            ======================================== */}

            <div>

              <label className="mb-3 block text-sm font-semibold text-gray-700">

                Your Photo

              </label>


              {!preview ? (

                <label
                  htmlFor="photo"
                  className="block cursor-pointer"
                >

                  <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-6 transition hover:border-rose-300 hover:bg-rose-50/30">


                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-gray-400 shadow-sm">

                      <Upload size={28} />

                    </div>


                    <h3 className="mt-5 text-lg font-semibold text-gray-900">

                      Upload your photo

                    </h3>


                    <p className="mt-2 text-sm text-gray-500">

                      Click to select your photo

                    </p>


                    <p className="mt-2 text-xs text-gray-400">

                      JPG, PNG or WEBP • Maximum 5MB

                    </p>

                  </div>

                </label>

              ) : (

                <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">


                  {/* Preview */}

                  <img
                    src={preview}
                    alt="Selected outfit"
                    className="mx-auto max-h-[420px] w-full object-contain"
                  />


                  {/* Remove */}

                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    disabled={loading}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >

                    <X size={19} />

                  </button>


                  {/* File information */}

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-5 pt-12">

                    <div className="flex items-center gap-2 text-white">

                      <ImageIcon size={16} />

                      <span className="truncate text-sm">

                        {photo?.name}

                      </span>

                    </div>

                  </div>

                </div>

              )}


              {/* File input */}

              <input
                id="photo"
                name="photo"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhotoChange}
                className="hidden"
              />

            </div>


            {/* ========================================
                OCCASION
            ======================================== */}

            <div className="mt-8">

              <label
                htmlFor="occasion"
                className="mb-3 block text-sm font-semibold text-gray-700"
              >

                What's the occasion?

              </label>


              <select
                id="occasion"
                name="occasion"
                value={occasion}
                onChange={(event) =>
                  setOccasion(event.target.value)
                }
                disabled={loading}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-gray-900 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10 disabled:cursor-not-allowed disabled:bg-gray-100"
              >

                <option value="casual">
                  Casual
                </option>

                <option value="party">
                  Party
                </option>

                <option value="wedding">
                  Wedding
                </option>

                <option value="work">
                  Work / Office
                </option>

                <option value="formal">
                  Formal
                </option>

                <option value="date-night">
                  Date Night
                </option>

              </select>

            </div>


            {/* ========================================
                ERROR
            ======================================== */}

            {error && (

              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">

                {error}

              </div>

            )}


            {/* ========================================
                ANALYZE BUTTON
            ======================================== */}

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-4 font-semibold text-white shadow-sm transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading ? (

                <>
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />

                  Analyzing Your Style...

                </>

              ) : (

                <>
                  <Sparkles size={20} />

                  Analyze My Outfit

                </>

              )}

            </button>


            <p className="mt-4 text-center text-xs text-gray-400">

              Your photo will be analyzed by Krush-AI
              to create personalized recommendations.

            </p>

          </div>


          {/* ==========================================
              RESULT
          ========================================== */}

          {result && (

            <AnalysisResult
              result={result}
            />

          )}

        </div>

      </main>
    </>
  );
}


/* =====================================================
   ANALYSIS RESULT
===================================================== */

function AnalysisResult({ result }) {

  const analysis = result.analysis;


  return (

    <div className="mx-auto mt-12 max-w-6xl space-y-8">


      {/* ==========================================
          SUCCESS HEADER
      ========================================== */}

      <section className="rounded-3xl bg-gray-900 p-6 text-white shadow-lg sm:p-8">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">

            <CheckCircle2 size={24} />

          </div>


          <div>

            <p className="text-sm text-gray-400">
              Analysis Complete
            </p>

            <h2 className="text-2xl font-bold">
              Your Personalized Style
            </h2>

          </div>

        </div>


        <div className="mt-6 flex flex-wrap gap-3">

          <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
            {analysis.occasion}
          </span>

          <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
            {analysis.style?.formality}
          </span>

        </div>

      </section>


      {/* ==========================================
          APPEARANCE
      ========================================== */}

      <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

        <SectionHeading
          eyebrow="AI ANALYSIS"
          title="Your Appearance"
        />


        <div className="mt-6 grid gap-4 sm:grid-cols-3">

          <InfoCard
            title="Skin Tone"
            value={
              analysis.appearance?.skinTone ||
              "Not available"
            }
          />


          <InfoCard
            title="Undertone"
            value={
              analysis.appearance?.undertone ||
              "Not available"
            }
          />


          <InfoCard
            title="Confidence"
            value={
              analysis.appearance?.confidence
                ? `${Math.round(
                    analysis.appearance.confidence * 100
                  )}%`
                : "N/A"
            }
          />

        </div>

      </section>


      {/* ==========================================
          COLORS
      ========================================== */}

      <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

        <SectionHeading
          eyebrow="COLOR ANALYSIS"
          title="Your Color Palette"
        />


        <p className="mt-2 text-gray-500">
          Colors recommended by Krush-AI for your
          detected undertone.
        </p>


        <h3 className="mt-8 font-semibold text-gray-900">
          Recommended Colors
        </h3>


        <div className="mt-4 flex flex-wrap gap-3">

          {analysis.colors?.recommended?.map(
            (color, index) => (

              <span
                key={index}
                className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700"
              >
                {color}
              </span>

            )
          )}

        </div>


        <h3 className="mt-8 font-semibold text-gray-900">
          Colors to Avoid
        </h3>


        <div className="mt-4 flex flex-wrap gap-3">

          {analysis.colors?.avoid?.map(
            (color, index) => (

              <span
                key={index}
                className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-500"
              >
                {color}
              </span>

            )
          )}

        </div>

      </section>


      {/* ==========================================
          STYLE
      ========================================== */}

      <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

        <SectionHeading
          eyebrow="STYLE PROFILE"
          title="Your Style"
        />


        <div className="mt-6 grid gap-4 sm:grid-cols-2">

          <InfoCard
            title="Current Style"
            value={
              analysis.style?.currentStyle ||
              "Not available"
            }
          />


          <InfoCard
            title="Formality"
            value={
              analysis.style?.formality ||
              "Not available"
            }
          />

        </div>

      </section>


      {/* ==========================================
          OUTFIT
      ========================================== */}

      <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

        <SectionHeading
          eyebrow="PERSONALIZED OUTFIT"
          title="Your Recommended Look"
        />


        <div className="mt-6 grid gap-4 sm:grid-cols-2">

          <OutfitCard
            title="Top"
            value={analysis.outfit?.top}
          />


          <OutfitCard
            title="Bottom"
            value={analysis.outfit?.bottom}
          />


          <OutfitCard
            title="Shoes"
            value={analysis.outfit?.shoes}
          />


          <OutfitCard
            title="Accessories"
            value={
              analysis.outfit?.accessories?.join(
                ", "
              )
            }
          />

        </div>

      </section>


      {/* ==========================================
          STYLING TIPS
      ========================================== */}

      <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

        <SectionHeading
          eyebrow="AI STYLE TIPS"
          title="Complete Your Look"
        />


        <div className="mt-6 space-y-3">

          {analysis.stylingTips?.map(
            (tip, index) => (

              <div
                key={index}
                className="flex gap-3 rounded-2xl bg-rose-50 p-4"
              >

                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-rose-500">

                  {index + 1}

                </div>


                <p className="text-sm leading-6 text-gray-700">

                  {tip}

                </p>

              </div>

            )
          )}

        </div>

      </section>


      {/* ==========================================
          SHOPPING
      ========================================== */}

      <section>

        <div className="mb-6">

          <div className="flex items-center gap-2">

            <ShoppingBag
              size={18}
              className="text-rose-500"
            />

            <p className="text-sm font-semibold uppercase tracking-wider text-rose-500">

              Shopping

            </p>

          </div>


          <h2 className="mt-2 text-2xl font-bold text-gray-900">

            Shop Your Recommended Look

          </h2>


          <p className="mt-2 text-gray-500">

            Products selected based on your AI
            outfit recommendation.

          </p>

        </div>


        <div className="space-y-10">

          {result.products?.map(
            (category, categoryIndex) => (

              <div key={categoryIndex}>

                <h3 className="mb-4 text-lg font-semibold text-gray-900">

                  {formatQuery(category.query)}

                </h3>


                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                  {category.products?.map(
                    (product, productIndex) => (

                      <ProductCard
                        key={productIndex}
                        product={product}
                      />

                    )
                  )}

                </div>

              </div>

            )
          )}

        </div>

      </section>

    </div>
  );
}


/* =====================================================
   SECTION HEADING
===================================================== */

function SectionHeading({
  eyebrow,
  title,
}) {

  return (

    <div>

      <p className="text-sm font-semibold uppercase tracking-wider text-rose-500">

        {eyebrow}

      </p>


      <h2 className="mt-1 text-2xl font-bold text-gray-900">

        {title}

      </h2>

    </div>
  );
}


/* =====================================================
   INFO CARD
===================================================== */

function InfoCard({
  title,
  value,
}) {

  return (

    <div className="rounded-2xl bg-gray-50 p-5">

      <p className="text-xs font-medium uppercase tracking-wider text-gray-400">

        {title}

      </p>


      <p className="mt-2 font-semibold text-gray-900">

        {value}

      </p>

    </div>
  );
}


/* =====================================================
   OUTFIT CARD
===================================================== */

function OutfitCard({
  title,
  value,
}) {

  return (

    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">

      <p className="text-xs font-semibold uppercase tracking-wider text-rose-500">

        {title}

      </p>


      <p className="mt-2 text-sm leading-6 text-gray-700">

        {value || "Not available"}

      </p>

    </div>
  );
}


/* =====================================================
   PRODUCT CARD
===================================================== */

function ProductCard({ product }) {

  return (

    <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">


      {/* Image */}

      <div className="h-64 overflow-hidden bg-gray-50">

        {product.image ? (

          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain p-3 transition duration-300 group-hover:scale-105"
          />

        ) : (

          <div className="flex h-full items-center justify-center text-gray-300">

            <ShoppingBag size={40} />

          </div>

        )}

      </div>


      {/* Content */}

      <div className="p-5">

        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">

          {product.source}

        </p>


        <h4 className="mt-2 line-clamp-2 min-h-[48px] font-semibold leading-6 text-gray-900">

          {product.title}

        </h4>


        <div className="mt-4 flex items-center justify-between gap-3">

          <span className="text-xl font-bold text-gray-900">

            {product.price}

          </span>


          {product.rating && (

            <span className="rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-medium text-yellow-700">

              ★ {product.rating}

            </span>

          )}

        </div>


        {product.reviews > 0 && (

          <p className="mt-1 text-xs text-gray-400">

            {product.reviews} reviews

          </p>

        )}


        {product.delivery && (

          <p className="mt-3 text-xs text-green-600">

            ✓ {product.delivery}

          </p>

        )}


        {product.productLink && (

          <a
            href={product.productLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 block rounded-xl bg-gray-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-700"
          >

            View Product

          </a>

        )}

      </div>

    </div>
  );
}


/* =====================================================
   QUERY FORMATTER
===================================================== */

function formatQuery(query) {

  if (!query) {
    return "Recommended Products";
  }

  return query
    .replace(/^men\s+/i, "")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}


export default Analysis;