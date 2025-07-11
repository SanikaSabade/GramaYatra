"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Calendar,
  Users,
  Star,
  Clock,
  Plus,
  Trash2,
  Send,
  X,
} from "lucide-react";
import axiosClient from "@/lib/apiClient";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ItineraryBuilder = () => {
  const [experiences, setExperiences] = useState([]);
  const [selectedExperiences, setSelectedExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [showItinerary, setShowItinerary] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    priceRange: "",
    duration: "",
    guests: 1,
  });

  // Sample experiences data - replace with your actual data source
  const sampleExperiences = [
    {
      id: 1,
      title: "Himalayan Village Retreat",
      host: "Ramesh Thakur",
      location: "Manali, Himachal Pradesh",
      price: 1500,
      duration: "2-3 days",
      maxGuests: 6,
      rating: 4.8,
      description:
        "Traditional Himachali cottage stay surrounded by deodar forests with guided treks and local food.",
      amenities: ["Fireplace", "Guided Trek", "Local Meals", "Hot Water"],
      image: "/api/placeholder/300/200",
    },
    {
      id: 2,
      title: "Konkan Coastal Homestay",
      host: "Sujata Patil",
      location: "Velas, Maharashtra",
      price: 1200,
      duration: "2-4 days",
      maxGuests: 5,
      rating: 4.7,
      description:
        "Stay in a serene beach village with coconut trees, fresh seafood, and turtle sightings during nesting season.",
      amenities: ["Seafood", "Beach Access", "Coconut Garden", "Village Tour"],
      image: "/api/placeholder/300/200",
    },
    {
      id: 3,
      title: "Rajasthani Desert Camp",
      host: "Mohit Singh",
      location: "Jaisalmer, Rajasthan",
      price: 2000,
      duration: "1-2 days",
      maxGuests: 4,
      rating: 4.6,
      description:
        "Sleep under the stars in sand dunes with camel safaris, traditional dance, and Rajasthani cuisine.",
      amenities: ["Camel Ride", "Folk Dance", "Bonfire", "Local Cuisine"],
      image: "/api/placeholder/300/200",
    },
    {
      id: 4,
      title: "Backwater Village Houseboat",
      host: "Anita Nair",
      location: "Alleppey, Kerala",
      price: 2200,
      duration: "1-3 days",
      maxGuests: 3,
      rating: 4.9,
      description:
        "Cruise Kerala’s tranquil backwaters on a houseboat and experience village life along the river.",
      amenities: [
        "Houseboat Stay",
        "Coconut Cuisine",
        "Fishing",
        "Ayurvedic Massage",
      ],
      image: "/api/placeholder/300/200",
    },
    {
      id: 5,
      title: "Bamboo Craft Village Workshop",
      host: "Ravi Boro",
      location: "Majuli, Assam",
      price: 900,
      duration: "2 days",
      maxGuests: 8,
      rating: 4.8,
      description:
        "Learn bamboo handicrafts from tribal artisans on India’s largest river island.",
      amenities: [
        "Craft Workshop",
        "Cultural Show",
        "Traditional Meal",
        "River View",
      ],
      image: "/api/placeholder/300/200",
    },
  ];

  useEffect(() => {
    setExperiences(sampleExperiences);
  }, []);

  const addToItinerary = (experience) => {
    if (!selectedExperiences.find((exp) => exp.id === experience.id)) {
      setSelectedExperiences([...selectedExperiences, experience]);
    }
  };

  const removeFromItinerary = (experienceId) => {
    setSelectedExperiences(
      selectedExperiences.filter((exp) => exp.id !== experienceId)
    );
  };

  const generateItinerary = async () => {
    if (selectedExperiences.length === 0) {
      alert("Please select at least one experience to generate an itinerary");
      return;
    }

    setLoading(true);
    try {
      const experiencesList = selectedExperiences
        .map(
          (exp) =>
            `${exp.title} in ${exp.location} (${exp.duration}, ${exp.maxGuests} guests max, $${exp.price}/night)`
        )
        .join(", ");

      const response = await axiosClient.post("api/ai/chat", {
        systemPrompt:
          "You are a travel itinerary expert. Create detailed, day-by-day travel itineraries that are practical and engaging. Format your response using markdown with headers, lists, and emphasis.",
        context:
          "The user has selected multiple travel experiences and wants a cohesive itinerary.",
        prompt: `Create a detailed travel itinerary for these selected experiences: ${experiencesList}. For ${filters.guests} guests. Include suggested travel routes, timing, and daily activities. Make it engaging and practical. Use markdown formatting with headers, bullet points, and emphasis.`,
      });

      if (response.status !== 200) {
        throw new Error("Failed to generate itinerary");
      }

      const data = response.data;
      setAiResponse(data.result || "No response received");
      setShowItinerary(true);
    } catch (error) {
      console.error("Error generating itinerary:", error);
      setAiResponse("Error generating itinerary. Please try again.");
      setShowItinerary(true);
    } finally {
      setLoading(false);
    }
  };

  const filteredExperiences = experiences.filter((exp) => {
    return (
      (filters.location === "" ||
        exp.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.priceRange === "" ||
        (filters.priceRange === "budget" && exp.price < 150) ||
        (filters.priceRange === "mid" && exp.price >= 150 && exp.price < 250) ||
        (filters.priceRange === "luxury" && exp.price >= 250)) &&
      exp.maxGuests >= filters.guests
    );
  });

  const totalCost = selectedExperiences.reduce(
    (sum, exp) => sum + exp.price,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Create Your Perfect Itinerary
          </h1>
          <p className="text-lg text-gray-600">
            Select from unique experiences offered by local hosts
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
          {/* Main Content - Filters and Available Experiences */}
          <div className="xl:col-span-3">
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Filter Experiences</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Search location..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    value={filters.location}
                    onChange={(e) =>
                      setFilters({ ...filters, location: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    value={filters.priceRange}
                    onChange={(e) =>
                      setFilters({ ...filters, priceRange: e.target.value })
                    }
                  >
                    <option value="">All prices</option>
                    <option value="budget">Budget (&lt;$150)</option>
                    <option value="mid">Mid-range ($150-250)</option>
                    <option value="luxury">Luxury ($250+)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guests
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    value={filters.guests}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        guests: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() =>
                      setFilters({
                        location: "",
                        priceRange: "",
                        duration: "",
                        guests: 1,
                      })
                    }
                    className="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Available Experiences */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Available Experiences ({filteredExperiences.length})
                </h3>
                {selectedExperiences.length > 0 && (
                  <span className="text-sm text-gray-500">
                    {selectedExperiences.length} selected
                  </span>
                )}
              </div>

              {filteredExperiences.map((experience) => (
                <div
                  key={experience.id}
                  className="bg-white rounded-xl shadow-sm p-4 lg:p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="lg:w-1/3">
                      <img
                        src={experience.image}
                        alt={experience.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <div className="lg:w-2/3">
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
                        <h4 className="text-xl font-semibold text-gray-900 mb-2 sm:mb-0">
                          {experience.title}
                        </h4>
                        <span className="text-2xl font-bold text-blue-600 whitespace-nowrap">
                          ${experience.price}/night
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">
                        Hosted by {experience.host}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">
                            {experience.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 flex-shrink-0" />
                          <span>{experience.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 flex-shrink-0" />
                          <span>Up to {experience.maxGuests} guests</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                          <span>{experience.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">
                        {experience.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {experience.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => addToItinerary(experience)}
                        disabled={selectedExperiences.find(
                          (exp) => exp.id === experience.id
                        )}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
                      >
                        <Plus className="w-4 h-4" />
                        {selectedExperiences.find(
                          (exp) => exp.id === experience.id
                        )
                          ? "Added"
                          : "Add to Itinerary"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar - Selected Experiences */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 sticky top-6">
              <h3 className="text-lg font-semibold mb-4">Your Itinerary</h3>

              {selectedExperiences.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm">
                    Select experiences to build your itinerary
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="max-h-96 overflow-y-auto space-y-3">
                    {selectedExperiences.map((experience) => (
                      <div
                        key={experience.id}
                        className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-semibold text-sm leading-tight pr-2">
                            {experience.title}
                          </h5>
                          <button
                            onClick={() => removeFromItinerary(experience.id)}
                            className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
                            aria-label="Remove experience"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-1 mb-1">
                          <MapPin className="w-3 h-3 text-gray-400 flex-shrink-0" />
                          <p className="text-xs text-gray-500 truncate">
                            {experience.location}
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-blue-600">
                            ${experience.price}/night
                          </span>
                          <span className="text-xs text-gray-500">
                            {experience.duration}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold text-sm">Total Cost:</span>
                      <span className="text-lg font-bold text-blue-600">
                        ${totalCost}
                      </span>
                    </div>

                    <button
                      onClick={generateItinerary}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
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
          </div>
        </div>

        {/* AI Generated Itinerary Modal/Overlay */}
        {showItinerary && aiResponse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">
                  Your Custom Itinerary
                </h3>
                <button
                  onClick={() => setShowItinerary(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-h1:text-2xl prose-h1:font-bold prose-h1:mb-6 prose-h1:mt-8 prose-h1:pb-2 prose-h1:border-b prose-h1:border-gray-200 prose-h2:text-xl prose-h2:font-semibold prose-h2:mb-4 prose-h2:mt-6 prose-h3:text-lg prose-h3:font-semibold prose-h3:mb-3 prose-h3:mt-5 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-strong:text-gray-900 prose-strong:font-semibold prose-em:text-gray-600 prose-ul:mb-4 prose-ol:mb-4 prose-li:mb-1 prose-li:text-gray-700">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1
                          className="text-2xl font-bold mb-6 mt-8 pb-2 border-b border-gray-200 text-gray-900"
                          {...props}
                        />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2
                          className="text-xl font-semibold mb-4 mt-6 text-gray-900"
                          {...props}
                        />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3
                          className="text-lg font-semibold mb-3 mt-5 text-gray-900"
                          {...props}
                        />
                      ),
                      p: ({ node, ...props }) => (
                        <p
                          className="text-gray-700 leading-relaxed mb-4"
                          {...props}
                        />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul
                          className="list-disc ml-6 mb-4 space-y-1"
                          {...props}
                        />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol
                          className="list-decimal ml-6 mb-4 space-y-1"
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li
                          className="text-gray-700 leading-relaxed"
                          {...props}
                        />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong
                          className="font-semibold text-gray-900"
                          {...props}
                        />
                      ),
                      em: ({ node, ...props }) => (
                        <em className="italic text-gray-600" {...props} />
                      ),
                      blockquote: ({ node, ...props }) => (
                        <blockquote
                          className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4"
                          {...props}
                        />
                      ),
                      code: ({ node, inline, ...props }) =>
                        inline ? (
                          <code
                            className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800"
                            {...props}
                          />
                        ) : (
                          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                            <code
                              className="text-sm font-mono text-gray-800"
                              {...props}
                            />
                          </pre>
                        ),
                      hr: ({ node, ...props }) => (
                        <hr className="my-8 border-gray-300" {...props} />
                      ),
                      table: ({ node, ...props }) => (
                        <table
                          className="w-full border-collapse border border-gray-300 mb-4"
                          {...props}
                        />
                      ),
                      th: ({ node, ...props }) => (
                        <th
                          className="border border-gray-300 px-4 py-2 bg-gray-50 font-semibold text-left"
                          {...props}
                        />
                      ),
                      td: ({ node, ...props }) => (
                        <td
                          className="border border-gray-300 px-4 py-2"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {aiResponse}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryBuilder;
