import React from 'react';
import { Palette, TrendingUp, Sparkles } from 'lucide-react';

const ColorAnalysis = ({ results }) => {
  const getPaletteDescription = (palette) => {
    const descriptions = {
      'Autumn': 'Warm, earthy tones that complement golden undertones',
      'Winter': 'Cool, bold colors that enhance pink/blue undertones',
      'Spring': 'Fresh, bright colors that work with balanced undertones',
      'Summer': 'Soft, muted colors that flatter cool undertones'
    };
    return descriptions[palette] || 'Personalized color recommendations';
  };

  const getToneDescription = (tone) => {
    const descriptions = {
      'warm': 'You have golden, peachy undertones that look great in warm colors',
      'cool': 'You have pink, blue undertones that are enhanced by cool colors',
      'neutral': 'You have balanced undertones that can wear both warm and cool colors',
      'olive': 'You have green undertones that work well with earthy, muted colors'
    };
    return descriptions[tone] || 'Your unique color characteristics';
  };

  return (
    <div className="card">
      <div className="flex items-center mb-6">
        <Palette className="h-6 w-6 text-primary-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Color Analysis Results</h2>
      </div>

      {/* Confidence Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Analysis Confidence</span>
          <span className="text-sm font-semibold text-primary-600">{results.confidence}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${results.confidence}%` }}
          ></div>
        </div>
      </div>

      {/* Skin Tone Analysis */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Your Color Tone</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <div className="w-4 h-4 rounded-full mr-3" style={{
              backgroundColor: results.skinTone === 'warm' ? '#F5DEB3' : 
                              results.skinTone === 'cool' ? '#E6E6FA' : 
                              results.skinTone === 'olive' ? '#808000' : '#F5F5DC'
            }}></div>
            <span className="font-medium capitalize">{results.skinTone}</span>
          </div>
          <p className="text-sm text-gray-600">{getToneDescription(results.skinTone)}</p>
        </div>
      </div>

      {/* Recommended Palette */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Recommended Color Palette</h3>
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Sparkles className="h-5 w-5 text-primary-500 mr-2" />
            <span className="font-semibold text-primary-700">{results.recommendedPalette}</span>
          </div>
          <p className="text-sm text-gray-600">{getPaletteDescription(results.recommendedPalette)}</p>
        </div>
      </div>

      {/* Dominant Colors */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Detected Colors</h3>
        <div className="space-y-3">
          {results.dominantColors.map((color, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div 
                  className="w-6 h-6 rounded-full mr-3 border border-gray-200"
                  style={{ backgroundColor: color.color }}
                ></div>
                <div>
                  <span className="font-medium text-gray-900">{color.name}</span>
                  <span className="text-sm text-gray-500 ml-2">({color.color})</span>
                </div>
              </div>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-gray-700">{color.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Color Tips */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-2">💡 Style Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use these colors as a base for your wardrobe</li>
          <li>• Mix and match with complementary shades</li>
          <li>• Consider these colors for accessories and makeup</li>
          <li>• These colors will make you look naturally radiant</li>
        </ul>
      </div>
    </div>
  );
};

export default ColorAnalysis; 