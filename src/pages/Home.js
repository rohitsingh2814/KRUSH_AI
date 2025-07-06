import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Camera, Palette, ShoppingBag, Users, Zap, Shield } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-12 w-12 text-primary-500 mr-3" />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
              Krush AI
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            AI-Powered Fashion Recommendations
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            Upload your photo, select your event, and let our AI analyze your color tone to suggest 
            the perfect clothing recommendations with direct purchase links.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn-primary text-lg px-8 py-4">
              Get Started Free
            </Link>
            <Link to="/login" className="btn-outline text-lg px-8 py-4">
              Already have an account?
            </Link>
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
            <div className="card">
              <Zap className="h-8 w-8 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Analysis</h3>
              <p className="text-gray-600">
                Get your personalized color analysis in seconds with our advanced AI technology.
              </p>
            </div>
            <div className="card">
              <Users className="h-8 w-8 text-secondary-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Event-Specific</h3>
              <p className="text-gray-600">
                Tailored recommendations for different occasions - parties, weddings, work, and more.
              </p>
            </div>
            <div className="card">
              <Shield className="h-8 w-8 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Privacy First</h3>
              <p className="text-gray-600">
                Your photos are processed securely and never stored permanently.
              </p>
            </div>
            <div className="card">
              <ShoppingBag className="h-8 w-8 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Direct Shopping</h3>
              <p className="text-gray-600">
                One-click shopping links to purchase recommended items from trusted retailers.
              </p>
            </div>
            <div className="card">
              <Palette className="h-8 w-8 text-orange-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Color Science</h3>
              <p className="text-gray-600">
                Based on proven color theory and seasonal color analysis principles.
              </p>
            </div>
            <div className="card">
              <Sparkles className="h-8 w-8 text-pink-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered</h3>
              <p className="text-gray-600">
                Continuously learning AI that improves recommendations with every use.
              </p>
            </div>
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
    </div>
  );
};

export default Home; 