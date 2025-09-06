import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FaHeart,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaStar,
  FaMusic,
  FaVolumeMute,
  FaPalm,
  FaUmbrellaBeach,
  FaGlassCheers,
  FaGift,
  FaGlobeAmericas,
} from "react-icons/fa";

const translations = {
  en: {
    // Existing translations...
    openInvitation: "Open Invitation",
    weddingInvitation: "Wedding Invitation",
    dear: "Dear",
    youAreInvited: "You are cordially invited to our wedding",
    weAreGettingMarried: "We Are Getting Married",
    theHappyCouple: "The Happy Couple",
    daughterOf: "Daughter of",
    sonOf: "Son of",
    saveTheDate: "Save The Date",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    ourStory: "Our Story",
    weddingDetails: "Wedding Details",
    ceremony: "Ceremony",
    reception: "Reception",
    date: "Date",
    time: "Time",
    venue: "Venue",
    address: "Address",
    rsvp: "RSVP",
    yourName: "Your Name",
    attendance: "Attendance",
    willAttend: "Will Attend",
    unableToAttend: "Unable to Attend",
    numberOfGuests: "Number of Guests",
    submit: "Submit",
    sendWishes: "Send Wishes",
    yourMessage: "Your Message",
    invitationCode: "Invitation Code",
    submitting: "Submitting...",
    wishesFor: "Wishes for Mempelai Pria & Mempelai Wanita",
    noWishesYet: "No wishes yet. Be the first to send your wishes!",
    weddingGifts: "Wedding Gifts",
    giftMessage:
      "Your presence is our present. However, if you wish to give a gift, we've provided some options below.",
    digitalGift: "Digital Gift",
    digitalGiftMessage:
      "If you wish to send a gift digitally, you can transfer to the following account:",
    physicalGift: "Physical Gift",
    physicalGiftMessage:
      "If you prefer to send a physical gift, you can send it to the following address:",
    copyAccountNumber: "Copy Account Number",
    copyAddress: "Copy Address",
    thankYou: "Thank you for being part of our special day",
    rsvpSuccess: "RSVP successfully sent!",
    rsvpFailed: "Failed to send RSVP. Please try again.",
    wishSuccess: "Wish successfully sent!",
    wishFailed: "Failed to send wish. Please try again.",
    error: "An error occurred. Please try again.",
    // New translations
    weddingEvents: "Wedding Events",
    viewLocation: "View Location",
    countingDown: "Counting Down To The Big Day",
    ourGallery: "Our Gallery",
    rsvpInstruction:
      "Please confirm your attendance by filling out the form below",
    sendYourWishes: "Send Your Wishes",
    namePlaceholder: "Enter your name",
    wishesPlaceholder: "Write your wishes here",
    codePlaceholder: "Enter your invitation code",
    instagram: "Instagram",
    bankAccount: "Bank Central Asia (BCA)",
    accountHolder: "a/n Mempelai Pria Smith",
    addressDetails:
      "Mempelai Pria & Mempelai Wanita\nJl. Pantai Indah No. 123\nKuta, Bali\nIndonesia 80361",
    quote1:
      "And over all these virtues put on love, which binds them all together in perfect unity.",
    quote1Source: "— Colossians 3:14",
    quote2: "Two souls with but a single thought, two hearts that beat as one.",
    quote2Source: "— John Keats",
  },
  id: {
    // Existing translations...
    openInvitation: "Buka Undangan",
    weddingInvitation: "Undangan Pernikahan",
    dear: "Kepada",
    youAreInvited: "Anda diundang ke pernikahan kami",
    weAreGettingMarried: "Kami Akan Menikah",
    theHappyCouple: "Mempelai",
    daughterOf: "Putri dari",
    sonOf: "Putra dari",
    saveTheDate: "Simpan Tanggal",
    days: "Hari",
    hours: "Jam",
    minutes: "Menit",
    seconds: "Detik",
    ourStory: "Kisah Kami",
    weddingDetails: "Detail Acara",
    ceremony: "Akad Nikah",
    reception: "Resepsi",
    date: "Tanggal",
    time: "Waktu",
    venue: "Tempat",
    address: "Alamat",
    rsvp: "Konfirmasi Kehadiran",
    yourName: "Nama Anda",
    attendance: "Kehadiran",
    willAttend: "Hadir",
    unableToAttend: "Tidak Hadir",
    numberOfGuests: "Jumlah Tamu",
    submit: "Kirim",
    sendWishes: "Kirim Ucapan",
    yourMessage: "Pesan Anda",
    invitationCode: "Kode Undangan",
    submitting: "Mengirim...",
    wishesFor: "Ucapan untuk Mempelai Pria & Mempelai Wanita",
    noWishesYet: "Belum ada ucapan. Jadilah yang pertama mengirim ucapan!",
    weddingGifts: "Hadiah Pernikahan",
    giftMessage:
      "Kehadiran Anda adalah hadiah terbaik. Namun, jika Anda ingin memberikan hadiah, kami telah menyediakan beberapa opsi di bawah ini.",
    digitalGift: "Hadiah Digital",
    digitalGiftMessage:
      "Jika Anda ingin mengirimkan hadiah secara digital, Anda dapat transfer ke rekening berikut:",
    physicalGift: "Hadiah Fisik",
    physicalGiftMessage:
      "Jika Anda lebih suka mengirimkan hadiah fisik, Anda dapat mengirimkannya ke alamat berikut:",
    copyAccountNumber: "Salin Nomor Rekening",
    copyAddress: "Salin Alamat",
    thankYou: "Terima kasih telah menjadi bagian dari hari spesial kami",
    rsvpSuccess: "RSVP berhasil dikirim!",
    rsvpFailed: "Gagal mengirim RSVP. Silakan coba lagi.",
    wishSuccess: "Ucapan berhasil dikirim!",
    wishFailed: "Gagal mengirim ucapan. Silakan coba lagi.",
    error: "Terjadi kesalahan. Silakan coba lagi.",
    // New translations
    weddingEvents: "Acara Pernikahan",
    viewLocation: "Lihat Lokasi",
    countingDown: "Menghitung Hari Menuju Hari Bahagia",
    ourGallery: "Galeri Kami",
    rsvpInstruction:
      "Mohon konfirmasi kehadiran Anda dengan mengisi formulir di bawah ini",
    sendYourWishes: "Kirim Ucapan Anda",
    namePlaceholder: "Masukkan nama Anda",
    wishesPlaceholder: "Tulis ucapan Anda di sini",
    codePlaceholder: "Masukkan kode undangan Anda",
    instagram: "Instagram",
    bankAccount: "Bank Central Asia (BCA)",
    accountHolder: "a/n Mempelai Pria Smith",
    addressDetails:
      "Mempelai Pria & Mempelai Wanita\nJl. Pantai Indah No. 123\nKuta, Bali\nIndonesia 80361",
    quote1:
      "Dan di atas semua kebajikan ini, kenakanlah kasih, yang menyatukan semuanya dalam kesatuan yang sempurna.",
    quote1Source: "— Kolose 3:14",
    quote2:
      "Dua jiwa dengan satu pikiran, dua hati yang berdetak sebagai satu.",
    quote2Source: "— John Keats",
  },
};

