import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-white to-[#FFF9DB] min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-black text-white py-4 px-8 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">SurplusShare</div>
          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-gray-300 transition">Home</Link>
            <Link to="/about" className="hover:text-gray-300 transition">About Us</Link>
            <Link to="/contact" className="hover:text-gray-300 transition">Contact</Link>
            <Link to="/home" className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition">
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center text-center bg-cover bg-center h-[80vh] px-6 relative"
        style={{ backgroundImage: "url('/imgs/homeImage.jpg')" }}
      >
        <div className="backdrop-blur-md bg-white/30 p-10 rounded-lg shadow-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">Saving Food, Nourishing Lives</h1>
          <p className="text-lg md:text-xl mb-8 text-black">Join us to reduce food waste and fight hunger — one surplus at a time.</p>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/admin/login')} 
              className="bg-[#0D1B2A] hover:bg-[#1a2e4a] text-white px-6 py-3 rounded-md transition"
            >
              Admin Login
            </button>
            <button 
              onClick={() => navigate('/home')} 
              className="bg-[#0D1B2A] hover:bg-[#1a2e4a] text-white px-6 py-3 rounded-md transition"
            >
              Register as User
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6 flex justify-center">
        <div className="backdrop-blur-lg bg-white/30 p-10 rounded-xl max-w-4xl text-center shadow-md">
          <h2 className="text-3xl font-semibold mb-6 text-black">What is SurplusShare?</h2>
          <p className="text-lg text-black">
            SurplusShare connects individuals, restaurants, supermarkets, and farms who have surplus food with people and communities who need it. 
            We bridge the gap — promoting sustainability, community sharing, and helping the environment.
          </p>
        </div>
      </section>

      {/* Who Can Join Section */}
      <section id="who-can-join" className="py-16 px-6 text-center bg-[#0D1B2A] text-white">
        <h2 className="text-3xl font-semibold mb-10">Who Can Join?</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          {/* User Card */}
          <div className="relative w-full md:w-1/3 p-8 rounded-lg bg-white/10 backdrop-blur-md shadow-lg transform hover:scale-105 transition border-2 border-white">
            <h3 className="text-2xl font-semibold mb-4">Providers(Food Donors)</h3>
            <p>List surplus food, track pickups, support communities, and earn Green Points for donations!</p>
           
            {/* Mirror reflection */}
            <div className="absolute bottom-[-50%] left-0 w-full h-full opacity-10 transform scale-y-[-1] bg-white/10 blur-md"></div>
          </div>

          {/* Non-User Card */}
          <div className="relative w-full md:w-1/3 p-8 rounded-lg bg-white/10 backdrop-blur-md shadow-lg transform hover:scale-105 transition border-2 border-white">
            <h3 className="text-2xl font-semibold mb-4">Distributors</h3>
            <p>Browse available surplus food nearby, request or reserve food, and get notifications of new listings.</p>
            {/* Mirror reflection */}
            <div className="absolute bottom-[-50%] left-0 w-full h-full opacity-10 transform scale-y-[-1] bg-white/10 blur-md"></div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-6 flex justify-center bg-[#0D1B2A] text-white">
        <div className="backdrop-blur-lg bg-white/10 p-10 rounded-xl max-w-4xl text-center shadow-md">
          <h2 className="text-3xl font-semibold mb-6">How It Works</h2>
          <ul className="space-y-6 text-lg">
            <li>1. Register as User </li>
            <li>2. List Surplus Food or Browse Food</li>
            <li>3. Connect & Arrange Pickup</li>
            <li>4. Share the Impact</li>
          </ul>
        </div>
      </section>

      {/* Registration Call-to-Action */}
      <section id="register" className="py-16 text-center px-6">
        <h2 className="text-3xl font-semibold mb-6 text-black">Ready to Make a Difference?</h2>
        <div className="flex gap-4 justify-center">
          <a href="distributor/register" className="bg-[#0D1B2A] hover:bg-[#1a2e4a] text-white px-6 py-3 rounded-md transition">Join as Food Seeker</a>
          <a href="provider/register" className="bg-[#0D1B2A] hover:bg-[#1a2e4a] text-white px-6 py-3 rounded-md transition">Become a Food Donor</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D1B2A] text-white py-6 text-center mt-auto">
        
        <p>© 2025 SurplusShare. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;