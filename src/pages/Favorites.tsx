import { useState, useMemo } from 'react';
import type { Song } from '../data/songs';
import SongCard from '../components/SongCard';
import { Heart, Trash2, SlidersHorizontal, Disc } from 'lucide-react';


interface FavoritesProps {
  songs: Song[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onClearAll: () => void;
}

export default function Favorites({ songs, favorites, onToggleFavorite, onClearAll }: FavoritesProps) {
  const [filterMood, setFilterMood] = useState('All');
  const [filterGenre, setFilterGenre] = useState('All');

  // Retrieve favorited songs details
  const favoritedSongs = useMemo(() => {
    return songs.filter(s => favorites.includes(s.id));
  }, [songs, favorites]);

  // Extract all unique moods present in current favorites
  const uniqueMoodsInFavorites = useMemo(() => {
    const moods = new Set<string>();
    favoritedSongs.forEach(song => {
      song.moods.forEach(m => moods.add(m));
    });
    return ['All', ...Array.from(moods)];
  }, [favoritedSongs]);

  // Extract all unique genres present in current favorites
  const uniqueGenresInFavorites = useMemo(() => {
    const genres = new Set<string>();
    favoritedSongs.forEach(song => {
      song.genres.forEach(g => genres.add(g));
    });
    return ['All', ...Array.from(genres)];
  }, [favoritedSongs]);

  // Filtered favorited songs list
  const filteredSongs = useMemo(() => {
    return favoritedSongs.filter(song => {
      const matchMood = filterMood === 'All' || song.moods.includes(filterMood);
      const matchGenre = filterGenre === 'All' || song.genres.includes(filterGenre);
      return matchMood && matchGenre;
    });
  }, [favoritedSongs, filterMood, filterGenre]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 dotted-bg min-h-screen">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-4 border-zinc-800 pb-6 gap-4 mb-8">
        <div>
          <h2 className="magazine-header text-3xl md:text-4xl font-extrabold text-white flex items-center gap-3">
            <Heart className="w-8 h-8 text-purple-500 fill-current" />
            THE COLLECTOR'S MIXTAPE
          </h2>
          <p className="text-zinc-400 font-mono text-xs mt-1 uppercase tracking-wider">
            // YOUR SAVED TRACKS PERSISTED LOCALLY
          </p>
        </div>

        {/* Clear All Trigger */}
        {favorites.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm("ARE YOU SURE YOU WANT TO CLEAR YOUR WHOLE MIXTAPE?")) {
                onClearAll();
              }
            }}
            className="flex items-center gap-1.5 py-2 px-4 bg-red-950/20 hover:bg-red-900/30 border border-red-900 text-red-400 hover:text-red-300 font-mono text-xs uppercase font-bold outline-none cursor-pointer tracking-wider"
          >
            <Trash2 className="w-4 h-4" />
            CLEAR MIXTAPE
          </button>
        )}
      </div>

      {/* Main Content Layout */}
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center border-4 border-dashed border-zinc-800 p-8 md:p-16 text-center max-w-2xl mx-auto bg-zinc-900/10 min-h-[300px]">
          <Disc className="w-16 h-16 text-zinc-800 animate-spin mb-6" style={{ animationDuration: '6s' }} />
          <h3 className="magazine-header text-2xl font-bold tracking-tight text-zinc-400">
            MIXTAPE IS EMPTY
          </h3>
          <p className="text-sm font-mono text-zinc-600 mt-2 uppercase tracking-wider leading-relaxed">
            You haven't cataloged any heavy records yet. Head over to the Recommender, score some matching track, and press the heart sticker!
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Filters Bar */}
          <div className="bg-zinc-900 border-2 border-zinc-800 p-5 shadow-magazine-zinc">
            <h4 className="text-xs font-mono text-purple-400 uppercase tracking-widest font-bold flex items-center gap-1.5 mb-4">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              QUICK SHELF FILTERS
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Mood Filter */}
              <div>
                <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
                  FILTER BY SAVED MOOD
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {uniqueMoodsInFavorites.map(mood => (
                    <button
                      key={mood}
                      onClick={() => setFilterMood(mood)}
                      className={`py-1.5 px-3 border text-xs font-mono uppercase tracking-tight outline-none
                        ${filterMood === mood
                          ? 'bg-purple-600 border-purple-500 text-white font-bold'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                        }`}
                    >
                      {mood === 'All' ? 'ALL MOODS' : mood}
                    </button>
                  ))}
                </div>
              </div>

              {/* Genre Filter */}
              <div>
                <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
                  FILTER BY SAVED GENRE
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {uniqueGenresInFavorites.map(genre => (
                    <button
                      key={genre}
                      onClick={() => setFilterGenre(genre)}
                      className={`py-1.5 px-3 border text-xs font-mono uppercase tracking-tight outline-none
                        ${filterGenre === genre
                          ? 'bg-purple-600 border-purple-500 text-white font-bold'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                        }`}
                    >
                      {genre === 'All' ? 'ALL GENRES' : genre}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Grid Count */}
          <div className="font-mono text-xs text-zinc-400 flex items-center justify-between">
            <span>CATALOG: {filteredSongs.length} OF {favoritedSongs.length} TRACKS MATCHING</span>
            {filteredSongs.length === 0 && (
              <span className="text-purple-400 uppercase">[No matches with active filter settings]</span>
            )}
          </div>

          {/* Song Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSongs.map(song => (
              <SongCard
                key={song.id}
                song={song}
                isFavorite={true}
                onToggleFavorite={() => onToggleFavorite(song.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
