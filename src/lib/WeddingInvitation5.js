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

// Palet warna tema undangan
const theme = {
  primary: "text-yellow-700",
  accent: "text-yellow-600",
  bgGradient: "bg-gradient-to-br from-white via-amber-50 to-yellow-50",
  button:
    "bg-yellow-600 hover:bg-yellow-700 text-white transition-colors rounded-full",
};

// Translation
const translations = {
  id: {
    openInvitation: "Buka Undangan",
    weddingOf: "The Wedding of",
    dear: "Kepada Yth",
    weAreGettingMarried: "Kami Menikah",
    days: "Hari",
    hours: "Jam",
    minutes: "Menit",
    seconds: "Detik",
    akadNikah: "Akad Nikah",
    walimatulUrsy: "Resepsi Pernikahan",
    directions: "Petunjuk Arah",
    weddingGift: "Hadiah Pernikahan",
    giftMessage:
      "Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Jika memberi adalah tanda kasih, Anda dapat memberi kado secara cashless.",
    bank: "Bank",
    accountHolder: "a.n.",
    invitationCode: "Kode Undangan",
    saveCode: "Simpan kode ini untuk RSVP",
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
};

const WeddingInvitation5 = () => {
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [language] = useState("id");
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const t = translations[language];
  const invitationCode = searchParams.get("code") || "GUEST00";
  const to = searchParams.get("to") || t.dear;

  const audioRef = useRef(new Audio("/wedding/music/background-music.mp3"));

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = 0.5;

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

    return () => clearInterval(timer);
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  if (!isOpen) {
    return (
      <div
        className={`flex items-center justify-center h-screen ${theme.bgGradient}`}
      >
        <div className="relative p-12 text-center bg-white shadow-lg rounded-xl">
          <Moon className="w-16 h-16 mx-auto mb-6 text-yellow-600 animate-bounce" />
          <h2 className="mb-4 font-serif text-2xl text-gray-700">
            بِسْــمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
          </h2>
          <h3 className="mb-4 font-serif text-xl text-yellow-700">
            {t.weddingOf}
          </h3>
          <h1 className="mb-6 font-serif text-4xl font-bold text-gray-900">
            Andra & Victoria
          </h1>
          <button
            onClick={() => setIsOpen(true)}
            className="px-8 py-3 font-medium text-white bg-yellow-600 rounded-full shadow-md hover:bg-yellow-700"
          >
            {t.openInvitation}
          </button>
          <p className="mt-4 text-gray-600">
            {t.dear}: {to}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Musik Button */}
      <button
        onClick={() => toggleMusic()}
        className="fixed z-50 p-3 bg-white rounded-full shadow-md bottom-4 right-4"
      >
        {isPlaying ? (
          <Volume2 size={24} className="text-yellow-600" />
        ) : (
          <VolumeX size={24} className="text-yellow-600" />
        )}
      </button>

      {/* Hero */}
      <section
        className={`relative flex items-center justify-center min-h-screen ${theme.bgGradient}`}
      >
        <div className="text-center">
          <h2 className="mb-4 font-serif text-2xl text-gray-700">
            بِسْــمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
          </h2>
          <h2 className="mb-4 font-serif text-2xl text-yellow-700">
            {t.weAreGettingMarried}
          </h2>
          <h1 className="mb-6 font-serif text-6xl font-bold text-gray-900">
            Andra <span className="text-yellow-700">&</span> Victoria
          </h1>
          <p className="text-xl text-gray-700">
            Senin, 16 Desember 2024 | 10:00 WIB
          </p>
          <Scroll className="w-8 h-8 mx-auto mt-12 text-yellow-600 animate-bounce" />
        </div>
      </section>

      {/* Countdown */}
      <section className="py-16 bg-white">
        <div className="grid max-w-2xl grid-cols-4 gap-4 mx-auto text-center">
          {[
            { label: t.days, value: countdown.days },
            { label: t.hours, value: countdown.hours },
            { label: t.minutes, value: countdown.minutes },
            { label: t.seconds, value: countdown.seconds },
          ].map((item) => (
            <div
              key={item.label}
              className="p-4 rounded-lg shadow-sm bg-yellow-50"
            >
              <div className="text-3xl font-bold text-yellow-700">
                {item.value}
              </div>
              <div className="text-gray-700">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Akad & Resepsi */}
      <section className="py-16 bg-gradient-to-br from-white to-yellow-50">
        <div className="grid max-w-4xl gap-8 mx-auto md:grid-cols-2">
          <div className="p-8 text-center bg-white shadow-lg rounded-xl">
            <h3 className="mb-4 font-serif text-2xl text-yellow-700">
              {t.akadNikah}
            </h3>
            <Calendar className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
            <p className="mb-2">Senin, 16 Desember 2024</p>
            <p className="mb-2">08:00 WIB</p>
            <p className="text-gray-700">Masjid Al-Hidayah, Jakarta</p>
            <a
              href="https://maps.app.goo.gl/DJg9WWhKDBUxfu3T6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 mt-4 text-white bg-yellow-600 rounded-lg hover:bg-yellow-700"
            >
              <Navigation className="w-4 h-4" />
              {t.directions}
            </a>
          </div>

          <div className="p-8 text-center bg-white shadow-lg rounded-xl">
            <h3 className="mb-4 font-serif text-2xl text-yellow-700">
              {t.walimatulUrsy}
            </h3>
            <MapPin className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
            <p className="mb-2">Senin, 16 Desember 2024</p>
            <p className="mb-2">11:00 - 13:00 WIB</p>
            <p className="text-gray-700">Hotel Grand Hyatt, Jakarta</p>
            <a
              href="https://maps.app.goo.gl/DJg9WWhKDBUxfu3T6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 mt-4 text-white bg-yellow-600 rounded-lg hover:bg-yellow-700"
            >
              <Navigation className="w-4 h-4" />
              {t.directions}
            </a>
          </div>
        </div>
      </section>

      {/* Gift */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="mb-8 font-serif text-3xl text-yellow-700">
            {t.weddingGift}
          </h2>
          <div className="p-8 shadow-md bg-yellow-50 rounded-xl">
            <Gift className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
            <p className="mb-4 text-gray-700">{t.giftMessage}</p>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded shadow">
                <p className="font-semibold text-yellow-700">{t.bank} BCA</p>
                <p className="text-gray-700">1234567890</p>
                <p className="text-gray-700">{t.accountHolder} Andra</p>
              </div>
              <div className="p-4 bg-white rounded shadow">
                <p className="font-semibold text-yellow-700">{t.bank} Mandiri</p>
                <p className="text-gray-700">0987654321</p>
                <p className="text-gray-700">{t.accountHolder} Victoria</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-white bg-yellow-700">
        <Heart className="w-8 h-8 mx-auto mb-4 animate-pulse" />
        <p className="mb-2">{t.thankYou}</p>
        <p className="text-yellow-200">Andra & Victoria</p>
      </footer>
    </div>
  );
};

export default WeddingInvitation5;
