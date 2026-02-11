"use strict";

module.exports = {
  async bootstrap({ strapi }) {
    // Check if data already exists
    const existingShips = await strapi.documents("api::ship.ship").findMany();
    if (existingShips.length > 0) {
      strapi.log.info("Seed data already exists, skipping bootstrap.");
      return;
    }

    strapi.log.info("Seeding initial data...");

    // --- Operators ---
    const operators = [
      {
        name: "The World Residences at Sea",
        description:
          "The World is the largest privately owned residential yacht on earth. Since 2002, its Residents have been sailing the globe continuously, visiting an average of 100 ports in over 50 countries each year.",
        website: "https://aboardtheworld.com",
        phone: "+1 954 538 8449",
        email: "info@aboardtheworld.com",
      },
      {
        name: "Ulyssia",
        description:
          "Ulyssia is redefining luxury ocean living with a next-generation residential ship designed for discerning global citizens who wish to explore the world without leaving home.",
        website: "https://ulyssia.com",
        phone: "+377 97 77 00 70",
        email: "info@ulyssia.com",
      },
      {
        name: "Somnio",
        description:
          "SOMNIO is the world's largest private residential yacht, offering 39 luxury apartments for those who wish to own their home at sea.",
        website: "https://somnio.world",
        email: "enquiries@somnio.world",
      },
      {
        name: "Storylines",
        description:
          "Storylines is building MV Narrative, a residential ship designed for a community of like-minded explorers seeking continuous global travel.",
        website: "https://storylines.com",
        phone: "+1 786 850 1006",
        email: "info@storylines.com",
      },
      {
        name: "Njord Living",
        description:
          "Njord offers ultra-luxury ocean residences aboard a purpose-built residential ship for global exploration.",
        website: "https://njordliving.com",
        email: "info@njordliving.com",
      },
      {
        name: "Villa Vie Residences",
        description:
          "Villa Vie Residences offers an innovative approach to residential cruising, providing affordable options for continuous world travel.",
        website: "https://villavieresidences.com",
        email: "info@villavieresidences.com",
      },
    ];

    const createdOperators = [];
    for (const op of operators) {
      const created = await strapi.documents("api::operator.operator").create({
        data: op,
      });
      createdOperators.push(created);
    }

    // --- Ships ---
    const ships = [
      {
        name: "The World",
        slug: "the-world",
        tagline: "The Largest Privately Owned Residential Yacht on Earth",
        description:
          "The World is the largest privately owned, residential yacht on earth. Launched in 2002, this extraordinary vessel is home to 165 luxury residences. Residents set the itinerary, choosing destinations that take them to every corner of the globe — from the Norwegian fjords to the shores of Antarctica, from the canals of Venice to remote Pacific islands.\n\nAt 644 feet, The World offers an unparalleled lifestyle at sea. Amenities include six restaurants, a full-service spa, a swimming pool, tennis court, golf simulator, and a retractable marina for water sports. The ship features a top deck putting green, jogging track, and a comprehensive fitness center.\n\nResidents of The World are a curated community of successful individuals and families from over 19 countries who share a passion for travel and cultural exploration.",
        status: "operational",
        yearBuilt: 2002,
        length: 196.35,
        residenceCount: 165,
        operatorIndex: 0,
      },
      {
        name: "Ulyssia",
        slug: "ulyssia",
        tagline: "The Next Generation of Residential Ocean Living",
        description:
          "Ulyssia represents the next evolution in residential ocean living. This state-of-the-art vessel will feature 116 luxurious residences ranging from elegant studios to sprawling penthouses. Designed by world-renowned naval architects, Ulyssia combines cutting-edge marine engineering with the finest in interior design.\n\nThe ship will span over 200 meters and feature amenities that rival the world's finest resorts: multiple dining venues, a world-class spa, infinity pool, cinema, art gallery, library, and dedicated spaces for cultural events. Advanced environmental systems will make her one of the most sustainable luxury vessels afloat.\n\nUlyssia will circumnavigate the globe continuously, spending extended time in each destination to allow residents to truly immerse themselves in local cultures.",
        status: "under-construction",
        yearBuilt: 2027,
        length: 200,
        residenceCount: 116,
        operatorIndex: 1,
      },
      {
        name: "Somnio",
        slug: "somnio",
        tagline: "The World's Largest Private Residential Yacht",
        description:
          "SOMNIO, meaning 'to dream' in Latin, is set to become the world's largest private residential yacht at 222 meters. With only 39 bespoke apartments ranging from 1,600 to 6,300 square feet, SOMNIO offers an extraordinarily exclusive residential experience at sea.\n\nEvery detail has been meticulously crafted, from the six-star dining experiences to the 10,000-bottle wine cellar, beach club, spa, and expansive outdoor terraces. The yacht's design emphasizes privacy and space, with each residence featuring private terraces, premium finishes, and smart home technology.\n\nSOmnio's intimate community of just 39 families will explore the world's most sought-after destinations, with an itinerary shaped by the residents themselves.",
        status: "under-construction",
        yearBuilt: 2027,
        length: 222,
        residenceCount: 39,
        operatorIndex: 2,
      },
      {
        name: "MV Narrative",
        slug: "mv-narrative",
        tagline: "Your Home. Your Story. Your World.",
        description:
          "MV Narrative by Storylines is a residential ship designed for a community of explorers. With 547 residences, she is designed to provide a home for those who want to see the world without sacrificing the comforts of home.\n\nThe 741-foot vessel will include 20 dining and bar venues, a microbrewery, three pools, a full-sized tennis court, marina, and state-of-the-art wellness center. She will also feature co-working spaces, a library, art studios, and a 300-seat auditorium.\n\nMV Narrative aims to create a vibrant, multigenerational community at sea, offering residences at accessible price points compared to other residential ships.",
        status: "under-construction",
        yearBuilt: 2027,
        length: 226,
        residenceCount: 547,
        operatorIndex: 3,
      },
      {
        name: "Njord",
        slug: "njord",
        tagline: "Ultra-Luxury Ocean Residences",
        description:
          "Njord brings a new standard of ultra-luxury to residential ocean living. With just 118 residences aboard a purpose-built 290-meter vessel, Njord offers generous living spaces with floor-to-ceiling ocean views, private terraces, and interiors designed by world-leading designers.\n\nAmenities include multiple restaurants, a comprehensive spa and wellness center, marina platform, helipad, golf simulator, and extensive outdoor recreational areas. The vessel will feature the latest in green technology, including LNG propulsion.\n\nNjord's carefully curated itinerary takes residents to over 100 destinations annually, from the world's great cities to secluded paradises accessible only by sea.",
        status: "planned",
        yearBuilt: 2028,
        length: 290,
        residenceCount: 118,
        operatorIndex: 4,
      },
      {
        name: "Villa Vie Odyssey",
        slug: "villa-vie-odyssey",
        tagline: "Continuous World Voyage Living",
        description:
          "Villa Vie Odyssey offers a unique approach to residential ship living, making continuous world travel accessible. The ship provides a range of cabin options from affordable studios to premium suites, allowing residents to live aboard while circumnavigating the globe every 3.5 years.\n\nThe vessel features multiple dining options, lounges, a pool, fitness center, and entertainment venues. What sets Villa Vie apart is its innovative pricing model — offering both purchase and lease options at price points significantly below traditional residential ships.\n\nVilla Vie Odyssey visits over 425 ports in 100+ countries on its continuous world voyage, spending 1-5 days at each port to allow thorough exploration.",
        status: "operational",
        yearBuilt: 1993,
        length: 215,
        residenceCount: 400,
        operatorIndex: 5,
      },
    ];

    const createdShips = [];
    for (const ship of ships) {
      const { operatorIndex, ...data } = ship;
      const created = await strapi.documents("api::ship.ship").create({
        data: {
          ...data,
          operator: createdOperators[operatorIndex].documentId,
        },
      });
      createdShips.push(created);
    }

    // --- Apartments ---
    const apartments = [
      // The World
      { name: "Studio Residence", type: "studio", size: 93, priceFrom: 2000000, priceTo: 3500000, monthlyFees: 8500, description: "Elegant studio residences offering efficient luxury living with premium finishes, ocean views, and access to all ship amenities.", shipIndex: 0 },
      { name: "One-Bedroom Suite", type: "bed1", size: 139, priceFrom: 3500000, priceTo: 7000000, monthlyFees: 12000, description: "Spacious one-bedroom suites featuring separate living and sleeping areas, full kitchens, and private balconies.", shipIndex: 0 },
      { name: "Two-Bedroom Residence", type: "bed2", size: 232, priceFrom: 5500000, priceTo: 13000000, monthlyFees: 18000, description: "Generous two-bedroom residences with expansive living spaces, gourmet kitchens, and wraparound balconies.", shipIndex: 0 },
      { name: "Three-Bedroom Penthouse", type: "penthouse", size: 316, priceFrom: 11000000, priceTo: 36000000, monthlyFees: 28000, description: "Magnificent penthouses representing the pinnacle of ocean living, with panoramic views, private terraces, and bespoke interiors.", shipIndex: 0 },
      // Ulyssia
      { name: "Ulyssia Studio", type: "studio", size: 80, priceFrom: 1500000, priceTo: 2500000, monthlyFees: 7000, description: "Thoughtfully designed studio residences with contemporary finishes and ocean views.", shipIndex: 1 },
      { name: "Ulyssia One-Bedroom", type: "bed1", size: 120, priceFrom: 3000000, priceTo: 5000000, monthlyFees: 10000, description: "Elegant one-bedroom residences with open-plan living, premium appliances, and private balconies.", shipIndex: 1 },
      { name: "Ulyssia Penthouse", type: "penthouse", size: 280, priceFrom: 8000000, priceTo: 20000000, monthlyFees: 22000, description: "Exclusive penthouses with sweeping ocean views, wraparound terraces, and bespoke luxury finishes.", shipIndex: 1 },
      // Somnio
      { name: "Somnio Apartment", type: "bed2", size: 148, priceFrom: 9500000, priceTo: 11000000, monthlyFees: 35000, description: "Bespoke two-bedroom apartments with the finest materials, private terraces, and six-star service.", shipIndex: 2 },
      { name: "Somnio Grand Suite", type: "bed3", size: 465, priceFrom: 15000000, priceTo: 35000000, monthlyFees: 55000, description: "Magnificent grand suites spanning up to 6,300 sq ft with multiple terraces, private dining rooms, and unparalleled luxury.", shipIndex: 2 },
      // MV Narrative
      { name: "Narrative Studio", type: "studio", size: 24, priceFrom: 300000, priceTo: 500000, monthlyFees: 2500, description: "Compact studio residences designed for efficient living with clever storage and comfortable appointments.", shipIndex: 3 },
      { name: "Narrative One-Bedroom", type: "bed1", size: 58, priceFrom: 500000, priceTo: 800000, monthlyFees: 3500, description: "Well-appointed one-bedroom residences with full kitchens, living areas, and private balconies.", shipIndex: 3 },
      { name: "Narrative Two-Bedroom", type: "bed2", size: 93, priceFrom: 900000, priceTo: 1500000, monthlyFees: 5500, description: "Spacious two-bedroom residences ideal for families or those desiring extra space.", shipIndex: 3 },
      // Njord
      { name: "Njord Suite", type: "bed1", size: 100, priceFrom: 5000000, priceTo: 9000000, monthlyFees: 15000, description: "Ultra-luxury suites with floor-to-ceiling windows, designer interiors, and private terraces.", shipIndex: 4 },
      { name: "Njord Grand Penthouse", type: "penthouse", size: 350, priceFrom: 15000000, priceTo: 40000000, monthlyFees: 35000, description: "The ultimate in ocean living — palatial penthouses with panoramic views, private pools, and personal butler service.", shipIndex: 4 },
      // Villa Vie Odyssey
      { name: "Odyssey Interior Cabin", type: "studio", size: 16, priceFrom: 99999, priceTo: 199999, monthlyFees: 1500, description: "Comfortable interior cabins offering an affordable entry to continuous world travel.", shipIndex: 5 },
      { name: "Odyssey Balcony Suite", type: "bed1", size: 28, priceFrom: 299999, priceTo: 499999, monthlyFees: 2800, description: "Balcony suites with private outdoor space and ocean views for an enhanced voyage experience.", shipIndex: 5 },
    ];

    for (const apt of apartments) {
      const { shipIndex, ...data } = apt;
      await strapi.documents("api::apartment.apartment").create({
        data: {
          ...data,
          ship: createdShips[shipIndex].documentId,
        },
      });
    }

    // --- Itineraries ---
    const itineraryData = [
      {
        name: "The World Annual Voyage",
        description: "The World circumnavigates the globe each year, visiting approximately 100 ports in over 50 countries. The itinerary is set by the residents, ensuring visits to both iconic destinations and hidden gems.",
        yearRound: true,
        shipIndex: 0,
        stops: [
          { name: "Monaco", latitude: 43.7384, longitude: 7.4246, order: 1, description: "The glamorous principality on the French Riviera" },
          { name: "Santorini", latitude: 36.3932, longitude: 25.4615, order: 2, description: "Iconic Greek island with stunning caldera views" },
          { name: "Suez Canal", latitude: 30.5852, longitude: 32.2654, order: 3, description: "Historic waterway connecting Mediterranean to Red Sea" },
          { name: "Dubai", latitude: 25.2048, longitude: 55.2708, order: 4, description: "Ultramodern city of superlatives in the Arabian Gulf" },
          { name: "Maldives", latitude: 3.2028, longitude: 73.2207, order: 5, description: "Paradise archipelago in the Indian Ocean" },
          { name: "Singapore", latitude: 1.3521, longitude: 103.8198, order: 6, description: "The Lion City — Asia's gleaming gateway" },
          { name: "Darwin", latitude: -12.4634, longitude: 130.8456, order: 7, description: "Australia's tropical northern gateway" },
          { name: "Sydney", latitude: -33.8688, longitude: 151.2093, order: 8, description: "Australia's harbor city with its iconic Opera House" },
          { name: "Auckland", latitude: -36.8485, longitude: 174.7633, order: 9, description: "New Zealand's City of Sails" },
          { name: "Tahiti", latitude: -17.6509, longitude: -149.4260, order: 10, description: "French Polynesia's enchanting main island" },
          { name: "Easter Island", latitude: -27.1127, longitude: -109.3497, order: 11, description: "Remote Polynesian island of the Moai statues" },
          { name: "Lima", latitude: -12.0464, longitude: -77.0428, order: 12, description: "Peru's capital and gastronomic hub" },
          { name: "Panama Canal", latitude: 8.9824, longitude: -79.5199, order: 13, description: "Engineering marvel connecting Pacific and Atlantic" },
          { name: "Cartagena", latitude: 10.3910, longitude: -75.5364, order: 14, description: "Colombia's colorful Caribbean gem" },
          { name: "Rio de Janeiro", latitude: -22.9068, longitude: -43.1729, order: 15, description: "Brazil's vibrant Marvelous City" },
          { name: "Cape Verde", latitude: 14.9185, longitude: -23.5085, order: 16, description: "Atlantic archipelago with volcanic landscapes" },
          { name: "Azores", latitude: 37.7412, longitude: -25.6756, order: 17, description: "Portugal's mid-Atlantic volcanic islands" },
          { name: "Reykjavik", latitude: 64.1466, longitude: -21.9426, order: 18, description: "Gateway to Iceland's dramatic landscapes" },
          { name: "New York", latitude: 40.7128, longitude: -74.006, order: 19, description: "The city that never sleeps" },
        ],
      },
      {
        name: "Ulyssia World Circuit",
        description: "Ulyssia's maiden voyage will take residents on a carefully curated journey touching every continent, with extended stays in the world's most captivating destinations.",
        yearRound: true,
        shipIndex: 1,
        stops: [
          { name: "Barcelona", latitude: 41.3874, longitude: 2.1686, order: 1, description: "Catalonia's capital of art and architecture" },
          { name: "Valletta", latitude: 35.8989, longitude: 14.5146, order: 2, description: "Malta's fortified capital steeped in history" },
          { name: "Athens", latitude: 37.9838, longitude: 23.7275, order: 3, description: "Cradle of Western civilization" },
          { name: "Suez Canal", latitude: 30.5852, longitude: 32.2654, order: 4, description: "Historic waterway connecting Mediterranean to Red Sea" },
          { name: "Aqaba", latitude: 29.5321, longitude: 35.0067, order: 5, description: "Jordan's Red Sea resort gateway to Petra" },
          { name: "Victoria", latitude: -4.6191, longitude: 55.4513, order: 6, description: "Seychelles' capital on Mahé Island" },
          { name: "Cape Town", latitude: -33.9249, longitude: 18.4241, order: 7, description: "South Africa's Mother City beneath Table Mountain" },
          { name: "Mumbai", latitude: 19.076, longitude: 72.8777, order: 8, description: "India's dynamic city of dreams" },
          { name: "Colombo", latitude: 6.9271, longitude: 79.8612, order: 9, description: "Sri Lanka's vibrant capital" },
          { name: "Phuket", latitude: 7.8804, longitude: 98.3923, order: 10, description: "Thailand's largest island paradise" },
          { name: "Singapore", latitude: 1.3521, longitude: 103.8198, order: 11, description: "The Lion City — Asia's gleaming gateway" },
          { name: "Ho Chi Minh City", latitude: 10.8231, longitude: 106.6297, order: 12, description: "Vietnam's bustling southern metropolis" },
          { name: "Manila", latitude: 14.5995, longitude: 120.9842, order: 13, description: "Philippines' vibrant bay city" },
          { name: "Taipei", latitude: 25.0330, longitude: 121.5654, order: 14, description: "Taiwan's modern capital with night markets" },
          { name: "Okinawa", latitude: 26.2120, longitude: 127.6792, order: 15, description: "Japan's tropical southern islands" },
          { name: "Tokyo", latitude: 35.6762, longitude: 139.6503, order: 16, description: "Japan's electrifying capital of culture and innovation" },
          { name: "Honolulu", latitude: 21.3069, longitude: -157.8583, order: 17, description: "Hawaii's tropical capital on Oahu" },
          { name: "San Francisco", latitude: 37.7749, longitude: -122.4194, order: 18, description: "The City by the Bay" },
        ],
      },
      {
        name: "Somnio Grand Voyage",
        description: "SOMNIO's exclusive itinerary takes its 39 families to the world's most prestigious and beautiful destinations, with an emphasis on privacy and extraordinary experiences.",
        yearRound: true,
        shipIndex: 2,
        stops: [
          { name: "Amalfi Coast", latitude: 40.6333, longitude: 14.6029, order: 1, description: "Italy's breathtaking coastal paradise" },
          { name: "Dubrovnik", latitude: 42.6507, longitude: 18.0944, order: 2, description: "The Pearl of the Adriatic" },
          { name: "Suez Canal", latitude: 30.5852, longitude: 32.2654, order: 3, description: "Historic waterway connecting Mediterranean to Red Sea" },
          { name: "Aqaba", latitude: 29.5321, longitude: 35.0067, order: 4, description: "Jordan's Red Sea resort gateway to Petra" },
          { name: "Victoria", latitude: -4.6191, longitude: 55.4513, order: 5, description: "Seychelles' capital on Mahé Island" },
          { name: "Maldives", latitude: 3.2028, longitude: 73.2207, order: 6, description: "Paradise archipelago in the Indian Ocean" },
          { name: "Langkawi", latitude: 6.35, longitude: 99.8, order: 7, description: "Malaysia's jewel of Kedah" },
          { name: "Singapore", latitude: 1.3521, longitude: 103.8198, order: 8, description: "The Lion City — Asia's gleaming gateway" },
          { name: "Ho Chi Minh City", latitude: 10.8231, longitude: 106.6297, order: 9, description: "Vietnam's bustling southern metropolis" },
          { name: "Manila", latitude: 14.5995, longitude: 120.9842, order: 10, description: "Philippines' vibrant bay city" },
          { name: "Taipei", latitude: 25.0330, longitude: 121.5654, order: 11, description: "Taiwan's modern capital with night markets" },
          { name: "Okinawa", latitude: 26.2120, longitude: 127.6792, order: 12, description: "Japan's tropical southern islands" },
          { name: "Kyoto", latitude: 35.0116, longitude: 135.7681, order: 13, description: "Japan's cultural heart and ancient capital" },
          { name: "Guam", latitude: 13.4443, longitude: 144.7937, order: 14, description: "Micronesia's westernmost island territory" },
          { name: "Tahiti", latitude: -17.6509, longitude: -149.4260, order: 15, description: "French Polynesia's enchanting main island" },
          { name: "Fiji", latitude: -17.7134, longitude: 178.065, order: 16, description: "South Pacific island paradise" },
          { name: "Auckland", latitude: -36.8485, longitude: 174.7633, order: 17, description: "New Zealand's City of Sails" },
          { name: "Easter Island", latitude: -27.1127, longitude: -109.3497, order: 18, description: "Remote Polynesian island of the Moai statues" },
          { name: "Lima", latitude: -12.0464, longitude: -77.0428, order: 19, description: "Peru's capital and gastronomic hub" },
          { name: "Panama Canal", latitude: 8.9824, longitude: -79.5199, order: 20, description: "Engineering marvel connecting Pacific and Atlantic" },
          { name: "Cartagena", latitude: 10.3910, longitude: -75.5364, order: 21, description: "Colombia's colorful Caribbean gem" },
          { name: "Azores", latitude: 37.7412, longitude: -25.6756, order: 22, description: "Portugal's mid-Atlantic volcanic islands" },
          { name: "Lisbon", latitude: 38.7223, longitude: -9.1393, order: 23, description: "Portugal's sun-drenched capital of explorers" },
        ],
      },
      {
        name: "Narrative Continuous World Voyage",
        description: "MV Narrative's voyage covers all seven continents over a continuous world circumnavigation, spending ample time in each region.",
        yearRound: true,
        shipIndex: 3,
        stops: [
          { name: "London", latitude: 51.5074, longitude: -0.1278, order: 1, description: "Britain's historic and cosmopolitan capital" },
          { name: "Lisbon", latitude: 38.7223, longitude: -9.1393, order: 2, description: "Portugal's sun-drenched capital of explorers" },
          { name: "Casablanca", latitude: 33.5731, longitude: -7.5898, order: 3, description: "Morocco's largest city and economic hub" },
          { name: "Dakar", latitude: 14.7167, longitude: -17.4677, order: 4, description: "Senegal's vibrant capital on the Atlantic" },
          { name: "Zanzibar", latitude: -6.1659, longitude: 39.2026, order: 5, description: "The Spice Island off East Africa" },
          { name: "Victoria", latitude: -4.6191, longitude: 55.4513, order: 6, description: "Seychelles' capital on Mahé Island" },
          { name: "Maldives", latitude: 3.2028, longitude: 73.2207, order: 7, description: "Paradise archipelago in the Indian Ocean" },
          { name: "Colombo", latitude: 6.9271, longitude: 79.8612, order: 8, description: "Sri Lanka's vibrant capital" },
          { name: "Phuket", latitude: 7.8804, longitude: 98.3923, order: 9, description: "Thailand's largest island paradise" },
          { name: "Singapore", latitude: 1.3521, longitude: 103.8198, order: 10, description: "The Lion City — Asia's gleaming gateway" },
          { name: "Bali", latitude: -8.3405, longitude: 115.092, order: 11, description: "Indonesia's island of the gods" },
          { name: "Darwin", latitude: -12.4634, longitude: 130.8456, order: 12, description: "Australia's tropical northern gateway" },
          { name: "Cairns", latitude: -16.9186, longitude: 145.7781, order: 13, description: "Gateway to Australia's Great Barrier Reef" },
          { name: "Sydney", latitude: -33.8688, longitude: 151.2093, order: 14, description: "Australia's harbor city with its iconic Opera House" },
          { name: "Auckland", latitude: -36.8485, longitude: 174.7633, order: 15, description: "New Zealand's City of Sails" },
          { name: "Tahiti", latitude: -17.6509, longitude: -149.4260, order: 16, description: "French Polynesia's enchanting main island" },
          { name: "Easter Island", latitude: -27.1127, longitude: -109.3497, order: 17, description: "Remote Polynesian island of the Moai statues" },
          { name: "Valparaíso", latitude: -33.0472, longitude: -71.6127, order: 18, description: "Chile's colorful Pacific port city" },
          { name: "Lima", latitude: -12.0464, longitude: -77.0428, order: 19, description: "Peru's capital and gastronomic hub" },
          { name: "Panama Canal", latitude: 8.9824, longitude: -79.5199, order: 20, description: "Engineering marvel connecting Pacific and Atlantic" },
          { name: "Cartagena", latitude: 10.3910, longitude: -75.5364, order: 21, description: "Colombia's colorful Caribbean gem" },
          { name: "Havana", latitude: 23.1136, longitude: -82.3666, order: 22, description: "Cuba's timeless and vibrant capital" },
          { name: "Azores", latitude: 37.7412, longitude: -25.6756, order: 23, description: "Portugal's mid-Atlantic volcanic islands" },
          { name: "Copenhagen", latitude: 55.6761, longitude: 12.5683, order: 24, description: "Denmark's fairy tale capital" },
        ],
      },
      {
        name: "Njord Premier Voyage",
        description: "Njord's inaugural itinerary features extended stays at over 100 destinations, focusing on unique experiences and exclusive access.",
        yearRound: true,
        shipIndex: 4,
        stops: [
          { name: "Nice", latitude: 43.7102, longitude: 7.262, order: 1, description: "Queen of the French Riviera" },
          { name: "Montenegro", latitude: 42.4304, longitude: 19.2594, order: 2, description: "The hidden gem of the Adriatic coast" },
          { name: "Suez Canal", latitude: 30.5852, longitude: 32.2654, order: 3, description: "Historic waterway connecting Mediterranean to Red Sea" },
          { name: "Aqaba", latitude: 29.5321, longitude: 35.0067, order: 4, description: "Jordan's Red Sea resort gateway to Petra" },
          { name: "Muscat", latitude: 23.588, longitude: 58.3829, order: 5, description: "Oman's elegant and historic capital" },
          { name: "Dubai", latitude: 25.2048, longitude: 55.2708, order: 6, description: "Ultramodern city of superlatives in the Arabian Gulf" },
          { name: "Mumbai", latitude: 19.076, longitude: 72.8777, order: 7, description: "India's dynamic city of dreams" },
          { name: "Goa", latitude: 15.2993, longitude: 74.124, order: 8, description: "India's tropical beach paradise" },
          { name: "Colombo", latitude: 6.9271, longitude: 79.8612, order: 9, description: "Sri Lanka's vibrant capital" },
          { name: "Phuket", latitude: 7.8804, longitude: 98.3923, order: 10, description: "Thailand's largest island paradise" },
          { name: "Singapore", latitude: 1.3521, longitude: 103.8198, order: 11, description: "The Lion City — Asia's gleaming gateway" },
          { name: "Ho Chi Minh City", latitude: 10.8231, longitude: 106.6297, order: 12, description: "Vietnam's bustling southern metropolis" },
          { name: "Hong Kong", latitude: 22.3193, longitude: 114.1694, order: 13, description: "Asia's World City at the edge of China" },
          { name: "Manila", latitude: 14.5995, longitude: 120.9842, order: 14, description: "Philippines' vibrant bay city" },
          { name: "Guam", latitude: 13.4443, longitude: 144.7937, order: 15, description: "Micronesia's westernmost island territory" },
          { name: "Tahiti", latitude: -17.6509, longitude: -149.4260, order: 16, description: "French Polynesia's enchanting main island" },
          { name: "Auckland", latitude: -36.8485, longitude: 174.7633, order: 17, description: "New Zealand's City of Sails" },
          { name: "Easter Island", latitude: -27.1127, longitude: -109.3497, order: 18, description: "Remote Polynesian island of the Moai statues" },
          { name: "Lima", latitude: -12.0464, longitude: -77.0428, order: 19, description: "Peru's capital and gastronomic hub" },
          { name: "Valparaíso", latitude: -33.0472, longitude: -71.6127, order: 20, description: "Chile's colorful Pacific port city" },
          { name: "Puerto Montt", latitude: -41.4689, longitude: -72.9411, order: 21, description: "Gateway to Chile's Patagonian lakes and fjords" },
          { name: "Ushuaia", latitude: -54.8019, longitude: -68.3030, order: 22, description: "The southernmost city — gateway to Antarctica" },
          { name: "Buenos Aires", latitude: -34.6037, longitude: -58.3816, order: 23, description: "Argentina's passionate capital of tango" },
          { name: "Rio de Janeiro", latitude: -22.9068, longitude: -43.1729, order: 24, description: "Brazil's vibrant Marvelous City" },
          { name: "Cape Verde", latitude: 14.9185, longitude: -23.5085, order: 25, description: "Atlantic archipelago with volcanic landscapes" },
          { name: "Bermuda", latitude: 32.3078, longitude: -64.7505, order: 26, description: "Pink sand beaches in the Atlantic" },
        ],
      },
      {
        name: "Villa Vie World Circumnavigation",
        description: "Villa Vie Odyssey's 3.5-year continuous world voyage visits over 425 ports across 100+ countries, offering the most comprehensive world travel experience afloat.",
        yearRound: true,
        shipIndex: 5,
        stops: [
          { name: "Belfast", latitude: 54.5973, longitude: -5.9301, order: 1, description: "Northern Ireland's resurgent capital" },
          { name: "Canary Islands", latitude: 28.2916, longitude: -16.6291, order: 2, description: "Spain's sunny Atlantic archipelago" },
          { name: "Dakar", latitude: 14.7167, longitude: -17.4677, order: 3, description: "Senegal's vibrant capital on the Atlantic" },
          { name: "Salvador", latitude: -12.9714, longitude: -38.5124, order: 4, description: "Brazil's colorful Afro-Brazilian cultural heart" },
          { name: "Rio de Janeiro", latitude: -22.9068, longitude: -43.1729, order: 5, description: "Brazil's vibrant Marvelous City" },
          { name: "Montevideo", latitude: -34.9011, longitude: -56.1645, order: 6, description: "Uruguay's laid-back capital on the Río de la Plata" },
          { name: "Puerto Madryn", latitude: -42.7692, longitude: -65.0385, order: 7, description: "Argentine Patagonia's wildlife haven" },
          { name: "Ushuaia", latitude: -54.8019, longitude: -68.3030, order: 8, description: "The southernmost city — gateway to Antarctica" },
          { name: "Valparaíso", latitude: -33.0472, longitude: -71.6127, order: 9, description: "Chile's colorful Pacific port city" },
          { name: "Easter Island", latitude: -27.1127, longitude: -109.3497, order: 10, description: "Remote Polynesian island of the Moai statues" },
          { name: "Tahiti", latitude: -17.6509, longitude: -149.4260, order: 11, description: "French Polynesia's enchanting main island" },
          { name: "Fiji", latitude: -17.7134, longitude: 178.065, order: 12, description: "South Pacific island paradise" },
          { name: "Auckland", latitude: -36.8485, longitude: 174.7633, order: 13, description: "New Zealand's City of Sails" },
          { name: "Sydney", latitude: -33.8688, longitude: 151.2093, order: 14, description: "Australia's harbor city with its iconic Opera House" },
          { name: "Cairns", latitude: -16.9186, longitude: 145.7781, order: 15, description: "Gateway to Australia's Great Barrier Reef" },
          { name: "Darwin", latitude: -12.4634, longitude: 130.8456, order: 16, description: "Australia's tropical northern gateway" },
          { name: "Guam", latitude: 13.4443, longitude: 144.7937, order: 17, description: "Micronesia's westernmost island territory" },
          { name: "Okinawa", latitude: 26.2120, longitude: 127.6792, order: 18, description: "Japan's tropical southern islands" },
          { name: "Osaka", latitude: 34.6937, longitude: 135.5023, order: 19, description: "Japan's kitchen and cultural powerhouse" },
          { name: "Nagasaki", latitude: 32.7503, longitude: 129.8779, order: 20, description: "Historic Japanese port with European influence" },
          { name: "Busan", latitude: 35.1796, longitude: 129.0756, order: 21, description: "South Korea's vibrant coastal metropolis" },
          { name: "Vladivostok", latitude: 43.1332, longitude: 131.9113, order: 22, description: "Russia's gateway to the Pacific" },
          { name: "Petropavlovsk", latitude: 53.0167, longitude: 158.6500, order: 23, description: "Kamchatka's dramatic volcanic peninsula" },
          { name: "Dutch Harbor", latitude: 53.8895, longitude: -166.5423, order: 24, description: "Alaska's remote Aleutian fishing port" },
          { name: "Juneau", latitude: 58.3019, longitude: -134.4197, order: 25, description: "Alaska's scenic capital accessible only by boat or plane" },
          { name: "Vancouver", latitude: 49.2827, longitude: -123.1207, order: 26, description: "Canada's Pacific jewel between mountains and sea" },
          { name: "Ketchikan", latitude: 55.3422, longitude: -131.6461, order: 27, description: "Alaska's First City and totem pole capital" },
          { name: "Anchorage", latitude: 61.2181, longitude: -149.9003, order: 28, description: "Alaska's largest city and wilderness gateway" },
          { name: "Nome", latitude: 64.5011, longitude: -165.4064, order: 29, description: "Historic Alaskan gold rush town on the Bering Sea" },
          { name: "Greenland", latitude: 64.1814, longitude: -51.6941, order: 30, description: "The world's largest island — Arctic wilderness" },
          { name: "Reykjavik", latitude: 64.1466, longitude: -21.9426, order: 31, description: "Gateway to Iceland's dramatic landscapes" },
          { name: "Faroe Islands", latitude: 62.0000, longitude: -6.7833, order: 32, description: "Denmark's remote North Atlantic archipelago" },
        ],
      },
    ];

    for (const itin of itineraryData) {
      const { shipIndex, stops, ...data } = itin;
      const createdItinerary = await strapi
        .documents("api::itinerary.itinerary")
        .create({
          data: {
            ...data,
            ship: createdShips[shipIndex].documentId,
          },
        });

      for (const stop of stops) {
        await strapi.documents("api::itinerary-stop.itinerary-stop").create({
          data: {
            ...stop,
            itinerary: createdItinerary.documentId,
          },
        });
      }
    }

    // --- Stories ---
    const stories = [
      {
        title: "Living at Sea: A Year Aboard The World",
        slug: "living-at-sea-year-aboard-the-world",
        content:
          "When Margaret and David Chen sold their San Francisco penthouse and moved aboard The World, their friends thought they had lost their minds. One year later, they can't imagine living any other way.\n\n\"We wake up in a different part of the world every few days,\" Margaret explains, sipping champagne on their private balcony as the ship glides past the coast of Norway. \"Last month we were in Santorini. Next week, we'll be in the Maldives. And through it all, this is our home.\"\n\nThe Chens purchased a two-bedroom residence on Deck 7, which they furnished with pieces collected during their travels. \"Every room tells a story,\" David says. \"That rug is from Istanbul. Those paintings are from a gallery in Buenos Aires. Our home is literally a collection of our experiences.\"\n\nLife aboard The World is structured but never regimented. The couple typically starts their day with yoga on the top deck, followed by breakfast at one of six restaurants. Mornings might involve a lecture from a visiting expert, a cooking class, or an excursion in port. Afternoons are for exploration or relaxation at the pool and spa.\n\n\"The community here is extraordinary,\" Margaret notes. \"Our neighbors are entrepreneurs, artists, diplomats, and adventurers from 19 different countries. The conversations at dinner are unlike anything you'd experience on land.\"\n\nFor those considering a life at sea, David has one piece of advice: \"Don't think of it as giving something up. Think of it as gaining the entire world as your backyard.\"",
        excerpt:
          "When Margaret and David Chen sold their San Francisco penthouse and moved aboard The World, their friends thought they had lost their minds. One year later, they can't imagine living any other way.",
        author: "James Whitfield",
        shipIndex: 0,
      },
      {
        title: "The Future of Ocean Living: Why Ulyssia Changes Everything",
        slug: "future-ocean-living-ulyssia-changes-everything",
        content:
          "The concept of residential ships isn't new — The World has been sailing since 2002. But Ulyssia, currently under construction and set for delivery in 2027, represents a quantum leap forward in what ocean living can be.\n\n\"We studied everything that works about existing residential ships, and then we reimagined every aspect,\" says the project's lead designer. \"From the hull design to the waste management systems, from the residence layouts to the community spaces, everything has been rethought for the 21st century.\"\n\nThe most striking innovation is environmental. Ulyssia will be one of the first residential ships to run on LNG (liquefied natural gas), dramatically reducing emissions. Solar panels and advanced energy recovery systems further reduce the vessel's environmental footprint.\n\nTechnology extends to the residences themselves. Each apartment will feature a comprehensive smart home system, including automated climate control that adjusts based on the ship's position, motorized privacy glass, and integrated health monitoring systems. \"We want residents to have the most technologically advanced home on the planet — it just happens to be on the ocean,\" the designer explains.\n\nBut perhaps the most significant change is the community model. While maintaining the exclusivity expected at this price point, Ulyssia is designed to foster genuine community. Shared workshops, a co-working space, and collaborative gardens aim to create bonds that go beyond neighborly pleasantries.\n\nWith reservations already filling up, Ulyssia seems poised to usher in a new era of ocean living — one where luxury, sustainability, and community come together on the open sea.",
        excerpt:
          "Ulyssia, set for delivery in 2027, represents a quantum leap forward in what ocean living can be — combining luxury, sustainability, and community in ways never before attempted at sea.",
        author: "Elena Voss",
        shipIndex: 1,
      },
      {
        title: "From Dream to Reality: How Storylines Is Making Ocean Living Accessible",
        slug: "dream-to-reality-storylines-accessible-ocean-living",
        content:
          "For decades, living on a residential ship was the exclusive domain of the ultra-wealthy. MV Narrative by Storylines is challenging that notion with a revolutionary approach to pricing and community.\n\n\"Our mission has always been to make this lifestyle accessible to more people,\" explains the Storylines team. \"You shouldn't need $10 million to live your dream of traveling the world.\"\n\nWith studios starting under $300,000 and monthly fees from $2,500, MV Narrative opens residential ocean living to successful professionals, retirees, and digital nomads who might otherwise never consider it. The ship's 547 residences make it the largest residential vessel by unit count, creating economies of scale that keep costs manageable.\n\nBut accessibility doesn't mean sacrificing quality. The vessel will feature 20 dining venues, three pools, a full-sized tennis court, and a state-of-the-art wellness center. Co-working spaces with high-speed satellite internet cater to the growing remote work movement.\n\n\"We're building a floating city,\" says one future resident, a software engineer from Portland who plans to work remotely from the ship. \"I'll have everything I need — a home, an office, a gym, restaurants, and a new country to explore every few days. All for less than what I'm paying in rent and living expenses in Portland.\"\n\nThe ship's community governance model is equally innovative. Residents will participate in decisions about itineraries, activities, and ship policies through a democratic process. It's a model that feels less like a luxury cruise and more like a self-governing floating community.\n\nMV Narrative is expected to begin its maiden voyage in 2027, and with over 60% of residences already reserved, it seems the dream of accessible ocean living is very much becoming reality.",
        excerpt:
          "With studios starting under $300,000, MV Narrative by Storylines is challenging the notion that residential ocean living is only for the ultra-wealthy.",
        author: "Michael Torres",
        shipIndex: 3,
      },
    ];

    for (const story of stories) {
      const { shipIndex, ...data } = story;
      await strapi.documents("api::story.story").create({
        data: {
          ...data,
          ship: createdShips[shipIndex].documentId,
        },
      });
    }

    // --- Set public permissions ---
    const publicRole = await strapi.db
      .query("plugin::users-permissions.role")
      .findOne({ where: { type: "public" } });

    if (publicRole) {
      const permissions = await strapi.db
        .query("plugin::users-permissions.permission")
        .findMany({ where: { role: publicRole.id } });

      const contentTypes = [
        "api::ship.ship",
        "api::operator.operator",
        "api::apartment.apartment",
        "api::itinerary.itinerary",
        "api::itinerary-stop.itinerary-stop",
        "api::story.story",
      ];
      const actions = ["find", "findOne"];

      for (const ct of contentTypes) {
        for (const action of actions) {
          const exists = permissions.find(
            (p) => p.action === `${ct}.${action}`
          );
          if (!exists) {
            await strapi.db
              .query("plugin::users-permissions.permission")
              .create({
                data: {
                  action: `${ct}.${action}`,
                  role: publicRole.id,
                  enabled: true,
                },
              });
          }
        }
      }
    }

    strapi.log.info("Seed data created successfully!");
  },
};
