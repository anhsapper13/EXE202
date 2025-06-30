'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  quality?: number;
  onLoad?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes = '100vw',
  priority = false,
  className = '',
  objectFit = 'cover',
  quality = 75,
  onLoad,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [networkQuality, setNetworkQuality] = useState<string>('unknown');
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Handle network quality detection
  useEffect(() => {
    if ('connection' in navigator && (navigator as any).connection) {
      setNetworkQuality((navigator as any).connection.effectiveType);

      const updateConnectionType = () => {
        setNetworkQuality((navigator as any).connection.effectiveType);
      };

      (navigator as any).connection.addEventListener('change', updateConnectionType);

      return () => {
        (navigator as any).connection.removeEventListener('change', updateConnectionType);
      };
    }
  }, []);

  // Check if image is already loaded (e.g., cached)
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setLoaded(true);
    }
  }, []);

  // Adjust quality based on network
  const getAdaptiveQuality = (): number => {
    if (networkQuality === '4g') return quality;
    if (networkQuality === '3g') return Math.min(quality, 60);
    if (networkQuality === '2g') return Math.min(quality, 40);
    if (networkQuality === 'slow-2g') return Math.min(quality, 30);
    return quality; // Default or unknown
  };

  const handleImageLoad = () => {
    setLoaded(true);
    if (onLoad) onLoad();
  };

  const handleImageError = () => {
    setError(true);
  };

  const placeholderClasses = `
    bg-gray-200 dark:bg-gray-700
    ${loaded || error ? 'hidden' : 'animate-pulse'}
    absolute inset-0 transition-opacity duration-300
  `;

  const errorClasses = `
    bg-gray-100 dark:bg-gray-800 flex items-center justify-center
    ${error ? 'opacity-100' : 'opacity-0'}
    absolute inset-0 transition-opacity duration-300
  `;

  return (
    <div className={`relative overflow-hidden ${fill ? 'w-full h-full' : ''}`} style={!fill ? { width, height } : undefined}>
      <div className={placeholderClasses} />

      {/* Error state */}
      {error && (
        <div className={errorClasses}>
          <span className="text-gray-400 dark:text-gray-500 text-sm">Không thể tải hình ảnh</span>
        </div>
      )}

      {/* Actual image */}
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        sizes={sizes}
        priority={priority}
        quality={getAdaptiveQuality()}
        loading={priority ? 'eager' : 'lazy'}
        className={`
          transition-opacity duration-300
          ${loaded ? 'opacity-100' : 'opacity-0'}
          ${error ? 'hidden' : 'block'}
          ${className}
        `}
        style={{ objectFit }}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
};

export default LazyImage;