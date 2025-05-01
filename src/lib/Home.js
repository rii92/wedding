import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-emerald-50 to-emerald-100">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-8 font-serif text-4xl text-center text-emerald-800">Wedding Invitation Templates</h1>
        <p className="mb-10 text-center text-gray-600">
          Pilih template undangan pernikahan yang sesuai dengan selera Anda
        </p>
        
        <div className="grid gap-8 md:grid-cols-2">
          {/* Template 1 - Emerald Theme */}
          <div className="overflow-hidden transition-shadow border rounded-lg shadow-md hover:shadow-xl">
            <div className="relative flex items-center justify-center h-64 overflow-hidden bg-emerald-100">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900 opacity-80"></div>
              <div className="relative z-10 p-6 text-center text-white">
                <h2 className="mb-2 font-serif text-2xl">Emerald Theme</h2>
                <p className="mb-4 text-white/80">Elegant green-themed invitation</p>
                <div className="w-20 h-1 mx-auto bg-white/50"></div>
                <p className="mt-4 font-serif text-xl">Daniel & Regina</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-2 text-xl font-medium text-emerald-800">Emerald Theme</h3>
              <p className="mb-4 text-gray-600">
                Template dengan nuansa hijau yang elegan dan modern
              </p>
              <Link 
                to="/theme1?to=Tamu%20Undangan&code=DEMO01" 
                className="block w-full px-4 py-2 font-medium text-center text-white transition-colors rounded-md bg-emerald-600 hover:bg-emerald-700"
              >
                Lihat Template
              </Link>
            </div>
          </div>
          
          {/* Template 2 - Rustic Theme */}
          <div className="overflow-hidden transition-shadow border rounded-lg shadow-md hover:shadow-xl">
            <div className="relative flex items-center justify-center h-64 overflow-hidden bg-rustic-cream">
              <div className="absolute inset-0 bg-gradient-to-br from-rustic-brown-dark to-rustic-brown opacity-80"></div>
              <div className="relative z-10 p-6 text-center text-rustic-cream">
                <h2 className="mb-2 font-serif text-2xl">Rustic Theme</h2>
                <p className="mb-4 text-rustic-cream/80">Warm earth-toned invitation</p>
                <div className="w-20 h-1 mx-auto bg-rustic-gold/70"></div>
                <p className="mt-4 font-serif text-xl">Daniel & Regina</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-2 text-xl font-medium text-rustic-brown">Rustic Theme</h3>
              <p className="mb-4 text-gray-600">
                Template dengan nuansa coklat yang hangat dan klasik
              </p>
              <Link 
                to="/theme2?to=Tamu%20Undangan&code=DEMO02" 
                className="block w-full px-4 py-2 font-medium text-center text-white transition-colors rounded-md bg-rustic-brown hover:bg-rustic-brown-dark"
              >
                Lihat Template
              </Link>
            </div>
          </div>
          
          {/* Template 3 - Celestial Theme */}
          <div className="overflow-hidden transition-shadow border rounded-lg shadow-md hover:shadow-xl">
            <div className="relative flex items-center justify-center h-64 overflow-hidden bg-celestial-dark">
              <div className="absolute inset-0 bg-gradient-to-br from-celestial-dark to-celestial-navy opacity-80"></div>
              <div className="relative z-10 p-6 text-center text-white">
                <h2 className="mb-2 font-serif text-2xl">Celestial Theme</h2>
                <p className="mb-4 text-white/80">Elegant night sky-themed invitation</p>
                <div className="w-20 h-1 mx-auto bg-celestial-silver/50"></div>
                <p className="mt-4 font-serif text-xl">Daniel & Regina</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-2 text-xl font-medium text-celestial-navy">Celestial Theme</h3>
              <p className="mb-4 text-gray-600">
                Template dengan nuansa langit malam yang elegan dan misterius
              </p>
              <Link 
                to="/theme3?to=Tamu%20Undangan&code=DEMO03" 
                className="block w-full px-4 py-2 font-medium text-center text-white transition-colors rounded-md bg-celestial-navy hover:bg-celestial-dark"
              >
                Lihat Template
              </Link>
            </div>
          </div>

          {/* Template 4 - Tropical Theme */}
          <div className="overflow-hidden transition-shadow border rounded-lg shadow-md hover:shadow-xl">
            <div className="relative flex items-center justify-center h-64 overflow-hidden bg-tropical-sand">
              <div className="absolute inset-0 bg-gradient-to-br from-tropical-teal-light to-tropical-teal opacity-80"></div>
              <div className="relative z-10 p-6 text-center text-tropical-teal">
                <h2 className="mb-2 font-serif text-2xl">Tropical Theme</h2>
                <p className="mb-4 text-tropical-teal/80">Warm tropical-themed invitation</p>
                <div className="w-20 h-1 mx-auto bg-tropical-coral/70"></div>
                <p className="mt-4 font-serif text-xl">Daniel & Regina</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="mb-2 text-xl font-medium text-tropical-teal">Tropical Theme</h3>
              <p className="mb-4 text-gray-600">
                Template dengan nuansa tropis yang hangat dan menyenangkan
              </p>
              <Link 
                to="/theme4?to=Tamu%20Undangan&code=DEMO04" 
                className="block w-full px-4 py-2 font-medium text-center text-white transition-colors rounded-md bg-tropical-coral hover:bg-tropical-coral-light"
              >
                Lihat Template
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;


