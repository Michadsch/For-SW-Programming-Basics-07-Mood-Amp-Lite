import type { Song } from '../data/songs';
import { Heart, Activity } from 'lucide-react';


interface SongCardProps {
  song: Song;
  explanation?: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onFeedback?: (type: 'too-heavy' | 'too-soft' | 'more-like-this' | 'less-like-this') => void;
}

export default function SongCard({ song, explanation, isFavorite, onToggleFavorite, onFeedback }: SongCardProps) {
  // Create an energy bar represented as characters
  const maxEnergy = 10;
  const filledBars = song.energy;
  const emptyBars = maxEnergy - filledBars;
  const barString = '█'.repeat(filledBars) + '░'.repeat(emptyBars);

  return (
    <div className="bg-zinc-900 border-2 border-zinc-800 p-5 relative overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-purple-500 hover:shadow-magazine group">
      
      {/* Tape/Vinyl accent at the top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-800 group-hover:bg-purple-600 transition-colors"></div>

      <div className="flex flex-col h-full justify-between gap-4">
        {/* Header: Title, Artist, Favorite Trigger */}
        <div>
          <div className="flex justify-between items-start gap-2">
            <div>
              <h3 className="magazine-header text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors">
                {song.title}
              </h3>
              <p className="text-zinc-400 font-medium text-sm mt-0.5 uppercase tracking-wider">
                {song.artist}
              </p>
            </div>
            
            <button
              onClick={onToggleFavorite}
              className={`p-2 border transition-all duration-150 outline-none
                ${isFavorite 
                  ? 'bg-purple-600 border-purple-500 text-white hover:bg-purple-700' 
                  : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500'
                }`}
              aria-label={isFavorite ? "Remove from favorites" : "Save to favorites"}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Energy Rating - Monospaced Meter */}
          <div className="mt-3 flex items-center gap-2 font-mono text-xs text-zinc-400">
            <Activity className="w-3.5 h-3.5 text-purple-500" />
            <span>ENERGY:</span>
            <span className="text-purple-400 tracking-tight">{barString}</span>
            <span className="text-zinc-500">({song.energy}/10)</span>
          </div>

          {/* Tags section */}
          <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[10px]">
            {song.genres.map(genre => (
              <span key={genre} className="px-2 py-0.5 border border-purple-950 bg-purple-950/20 text-purple-400 uppercase">
                {genre}
              </span>
            ))}
            {song.moods.map(mood => (
              <span key={mood} className="px-2 py-0.5 border border-zinc-800 bg-zinc-800/40 text-zinc-400 uppercase">
                #{mood.toLowerCase()}
              </span>
            ))}
            {song.purposes.map(purpose => (
              <span key={purpose} className="px-2 py-0.5 border border-zinc-800 bg-zinc-800/40 text-zinc-400 uppercase">
                {purpose.toLowerCase()}
              </span>
            ))}
            <span className="px-2 py-0.5 border border-purple-800 bg-purple-900/10 text-purple-300 font-bold uppercase">
              {song.era}
            </span>
            <span className="px-2 py-0.5 border border-zinc-700 bg-zinc-800/60 text-zinc-300 uppercase">
              {song.region}
            </span>
          </div>
        </div>

        {/* Middle: Explanation / Critic Review */}
        {explanation && (
          <div className="p-3 bg-zinc-950/80 border-l-2 border-purple-500 text-xs text-zinc-300 italic font-mono leading-relaxed my-2">
            {explanation}
          </div>
        )}

        {/* Dynamic recalibration buttons (optional callback) */}
        {onFeedback && (
          <div className="border-t border-dashed border-zinc-800 pt-3">
            <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
              <span>// Feedback Calibration:</span>
              <span>TUNER</span>
            </div>
            <div className="grid grid-cols-4 gap-1 font-mono text-[9px] uppercase font-bold text-center">
              <button
                onClick={() => onFeedback('too-heavy')}
                className="py-1.5 px-0.5 bg-zinc-950 border border-zinc-800 text-purple-400 hover:bg-purple-900/20 hover:border-purple-600 transition-all cursor-pointer"
                title="Tunes energy offset down"
              >
                Too Heavy
              </button>
              <button
                onClick={() => onFeedback('too-soft')}
                className="py-1.5 px-0.5 bg-zinc-950 border border-zinc-800 text-purple-400 hover:bg-purple-900/20 hover:border-purple-600 transition-all cursor-pointer"
                title="Tunes energy offset up"
              >
                Too Soft
              </button>
              <button
                onClick={() => onFeedback('more-like-this')}
                className="py-1.5 px-0.5 bg-zinc-950 border border-zinc-800 text-green-500 hover:bg-green-950/20 hover:border-green-600 transition-all cursor-pointer"
                title="Boosts this artist and genres/moods"
              >
                More Like
              </button>
              <button
                onClick={() => onFeedback('less-like-this')}
                className="py-1.5 px-0.5 bg-zinc-950 border border-zinc-800 text-red-500 hover:bg-red-950/20 hover:border-red-600 transition-all cursor-pointer"
                title="Hides this song and penalizes artist"
              >
                Less Like
              </button>
            </div>
          </div>
        )}

        {/* Footer: Dynamic External Streaming Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <a
            href={song.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-red-950/30 hover:bg-red-900/40 border border-red-900 text-red-400 hover:text-red-300 text-xs font-bold font-mono tracking-wider transition-all duration-150 uppercase outline-none"
          >
            {/* Custom YouTube SVG Icon */}
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span>YouTube</span>
          </a>

          <a
            href={song.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-green-950/30 hover:bg-green-900/40 border border-green-900 text-green-400 hover:text-green-300 text-xs font-bold font-mono tracking-wider transition-all duration-150 uppercase outline-none"
          >
            {/* Spotify Custom SVG Icon */}
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-.982-.336.076-.67-.135-.746-.47-.077-.337.135-.67.472-.747 3.856-.88 7.15-.502 9.82 1.13.297.18.39.563.207.86zm1.225-2.72c-.227.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.076-1.183-.412.125-.845-.108-.97-.52-.125-.413.108-.847.52-.972 3.67-1.114 8.24-.57 11.34 1.34.366.226.486.706.26 1.075zm.107-2.846C14.72 8.87 9.445 8.694 6.388 9.622c-.47.143-.97-.123-1.113-.593-.143-.47.123-.97.593-1.113 3.52-1.07 9.332-.87 12.99 1.3 0.424.25.564.796.313 1.22-.25.424-.797.564-1.22.313z"/>
            </svg>
            <span>Spotify</span>
          </a>
        </div>
      </div>
    </div>
  );
}
