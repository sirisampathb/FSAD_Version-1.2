import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';

// Wikipedia URL for UNESCO World Heritage Sites in India
const URL = 'https://en.wikipedia.org/wiki/List_of_World_Heritage_Sites_in_India';

async function scrapeMonuments() {
    console.log('🏛️ Initializing Royal Heritage Scraper...');
    console.log('📡 Fetching data from Wikipedia...');

    try {
        const { data } = await axios.get(URL);
        const $ = cheerio.load(data);
        
        const monuments = [];

        // Find the main table containing the heritage sites
        $('table.wikitable.sortable tbody tr').each((index, element) => {
            if (index === 0) return; // Skip header row

            const tds = $(element).find('td');
            const th = $(element).find('th'); // Sometimes the name is in a 'th' element

            if (tds.length > 0) {
                const name = $(th).text().trim() || $(tds[0]).text().trim();
                let location = $(tds[1]).text().trim();
                let yearBuilt = $(tds[2]).text().trim();
                let description = $(tds[4]).text().trim();

                // Clean up references like [1], [2] from text
                const cleanText = (text) => text.replace(/\[\d+\]/g, '').replace(/\n/g, ' ').trim();

                if (name && description) {
                    monuments.push({
                        id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                        name: cleanText(name),
                        location: cleanText(location),
                        builtYear: cleanText(yearBuilt) || "Ancient",
                        dynasty: "Indian Heritage", // Placeholder, can be refined
                        style: "Classic Indian Architecture", // Placeholder
                        unesco: true,
                        image: `https://source.unsplash.com/800x600/?${encodeURIComponent(name.split(' ')[0] + ' monument india')}`,
                        description: cleanText(description),
                        timeline: [
                            { year: cleanText(yearBuilt), event: "Constructed or Recognized" }
                        ],
                        funFacts: [
                            `Recognized globally as a UNESCO World Heritage Site.`,
                            `Located in the beautiful region of ${cleanText(location).split(',')[0]}.`
                        ]
                    });
                }
            }
        });

        console.log(`✅ Successfully scraped ${monuments.length} majestic monuments!`);
        
        // Save to a JSON file
        const outputPath = path.join(process.cwd(), 'scraped_monuments.json');
        await fs.writeFile(outputPath, JSON.stringify(monuments, null, 2));
        
        console.log(`💾 Data saved to: ${outputPath}`);
        console.log(`🚀 You can now import this JSON file into your Spring Boot Postgres Database or frontend data.ts!`);

    } catch (error) {
        console.error('❌ Error scraping data:', error.message);
    }
}

scrapeMonuments();
