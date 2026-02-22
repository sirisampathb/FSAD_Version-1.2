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

export const ADMIN_STATS = {
  totalUsers: 12450,
  totalMonuments: 84,
  activeTours: 1240,
  discussions: 5430
};
