import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  name: string;
}

const ImageGallery = ({ images, name }: ImageGalleryProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-6">
      <div className="col-span-2 aspect-video">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 col-span-2">
        {images.slice(1).map((image, index) => (
          <div key={index} className="aspect-video">
            <img
              src={image}
              alt={`${name} view ${index + 2}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;