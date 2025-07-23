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

  const getDisplayName = () => {
    if (user) {
      // Prefer full name if it looks like a full name (contains a space or is longer than 12 chars)
      if (user.name && (user.name.trim().includes('') || user.name.trim().length > 12)) {
        return user.name;
      }
      // Fallback to username if present
      if (user.username) {
        return user.username;
      }
      // Fallback to email
      if (user.email) {
        return user.email;
      }
    }
    return 'there';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Banner */}
        
        {/* <div className="bg-gradient-to-r from-orange-400 via-pink-400 to-rose-400 rounded-2xl shadow-lg p-8 text-white text-center">
    <h1 className="text-4xl font-extrabold">Welcome, {getDisplayName()}! 👋</h1>
    <p className="text-lg mt-2">Your personal AI stylist is ready. Let’s find your perfect look.</p>
</div> */}
<div className="bg-gradient-to-r from-orange-300 via-orange-200 to-orange-300 rounded-3xl shadow-xl p-8 mb-5 text-center text-gray-800">
    <h1 className="text-4xl font-extrabold tracking-tight">✨ Welcome, {getDisplayName()}! ✨</h1>
    <p className="mt-2 text-lg font-medium">Your AI stylist is ready to sprinkle some magic on your look 💖</p>
</div>



        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - User Inputs */}
            <div className="lg:col-span-1 space-y-8">
                {/* Step 1: Photo Upload */}
                <div className="bg-orange-50 rounded-3xl shadow-lg p-6 hover:shadow-xl transition">
                    <div className="flex items-center mb-4">
                        <div className="flex-shrink-0 bg-primary-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-lg">1</div>
                        <h2 className="text-xl font-semibold text-gray-800 ml-3">Upload Your Photo</h2>
                    </div>
                    
                    {!uploadedImage ? (
                        <div {...getRootProps()} className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ease-in-out group ${isDragActive ? 'border-primary-500 bg-primary-50 scale-105' : 'border-gray-300 hover:border-primary-400'}`}>
                            <input {...getInputProps()} />
                            <div className="flex flex-col items-center justify-center h-48">
                                <Upload className="h-12 w-12 text-gray-400 mb-4 transition-transform duration-300 ease-in-out transform group-hover:scale-110" />
                                {isDragActive ? (
                                    <p className="text-primary-600 font-semibold">Drop it like it's hot!</p>
                                ) : (
                                    <>
                                        <p className="font-semibold text-gray-700">Drag & drop or click to upload</p>
                                        <p className="text-sm text-gray-500 mt-1">PNG, JPG, WEBP (Max 5MB)</p>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="relative group rounded-xl overflow-hidden">
                            <img src={uploadedImage} alt="Uploaded" className="w-full h-auto object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 ease-in-out"></div>
                            <button onClick={removeImage} className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out transform hover:scale-110">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Step 2: Define Style */}
                <div className="bg-orange-50 rounded-3xl shadow-lg p-6 hover:shadow-xl transition">
                      <div className="flex items-center mb-4">
                        <div className="flex-shrink-0 bg-primary-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-lg">2</div>
                        <h2 className="text-xl font-semibold text-gray-800 ml-3">Define Your Style</h2>
                    </div>
                    
                    <div className="space-y-6">
                        {/* Event Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Event</label>
                            <div className="grid grid-cols-3 gap-2">
                                {events.map((event) => (
                                    <button key={event.id} onClick={() => setSelectedEvent(event.id)} className={`flex flex-col items-center p-2 rounded-lg border-2 transition-all ${selectedEvent === event.id ? 'border-primary-500 bg-primary-50 scale-105 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}>
                                        <span className="text-2xl">{event.icon}</span>
                                        <span className="text-xs font-medium text-center">{event.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Age Range */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
                            <select value={age} onChange={(e) => setAge(e.target.value)} className="input-field">
                                <option value="">Select...</option>
                                {ageRanges.map((range) => (<option key={range.id} value={range.id}>{range.name}</option>))}
                            </select>
                        </div>

                        {/* Color Tone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Color Tone</label>
                            <div className="grid grid-cols-2 gap-2">
                                {colorTones.map((tone) => (
                                    <button key={tone.id} onClick={() => setColorTone(tone.id)} className={`p-3 rounded-lg border-2 text-left transition-colors ${colorTone === tone.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                        <div className="font-semibold text-sm text-gray-800">{tone.name}</div>
                                        <div className="text-xs text-gray-500">{tone.description}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Step 3: Analyze */}
                <button
                    onClick={analyzeImage}
                    disabled={!uploadedImage || !selectedEvent || !age || !colorTone || isAnalyzing}
                    className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1"
                >
                      {isAnalyzing ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                              <span>Analyzing Your Vibe...</span>
                          </>
                      ) : (
                          <>
                              <Sparkles className="h-6 w-6 mr-2" />
                              Get My Recommendations
                          </>
                      )}
                </button>
            </div>

            {/* Right Column - Results */}
            <div className="lg:col-span-2 space-y-8">
                  {/* Results will appear here */}
                  {analysisResults && <ColorAnalysis results={analysisResults} />}
                  {recommendations.length > 0 && <ClothingRecommendations recommendations={recommendations} />}
                  
                  {/* Empty State */}
                  {!analysisResults && !isAnalyzing && (
                      <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-8 h-full text-center">
                          <div className="bg-primary-50 rounded-full p-6 mb-6">
                            <Palette className="h-16 w-16 text-primary-400" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">
                              Your Style Awaits
                          </h3>
                          <p className="text-gray-500 max-w-sm">
                            Complete the steps on the left to unlock your personalized fashion recommendations, powered by AI.
                          </p>
                      </div>
                  )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 