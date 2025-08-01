import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Camera, Palette, ShoppingBag, Users, Zap, Shield } from 'lucide-react';
import BenefitCard from '../components/BenefitCard';

const Home = () => {
  return (
    <div  className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
        {/* Hero Text and Buttons - now on the left */}
        <div className="max-w-4xl mx-auto px-4 flex-1 order-2 md:order-1">
          <div className="flex flex-col items-center md:items-start justify-center mb-8">
            <div className="flex items-center justify-center md:justify-start">
              <Sparkles className="h-12 w-12 text-primary-500 mr-3" />
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
                Krush AI
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-600 mt-2 text-center md:text-left">
              AI-Powered Fashion Recommendations
            </p>
          </div>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto md:mx-0 md:text-left">
            Upload your photo, select your event, and let our AI analyze your color tone to suggest 
            the perfect clothing recommendations with direct purchase links.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link to="/signup" className="btn-primary text-lg px-8 py-4">
              Get Started Free
            </Link>
            <Link to="/login" className="btn-outline text-lg px-8 py-4">
              Already have an account?
            </Link>
          </div>
        </div>
        {/* Animated Hero Illustration - now on the right */}
        <div className="flex-shrink-0 flex items-center justify-center w-full md:w-auto mb-10 md:mb-0 order-1 md:order-2">
          <div className="relative flex flex-row items-center gap-6 hero-anim-horizontal w-full md:w-auto">
            {/* Camera Icon */}
            <svg className="w-20 h-20 camera-anim-horizontal" viewBox="0 0 64 64" fill="none">
              <rect x="8" y="20" width="48" height="32" rx="6" fill="#3B82F6"/>
              <circle cx="32" cy="36" r="10" fill="#fff"/>
              <rect x="24" y="12" width="16" height="12" rx="4" fill="#2563EB"/>
              <circle cx="32" cy="36" r="5" fill="#3B82F6"/>
            </svg>
            {/* Flash Effect */}
            <div className="absolute top-1/2 left-0 w-20 h-20 flash-anim-horizontal pointer-events-none" style={{transform: 'translateY(-50%)'}}></div>
            {/* Photo Upload (Polaroid) */}
            <div className="w-32 h-40 polaroid-anim-horizontal bg-white rounded-lg shadow-lg flex items-center justify-center">
              <svg className="w-20 h-20" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="24" fill="#FBBF24"/>
                <ellipse cx="32" cy="38" rx="12" ry="8" fill="#FDE68A"/>
              </svg>
            </div>
            {/* AI Analysis Sparkles */}
            <Sparkles className="w-12 h-12 ai-anim-horizontal text-pink-400" />
            {/* Clothing Recommendations */}
            <div className="flex gap-4 clothing-anim-horizontal">
              <svg className="w-10 h-10" viewBox="0 0 64 64" fill="none">
                <path d="M32 8L16 16L8 24L24 32V56H40V32L56 24L48 16L32 8Z" fill="#3B82F6"/>
              </svg>
              <svg className="w-10 h-10" viewBox="0 0 64 64" fill="none">
                <path d="M32 8C36 16 44 24 44 32L56 56H8L20 32C20 24 28 16 32 8Z" fill="#F472B6"/>
              </svg>
              <svg className="w-10 h-10" viewBox="0 0 64 64" fill="none">
                <path d="M8 44C8 36 56 36 56 44C56 52 8 52 8 44Z" stroke="#10B981" strokeWidth="3"/>
                <path d="M32 12C32 8 36 8 36 12C36 16 32 16 32 20" stroke="#10B981" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload Photo</h3>
              <p className="text-gray-600">
                Simply upload a clear photo of yourself. Our AI will analyze your skin tone, 
                hair color, and overall appearance.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Palette className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Color Analysis</h3>
              <p className="text-gray-600">
                Our advanced AI detects your color palette and suggests the most flattering 
                colors for your unique features.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Recommendations</h3>
              <p className="text-gray-600">
                Receive personalized clothing suggestions with direct links to purchase 
                from your favorite retailers.
              </p>
            </div>
          </div>
        </div>
      </section>
       

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            Why Choose Krush AI?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BenefitCard
              icon={<Zap className="h-8 w-8 text-primary-500 mb-4" />}
              title="Instant Analysis"
              description="Get your personalized color analysis in seconds with our advanced AI technology."
            />
            <BenefitCard
              icon={<Users className="h-8 w-8 text-secondary-500 mb-4" />}
              title="Event-Specific"
              description="Tailored recommendations for different occasions - parties, weddings, work, and more."
            />
            <BenefitCard
              icon={<Shield className="h-8 w-8 text-green-500 mb-4" />}
              title="Privacy First"
              description="Your photos are processed securely and never stored permanently."
            />
            <BenefitCard
              icon={<ShoppingBag className="h-8 w-8 text-purple-500 mb-4" />}
              title="Direct Shopping"
              description="One-click shopping links to purchase recommended items from trusted retailers."
            />
            <BenefitCard
              icon={<Palette className="h-8 w-8 text-orange-500 mb-4" />}
              title="Color Science"
              description="Based on proven color theory and seasonal color analysis principles."
            />
            <BenefitCard
              icon={<Sparkles className="h-8 w-8 text-pink-500 mb-4" />}
              title="AI-Powered"
              description="Continuously learning AI that improves recommendations with every use."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Discover Your Perfect Style?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of users who have transformed their wardrobe with AI-powered recommendations.
          </p>
          <Link to="/signup" className="bg-white text-primary-500 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
            Start Your Style Journey
          </Link>
        </div>
      </section>
      <footer className="relative overflow-hidden bg-orange-50 py-12 px-4 text-center">
      {/* Sparkle Particles */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <span className="sparkle-particle top-5 left-10"></span>
        <span className="sparkle-particle top-12 right-16 delay-100"></span>
        <span className="sparkle-particle bottom-8 left-1/2 delay-200"></span>
        <span className="sparkle-particle top-1/3 right-8 delay-300"></span>
        <span className="sparkle-particle bottom-5 left-8 delay-500"></span>
      </div>

      {/* Footer Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800">
          Krush AI — Smart Fit. Styled Right.
        </h2>

        
        <p className="mt-6 text-sm text-gray-500">
          © {new Date().getFullYear()} Krush AI. All rights reserved.
        </p>
      </div>

      {/* Sparkle CSS Keyframes */}
      <style>
        {`
          @keyframes sparkle {
            0%, 100% {
              transform: scale(1);
              opacity: 0.5;
            }
            50% {
              transform: scale(1.6) rotate(20deg);
              opacity: 1;
            }
          }

          .sparkle-particle {
            position: absolute;
            width: 6px;
            height: 6px;
            background: radial-gradient(circle, #FFD700, #FFA500);
            border-radius: 50%;
            animation: sparkle 1.8s infinite ease-in-out;
          }

          .delay-100 { animation-delay: 0.1s; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.3s; }
          .delay-500 { animation-delay: 0.5s; }
        `}
      </style>
    </footer>
    </div>
  );
};

export default Home;

