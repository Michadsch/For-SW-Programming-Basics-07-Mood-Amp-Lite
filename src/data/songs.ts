export interface Song {
  id: string;
  title: string;
  artist: string;
  genres: string[];
  moods: string[];
  energy: number; // Scale of 1 to 10
  purposes: string[];
  era: string; // "1970s" | "1980s" | "1990s" | "2000s" | "2010s" | "2020s"
  region: string; // "Los Angeles" | "Seattle" | "London" | "Birmingham" | "New York" | "Bay Area" | "Gothenburg" | "Manchester" | "Other"
  youtubeUrl: string;
  spotifyUrl: string;
}

const rawSongs = [
  {
    id: "1",
    title: "Enter Sandman",
    artist: "Metallica",
    genres: ["Heavy Metal", "Classic Rock"],
    moods: ["Energetic", "Dark"],
    energy: 8,
    purposes: ["Workout", "Gaming"],
    era: "1990s",
    region: "Los Angeles"
  },
  {
    id: "2",
    title: "Master of Puppets",
    artist: "Metallica",
    genres: ["Thrash Metal"],
    moods: ["Angry", "Energetic"],
    energy: 10,
    purposes: ["Workout", "Moshpit", "Gaming"],
    era: "1980s",
    region: "Bay Area"
  },
  {
    id: "3",
    title: "In the End",
    artist: "Linkin Park",
    genres: ["Nu Metal", "Alternative Rock"],
    moods: ["Melancholic", "Rebellious"],
    energy: 7,
    purposes: ["Venting", "Commuting"],
    era: "2000s",
    region: "Los Angeles"
  },
  {
    id: "4",
    title: "Numb",
    artist: "Linkin Park",
    genres: ["Nu Metal", "Alternative Rock"],
    moods: ["Rebellious", "Melancholic"],
    energy: 8,
    purposes: ["Venting", "Study/Focus"],
    era: "2000s",
    region: "Los Angeles"
  },
  {
    id: "5",
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    genres: ["Grunge", "Punk"],
    moods: ["Rebellious", "Energetic"],
    energy: 8,
    purposes: ["Venting", "Moshpit"],
    era: "1990s",
    region: "Seattle"
  },
  {
    id: "6",
    title: "Come As You Are",
    artist: "Nirvana",
    genres: ["Grunge", "Alternative Rock"],
    moods: ["Relaxed", "Melancholic"],
    energy: 5,
    purposes: ["Chilling", "Commuting"],
    era: "1990s",
    region: "Seattle"
  },
  {
    id: "7",
    title: "Change (In the House of Flies)",
    artist: "Deftones",
    genres: ["Alternative Metal", "Gothic Rock"],
    moods: ["Dark", "Melancholic"],
    energy: 6,
    purposes: ["Chilling", "Venting"],
    era: "2000s",
    region: "Other"
  },
  {
    id: "8",
    title: "My Own Summer (Shove It)",
    artist: "Deftones",
    genres: ["Nu Metal", "Alternative Metal"],
    moods: ["Angry", "Rebellious"],
    energy: 9,
    purposes: ["Workout", "Moshpit"],
    era: "1990s",
    region: "Other"
  },
  {
    id: "9",
    title: "Du Hast",
    artist: "Rammstein",
    genres: ["Industrial Metal"],
    moods: ["Energetic", "Angry"],
    energy: 9,
    purposes: ["Workout", "Moshpit"],
    era: "1990s",
    region: "Other"
  },
  {
    id: "10",
    title: "Hurt",
    artist: "Nine Inch Nails",
    genres: ["Industrial Rock", "Alternative Rock"],
    moods: ["Melancholic", "Dark"],
    energy: 2,
    purposes: ["Venting", "Chilling"],
    era: "1990s",
    region: "Other"
  },
  {
    id: "11",
    title: "Head Like a Hole",
    artist: "Nine Inch Nails",
    genres: ["Industrial Rock"],
    moods: ["Angry", "Rebellious"],
    energy: 8,
    purposes: ["Workout", "Venting"],
    era: "1990s",
    region: "Other"
  },
  {
    id: "12",
    title: "Paranoid",
    artist: "Black Sabbath",
    genres: ["Classic Rock", "Heavy Metal"],
    moods: ["Energetic", "Rebellious"],
    energy: 8,
    purposes: ["Commuting", "Gaming"],
    era: "1970s",
    region: "Birmingham"
  },
  {
    id: "13",
    title: "Iron Man",
    artist: "Black Sabbath",
    genres: ["Classic Rock", "Heavy Metal"],
    moods: ["Dark", "Energetic"],
    energy: 7,
    purposes: ["Chilling", "Gaming"],
    era: "1970s",
    region: "Birmingham"
  },
  {
    id: "14",
    title: "Chop Suey!",
    artist: "System of a Down",
    genres: ["Nu Metal", "Alternative Rock"],
    moods: ["Angry", "Energetic"],
    energy: 9,
    purposes: ["Workout", "Moshpit", "Gaming"],
    era: "2000s",
    region: "Los Angeles"
  },
  {
    id: "15",
    title: "Toxicity",
    artist: "System of a Down",
    genres: ["Nu Metal", "Alternative Rock"],
    moods: ["Rebellious", "Energetic"],
    energy: 9,
    purposes: ["Workout", "Moshpit"],
    era: "2000s",
    region: "Los Angeles"
  },
  {
    id: "16",
    title: "Killing in the Name",
    artist: "Rage Against the Machine",
    genres: ["Alternative Rock", "Punk"],
    moods: ["Rebellious", "Angry"],
    energy: 9,
    purposes: ["Workout", "Venting", "Moshpit"],
    era: "1990s",
    region: "Los Angeles"
  },
  {
    id: "17",
    title: "Bulls on Parade",
    artist: "Rage Against the Machine",
    genres: ["Alternative Rock", "Heavy Metal"],
    moods: ["Rebellious", "Energetic"],
    energy: 8,
    purposes: ["Workout", "Gaming"],
    era: "1990s",
    region: "Los Angeles"
  },
  {
    id: "18",
    title: "Bring Me to Life",
    artist: "Evanescence",
    genres: ["Alternative Metal", "Gothic Rock"],
    moods: ["Melancholic", "Energetic"],
    energy: 8,
    purposes: ["Venting", "Workout"],
    era: "2000s",
    region: "Other"
  },
  {
    id: "19",
    title: "Duality",
    artist: "Slipknot",
    genres: ["Nu Metal", "Heavy Metal"],
    moods: ["Angry", "Energetic"],
    energy: 9,
    purposes: ["Workout", "Moshpit"],
    era: "2000s",
    region: "Other"
  },
  {
    id: "20",
    title: "Psychosocial",
    artist: "Slipknot",
    genres: ["Heavy Metal", "Nu Metal"],
    moods: ["Angry", "Energetic"],
    energy: 9,
    purposes: ["Workout", "Moshpit", "Gaming"],
    era: "2000s",
    region: "Other"
  },
  {
    id: "21",
    title: "Hysteria",
    artist: "Muse",
    genres: ["Alternative Rock", "Progressive Rock"],
    moods: ["Energetic", "Focused"],
    energy: 8,
    purposes: ["Workout", "Gaming"],
    era: "2000s",
    region: "London"
  },
  {
    id: "22",
    title: "Knights of Cydonia",
    artist: "Muse",
    genres: ["Alternative Rock", "Progressive Rock"],
    moods: ["Uplifting", "Energetic"],
    energy: 9,
    purposes: ["Gaming", "Commuting"],
    era: "2000s",
    region: "London"
  },
  {
    id: "23",
    title: "Lovesong",
    artist: "The Cure",
    genres: ["Gothic Rock", "Alternative Rock"],
    moods: ["Relaxed", "Melancholic"],
    energy: 4,
    purposes: ["Chilling", "Study/Focus"],
    era: "1980s",
    region: "London"
  },
  {
    id: "24",
    title: "Pictures of You",
    artist: "The Cure",
    genres: ["Gothic Rock", "Post-Punk"],
    moods: ["Melancholic", "Dark"],
    energy: 4,
    purposes: ["Chilling", "Study/Focus"],
    era: "1980s",
    region: "London"
  },
  {
    id: "25",
    title: "The Trooper",
    artist: "Iron Maiden",
    genres: ["Heavy Metal"],
    moods: ["Energetic", "Uplifting"],
    energy: 9,
    purposes: ["Workout", "Gaming"],
    era: "1980s",
    region: "London"
  },
  {
    id: "26",
    title: "Run to the Hills",
    artist: "Iron Maiden",
    genres: ["Heavy Metal"],
    moods: ["Energetic", "Rebellious"],
    energy: 8,
    purposes: ["Workout", "Gaming"],
    era: "1980s",
    region: "London"
  },
  {
    id: "27",
    title: "Back in Black",
    artist: "AC/DC",
    genres: ["Classic Rock", "Hard Rock"],
    moods: ["Energetic", "Uplifting"],
    energy: 8,
    purposes: ["Workout", "Commuting"],
    era: "1980s",
    region: "Other"
  },
  {
    id: "28",
    title: "Thunderstruck",
    artist: "AC/DC",
    genres: ["Classic Rock", "Hard Rock"],
    moods: ["Energetic", "Uplifting"],
    energy: 9,
    purposes: ["Workout", "Gaming"],
    era: "1990s",
    region: "Other"
  },
  {
    id: "29",
    title: "Whole Lotta Love",
    artist: "Led Zeppelin",
    genres: ["Classic Rock", "Hard Rock"],
    moods: ["Energetic", "Relaxed"],
    energy: 7,
    purposes: ["Chilling", "Commuting"],
    era: "1970s",
    region: "London"
  },
  {
    id: "30",
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    genres: ["Classic Rock", "Progressive Rock"],
    moods: ["Melancholic", "Relaxed"],
    energy: 4,
    purposes: ["Chilling", "Study/Focus"],
    era: "1970s",
    region: "London"
  },
  {
    id: "31",
    title: "Everlong",
    artist: "Foo Fighters",
    genres: ["Alternative Rock"],
    moods: ["Energetic", "Melancholic"],
    energy: 8,
    purposes: ["Commuting", "Venting"],
    era: "1990s",
    region: "Los Angeles"
  },
  {
    id: "32",
    title: "The Pretender",
    artist: "Foo Fighters",
    genres: ["Alternative Rock"],
    moods: ["Rebellious", "Energetic"],
    energy: 9,
    purposes: ["Workout", "Gaming"],
    era: "2000s",
    region: "Los Angeles"
  },
  {
    id: "33",
    title: "Schism",
    artist: "Tool",
    genres: ["Progressive Rock", "Alternative Metal"],
    moods: ["Focused", "Dark"],
    energy: 7,
    purposes: ["Study/Focus", "Gaming"],
    era: "2000s",
    region: "Los Angeles"
  },
  {
    id: "34",
    title: "Forty Six & 2",
    artist: "Tool",
    genres: ["Progressive Rock", "Alternative Metal"],
    moods: ["Dark", "Focused"],
    energy: 8,
    purposes: ["Workout", "Study/Focus"],
    era: "1990s",
    region: "Los Angeles"
  },
  {
    id: "35",
    title: "The Sound of Silence",
    artist: "Disturbed",
    genres: ["Alternative Metal", "Classic Rock"],
    moods: ["Melancholic", "Dark"],
    energy: 3,
    purposes: ["Venting", "Chilling"],
    era: "2010s",
    region: "Other"
  },
  {
    id: "36",
    title: "Down with the Sickness",
    artist: "Disturbed",
    genres: ["Nu Metal", "Hard Rock"],
    moods: ["Angry", "Energetic"],
    energy: 9,
    purposes: ["Workout", "Moshpit"],
    era: "2000s",
    region: "Other"
  },
  {
    id: "37",
    title: "Love Will Tear Us Part",
    artist: "Joy Division",
    genres: ["Post-Punk", "Gothic Rock"],
    moods: ["Melancholic", "Dark"],
    energy: 5,
    purposes: ["Chilling", "Commuting"],
    era: "1980s",
    region: "Manchester"
  },
  {
    id: "38",
    title: "Disorder",
    artist: "Joy Division",
    genres: ["Post-Punk", "Gothic Rock"],
    moods: ["Energetic", "Melancholic"],
    energy: 7,
    purposes: ["Commuting", "Study/Focus"],
    era: "1970s",
    region: "Manchester"
  },
  {
    id: "39",
    title: "Sonne",
    artist: "Rammstein",
    genres: ["Industrial Metal"],
    moods: ["Dark", "Energetic"],
    energy: 8,
    purposes: ["Workout", "Gaming"],
    era: "2000s",
    region: "Other"
  },
  {
    id: "40",
    title: "Welcome to the Black Parade",
    artist: "My Chemical Romance",
    genres: ["Alternative Rock", "Punk"],
    moods: ["Melancholic", "Uplifting"],
    energy: 8,
    purposes: ["Venting", "Commuting"],
    era: "2000s",
    region: "Other"
  },
  {
    id: "41",
    title: "Helena",
    artist: "My Chemical Romance",
    genres: ["Punk", "Alternative Rock"],
    moods: ["Melancholic", "Rebellious"],
    energy: 8,
    purposes: ["Venting", "Moshpit"],
    era: "2000s",
    region: "Other"
  },
  {
    id: "42",
    title: "Basket Case",
    artist: "Green Day",
    genres: ["Punk"],
    moods: ["Energetic", "Rebellious"],
    energy: 8,
    purposes: ["Commuting", "Venting"],
    era: "1990s",
    region: "Bay Area"
  },
  {
    id: "43",
    title: "Boulevard of Broken Dreams",
    artist: "Green Day",
    genres: ["Alternative Rock", "Punk"],
    moods: ["Melancholic", "Relaxed"],
    energy: 5,
    purposes: ["Commuting", "Chilling"],
    era: "2000s",
    region: "Bay Area"
  },
  {
    id: "44",
    title: "Like a Stone",
    artist: "Audioslave",
    genres: ["Alternative Rock", "Grunge"],
    moods: ["Melancholic", "Relaxed"],
    energy: 5,
    purposes: ["Chilling", "Commuting"],
    era: "2000s",
    region: "Los Angeles"
  },
  {
    id: "45",
    title: "No One Knows",
    artist: "Queens of the Stone Age",
    genres: ["Alternative Rock", "Hard Rock"],
    moods: ["Energetic", "Focused"],
    energy: 8,
    purposes: ["Commuting", "Gaming"],
    era: "2000s",
    region: "Los Angeles"
  },
  {
    id: "46",
    title: "Black Hole Sun",
    artist: "Soundgarden",
    genres: ["Grunge", "Alternative Rock"],
    moods: ["Melancholic", "Dark"],
    energy: 5,
    purposes: ["Chilling", "Venting"],
    era: "1990s",
    region: "Seattle"
  },
  {
    id: "47",
    title: "Alive",
    artist: "Pearl Jam",
    genres: ["Grunge", "Classic Rock"],
    moods: ["Uplifting", "Energetic"],
    energy: 7,
    purposes: ["Commuting", "Venting"],
    era: "1990s",
    region: "Seattle"
  },
  {
    id: "48",
    title: "Rooster",
    artist: "Alice in Chains",
    genres: ["Grunge", "Alternative Rock"],
    moods: ["Dark", "Melancholic"],
    energy: 5,
    purposes: ["Chilling", "Venting"],
    era: "1990s",
    region: "Seattle"
  },
  {
    id: "49",
    title: "Would?",
    artist: "Alice in Chains",
    genres: ["Grunge"],
    moods: ["Dark", "Melancholic"],
    energy: 7,
    purposes: ["Commuting", "Venting"],
    era: "1990s",
    region: "Seattle"
  },
  {
    id: "50",
    title: "1979",
    artist: "Smashing Pumpkins",
    genres: ["Alternative Rock"],
    moods: ["Relaxed", "Uplifting"],
    energy: 5,
    purposes: ["Chilling", "Commuting"],
    era: "1990s",
    region: "Other"
  },
  {
    id: "51",
    title: "Seven Nation Army",
    artist: "The White Stripes",
    genres: ["Alternative Rock", "Hard Rock"],
    moods: ["Energetic", "Focused"],
    energy: 7,
    purposes: ["Workout", "Gaming"],
    era: "2000s",
    region: "Other"
  },
  {
    id: "52",
    title: "Nightmare",
    artist: "Avenged Sevenfold",
    genres: ["Heavy Metal"],
    moods: ["Dark", "Angry"],
    energy: 9,
    purposes: ["Workout", "Gaming"],
    era: "2010s",
    region: "Los Angeles"
  },
  {
    id: "53",
    title: "Hail to the King",
    artist: "Avenged Sevenfold",
    genres: ["Heavy Metal", "Hard Rock"],
    moods: ["Energetic", "Uplifting"],
    energy: 8,
    purposes: ["Workout", "Gaming"],
    era: "2010s",
    region: "Los Angeles"
  },
  {
    id: "54",
    title: "Throne",
    artist: "Bring Me The Horizon",
    genres: ["Alternative Metal", "Nu Metal"],
    moods: ["Rebellious", "Energetic"],
    energy: 8,
    purposes: ["Workout", "Gaming"],
    era: "2010s",
    region: "London"
  },
  {
    id: "55",
    title: "Shadow Moses",
    artist: "Bring Me The Horizon",
    genres: ["Alternative Metal", "Heavy Metal"],
    moods: ["Angry", "Energetic"],
    energy: 9,
    purposes: ["Workout", "Moshpit"],
    era: "2010s",
    region: "London"
  },
  {
    id: "56",
    title: "Ace of Spades",
    artist: "Motorhead",
    genres: ["Hard Rock", "Heavy Metal"],
    moods: ["Energetic", "Rebellious"],
    energy: 9,
    purposes: ["Workout", "Moshpit", "Gaming"],
    era: "1980s",
    region: "London"
  },
  {
    id: "57",
    title: "Painkiller",
    artist: "Judas Priest",
    genres: ["Heavy Metal", "Thrash Metal"],
    moods: ["Energetic", "Angry"],
    energy: 10,
    purposes: ["Workout", "Moshpit"],
    era: "1990s",
    region: "Birmingham"
  },
  {
    id: "58",
    title: "Symphony of Destruction",
    artist: "Megadeth",
    genres: ["Thrash Metal"],
    moods: ["Dark", "Rebellious"],
    energy: 8,
    purposes: ["Workout", "Gaming"],
    era: "1990s",
    region: "Los Angeles"
  },
  {
    id: "59",
    title: "Raining Blood",
    artist: "Slayer",
    genres: ["Thrash Metal"],
    moods: ["Angry", "Dark"],
    energy: 10,
    purposes: ["Workout", "Moshpit"],
    era: "1980s",
    region: "Los Angeles"
  },
  {
    id: "60",
    title: "Firestarter",
    artist: "The Prodigy",
    genres: ["Industrial Rock", "Synthwave"],
    moods: ["Rebellious", "Energetic"],
    energy: 9,
    purposes: ["Workout", "Gaming"],
    era: "1990s",
    region: "London"
  },
  {
    id: "61",
    title: "Tech Noir",
    artist: "Gunship",
    genres: ["Synthwave"],
    moods: ["Relaxed", "Dark"],
    energy: 5,
    purposes: ["Chilling", "Study/Focus"],
    era: "2010s",
    region: "London"
  },
  {
    id: "62",
    title: "Future Club",
    artist: "Perturbator",
    genres: ["Synthwave"],
    moods: ["Dark", "Energetic"],
    energy: 8,
    purposes: ["Gaming", "Study/Focus"],
    era: "2010s",
    region: "Other"
  },
  {
    id: "63",
    title: "Turbo Killer",
    artist: "Carpenter Brut",
    genres: ["Synthwave"],
    moods: ["Energetic", "Dark"],
    energy: 9,
    purposes: ["Workout", "Gaming"],
    era: "2010s",
    region: "Other"
  },
  {
    id: "64",
    title: "Square Hammer",
    artist: "Ghost",
    genres: ["Hard Rock", "Heavy Metal"],
    moods: ["Uplifting", "Energetic"],
    energy: 8,
    purposes: ["Commuting", "Gaming"],
    era: "2010s",
    region: "Other"
  },
  {
    id: "65",
    title: "Dance Macabre",
    artist: "Ghost",
    genres: ["Hard Rock", "Synthwave"],
    moods: ["Uplifting", "Energetic"],
    energy: 7,
    purposes: ["Moshpit", "Commuting"],
    era: "2010s",
    region: "Other"
  },
  {
    id: "66",
    title: "Wish I Had an Angel",
    artist: "Nightwish",
    genres: ["Symphonic Metal", "Heavy Metal"],
    moods: ["Energetic", "Dark"],
    energy: 8,
    purposes: ["Workout", "Gaming"],
    era: "2000s",
    region: "Other"
  },
  {
    id: "67",
    title: "Ghost of Perdition",
    artist: "Opeth",
    genres: ["Progressive Rock", "Heavy Metal"],
    moods: ["Dark", "Melancholic"],
    energy: 8,
    purposes: ["Gaming", "Study/Focus"],
    era: "2000s",
    region: "Gothenburg"
  },
  {
    id: "68",
    title: "Creep",
    artist: "Radiohead",
    genres: ["Alternative Rock"],
    moods: ["Melancholic", "Dark"],
    energy: 4,
    purposes: ["Venting", "Chilling"],
    era: "1990s",
    region: "London"
  },
  {
    id: "69",
    title: "Where Is My Mind?",
    artist: "Pixies",
    genres: ["Alternative Rock", "Post-Punk"],
    moods: ["Melancholic", "Relaxed"],
    energy: 5,
    purposes: ["Chilling", "Commuting"],
    era: "1980s",
    region: "New York"
  },
  {
    id: "70",
    title: "Bela Lugosi's Dead",
    artist: "Bauhaus",
    genres: ["Gothic Rock", "Post-Punk"],
    moods: ["Dark", "Relaxed"],
    energy: 3,
    purposes: ["Chilling", "Study/Focus"],
    era: "1970s",
    region: "London"
  },
  {
    id: "71",
    title: "Black No. 1",
    artist: "Type O Negative",
    genres: ["Gothic Rock", "Heavy Metal"],
    moods: ["Dark", "Melancholic"],
    energy: 5,
    purposes: ["Chilling", "Venting"],
    era: "1990s",
    region: "New York"
  },
  {
    id: "72",
    title: "Temple of Love",
    artist: "The Sisters of Mercy",
    genres: ["Gothic Rock", "Post-Punk"],
    moods: ["Energetic", "Dark"],
    energy: 8,
    purposes: ["Commuting", "Gaming"],
    era: "1980s",
    region: "Other"
  },
  {
    id: "73",
    title: "London Calling",
    artist: "The Clash",
    genres: ["Punk"],
    moods: ["Rebellious", "Energetic"],
    energy: 7,
    purposes: ["Commuting", "Venting"],
    era: "1970s",
    region: "London"
  },
  {
    id: "74",
    title: "Blitzkrieg Bop",
    artist: "Ramones",
    genres: ["Punk"],
    moods: ["Energetic", "Uplifting"],
    energy: 8,
    purposes: ["Commuting", "Moshpit"],
    era: "1970s",
    region: "New York"
  },
  {
    id: "75",
    title: "All the Small Things",
    artist: "Blink-182",
    genres: ["Punk"],
    moods: ["Uplifting", "Energetic"],
    energy: 7,
    purposes: ["Commuting", "Chilling"],
    era: "1990s",
    region: "Los Angeles"
  },
  {
    id: "76",
    title: "Blood and Thunder",
    artist: "Mastodon",
    genres: ["Heavy Metal", "Progressive Rock"],
    moods: ["Angry", "Energetic"],
    energy: 9,
    purposes: ["Workout", "Gaming"],
    era: "2000s",
    region: "Other"
  },
  {
    id: "77",
    title: "The Red",
    artist: "Chevelle",
    genres: ["Alternative Rock", "Nu Metal"],
    moods: ["Angry", "Melancholic"],
    energy: 7,
    purposes: ["Workout", "Venting"],
    era: "2000s",
    region: "Other"
  },
  {
    id: "78",
    title: "Animal I Have Become",
    artist: "Three Days Grace",
    genres: ["Alternative Rock", "Nu Metal"],
    moods: ["Angry", "Rebellious"],
    energy: 8,
    purposes: ["Workout", "Venting"],
    era: "2000s",
    region: "Other"
  },
  {
    id: "79",
    title: "I Stand Alone",
    artist: "Godsmack",
    genres: ["Heavy Metal", "Hard Rock"],
    moods: ["Energetic", "Rebellious"],
    energy: 8,
    purposes: ["Workout", "Gaming"],
    era: "2000s",
    region: "Other"
  },
  {
    id: "80",
    title: "The Beautiful People",
    artist: "Marilyn Manson",
    genres: ["Industrial Rock"],
    moods: ["Rebellious", "Angry"],
    energy: 8,
    purposes: ["Workout", "Moshpit"],
    era: "1990s",
    region: "Other"
  },
  {
    id: "81",
    title: "Last Resort",
    artist: "Papa Roach",
    genres: ["Nu Metal"],
    moods: ["Angry", "Rebellious"],
    energy: 8,
    purposes: ["Workout", "Venting"],
    era: "2000s",
    region: "Bay Area"
  },
  {
    id: "82",
    title: "My Curse",
    artist: "Killswitch Engage",
    genres: ["Heavy Metal", "Alternative Metal"],
    moods: ["Melancholic", "Energetic"],
    energy: 8,
    purposes: ["Workout", "Venting"],
    era: "2000s",
    region: "Other"
  },
  // GLAM METAL ADDITIONS
  {
    id: "83",
    title: "Kickstart My Heart",
    artist: "Mötley Crüe",
    genres: ["Glam Metal", "Classic Rock"],
    moods: ["Energetic"],
    energy: 9,
    purposes: ["Workout", "Gaming"],
    era: "1980s",
    region: "Los Angeles"
  },
  {
    id: "84",
    title: "Welcome to the Jungle",
    artist: "Guns N' Roses",
    genres: ["Hard Rock", "Glam Metal"],
    moods: ["Rebellious", "Energetic"],
    energy: 8,
    purposes: ["Workout", "Commuting"],
    era: "1980s",
    region: "Los Angeles"
  },
  {
    id: "85",
    title: "Pour Some Sugar on Me",
    artist: "Def Leppard",
    genres: ["Glam Metal", "Classic Rock"],
    moods: ["Energetic", "Uplifting"],
    energy: 7,
    purposes: ["Moshpit"],
    era: "1980s",
    region: "London"
  },
  {
    id: "86",
    title: "Livin' on a Prayer",
    artist: "Bon Jovi",
    genres: ["Hard Rock", "Glam Metal"],
    moods: ["Uplifting", "Energetic"],
    energy: 8,
    purposes: ["Commuting"],
    era: "1980s",
    region: "New York"
  },
  {
    id: "87",
    title: "Every Rose Has Its Thorn",
    artist: "Poison",
    genres: ["Glam Metal", "Classic Rock"],
    moods: ["Melancholic", "Relaxed"],
    energy: 3,
    purposes: ["Chilling", "Venting"],
    era: "1980s",
    region: "Los Angeles"
  },
  {
    id: "88",
    title: "Metal Health (Bang Your Head)",
    artist: "Quiet Riot",
    genres: ["Glam Metal", "Heavy Metal"],
    moods: ["Energetic", "Rebellious"],
    energy: 8,
    purposes: ["Moshpit"],
    era: "1980s",
    region: "Los Angeles"
  }
];

export const songs: Song[] = rawSongs.map(s => ({
  ...s,
  youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(s.artist + " - " + s.title)}`,
  spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(s.artist + " " + s.title)}`
}));