const WeddingInvitation4 = () => {
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Language state
  const [language, setLanguage] = useState("id"); // Default to Indonesian
  const t = translations[language]; // Get translations for current language

  // State for RSVP form
  const [rsvpForm, setRsvpForm] = useState({
    code: searchParams.get("code") || "GUEST00",
    nama: searchParams.get("to") || "Tamu Undangan",
    presence: "hadir",
    jumlah: 1,
  });

  // State for wishes form
  const [wishForm, setWishForm] = useState({
    code: searchParams.get("code") || "GUEST00",
    nama: "",
    wishes: "",
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
  const guestName = searchParams.get("to") || "Tamu Undangan";

  // Handle opening the invitation
  const handleOpen = () => {
    setIsOpen(true);
    document.body.style.overflow = "auto";

    // Delay playing audio slightly to ensure DOM is updated
    setTimeout(() => {
      if (audioRef.current) {
        // Use Promise to handle autoplay policy
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Audio started playing successfully");
              setIsPlaying(true);
            })
            .catch((error) => {
              console.log("Autoplay prevented:", error);
              setIsPlaying(false);
            });
        }
      }
    }, 500);
  };

  // Toggle audio playback
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Use Promise to handle autoplay policy
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.log("Playback prevented:", error);
            });
        }
      }
    }
  };

  // Initialize audio on component mount
  useEffect(() => {
    // Preload audio
    if (audioRef.current) {
      audioRef.current.load();

      // Set volume
      audioRef.current.volume = 0.5;

      // Add event listener for when audio is loaded
      audioRef.current.addEventListener("loadeddata", () => {
        console.log("Audio loaded successfully");
      });

      // Add event listener for audio errors
      audioRef.current.addEventListener("error", (e) => {
        console.error("Audio error:", e);
      });
    }

    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.removeEventListener("loadeddata", () => {});
        audioRef.current.removeEventListener("error", () => {});
      }
    };
  }, []);

  // Handle RSVP form change
  const handleRsvpChange = (e) => {
    const { name, value } = e.target;
    setRsvpForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle wishes form change
  const handleWishChange = (e) => {
    const { name, value } = e.target;
    setWishForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch wishes from API
  const fetchWishes = async () => {
    try {
      const response = await fetch(
        `${API_URL}?action=getWishes&code=${invitationCode}`
      );
      const data = await response.json();

      if (data.result === "success") {
        setWishes(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching wishes:", error);
    }
  };

  // Handle RSVP form submission
  const handleRSVPSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}?action=rsvp`, {
        method: "POST",
        body: JSON.stringify(rsvpForm),
      });

      const data = await response.json();

      if (data.result === "success") {
        setSubmitStatus("RSVP berhasil dikirim!");
        setTimeout(() => setSubmitStatus(""), 3000);
      } else {
        setSubmitStatus("Gagal mengirim RSVP. Silakan coba lagi.");
        setTimeout(() => setSubmitStatus(""), 3000);
      }
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      setSubmitStatus("Terjadi kesalahan. Silakan coba lagi.");
      setTimeout(() => setSubmitStatus(""), 3000);
    }

    setIsLoading(false);
  };

  // Handle wishes form submission
  const handleWishSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const currentTime = new Date().toLocaleString();
    const wishWithTime = { ...wishForm, currentTime };

    try {
      const response = await fetch(`${API_URL}?action=wish`, {
        method: "POST",
        body: JSON.stringify(wishWithTime),
      });

      const data = await response.json();

      if (data.result === "success") {
        setWishes([wishWithTime, ...wishes]);
        setWishForm({ ...wishForm, nama: "", wishes: "" });
        setSubmitStatus("Ucapan berhasil dikirim!");
        setTimeout(() => setSubmitStatus(""), 3000);
      } else {
        setSubmitStatus("Gagal mengirim ucapan. Silakan coba lagi.");
        setTimeout(() => setSubmitStatus(""), 3000);
      }
    } catch (error) {
      console.error("Error submitting wish:", error);
      setSubmitStatus("Terjadi kesalahan. Silakan coba lagi.");
      setTimeout(() => setSubmitStatus(""), 3000);
    }

    setIsLoading(false);
  };

  // Countdown timer
  useEffect(() => {
    const weddingDate = new Date("December 31, 2024 08:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  // Fetch wishes on component mount
  useEffect(() => {
    fetchWishes();
  }, []);

  // Generate animated wave SVG
  const generateWave = (color, delay, duration) => {
    return (
      <div
        className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none"
        style={{ transform: "translateY(1px)" }}
      >
        <svg
          className="relative block w-full h-12 md:h-16"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill={color}
            opacity=".8"
            className="animate-wave"
            style={{
              animationDelay: delay,
              animationDuration: duration,
            }}
          ></path>
        </svg>
      </div>
    );
  };

  // Generate palm tree decorations
  const generatePalms = (count) => {
    const palms = [];
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 30 + 20;
      const left = Math.random() * 100;
      const top = Math.random() * 60;
      const rotation = Math.random() * 30 - 15;

      palms.push(
        <div
          key={i}
          className="absolute text-tropical-leaf opacity-20"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            transform: `rotate(${rotation}deg)`,
            fontSize: `${size}px`,
            zIndex: 0,
          }}
        >
          🌴
        </div>
      );
    }
    return palms;
  };

  // Language switcher component
  const LanguageSwitcher = () => {
    return (
      <div className="fixed z-50 flex p-1 bg-white rounded-full shadow-lg top-4 right-4">
        <button
          onClick={() => setLanguage("id")}
          className={`px-3 py-1 rounded-full ${
            language === "id"
              ? "bg-tropical-coral text-white"
              : "text-tropical-teal-dark"
          }`}
        >
          ID
        </button>
        <button
          onClick={() => setLanguage("en")}
          className={`px-3 py-1 rounded-full ${
            language === "en"
              ? "bg-tropical-coral text-white"
              : "text-tropical-teal-dark"
          }`}
        >
          EN
        </button>
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Audio Player */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/wedding/music/background-music.mp3" type="audio/mpeg" />
        <source
          src="https://cdn.pixabay.com/download/audio/2022/01/20/audio_dc39bbc7aa.mp3?filename=tropical-summer-10825.mp3"
          type="audio/mpeg"
        />
      </audio>

      {/* Language Switcher */}
      <LanguageSwitcher />

      {/* Audio Control Button */}
      {isOpen && (
        <button
          onClick={toggleAudio}
          className="fixed z-50 p-3 text-white rounded-full shadow-lg bottom-4 right-4 bg-tropical-coral hover:bg-tropical-coral-light"
        >
          {isPlaying ? <FaVolumeMute size={20} /> : <FaMusic size={20} />}
        </button>
      )}

      {/* Cover Page */}
      {!isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-tropical-teal to-tropical-teal-dark">
          <div className="relative w-full h-full overflow-hidden">
            {generatePalms(10)}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <div className="p-8 text-center bg-white rounded-lg shadow-xl bg-opacity-90 backdrop-blur-sm">
                <h2 className="mb-4 text-xl font-medium text-tropical-teal-dark">
                  {t.weddingInvitation}
                </h2>
                <h1 className="mb-6 font-serif text-4xl font-bold text-tropical-coral">
                  Mempelai Pria & Mempelai Wanita
                </h1>
                <p className="mb-8 text-tropical-teal-dark">{t.dear}</p>
                <p className="mb-8 text-2xl font-medium text-tropical-coral">
                  {guestName}
                </p>
                <p className="mb-8 text-tropical-teal-dark">
                  {t.youAreInvited}
                </p>
                <button
                  onClick={handleOpen}
                  className="px-8 py-3 text-white transition-transform transform rounded-full bg-tropical-coral hover:bg-tropical-coral-light hover:scale-105"
                >
                  {t.openInvitation}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        className={`transition-opacity duration-1000 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Hero Section */}
        <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-tropical-teal to-tropical-teal-dark">
          {generatePalms(15)}
          <div className="relative z-10 max-w-4xl p-8 mx-auto text-center text-white">
            <div className="inline-block p-2 mb-6 border-2 rounded-full border-tropical-sand">
              <FaHeart className="w-8 h-8 text-tropical-coral animate-pulse" />
            </div>
            <h2 className="mb-4 font-serif text-2xl">
              {t.weAreGettingMarried}
            </h2>
            <h1 className="mb-6 font-serif text-6xl font-bold">
              Mempelai Pria & Mempelai Wanita
            </h1>
            <p className="text-xl">31 December 2024</p>
            <div className="w-24 h-1 mx-auto my-8 bg-tropical-sand"></div>
            <p className="max-w-2xl mx-auto text-lg">
              {t.quote1}
              <br />
              {t.quote1Source}
            </p>
          </div>
        </section>

        {/* Couple Section */}
        <section className="py-20 bg-tropical-sand">
          <div className="container max-w-4xl px-4 mx-auto">
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-serif text-3xl text-tropical-teal-dark">
                {t.theHappyCouple}
              </h2>
              <div className="w-24 h-1 mx-auto bg-tropical-coral"></div>
            </div>

            <div className="grid gap-16 md:grid-cols-2">
              {/* Bride */}
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden border-4 rounded-full border-tropical-coral">
                  <div className="absolute inset-0 bg-gradient-to-br from-tropical-coral-light to-tropical-coral"></div>
                  <div className="absolute inset-0 flex items-center justify-center font-serif text-5xl text-white">
                    R
                  </div>
                </div>
                <h3 className="mb-2 font-serif text-2xl text-tropical-teal-dark">
                  Mempelai Wanita Doe
                </h3>
                <p className="mb-4 text-gray-600">
                  {t.daughterOf} Bpk. John Doe & Ibu Jane Doe
                </p>
                <div className="flex justify-center space-x-4">
                  <a
                    href="#"
                    className="text-tropical-coral hover:text-tropical-coral-light"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Groom */}
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden border-4 rounded-full border-tropical-coral">
                  <div className="absolute inset-0 bg-gradient-to-br from-tropical-coral-light to-tropical-coral"></div>
                  <div className="absolute inset-0 flex items-center justify-center font-serif text-5xl text-white">
                    D
                  </div>
                </div>
                <h3 className="mb-2 font-serif text-2xl text-tropical-teal-dark">
                  Mempelai Pria Smith
                </h3>
                <p className="mb-4 text-gray-600">
                  {t.sonOf} Bpk. Robert Smith & Ibu Sarah Smith
                </p>
                <div className="flex justify-center space-x-4">
                  <a
                    href="#"
                    className="text-tropical-coral hover:text-tropical-coral-light"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-16">
              <div className="p-6 text-center bg-white rounded-lg shadow-lg">
                <p className="mb-4 text-lg text-tropical-teal-dark">
                  "Two souls with but a single thought, two hearts that beat as
                  one."
                </p>
                <p className="text-tropical-coral">— John Keats</p>
              </div>
            </div>
          </div>
        </section>

        {/* Event Details Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-tropical-teal-light to-tropical-teal">
          {/* Palm tree decorations */}
          {generatePalms(8)}

          <div className="container relative z-10 max-w-4xl px-4 mx-auto">
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-serif text-3xl text-white">
                Wedding Events
              </h2>
              <div className="w-24 h-1 mx-auto bg-tropical-sand"></div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Ceremony */}
              <div className="p-6 text-center bg-white rounded-lg shadow-lg">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-tropical-coral-light">
                  <FaGlassCheers className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-4 font-serif text-2xl text-tropical-teal-dark">
                  Wedding Ceremony
                </h3>
                <div className="mb-4 space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <FaCalendarAlt className="text-tropical-coral" />
                    <span className="text-gray-600">
                      Sunday, 31 December 2024
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-gray-600">08:00 - 10:00 WIB</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <FaMapMarkerAlt className="text-tropical-coral" />
                    <span className="text-gray-600">
                      Tropical Beach Resort, Bali
                    </span>
                  </div>
                </div>
                <a
                  href="https://goo.gl/maps/1234"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 text-white rounded-full bg-tropical-coral hover:bg-tropical-coral-light"
                >
                  View Location
                </a>
              </div>

              {/* Reception */}
              <div className="p-6 text-center bg-white rounded-lg shadow-lg">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-tropical-coral-light">
                  <FaUmbrellaBeach className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-4 font-serif text-2xl text-tropical-teal-dark">
                  Wedding Reception
                </h3>
                <div className="mb-4 space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <FaCalendarAlt className="text-tropical-coral" />
                    <span className="text-gray-600">
                      Sunday, 31 December 2024
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-gray-600">12:00 - 15:00 WIB</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <FaMapMarkerAlt className="text-tropical-coral" />
                    <span className="text-gray-600">
                      Tropical Beach Resort, Bali
                    </span>
                  </div>
                </div>
                <a
                  href="https://goo.gl/maps/1234"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 text-white rounded-full bg-tropical-coral hover:bg-tropical-coral-light"
                >
                  View Location
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Countdown Section */}
        <section className="relative py-16 overflow-hidden bg-tropical-sand">
          <div className="container relative z-10 max-w-4xl px-4 mx-auto">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-3xl text-tropical-teal-dark">
                Counting Down To The Big Day
              </h2>
              <div className="w-24 h-1 mx-auto bg-tropical-coral"></div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="p-4 text-center bg-white rounded-lg shadow-md">
                <div className="text-4xl font-bold text-tropical-coral">
                  {countdown.days}
                </div>
                <div className="text-tropical-teal-dark">Days</div>
              </div>
              <div className="p-4 text-center bg-white rounded-lg shadow-md">
                <div className="text-4xl font-bold text-tropical-coral">
                  {countdown.hours}
                </div>
                <div className="text-tropical-teal-dark">Hours</div>
              </div>
              <div className="p-4 text-center bg-white rounded-lg shadow-md">
                <div className="text-4xl font-bold text-tropical-coral">
                  {countdown.minutes}
                </div>
                <div className="text-tropical-teal-dark">Minutes</div>
              </div>
              <div className="p-4 text-center bg-white rounded-lg shadow-md">
                <div className="text-4xl font-bold text-tropical-coral">
                  {countdown.seconds}
                </div>
                <div className="text-tropical-teal-dark">Seconds</div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="relative py-16 overflow-hidden bg-gradient-to-br from-tropical-teal to-tropical-teal-dark">
          {/* Palm tree decorations */}
          {generatePalms(8)}

          <div className="container relative z-10 max-w-4xl px-4 mx-auto">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-3xl text-white">
                Our Gallery
              </h2>
              <div className="w-24 h-1 mx-auto bg-tropical-sand"></div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div
                  key={num}
                  className="overflow-hidden transition-transform rounded-lg shadow-lg hover:scale-105"
                >
                  <img
                    src={`https://source.unsplash.com/random/300x300?wedding,tropical&sig=${num}`}
                    alt="Wedding Gallery"
                    className="object-cover w-full h-64"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RSVP Section */}
        <section className="relative py-16 overflow-hidden bg-tropical-sand">
          <div className="container relative z-10 max-w-4xl px-4 mx-auto">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-3xl text-tropical-teal-dark">
                {t.rsvp}
              </h2>
              <div className="w-24 h-1 mx-auto bg-tropical-coral"></div>
              <p className="mt-4 text-gray-600">{t.rsvpInstruction}</p>
            </div>
            <div className="p-8 bg-white rounded-lg shadow-lg">
              <form onSubmit={handleRSVPSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="nama"
                    className="block mb-2 text-tropical-teal-dark"
                  >
                    {t.yourName}
                  </label>
                  <input
                    type="text"
                    id="nama"
                    value={rsvpForm.nama}
                    onChange={(e) =>
                      setRsvpForm({ ...rsvpForm, nama: e.target.value })
                    }
                    placeholder={t.namePlaceholder}
                    className="w-full px-4 py-2 border rounded-md border-tropical-teal/20 focus:outline-none focus:ring-2 focus:ring-tropical-coral"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="presence"
                    className="block mb-2 text-tropical-teal-dark"
                  >
                    {t.attendance}
                  </label>
                  <select
                    id="presence"
                    value={rsvpForm.presence}
                    onChange={(e) =>
                      setRsvpForm({ ...rsvpForm, presence: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-md border-tropical-teal/20 focus:outline-none focus:ring-2 focus:ring-tropical-coral"
                    required
                  >
                    <option value="hadir">{t.willAttend}</option>
                    <option value="tidak">{t.unableToAttend}</option>
                  </select>
                </div>
                {rsvpForm.presence === "hadir" && (
                  <div className="mb-4">
                    <label
                      htmlFor="jumlah"
                      className="block mb-2 text-tropical-teal-dark"
                    >
                      {t.numberOfGuests}
                    </label>
                    <input
                      type="number"
                      id="jumlah"
                      min="1"
                      max="5"
                      value={rsvpForm.jumlah}
                      onChange={(e) =>
                        setRsvpForm({
                          ...rsvpForm,
                          jumlah: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-4 py-2 border rounded-md border-tropical-teal/20 focus:outline-none focus:ring-2 focus:ring-tropical-coral"
                      required
                    />
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-3 text-white transition-colors rounded-md bg-tropical-coral hover:bg-tropical-coral-light disabled:bg-gray-400"
                >
                  {isLoading ? t.submitting : t.submit}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Wishes Section */}
        <section className="relative py-16 overflow-hidden bg-gradient-to-br from-tropical-teal-light to-tropical-teal">
          {generatePalms(8)}
          <div className="container relative z-10 max-w-4xl px-4 mx-auto">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-3xl text-white">
                {t.wishesFor}
              </h2>
              <div className="w-24 h-1 mx-auto bg-tropical-sand"></div>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="mb-4 font-serif text-2xl text-tropical-teal-dark">
                  {t.sendYourWishes}
                </h3>
                <form onSubmit={handleWishSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="wishName"
                      className="block mb-2 text-tropical-teal-dark"
                    >
                      {t.yourName}
                    </label>
                    <input
                      type="text"
                      id="wishName"
                      value={wishForm.nama}
                      onChange={(e) =>
                        setWishForm({ ...wishForm, nama: e.target.value })
                      }
                      placeholder={t.namePlaceholder}
                      className="w-full px-4 py-2 border rounded-md border-tropical-teal/20 focus:outline-none focus:ring-2 focus:ring-tropical-coral"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="wishes"
                      className="block mb-2 text-tropical-teal-dark"
                    >
                      {t.yourMessage}
                    </label>
                    <textarea
                      id="wishes"
                      value={wishForm.wishes}
                      onChange={(e) =>
                        setWishForm({ ...wishForm, wishes: e.target.value })
                      }
                      placeholder={t.wishesPlaceholder}
                      className="w-full px-4 py-2 border rounded-md border-tropical-teal/20 focus:outline-none focus:ring-2 focus:ring-tropical-coral"
                      rows="4"
                      required
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="code"
                      className="block mb-2 text-tropical-teal-dark"
                    >
                      {t.invitationCode}
                    </label>
                    <input
                      type="text"
                      id="code"
                      value={wishForm.code}
                      onChange={(e) =>
                        setWishForm({ ...wishForm, code: e.target.value })
                      }
                      placeholder={t.codePlaceholder}
                      className="w-full px-4 py-2 border rounded-md border-tropical-teal/20 focus:outline-none focus:ring-2 focus:ring-tropical-coral"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-6 py-3 text-white transition-colors rounded-md bg-tropical-coral hover:bg-tropical-coral-light disabled:bg-gray-400"
                  >
                    {isLoading ? t.submitting : t.sendWishes}
                  </button>
                  {submitStatus && (
                    <div className="p-3 mt-4 text-center text-white rounded-md bg-tropical-teal">
                      {submitStatus}
                    </div>
                  )}
                </form>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="mb-4 font-serif text-2xl text-tropical-teal-dark">
                  {t.wishesFor}
                </h3>
                <div className="overflow-y-auto max-h-96">
                  {wishes.length > 0 ? (
                    wishes.map((wish, index) => (
                      <div
                        key={index}
                        className="p-4 mb-4 border-b border-gray-200"
                      >
                        <h4 className="mb-2 font-serif text-xl text-tropical-teal-dark">
                          {wish.nama}
                        </h4>
                        <p className="text-gray-600">{wish.wishes}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-600">{t.noWishesYet}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gift Section */}
        <section className="relative py-16 overflow-hidden bg-tropical-sand">
          <div className="container relative z-10 max-w-4xl px-4 mx-auto">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-serif text-3xl text-tropical-teal-dark">
                {t.weddingGifts}
              </h2>
              <div className="w-24 h-1 mx-auto bg-tropical-coral"></div>
              <p className="mt-4 text-gray-600">{t.giftMessage}</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="p-6 text-center bg-white rounded-lg shadow-lg">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-tropical-coral-light">
                  <FaGift className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-4 font-serif text-2xl text-tropical-teal-dark">
                  {t.digitalGift}
                </h3>
                <p className="mb-6 text-gray-600">{t.digitalGiftMessage}</p>
                <div className="p-4 mb-4 border rounded-lg border-tropical-teal/20">
                  <p className="mb-2 font-medium text-tropical-teal-dark">
                    {t.bankAccount}
                  </p>
                  <p className="text-lg font-bold text-tropical-coral">
                    1234567890
                  </p>
                  <p className="text-gray-600">{t.accountHolder}</p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("1234567890");
                  }}
                  className="px-6 py-2 text-white rounded-full bg-tropical-coral hover:bg-tropical-coral-light"
                >
                  {t.copyAccountNumber}
                </button>
              </div>
              <div className="p-6 text-center bg-white rounded-lg shadow-lg">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-tropical-coral-light">
                  <FaGift className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-4 font-serif text-2xl text-tropical-teal-dark">
                  {t.physicalGift}
                </h3>
                <p className="mb-6 text-gray-600">{t.physicalGiftMessage}</p>
                <div className="p-4 mb-4 border rounded-lg border-tropical-teal/20">
                  <p className="mb-2 font-medium text-tropical-teal-dark">
                    Mempelai Pria & Mempelai Wanita
                  </p>
                  <p className="text-gray-600">{t.addressDetails}</p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(t.addressDetails);
                  }}
                  className="px-6 py-2 text-white rounded-full bg-tropical-coral hover:bg-tropical-coral-light"
                >
                  {t.copyAddress}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-12 overflow-hidden text-center text-white bg-tropical-teal-dark">
          <div className="container max-w-4xl px-4 mx-auto">
            <h2 className="mb-6 font-serif text-3xl">Mempelai Pria & Mempelai Wanita</h2>
            <p className="mb-8">{t.thankYou}</p>
            <p className="text-sm text-tropical-sand/60">
              © 2024 Mempelai Pria & Mempelai Wanita Wedding. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default WeddingInvitation4;
