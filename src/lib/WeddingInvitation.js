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
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import PhotoGallery from "../widget/photo-gallery";

// Objek terjemahan untuk Bahasa Indonesia dan Inggris
const translations = {
  id: {
    openInvitation: "Buka Undangan",
    weddingOf: "Pernikahan",
    dear: "Kepada Yth",
    weAreGettingMarried: "Kami Menikah",
    days: "Hari",
    hours: "Jam",
    minutes: "Menit",
    seconds: "Detik",
    akadNikah: "Akad Nikah",
    walimatulUrsy: "Walimatul Ursy",
    directions: "Petunjuk Arah",
    weddingGift: "Hadiah Pernikahan",
    giftMessage:
      "Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.",
    bank: "Bank",
    accountHolder: "a.n.",
    invitationCode: "Kode Undangan",
    saveCode: "Simpan kode ini untuk keperluan RSVP",
    rsvp: "Konfirmasi Kehadiran",
    presence: "Kehadiran",
    attend: "Hadir",
    notAttend: "Tidak Hadir",
    numberOfGuests: "Jumlah Tamu",
    sendRSVP: "Kirim RSVP",
    sending: "Mengirim...",
    sendWishes: "Kirim Ucapan",
    nickname: "Nama Panggilan",
    wishesAndPrayers: "Ucapan & Doa",
    wishesTitle: "Ucapan & Doa",
    rsvpSent: "RSVP berhasil dikirim!",
    rsvpFailed: "Gagal mengirim RSVP. Silakan coba lagi.",
    wishSent: "Ucapan berhasil dikirim!",
    wishFailed: "Gagal mengirim ucapan. Silakan coba lagi.",
    thankYou: "Terima kasih telah menjadi bagian dari hari spesial kami",
  },
  en: {
    openInvitation: "Open Invitation",
    weddingOf: "The Wedding of",
    dear: "Dear",
    weAreGettingMarried: "We Are Getting Married",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    akadNikah: "Ceremony",
    walimatulUrsy: "Wedding Reception",
    directions: "Directions",
    weddingGift: "Wedding Gift",
    giftMessage:
      "Your blessings are a precious gift to us. If giving is an expression of your love, you may send a cashless gift.",
    bank: "Bank",
    accountHolder: "a/n",
    invitationCode: "Invitation Code",
    saveCode: "Save this code for RSVP purposes",
    rsvp: "RSVP",
    presence: "Attendance",
    attend: "Will Attend",
    notAttend: "Cannot Attend",
    numberOfGuests: "Number of Guests",
    sendRSVP: "Send RSVP",
    sending: "Sending...",
    sendWishes: "Send Wishes",
    nickname: "Nickname",
    wishesAndPrayers: "Wishes & Prayers",
    wishesTitle: "Wishes & Prayers",
    rsvpSent: "RSVP successfully sent!",
    rsvpFailed: "Failed to send RSVP. Please try again.",
    wishSent: "Wish successfully sent!",
    wishFailed: "Failed to send wish. Please try again.",
    thankYou: "Thank you for being part of our special day",
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

  // Get invitation code from URL parameter
  const invitationCode = searchParams.get("code") || "GUEST00";

  // Audio reference
  const audioRef = useRef(new Audio("/wedding/music/background-music.mp3"));

  // Ambil parameter dari URL
  const to = searchParams.get("to") || t.dear;

  // State untuk form RSVP
  const [rsvpForm, setRsvpForm] = useState({
    namaundangan: to,
    presence: "hadir",
    jumlah: 1,
    kodeUndangan: invitationCode,
  });

  // State untuk form wishes
  const [wishForm, setWishForm] = useState({
    namaundangan: to,
    nama: "",
    wishes: "",
    kodeUndangan: invitationCode,
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
        setRsvpForm({
          namaundangan: to,
          presence: "hadir",
          jumlah: 1,
          kodeUndangan: invitationCode,
        });
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
        setWishForm({
          namaundangan: to,
          nama: "",
          wishes: "",
          kodeUndangan: invitationCode,
        });
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
        seconds: Math.floor((difference / 1000) % 60),
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
            language === "id" ? "bg-emerald-600 text-white" : "text-emerald-600"
          }`}
        >
          ID
        </button>
        <button
          onClick={() => setLanguage("en")}
          className={`px-3 py-1 rounded-full ${
            language === "en" ? "bg-emerald-600 text-white" : "text-emerald-600"
          }`}
        >
          EN
        </button>
      </div>
    );
  };

  if (!isOpen) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute w-8 h-8 bg-yellow-200 rounded-full animate-pulse top-1/4 left-1/4"></div>
          <div className="absolute w-6 h-6 delay-300 bg-yellow-200 rounded-full animate-pulse top-1/3 right-1/3"></div>
          <div className="absolute w-4 h-4 delay-700 bg-yellow-200 rounded-full animate-pulse bottom-1/4 right-1/4"></div>
        </div>
        <div className="relative p-12 overflow-hidden text-center transition-all duration-500 transform rounded-lg shadow-xl bg-white/95 hover:scale-105">
          <Moon className="w-16 h-16 mx-auto mb-6 text-emerald-600 animate-bounce" />
          <h2 className="mb-4 font-serif text-2xl text-emerald-800">
            بِسْ‌ اللَّ‌ الرَّحْ‌ الرَّحِيم
          </h2>
          <h3 className="mb-4 font-serif text-xl text-emerald-700">
            {t.weddingOf}
          </h3>
          <h1 className="mb-6 font-serif text-4xl font-bold text-emerald-900">
            Mempelai Pria & Mempelai Wanita
          </h1>
          <button
            onClick={() => setIsOpen(true)}
            className="relative px-8 py-3 overflow-hidden text-white transition-all rounded-full bg-emerald-600 hover:bg-emerald-700 group"
          >
            <span className="relative z-10">{t.openInvitation}</span>
            <div className="absolute inset-0 transition-transform origin-left transform scale-x-0 bg-emerald-500 group-hover:scale-x-100"></div>
          </button>
          <p className="mt-4 text-emerald-700">
            {t.dear}: {to}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-50">
      {/* Language Switcher */}
      <LanguageSwitcher />

      <button
        onClick={() => toggleMusic()}
        className="fixed z-50 p-3 transition-transform bg-white rounded-full shadow-lg bottom-4 right-4 hover:scale-110"
      >
        {isPlaying ? (
          <Volume2 size={24} className="text-emerald-600" />
        ) : (
          <VolumeX size={24} className="text-emerald-600" />
        )}
      </button>

      <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-900">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="relative z-10 text-center text-white transition-all duration-1000 transform translate-y-0 opacity-100">
          <Moon className="w-16 h-16 mx-auto mb-6 text-yellow-200 animate-pulse" />
          <h2 className="mb-4 font-serif text-2xl animate-fade-in">
            بِسْ‌ اللَّ‌ الرَّحْ‌ الرَّحِيم
          </h2>
          <h2 className="mb-4 font-serif text-2xl">{t.weAreGettingMarried}</h2>
          <h1 className="mb-6 font-serif text-6xl font-bold">
            Mempelai Pria & Mempelai Wanita
          </h1>
          <p className="text-xl">
            {new Date("2024-12-31").toLocaleDateString(
              language === "id" ? "id-ID" : "en-US",
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </p>
          <Scroll className="w-8 h-8 mx-auto mt-12 animate-bounce text-white/80" />
        </div>
      </section>

      <section className="relative py-16 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        <div className="container relative z-10 px-4 mx-auto">
          <div className="grid max-w-2xl grid-cols-4 gap-4 mx-auto text-center">
            {[
              { label: t.days, value: countdown.days },
              { label: t.hours, value: countdown.hours },
              { label: t.minutes, value: countdown.minutes },
              { label: t.seconds, value: countdown.seconds },
            ].map((item, index) => (
              <div
                key={item.label}
                className="p-4 transition-transform transform bg-white rounded-lg shadow-lg hover:-translate-y-1"
              >
                <div className="text-3xl font-bold text-emerald-600 animate-pulse">
                  {item.value}
                </div>
                <div className="text-emerald-800">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100">
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        <div className="container relative z-10 max-w-4xl px-4 mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="p-8 text-center transition-transform transform bg-white rounded-lg shadow-lg hover:-translate-y-1">
              <h3 className="mb-4 font-serif text-2xl text-emerald-800">
                {t.akadNikah}
              </h3>
              <Calendar className="w-12 h-12 mx-auto mb-4 text-emerald-600" />
              <p className="mb-2">
                {new Date("2024-12-31").toLocaleDateString(
                  language === "id" ? "id-ID" : "en-US",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
              <p className="mb-2">08:00 WIB</p>
              <p className="text-emerald-700">Masjid Al-Hidayah</p>
              <p className="mb-2 text-emerald-700">Jakarta Selatan</p>
              <a
                href={"https://maps.app.goo.gl/DJg9WWhKDBUxfu3T6"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700"
              >
                <Navigation className="w-4 h-4" />
                <span>{t.directions}</span>
              </a>
            </div>
            <div className="p-8 text-center transition-transform transform bg-white rounded-lg shadow-lg hover:-translate-y-1">
              <h3 className="mb-4 font-serif text-2xl text-emerald-800">
                {t.walimatulUrsy}
              </h3>
              <MapPin className="w-12 h-12 mx-auto mb-4 text-emerald-600" />
              <p className="mb-2">
                {new Date("2024-12-31").toLocaleDateString(
                  language === "id" ? "id-ID" : "en-US",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
              <p className="mb-2">11:00 - 13:00 WIB</p>
              <p className="text-emerald-700">Hotel Grand Hyatt</p>
              <p className="mb-2 text-emerald-700">Jakarta Pusat</p>
              <a
                href={"https://maps.app.goo.gl/DJg9WWhKDBUxfu3T6"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700"
              >
                <Navigation className="w-4 h-4" />
                <span>{t.directions}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <PhotoGallery />

      <section className="relative py-16 overflow-hidden bg-white">
        <div className="container relative z-10 max-w-2xl px-4 mx-auto text-center">
          <h2 className="mb-8 font-serif text-3xl text-emerald-800">
            {t.weddingGift}
          </h2>
          <div className="p-8 rounded-lg shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100">
            <Gift className="w-12 h-12 mx-auto mb-4 text-emerald-600" />
            <p className="mb-4 text-emerald-800">{t.giftMessage}</p>
            <div className="space-y-4">
              <div className="p-4 transition-transform transform bg-white rounded hover:-translate-y-1">
                <p className="font-semibold text-emerald-800">{t.bank} BCA</p>
                <p className="text-emerald-700">1234567890</p>
                <p className="text-emerald-700">
                  {t.accountHolder} Mempelai Pria Pratama
                </p>
              </div>
              <div className="p-4 transition-transform transform bg-white rounded hover:-translate-y-1">
                <p className="font-semibold text-emerald-800">
                  {t.bank} Mandiri
                </p>
                <p className="text-emerald-700">0987654321</p>
                <p className="text-emerald-700">
                  {t.accountHolder} Mempelai Wanita Putri
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="p-4 text-center bg-white rounded-lg shadow-lg">
        <h3 className="mb-2 text-lg font-medium text-emerald-800">
          {t.invitationCode}
        </h3>
        <p className="text-2xl font-bold tracking-wider text-emerald-600">
          {invitationCode}
        </p>
        <p className="mt-2 text-sm text-emerald-600/60">{t.saveCode}</p>
      </div>

      <section className="relative py-16 overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100">
        <div className="max-w-4xl px-4 py-8 mx-auto">
          {/* RSVP Form */}
          <div className="p-6 mb-12 bg-white rounded-lg shadow-lg">
            <h2 className="mb-6 font-serif text-2xl text-emerald-800">
              {t.rsvp}
            </h2>
            <form onSubmit={handleRSVPSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t.presence}
                </label>
                <select
                  value={rsvpForm.presence}
                  onChange={(e) =>
                    setRsvpForm({ ...rsvpForm, presence: e.target.value })
                  }
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                >
                  <option value="hadir">{t.attend}</option>
                  <option value="tidak hadir">{t.notAttend}</option>
                </select>
              </div>
              {rsvpForm.presence === "hadir" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {t.numberOfGuests}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={rsvpForm.jumlah}
                    onChange={(e) =>
                      setRsvpForm({
                        ...rsvpForm,
                        jumlah: parseInt(e.target.value),
                      })
                    }
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2 text-white transition-colors rounded-md bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300"
              >
                {isLoading ? t.sending : t.sendRSVP}
              </button>
            </form>
          </div>

          {/* Wishes Form */}
          <div className="p-6 mb-12 bg-white rounded-lg shadow-lg">
            <h2 className="mb-6 font-serif text-2xl text-emerald-800">
              {t.sendWishes}
            </h2>
            <form onSubmit={handleWishSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t.nickname}
                </label>
                <input
                  type="text"
                  value={wishForm.nama}
                  onChange={(e) =>
                    setWishForm({ ...wishForm, nama: e.target.value })
                  }
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t.wishesAndPrayers}
                </label>
                <textarea
                  value={wishForm.wishes}
                  onChange={(e) =>
                    setWishForm({ ...wishForm, wishes: e.target.value })
                  }
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  rows="4"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2 text-white transition-colors rounded-md bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300"
              >
                {isLoading ? t.sending : t.sendWishes}
              </button>
            </form>
          </div>

          {/* Display Wishes */}
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-6 font-serif text-2xl text-emerald-800">
              {t.wishesTitle}
            </h2>
            <div className="space-y-4">
              {wishes.map((wish, index) => (
                <div key={index} className="pb-4 border-b border-gray-200">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 mt-1 text-emerald-600" />
                    <div>
                      <p className="font-semibold text-emerald-800">
                        {wish.nama}
                      </p>
                      <p className="text-gray-600">{wish.wishes}</p>
                      <p className="mt-1 text-sm text-gray-400">
                        {wish.currentTime}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status Message */}
          {submitStatus && (
            <div className="fixed px-4 py-2 text-white rounded-md shadow-lg bottom-4 right-4 bg-emerald-600">
              {submitStatus}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-white bg-emerald-900">
        <div className="container px-4 mx-auto">
          <Heart className="w-8 h-8 mx-auto mb-4 text-emerald-400 animate-pulse" />
          <p className="mb-2">{t.thankYou}</p>
          <p className="text-emerald-400">Mempelai Pria & Mempelai Wanita</p>
        </div>
      </footer>
    </div>
  );
};

export default WeddingInvitation;
