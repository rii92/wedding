import React from "react";
import { MapPin, Navigation } from "lucide-react";

const LocationMap = () => {
  // Koordinat lokasi (ganti sesuai lokasi acara)
  const location = {
    akad: {
      name: "Masjid Al-Hidayah",
      address: "Jl. Contoh No. 123, Jakarta Selatan",
      maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4493.730106325823!2d110.58594741103673!3d0.12433016428743206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31fd8e3f3c4d65bb%3A0xe2254b6279d098bf!2sBadan%20Pusat%20Statistik%20Kabupaten%20Sanggau!5e1!3m2!1sen!2sid!4v1734404336559!5m2!1sen!2sid",
      link: "https://maps.app.goo.gl/DJg9WWhKDBUxfu3T6",
    },
    resepsi: {
      name: "Hotel Grand Hyatt",
      address: "Jl. Contoh No. 456, Jakarta Pusat",
      maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4493.730106325823!2d110.58594741103673!3d0.12433016428743206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31fd8e3f3c4d65bb%3A0xe2254b6279d098bf!2sBadan%20Pusat%20Statistik%20Kabupaten%20Sanggau!5e1!3m2!1sen!2sid!4v1734404336559!5m2!1sen!2sid",
      link: "https://maps.app.goo.gl/DJg9WWhKDBUxfu3T6",
    },
  };

  return (
    <div className="container px-4 mx-auto">
      <h2 className="mb-12 font-serif text-3xl text-center text-emerald-800">
        Peta Lokasi
      </h2>

      <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-2">
        {/* Akad Location */}
        <div className="overflow-hidden bg-white rounded-lg shadow-lg">
          <div className="p-6">
            <h3 className="mb-2 font-serif text-2xl text-emerald-800">
              Akad Nikah
            </h3>
            <div className="flex items-start gap-2 mb-4">
              <MapPin className="flex-shrink-0 w-5 h-5 mt-1 text-emerald-600" />
              <div>
                <p className="font-medium text-gray-900">
                  {location.akad.name}
                </p>
                <p className="text-gray-600">{location.akad.address}</p>
              </div>
            </div>
            <div className="mb-4 aspect-w-16 aspect-h-9">
              <iframe
                src={location.akad.maps}
                className="w-full h-64 rounded-lg"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Akad Nikah"
              ></iframe>
            </div>
            <a
              href={location.akad.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700"
            >
              <Navigation className="w-4 h-4" />
              <span>Petunjuk Arah</span>
            </a>
          </div>
        </div>

        {/* Resepsi Location */}
        <div className="overflow-hidden bg-white rounded-lg shadow-lg">
          <div className="p-6">
            <h3 className="mb-2 font-serif text-2xl text-emerald-800">
              Walimatul Ursy
            </h3>
            <div className="flex items-start gap-2 mb-4">
              <MapPin className="flex-shrink-0 w-5 h-5 mt-1 text-emerald-600" />
              <div>
                <p className="font-medium text-gray-900">
                  {location.resepsi.name}
                </p>
                <p className="text-gray-600">{location.resepsi.address}</p>
              </div>
            </div>
            <div className="mb-4 aspect-w-16 aspect-h-9">
              <iframe
                src={location.resepsi.maps}
                className="w-full h-64 rounded-lg"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Resepsi"
              ></iframe>
            </div>
            <a
              href={location.resepsi.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700"
            >
              <Navigation className="w-4 h-4" />
              <span>Petunjuk Arah</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
