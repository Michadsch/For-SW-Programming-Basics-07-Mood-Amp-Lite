import { Newspaper, Terminal, Guitar, Users } from 'lucide-react';


export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 dotted-bg min-h-screen">
      
      {/* Page Header */}
      <div className="border-b-4 border-zinc-800 pb-6 mb-8">
        <h2 className="magazine-header text-3xl md:text-4xl font-extrabold text-white flex items-center gap-3">
          <Newspaper className="w-8 h-8 text-purple-500" />
          ZINE COLOPHON & CRITICS
        </h2>
        <p className="text-zinc-400 font-mono text-xs mt-1 uppercase tracking-wider">
          // INDEPENDENT MUSIC JOURNALISM POWERED BY MACHINE LEARNING (SORT OF)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Magazine Article Spread (8 Columns on Desktop) */}
        <div className="lg:col-span-8 bg-zinc-900 border-2 border-zinc-800 p-6 md:p-8 shadow-magazine-zinc">
          
          <div className="flex items-center gap-2 mb-4">
            <span className="sticker-label text-[10px]">EDITORIAL</span>
            <span className="text-xs font-mono text-zinc-500">JUNE 2026 EDITION</span>
          </div>

          <h3 className="magazine-header text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6">
            EDITOR'S NOTE: THE RIFF LIVES
          </h3>

          <div className="space-y-6 text-zinc-300 text-sm md:text-base leading-relaxed font-sans text-justify">
            <p className="first-letter:text-5xl first-letter:font-extrabold first-letter:text-purple-500 first-letter:float-left first-letter:mr-3 first-letter:line-height-none">
              In an era dominated by soulless algorithmic streams and corporate radio playlist insertions, finding music with teeth has become a chore. We built <strong className="text-purple-400">Mood Amp Lite</strong> as an antidote. We didn't want an app that requires you to sign in with five social accounts, tracks your search history, sells your telemetry, or forces you to listen to three commercials before you hear a single double-kick fill.
            </p>

            <p>
              This is a tribute to the printed fanzines of the 80s and 90s. The Xeroxed pages, the staple-bound folders, the underground cassette trade. We curated a local database of 82 iconic songs covering Classic Rock, Thrash Metal, Grunge, Synthwave, Punk, Gothic Rock, and Industrial. The search buttons on each card don't lock you into a proprietary streaming interface; they generate clean queries targeting YouTube and Spotify, putting you in control.
            </p>

            <p>
              Our recommendation logic evaluates each record against your exact mood, genre preference, activity goals, and an energy slider. The results display the top 5 matches with custom "critic reviews"—a brief explanation of why the track fits your vibe. If you find a song that speaks to you, clip it to your personal mixtape (saved straight to your browser's local storage) so it stays with you forever.
            </p>

            <p className="border-t border-zinc-800 pt-6 text-xs font-mono text-zinc-500">
              STAY HEAVY, STAY PUNK, AND TURN THE VOLUME KNOB TO ELEVEN.
            </p>
          </div>

          {/* Slashed banner */}
          <div className="mt-8 h-8 slashed-stripe"></div>
        </div>

        {/* Right Column: Staff Board & Tech Specs (4 Columns on Desktop) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Tech Specs Block */}
          <div className="bg-zinc-900 border-2 border-zinc-800 p-6 relative">
            <div className="absolute top-0 right-0 w-2 h-2 bg-purple-500"></div>
            
            <h4 className="text-xs font-mono text-purple-400 uppercase tracking-widest font-bold flex items-center gap-1.5 mb-4 border-b border-zinc-800 pb-2">
              <Terminal className="w-4 h-4" />
              SYSTEM MANIFEST
            </h4>
            
            <ul className="space-y-3 font-mono text-xs text-zinc-400">
              <li className="flex justify-between">
                <span>CORE:</span>
                <span className="text-white font-bold">VITE + REACT</span>
              </li>
              <li className="flex justify-between">
                <span>TYPING:</span>
                <span className="text-white font-bold">TYPESCRIPT 5.x</span>
              </li>
              <li className="flex justify-between">
                <span>STYLING:</span>
                <span className="text-white font-bold">TAILWIND CSS v4</span>
              </li>
              <li className="flex justify-between">
                <span>PERSISTENCE:</span>
                <span className="text-white font-bold">LOCALSTORAGE</span>
              </li>
              <li className="flex justify-between">
                <span>SONGS LOADED:</span>
                <span className="text-purple-400 font-bold">82 RECORDS</span>
              </li>
              <li className="flex justify-between">
                <span>API COST:</span>
                <span className="text-green-400 font-bold">$0.00 (NONE)</span>
              </li>
            </ul>
          </div>

          {/* Editorial Board (Staff) */}
          <div className="bg-zinc-900 border-2 border-zinc-800 p-6 relative">
            <h4 className="text-xs font-mono text-purple-400 uppercase tracking-widest font-bold flex items-center gap-1.5 mb-4 border-b border-zinc-800 pb-2">
              <Users className="w-4 h-4" />
              EDITORIAL BOARD
            </h4>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <p className="text-zinc-500">EDITOR-IN-CHIEF / SYSTEM DEV</p>
                <p className="text-white font-bold text-sm">ANTIGRAVITY AI</p>
              </div>
              
              <div>
                <p className="text-zinc-500">RIFF ARCHIVIST & SONG METADATA</p>
                <p className="text-white font-bold text-sm">LOCAL JSON DATABASE</p>
              </div>

              <div>
                <p className="text-zinc-500">CHIEF DESIGNER</p>
                <p className="text-white font-bold text-sm">HEAVY METAL MAGAZINE FAN</p>
              </div>

              <div>
                <p className="text-zinc-500">ZINE SPONSOR</p>
                <p className="text-white font-bold text-sm">GEMINI MODEL DEEP VALUE</p>
              </div>
            </div>
          </div>

          {/* Quick instructions / Info Graphic */}
          <div className="border-2 border-dashed border-zinc-800 p-6 text-center bg-zinc-950/40">
            <Guitar className="w-8 h-8 text-zinc-700 mx-auto mb-3" />
            <h5 className="magazine-header text-sm font-bold text-zinc-400 uppercase">NO SIGNUP REQUIRED</h5>
            <p className="text-[10px] font-mono text-zinc-600 mt-1 uppercase leading-normal">
              Favorites are saved directly in your web browser. Clearing your cookies or cache will empty your shelf.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
