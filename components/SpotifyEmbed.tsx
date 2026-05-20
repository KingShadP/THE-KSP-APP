'use client';

export default function SpotifyEmbed() {
  return (
    <div className="w-full relative mt-16 border-t border-white/10 pt-12">
      <div className="flex flex-col gap-4 mb-8 px-6 md:px-0">
         <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">The Standard</h2>
         <span className="text-[10px] tracking-widest text-[#B76E79] uppercase font-bold">Secondary Vault (Spotify)</span>
      </div>
      <div className="w-full px-6 md:px-0">
        <iframe 
           data-testid="embed-iframe" 
           style={{ borderRadius: '12px' }} 
           src="https://open.spotify.com/embed/artist/7ElnjDMg4TCtoXJPv8nRQS?utm_source=generator&theme=0" 
           width="100%" 
           height="352" 
           frameBorder="0" 
           allowFullScreen 
           allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
           loading="lazy"
           className="border border-white/10 bg-black backdrop-blur-md grayscale hover:grayscale-0 hover:brightness-125 transition-all duration-700"
        ></iframe>
      </div>
    </div>
  );
}
