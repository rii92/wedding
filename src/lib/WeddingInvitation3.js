import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { FaHeart, FaEnvelope, FaCalendarAlt, FaMapMarkerAlt, FaStar } from "react-icons/fa";

const WeddingInvitation3 = () => {
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  
  // State for wishes list
  const [wishes, setWishes] = useState([]);
  
  // State for loading and submission status
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  // Base URL API
  const API_URL =
    "https://script.google.com/macros/s/AKfycbyv-EaT5dfuu5og4gy0vxBMpYah0-RFqdWu9kEzq3jZjs4xLU7lh-WTVNx8s23l_2kY/exec";

  // Get invitation code from URL parameter
  const invitationCode = searchParams.get("code") || "GUEST00";

  // Audio reference
  const audioRef = useRef(new Audio("/wedding/music/background-music.mp3"));

  // Get guest name from URL
  const to = searchParams.get("to") || "Tamu Undangan";

  // RSVP form state
  const [rsvpForm, setRsvpForm] = useState({
    namaundangan: to,
    presence: "hadir",
    jumlah: 1,
    kodeUndangan: invitationCode,
  });

  // Wishes form state
  const [wishForm, setWishForm] = useState({
    namaundangan: to,
    nama: "",
    wishes: "",
    kodeUndangan: invitationCode,
  });

  // Handle opening the invitation
  const handleOpen = () => {
    setIsOpen(true);
    setIsPlaying(true);
    document.body.style.overflow = "auto";
  };

  // Handle audio play/pause
  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle RSVP form changes
  const handleRsvpChange = (e) => {
    const { name, value } = e.target;
    setRsvpForm({
      ...rsvpForm,
      [name]: value,
    });
  };

  // Handle wishes form changes
  const handleWishChange = (e) => {
    const { name, value } = e.target;
    setWishForm({
      ...wishForm,
      [name]: value,
    });
  };

  // Countdown timer effect
  useEffect(() => {
    const weddingDate = new Date("2024-12-31T10:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  // Audio effect
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      audioRef.current.loop = true;
    }

    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, [isPlaying]);

  // Visibility effect
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Generate random stars for background
  const generateStars = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 3 + 1;
      stars.push(
        <div
          key={i}
          className="absolute bg-white rounded-full animate-twinkle"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.8 + 0.2,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        />
      );
    }
    return stars;
  };

  // Fetch wishes from API
  const fetchWishes = async () => {
    try {
      const response = await fetch(`${API_URL}?action=get-wishes`);
      const data = await response.json();
      if (data.result) {
        setWishes(data.result);
      }
    } catch (error) {
      console.error("Error fetching wishes:", error);
    }
  };

  // Fetch wishes on component mount
  useEffect(() => {
    fetchWishes();
  }, []);

  // Handle RSVP form submission
  const handleRSVPSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        action: "save-record-presence",
        ...rsvpForm,
      });

      const response = await fetch(`${API_URL}?${params}`);
      const data = await response.json();

      if (data.result === "Insertion successful") {
        setSubmitStatus("RSVP berhasil dikirim!");
        setRsvpForm({ 
          ...rsvpForm,
          presence: "hadir", 
          jumlah: 1 
        });
      }
    } catch (error) {
      setSubmitStatus("Gagal mengirim RSVP. Silakan coba lagi.");
    }
    setIsLoading(false);
  };

  // Handle wishes form submission
  const handleWishSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        action: "save-record-wishes",
        ...wishForm,
      });

      const response = await fetch(`${API_URL}?${params}`);
      const data = await response.json();

      if (data.result === "Insertion successful") {
        setSubmitStatus("Ucapan berhasil dikirim!");
        setWishForm({ 
          ...wishForm,
          nama: "", 
          wishes: "" 
        });
        fetchWishes(); // Refresh wishes list
      }
    } catch (error) {
      setSubmitStatus("Gagal mengirim ucapan. Silakan coba lagi.");
    }
    setIsLoading(false);
  };

  return (
    <div className="relative">
      {/* Cover Page */}
      {!isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-celestial-dark">
          <div className="relative w-full h-full overflow-hidden">
            {/* Stars background */}
            {generateStars(200)}
            
            {/* Moon */}
            <div className="absolute w-32 h-32 rounded-full shadow-lg bg-celestial-silver top-1/4 right-1/4 shadow-celestial-silver/30">
              <div className="absolute rounded-full inset-2 bg-celestial-dark"></div>
            </div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <div className="mb-8 transition-all duration-1000 transform scale-100 opacity-100">
                <h2 className="mb-2 font-serif text-xl text-celestial-silver">The Wedding of</h2>
                <h1 className="mb-6 font-serif text-5xl font-bold text-white">
                  Daniel & Regina
                </h1>
                <p className="text-lg text-celestial-silver">31.12.2024</p>
              </div>
              
              <div className="mt-4 mb-8">
                <p className="mb-2 text-celestial-silver">Kepada Yth:</p>
                <h3 className="px-8 py-2 text-xl font-medium text-white border-b-2 border-celestial-silver/30">
                  {to}
                </h3>
              </div>
              
              <button
                onClick={handleOpen}
                className="px-8 py-3 mt-6 text-lg font-medium transition-colors duration-300 rounded-full text-celestial-dark bg-celestial-silver hover:bg-white animate-pulse"
              >
                Buka Undangan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`transition-opacity duration-1000 ${isOpen ? "opacity-100" : "opacity-0"}`}>
        {/* Audio Control */}
        <button
          onClick={toggleAudio}
          className="fixed z-50 p-3 text-white rounded-full shadow-lg bottom-4 right-4 bg-celestial-blue"
        >
          {isPlaying ? "🔊" : "🔇"}
        </button>

        {/* Hero Section */}
        <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-celestial-dark to-celestial-navy">
          <div className="absolute inset-0">
            {generateStars(150)}
          </div>
          
          <div className="absolute w-40 h-40 rounded-full top-1/4 left-1/4 bg-celestial-silver/20 blur-xl"></div>
          <div className="absolute rounded-full bottom-1/4 right-1/4 w-60 h-60 bg-celestial-blue/10 blur-3xl"></div>
          
          <div className="relative z-10 max-w-xl px-4 mx-auto text-center text-white transition-all duration-1000 transform translate-y-0 opacity-100">
            <FaStar className="w-8 h-8 mx-auto mb-6 text-celestial-gold animate-pulse" />
            <h2 className="mb-4 font-serif text-2xl">We Are Getting Married</h2>
            <h1 className="mb-6 font-serif text-6xl font-bold">
              Daniel & Regina
            </h1>
            <p className="text-xl">31 December 2024</p>
            
            <div className="flex justify-center mt-12">
              <div className="p-4 text-center border rounded-lg shadow-lg bg-celestial-navy/50 backdrop-blur-sm border-celestial-silver/20">
                <h3 className="mb-2 text-lg font-medium text-celestial-silver">Kode Undangan</h3>
                <p className="text-2xl font-bold tracking-wider text-celestial-gold">{invitationCode}</p>
                <p className="mt-2 text-sm text-celestial-silver/60">Simpan kode ini untuk keperluan RSVP</p>
              </div>
            </div>
          </div>
        </section>

        {/* Couple Section */}
        <section className="py-20 bg-celestial-navy">
          <div className="container max-w-4xl px-4 mx-auto">
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-serif text-4xl text-white">The Bride & Groom</h2>
              <div className="w-24 h-1 mx-auto bg-celestial-silver/30"></div>
            </div>
            
            <div className="grid gap-12 md:grid-cols-2">
              {/* Bride */}
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden border-4 rounded-full border-celestial-silver/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-celestial-blue to-celestial-navy"></div>
                  <div className="absolute inset-0 flex items-center justify-center font-serif text-5xl text-white">R</div>
                </div>
                <h3 className="mb-2 font-serif text-2xl text-white">Regina Doe</h3>
                <p className="mb-4 text-celestial-silver">Putri dari Bpk. John Doe & Ibu Jane Doe</p>
                <div className="flex justify-center space-x-4">
                  <a href="#" className="text-celestial-silver hover:text-celestial-gold">
                    <span className="sr-only">Instagram</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Groom */}
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden border-4 rounded-full border-celestial-silver/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-celestial-blue to-celestial-navy"></div>
                  <div className="absolute inset-0 flex items-center justify-center font-serif text-5xl text-white">D</div>
                </div>
                <h3 className="mb-2 font-serif text-2xl text-white">Daniel Smith</h3>
                <p className="mb-4 text-celestial-silver">Putra dari Bpk. Robert Smith & Ibu Sarah Smith</p>
                <div className="flex justify-center space-x-4">
                  <a href="#" className="text-celestial-silver hover:text-celestial-gold">
                    <span className="sr-only">Instagram</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Countdown Section */}
        <section className="py-16 bg-celestial-dark">
          <div className="container max-w-4xl px-4 mx-auto">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-3xl text-white">Countdown to Our Special Day</h2>
              <div className="w-24 h-1 mx-auto bg-celestial-silver/30"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="p-4 text-center border rounded-lg bg-celestial-navy/50 backdrop-blur-sm border-celestial-silver/10">
                <div className="text-4xl font-bold text-celestial-gold">{countdown.days}</div>
                <div className="text-celestial-silver">Days</div>
              </div>
              <div className="p-4 text-center border rounded-lg bg-celestial-navy/50 backdrop-blur-sm border-celestial-silver/10">
                <div className="text-4xl font-bold text-celestial-gold">{countdown.hours}</div>
                <div className="text-celestial-silver">Hours</div>
              </div>
              <div className="p-4 text-center border rounded-lg bg-celestial-navy/50 backdrop-blur-sm border-celestial-silver/10">
                <div className="text-4xl font-bold text-celestial-gold">{countdown.minutes}</div>
                <div className="text-celestial-silver">Minutes</div>
              </div>
              <div className="p-4 text-center border rounded-lg bg-celestial-navy/50 backdrop-blur-sm border-celestial-silver/10">
                <div className="text-4xl font-bold text-celestial-gold">{countdown.seconds}</div>
                <div className="text-celestial-silver">Seconds</div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Details Section */}
        <section className="py-16 bg-celestial-navy">
          <div className="container max-w-4xl px-4 mx-auto">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-3xl text-white">Wedding Events</h2>
              <div className="w-24 h-1 mx-auto bg-celestial-silver/30"></div>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              <div className="p-6 transition-transform transform border rounded-lg bg-celestial-dark/50 backdrop-blur-sm border-celestial-silver/10 hover:-translate-y-1">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-celestial-blue/20">
                  <FaHeart className="w-8 h-8 text-celestial-silver" />
                </div>
                <h3 className="mb-4 font-serif text-2xl text-center text-white">Akad Nikah</h3>
                <div className="space-y-2 text-center">
                  <p className="text-celestial-silver"><FaCalendarAlt className="inline mr-2" /> Saturday, 31 December 2024</p>
                  <p className="text-celestial-silver">08:00 - 10:00 WIB</p>
                  <p className="text-celestial-silver"><FaMapMarkerAlt className="inline mr-2" /> Masjid Al-Hidayah</p>
                  <p className="mb-4 text-celestial-silver">Jakarta Selatan</p>
                  <a 
                    href="https://maps.app.goo.gl/DJg9WWhKDBUxfu3T6" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2 text-sm font-medium transition-colors rounded-full text-celestial-dark bg-celestial-silver hover:bg-white"
                  >
                    View Location
                  </a>
                </div>
              </div>
              
              <div className="p-6 transition-transform transform border rounded-lg bg-celestial-dark/50 backdrop-blur-sm border-celestial-silver/10 hover:-translate-y-1">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-celestial-blue/20">
                  <FaStar className="w-8 h-8 text-celestial-silver" />
                </div>
                <h3 className="mb-4 font-serif text-2xl text-center text-white">Wedding Reception</h3>
                <div className="space-y-2 text-center">
                  <p className="text-celestial-silver"><FaCalendarAlt className="inline mr-2" /> Saturday, 31 December 2024</p>
                  <p className="text-celestial-silver">11:00 - 14:00 WIB</p>
                  <p className="text-celestial-silver"><FaMapMarkerAlt className="inline mr-2" /> Hotel Grand Hyatt</p>
                  <p className="mb-4 text-celestial-silver">Jakarta Pusat</p>
                  <a 
                    href="https://maps.app.goo.gl/DJg9WWhKDBUxfu3T6" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2 text-sm font-medium transition-colors rounded-full text-celestial-dark bg-celestial-silver hover:bg-white"
                  >
                    View Location
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RSVP Section */}
        <section className="py-16 bg-celestial-dark">
          <div className="container max-w-4xl px-4 mx-auto">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-3xl text-white">RSVP</h2>
              <div className="w-24 h-1 mx-auto bg-celestial-silver/30"></div>
              <p className="mt-4 text-celestial-silver">Please confirm your attendance by filling out the form below</p>
            </div>
            
            <div className="p-6 border rounded-lg bg-celestial-navy/50 backdrop-blur-sm border-celestial-silver/10">
              <form className="space-y-6" onSubmit={handleRSVPSubmit}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-celestial-silver">Will you attend?</label>
                  <select
                    name="presence"
                    value={rsvpForm.presence}
                    onChange={handleRsvpChange}
                    className="w-full px-4 py-2 text-white border rounded-md bg-celestial-dark border-celestial-silver/20 focus:outline-none focus:ring-2 focus:ring-celestial-blue"
                  >
                    <option value="hadir">Yes, I will attend</option>
                    <option value="tidak hadir">Sorry, I can't attend</option>
                  </select>
                </div>
                
                {rsvpForm.presence === "hadir" && (
                  <div>
                    <label className="block mb-2 text-sm font-medium text-celestial-silver">Number of Guests</label>
                    <input
                      type="number"
                      name="jumlah"
                      min="1"
                      value={rsvpForm.jumlah}
                      onChange={handleRsvpChange}
                      className="w-full px-4 py-2 text-white border rounded-md bg-celestial-dark border-celestial-silver/20 focus:outline-none focus:ring-2 focus:ring-celestial-blue"
                    />
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-3 text-sm font-medium transition-colors rounded-md text-celestial-dark bg-celestial-silver hover:bg-white disabled:bg-celestial-silver/50"
                >
                  {isLoading ? "Submitting..." : "Submit RSVP"}
                </button>
                {submitStatus && (
                  <p className="text-center text-celestial-gold">{submitStatus}</p>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Wishes Section */}
        <section className="py-16 bg-celestial-navy">
          <div className="container max-w-4xl px-4 mx-auto">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-3xl text-white">Wishes & Prayers</h2>
              <div className="w-24 h-1 mx-auto bg-celestial-silver/30"></div>
              <p className="mt-4 text-celestial-silver">Leave your wishes for our journey together</p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              {/* Wishes Form */}
              <div className="p-6 border rounded-lg bg-celestial-dark/50 backdrop-blur-sm border-celestial-silver/10">
                <form className="space-y-6" onSubmit={handleWishSubmit}>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-celestial-silver">Your Name</label>
                    <input
                      type="text"
                      name="nama"
                      value={wishForm.nama}
                      onChange={handleWishChange}
                      className="w-full px-4 py-2 text-white border rounded-md bg-celestial-dark border-celestial-silver/20 focus:outline-none focus:ring-2 focus:ring-celestial-blue"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium text-celestial-silver">Your Wishes</label>
                    <textarea
                      name="wishes"
                      value={wishForm.wishes}
                      onChange={handleWishChange}
                      rows="4"
                      className="w-full px-4 py-2 text-white border rounded-md bg-celestial-dark border-celestial-silver/20 focus:outline-none focus:ring-2 focus:ring-celestial-blue"
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-6 py-3 text-sm font-medium transition-colors rounded-md text-celestial-dark bg-celestial-silver hover:bg-white disabled:bg-celestial-silver/50"
                  >
                    {isLoading ? "Sending..." : "Send Wishes"}
                  </button>
                  {submitStatus && (
                    <p className="text-center text-celestial-gold">{submitStatus}</p>
                  )}
                </form>
              </div>
              
              {/* Wishes Display */}
              <div className="p-6 border rounded-lg bg-celestial-dark/50 backdrop-blur-sm border-celestial-silver/10">
                <div className="pr-2 space-y-4 overflow-y-auto max-h-80">
                  {wishes.length > 0 ? (
                    wishes.map((wish, index) => (
                      <div key={index} className="p-4 rounded-lg bg-celestial-navy/50">
                        <h4 className="font-medium text-celestial-gold">{wish.nama}</h4>
                        <p className="text-celestial-silver">{wish.wishes}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center rounded-lg bg-celestial-navy/50">
                      <p className="text-celestial-silver">No wishes yet. Be the first to send your wishes!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gift Section */}
        <section className="py-16 bg-celestial-dark">
          <div className="container max-w-4xl px-4 mx-auto">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-3xl text-white">Wedding Gift</h2>
              <div className="w-24 h-1 mx-auto bg-celestial-silver/30"></div>
              <p className="mt-4 text-celestial-silver">Your presence is our present, but if you wish to give a gift, you may send it through:</p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              <div className="p-6 text-center border rounded-lg bg-celestial-navy/50 backdrop-blur-sm border-celestial-silver/10">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-celestial-blue/20">
                  <FaEnvelope className="w-8 h-8 text-celestial-silver" />
                </div>
                <h3 className="mb-4 font-serif text-xl text-white">Bank Transfer</h3>
                <div className="p-4 mb-4 rounded-lg bg-celestial-dark/50">
                  <p className="mb-2 text-celestial-silver">Bank BCA</p>
                  <p className="text-xl font-medium text-celestial-gold">1234567890</p>
                  <p className="text-celestial-silver">a.n. Daniel Smith</p>
                </div>
                <button className="px-6 py-2 text-sm font-medium transition-colors rounded-full text-celestial-dark bg-celestial-silver hover:bg-white">
                  Copy Account Number
                </button>
              </div>
              
              <div className="p-6 text-center border rounded-lg bg-celestial-navy/50 backdrop-blur-sm border-celestial-silver/10">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-celestial-blue/20">
                  <FaEnvelope className="w-8 h-8 text-celestial-silver" />
                </div>
                <h3 className="mb-4 font-serif text-xl text-white">Digital Wallet</h3>
                <div className="p-4 mb-4 rounded-lg bg-celestial-dark/50">
                  <p className="mb-2 text-celestial-silver">GoPay</p>
                  <p className="text-xl font-medium text-celestial-gold">081234567890</p>
                  <p className="text-celestial-silver">a.n. Regina Doe</p>
                </div>
                <button className="px-6 py-2 text-sm font-medium transition-colors rounded-full text-celestial-dark bg-celestial-silver hover:bg-white">
                  Copy Phone Number
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-center bg-celestial-dark">
          <div className="container px-4 mx-auto">
            <div className="mb-8">
              <h2 className="mb-4 font-serif text-3xl text-white">Daniel & Regina</h2>
              <p className="text-celestial-silver">Thank you for celebrating our special day with us</p>
            </div>
            
            <div className="w-24 h-1 mx-auto mb-8 bg-celestial-silver/30"></div>
            
            <p className="text-sm text-celestial-silver/60">
              © 2024 Daniel & Regina Wedding. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default WeddingInvitation3;
















