import React, { useState, useEffect } from 'react';
import { Heart, Calendar, MapPin, Gift, Volume2, VolumeX } from 'lucide-react';

const WeddingInvitation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Menghitung countdown
  useEffect(() => {
    const weddingDate = new Date('2024-12-31T10:00:00');
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = weddingDate - now;

      setCountdown({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isOpen) {
    return (
      <div className="h-screen flex items-center justify-center bg-[url('/api/placeholder/800/600')] bg-cover bg-center">
        <div className="text-center p-8 bg-white/90 rounded-lg shadow-xl">
          <h2 className="text-2xl mb-4 font-serif">The Wedding of</h2>
          <h1 className="text-4xl font-bold mb-6 font-serif">Daniel & Regina</h1>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-rose-500 text-white px-8 py-3 rounded-full hover:bg-rose-600 transition-all"
          >
            Buka Undangan
          </button>
          <p className="mt-4 text-gray-600">Kepada Yth: Rio Febri</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Music Toggle */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="fixed top-4 right-4 z-50 bg-white p-3 rounded-full shadow-lg"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center bg-[url('/api/placeholder/800/600')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="text-center text-white relative z-10">
          <h2 className="text-2xl mb-4 font-serif">We Are Getting Married</h2>
          <h1 className="text-6xl font-bold mb-6 font-serif">Daniel & Regina</h1>
          <p className="text-xl">31 December 2024</p>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-rose-500">{countdown.days}</div>
              <div className="text-gray-600">Hari</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-rose-500">{countdown.hours}</div>
              <div className="text-gray-600">Jam</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-rose-500">{countdown.minutes}</div>
              <div className="text-gray-600">Menit</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-rose-500">{countdown.seconds}</div>
              <div className="text-gray-600">Detik</div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center p-8 bg-white rounded-lg shadow-lg">
              <h3 className="text-2xl font-serif mb-4">Akad Nikah</h3>
              <Calendar className="w-12 h-12 mx-auto mb-4 text-rose-500" />
              <p className="mb-2">Sabtu, 31 December 2024</p>
              <p className="mb-2">08:00 WIB</p>
              <p className="text-gray-600">Masjid Al-Hidayah</p>
              <p className="text-gray-600">Jakarta Selatan</p>
            </div>
            <div className="text-center p-8 bg-white rounded-lg shadow-lg">
              <h3 className="text-2xl font-serif mb-4">Resepsi</h3>
              <MapPin className="w-12 h-12 mx-auto mb-4 text-rose-500" />
              <p className="mb-2">Sabtu, 31 December 2024</p>
              <p className="mb-2">11:00 - 13:00 WIB</p>
              <p className="text-gray-600">Hotel Grand Hyatt</p>
              <p className="text-gray-600">Jakarta Pusat</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gift Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-3xl font-serif mb-8">Wedding Gift</h2>
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
            <Gift className="w-12 h-12 mx-auto mb-4 text-rose-500" />
            <p className="mb-4">Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.</p>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded">
                <p className="font-semibold">Bank BCA</p>
                <p>1234567890</p>
                <p>a.n. Daniel Pratama</p>
              </div>
              <div className="p-4 bg-white rounded">
                <p className="font-semibold">Bank Mandiri</p>
                <p>0987654321</p>
                <p>a.n. Regina Putri</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white text-center">
        <div className="container mx-auto px-4">
          <Heart className="w-8 h-8 mx-auto mb-4 text-rose-500" />
          <p className="mb-2">Thank you for being part of our special day</p>
          <p className="text-gray-400">Daniel & Regina</p>
        </div>
      </footer>
    </div>
  );
};

export default WeddingInvitation;