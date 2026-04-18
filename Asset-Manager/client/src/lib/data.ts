import tajMahalImg from '../assets/images/taj-mahal.png';
import qutubMinarImg from '../assets/images/qutub-minar.png';
import hampiImg from '../assets/images/hampi.png';
import hawaMahalImg from '../assets/images/hawa-mahal.png';

export const MONUMENTS = [
  {
    id: 'taj-mahal',
    name: 'Taj Mahal',
    location: 'Agra, Uttar Pradesh',
    builtYear: '1631',
    dynasty: 'Mughal Empire',
    style: 'Indo-Islamic Architecture',
    unesco: true,
    image: tajMahalImg,
    description: 'An ivory-white marble mausoleum on the right bank of the river Yamuna, universally admired as a masterpiece of world heritage.',
    timeline: [
      { year: '1631', event: 'Construction began' },
      { year: '1648', event: 'Main mausoleum completed' },
      { year: '1653', event: 'Entire complex completed' },
      { year: '1983', event: 'Designated a UNESCO World Heritage Site' }
    ],
    funFacts: [
      'It was built by Shah Jahan in memory of his wife Mumtaz Mahal.',
      'The marble changes color depending on the time of day.',
      'It took around 20,000 artisans to build it.'
    ]
  },
  {
    id: 'qutub-minar',
    name: 'Qutub Minar',
    location: 'New Delhi',
    builtYear: '1192',
    dynasty: 'Delhi Sultanate',
    style: 'Indo-Islamic Architecture',
    unesco: true,
    image: qutubMinarImg,
    description: 'A 73-metre tall tapering tower of five storeys, with a 14.3 metres base diameter, built to celebrate Muslim dominance in Delhi after the defeat of the last Hindu ruler.',
    timeline: [
      { year: '1192', event: 'Foundation laid by Qutb-ud-din Aibak' },
      { year: '1220', event: 'Three storeys added by Iltutmish' },
      { year: '1369', event: 'Top storey damaged by lightning and rebuilt' }
    ],
    funFacts: [
      'It is the tallest brick minaret in the world.',
      'The Iron Pillar in the complex has not rusted in over 1600 years.'
    ]
  },
  {
    id: 'hampi',
    name: 'Monuments at Hampi',
    location: 'Hampi, Karnataka',
    builtYear: '14th Century',
    dynasty: 'Vijayanagara Empire',
    style: 'Dravidian Architecture',
    unesco: true,
    image: hampiImg,
    description: 'The spectacular ruins of the capital of the Vijayanagara Empire, featuring stunning temples, chariot structures, and ancient bazars.',
    timeline: [
      { year: '1336', event: 'Founded by Harihara I and Bukka Raya I' },
      { year: '1509', event: 'Krishnadevaraya\'s rule begins, golden era' },
      { year: '1565', event: 'Battle of Talikota, city abandoned' }
    ],
    funFacts: [
      'Hampi was the second-largest medieval-era city after Beijing.',
      'The stone chariot is actually a shrine dedicated to Garuda.'
    ]
  },
  {
    id: 'hawa-mahal',
    name: 'Hawa Mahal',
    location: 'Jaipur, Rajasthan',
    builtYear: '1799',
    dynasty: 'Rajput',
    style: 'Rajput Architecture',
    unesco: false,
    image: hawaMahalImg,
    description: 'The Palace of Winds, a five-storey exterior akin to a honeycomb with its 953 small windows called Jharokhas.',
    timeline: [
      { year: '1799', event: 'Built by Maharaja Sawai Pratap Singh' },
      { year: '2006', event: 'Major restoration work undertaken' }
    ],
    funFacts: [
      'It has 953 small windows called Jharokhas.',
      'It was built without a foundation and leans at an 87-degree angle.'
    ]
  }
];

