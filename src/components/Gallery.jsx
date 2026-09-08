import React, { useState } from 'react';
import { ZoomIn, X, Film, Image } from 'lucide-react';

export default function Gallery({ gallery, videos }) {
  const [mediaType, setMediaType] = useState('photos'); // 'photos' or 'videos'
  const [selectedCat, setSelectedCat] = useState('All');
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  const categories = ['All', 'Academic', 'Sports', 'Events'];

  const filteredGallery = selectedCat === 'All'
    ? gallery
    : gallery.filter(g => g.category.toLowerCase() === selectedCat.toLowerCase());

  const filteredVideos = selectedCat === 'All'
    ? videos
    : videos.filter(v => v.category.toLowerCase() === selectedCat.toLowerCase());

  return (
    <section id="gallery" className="py-16 bg-slate-50 text-slate-800 font-sans border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <span className="inline-block bg-blue-100 text-blue-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Media Showcase
          </span>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-blue-950 tracking-tight">
            Floating Campus Gallery & Videos
          </h2>
          <p className="text-slate-600 text-xs">
            Gallery photos float dynamically across your screen. Hover to inspect.
          </p>
        </div>

        {/* Media Type Switcher: Photos vs Videos */}
        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={() => setMediaType('photos')}
            className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 uppercase tracking-wider ${
              mediaType === 'photos'
                ? 'bg-blue-950 text-white shadow'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Image className="w-4 h-4 text-amber-500" />
            <span>Photo Gallery ({gallery.length})</span>
          </button>

          <button
            onClick={() => setMediaType('videos')}
            className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 uppercase tracking-wider ${
              mediaType === 'videos'
                ? 'bg-blue-950 text-white shadow'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Film className="w-4 h-4 text-amber-500" />
            <span>Video Gallery ({videos.length})</span>
          </button>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCat === cat
                  ? 'bg-amber-500 text-slate-950 font-black shadow'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photos Floating Showcase Ribbon (NO DUPLICATIONS) */}
        {mediaType === 'photos' && (
          filteredGallery.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-sm">
              No photos found in this category. Staff can upload photos via Admin CMS!
            </div>
          ) : filteredGallery.length <= 4 ? (
            /* Render each gallery item exactly once centered */
            <div className="flex flex-wrap justify-center items-center gap-6 py-6">
              {filteredGallery.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={item.id || idx}
                    onClick={() => setLightboxImage(item)}
                    className={`w-80 shrink-0 bg-white border border-slate-200 rounded-2xl overflow-hidden group cursor-pointer hover:shadow-xl transition-all ${
                      isEven ? 'animate-float-slow' : 'animate-float-reverse'
                    }`}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] font-bold text-amber-700 uppercase">{item.category}</span>
                      <h3 className="font-heading font-bold text-base text-blue-950 truncate">{item.title}</h3>
                      {item.caption && <p className="text-slate-500 text-xs mt-1 truncate">{item.caption}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className="overflow-hidden whitespace-nowrap py-6"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div
                className={`inline-flex gap-8 transition-all ${
                  isPaused ? '' : 'animate-[marquee_26s_linear_infinite]'
                }`}
              >
                {filteredGallery.map((item, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <div
                      key={item.id || idx}
                      onClick={() => setLightboxImage(item)}
                      className={`w-80 shrink-0 bg-white border border-slate-200 rounded-2xl overflow-hidden group cursor-pointer hover:shadow-xl transition-all whitespace-normal ${
                        isEven ? 'animate-float-slow' : 'animate-float-reverse'
                      }`}
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ZoomIn className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div className="p-4">
                        <span className="text-[10px] font-bold text-amber-700 uppercase">{item.category}</span>
                        <h3 className="font-heading font-bold text-base text-blue-950 truncate">{item.title}</h3>
                        {item.caption && <p className="text-slate-500 text-xs mt-1 truncate">{item.caption}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        )}

        {/* Videos Grid */}
        {mediaType === 'videos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all p-4 space-y-3"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-950">
                  {video.videoUrl.includes('youtube') || video.videoUrl.includes('embed') ? (
                    <iframe
                      src={video.videoUrl}
                      title={video.title}
                      className="w-full h-full border-0"
                      allowFullScreen
                    />
                  ) : (
                    <video src={video.videoUrl} controls className="w-full h-full" />
                  )}
                </div>
                <div>
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded">
                    {video.category}
                  </span>
                  <h3 className="font-heading font-bold text-base text-blue-950 mt-1">{video.title}</h3>
                  {video.caption && <p className="text-slate-600 text-xs mt-1">{video.caption}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Photo Lightbox */}
        {lightboxImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
              <button onClick={() => setLightboxImage(null)} className="absolute top-3 right-3 p-1 bg-black/60 text-white rounded-full">
                <X className="w-5 h-5" />
              </button>
              <img src={lightboxImage.image} alt={lightboxImage.title} className="w-full max-h-[70vh] object-contain bg-slate-950" />
              <div className="p-4 bg-white">
                <h3 className="font-heading font-bold text-lg text-blue-950">{lightboxImage.title}</h3>
                {lightboxImage.caption && <p className="text-slate-600 text-xs">{lightboxImage.caption}</p>}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
