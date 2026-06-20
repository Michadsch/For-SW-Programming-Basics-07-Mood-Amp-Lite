import { Flame, Heart, Info, Radio } from 'lucide-react';


interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  favoritesCount: number;
}

export default function Navbar({ currentPage, setCurrentPage, favoritesCount }: NavbarProps) {
  const navItems = [
    { id: 'recommender', label: 'RECOMMENDER', icon: Radio },
    { id: 'favorites', label: 'FAVORITES', icon: Heart, badge: favoritesCount > 0 ? favoritesCount : undefined },
    { id: 'about', label: 'ABOUT THE ZINE', icon: Info },
  ];

  return (
    <header className="border-b-4 border-zinc-800 bg-zinc-950">
      {/* Slashed top ribbon */}
      <div className="h-2 slashed-stripe-purple"></div>

      {/* Main Magazine Title Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="sticker-label text-xs tracking-wider">ISSUE #01 - LITE</span>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Est. 2026</span>
          </div>
          <h1 
            onClick={() => setCurrentPage('recommender')}
            className="magazine-masthead mt-2 text-6xl sm:text-7xl md:text-8xl cursor-pointer select-none hover:text-purple-400 transition-colors"
          >
            MOOD AMP
          </h1>
          <p className="mt-1 text-sm font-mono tracking-widest text-purple-500 uppercase">
            // THE ULTIMATE ROCK & METAL CRITIC RECOM-ENGINE
          </p>
        </div>

        {/* Quick Stats Block / Magazine Advert Style */}
        <div className="border-2 border-dashed border-zinc-800 p-4 bg-zinc-900/50 flex items-center gap-4 text-left max-w-xs">
          <div className="p-3 bg-purple-900/30 text-purple-400 border border-purple-800">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-mono text-zinc-400">STATUS: ACTIVE</h4>
            <p className="text-xs text-zinc-300 font-bold mt-0.5">82 HEAVY TRACKS IN STOCK</p>
            <p className="text-[10px] text-zinc-500 font-mono mt-1">NO SIGNUP. NO COOKIES. PURE RIFFS.</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation Menu */}
      <div className="border-t-4 border-zinc-800 bg-zinc-900">
        <nav className="max-w-7xl mx-auto grid grid-cols-3 divide-x divide-zinc-800 font-display">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`py-4 px-2 flex flex-col sm:flex-row items-center justify-center gap-2 text-sm sm:text-base tracking-wider transition-all duration-150 uppercase font-bold outline-none group relative overflow-hidden
                  ${isActive 
                    ? 'bg-purple-600 text-white font-extrabold' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
              >
                {/* Diagonal background animation on hover */}
                <span className="absolute inset-0 w-full h-full bg-purple-500/10 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-purple-400'}`} />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className={`px-1.5 py-0.5 text-[10px] font-mono rounded ${isActive ? 'bg-zinc-900 text-purple-300' : 'bg-purple-950 text-purple-300 border border-purple-800'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