export const STATE_DATA = [
  {
    id: "andhra-pradesh",
    name: "Andhra Pradesh",
    description: "The land of the Koh-i-Noor diamond and divine temples.",
    monuments: ["Tirupati Temple", "Charminar (Historical Tie)", "Undavalli Caves", "Golconda Fort"],
    foods: ["Pesarattu", "Hyderabadi Biryani", "Gongura Pachadi", "Pootharekulu"],
    color: "from-orange-400 to-red-500",
    bestTimeToVisit: "October to March",
    highlights: ["Spiritual Tourism", "Classical Kuchipudi Dance", "Chilli Capital Guntur"]
  },
  {
    id: "arunachal-pradesh",
    name: "Arunachal Pradesh",
    description: "The Land of the Rising Sun, home to pristine valleys and ancient monasteries.",
    monuments: ["Tawang Monastery", "Golden Pagoda", "Ita Fort", "Dirang Dzong"],
    foods: ["Thukpa", "Momos", "Zan", "Pika Pila"],
    color: "from-emerald-400 to-teal-600",
    bestTimeToVisit: "October to April",
    highlights: ["Largest Monastery in India", "Orchid State of India", "Indigenous Tribes"]
  },
  {
    id: "assam",
    name: "Assam",
    description: "Famous for its tea gardens, silk, and the one-horned rhinoceros.",
    monuments: ["Kamakhya Temple", "Rang Ghar", "Ahom Palaces", "Kaziranga Park"],
    foods: ["Masor Tenga", "Khar", "Pitha", "Duck Meat Curry"],
    color: "from-green-500 to-emerald-700",
    bestTimeToVisit: "November to March",
    highlights: ["World's Largest Tea Producer", "Bihu Festival", "One-horned Rhino"]
  },
  {
    id: "bihar",
    name: "Bihar",
    description: "A land where Buddha walked; the center of ancient learning and spirituality.",
    monuments: ["Mahabodhi Temple", "Nalanda University", "Sher Shah Suri Tomb", "Vikramshila"],
    foods: ["Litti Chokha", "Sattu Paratha", "Thekua", "Khaja"],
    color: "from-amber-500 to-yellow-600",
    bestTimeToVisit: "October to March",
    highlights: ["Birthplace of Buddhism", "Oldest University", "Madhubani Painting"]
  },
  {
    id: "chhattisgarh",
    name: "Chhattisgarh",
    description: "The 'Rice Bowl of India', known for its tribal culture and waterfalls.",
    monuments: ["Bhoramdeo Temple", "Sirpur Ruins", "Chitrakoot Falls", "Kailash Caves"],
    foods: ["Chila", "Muthia", "Fara", "Bafauri"],
    color: "from-lime-500 to-green-600",
    bestTimeToVisit: "October to February",
    highlights: ["Niagara of India (Chitrakoot)", "Tribal Heritage", "Iron Production Hub"]
  },
  {
    id: "goa",
    name: "Goa",
    description: "India's pocket-sized paradise, famous for its beaches and colonial history.",
    monuments: ["Basilica of Bom Jesus", "Aguada Fort", "Se Cathedral", "Chapora Fort"],
    foods: ["Fish Curry", "Bebinca", "Pork Vindaloo", "Feni"],
    color: "from-blue-400 to-cyan-500",
    bestTimeToVisit: "November to February",
    highlights: ["Portuguese Architecture", "Beach Lifestyle", "Carnival Festival"]
  },
  {
    id: "gujarat",
    name: "Gujarat",
    description: "Famous for its white desert, vibrant culture, and mercantile spirit.",
    monuments: ["Somnath Temple", "Rani ki Vav", "Sun Temple (Modhera)", "Laxmi Vilas Palace"],
    foods: ["Dhokla", "Thepla", "Khandvi", "Undhiyu"],
    color: "from-amber-400 to-orange-500",
    bestTimeToVisit: "October to March",
    highlights: ["Rann of Kutch", "Garba Dance", "Statue of Unity"]
  },
  {
    id: "haryana",
    name: "Haryana",
    description: "The land of the Mahabharata and modern industrial growth.",
    monuments: ["Kurukshetra Ruins", "Pinjore Gardens", "Sheikh Chilli's Tomb"],
    foods: ["Kachri ki Sabzi", "Bajra Khichri", "Lassi", "Churu"],
    color: "from-green-600 to-emerald-800",
    bestTimeToVisit: "September to March",
    highlights: ["Battle of Kurukshetra", "Surajkund Mela", "Sports Hub"]
  },
  {
    id: "himachal-pradesh",
    name: "Himachal Pradesh",
    description: "The Land of Snows, offering breathtaking mountain views and serene valleys.",
    monuments: ["Hadimba Temple", "Key Monastery", "Kangra Fort", "Tabo Monastery"],
    foods: ["Dham", "Siddu", "Chana Madra", "Thukpa"],
    color: "from-blue-100 to-blue-400",
    bestTimeToVisit: "March to June",
    highlights: ["Adventure Sports", "Apple Orchards", "Buddhist Culture"]
  },
  {
    id: "jharkhand",
    name: "Jharkhand",
    description: "The 'Land of Forests', rich in mineral wealth and tribal traditions.",
    monuments: ["Baidyanath Temple", "Jagannath Temple (Ranchi)", "Hundru Falls"],
    foods: ["Dhuska", "Litti Chokha", "Pitha", "Rugra"],
    color: "from-green-700 to-teal-800",
    bestTimeToVisit: "October to March",
    highlights: ["Coal Capital", "Steel City Jamshedpur", "Natural Waterfalls"]
  },
  {
    id: "karnataka",
    name: "Karnataka",
    description: "A blend of ancient heritage ruins and modern technology hubs.",
    monuments: ["Hampi Ruins", "Mysore Palace", "Gol Gumbaz", "Badami Caves"],
    foods: ["Bisi Bele Bath", "Mysore Pak", "Dharwad Pedha", "Ragi Mudde"],
    color: "from-cyan-500 to-blue-600",
    bestTimeToVisit: "October to March",
    highlights: ["Silicon Valley of India", "Vijayanagara History", "Coffee Plantations"]
  },
  {
    id: "kerala",
    name: "Kerala",
    description: "God's Own Country, known for backwaters, tea plantations, and lagoons.",
    monuments: ["Bekal Fort", "Padmanabhaswamy Temple", "Mattancherry Palace", "Jewish Synagogue"],
    foods: ["Appam & Stew", "Karimeen Pollichathu", "Sadhya", "Malabar Parotta"],
    color: "from-green-400 to-lime-500",
    bestTimeToVisit: "September to March",
    highlights: ["Aurveda", "Houseboats", "Kathakali Dance"]
  },
  {
    id: "madhya-pradesh",
    name: "Madhya Pradesh",
    description: "The Heart of India, home to tigers and world-renowned heritage sites.",
    monuments: ["Khajuraho Temples", "Sanchi Stupa", "Gwalior Fort", "Bhimbetka Caves"],
    foods: ["Poha", "Bhutte Ka Kees", "Dal Bafla", "Malpua"],
    color: "from-purple-500 to-indigo-600",
    bestTimeToVisit: "October to March",
    highlights: ["Tiger Reserves", "Ancient Sculptures", "Narmada River"]
  },
  {
    id: "maharashtra",
    name: "Maharashtra",
    description: "Home to the business capital Mumbai and the world-famous Ajanta & Ellora caves.",
    monuments: ["Gateway of India", "Ajanta & Ellora Caves", "Shaniwar Wada", "Raigad Fort"],
    foods: ["Vada Pav", "Misal Pav", "Puran Poli", "Pav Bhaji"],
    color: "from-blue-500 to-indigo-600",
    bestTimeToVisit: "October to March",
    highlights: ["Maratha History", "Bollywood", "Cave Paintings"]
  },
  {
    id: "manipur",
    name: "Manipur",
    description: "The Jewel of India, famous for its floating lake and classical dance.",
    monuments: ["Kangla Fort", "Loktak Lake", "Shree Govindajee Temple"],
    foods: ["Eromba", "Kangshoi", "Singju", "Morok Metpa"],
    color: "from-pink-500 to-rose-600",
    bestTimeToVisit: "October to March",
    highlights: ["Floating Lake (Loktak)", "Manipuri Dance", "Polo Birthplace"]
  },
  {
    id: "meghalaya",
    name: "Meghalaya",
    description: "The Abode of Clouds, home to the wettest places on Earth and living root bridges.",
    monuments: ["Living Root Bridges", "Umiam Lake", "Laitlum Canyons"],
    foods: ["Jadoh", "Doh-Khlieh", "Nakti Bitchi"],
    color: "from-sky-400 to-blue-600",
    bestTimeToVisit: "October to April",
    highlights: ["Living Root Bridges", "Cleanest Village in Asia", "Rainiest State"]
  },
  {
    id: "mizoram",
    name: "Mizoram",
    description: "The Land of the Highlanders, known for its bamboo dance and scenic hills.",
    monuments: ["Solomon's Temple", "Dampa Tiger Reserve", "Vantawng Falls"],
    foods: ["Bai", "Koat Pitha", "Misa Mach Poora"],
    color: "from-violet-500 to-purple-700",
    bestTimeToVisit: "October to March",
    highlights: ["Bamboo Dance (Cheraw)", "Mizo Heritage", "Diverse Flora/Fauna"]
  },
  {
    id: "nagaland",
    name: "Nagaland",
    description: "The Land of Festivals, home to vibrant Naga tribes and the Hornbill Festival.",
    monuments: ["Kohima War Cemetery", "Kachari Ruins", "Khonoma Village"],
    foods: ["Axone Curry", "Smoked Pork", "Galho", "Zutho"],
    color: "from-red-600 to-orange-700",
    bestTimeToVisit: "October to May",
    highlights: ["Hornbill Festival", "Naga Warrior Culture", "Dzukou Valley"]
  },
  {
    id: "odisha",
    name: "Odisha",
    description: "Known for its tribal culture and many ancient Hindu temples.",
    monuments: ["Konark Sun Temple", "Jagannath Temple", "Lingaraja Temple", "Udayagiri Caves"],
    foods: ["Dalma", "Chhena Poda", "Rasabali", "Pakhala Bhata"],
    color: "from-purple-500 to-violet-600",
    bestTimeToVisit: "October to March",
    highlights: ["Odissi Dance", "Konark Sun Temple", "Puri Beach Festival"]
  },
  {
    id: "punjab",
    name: "Punjab",
    description: "The land of five rivers, hospitality, and the Golden Temple.",
    monuments: ["Golden Temple", "Jallianwala Bagh", "Qila Mubarak", "Wagah Border"],
    foods: ["Butter Chicken", "Sarson da Saag", "Amritsari Kulcha", "Lassi"],
    color: "from-yellow-400 to-amber-500",
    bestTimeToVisit: "October to March",
    highlights: ["Golden Temple", "Bhangra Dance", "Wheat Granary of India"]
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    description: "The Land of Kings, famous for its majestic forts, deserts, and royal heritage.",
    monuments: ["Amer Fort", "Mehrangarh Fort", "Hawa Mahal", "Jaisalmer Fort"],
    foods: ["Dal Baati Churma", "Laal Maas", "Gatte ki Sabzi", "Ker Sangri"],
    color: "from-orange-500 to-red-600",
    bestTimeToVisit: "October to March",
    highlights: ["Desert Architecture", "Rajput Culture", "Palace on Wheels"]
  },
  {
    id: "sikkim",
    name: "Sikkim",
    description: "A Himalayan wonderland with a rich blend of culture and nature.",
    monuments: ["Rumtek Monastery", "Enchey Monastery", "Nathu La Pass"],
    foods: ["Sishnu Soup", "Gundruk", "Phagshapa", "Thenthuk"],
    color: "from-emerald-300 to-green-500",
    bestTimeToVisit: "March to May",
    highlights: ["Kanchanjunga", "Organic State", "Tibetan Buddhism"]
  },
  {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    description: "Known for its Dravidian-style Hindu temples and classical arts.",
    monuments: ["Meenakshi Temple", "Brihadisvara Temple", "Shore Temple", "Vivekananda Rock"],
    foods: ["Masala Dosa", "Idli Sambhar", "Chettinad Chicken", "Pongal"],
    color: "from-yellow-500 to-amber-600",
    bestTimeToVisit: "November to February",
    highlights: ["Dravidian Architecture", "Bharatanatyam", "Textile Hub"]
  },
  {
    id: "telangana",
    name: "Telangana",
    description: "The youngest state of India, bridge between North and South.",
    monuments: ["Charminar", "Warangal Fort", "Ramappa Temple", "Golkonda Fort"],
    foods: ["Hyderabadi Biryani", "Sakinalu", "Sarvapindi", "Double Ka Meetha"],
    color: "from-amber-600 to-red-600",
    bestTimeToVisit: "October to March",
    highlights: ["Pearls of Hyderabad", "IT Hub", "Kakatiya Architecture"]
  },
  {
    id: "tripura",
    name: "Tripura",
    description: "A land of exquisite bamboo handicrafts and ancient temples.",
    monuments: ["Ujjayanta Palace", "Neermahal", "Unakoti Sculptures"],
    foods: ["Mui Borok", "Chuak", "Chakhwi"],
    color: "from-rose-400 to-pink-600",
    bestTimeToVisit: "October to March",
    highlights: ["Water Palace (Neermahal)", "Rock Cut Sculptures", "Bamboo Crafts"]
  },
  {
    id: "uttar-pradesh",
    name: "Uttar Pradesh",
    description: "The heart of India, home to the iconic Taj Mahal and Holy city of Varanasi.",
    monuments: ["Taj Mahal", "Agra Fort", "Bara Imambara", "Dhamek Stupa"],
    foods: ["Galouti Kebab", "Petha", "Tahri", "Aloo Poori"],
    color: "from-green-500 to-emerald-600",
    bestTimeToVisit: "October to March",
    highlights: ["Taj Mahal", "Spirituality at Varanasi", "Awadhi Cuisine"]
  },
  {
    id: "uttarakhand",
    name: "Uttarakhand",
    description: "The Devbhumi (Land of Gods), gateway to the Himalayas.",
    monuments: ["Kedarnath Temple", "Badrinath Temple", "Rishikesh Laxman Jhula"],
    foods: ["Kafuli", "Bhang Ki Chutney", "Kandalee Ka Saag"],
    color: "from-blue-300 to-indigo-500",
    bestTimeToVisit: "March to June",
    highlights: ["Yoga Capital (Rishikesh)", "Char Dham Yatra", "Valley of Flowers"]
  },
  {
    id: "west-bengal",
    name: "West Bengal",
    description: "Land of literature, art, and the majestic Royal Bengal Tiger.",
    monuments: ["Victoria Memorial", "Howrah Bridge", "Dakshineswar Temple", "Hazarduari Palace"],
    foods: ["Kosha Mangsho", "Rosogolla", "Machher Jhol", "Ilish Bhapa"],
    color: "from-red-500 to-rose-600",
    bestTimeToVisit: "October to March",
    highlights: ["Durga Puja", "Literature Legacy", "Sundarbans"]
  }
];

export const ADMIN_STATS = {
  totalUsers: 12450,
  totalMonuments: 84,
  activeTours: 1240,
  discussions: 5430
};

