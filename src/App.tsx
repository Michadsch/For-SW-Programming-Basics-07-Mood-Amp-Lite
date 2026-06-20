import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Recommender from './pages/Recommender';
import Favorites from './pages/Favorites';
import About from './pages/About';
import { songs } from './data/songs';
import { Info, Heart, Radio } from 'lucide-react';


export default function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<string>('recommender');
  
  // Favorites State (Stored as list of song IDs in localStorage)
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mood-amp-favorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load favorites from localStorage", e);
    }
  }, []);

  // Sync favorites toggling
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(id) 
        ? prev.filter(favId => favId !== id) 
        : [...prev, id];
      
      try {
        localStorage.setItem('mood-amp-favorites', JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save favorites to localStorage", e);
      }
      return updated;
    });
  };

  // Clear all favorites
  const handleClearFavorites = () => {
    setFavorites([]);
    try {
      localStorage.removeItem('mood-amp-favorites');
    } catch (e) {
      console.error("Failed to clear favorites from localStorage", e);
    }
  };

  // Render Page Helper
  const renderPage = () => {
    switch (currentPage) {
      case 'recommender':
        return (
          <Recommender 
            songs={songs} 
            favorites={favorites} 
            onToggleFavorite={handleToggleFavorite} 
          />
        );
      case 'favorites':
        return (
          <Favorites 
            songs={songs} 
            favorites={favorites} 
            onToggleFavorite={handleToggleFavorite}
            onClearAll={handleClearFavorites}
          />
        );
      case 'about':
        return <About />;
      default:
        return (
          <Recommender 
            songs={songs} 
            favorites={favorites} 
            onToggleFavorite={handleToggleFavorite} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-purple-600 selection:text-white">
      
      <div>
        {/* Navigation Masthead */}
        <Navbar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          favoritesCount={favorites.length}
        />

        {/* Page Content wrapper */}
        <main className="max-w-7xl mx-auto py-2">
          {renderPage()}
        </main>
      </div>

      {/* Styled Magazine Footer */}
      <footer className="border-t-4 border-zinc-800 bg-zinc-900 mt-12">
        
        {/* Slashed accent divider */}
        <div className="h-1.5 slashed-stripe-purple"></div>

        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-zinc-500">
          
          {/* Logo & Legal block */}
          <div className="text-center md:text-left">
            <h4 className="font-display font-extrabold text-sm text-zinc-300 tracking-tight uppercase">
              MOOD AMP LITE // ISSUE #01
            </h4>
            <p className="mt-1">
              © 2026 ANTIGRAVITY LABS. ALL RIFFS ARE THE PROPERTY OF THEIR RESPECTIVE ARTISTS.
            </p>
            <p className="text-[10px] text-zinc-600 mt-0.5">
              EST. 2026 FOR MUSIC ENTHUSIASTS. NO STRINGS ATTACHED.
            </p>
          </div>

          {/* Quick Stats list */}
          <div className="flex gap-6 flex-wrap justify-center md:justify-end text-zinc-400">
            <button 
              onClick={() => setCurrentPage('recommender')} 
              className="hover:text-purple-400 flex items-center gap-1 transition-colors uppercase outline-none"
            >
              <Radio className="w-3.5 h-3.5" /> RECOMMENDER
            </button>
            <button 
              onClick={() => setCurrentPage('favorites')} 
              className="hover:text-purple-400 flex items-center gap-1 transition-colors uppercase outline-none"
            >
              <Heart className="w-3.5 h-3.5" /> MIXTAPE ({favorites.length})
            </button>
            <button 
              onClick={() => setCurrentPage('about')} 
              className="hover:text-purple-400 flex items-center gap-1 transition-colors uppercase outline-none"
            >
              <Info className="w-3.5 h-3.5" /> COLOPHON
            </button>
          </div>

        </div>
        
      </footer>
      
    </div>
  );
}
