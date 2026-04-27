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
                System.out.println("🌱 Database is empty. Seeding majestic monuments...");

                repository.saveAll(List.of(
                        new Monument(null, "Taj Mahal", "Agra, Uttar Pradesh", "1631", "Mughal Empire", "Indo-Islamic Architecture", true, "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800", "An ivory-white marble mausoleum on the right bank of the river Yamuna.", List.of(new Monument.TimelineEvent("1631", "Construction began")), List.of("Built by Shah Jahan", "Changes color based on sunlight")),
                        new Monument(null, "Qutub Minar", "New Delhi", "1192", "Delhi Sultanate", "Indo-Islamic Architecture", true, "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800", "A 73-metre tall tapering tower of five storeys.", List.of(new Monument.TimelineEvent("1192", "Foundation laid")), List.of("Tallest brick minaret in the world")),
                        new Monument(null, "Hampi Ruins", "Hampi, Karnataka", "14th Century", "Vijayanagara Empire", "Dravidian Architecture", true, "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800", "The spectacular ruins of the capital of the Vijayanagara Empire.", List.of(new Monument.TimelineEvent("1336", "Founded by Harihara I")), List.of("Second-largest medieval-era city")),
                        new Monument(null, "Hawa Mahal", "Jaipur, Rajasthan", "1799", "Rajput", "Rajput Architecture", false, "https://images.unsplash.com/photo-1514222709107-a180c68d72b4?auto=format&fit=crop&q=80&w=800", "The Palace of Winds, a five-storey exterior akin to a honeycomb.", List.of(new Monument.TimelineEvent("1799", "Built by Sawai Pratap Singh")), List.of("Has 953 small windows")),
                        new Monument(null, "Kashi Vishwanath Temple", "Varanasi, Uttar Pradesh", "1780", "Maratha Empire", "Hindu Architecture", false, "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&q=80&w=800", "One of the most famous Hindu temples dedicated to Lord Shiva.", List.of(new Monument.TimelineEvent("1780", "Rebuilt by Ahilyabai Holkar")), List.of("Located on the western bank of the holy river Ganga")),
                        new Monument(null, "Mysore Palace", "Mysore, Karnataka", "1912", "Wadiyar Dynasty", "Indo-Saracenic Architecture", false, "https://images.unsplash.com/photo-1621831788755-d143c7b67ae2?auto=format&fit=crop&q=80&w=800", "A historical palace and a royal residence.", List.of(new Monument.TimelineEvent("1912", "Construction completed")), List.of("One of the most visited monuments in India after Taj Mahal"))
                ));
                
                System.out.println("✅ Successfully seeded monuments into the Postgres Database!");
            } else {
                System.out.println("⚡ Database already contains monuments. Skipping seed.");
            }
        };
    }
}
