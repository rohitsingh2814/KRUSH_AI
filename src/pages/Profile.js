import React, { useState, useRef } from 'react';
import { User, Settings, Heart, History, Palette, Save } from 'lucide-react';
import toast from 'react-hot-toast';


const Profile = ({ user, setUser }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const [image , setimage] = useState("")
  const handleImageClick = () =>{
    inputRef.current.click();
  }
  const handleImageChange = (event) =>{
     const file = event.target.files[0];
      setimage(event.target.files[0]);
  };
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    age: user?.preferences?.age || '',
    colorTone: user?.preferences?.colorTone || '',
    events: user?.preferences?.events || []
    
  });

  const events = [
    { id: 'party', name: 'Party', icon: '🎉' },
    { id: 'wedding', name: 'Wedding', icon: '💒' },
    { id: 'work', name: 'Work/Office', icon: '💼' },
    { id: 'casual', name: 'Casual', icon: '👕' },
    { id: 'formal', name: 'Formal', icon: '🎩' },
    { id: 'date', name: 'Date Night', icon: '💕' }
  ];

  const colorTones = [
    { id: 'warm', name: 'Warm', description: 'Golden, peachy undertones' },
    { id: 'cool', name: 'Cool', description: 'Pink, blue undertones' },
    { id: 'neutral', name: 'Neutral', description: 'Balanced undertones' },
    { id: 'olive', name: 'Olive', description: 'Green undertones' }
  ];

  const ageRanges = [
    { id: '18-25', name: '18-25' },
    { id: '26-35', name: '26-35' },
    { id: '36-45', name: '36-45' },
    { id: '46-55', name: '46-55' },
    { id: '55+', name: '55+' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEventToggle = (eventId) => {
    setFormData(prev => ({
      ...prev,
      events: prev.events.includes(eventId)
        ? prev.events.filter(id => id !== eventId)
        : [...prev.events, eventId]
    }));
  };

  const handleSave = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        preferences: {
          age: formData.age,
          colorTone: formData.colorTone,
          events: formData.events
        }
      };
      
      setUser(updatedUser);
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    }
  };

  const mockSavedItems = [
    {
      id: 1,
      name: 'Elegant Evening Dress',
      brand: 'Fashion Forward',
      price: '$89.99',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop',
      savedAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Professional Blazer',
      brand: 'Career Wear',
      price: '$129.99',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
      savedAt: '2024-01-10'
    }
  ];

  const mockHistory = [
    {
      id: 1,
      event: 'Party',
      date: '2024-01-15',
      recommendations: 5,
      colors: ['#8B4513', '#F5DEB3']
    },
    {
      id: 2,
      event: 'Work',
      date: '2024-01-10',
      recommendations: 3,
      colors: ['#CD853F', '#DEB887']
    }
  ];
  
  return (
    <div className="max-w-6xl mx-auto">
      
        <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">
          Manage your account settings and view your style history
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'profile'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <User className="h-4 w-4 mr-2" />
          Profile
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'saved'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Heart className="h-4 w-4 mr-2" />
          Saved Items
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'history'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <History className="h-4 w-4 mr-2" />
          History
        </button>
      </div>
        
      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn-outline"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
           {/* profile pic */}
          <div
            onClick={isEditing ? handleImageClick : undefined}
            className={`relative w-24 h-24 flex items-center justify-center rounded-full border-4 border-white shadow-lg ring-2 ring-orange-300 ${isEditing ? 'hover:ring-orange-400 focus-within:ring-orange-600 cursor-pointer' : ''} overflow-hidden`}
          >
          <img
          src={ image ? URL.createObjectURL(image) : "https://randomuser.me/api/portraits/lego/1.jpg" }
          alt="Profile"
          className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-25 transition-opacity flex items-center justify-center rounded-full">
              <svg className="h-8 w-8 text-white opacity-0 hover:opacity-100 transition-opacity" xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
             </svg>
             </div>

             
        <input
        type="file"
        ref={inputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="input-field disabled:bg-gray-50"
                />
              </div>
             
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="input-field disabled:bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age Range
              </label>
              <select
                name="age"
                value={formData.age}
                onChange={handleChange}
                disabled={!isEditing}
                className="input-field disabled:bg-gray-50"
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
                    type="button"
                    onClick={() => isEditing && setFormData({...formData, colorTone: tone.id})}
                    disabled={!isEditing}
                    className={`p-3 rounded-lg border-2 text-left transition-colors ${
                      formData.colorTone === tone.id
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="font-medium">{tone.name}</div>
                    <div className="text-xs text-gray-500">{tone.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Events
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {events.map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => isEditing && handleEventToggle(event.id)}
                    disabled={!isEditing}
                    className={`p-3 rounded-lg border-2 text-left transition-colors ${
                      formData.events.includes(event.id)
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="text-xl mb-1">{event.icon}</div>
                    <div className="font-medium">{event.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="btn-primary"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Saved Items Tab */}
      {activeTab === 'saved' && (
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Saved Items</h2>
          {mockSavedItems.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {mockSavedItems.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="h-48 bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{item.brand}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary-600">{item.price}</span>
                      <span className="text-xs text-gray-500">Saved {item.savedAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No saved items yet</h3>
              <p className="text-gray-500">Start saving items you like during your style analysis</p>
            </div>
          )}
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Analysis History</h2>
          {mockHistory.length > 0 ? (
            <div className="space-y-4">
              {mockHistory.map((analysis) => (
                <div key={analysis.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Palette className="h-5 w-5 text-primary-500 mr-2" />
                      <span className="font-medium text-gray-900">{analysis.event} Analysis</span>
                    </div>
                    <span className="text-sm text-gray-500">{analysis.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">
                        {analysis.recommendations} recommendations
                      </span>
                      <div className="flex space-x-2">
                        {analysis.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border border-gray-200"
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                      </div>
                    </div>
                    <button className="text-sm text-primary-600 hover:text-primary-700">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <History className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No analysis history</h3>
              <p className="text-gray-500">Your style analysis history will appear here</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile; 
