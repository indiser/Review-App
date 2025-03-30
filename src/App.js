// App.js - Main Component
import React, { useState, useEffect } from 'react';

const App = () => {
  // Sample initial reviews data
  const initialReviews = [
    { id: 1, author: "Jane Smith", product: "Wireless Headphones", rating: 4.5, 
      date: "2025-03-15", comment: "Great sound quality and battery life!", 
      tags: ["electronics", "audio", "wireless"] },
    { id: 2, author: "John Doe", product: "Coffee Maker", rating: 3, 
      date: "2025-03-10", comment: "Decent product but takes too long to brew.", 
      tags: ["appliance", "kitchen"] },
    { id: 3, author: "Sam Wilson", product: "Running Shoes", rating: 5, 
      date: "2025-03-20", comment: "Perfect fit and very comfortable for long runs!", 
      tags: ["footwear", "sports", "running"] },
    { id: 4, author: "Alex Johnson", product: "Smartphone", rating: 4, 
      date: "2025-03-05", comment: "Great performance but camera could be better.", 
      tags: ["electronics", "mobile", "gadget"] },
    { id: 5, author: "Taylor Reed", product: "Blender", rating: 2, 
      date: "2025-03-25", comment: "Broke after just two months of use.", 
      tags: ["appliance", "kitchen"] }
  ];

  // State management
  const [reviews, setReviews] = useState(initialReviews);
  const [filteredReviews, setFilteredReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState({
    author: "",
    product: "",
    rating: 0,
    comment: "",
    tags: ""
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [tagFilter, setTagFilter] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  // Handle input changes for new review form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const tagsArray = newReview.tags.split(",").map(tag => tag.trim().toLowerCase());
    
    const review = {
      id: reviews.length + 1,
      author: newReview.author,
      product: newReview.product,
      rating: parseFloat(newReview.rating),
      date: new Date().toISOString().split('T')[0],
      comment: newReview.comment,
      tags: tagsArray
    };
    
    setReviews([...reviews, review]);
    setNewReview({
      author: "",
      product: "",
      rating: 0,
      comment: "",
      tags: ""
    });
  };

  // Apply filters and sorting
  useEffect(() => {
    let result = [...reviews];
    
    // Apply search term filter
    if (searchTerm) {
      result = result.filter(review => 
        review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply rating filter
    if (ratingFilter > 0) {
      result = result.filter(review => review.rating >= ratingFilter);
    }
    
    // Apply tag filter
    if (tagFilter) {
      result = result.filter(review => 
        review.tags.some(tag => tag.includes(tagFilter.toLowerCase()))
      );
    }
    
    // Apply sorting
    if (sortOption === "newest") {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOption === "oldest") {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOption === "highest") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "lowest") {
      result.sort((a, b) => a.rating - b.rating);
    }
    
    setFilteredReviews(result);
  }, [reviews, searchTerm, ratingFilter, tagFilter, sortOption]);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">Product Review Platform</h1>
      
      {/* Filters Section */}
      <div className="bg-white p-5 rounded-lg mb-6 shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Search & Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">Search</label>
            <input
              type="text"
              placeholder="Search reviews..."
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">Min Rating</label>
            <select 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(Number(e.target.value))}
            >
              <option value="0">All Ratings</option>
              <option value="1">1+ Stars</option>
              <option value="2">2+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="4">4+ Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">Tag</label>
            <input
              type="text"
              placeholder="Filter by tag..."
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600">Sort By</label>
            <select 
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Review List Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Reviews ({filteredReviews.length})</h2>
        {filteredReviews.length === 0 ? (
          <p className="text-gray-500 italic p-4 bg-gray-50 rounded-lg border border-gray-200">No reviews match your search criteria.</p>
        ) : (
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{review.product}</h3>
                    <p className="text-sm text-gray-600">By {review.author} on {review.date}</p>
                  </div>
                  <div className="bg-blue-100 px-3 py-1 rounded-full font-bold text-blue-800">
                    {review.rating} ★
                  </div>
                </div>
                <p className="my-3 text-gray-700">{review.comment}</p>
                <div className="flex flex-wrap gap-2">
                  {review.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full text-xs text-gray-700 transition-colors duration-200">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Add Review Form */}
      <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">Your Name</label>
              <input
                type="text"
                name="author"
                placeholder="Enter your name"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                value={newReview.author}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">Product Name</label>
              <input
                type="text"
                name="product"
                placeholder="Enter product name"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                value={newReview.product}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-600">Rating</label>
            <select
              name="rating"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              value={newReview.rating}
              onChange={handleInputChange}
              required
            >
              <option value="0" disabled>Select Rating</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-600">Review Comment</label>
            <textarea
              name="comment"
              placeholder="Write your review here..."
              rows="4"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              value={newReview.comment}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-600">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              placeholder="e.g. electronics, budget, kitchen"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              value={newReview.tags}
              onChange={handleInputChange}
            />
          </div>
          
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200 transform hover:-translate-y-0.5"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;