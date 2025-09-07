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
  Sun,
  Navigation,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

// 🎉 Translation
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

const WeddingInvitation5 = () => {
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [language, setLanguage] = useState("id");
  const [darkMode, setDarkMode] = useState(false);

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const t = translations[language];
  const invitationCode = searchParams.get("code") || "GUEST00";
  const audioRef = useRef(new Audio("/wedding/music/background-music.mp3"));
  const to = searchParams.get("to") || t.dear;

  const [rsvpForm, setRsvpForm] = useState({
    namaundangan: to,
    presence: "hadir",
    jumlah: 1,
    kodeUndangan: invitationCode,
  });

  const [wishForm, setWishForm] = useState({
    namaundangan: to,
    nama: "",
    wishes: "",
    kodeUndangan: invitationCode,
  });

  const [wishes, setWishes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const API_URL =
    "https://script.google.com/macros/s/AKfycbyv-EaT5dfuu5og4gy0vxBMpYah0-RFqdWu9kEzq3jZjs4xLU7lh-WTVNx8s23l_2kY/exec";

  // RSVP submit
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
    } catch {
      setSubmitStatus(t.rsvpFailed);
    }
    setIsLoading(false);
  };

  // Wishes submit
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
        fetchWishes();
      } else {
        setSubmitStatus(t.wishFailed);
      }
    } catch {
      setSubmitStatus(t.wishFailed);
    }
    setIsLoading(false);
  };

  // Fetch wishes
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

  // Countdown
  useEffect(() => {
    fetchWishes();

    const weddingDate = new Date("2025-12-16T10:00:00");
    const timer = setInterval(() => {
      const now = new Date();
      const diff = weddingDate - now;
      setCountdown({
        days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24)),
        minutes: Math.max(0, Math.floor((diff / 1000 / 60) % 60)),
        seconds: Math.max(0, Math.floor((diff / 1000) % 60)),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Music control
  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => setIsPlaying(false));
      }
    }
    setIsPlaying(!isPlaying);
  };

  // Dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Language Switcher
  const LanguageSwitcher = () => (
    <div className="fixed z-50 flex p-1 bg-white rounded-full shadow-lg top-4 right-4">
      <button
        onClick={() => setLanguage("id")}
        className={`px-3 py-1 rounded-full ${
          language === "id" ? "bg-amber-600 text-white" : "text-amber-600"
        }`}
      >
        ID
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1 rounded-full ${
          language === "en" ? "bg-amber-600 text-white" : "text-amber-600"
        }`}
      >
        EN
      </button>
    </div>
  );

  // 🌸 Petals falling effect
  useEffect(() => {
    const createPetal = () => {
      const petal = document.createElement("div");
      petal.className = "petal";
      petal.style.left = Math.random() * 100 + "vw";
      petal.style.animationDuration = 5 + Math.random() * 5 + "s";
      document.body.appendChild(petal);
      setTimeout(() => petal.remove(), 10000);
    };
    if (isOpen) {
      const interval = setInterval(createPetal, 800);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  // 🖼️ Splash Screen
  if (!isOpen) {
    return (
      <div className="relative flex items-center justify-center h-screen bg-gradient-to-br from-white to-amber-50 dark:from-gray-900 dark:to-gray-800">
        <div className="relative p-12 text-center rounded-lg shadow-xl bg-white/90 dark:bg-gray-900/80">
          <Moon className="w-16 h-16 mx-auto mb-6 text-amber-600 animate-bounce" />
          <h2 className="mb-4 font-serif text-2xl text-amber-600">
            بِسْ‌ اللَّ‌ الرَّحْ‌ الرَّحِيم
          </h2>
          <h3 className="mb-4 font-serif text-xl text-yellow-600">
            {t.weddingOf}
          </h3>
          <h1 className="mb-6 font-serif text-4xl font-bold text-gray-800 dark:text-white">
            Mempelai Pria & Mempelai Wanita
          </h1>
          <button
            onClick={() => {
              setIsOpen(true);
              toggleMusic();
            }}
            className="px-8 py-3 text-white rounded-full bg-amber-600 hover:bg-amber-700"
          >
            {t.openInvitation}
          </button>
          <p className="mt-4 text-stone-700 dark:text-gray-300">
            {t.dear}: {to}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-br from-white to-amber-50 text-gray-800"
      }`}
    >
      <LanguageSwitcher />

      {/* 🎶 Music + Dark Mode Button */}
      <div className="fixed z-50 flex flex-col gap-3 bottom-4 right-4">
        <button
          onClick={toggleMusic}
          className="p-3 bg-white rounded-full shadow-lg"
        >
          {isPlaying ? (
            <Volume2 size={24} className="text-amber-600" />
          ) : (
            <VolumeX size={24} className="text-amber-600" />
          )}
        </button>
        <button
          onClick={toggleDarkMode}
          className="p-3 bg-white rounded-full shadow-lg"
        >
          {darkMode ? (
            <Sun size={24} className="text-yellow-500" />
          ) : (
            <Moon size={24} className="text-amber-600" />
          )}
        </button>
      </div>

      {/* ✨ Header */}
      <section className="relative flex items-center justify-center min-h-screen text-center animate-fadeIn">
        <div className="relative z-10">
          <Moon className="w-16 h-16 mx-auto mb-6 text-amber-600 animate-pulse" />
          <h2 className="mb-4 font-serif text-2xl text-amber-600">
            بِسْ‌ اللَّ‌ الرَّحْ‌ الرَّحِيم
          </h2>
          <h2 className="mb-4 font-serif text-2xl text-yellow-600">
            {t.weAreGettingMarried}
          </h2>
          <h1 className="mb-6 font-serif text-6xl font-bold">
            Mempelai Pria & Mempelai Wanita
          </h1>
          <Scroll className="w-8 h-8 mx-auto mt-12 text-amber-500 animate-bounce" />
        </div>
      </section>

      {/* Countdown */}
      <section
        id="countdown"
        className={`py-16 transition-colors duration-500 ${
          darkMode ? "bg-gray-900 text-white" : "bg-yellow-50 text-gray-800"
        }`}
      >
        <div className="grid max-w-2xl grid-cols-4 gap-4 mx-auto text-center">
          {[
            { label: t.days, value: countdown.days },
            { label: t.hours, value: countdown.hours },
            { label: t.minutes, value: countdown.minutes },
            { label: t.seconds, value: countdown.seconds },
          ].map((item) => (
            <div
              key={item.label}
              className={`p-4 rounded-lg shadow-lg transition-colors ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              }`}
            >
              <div className="text-3xl font-bold text-amber-500">
                {item.value}
              </div>
              <div>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Ayat Section */}
      <section
        className={`relative py-16 text-center transition-colors duration-500 ${
          darkMode
            ? "bg-gray-900 text-gray-100"
            : "bg-gradient-to-b from-white to-amber-50 text-gray-800"
        }`}
      >
        {/* Background floral overlay */}
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-10"
          style={{
            backgroundImage: "url('https://i.ibb.co/jLtQb0g/floral-bg.png')", // ganti dengan asset floral milikmu
          }}
        ></div>

        <div className="relative z-10 max-w-3xl px-6 mx-auto">
          <blockquote className="italic leading-relaxed">
            “Wahai manusia, bertakwalah kepada Tuhanmu yang telah menciptakanmu
            dari diri yang satu (Adam) dan Dia menciptakan darinya pasangannya
            (Hawa). Dari keduanya Allah memperkembangbiakkan laki-laki dan
            perempuan yang banyak. Bertakwalah kepada Allah yang dengan nama-Nya
            kamu saling meminta dan (peliharalah) hubungan kekeluargaan.
            Sesungguhnya Allah selalu menjaga dan mengawasimu”
          </blockquote>

          <p
            className={`mt-6 font-semibold ${
              darkMode ? "text-amber-400" : "text-amber-700"
            }`}
          >
            (Q.S An Nisa : 19)
          </p>
        </div>
      </section>

      {/* Bride & Groom Section */}
<section
  className={`relative py-16 transition-colors duration-500 ${
    darkMode
      ? "bg-gray-900 text-gray-100"
      : "bg-gradient-to-b from-white to-amber-50 text-gray-800"
  }`}
>
  <div className="max-w-5xl px-6 mx-auto text-center">
    {/* Header */}
    <h3 className="mb-4 text-lg italic text-gray-600 dark:text-gray-300">
      Bride & Groom
    </h3>
    <p className="mb-12 text-lg leading-relaxed">
      Maha suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan,
      dengan ini kami sampaikan pelabuhan terakhir kami
    </p>

    {/* Grid Bride & Groom */}
    <div className="grid items-start gap-12 md:grid-cols-2">
      {/* Bride */}
      <div className="flex flex-col items-center text-center">
        <img
          src="/wedding/images/bride.png" // ganti dengan asset mempelai wanita
          alt="Mempelai Wanita"
          className="w-56 h-auto mx-auto mb-6"
        />
        <h2
          className={`text-2xl font-bold font-serif ${
            darkMode ? "text-amber-400" : "text-amber-700"
          }`}
        >
          [Mempelai Perempuan]
        </h2>
        <p className="mt-2 text-sm leading-relaxed">
          Putri Pertama dari : <br />
          Bapak [Mempelai Perempuan] <br /> & <br /> Ibu [Mempelai Perempuan]
        </p>
      </div>

      {/* Groom */}
      <div className="flex flex-col items-center text-center">
        <img
          src="/wedding/images/groom.png" // ganti dengan asset mempelai pria
          alt="Mempelai Pria"
          className="w-56 h-auto mx-auto mb-6"
        />
        <h2
          className={`text-2xl font-bold font-serif ${
            darkMode ? "text-amber-400" : "text-amber-700"
          }`}
        >
          [Nama Mempelai Pria]
        </h2>
        <p className="mt-2 text-sm leading-relaxed">
          Putra Pertama dari : <br />
          [Nama Ayah Pria] <br /> & <br /> [Nama Ibu Pria]
        </p>
      </div>
    </div>
  </div>
</section>


      {/* Akad Nikah dan Resepsi */}
      <section
        className={`relative py-16 transition-colors duration-500 ${
          darkMode
            ? "bg-gray-900 text-white"
            : "bg-gradient-to-br from-amber-50 to-yellow-100 text-gray-800"
        }`}
      >
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        <div className="container relative z-10 max-w-4xl px-4 mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Akad Nikah */}
            <div
              className={`p-8 text-center transition-transform transform rounded-lg shadow-lg hover:-translate-y-1 ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              }`}
            >
              <h3 className="mb-4 font-serif text-2xl text-amber-600">
                {t.akadNikah}
              </h3>
              <Calendar className="w-12 h-12 mx-auto mb-4 text-amber-500" />
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
              <p className="text-amber-500">Masjid Al-Hidayah</p>
              <p className="mb-2 text-amber-500">Jakarta Selatan</p>
              <a
                href={"https://maps.app.goo.gl/DJg9WWhKDBUxfu3T6"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 text-white transition-colors rounded-lg bg-amber-600 hover:bg-amber-700"
              >
                <Navigation className="w-4 h-4" />
                <span>{t.directions}</span>
              </a>
            </div>

            {/* Resepsi */}
            <div
              className={`p-8 text-center transition-transform transform rounded-lg shadow-lg hover:-translate-y-1 ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              }`}
            >
              <h3 className="mb-4 font-serif text-2xl text-amber-600">
                {t.walimatulUrsy}
              </h3>
              <MapPin className="w-12 h-12 mx-auto mb-4 text-amber-500" />
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
              <p className="text-amber-500">Hotel Grand Hyatt</p>
              <p className="mb-2 text-amber-500">Jakarta Pusat</p>
              <a
                href={"https://maps.app.goo.gl/DJg9WWhKDBUxfu3T6"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 text-white transition-colors rounded-lg bg-amber-600 hover:bg-amber-700"
              >
                <Navigation className="w-4 h-4" />
                <span>{t.directions}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gift Section */}
      <section
        className={`relative py-16 transition-colors duration-500 ${
          darkMode
            ? "bg-gray-900 text-white"
            : "bg-gradient-to-br from-amber-50 to-yellow-100"
        }`}
      >
        <div className="container relative z-10 max-w-2xl px-4 mx-auto text-center">
          <h2 className="mb-8 font-serif text-3xl text-amber-600">
            {t.weddingGift}
          </h2>
          <div
            className={`p-8 rounded-lg shadow-lg ${
              darkMode
                ? "bg-gray-800 text-white"
                : "bg-gradient-to-br from-amber-50 to-yellow-100"
            }`}
          >
            <Gift className="w-12 h-12 mx-auto mb-4 text-amber-600" />
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              {t.giftMessage}
            </p>
            <div className="space-y-4">
              <div
                className={`p-4 transition-transform transform rounded shadow ${
                  darkMode
                    ? "bg-gray-700 text-gray-200"
                    : "bg-white text-gray-800"
                } hover:-translate-y-1`}
              >
                <p className="font-semibold text-amber-800 dark:text-amber-400">
                  {t.bank} BCA
                </p>
                <p className="text-amber-700 dark:text-gray-300">1234567890</p>
                <p className="text-amber-700 dark:text-gray-400">
                  {t.accountHolder} Mempelai Pria Pratama
                </p>
              </div>
              <div
                className={`p-4 transition-transform transform rounded shadow ${
                  darkMode
                    ? "bg-gray-700 text-gray-200"
                    : "bg-white text-gray-800"
                } hover:-translate-y-1`}
              >
                <p className="font-semibold text-amber-800 dark:text-amber-400">
                  {t.bank} Mandiri
                </p>
                <p className="text-amber-700 dark:text-gray-300">0987654321</p>
                <p className="text-amber-700 dark:text-gray-400">
                  {t.accountHolder} Mempelai Wanita Putri
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP and Wishes Section */}
      <section
        className={`relative py-16 overflow-hidden transition-colors duration-500 ${
          darkMode
            ? "bg-gray-900 text-gray-100"
            : "bg-gradient-to-br from-amber-50 to-yellow-100 text-gray-900"
        }`}
      >
        <div className="max-w-4xl px-4 py-8 mx-auto">
          {/* RSVP Form */}
          <div
            className={`p-6 mb-12 rounded-lg shadow-lg ${
              darkMode
                ? "bg-gray-800 text-gray-100 border border-gray-700"
                : "bg-white text-gray-800 border border-gray-200"
            }`}
          >
            <h2
              className={`mb-6 font-serif text-2xl font-semibold ${
                darkMode ? "text-amber-400" : "text-amber-600"
              }`}
            >
              {t.rsvp}
            </h2>

            <form onSubmit={handleRSVPSubmit} className="space-y-6">
              {/* Kehadiran */}
              <div className="space-y-2">
                <label
                  className={`block text-sm font-semibold ${
                    darkMode ? "text-amber-300" : "text-amber-700"
                  }`}
                >
                  {t.presence}
                </label>
                <select
                  value={rsvpForm.presence}
                  onChange={(e) =>
                    setRsvpForm({ ...rsvpForm, presence: e.target.value })
                  }
                  className={`block w-full px-3 py-2 mt-1 rounded-lg shadow-sm focus:outline-none
              ${
                darkMode
                  ? "bg-gray-700 border border-gray-600 text-gray-100 focus:border-amber-400 focus:ring-amber-400"
                  : "bg-white border border-gray-300 text-gray-800 focus:border-amber-500 focus:ring-amber-500"
              }`}
                >
                  <option value="hadir">{t.attend}</option>
                  <option value="tidak hadir">{t.notAttend}</option>
                </select>
              </div>

              {/* Jumlah Tamu */}
              {rsvpForm.presence === "hadir" && (
                <div className="space-y-2">
                  <label
                    className={`block text-sm font-semibold ${
                      darkMode ? "text-amber-300" : "text-amber-700"
                    }`}
                  >
                    {t.numberOfGuests}
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder={t.enterGuests}
                    value={rsvpForm.jumlah}
                    onChange={(e) =>
                      setRsvpForm({
                        ...rsvpForm,
                        jumlah: parseInt(e.target.value),
                      })
                    }
                    className={`block w-full px-3 py-2 mt-1 rounded-lg shadow-sm focus:outline-none
                ${
                  darkMode
                    ? "bg-gray-700 border border-gray-600 text-gray-100 focus:border-amber-400 focus:ring-amber-400"
                    : "bg-white border border-gray-300 text-gray-800 focus:border-amber-500 focus:ring-amber-500"
                }`}
                  />
                </div>
              )}

              {/* Tombol Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 text-lg font-medium text-white transition-colors rounded-lg bg-amber-600 hover:bg-amber-700 disabled:bg-amber-300"
              >
                {isLoading ? t.sending : t.sendRSVP}
              </button>
            </form>
          </div>

          {/* Wishes Form */}
          <div
            className={`p-6 mb-12 rounded-lg shadow-lg ${
              darkMode
                ? "bg-gray-800 text-gray-100 border border-gray-700"
                : "bg-white text-gray-800 border border-gray-200"
            }`}
          >
            <h2
              className={`mb-6 font-serif text-2xl font-semibold ${
                darkMode ? "text-amber-400" : "text-amber-600"
              }`}
            >
              {t.sendWishes}
            </h2>

            <form onSubmit={handleWishSubmit} className="space-y-6">
              {/* Nama */}
              <div className="space-y-2">
                <label
                  className={`block text-sm font-semibold ${
                    darkMode ? "text-amber-300" : "text-amber-700"
                  }`}
                >
                  {t.nickname}
                </label>
                <input
                  type="text"
                  placeholder={t.enterYourName}
                  value={wishForm.nama}
                  onChange={(e) =>
                    setWishForm({ ...wishForm, nama: e.target.value })
                  }
                  required
                  className={`block w-full px-3 py-2 mt-1 rounded-lg shadow-sm focus:outline-none
              ${
                darkMode
                  ? "bg-gray-700 border border-gray-600 text-gray-100 focus:border-amber-400 focus:ring-amber-400"
                  : "bg-white border border-gray-300 text-gray-800 focus:border-amber-500 focus:ring-amber-500"
              }`}
                />
              </div>

              {/* Pesan */}
              <div className="space-y-2">
                <label
                  className={`block text-sm font-semibold ${
                    darkMode ? "text-amber-300" : "text-amber-700"
                  }`}
                >
                  {t.wishesAndPrayers}
                </label>
                <textarea
                  placeholder={t.writeYourWishes}
                  value={wishForm.wishes}
                  onChange={(e) =>
                    setWishForm({ ...wishForm, wishes: e.target.value })
                  }
                  rows="4"
                  required
                  className={`block w-full px-3 py-2 mt-1 rounded-lg shadow-sm focus:outline-none
              ${
                darkMode
                  ? "bg-gray-700 border border-gray-600 text-gray-100 focus:border-amber-400 focus:ring-amber-400"
                  : "bg-white border border-gray-300 text-gray-800 focus:border-amber-500 focus:ring-amber-500"
              }`}
                />
              </div>

              {/* Tombol Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 text-lg font-medium text-white transition-colors rounded-lg bg-amber-600 hover:bg-amber-700 disabled:bg-amber-300"
              >
                {isLoading ? t.sending : t.sendWishes}
              </button>
            </form>
          </div>

          {/* Display Wishes */}
          <div
            className={`p-6 rounded-lg shadow-lg ${
              darkMode
                ? "bg-gray-800 text-gray-100 border border-gray-700"
                : "bg-white text-gray-800 border border-gray-200"
            }`}
          >
            <h2
              className={`mb-6 font-serif text-2xl font-semibold ${
                darkMode ? "text-amber-400" : "text-amber-600"
              }`}
            >
              {t.wishesTitle}
            </h2>
            <div className="space-y-4">
              {wishes.map((wish, index) => (
                <div
                  key={index}
                  className={`pb-4 border-b ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 mt-1 text-amber-600" />
                    <div>
                      <p
                        className={`${
                          darkMode ? "text-amber-400" : "text-amber-800"
                        } font-semibold`}
                      >
                        {wish.nama}
                      </p>
                      <p
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {wish.wishes}
                      </p>
                      <p
                        className={`${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        } mt-1 text-sm`}
                      >
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
            <div className="fixed px-4 py-2 text-white rounded-md shadow-lg bottom-4 right-4 bg-amber-600">
              {submitStatus}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-8 text-center transition-colors duration-500 ${
          darkMode
            ? "bg-gray-900 text-gray-300"
            : "bg-gradient-to-br from-yellow-100 to-amber-200 text-gray-700"
        }`}
      >
        <Heart className="w-8 h-8 mx-auto mb-2 text-amber-600 animate-pulse" />
        <p className="mb-2">{t.thankYou}</p>
        <p className="font-serif text-amber-600">
          Mempelai Pria & Mempelai Wanita
        </p>
      </footer>
    </div>
  );
};

export default WeddingInvitation5;
