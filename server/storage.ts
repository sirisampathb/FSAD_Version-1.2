import { type User, type InsertUser, type Monument, type InsertMonument } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getMonuments(): Promise<Monument[]>;
  getMonument(id: string): Promise<Monument | undefined>;
  createMonument(monument: InsertMonument): Promise<Monument>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private monuments: Map<string, Monument>;

  constructor() {
    this.users = new Map();
    this.monuments = new Map();
    this.seedMonuments();
  }

  private seedMonuments() {
    const monuments: Omit<Monument, 'id'>[] = [
      {
        name: 'Taj Mahal',
        location: 'Agra, Uttar Pradesh',
        builtYear: '1631',
        dynasty: 'Mughal Empire',
        style: 'Indo-Islamic Architecture',
        unesco: true,
        image: '/assets/images/taj-mahal.png',
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
        name: 'Qutub Minar',
        location: 'New Delhi',
        builtYear: '1192',
        dynasty: 'Delhi Sultanate',
        style: 'Indo-Islamic Architecture',
        unesco: true,
        image: '/assets/images/qutub-minar.png',
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
        name: 'Hampi',
        location: 'Karnataka',
        builtYear: '14th century',
        dynasty: 'Vijayanagara Empire',
        style: 'Dravidian Architecture',
        unesco: true,
        image: '/assets/images/hampi.png',
        description: 'A UNESCO World Heritage Site known for its ancient temples, palaces, and other architectural marvels that showcase the glory of the Vijayanagara Empire.',
        timeline: [
          { year: '1336', event: 'Vijayanagara Empire founded' },
          { year: '1565', event: 'Battle of Talikota - empire defeated' },
          { year: '1986', event: 'Designated a UNESCO World Heritage Site' }
        ],
        funFacts: [
          'Hampi was the capital of the Vijayanagara Empire.',
          'It contains over 1600 monuments spread across 26 square kilometers.',
          'The site includes the famous Virupaksha Temple and Vittala Temple.'
        ]
      },
      {
        name: 'Hawa Mahal',
        location: 'Jaipur, Rajasthan',
        builtYear: '1799',
        dynasty: 'Kachhwaha Rajput',
        style: 'Rajput Architecture',
        unesco: false,
        image: '/assets/images/hawa-mahal.png',
        description: 'A palace in Jaipur, India, so named because it was essentially a high screen wall built so the women of the royal household could observe street festivals while unseen from the outside.',
        timeline: [
          { year: '1799', event: 'Construction completed by Maharaja Sawai Pratap Singh' }
        ],
        funFacts: [
          'The palace has 953 small windows (jharokhas) decorated with intricate latticework.',
          'It was built to allow royal women to observe street processions without being seen.',
          'The palace is also known as the "Palace of Winds".'
        ]
      }
    ];

    monuments.forEach(m => {
      const id = randomUUID();
      this.monuments.set(id, { ...m, id });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getMonuments(): Promise<Monument[]> {
    return Array.from(this.monuments.values());
  }

  async getMonument(id: string): Promise<Monument | undefined> {
    return this.monuments.get(id);
  }

  async createMonument(insertMonument: InsertMonument): Promise<Monument> {
    const id = randomUUID();
    const monument: Monument = { 
      ...insertMonument, 
      id, 
      image: insertMonument.image ?? null,
      unesco: insertMonument.unesco ?? false,
      timeline: insertMonument.timeline ?? null,
      funFacts: insertMonument.funFacts ?? null
    };
    this.monuments.set(id, monument);
    return monument;
  }
}

export const storage = new MemStorage();
