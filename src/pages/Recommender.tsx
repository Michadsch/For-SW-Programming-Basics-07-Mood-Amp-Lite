import { useState } from 'react';
import type { Song } from '../data/songs';
import { recommendSongs } from '../utils/recommender';
import type { RecommendationResult } from '../utils/recommender';
import SongCard from '../components/SongCard';
import { Sliders, Radio, Music, Sparkles, RotateCcw } from 'lucide-react';


interface RecommenderProps {
  songs: Song[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function Recommender({ songs, favorites, onToggleFavorite }: RecommenderProps) {
  // Option Selectors States
  const [selectedMood, setSelectedMood] = useState('Any');
  const [selectedGenre, setSelectedGenre] = useState('Any');
  const [selectedEnergy, setSelectedEnergy] = useState(5);
  const [selectedPurpose, setSelectedPurpose] = useState('Any');
  const [selectedEra, setSelectedEra] = useState('Any');
  const [selectedRegion, setSelectedRegion] = useState('Any');

  // New text description and reference song guidance states
  const [descriptionText, setDescriptionText] = useState('');
  const [referenceText, setReferenceText] = useState('');

  // In-session Feedback Calibration States
  const [feedbackEnergyOffset, setFeedbackEnergyOffset] = useState(0);
  const [feedbackLikedArtists, setFeedbackLikedArtists] = useState<string[]>([]);
  const [feedbackLikedGenres, setFeedbackLikedGenres] = useState<string[]>([]);
  const [feedbackLikedMoods, setFeedbackLikedMoods] = useState<string[]>([]);
  const [feedbackDislikedArtists, setFeedbackDislikedArtists] = useState<string[]>([]);
  const [feedbackDislikedSongs, setFeedbackDislikedSongs] = useState<string[]>([]);

  // Recommendation results state
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [hasRecommended, setHasRecommended] = useState(false);

  // Available options
  const moods = ['Any', 'Energetic', 'Melancholic', 'Angry', 'Relaxed', 'Rebellious', 'Focused', 'Dark', 'Uplifting'];
  const genres = [
    'Any', 
    'Heavy Metal', 
    'Classic Rock', 
    'Thrash Metal', 
    'Alternative Rock', 
    'Nu Metal', 
    'Grunge', 
    'Industrial Rock', 
    'Gothic Rock', 
    'Synthwave', 
    'Punk',
    'Glam Metal'
  ];
  const purposes = ['Any', 'Workout', 'Study/Focus', 'Chilling', 'Commuting', 'Moshpit', 'Venting', 'Gaming'];
  const eras = ['Any', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'];
  const regions = [
    'Any', 
    'Los Angeles', 
    'Seattle', 
    'London', 
    'Birmingham', 
    'New York', 
    'Bay Area', 
    'Gothenburg', 
    'Manchester', 
    'Other'
  ];

  const handleRecommend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const results = recommendSongs({
      selectedMood,
      selectedGenre,
      selectedEnergy,
      selectedPurpose,
      selectedEra,
      selectedRegion,
      descriptionText,
      referenceText,
      feedbackEnergyOffset,
      feedbackLikedArtists,
      feedbackLikedGenres,
      feedbackLikedMoods,
      feedbackDislikedArtists,
      feedbackDislikedSongs
    }, songs);

    setRecommendations(results);
    setHasRecommended(true);

    if (e) {
      // Smooth scroll to results on form submit only
      setTimeout(() => {
        const resultsEl = document.getElementById('results-section');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  // Card Feedback Recalibration callback
  const handleCardFeedback = (
    song: Song, 
    type: 'too-heavy' | 'too-soft' | 'more-like-this' | 'less-like-this'
  ) => {
    let nextEnergyOffset = feedbackEnergyOffset;
    let nextLikedArtists = [...feedbackLikedArtists];
    let nextLikedGenres = [...feedbackLikedGenres];
    let nextLikedMoods = [...feedbackLikedMoods];
    let nextDislikedArtists = [...feedbackDislikedArtists];
    let nextDislikedSongs = [...feedbackDislikedSongs];

    if (type === 'too-heavy') {
      nextEnergyOffset -= 1.5;
      setFeedbackEnergyOffset(prev => prev - 1.5);
    } else if (type === 'too-soft') {
      nextEnergyOffset += 1.5;
      setFeedbackEnergyOffset(prev => prev + 1.5);
    } else if (type === 'more-like-this') {
      if (!nextLikedArtists.includes(song.artist)) {
        nextLikedArtists.push(song.artist);
        setFeedbackLikedArtists(prev => [...prev, song.artist]);
      }
      song.genres.forEach(g => {
        if (!nextLikedGenres.includes(g)) {
          nextLikedGenres.push(g);
          setFeedbackLikedGenres(prev => [...prev, g]);
        }
      });
      song.moods.forEach(m => {
        if (!nextLikedMoods.includes(m)) {
          nextLikedMoods.push(m);
          setFeedbackLikedMoods(prev => [...prev, m]);
        }
      });
    } else if (type === 'less-like-this') {
      if (!nextDislikedSongs.includes(song.id)) {
        nextDislikedSongs.push(song.id);
        setFeedbackDislikedSongs(prev => [...prev, song.id]);
      }
      if (!nextDislikedArtists.includes(song.artist)) {
        nextDislikedArtists.push(song.artist);
        setFeedbackDislikedArtists(prev => [...prev, song.artist]);
      }
    }

    // Trigger instant recommendation calculation with new parameters
    const nextResults = recommendSongs({
      selectedMood,
      selectedGenre,
      selectedEnergy,
      selectedPurpose,
      selectedEra,
      selectedRegion,
      descriptionText,
      referenceText,
      feedbackEnergyOffset: nextEnergyOffset,
      feedbackLikedArtists: nextLikedArtists,
      feedbackLikedGenres: nextLikedGenres,
      feedbackLikedMoods: nextLikedMoods,
      feedbackDislikedArtists: nextDislikedArtists,
      feedbackDislikedSongs: nextDislikedSongs
    }, songs);

    setRecommendations(nextResults);
  };

  // Reset all feedback adjustments
  const handleResetFeedback = () => {
    setFeedbackEnergyOffset(0);
    setFeedbackLikedArtists([]);
    setFeedbackLikedGenres([]);
    setFeedbackLikedMoods([]);
    setFeedbackDislikedArtists([]);
    setFeedbackDislikedSongs([]);

    // Instantly recalculate recommendations
    const nextResults = recommendSongs({
      selectedMood,
      selectedGenre,
      selectedEnergy,
      selectedPurpose,
      selectedEra,
      selectedRegion,
      descriptionText,
      referenceText,
      feedbackEnergyOffset: 0,
      feedbackLikedArtists: [],
      feedbackLikedGenres: [],
      feedbackLikedMoods: [],
      feedbackDislikedArtists: [],
      feedbackDislikedSongs: []
    }, songs);

    setRecommendations(nextResults);
  };

  const hasFeedback = 
    feedbackEnergyOffset !== 0 || 
    feedbackLikedArtists.length > 0 || 
    feedbackLikedGenres.length > 0 || 
    feedbackLikedMoods.length > 0 || 
    feedbackDislikedArtists.length > 0 || 
    feedbackDislikedSongs.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 dotted-bg min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Panel: Left Side (5 Columns on Desktop) */}
        <form 
          onSubmit={handleRecommend}
          className="lg:col-span-5 bg-zinc-900 border-2 border-zinc-800 p-6 md:p-8 relative shadow-magazine-zinc"
        >
          {/* Slashed banner detail */}
          <div className="absolute top-0 right-0 slashed-stripe w-20 h-6 border-b border-l border-zinc-800"></div>

          <h2 className="magazine-header text-2xl md:text-3xl font-extrabold flex items-center gap-2 border-b-2 border-zinc-800 pb-4 text-white">
            <Sliders className="w-6 h-6 text-purple-500" />
            TUNING PANEL
          </h2>

          <div className="space-y-5 mt-6">
            
            {/* NEW: DESCRIBE YOUR SOUND (Natural Language Search) */}
            <div>
              <label className="block text-xs font-mono tracking-wider text-purple-400 uppercase font-bold mb-1.5">
                [01] DESCRIBE WHAT YOU WANT (PROMPT)
              </label>
              <textarea
                value={descriptionText}
                onChange={(e) => setDescriptionText(e.target.value)}
                placeholder="e.g. atmospheric and melancholic synthwave from the 80s, heavy guitar riffs..."
                rows={2}
                className="w-full py-2 px-3 bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-xs rounded-none focus:outline-none focus:border-purple-500 transition-colors placeholder:text-zinc-600"
              />
            </div>

            {/* NEW: REFERENCE BAND / SONG */}
            <div>
              <label className="block text-xs font-mono tracking-wider text-purple-400 uppercase font-bold mb-1.5">
                [02] OPTIONAL REFERENCE SONG / BAND
              </label>
              <input
                type="text"
                value={referenceText}
                onChange={(e) => setReferenceText(e.target.value)}
                placeholder="e.g. Metallica, The Cure, Creep, Sonne..."
                className="w-full py-2 px-3 bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-xs rounded-none focus:outline-none focus:border-purple-500 transition-colors placeholder:text-zinc-600"
              />
            </div>

            {/* MOOD GRID SELECTOR */}
            <div>
              <label className="block text-xs font-mono tracking-wider text-purple-400 uppercase font-bold mb-1.5">
                [03] SELECT VIBE / MOOD
              </label>
              <div className="grid grid-cols-3 gap-1">
                {moods.map((mood) => (
                  <button
                    type="button"
                    key={mood}
                    onClick={() => setSelectedMood(mood)}
                    className={`py-1.5 px-1 text-[11px] border font-mono uppercase tracking-tight transition-all duration-150 outline-none cursor-pointer
                      ${selectedMood === mood
                        ? 'bg-purple-600 border-purple-500 text-white font-bold'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                      }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>

            {/* GENRE DROP-DOWN */}
            <div>
              <label className="block text-xs font-mono tracking-wider text-purple-400 uppercase font-bold mb-1.5">
                [04] SPECIFY MUSIC GENRE
              </label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full py-2 px-3 bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-xs uppercase rounded-none focus:outline-none focus:border-purple-500 transition-colors cursor-pointer"
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre === 'Any' ? 'ALL GENRES' : genre}
                  </option>
                ))}
              </select>
            </div>

            {/* NEW: ERA SELECTOR */}
            <div>
              <label className="block text-xs font-mono tracking-wider text-purple-400 uppercase font-bold mb-1.5">
                [05] SELECT SONIC ERA
              </label>
              <div className="flex flex-wrap gap-1">
                {eras.map((era) => (
                  <button
                    type="button"
                    key={era}
                    onClick={() => setSelectedEra(era)}
                    className={`py-1.5 px-2 text-[10px] border font-mono uppercase tracking-tight transition-all duration-150 outline-none cursor-pointer
                      ${selectedEra === era
                        ? 'bg-purple-600 border-purple-500 text-white font-bold'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                      }`}
                  >
                    {era === 'Any' ? 'ALL' : era}
                  </button>
                ))}
              </div>
            </div>

            {/* NEW: REGION SELECTOR */}
            <div>
              <label className="block text-xs font-mono tracking-wider text-purple-400 uppercase font-bold mb-1.5">
                [06] SELECT MUSIC REGION / SCENE
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full py-2 px-3 bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-xs uppercase rounded-none focus:outline-none focus:border-purple-500 transition-colors cursor-pointer"
              >
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region === 'Any' ? 'ALL REGIONS' : region}
                  </option>
                ))}
              </select>
            </div>

            {/* PURPOSE GRID SELECTOR */}
            <div>
              <label className="block text-xs font-mono tracking-wider text-purple-400 uppercase font-bold mb-1.5">
                [07] SPECIFY ACTIVITY PURPOSE
              </label>
              <div className="flex flex-wrap gap-1">
                {purposes.map((purpose) => (
                  <button
                    type="button"
                    key={purpose}
                    onClick={() => setSelectedPurpose(purpose)}
                    className={`py-1.5 px-2.5 text-[10px] border font-mono uppercase tracking-tight transition-all duration-150 outline-none cursor-pointer
                      ${selectedPurpose === purpose
                        ? 'bg-purple-600 border-purple-500 text-white font-bold'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                      }`}
                  >
                    {purpose === 'Any' ? 'ALL' : purpose}
                  </button>
                ))}
              </div>
            </div>

            {/* ENERGY LEVEL SLIDER */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-mono tracking-wider text-purple-400 uppercase font-bold">
                  [08] SLIDER: BASE ENERGY LEVEL
                </label>
                <span className="text-xs font-mono font-bold text-white px-2 py-0.5 bg-purple-950/50 border border-purple-800">
                  {selectedEnergy}/10
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={selectedEnergy}
                onChange={(e) => setSelectedEnergy(parseInt(e.target.value))}
                className="w-full h-1.5 bg-zinc-950 rounded-lg appearance-none cursor-pointer accent-purple-500 border border-zinc-800"
              />
            </div>

            {/* Submit Trigger */}
            <button
              type="submit"
              className="w-full mt-2 py-3.5 px-6 bg-zinc-950 border-2 border-purple-500 hover:bg-purple-600 hover:text-white text-purple-400 transition-all duration-200 font-display font-extrabold text-base uppercase tracking-wider outline-none hover:shadow-magazine group flex items-center justify-center gap-2 cursor-pointer"
            >
              <Radio className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              RECOMMEND TOP 5
            </button>
          </div>
        </form>

        {/* Output Panel: Right Side (7 Columns on Desktop) */}
        <div className="lg:col-span-7 flex flex-col h-full">
          
          {/* Active Calibration Feedback Panel */}
          {hasFeedback && (
            <div className="bg-purple-950/30 border-2 border-purple-800 p-4 mb-6 relative font-mono text-xs flex justify-between items-center gap-4">
              <div>
                <span className="text-purple-400 font-bold uppercase block border-b border-purple-900 pb-1 mb-1.5">// ACTIVE CALIBRATION TUNING</span>
                <div className="space-y-1 text-zinc-300 text-[10px]">
                  {feedbackEnergyOffset !== 0 && (
                    <p>• ENERGY SHIFT: {feedbackEnergyOffset > 0 ? `+${feedbackEnergyOffset}` : feedbackEnergyOffset}</p>
                  )}
                  {feedbackLikedArtists.length > 0 && (
                    <p>• BIAS LIKE ARTIST: {feedbackLikedArtists.join(', ')}</p>
                  )}
                  {feedbackDislikedArtists.length > 0 && (
                    <p>• PENALTY ARTISTS: {feedbackDislikedArtists.join(', ')}</p>
                  )}
                  {feedbackDislikedSongs.length > 0 && (
                    <p>• EXCLUDED SONGS: {feedbackDislikedSongs.length} TRACK(S)</p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={handleResetFeedback}
                className="py-1 px-2 border border-purple-600 hover:bg-purple-600 hover:text-white text-purple-400 transition-colors uppercase font-bold text-[10px] outline-none flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> RESET
              </button>
            </div>
          )}

          {/* Standby State vs Results */}
          {!hasRecommended ? (
            <div className="flex-1 flex flex-col items-center justify-center border-4 border-dashed border-zinc-800 p-8 md:p-12 bg-zinc-900/10 text-center min-h-[450px]">
              <div className="p-4 bg-zinc-900 border-2 border-zinc-800 text-zinc-500 mb-6 relative">
                <Music className="w-12 h-12 text-zinc-700 animate-pulse" />
                <Sparkles className="w-6 h-6 text-purple-900 absolute -top-1 -right-1" />
              </div>
              <h3 className="magazine-header text-2xl font-bold tracking-tight text-zinc-400">
                RECOMMENDER OFF-LINE
              </h3>
              <p className="text-sm font-mono text-zinc-600 max-w-sm mt-2 uppercase tracking-wider leading-relaxed">
                Tweak the dials on the left. Prompt for specific tracks, select eras, regions, or reference bands, and lock recommendations.
              </p>
              <div className="mt-8 text-[10px] font-mono text-zinc-700 flex gap-2">
                <span>[INPUT: READY]</span>
                <span>[SONGS: 88]</span>
                <span>[TUNER: BIAS_OFF]</span>
              </div>
            </div>
          ) : (
            <div id="results-section" className="space-y-6">
              
              {/* Header card listing active search criteria */}
              <div className="bg-zinc-900 border-2 border-zinc-800 p-4 font-mono text-xs flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 items-center text-zinc-400 text-[10px] sm:text-xs">
                  <span className="text-purple-400 font-bold uppercase">DIALS:</span>
                  <span>MOOD={selectedMood}</span>
                  <span>GENRE={selectedGenre}</span>
                  <span>ERA={selectedEra}</span>
                  <span>REG={selectedRegion}</span>
                  <span>ENG={selectedEnergy + feedbackEnergyOffset}</span>
                </div>
              </div>

              {/* Dynamic Results Grid */}
              <h2 className="magazine-header text-3xl font-extrabold text-white tracking-tight border-b-4 border-purple-500 pb-2 flex items-center justify-between">
                <span>THE RECOMMENDATIONS</span>
                <span className="text-xs font-mono font-normal text-zinc-500 mt-2 uppercase">ISSUE #01 MATCHES</span>
              </h2>
              
              <div className="grid grid-cols-1 gap-6">
                {recommendations.map(({ song, explanation }) => (
                  <SongCard
                    key={song.id}
                    song={song}
                    explanation={explanation}
                    isFavorite={favorites.includes(song.id)}
                    onToggleFavorite={() => onToggleFavorite(song.id)}
                    onFeedback={(type) => handleCardFeedback(song, type)}
                  />
                ))}
              </div>

              <div className="p-4 border border-dashed border-zinc-800 bg-zinc-900/20 text-center text-xs font-mono text-zinc-500 uppercase tracking-widest mt-6">
                // CRITICS RECOMMENDATIONS ARE DYNAMIC // FEEL FREE TO USE THE TUNING BUTTONS TO CALIBRATE THE SCORING //
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
