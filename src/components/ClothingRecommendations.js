import React from 'react';
import { ShoppingBag, ExternalLink, Heart, Star } from 'lucide-react';

const ClothingRecommendations = ({ recommendations }) => {
  const handlePurchase = (link, itemName) => {
    // In a real app, you might want to track clicks or open in new tab
    window.open(link, '_blank');
  };

  const getRating = () => {
    return (Math.random() * 2 + 3).toFixed(1); // Random rating between 3.0-5.0
  };

  return (
    <div className="card">
      <div className="flex items-center mb-6">
        <ShoppingBag className="h-6 w-6 text-primary-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-900">Personalized Recommendations</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {recommendations.map((item) => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Product Image */}
            <div className="relative h-48 bg-gray-100">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=400&fit=crop';
                }}
              />
              <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                <Heart className="h-4 w-4 text-gray-400 hover:text-red-500" />
              </button>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-lg leading-tight">{item.name}</h3>
                <span className="text-lg font-bold text-primary-600">{item.price}</span>
              </div>

              <p className="text-sm text-gray-500 mb-3">{item.brand}</p>

              {/* Rating */}
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= Math.floor(getRating())
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">{getRating()} (24 reviews)</span>
              </div>

              {/* Color Palette */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Recommended Colors:</p>
                <div className="flex space-x-2">
                  {item.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border border-gray-200"
                      style={{ backgroundColor: color }}
                      title={color}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePurchase(item.link, item.name)}
                  className="flex-1 btn-primary py-2 text-sm flex items-center justify-center"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Buy Now
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  Save
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Recommendations */}
      <div className="mt-8 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">💡 More Style Suggestions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-primary-600 font-bold">A</span>
            </div>
            <p className="text-gray-700">Accessories</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-secondary-600 font-bold">S</span>
            </div>
            <p className="text-gray-700">Shoes</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-green-600 font-bold">B</span>
            </div>
            <p className="text-gray-700">Bags</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-purple-600 font-bold">J</span>
            </div>
            <p className="text-gray-700">Jewelry</p>
          </div>
        </div>
      </div>

      {/* Shopping Tips */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-2">🛍️ Shopping Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• All links open in new tabs for your convenience</li>
          <li>• Prices and availability may vary by retailer</li>
          <li>• Consider your budget and personal style preferences</li>
          <li>• Save items you like for future reference</li>
        </ul>
      </div>
    </div>
  );
};

export default ClothingRecommendations; 