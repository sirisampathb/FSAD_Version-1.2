package com.example.monumentbackend.config;

import com.example.monumentbackend.entity.Monument;
import com.example.monumentbackend.repository.MonumentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DatabaseSeeder {

    @Bean
    CommandLineRunner initDatabase(MonumentRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                System.out.println("🌱 Database is empty. Seeding massive authentic registry...");

                repository.saveAll(List.of(
                        // Uttar Pradesh
                        new Monument(null, "Taj Mahal", "Agra, Uttar Pradesh", "1631", "Mughal Empire", "Indo-Islamic", true, true, "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800", "An ivory-white marble mausoleum on the right bank of the river Yamuna.", List.of(new Monument.TimelineEvent("1631", "Construction began")), List.of("Built by Shah Jahan", "Changes color based on sunlight")),
                        new Monument(null, "Agra Fort", "Agra, Uttar Pradesh", "1565", "Mughal Empire", "Indo-Islamic", true, true, "https://images.unsplash.com/photo-1584982633000-8d5f30e01490?auto=format&fit=crop&q=80&w=800", "A historical fort in the city of Agra in India.", List.of(new Monument.TimelineEvent("1565", "Built by Akbar")), List.of("Main residence of the emperors of the Mughal Dynasty")),
                        new Monument(null, "Fatehpur Sikri", "Agra, Uttar Pradesh", "1571", "Mughal Empire", "Mughal Architecture", true, true, "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?auto=format&fit=crop&q=80&w=800", "A town in the Agra District of Uttar Pradesh.", List.of(new Monument.TimelineEvent("1571", "Founded by Akbar")), List.of("Served as the capital of the Mughal Empire")),
                        
                        // Delhi
                        new Monument(null, "Qutub Minar", "New Delhi", "1192", "Delhi Sultanate", "Indo-Islamic", true, true, "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800", "A 73-metre tall tapering tower.", List.of(new Monument.TimelineEvent("1192", "Foundation laid")), List.of("Tallest brick minaret in the world")),
                        new Monument(null, "Red Fort", "New Delhi", "1639", "Mughal Empire", "Mughal Architecture", true, true, "https://images.unsplash.com/photo-1582650058863-71abec8ba793?auto=format&fit=crop&q=80&w=800", "A historic fort in the city of Delhi.", List.of(new Monument.TimelineEvent("1639", "Built by Shah Jahan")), List.of("Its massive enclosing walls are of red sandstone")),
                        new Monument(null, "Humayun's Tomb", "New Delhi", "1570", "Mughal Empire", "Mughal Architecture", true, true, "https://images.unsplash.com/photo-1563820246231-1e96a2d9818e?auto=format&fit=crop&q=80&w=800", "The tomb of the Mughal Emperor Humayun.", List.of(new Monument.TimelineEvent("1570", "Built by Bega Begum")), List.of("First garden-tomb on the Indian subcontinent")),

                        // Hidden Legends (Search Only)
                        new Monument(null, "Konark Sun Temple", "Konark, Odisha", "1250", "Eastern Ganga Dynasty", "Kalinga Architecture", true, false, "https://upload.wikimedia.org/wikipedia/commons/4/47/Konark_Sun_Temple_2023.jpg", "A 13th-century Sun Temple shaped like a gigantic chariot.", List.of(new Monument.TimelineEvent("1250", "Built by Narasimhadeva I")), List.of("Wheels are sundials", "Known as Black Pagoda")),
                        new Monument(null, "Victoria Memorial", "Kolkata, West Bengal", "1921", "British Raj", "Indo-Saracenic", false, false, "https://upload.wikimedia.org/wikipedia/commons/7/72/Victoria_Memorial_Kolkata_view.jpg", "A large marble building dedicated to Queen Victoria.", List.of(new Monument.TimelineEvent("1921", "Completed")), List.of("Built with Makrana marble")),
                        new Monument(null, "Sanchi Stupa", "Sanchi, Madhya Pradesh", "3rd Century BCE", "Mauryan Empire", "Buddhist Architecture", true, false, "https://upload.wikimedia.org/wikipedia/commons/b/b3/The_Great_Stupa_Sanchi_Madhya_Pradesh.jpg", "One of the oldest stone structures in India.", List.of(new Monument.TimelineEvent("3rd BCE", "Commissioned by Ashoka")), List.of("Featured on ₹200 note")),
                        
                        // Rajasthan
                        new Monument(null, "Hawa Mahal", "Jaipur, Rajasthan", "1799", "Rajput", "Rajput Architecture", false, true, "https://images.unsplash.com/photo-1514222709107-a180c68d72b4?auto=format&fit=crop&q=80&w=800", "The Palace of Winds, a five-storey exterior akin to a honeycomb.", List.of(new Monument.TimelineEvent("1799", "Built by Sawai Pratap Singh")), List.of("Has 953 small windows")),
                        new Monument(null, "Amer Fort", "Jaipur, Rajasthan", "1592", "Rajput", "Rajput Architecture", true, true, "https://images.unsplash.com/photo-1599661559902-601eab4043dc?auto=format&fit=crop&q=80&w=800", "A fort located in Amer, Rajasthan.", List.of(new Monument.TimelineEvent("1592", "Built by Raja Man Singh")), List.of("Known for its artistic style elements")),
                        new Monument(null, "Mehrangarh Fort", "Jodhpur, Rajasthan", "1459", "Rajput", "Rajput Architecture", false, true, "https://images.unsplash.com/photo-1566896208882-e9c522cb8fb8?auto=format&fit=crop&q=80&w=800", "One of the largest forts in India.", List.of(new Monument.TimelineEvent("1459", "Built by Rao Jodha")), List.of("Situated 410 feet above the city")),

                        // Maharashtra
                        new Monument(null, "Gateway of India", "Mumbai, Maharashtra", "1924", "British Raj", "Indo-Saracenic", false, true, "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=800", "An arch-monument built in the early 20th century.", List.of(new Monument.TimelineEvent("1924", "Construction completed")), List.of("Built to commemorate the landing of King George V")),
                        new Monument(null, "Ajanta Caves", "Chhatrapati Sambhajinagar, Maharashtra", "2nd Century BCE", "Vakataka Dynasty", "Rock-cut Architecture", true, true, "https://images.unsplash.com/photo-1620501869894-315ec0b77b10?auto=format&fit=crop&q=80&w=800", "Approximately 30 rock-cut Buddhist cave monuments.", List.of(new Monument.TimelineEvent("2nd Century BCE", "First phase built")), List.of("Universally regarded as masterpieces of Buddhist religious art")),

                        // Karnataka
                        new Monument(null, "Hampi Ruins", "Hampi, Karnataka", "14th Century", "Vijayanagara Empire", "Dravidian", true, true, "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800", "The spectacular ruins of the capital of the Vijayanagara Empire.", List.of(new Monument.TimelineEvent("1336", "Founded")), List.of("Second-largest medieval-era city")),
                        new Monument(null, "Mysore Palace", "Mysore, Karnataka", "1912", "Wadiyar Dynasty", "Indo-Saracenic", false, true, "https://images.unsplash.com/photo-1621831788755-d143c7b67ae2?auto=format&fit=crop&q=80&w=800", "A historical palace and a royal residence.", List.of(new Monument.TimelineEvent("1912", "Completed")), List.of("Illuminated with 97,000 bulbs on Sundays")),

                        // Andhra Pradesh & Telangana
                        new Monument(null, "Charminar", "Hyderabad, Telangana", "1591", "Qutb Shahi Dynasty", "Islamic Architecture", false, true, "https://images.unsplash.com/photo-1601004838634-118d098e9b6a?auto=format&fit=crop&q=80&w=800", "A mosque and monument located in Hyderabad.", List.of(new Monument.TimelineEvent("1591", "Built by Muhammad Quli Qutb Shah")), List.of("Global icon of Hyderabad")),
                        new Monument(null, "Tirupati Temple", "Tirupati, Andhra Pradesh", "300 AD", "Pallava Dynasty", "Dravidian Architecture", false, true, "https://images.unsplash.com/photo-1554902844-3d7ec103a8de?auto=format&fit=crop&q=80&w=800", "A Hindu temple dedicated to Venkateswara.", List.of(new Monument.TimelineEvent("300 AD", "Origins")), List.of("One of the richest temples in the world")),
                        new Monument(null, "Golconda Fort", "Hyderabad, Telangana", "1143", "Kakatiya Dynasty", "Military Architecture", true, true, "https://images.unsplash.com/photo-1596792375528-7ea1c8a1eef1?auto=format&fit=crop&q=80&w=800", "A fortified citadel and an early capital city of the Qutb Shahi dynasty.", List.of(new Monument.TimelineEvent("1143", "Initially built as a mud fort")), List.of("Known for its acoustic effects")),

                        // Gujarat
                        new Monument(null, "Somnath Temple", "Veraval, Gujarat", "Ancient", "Various", "Chaulukya Architecture", false, true, "https://images.unsplash.com/photo-1622345041766-3d2371900118?auto=format&fit=crop&q=80&w=800", "First among the twelve Aotirlinga shrines of Shiva.", List.of(new Monument.TimelineEvent("1951", "Present temple rebuilt")), List.of("Reconstructed several times in the past after repeated destruction")),
                        
                        // Tamil Nadu
                        new Monument(null, "Brihadisvara Temple", "Thanjavur, Tamil Nadu", "1010", "Chola Dynasty", "Dravidian Architecture", true, true, "https://images.unsplash.com/photo-1621213076161-53664d47c4de?auto=format&fit=crop&q=80&w=800", "A Hindu temple dedicated to Shiva.", List.of(new Monument.TimelineEvent("1010", "Completed")), List.of("One of the largest South Indian temples")),
                        new Monument(null, "Meenakshi Temple", "Madurai, Tamil Nadu", "1190", "Pandya Dynasty", "Dravidian Architecture", false, true, "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800", "A historic Hindu temple located on the southern bank of the Vaigai River.", List.of(new Monument.TimelineEvent("1190", "Current structure began")), List.of("Has 14 gopurams (gateway towers)"))

                ));
                
                System.out.println("✅ Successfully seeded authentic monuments into the Postgres Database!");
            } else {
                System.out.println("⚡ Database already contains monuments. Skipping seed.");
            }
        };
    }
}
