'use client';

export function Footer() {
  return (
    <footer className="relative w-full bg-[#050505] pt-32 pb-16 z-20 overflow-hidden border-t border-[#E5E4E2]/10">
      
      {/* Heavy abstract background element to anchor the page bottom */}
      <div className="absolute bottom-[-50%] right-[-10%] w-[80vw] h-[80vw] bg-[radial-gradient(circle,rgba(94,0,8,0.1)_0%,transparent_70%)] opacity-50 mix-blend-screen pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Monolithic Footer Name */}
        <div className="w-full flex justify-between items-end mb-16 border-b border-[#E5E4E2]/10 pb-16">
          <h2 className="font-serif italic text-6xl md:text-[8vw] leading-[0.8] tracking-tighter text-[#E5E4E2]">
            KINGSHADP
          </h2>
          <div className="hidden md:flex items-center gap-4">
             <div className="w-24 h-px bg-[#B76E79]/40" />
             <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#B76E79]">
               Access The Portal
             </span>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 font-mono text-[9px] uppercase tracking-[0.3em] text-[#E5E4E2]/40">
           <div className="flex flex-col gap-2">
             <span>The Creator // The Create</span>
             <span>Standard Dictated. presence Enforced.</span>
           </div>
           
           <div className="flex flex-col md:flex-row gap-8 md:gap-24">
             <div className="flex flex-col gap-2">
               <span className="text-[#E5E4E2]/20 mb-2">Social / Connect</span>
               <a href="#" className="hover:text-[#B76E79] transition-colors cursor-none">Instagram</a>
               <a href="#" className="hover:text-[#B76E79] transition-colors cursor-none">SoundCloud</a>
               <a href="#" className="hover:text-[#B76E79] transition-colors cursor-none">Spotify</a>
             </div>
             <div className="flex flex-col gap-2 md:text-right">
               <span className="text-[#E5E4E2]/20 mb-2">Legal / Archival</span>
               <span>© {new Date().getFullYear()} The Vault.</span>
               <span>All rights reserved.</span>
             </div>
           </div>
        </div>

      </div>
    </footer>
  );
}
