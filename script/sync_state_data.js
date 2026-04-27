const fs = require('fs');
const path = require('path');
const axios = require('axios');

const DATA_FILE = path.join(__dirname, '../client/src/lib/data.ts');
const MONUMENTS_API = 'http://localhost:8080/api/monuments';
const STATES_API = 'http://localhost:8080/api/states';

const EXACT_MONUMENT_IMAGES = {
    "Taj Mahal": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800",
    "Agra Fort": "https://images.unsplash.com/photo-1584982633000-8d5f30e01490?auto=format&fit=crop&q=80&w=800",
    "Fatehpur Sikri": "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?auto=format&fit=crop&q=80&w=800",
    "Qutub Minar": "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800",
    "Red Fort": "https://images.unsplash.com/photo-1582650058863-71abec8ba793?auto=format&fit=crop&q=80&w=800",
    "Humayun's Tomb": "https://images.unsplash.com/photo-1563820246231-1e96a2d9818e?auto=format&fit=crop&q=80&w=800",
    "Hawa Mahal": "https://images.unsplash.com/photo-1514222709107-a180c68d72b4?auto=format&fit=crop&q=80&w=800",
    "Amer Fort": "https://images.unsplash.com/photo-1599661559902-601eab4043dc?auto=format&fit=crop&q=80&w=800",
    "Mehrangarh Fort": "https://images.unsplash.com/photo-1566896208882-e9c522cb8fb8?auto=format&fit=crop&q=80&w=800",
    "Gateway of India": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&q=80&w=800",
    "Ajanta & Ellora Caves": "https://images.unsplash.com/photo-1620501869894-315ec0b77b10?auto=format&fit=crop&q=80&w=800",
    "Hampi Ruins": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800",
    "Mysore Palace": "https://images.unsplash.com/photo-1621831788755-d143c7b67ae2?auto=format&fit=crop&q=80&w=800",
    "Charminar (Historical Tie)": "https://images.unsplash.com/photo-1601004838634-118d098e9b6a?auto=format&fit=crop&q=80&w=800",
    "Tirupati Temple": "https://images.unsplash.com/photo-1554902844-3d7ec103a8de?auto=format&fit=crop&q=80&w=800",
    "Golconda Fort": "https://images.unsplash.com/photo-1596792375528-7ea1c8a1eef1?auto=format&fit=crop&q=80&w=800",
    "Somnath Temple": "https://images.unsplash.com/photo-1622345041766-3d2371900118?auto=format&fit=crop&q=80&w=800"
};
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&q=80&w=800";

async function syncToDatabase() {
    try {
        console.log("📖 Reading Explorer Data from client source...");
        const content = fs.readFileSync(DATA_FILE, 'utf8');
        
        const match = content.match(/export const STATE_DATA = (\[[\s\S]*?\]);/);
        if (!match) {
            console.error("❌ Could not find STATE_DATA array in data.ts");
            return;
        }

        const stateData = eval(match[1]);
        
        console.log(`🚀 Found ${stateData.length} states. Beginning full data sync...`);

        for (const state of stateData) {
            console.log(`\n🌍 Syncing State: ${state.name}`);
            
            // 1. Sync State Info
            const statePayload = {
                name: state.name,
                description: state.description,
                bestTimeToVisit: state.bestTimeToVisit,
                color: state.color,
                highlights: state.highlights,
                foods: state.foods
            };

            try {
                await axios.post(STATES_API, statePayload);
                console.log(`   ✅ State Sync Successful`);
            } catch (err) {
                console.log(`   ℹ️ State might already exist or failed: ${err.message}`);
            }

            // 2. Sync Monuments for this State
            if (state.monuments && state.monuments.length > 0) {
                for (const monumentName of state.monuments) {
                    const imageUrl = EXACT_MONUMENT_IMAGES[monumentName] || DEFAULT_IMAGE;
                    
                    const monumentPayload = {
                        name: monumentName,
                        location: state.name,
                        builtYear: "Ancient Heritage",
                        dynasty: "Indian Heritage",
                        style: "Regional Architecture",
                        unesco: state.highlights?.includes("UNESCO") || false,
                        image: imageUrl,
                        description: `A magnificent historical monument located in ${state.name}. ` + state.description,
                        timeline: [],
                        funFacts: state.highlights || []
                    };

                    try {
                        await axios.post(MONUMENTS_API, monumentPayload);
                        console.log(`     ✅ Monument Synced: ${monumentName}`);
                    } catch (err) {
                        if (err.response && err.response.status === 409) {
                            console.log(`     ⏭️ Monument Skipped: ${monumentName} (Already exists)`);
                        } else {
                            console.error(`     ❌ Monument Failed: ${monumentName} - ${err.message}`);
                        }
                    }
                }
            }
        }

        console.log(`\n🎉 Full Sync Complete! All Explorer data has been pushed to your database.`);
        
    } catch (error) {
        console.error("Critical Error during sync:", error.message);
    }
}

syncToDatabase();
