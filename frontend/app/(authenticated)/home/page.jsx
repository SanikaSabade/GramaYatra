'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, Star, Clock, Plus, Trash2, Send } from 'lucide-react';

const ItineraryBuilder = () => {
  const [experiences, setExperiences] = useState([]);
  const [selectedExperiences, setSelectedExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    priceRange: '',
    duration: '',
    guests: 1
  });

  // Sample experiences data - replace with your actual data source
  const sampleExperiences = [
    {
      id: 1,
      title: "Mountain Cabin Retreat",
      host: "Sarah Johnson",
      location: "Aspen, Colorado",
      price: 150,
      duration: "2-3 days",
      maxGuests: 6,
      rating: 4.8,
      description: "Cozy cabin surrounded by pine trees with hiking trails nearby",
      amenities: ["Fireplace", "Hot tub", "Kitchen", "WiFi"],
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "Beach House Experience",
      host: "Michael Chen",
      location: "Malibu, California",
      price: 280,
      duration: "3-5 days",
      maxGuests: 8,
      rating: 4.9,
      description: "Oceanfront property with private beach access and sunset views",
      amenities: ["Private beach", "Pool", "BBQ area", "Kayaks"],
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "Historic Farm Stay",
      host: "Emma Rodriguez",
      location: "Tuscany, Italy",
      price: 120,
      duration: "4-7 days",
      maxGuests: 4,
      rating: 4.7,
      description: "Authentic farm experience with wine tasting and cooking classes",
      amenities: ["Farm animals", "Wine cellar", "Cooking classes", "Garden"],
      image: "/api/placeholder/300/200"
    },
    {
      id: 4,
      title: "Desert Glamping",
      host: "David Kim",
      location: "Sedona, Arizona",
      price: 200,
      duration: "1-2 days",
      maxGuests: 2,
      rating: 4.6,
      description: "Luxury tent experience under the stars with guided meditation",
      amenities: ["Stargazing", "Meditation", "Spa services", "Gourmet meals"],
      image: "/api/placeholder/300/200"
    }
  ];

  useEffect(() => {
    setExperiences(sampleExperiences);
  }, []);

  const addToItinerary = (experience) => {
    if (!selectedExperiences.find(exp => exp.id === experience.id)) {
      setSelectedExperiences([...selectedExperiences, experience]);
    }
  };

  const removeFromItinerary = (experienceId) => {
    setSelectedExperiences(selectedExperiences.filter(exp => exp.id !== experienceId));
  };

  const generateItinerary = async () => {
    if (selectedExperiences.length === 0) {
      alert('Please select at least one experience to generate an itinerary');
      return;
    }

    setLoading(true);
    try {
      const experiencesList = selectedExperiences.map(exp => 
        `${exp.title} in ${exp.location} (${exp.duration}, ${exp.maxGuests} guests max, $${exp.price}/night)`
      ).join(', ');

      const response = await fetch('http://localhost:8000/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          systemPrompt: "You are a travel itinerary expert. Create detailed, day-by-day travel itineraries that are practical and engaging.",
          context: "The user has selected multiple travel experiences and wants a cohesive itinerary.",
          prompt: `Create a detailed travel itinerary for these selected experiences: ${experiencesList}. For ${filters.guests} guests. Include suggested travel routes, timing, and daily activities. Make it engaging and practical.`
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate itinerary');
      }

      const data = await response.json();
      setAiResponse(data.response || 'No response received');
    } catch (error) {
      console.error('Error generating itinerary:', error);
      setAiResponse('Error generating itinerary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredExperiences = experiences.filter(exp => {
    return (
      (filters.location === '' || exp.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.priceRange === '' || 
        (filters.priceRange === 'budget' && exp.price < 150) ||
        (filters.priceRange === 'mid' && exp.price >= 150 && exp.price < 250) ||
        (filters.priceRange === 'luxury' && exp.price >= 250)
      ) &&
      (exp.maxGuests >= filters.guests)
    );
  });

  const totalCost = selectedExperiences.reduce((sum, exp) => sum + exp.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Your Perfect Itinerary</h1>
          <p className="text-lg text-gray-600">Select from unique experiences offered by local hosts</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Filters and Available Experiences */}
          <div className="lg:col-span-2">
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Filter Experiences</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    placeholder="Search location..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filters.priceRange}
                    onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                  >
                    <option value="">All prices</option>
                    <option value="budget">Budget (&lt;$150)</option>
                    <option value="mid">Mid-range ($150-250)</option>
                    <option value="luxury">Luxury ($250+)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={filters.guests}
                    onChange={(e) => setFilters({...filters, guests: parseInt(e.target.value)})}
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => setFilters({location: '', priceRange: '', duration: '', guests: 1})}
                    className="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Available Experiences */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Available Experiences ({filteredExperiences.length})</h3>
              {filteredExperiences.map((experience) => (
                <div key={experience.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-1/3">
                      <img
                        src={experience.image}
                        alt={experience.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-xl font-semibold text-gray-900">{experience.title}</h4>
                        <span className="text-2xl font-bold text-blue-600">${experience.price}/night</span>
                      </div>
                      <p className="text-gray-600 mb-2">Hosted by {experience.host}</p>
                      <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {experience.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {experience.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          Up to {experience.maxGuests} guests
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          {experience.rating}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{experience.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {experience.amenities.map((amenity, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {amenity}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => addToItinerary(experience)}
                        disabled={selectedExperiences.find(exp => exp.id === experience.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-4 h-4" />
                        {selectedExperiences.find(exp => exp.id === experience.id) ? 'Added' : 'Add to Itinerary'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Experiences and Itinerary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-semibold mb-4">Your Itinerary</h3>
              
              {selectedExperiences.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Select experiences to build your itinerary</p>
              ) : (
                <div className="space-y-4">
                  {selectedExperiences.map((experience, index) => (
                    <div key={experience.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold text-sm">{experience.title}</h5>
                        <button
                          onClick={() => removeFromItinerary(experience.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mb-1">{experience.location}</p>
                      <p className="text-sm font-medium text-blue-600">${experience.price}/night</p>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold">Total Cost:</span>
                      <span className="text-xl font-bold text-blue-600">${totalCost}</span>
                    </div>
                    
                    <button
                      onClick={generateItinerary}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Generate Itinerary
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* AI Generated Itinerary */}
            {aiResponse && (
              <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
                <h3 className="text-lg font-semibold mb-4">Your Custom Itinerary</h3>
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700">{aiResponse}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryBuilder;