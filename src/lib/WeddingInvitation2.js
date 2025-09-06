import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  Calendar,
  MapPin,
  Gift,
  Volume2,
  VolumeX,
  Moon,
  Scroll,
  MessageCircle,
  Navigation,
  Flower,
  Clock,
  BellRing,
  Flower2,
  Users,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

// Objek terjemahan untuk Bahasa Indonesia dan Inggris
const translations = {
  id: {
    openInvitation: "Buka Undangan",
    weddingOf: "Pernikahan",
    dear: "Kepada",
    date: "Tanggal",
    theWeddingCelebration: "Perayaan Pernikahan",
    countingDown: "Menghitung Hari Menuju Hari Spesial Kami",
    days: "Hari",
    hours: "Jam",
    minutes: "Menit",
    seconds: "Detik",
    verse: "Dan di antara tanda-tanda-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.",
    verseSource: "Ar-Rum: 21",
    saveTheDate: "Simpan Tanggal",
    akadNikah: "Akad Nikah",
    weddingReception: "Resepsi Pernikahan",
    viewLocation: "Lihat Lokasi",
    ourJourney: "Perjalanan Kami",
    ourMoments: "Momen Indah Kami",
    weddingGift: "Hadiah Pernikahan",
    giftMessage: "Kehadiran dan doa Anda adalah hadiah terbesar kami. Namun, jika Anda ingin memberikan penghormatan dengan hadiah, Anda dapat mengirimkannya melalui:",
    bank: "Bank",
    accountHolder: "a.n.",
    rsvp: "Konfirmasi Kehadiran",
    willYouAttend: "Apakah Anda akan hadir?",
    yesAttend: "Ya, saya akan hadir",
    noAttend: "Maaf, saya tidak bisa hadir",
    numberOfGuests: "Jumlah Tamu",
    confirmAttendance: "Konfirmasi Kehadiran",
    sending: "Mengirim...",
    sendWishes: "Kirim Ucapan",
    yourName: "Nama Anda",
    yourMessage: "Pesan Anda",
    wishSent: "Ucapan berhasil dikirim!",
    wishFailed: "Gagal mengirim ucapan. Silakan coba lagi.",
    rsvpSent: "RSVP berhasil dikirim!",
    rsvpFailed: "Gagal mengirim RSVP. Silakan coba lagi.",
    thankYou: "Terima kasih telah menjadi bagian dari hari spesial kami",
    namePlaceholder: "Masukkan nama Anda",
    messagePlaceholder: "Tulis ucapan Anda di sini",
  },
  en: {
    openInvitation: "Open Invitation",
    weddingOf: "The Wedding of",
    dear: "Dear",
    date: "Date",
    theWeddingCelebration: "The Wedding Celebration of",
    countingDown: "Counting Down To Our Special Day",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    verse: "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy.",
    verseSource: "Ar-Rum: 21",
    saveTheDate: "Save The Date",
    akadNikah: "Ceremony",
    weddingReception: "Wedding Reception",
    viewLocation: "View Location",
    ourJourney: "Our Journey",
    ourMoments: "Our Beautiful Moments",
    weddingGift: "Wedding Gift",
    giftMessage: "Your presence and prayers are our greatest gifts. However, if you wish to honor us with a gift, you may send it through:",
    bank: "Bank",
    accountHolder: "a/n",
    rsvp: "RSVP",
    willYouAttend: "Will you attend?",
    yesAttend: "Yes, I will attend",
    noAttend: "Sorry, I can't attend",
    numberOfGuests: "Number of Guests",
    confirmAttendance: "Confirm Attendance",
    sending: "Sending...",
    sendWishes: "Send Wishes",
    yourName: "Your Name",
    yourMessage: "Your Message",
    wishSent: "Wish successfully sent!",
    wishFailed: "Failed to send wish. Please try again.",
    rsvpSent: "RSVP successfully sent!",
    rsvpFailed: "Failed to send RSVP. Please try again.",
    thankYou: "Thank you for being part of our special day",
    namePlaceholder: "Enter your name",
    messagePlaceholder: "Write your message here",
  },
};

