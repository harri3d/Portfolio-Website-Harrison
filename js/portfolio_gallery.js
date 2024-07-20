import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

const images = [
  { src: '/api/placeholder/800/600', alt: 'Project Image 1' },
  { src: '/api/placeholder/800/600', alt: 'Project Image 2' },
  { src: '/api/placeholder/800/600', alt: 'Project Image 3' },
  { src: '/api/placeholder/800/600', alt: 'Project Image 4' },
];

const LightboxGallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const lightboxRef = useRef(null);

  const openLightbox = (index, event) => {
    setCurrentImageIndex(index);
    setClickPosition({ x: event.clientX, y: event.clientY });
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    if (lightboxRef.current) {
      const animation = lightboxRef.current.animate([
        { transform: 'scale(1)', opacity: 1 },
        { transform: 'scale(0.9)', opacity: 0 }
      ], {
        duration: 300,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards'
      });
      
      animation.onfinish = () => setLightboxOpen(false);
    } else {
      setLightboxOpen(false);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (lightboxOpen && lightboxRef.current) {
      lightboxRef.current.animate([
        {
          transform: `translate(${clickPosition.x - window.innerWidth / 2}px, ${clickPosition.y - window.innerHeight / 2}px) scale(0.5)`,
          opacity: 0
        },
        {
          transform: 'translate(0, 0) scale(1)',
          opacity: 1
        }
      ], {
        duration: 400,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Custom easing for a more dynamic feel
        fill: 'forwards'
      });
    }
  }, [lightboxOpen, clickPosition]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Project Gallery</h2>
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden cursor-pointer group"
            onClick={(e) => openLightbox(index, e)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto transition-all duration-300 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
              <span className="text-white text-lg font-bold">View</span>
            </div>
          </div>
        ))}
      </div>
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div ref={lightboxRef} className="relative">
            <img
              src={images[currentImageIndex].src}
              alt={images[currentImageIndex].alt}
              className="max-w-full max-h-[90vh]"
            />
            <button
              className="absolute top-2 right-2 text-white transition-transform duration-200 ease-out hover:scale-110"
              onClick={closeLightbox}
            >
              <X size={24} />
            </button>
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-4xl transition-transform duration-200 ease-out hover:scale-110"
              onClick={prevImage}
            >
              ‹
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-4xl transition-transform duration-200 ease-out hover:scale-110"
              onClick={nextImage}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LightboxGallery;