import React, { useCallback, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array foto-foto gallery
  const photos = [
    {
      id: 1,
      src: "wedding/images/1.jpg", // Ganti dengan path foto Anda
      caption: "First Date"
    },
    {
      id: 2,
      src: "wedding/images/2.jpg",
      caption: "The Proposal"
    },
    {
      id: 3,
      src: "wedding/images/3.jpg",
      caption: "Engagement Day"
    },
    {
      id: 4,
      src: "wedding/images/4.jpg",
      caption: "Pre-Wedding"
    },
    // Tambahkan foto lainnya sesuai kebutuhan
  ];

  // Handle membuka modal
  const openModal = (photo, index) => {
    setSelectedImage(photo);
    setCurrentIndex(index);
  };

  // Handle menutup modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  // Handle navigasi foto
  const navigate = useCallback((direction) => {
    const lastIndex = photos.length - 1;
    let newIndex;

    if (direction === 'next') {
      newIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    }

    setCurrentIndex(newIndex);
    setSelectedImage(photos[newIndex]);
  });

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeydown = (e) => {
      if (!selectedImage) return;

      switch (e.key) {
        case 'ArrowRight':
          navigate('next');
          break;
        case 'ArrowLeft':
          navigate('prev');
          break;
        case 'Escape':
          closeModal();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [selectedImage, currentIndex, navigate]);

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <h2 className="mb-12 font-serif text-3xl text-center text-emerald-800">
          Galeri Foto
        </h2>

        {/* Grid Gallery */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="relative overflow-hidden rounded-lg cursor-pointer aspect-square group"
              onClick={() => openModal(photo, index)}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end transition-opacity duration-300 bg-black bg-opacity-0 group-hover:bg-opacity-30">
                <p className="p-4 text-white transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
            <button
              onClick={closeModal}
              className="absolute text-white top-4 right-4 hover:text-gray-300"
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigate('prev')}
              className="absolute text-white left-4 hover:text-gray-300"
            >
              <ChevronLeft size={40} />
            </button>
            
            <button
              onClick={() => navigate('next')}
              className="absolute text-white right-4 hover:text-gray-300"
            >
              <ChevronRight size={40} />
            </button>

            {/* Image Container */}
            <div className="w-full max-w-4xl mx-4">
              <img
                src={selectedImage.src}
                alt={selectedImage.caption}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <p className="mt-4 text-center text-white">{selectedImage.caption}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotoGallery;