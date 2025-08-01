import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Heart, Zap, Target } from 'lucide-react';

const QuestionnaireLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Style Quiz</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Your
            <span className="block bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              Perfect Style
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Answer a few questions about your body type, preferences, and style goals. 
            Our AI will curate personalized clothing recommendations just for you.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Body Type Analysis</h3>
            <p className="text-gray-600">
              Get recommendations tailored to your unique body shape and measurements.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Color Matching</h3>
            <p className="text-gray-600">
              Find colors that complement your skin tone and enhance your natural beauty.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Results</h3>
            <p className="text-gray-600">
              Receive curated product recommendations with prices and direct links.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Link
            to="/questionnaire/quiz"
            className="group inline-flex items-center space-x-3 bg-gradient-to-r from-primary-600 to-primary-400 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span>Start Your Style Quiz</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-gray-500 mt-4 text-sm">
            Takes only 2-3 minutes • No registration required
          </p>
        </div>

        {/* How it works */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Answer Questions</h3>
              <p className="text-gray-600 text-sm">
                Tell us about your body type, measurements, and preferences
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Analysis</h3>
              <p className="text-gray-600 text-sm">
                Our AI analyzes your responses and matches them with perfect styles
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Get Results</h3>
              <p className="text-gray-600 text-sm">
                Receive personalized clothing recommendations with prices and links
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Shop & Style</h3>
              <p className="text-gray-600 text-sm">
                Click through to purchase your perfect pieces and elevate your style
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireLanding; 