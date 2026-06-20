import type { Song } from '../data/songs';

export interface RecommendationParams {
  selectedMood: string;
  selectedGenre: string;
  selectedEnergy: number;
  selectedPurpose: string;
  selectedEra: string;
  selectedRegion: string;
  descriptionText: string;
  referenceText: string;
  // Session-based feedback calibrations
  feedbackEnergyOffset: number;
  feedbackLikedArtists: string[];
  feedbackLikedGenres: string[];
  feedbackLikedMoods: string[];
  feedbackDislikedArtists: string[];
  feedbackDislikedSongs: string[];
}

export interface RecommendationResult {
  song: Song;
  score: number;
  explanation: string;
}

// Helper to clamp numbers
const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

export function recommendSongs(
  params: RecommendationParams,
  allSongs: Song[]
): RecommendationResult[] {
  const {
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
  } = params;

  // 1. Analyze reference song if provided (for lookalike recommendations)
  let refSong: Song | null = null;
  if (referenceText.trim()) {
    const term = referenceText.toLowerCase().trim();
    // Try to find an exact or near-match song
    const found = allSongs.find(s => 
      s.title.toLowerCase() === term || 
      s.title.toLowerCase().includes(term)
    );
    if (found) refSong = found;
  }

  // 2. Parse description text for semantic mapping
  const normalizedDesc = descriptionText.toLowerCase();
  
  // Keyword arrays for matching
  const moodKeywords = {
    Relaxed: ["chill", "relax", "mellow", "soft", "calm", "slow", "ambient", "peaceful"],
    Angry: ["heavy", "intense", "angry", "aggressive", "brutal", "furious", "rage", "mad", "hate"],
    Energetic: ["fast", "energetic", "high", "speed", "upbeat", "pumping", "loud", "power"],
    Melancholic: ["sad", "depressed", "melancholy", "gloom", "cry", "pain", "darkness", "somber"],
    Rebellious: ["rebel", "anarchy", "protest", "riot", "shout", "fight", "anti"],
    Focused: ["focus", "study", "concentrate", "work", "instrumental", "prog", "complex"],
    Dark: ["dark", "goth", "spooky", "vampire", "evil", "shadow", "death", "black"],
    Uplifting: ["happy", "uplifting", "positive", "hype", "cheerful", "hope", "rise"]
  };

  const genreKeywords = {
    "Heavy Metal": ["heavy metal", "maiden", "sabbath", "judas", "classic metal"],
    "Thrash Metal": ["thrash", "speed metal", "metallica", "megadeth", "slayer", "riffing"],
    "Alternative Rock": ["alternative", "indie", "radiohead", "muse", "alt rock"],
    "Nu Metal": ["nu metal", "linkin", "slipknot", "korn", "limp", "deftones", "rap metal"],
    Grunge: ["grunge", "seattle", "nirvana", "cobain", "alice in chains", "soundgarden", "pearl jam"],
    "Industrial Rock": ["industrial", "nin", "rammstein", "nails", "synth rock", "electronic metal"],
    "Gothic Rock": ["goth", "gothic", "cure", "post-punk", "darkwave", "bauhaus"],
    Synthwave: ["synthwave", "retrowave", "cyberpunk", "electronic", "turbo", "instrumental synth"],
    Punk: ["punk", "green day", "clash", "ramones", "anarchist"],
    "Glam Metal": ["glam", "hair metal", "crue", "motley", "poison", "leppard", "bon jovi", "80s rock"]
  };

  const eraKeywords = {
    "1970s": ["70s", "1970", "seventies", "retro"],
    "1980s": ["80s", "1980", "eighties", "synth-pop", "hair"],
    "1990s": ["90s", "1990", "nineties", "grunge era"],
    "2000s": ["00s", "2000", "y2k", "nu-metal era"],
    "2010s": ["10s", "2010", "tens"],
    "2020s": ["20s", "2020", "modern"]
  };

  const regionKeywords = {
    "Los Angeles": ["la", "los angeles", "hollywood", "sunset strip", "california"],
    Seattle: ["seattle", "washington", "northwest", "rainy"],
    London: ["london", "uk", "england", "british"],
    Birmingham: ["birmingham", "black country", "midlands"],
    "New York": ["ny", "new york", "brooklyn", "manhattan"],
    "Bay Area": ["bay area", "san francisco", "oakland", "berkeley"],
    Gothenburg: ["gothenburg", "sweden", "swedish", "scandinavian"],
    Manchester: ["manchester", "factory records"]
  };

  const results: RecommendationResult[] = allSongs.map((song) => {
    let score = 0;
    
    // Tracks matched criteria to generate custom reviews
    const matchedCriteria: string[] = [];

    // --- CRITERION 1: Mood (Weight: 4) ---
    if (selectedMood && selectedMood !== "Any") {
      if (song.moods.some(m => m.toLowerCase() === selectedMood.toLowerCase())) {
        score += 4;
        matchedCriteria.push("mood");
      }
    }

    // --- CRITERION 2: Genre (Weight: 3) ---
    if (selectedGenre && selectedGenre !== "Any") {
      const match = song.genres.some(g => 
        g.toLowerCase().includes(selectedGenre.toLowerCase()) || 
        selectedGenre.toLowerCase().includes(g.toLowerCase())
      );
      if (match) {
        score += 3;
        matchedCriteria.push("genre");
      }
    }

    // --- CRITERION 3: Purpose (Weight: 3) ---
    if (selectedPurpose && selectedPurpose !== "Any") {
      if (song.purposes.some(p => p.toLowerCase() === selectedPurpose.toLowerCase())) {
        score += 3;
        matchedCriteria.push("purpose");
      }
    }

    // --- CRITERION 4: Era (Weight: 3) ---
    if (selectedEra && selectedEra !== "Any") {
      if (song.era === selectedEra) {
        score += 3;
        matchedCriteria.push("era");
      }
    }

    // --- CRITERION 5: Region (Weight: 2) ---
    if (selectedRegion && selectedRegion !== "Any") {
      if (song.region.toLowerCase() === selectedRegion.toLowerCase()) {
        score += 2;
        matchedCriteria.push("region");
      }
    }

    // --- CRITERION 6: Energy Slider + Feedback Calibrations (Weight: 2 offset) ---
    const targetEnergy = clamp(selectedEnergy + feedbackEnergyOffset, 1, 10);
    const energyDiff = Math.abs(song.energy - targetEnergy);
    score -= energyDiff * 1.5;

    // --- CRITERION 7: Reference Artist / Song Preset (Weight: up to 5) ---
    if (referenceText.trim()) {
      const term = referenceText.toLowerCase().trim();
      // Exact artist matches
      if (song.artist.toLowerCase() === term || song.artist.toLowerCase().includes(term)) {
        score += 5;
        matchedCriteria.push("reference artist");
      }
      // If we found a reference lookalike song, score similarity
      if (refSong) {
        let similarityBonus = 0;
        // Shared genres
        const sharedGenres = song.genres.filter(g => refSong!.genres.includes(g));
        similarityBonus += sharedGenres.length * 2;
        // Shared moods
        const sharedMoods = song.moods.filter(m => refSong!.moods.includes(m));
        similarityBonus += sharedMoods.length * 1.5;
        // Shared era/region
        if (song.era === refSong.era) similarityBonus += 1.5;
        if (song.region === refSong.region) similarityBonus += 1.5;
        
        score += similarityBonus;
        if (similarityBonus > 0) {
          matchedCriteria.push(`lookalike to "${refSong.title}"`);
        }
      }
    }

    // --- CRITERION 8: Natural Language Description Keywords (Weight: up to 5) ---
    if (normalizedDesc.trim()) {
      let descBonus = 0;

      // 1. Direct substring checks
      if (song.title.toLowerCase().includes(normalizedDesc) || song.artist.toLowerCase().includes(normalizedDesc)) {
        descBonus += 4;
      }
      
      // 2. Mood keywords matching
      Object.entries(moodKeywords).forEach(([mood, keywords]) => {
        if (keywords.some(k => normalizedDesc.includes(k))) {
          if (song.moods.includes(mood)) {
            descBonus += 2;
          }
        }
      });

      // 3. Genre keywords matching
      Object.entries(genreKeywords).forEach(([genre, keywords]) => {
        if (keywords.some(k => normalizedDesc.includes(k))) {
          if (song.genres.some(g => g.includes(genre) || genre.includes(g))) {
            descBonus += 2.5;
          }
        }
      });

      // 4. Era keywords matching
      Object.entries(eraKeywords).forEach(([era, keywords]) => {
        if (keywords.some(k => normalizedDesc.includes(k))) {
          if (song.era === era) {
            descBonus += 2;
          }
        }
      });

      // 5. Region keywords matching
      Object.entries(regionKeywords).forEach(([region, keywords]) => {
        if (keywords.some(k => normalizedDesc.includes(k))) {
          if (song.region === region) {
            descBonus += 1.5;
          }
        }
      });

      score += descBonus;
      if (descBonus > 0) {
        matchedCriteria.push("description tags");
      }
    }

    // --- CRITERION 9: Session-based Feedback Biases ---
    // Liked features (Boost score)
    if (feedbackLikedArtists.includes(song.artist)) score += 3;
    const likedGenreCount = song.genres.filter(g => feedbackLikedGenres.includes(g)).length;
    score += likedGenreCount * 2;
    const likedMoodCount = song.moods.filter(m => feedbackLikedMoods.includes(m)).length;
    score += likedMoodCount * 2;

    // Disliked features (Heavy Penalty)
    if (feedbackDislikedArtists.includes(song.artist)) score -= 12;
    if (feedbackDislikedSongs.includes(song.id)) score -= 25; // Effectively buries it

    // Add a tiny random offset to ensure ties are resolved dynamically
    const finalScore = score + Math.random() * 0.05;

    // Compile dynamic explanations
    let explanation = "";
    const primaryGenre = song.genres[0];

    // Determine energy adjective
    let energyDesc = "balanced";
    if (song.energy >= 9) energyDesc = "blistering, high-intensity";
    else if (song.energy >= 7) energyDesc = "driving, heavy-hitting";
    else if (song.energy <= 3) energyDesc = "atmospheric, slow-tempo";

    if (refSong && song.id !== refSong.id && matchedCriteria.includes(`lookalike to "${refSong.title}"`)) {
      explanation = `LOOKALAKE PICK: Selected because it mirrors the ${refSong.artist} blueprint. This ${energyDesc} ${song.era} ${primaryGenre} cut matches key structural elements of "${refSong.title}".`;
    } else if (matchedCriteria.includes("description tags") && normalizedDesc.trim()) {
      explanation = `DESCRIPTON MATCH: Fits your custom audio description. This ${energyDesc} ${song.region} classic aligns with the raw ${song.moods[0].toLowerCase()} tones you requested.`;
    } else if (matchedCriteria.includes("mood") && matchedCriteria.includes("genre") && matchedCriteria.includes("era")) {
      explanation = `CRITIC'S CHOICE: A stellar ${energyDesc} ${primaryGenre} track from the ${song.era} ${song.region} scene. Hits the exact ${song.moods.join("/")} mood you are chasing.`;
    } else {
      explanation = `EDITORIAL ARCHIVE: Recommended from our ${song.region} vault. This ${song.era} ${primaryGenre} release delivers a solid ${song.moods[0].toLowerCase()} vibe matching your ${targetEnergy}/10 energy target.`;
    }

    return {
      song,
      score: finalScore,
      explanation
    };
  });

  // Sort by score descending and return top 5
  return results.sort((a, b) => b.score - a.score).slice(0, 5);
}
