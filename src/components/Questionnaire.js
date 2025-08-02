import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bodyTypeImage from '../assets/bodytype.jpg';
import { ArrowLeft, ArrowRight, Loader } from 'lucide-react';

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  const questions = [
    {
      id: 'gender',
      question: "What's your gender?",
      type: 'range-options',
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
        { value: 'prefer-not-to-say', label: 'Do not want to specify' }
      ]
    },
    {
      id: 'bodyType',
      question: 'What is your body type?',
      type: 'body-type-options',
      options: [
        { 
          value: 'hourglass', 
          label: 'Hourglass', 
          description: 'Balanced shoulders and hips, defined waist'
        },
        { 
          value: 'rectangle', 
          label: 'Rectangle', 
          description: 'Similar measurements throughout'
        },
        { 
          value: 'triangle', 
          label: 'Triangle/Pear', 
          description: 'Wider hips, narrower shoulders'
        },
        { 
          value: 'inverted-triangle', 
          label: 'Inverted Triangle', 
          description: 'Broader shoulders, narrower hips'
        },
        { 
          value: 'diamond', 
          label: 'Diamond', 
          description: 'Wider at the waist, narrower at shoulders and hips'
        },
        { 
          value: 'round', 
          label: 'Round/Apple', 
          description: 'Fuller around the middle'
        },
        { 
          value: 'other', 
          label: 'Other', 
          description: 'Describe your body type',
          isTextInput: true 
        }
      ]
    },
    {
      id: 'chestWidth',
      question: 'What is your chest width range?',
      type: 'range-options',
      options: [
        { value: 'small', label: 'Small (32-34 inches)' },
        { value: 'medium', label: 'Medium (35-37 inches)' },
        { value: 'large', label: 'Large (38-40 inches)' },
        { value: 'xlarge', label: 'X-Large (41+ inches)' }
      ]
    },
    {
      id: 'waistSize',
      question: 'What is your waist size range?',
      type: 'range-options',
      options: [
        { value: 'small', label: 'Small (24-26 inches)' },
        { value: 'medium', label: 'Medium (27-29 inches)' },
        { value: 'large', label: 'Large (30-32 inches)' },
        { value: 'xlarge', label: 'X-Large (33+ inches)' }
      ]
    },
    {
      id: 'hipSize',
      question: 'What is your hip size range?',
      type: 'range-options',
      options: [
        { value: 'small', label: 'Small (34-36 inches)' },
        { value: 'medium', label: 'Medium (37-39 inches)' },
        { value: 'large', label: 'Large (40-42 inches)' },
        { value: 'xlarge', label: 'X-Large (43+ inches)' }
      ]
    },
    {
      id: 'colorTone',
      question: 'What is your skin undertone?',
      type: 'color-options',
      options: [
        { 
          value: 'warm', 
          label: 'Warm', 
          description: 'Golden, yellow undertones',
          colors: ['#FFD700', '#FFA500', '#FF8C00', '#FF6347']
        },
        { 
          value: 'cool', 
          label: 'Cool', 
          description: 'Blue, pink undertones',
          colors: ['#4169E1', '#9370DB', '#8A2BE2', '#4B0082']
        },
        { 
          value: 'neutral', 
          label: 'Neutral', 
          description: 'Balanced undertones',
          colors: ['#808080', '#A9A9A9', '#C0C0C0', '#D3D3D3']
        },
        { 
          value: 'olive', 
          label: 'Olive', 
          description: 'Green, yellow undertones',
          colors: ['#808000', '#9ACD32', '#6B8E23', '#556B2F']
        }
      ]
    },
    {
      id: 'occasion',
      question: 'What occasion are you shopping for?',
      type: 'multi-options',
      options: [
        { value: 'party', label: 'Party' },
        { value: 'casual', label: 'Casual' },
        { value: 'office', label: 'Office/Work' },
        { value: 'formal', label: 'Formal' },
        { value: 'date-night', label: 'Date Night' },
        { value: 'wedding', label: 'Wedding' },
        { value: 'other', label: 'Other', isTextInput: true }
      ]
    },
    {
      id: 'ageRange',
      question: 'What is your age range?',
      type: 'range-options',
      options: [
        { value: '18-25', label: '18-25 years' },
        { value: '26-35', label: '26-35 years' },
        { value: '36-45', label: '36-45 years' },
        { value: '46-55', label: '46-55 years' },
        { value: '55+', label: '55+ years' }
      ]
    }
  ];

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
    
    // Auto-advance to next question after a short delay (only if not a text input)
    const currentQ = questions.find(q => q.id === questionId);
    const selectedOption = currentQ?.options.find(opt => opt.value === answer);
    
    if (!selectedOption?.isTextInput) {
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
        } else {
          // If this is the last question, automatically submit
          handleSubmit();
        }
      }, 500);
    }
  };

  const handleTextInput = (questionId, textValue) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: textValue
    }));
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/recommendations', {
        answers: answers
      });
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      setError('Failed to get recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderQuestion = (question) => {
    const currentAnswer = answers[question.id];

    switch (question.type) {
      case 'body-type-options':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {question.options.map((option) => (
              <div
                key={option.value}
                className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-lg ${
                  currentAnswer === option.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
                onClick={() => handleAnswer(question.id, option.value)}
              >
                <div className="text-center mb-3">
                  <h3 className="font-semibold text-gray-800 mb-1">{option.label}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
                {option.isTextInput && currentAnswer === option.value && (
                  <input
                    type="text"
                    placeholder="Describe your body type..."
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    onChange={(e) => handleTextInput(question.id, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              </div>
            ))}
          </div>
        );

      case 'range-options':
        return (
          <div className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option.value}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                  currentAnswer === option.value
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
                onClick={() => handleAnswer(question.id, option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        );

      case 'color-options':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {question.options.map((option) => (
              <div
                key={option.value}
                className={`cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-lg ${
                  currentAnswer === option.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
                onClick={() => handleAnswer(question.id, option.value)}
              >
                <div className="flex flex-wrap gap-1 mb-3 justify-center">
                  {option.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border border-gray-300"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <h3 className="text-center font-semibold text-gray-800 mb-1">
                  {option.label}
                </h3>
                <p className="text-center text-sm text-gray-600">
                  {option.description}
                </p>
              </div>
            ))}
          </div>
        );

      case 'multi-options':
        return (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {question.options.map((option) => (
              <button
                key={option.value}
                className={`p-3 rounded-lg border-2 transition-all hover:shadow-md ${
                  currentAnswer === option.value
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
                onClick={() => handleAnswer(question.id, option.value)}
              >
                {option.label}
                {option.isTextInput && currentAnswer === option.value && (
                  <input
                    type="text"
                    placeholder="Specify occasion..."
                    className="mt-2 w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                    onChange={(e) => handleTextInput(question.id, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              </button>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (recommendations) {
    return (
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          Your Personalized Recommendations
        </h2>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-primary-600 font-bold mb-2">${product.price}</p>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors"
                >
                  View Product
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => {
              setRecommendations(null);
              setAnswers({});
              setCurrentQuestion(0);
              setError(null);
            }}
            className="bg-primary-500 text-white px-6 py-2 rounded-md hover:bg-primary-600 transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-primary-400 to-primary-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
          {questions[currentQuestion].question}
        </h2>
        {renderQuestion(questions[currentQuestion])}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className={`flex items-center space-x-2 px-6 py-2 rounded-md transition-colors ${
            currentQuestion === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-primary-500 text-white hover:bg-primary-600'
          }`}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Previous</span>
        </button>

        {currentQuestion === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center space-x-2 bg-primary-500 text-white px-6 py-2 rounded-md hover:bg-primary-600 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                <span>Getting Recommendations...</span>
              </>
            ) : (
              <>
                <span>Get Recommendations</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center space-x-2 bg-primary-500 text-white px-6 py-2 rounded-md hover:bg-primary-600 transition-colors"
          >
            <span>Next</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;