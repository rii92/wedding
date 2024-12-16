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
  Send,
  MessageCircle,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

const WeddingInvitation = () => {
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

  // PRODUCTION
  const audioRef = useRef(new Audio("/wedding/music/background-music.mp3")); // Path relatif ke folder public

  // LOCAL
  // const audioRef = useRef(new Audio("/music/background-music.mp3")); // Path relatif ke folder public

  // Ambil parameter dari URL
  const to = searchParams.get("to") || "Tamu Undangan";

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
        setSubmitStatus("RSVP berhasil dikirim!");
        setRsvpForm({ namaundangan: "", presence: "hadir", jumlah: 1 });
      }
    } catch (error) {
      setSubmitStatus("Gagal mengirim RSVP. Silakan coba lagi.");
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
        setSubmitStatus("Ucapan berhasil dikirim!");
        setWishForm({ namaundangan: "", nama: "", wishes: "" });
        fetchWishes(); // Refresh wishes list
      }
    } catch (error) {
      setSubmitStatus("Gagal mengirim ucapan. Silakan coba lagi.");
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
      // Gunakan Promise untuk handle autoplay policy
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Autoplay started successfully
          })
          .catch((error) => {
            // Autoplay was prevented
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
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </h2>
          <h3 className="mb-4 font-serif text-xl text-emerald-700">
            The Wedding of
          </h3>
          <h1 className="mb-6 font-serif text-4xl font-bold text-emerald-900">
            Daniel & Regina
          </h1>
          <button
            onClick={() => setIsOpen(true)}
            className="relative px-8 py-3 overflow-hidden text-white transition-all rounded-full bg-emerald-600 hover:bg-emerald-700 group"
          >
            <span className="relative z-10">Buka Undangan</span>
            <div className="absolute inset-0 transition-transform origin-left transform scale-x-0 bg-emerald-500 group-hover:scale-x-100"></div>
          </button>
          <p className="mt-4 text-emerald-700">Kepada Yth: {to}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-50">
      <button
        onClick={() => toggleMusic()}
        className="fixed z-50 p-3 transition-transform bg-white rounded-full shadow-lg top-4 right-4 hover:scale-110"
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
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </h2>
          <h2 className="mb-4 font-serif text-2xl">We Are Getting Married</h2>
          <h1 className="mb-6 font-serif text-6xl font-bold">
            Daniel & Regina
          </h1>
          <p className="text-xl">31 December 2024</p>
          <Scroll className="w-8 h-8 mx-auto mt-12 animate-bounce text-white/80" />
        </div>
      </section>

      <section className="relative py-16 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        <div className="container relative z-10 px-4 mx-auto">
          <div className="grid max-w-2xl grid-cols-4 gap-4 mx-auto text-center">
            {[
              { label: "Hari", value: countdown.days },
              { label: "Jam", value: countdown.hours },
              { label: "Menit", value: countdown.minutes },
              { label: "Detik", value: countdown.seconds },
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
                Akad Nikah
              </h3>
              <Calendar className="w-12 h-12 mx-auto mb-4 text-emerald-600" />
              <p className="mb-2">Sabtu, 31 December 2024</p>
              <p className="mb-2">08:00 WIB</p>
              <p className="text-emerald-700">Masjid Al-Hidayah</p>
              <p className="text-emerald-700">Jakarta Selatan</p>
            </div>
            <div className="p-8 text-center transition-transform transform bg-white rounded-lg shadow-lg hover:-translate-y-1">
              <h3 className="mb-4 font-serif text-2xl text-emerald-800">
                Walimatul Ursy
              </h3>
              <MapPin className="w-12 h-12 mx-auto mb-4 text-emerald-600" />
              <p className="mb-2">Sabtu, 31 December 2024</p>
              <p className="mb-2">11:00 - 13:00 WIB</p>
              <p className="text-emerald-700">Hotel Grand Hyatt</p>
              <p className="text-emerald-700">Jakarta Pusat</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 overflow-hidden bg-white">
        <div className="container relative z-10 max-w-2xl px-4 mx-auto text-center">
          <h2 className="mb-8 font-serif text-3xl text-emerald-800">
            Wedding Gift
          </h2>
          <div className="p-8 rounded-lg shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100">
            <Gift className="w-12 h-12 mx-auto mb-4 text-emerald-600" />
            <p className="mb-4 text-emerald-800">
              Doa restu Anda merupakan karunia yang sangat berarti bagi kami.
              Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat
              memberi kado secara cashless.
            </p>
            <div className="space-y-4">
              <div className="p-4 transition-transform transform bg-white rounded hover:-translate-y-1">
                <p className="font-semibold text-emerald-800">Bank BCA</p>
                <p className="text-emerald-700">1234567890</p>
                <p className="text-emerald-700">a.n. Daniel Pratama</p>
              </div>
              <div className="p-4 transition-transform transform bg-white rounded hover:-translate-y-1">
                <p className="font-semibold text-emerald-800">Bank Mandiri</p>
                <p className="text-emerald-700">0987654321</p>
                <p className="text-emerald-700">a.n. Regina Putri</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100">
        <div className="max-w-4xl px-4 py-8 mx-auto">
          {/* RSVP Form */}
          <div className="p-6 mb-12 bg-white rounded-lg shadow-lg">
            <h2 className="mb-6 font-serif text-2xl text-emerald-800">
              Konfirmasi Kehadiran
            </h2>
            <form onSubmit={handleRSVPSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Kehadiran
                </label>
                <select
                  value={rsvpForm.presence}
                  onChange={(e) =>
                    setRsvpForm({ ...rsvpForm, presence: e.target.value })
                  }
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                >
                  <option value="hadir">Hadir</option>
                  <option value="tidak hadir">Tidak Hadir</option>
                </select>
              </div>
              {rsvpForm.presence === "hadir" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Jumlah
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
                {isLoading ? "Mengirim..." : "Kirim RSVP"}
              </button>
            </form>
          </div>

          {/* Wishes Form */}
          <div className="p-6 mb-12 bg-white rounded-lg shadow-lg">
            <h2 className="mb-6 font-serif text-2xl text-emerald-800">
              Kirim Ucapan
            </h2>
            <form onSubmit={handleWishSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nama Panggilan
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
                  Ucapan & Doa
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
                {isLoading ? "Mengirim..." : "Kirim Ucapan"}
              </button>
            </form>
          </div>

          {/* Display Wishes */}
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-6 font-serif text-2xl text-emerald-800">
              Ucapan & Doa
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

      <footer className="py-8 text-center text-white bg-emerald-900">
        <div className="container px-4 mx-auto">
          <Heart className="w-8 h-8 mx-auto mb-4 text-emerald-400 animate-pulse" />
          <p className="mb-2">Thank you for being part of our special day</p>
          <p className="text-emerald-400">Daniel & Regina</p>
        </div>
      </footer>
    </div>
  );
};

export default WeddingInvitation;
