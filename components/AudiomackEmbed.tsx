'use client';

export default function AudiomackEmbed() {
  return (
    <div className="w-full relative mt-16 border-t border-white/10 pt-12">
      <div className="flex flex-col gap-4 mb-8 px-6 md:px-0">
         <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">The Sound</h2>
         <span className="text-[10px] tracking-widest text-[#B76E79] uppercase font-bold">Primary Vault (Audiomack)</span>
      </div>
      <div className="w-full px-6 md:px-0">
        <iframe 
           src="https://audiomack.com/embed/kingshadp/album/regal-echoes-olf-god" 
           scrolling="no" 
           width="100%" 
           height="400" 
           frameBorder="0" 
           title="WAIT!"
           className="border border-white/10 bg-black backdrop-blur-md grayscale hover:grayscale-0 hover:brightness-125 transition-all duration-700"
        ></iframe>
      </div>
    </div>
  );
}
