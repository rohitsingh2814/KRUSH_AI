import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Camera, Upload, Palette, ShoppingBag, Sparkles, X, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import ColorAnalysis from '../components/ColorAnalysis';
import ClothingRecommendations from '../components/ClothingRecommendations';

const Dashboard = ({ user }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [age, setAge] = useState('');
  const [colorTone, setColorTone] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const events = [
    { id: 'party', name: 'Party', icon: '🎉' },
    { id: 'wedding', name: 'Wedding', icon: '💒' },
    { id: 'work', name: 'Work/Office', icon: '💼' },
    { id: 'casual', name: 'Casual', icon: '👕' },
    { id: 'formal', name: 'Formal', icon: '🎩' },
    { id: 'date', name: 'Date Night', icon: '💕' }
  ];

  const ageRanges = [
    { id: '18-25', name: '18-25' },
    { id: '26-35', name: '26-35' },
    { id: '36-45', name: '36-45' },
    { id: '46-55', name: '46-55' },
    { id: '55+', name: '55+' }
  ];

  const colorTones = [
    { id: 'warm', name: 'Warm', description: 'Golden, peachy undertones' },
    { id: 'cool', name: 'Cool', description: 'Pink, blue undertones' },
    { id: 'neutral', name: 'Neutral', description: 'Balanced undertones' },
    { id: 'olive', name: 'Olive', description: 'Green undertones' }
  ];

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('File size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
        setAnalysisResults(null);
        setRecommendations([]);
      };
      reader.readAsDataURL(file);
      toast.success('Photo uploaded successfully!');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: false
  });

  const analyzeImage = async () => {
    if (!uploadedImage || !selectedEvent || !age || !colorTone) {
      toast.error('Please fill in all fields and upload a photo');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock analysis results
      const mockResults = {
        dominantColors: [
          { color: '#8B4513', name: 'Saddle Brown', percentage: 25 },
          { color: '#F5DEB3', name: 'Wheat', percentage: 20 },
          { color: '#CD853F', name: 'Peru', percentage: 15 },
          { color: '#DEB887', name: 'Burly Wood', percentage: 12 },
          { color: '#D2691E', name: 'Chocolate', percentage: 8 }
        ],
        skinTone: colorTone,
        recommendedPalette: colorTone === 'warm' ? 'Autumn' : colorTone === 'cool' ? 'Winter' : 'Spring',
        confidence: 87
      };
      
      setAnalysisResults(mockResults);
      
      // Generate mock recommendations
      const mockRecommendations = generateRecommendations(selectedEvent, colorTone, age);
      setRecommendations(mockRecommendations);
      
      toast.success('Analysis complete! Check your personalized recommendations below.');
    } catch (error) {
      toast.error('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateRecommendations = (event, tone, ageRange) => {
    const baseRecommendations = {
      party: [
        {
          id: 1,
          name: 'Elegant Evening Dress',
          brand: 'Fashion Forward',
          price: '$89.99',
          image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop',
          link: 'https://example.com/dress1',
          colors: ['#8B4513', '#F5DEB3'],
          description: 'Perfect for parties with your warm undertones'
        },
        {
          id: 2,
          name: 'Statement Blouse',
          brand: 'Style Studio',
          price: '$45.99',
          image: 'https://images.unsplash.com/photo-1564257631407-3deb5f3d3b3b?w=300&h=400&fit=crop',
          link: 'https://example.com/blouse1',
          colors: ['#CD853F', '#DEB887'],
          description: 'Complements your natural color palette'
        }
      ],
      wedding: [
        {
          id: 3,
          name: 'Formal Gown',
          brand: 'Elegance Collection',
          price: '$299.99',
          image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop',
          link: 'https://example.com/gown1',
          colors: ['#8B4513', '#F5DEB3'],
          description: 'Sophisticated choice for special occasions'
        }
      ],
      work: [
        {
          id: 4,
          name: 'Professional Blazer',
          brand: 'Career Wear',
          price: '$129.99',
          image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
          link: 'https://example.com/blazer1',
          colors: ['#CD853F', '#DEB887'],
          description: 'Perfect for the office environment'
        }
      ]
    };

    return baseRecommendations[event] || baseRecommendations.party;
  };

  const removeImage = () => {
    setUploadedImage(null);
    setAnalysisResults(null);
    setRecommendations([]);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-600">
          Upload your photo and let our AI create personalized fashion recommendations for you.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Upload and Settings */}
        <div className="space-y-6">
          {/* Photo Upload */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Camera className="h-5 w-5 mr-2 text-primary-500" />
              Upload Your Photo
            </h2>
            
            {!uploadedImage ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-300 hover:border-primary-400'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                {isDragActive ? (
                  <p className="text-primary-600">Drop the photo here...</p>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-2">
                      Drag & drop a photo here, or click to select
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports JPG, PNG, WEBP (max 5MB)
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* Event Selection */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Event</h2>
            <div className="grid grid-cols-2 gap-3">
              {events.map((event) => (
                <button
                  key={event.id}
                  onClick={() => setSelectedEvent(event.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-colors ${
                    selectedEvent === event.id
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{event.icon}</div>
                  <div className="font-medium">{event.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Age and Color Tone */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Range
                </label>
                <select
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input-field"
                >
                  <option value="">Select age range</option>
                  {ageRanges.map((range) => (
                    <option key={range.id} value={range.id}>
                      {range.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color Tone
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {colorTones.map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() => setColorTone(tone.id)}
                      className={`p-3 rounded-lg border-2 text-left transition-colors ${
                        colorTone === tone.id
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium">{tone.name}</div>
                      <div className="text-xs text-gray-500">{tone.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Analyze Button */}
          <button
            onClick={analyzeImage}
            disabled={!uploadedImage || !selectedEvent || !age || !colorTone || isAnalyzing}
            className="w-full btn-primary py-4 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Analyze & Get Recommendations
              </>
            )}
          </button>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {/* Color Analysis Results */}
          {analysisResults && (
            <ColorAnalysis results={analysisResults} />
          )}

          {/* Clothing Recommendations */}
          {recommendations.length > 0 && (
            <ClothingRecommendations recommendations={recommendations} />
          )}

          {/* Empty State */}
          {!analysisResults && !isAnalyzing && (
            <div className="card text-center py-12">
              <Palette className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Ready to discover your style?
              </h3>
              <p className="text-gray-500">
                Upload a photo, select your event, and let our AI create personalized recommendations for you.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 