const WeddingInvitation = () => {
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [language, setLanguage] = useState("id"); // State untuk bahasa, default ke Indonesia
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Ambil terjemahan berdasarkan bahasa yang dipilih
  const t = translations[language];

  // Audio reference
  const audioRef = useRef(new Audio("/wedding/music/background-music.mp3"));

  // Ambil parameter dari URL
  const to = searchParams.get("to") || t.dear;

  // State untuk form RSVP
  const [rsvpForm, setRsvpForm] = useState({
    namaundangan: to,
    presence: "hadir",
    jumlah: 1,
  });

  // State untuk form wishes
  const [wishForm, setWishForm] = useState({
    namaundangan: to,
    nama: "",
    wishes: "",
  });

  // State untuk menampung wishes yang sudah ada
  const [wishes, setWishes] = useState([]);

  // State untuk loading
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  // Base URL API
  const API_URL =
    "https://script.google.com/macros/s/AKfycbyv-EaT5dfuu5og4gy0vxBMpYah0-RFqdWu9kEzq3jZjs4xLU7lh-WTVNx8s23l_2kY/exec";

  // Fungsi untuk submit RSVP
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
        setSubmitStatus(t.rsvpSent);
        setRsvpForm({ namaundangan: to, presence: "hadir", jumlah: 1 });
      } else {
        setSubmitStatus(t.rsvpFailed);
      }
    } catch (error) {
      setSubmitStatus(t.rsvpFailed);
    }
    setIsLoading(false);
  };

  // Fungsi untuk submit wishes
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
        setSubmitStatus(t.wishSent);
        setWishForm({ namaundangan: to, nama: "", wishes: "" });
        fetchWishes(); // Refresh wishes list
      } else {
        setSubmitStatus(t.wishFailed);
      }
    } catch (error) {
      setSubmitStatus(t.wishFailed);
    }
    setIsLoading(false);
  };

  // Fungsi untuk mengambil data wishes
  const fetchWishes = async () => {
    try {
      const params = new URLSearchParams({
        action: "read-record-wishes",
      });

      const response = await fetch(`${API_URL}?${params}`);
      const data = await response.json();
      setWishes(data.records || []);
    } catch (error) {
      console.error("Error fetching wishes:", error);
    }
  };

  useEffect(() => {
    fetchWishes();
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = 0.5;

    const handleAudioEnd = () => {
      audio.currentTime = 0;
      audio.play();
    };

    audio.addEventListener("ended", handleAudioEnd);

    const weddingDate = new Date("2024-12-16T10:00:00");

    const timer = setInterval(() => {
      const now = new Date();
      const difference = weddingDate - now;

      setCountdown({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000 / 60) % 60),
      });
    }, 1000);

    if (isOpen) {
      setIsVisible(true);
    }

    return () => {
      clearInterval(timer);
      audio.removeEventListener("ended", handleAudioEnd);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isOpen]);

  // Handle toggle musik
  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {})
          .catch((error) => {
            console.log("Playback prevented:", error);
          });
      }
    }
    setIsPlaying(!isPlaying);
  };

  // Auto play ketika undangan dibuka
  useEffect(() => {
    if (isOpen) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Auto-play prevented:", error);
            setIsPlaying(false);
          });
      }
    }
  }, [isOpen]);

  // Komponen Language Switcher
  const LanguageSwitcher = () => {
    return (
      <div className="fixed z-50 flex p-1 bg-white rounded-full shadow-lg top-4 right-4">
        <button
          onClick={() => setLanguage("id")}
          className={`px-3 py-1 rounded-full ${
            language === "id" ? "bg-rustic-brown text-rustic-cream" : "text-rustic-brown"
          }`}
        >
          ID
        </button>
        <button
          onClick={() => setLanguage("en")}
          className={`px-3 py-1 rounded-full ${
            language === "en" ? "bg-rustic-brown text-rustic-cream" : "text-rustic-brown"
          }`}
        >
          EN
        </button>
      </div>
    );
  };

  if (!isOpen) {
    return (
      <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-rustic-brown-dark via-rustic-brown to-rustic-brown-light">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute w-full h-full bg-[url('data:image/svg+xml,...')] opacity-5"></div>
          <div className="absolute top-0 left-0 w-32 h-32 rotate-45 bg-rustic-gold opacity-10"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 -rotate-45 bg-rustic-gold opacity-10"></div>
        </div>

        {/* Main Card */}
        <div className="relative w-full max-w-xl mx-4">
          <div className="p-1 rounded-lg shadow-2xl bg-rustic-cream">
            <div className="relative p-8 overflow-hidden border-2 rounded-lg border-rustic-brown-light">
              {/* Ornamental Corners */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-rustic-gold"></div>
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-rustic-gold"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-rustic-gold"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-rustic-gold"></div>

              {/* Content */}
              <div className="space-y-6 text-center">
                <h4 className="text-xl font-accent text-rustic-brown-light">{t.weddingOf}</h4>
                <div className="space-y-2">
                  <h1 className="text-5xl font-primary text-rustic-brown">Mempelai Pria</h1>
                  <span className="text-3xl font-accent text-rustic-gold">&</span>
                  <h1 className="text-5xl font-primary text-rustic-brown">Mempelai Wanita</h1>
                </div>
                <div className="w-24 h-1 mx-auto bg-rustic-gold"></div>
                <p className="font-secondary text-rustic-brown-light">
                  {new Date("2024-12-31").toLocaleDateString(language === "id" ? "id-ID" : "en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <button
                  onClick={() => setIsOpen(true)}
                  className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden text-lg font-medium transition-all duration-300 ease-in-out rounded-md group text-rustic-cream bg-rustic-brown hover:bg-rustic-brown-dark"
                >
                  <span className="relative">{t.openInvitation}</span>
                  <div className="absolute inset-0 transition-transform duration-300 -translate-x-full group-hover:translate-x-0 bg-rustic-brown-dark"></div>
                </button>
                <p className="mt-4 text-rustic-brown font-secondary">
                  {t.dear}
                  <br />
                  <span className="text-xl font-primary">{to}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rustic-cream">
      {/* Language Switcher */}
      <LanguageSwitcher />

      {/* Music Toggle */}
      <button
        onClick={toggleMusic}
        className="fixed z-50 p-3 transition-transform border rounded-full shadow-lg bg-rustic-cream bottom-4 right-4 hover:scale-110 border-rustic-brown group"
      >
        {isPlaying ? (
          <Volume2 size={24} className="transition-colors text-rustic-brown group-hover:text-rustic-gold" />
        ) : (
          <VolumeX size={24} className="transition-colors text-rustic-brown group-hover:text-rustic-gold" />
        )}
      </button>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-rustic-brown-dark via-rustic-brown to-rustic-brown-light">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10"></div>
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 px-4 text-center">
          <BellRing className="w-16 h-16 mx-auto mb-8 text-rustic-gold animate-pulse" />
          <h4 className="mb-4 text-2xl font-accent text-rustic-gold">{t.theWeddingCelebration}</h4>
          <h1 className="mb-4 font-primary text-7xl text-rustic-cream">Mempelai Pria</h1>
          <span className="block my-2 text-4xl font-accent text-rustic-gold">&</span>
          <h1 className="mb-8 font-primary text-7xl text-rustic-cream">Mempelai Wanita</h1>
          <div className="w-32 h-1 mx-auto mb-6 bg-rustic-gold"></div>
          <p className="mb-12 text-xl font-secondary text-rustic-cream">
            {new Date("2024-12-31").toLocaleDateString(language === "id" ? "id-ID" : "en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <Scroll className="w-8 h-8 mx-auto text-rustic-cream/80 animate-bounce" />
        </div>
      </section>

      {/* Countdown Section */}
      <section className="relative py-20 bg-rustic-cream">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_#B68D40_1px,_transparent_0)] bg-[size:20px_20px] opacity-5"></div>
        <div className="container px-4 mx-auto">
          <h2 className="mb-12 text-3xl text-center font-accent text-rustic-brown">{t.countingDown}</h2>
          <div className="grid max-w-4xl grid-cols-2 gap-6 mx-auto md:grid-cols-4">
            {[
              { label: t.days, value: countdown.days },
              { label: t.hours, value: countdown.hours },
              { label: t.minutes, value: countdown.minutes },
              { label: t.seconds, value: countdown.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="relative p-6 transition-colors bg-white border rounded-lg shadow-lg border-rustic-brown/20 group hover:border-rustic-gold"
              >
                <div className="absolute inset-0 transition-colors rounded-lg bg-rustic-brown/5 group-hover:bg-rustic-gold/5"></div>
                <div className="relative text-center">
                  <div className="mb-2 text-4xl font-primary text-rustic-brown">{item.value}</div>
                  <div className="font-secondary text-rustic-brown-light">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verse/Quote Section */}
      <section className="relative py-16 bg-gradient-to-br from-rustic-brown-light/10 to-rustic-cream">
        <div className="container max-w-2xl px-4 mx-auto text-center">
          <div className="relative p-8 border-2 rounded-lg border-rustic-brown/20">
            <div className="absolute px-4 -translate-x-1/2 -top-4 left-1/2 bg-rustic-cream">
              <Flower2 className="w-8 h-8 text-rustic-gold" />
            </div>
            <p className="mb-4 text-lg italic font-secondary text-rustic-brown">{t.verse}</p>
            <p className="text-xl font-accent text-rustic-brown-light">{t.verseSource}</p>
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="relative py-20 bg-rustic-cream">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_#B68D40_1px,_transparent_0)] bg-[size:40px_40px] opacity-5"></div>
        <div className="container max-w-5xl px-4 mx-auto">
          <h2 className="mb-16 text-4xl text-center font-accent text-rustic-brown">{t.saveTheDate}</h2>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Akad Card */}
            <div className="p-1 transition-shadow bg-white rounded-lg shadow-lg group hover:shadow-xl">
              <div className="p-8 text-center transition-colors border rounded-lg border-rustic-brown/20 group-hover:border-rustic-gold">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 transition-colors rounded-full bg-rustic-brown/5 group-hover:bg-rustic-gold/5">
                  <BellRing className="w-8 h-8 text-rustic-brown" />
                </div>
                <h3 className="mb-4 text-2xl font-primary text-rustic-brown">{t.akadNikah}</h3>
                <div className="mb-6 space-y-4">
                  <div className="flex items-center justify-center gap-2 text-rustic-brown-light">
                    <Calendar className="w-5 h-5" />
                    <span>
                      {new Date("2024-12-31").toLocaleDateString(language === "id" ? "id-ID" : "en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-rustic-brown-light">
                    <Clock className="w-5 h-5" />
                    <span>08:00 WIB</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-rustic-brown-light">
                    <MapPin className="w-5 h-5" />
                    <span>Masjid Al-Hidayah</span>
                  </div>
                </div>
                <a
                  href="https://maps.app.goo.gl/DJg9WWhKDBUxfu3T6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2 transition-colors rounded bg-rustic-brown text-rustic-cream hover:bg-rustic-brown-dark"
                >
                  <Navigation className="w-4 h-4" />
                  <span>{t.viewLocation}</span>
                </a>
              </div>
            </div>

            {/* Reception Card */}
            <div className="p-1 transition-shadow bg-white rounded-lg shadow-lg group hover:shadow-xl">
                <div className="p-8 text-center transition-colors border rounded-lg border-rustic-brown/20 group-hover:border-rustic-gold">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 transition-colors rounded-full bg-rustic-brown/5 group-hover:bg-rustic-gold/5">
                    <Heart className="w-8 h-8 text-rustic-brown" />
                  </div>
                  <h3 className="mb-4 text-2xl font-primary text-rustic-brown">{t.weddingReception}</h3>
                  <div className="mb-6 space-y-4">
                    <div className="flex items-center justify-center gap-2 text-rustic-brown-light">
                      <Calendar className="w-5 h-5" />
                      <span>
                        {new Date("2024-12-31").toLocaleDateString(language === "id" ? "id-ID" : "en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-rustic-brown-light">
                      <Clock className="w-5 h-5" />
                      <span>11:00 - 13:00 WIB</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-rustic-brown-light">
                      <MapPin className="w-5 h-5" />
                      <span>Hotel Grand Hyatt</span>
                    </div>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/DJg9WWhKDBUxfu3T6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-2 transition-colors rounded bg-rustic-brown text-rustic-cream hover:bg-rustic-brown-dark"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>{t.viewLocation}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="relative py-20 bg-gradient-to-br from-rustic-brown-light/10 to-rustic-cream">
          <div className="container px-4 mx-auto">
            <h2 className="mb-16 text-4xl text-center font-accent text-rustic-brown">{t.ourJourney}</h2>
            <div className="grid max-w-6xl grid-cols-2 gap-4 mx-auto md:grid-cols-3 lg:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className="p-1 transition-all bg-white rounded-lg shadow-lg cursor-pointer aspect-square group hover:shadow-xl"
                >
                  <div className="relative w-full h-full overflow-hidden transition-colors border rounded-lg border-rustic-brown/20 group-hover:border-rustic-gold">
                    <div className="absolute inset-0 bg-gradient-to-br from-rustic-brown to-rustic-brown-dark opacity-20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Flower2 className="w-12 h-12 transition-opacity opacity-50 text-rustic-gold group-hover:opacity-100" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 transition-opacity opacity-0 text-rustic-cream bg-gradient-to-t from-rustic-brown-dark to-transparent group-hover:opacity-100">
                      <p className="text-sm text-center font-secondary">{t.ourMoments}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gift Section */}
        <section className="relative py-20 bg-rustic-cream">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_#B68D40_1px,_transparent_0)] bg-[size:20px_20px] opacity-5"></div>
          <div className="container max-w-2xl px-4 mx-auto">
            <div className="mb-12 space-y-4 text-center">
              <h2 className="text-4xl font-accent text-rustic-brown">{t.weddingGift}</h2>
              <p className="font-secondary text-rustic-brown-light">{t.giftMessage}</p>
            </div>
            <div className="space-y-6">
              {[
                { bank: "Bank BCA", number: "1234567890", name: "Mempelai Pria Pratama" },
                { bank: "Bank Mandiri", number: "0987654321", name: "Mempelai Wanita Putri" },
              ].map((account, index) => (
                <div
                  key={index}
                  className="p-1 transition-shadow bg-white rounded-lg shadow-lg group hover:shadow-xl"
                >
                  <div className="p-6 text-center transition-colors border rounded-lg border-rustic-brown/20 group-hover:border-rustic-gold">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 transition-colors rounded-full bg-rustic-brown/5 group-hover:bg-rustic-gold/5">
                      <Gift className="w-6 h-6 text-rustic-brown" />
                    </div>
                    <h3 className="mb-2 text-xl font-primary text-rustic-brown">{account.bank}</h3>
                    <p className="mb-1 text-lg font-secondary text-rustic-brown-light">{account.number}</p>
                    <p className="font-secondary text-rustic-brown-light">
                      {t.accountHolder} {account.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RSVP Section */}
        <section className="relative py-20 bg-gradient-to-br from-rustic-brown-light/10 to-rustic-cream">
          <div className="container max-w-2xl px-4 mx-auto">
            <h2 className="mb-12 text-4xl text-center font-accent text-rustic-brown">{t.rsvp}</h2>
            <div className="p-1 bg-white rounded-lg shadow-lg">
              <div className="p-8 border rounded-lg border-rustic-brown/20">
                <form onSubmit={handleRSVPSubmit} className="space-y-6">
                  <div>
                    <label className="block mb-2 text-rustic-brown font-secondary">{t.willYouAttend}</label>
                    <select
                      value={rsvpForm.presence}
                      onChange={(e) => setRsvpForm({ ...rsvpForm, presence: e.target.value })}
                      className="w-full p-3 transition-colors border rounded-md border-rustic-brown/20 bg-rustic-cream/50 text-rustic-brown focus:border-rustic-gold focus:ring-1 focus:ring-rustic-gold"
                    >
                      <option value="hadir">{t.yesAttend}</option>
                      <option value="tidak hadir">{t.noAttend}</option>
                    </select>
                  </div>
                  {rsvpForm.presence === "hadir" && (
                    <div>
                      <label className="block mb-2 text-rustic-brown font-secondary">{t.numberOfGuests}</label>
                      <div className="relative">
                        <Users className="absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2 text-rustic-brown-light" />
                        <input
                          type="number"
                          min="1"
                          value={rsvpForm.jumlah}
                          onChange={(e) => setRsvpForm({ ...rsvpForm, jumlah: parseInt(e.target.value) })}
                          className="w-full p-3 pl-12 transition-colors border rounded-md border-rustic-brown/20 bg-rustic-cream/50 text-rustic-brown focus:border-rustic-gold focus:ring-1 focus:ring-rustic-gold"
                        />
                      </div>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center justify-center w-full gap-2 py-3 transition-colors rounded-md bg-rustic-brown text-rustic-cream hover:bg-rustic-brown-dark disabled:bg-rustic-brown-light"
                  >
                    {isLoading && (
                      <div className="w-5 h-5 border-2 rounded-full border-rustic-cream/20 border-t-rustic-cream animate-spin"></div>
                    )}
                    {isLoading ? t.sending : t.confirmAttendance}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Wishes Section */}
        <section className="relative py-20 bg-rustic-cream">
          <div className="container max-w-2xl px-4 mx-auto">
            <h2 className="mb-12 text-4xl text-center font-accent text-rustic-brown">{t.sendWishes}</h2>
            {/* Wishes Form */}
            <div className="p-1 mb-12 bg-white rounded-lg shadow-lg">
              <div className="p-8 border rounded-lg border-rustic-brown/20">
                <form onSubmit={handleWishSubmit} className="space-y-6">
                  <div>
                    <label className="block mb-2 text-rustic-brown font-secondary">{t.yourName}</label>
                    <input
                      type="text"
                      value={wishForm.nama}
                      onChange={(e) => setWishForm({ ...wishForm, nama: e.target.value })}
                      placeholder={t.namePlaceholder}
                      className="w-full p-3 transition-colors border rounded-md border-rustic-brown/20 bg-rustic-cream/50 text-rustic-brown focus:border-rustic-gold focus:ring-1 focus:ring-rustic-gold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-rustic-brown font-secondary">{t.yourMessage}</label>
                    <textarea
                      value={wishForm.wishes}
                      onChange={(e) => setWishForm({ ...wishForm, wishes: e.target.value })}
                      rows="4"
                      placeholder={t.messagePlaceholder}
                      className="w-full p-3 transition-colors border rounded-md border-rustic-brown/20 bg-rustic-cream/50 text-rustic-brown focus:border-rustic-gold focus:ring-1 focus:ring-rustic-gold"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center justify-center w-full gap-2 py-3 transition-colors rounded-md bg-rustic-brown text-rustic-cream hover:bg-rustic-brown-dark disabled:bg-rustic-brown-light"
                  >
                    {isLoading && (
                      <div className="w-5 h-5 border-2 rounded-full border-rustic-cream/20 border-t-rustic-cream animate-spin"></div>
                    )}
                    {isLoading ? t.sending : t.sendWishes}
                  </button>
                </form>
              </div>
            </div>

            {/* Display Wishes */}
            <div className="p-1 bg-white rounded-lg shadow-lg">
              <div className="p-8 border rounded-lg border-rustic-brown/20">
                <div className="space-y-6">
                  {wishes.map((wish, index) => (
                    <div key={index} className="pb-6 border-b border-rustic-brown/10 last:border-0 last:pb-0">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-rustic-brown/5">
                          <MessageCircle className="w-5 h-5 text-rustic-brown" />
                        </div>
                        <div>
                          <p className="mb-1 text-lg font-primary text-rustic-brown">{wish.nama}</p>
                          <p className="mb-2 font-secondary text-rustic-brown-light">{wish.wishes}</p>
                          <p className="text-sm text-rustic-brown-light/60">{wish.currentTime}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="relative py-16 bg-gradient-to-br from-rustic-brown-dark via-rustic-brown to-rustic-brown-light">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_#D4AF37_1px,_transparent_0)] bg-[size:20px_20px] opacity-5"></div>
          <div className="container max-w-2xl px-4 mx-auto text-center">
            <div className="relative p-8">
              {/* Ornamental Border */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-rustic-gold/30"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-rustic-gold/30"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-rustic-gold/30"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-rustic-gold/30"></div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                <Heart className="w-12 h-12 mx-auto text-rustic-gold animate-pulse" />
                <h2 className="text-3xl font-accent text-rustic-cream">Mempelai Pria & Mempelai Wanita</h2>
                <p className="font-secondary text-rustic-cream/80">{t.thankYou}</p>
                <div className="w-16 h-1 mx-auto bg-rustic-gold/30"></div>
                <p className="text-lg font-primary text-rustic-cream/60">
                  {new Date("2024-12-31").toLocaleDateString(language === "id" ? "id-ID" : "en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Status Message */}
          {submitStatus && (
            <div className="fixed flex items-center gap-3 px-6 py-3 rounded-lg shadow-lg bottom-4 right-4 bg-rustic-brown text-rustic-cream animate-fade-in-up">
              <div className="w-2 h-2 rounded-full bg-rustic-gold"></div>
              <p className="font-secondary">{submitStatus}</p>
            </div>
          )}
        </footer>
      </div>
    );
  };

  export default WeddingInvitation;