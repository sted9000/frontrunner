// src/store/useStore.js
import { create } from 'zustand';

// Create store with initial state and actions
const useStore = create((set, get) => ({
  // available markets and sources
  markets: [
    {
      id: 1,
      name: '2024 Presidential Election',
      description: "Polymarket's 2024 Presidential Election Market",
      marketCap: 336276019800,
      date: '2024-01-01',
      resolutionDescription: "This Presidential market resolves when the Associated Press, Fox, and NBC all call the election for the same candidate. In the unlikely event that doesn't happen, the market will remain open until inauguration and resolve to whoever gets inaugurated.",
    },
    {
      id: 2,
      name: '2024 Senate Control',
      description: "Which party will control the Senate after 2024 elections",
      marketCap: 156234000000,
      date: '2024-01-01',
      resolutionDescription: "Market resolves based on which party holds a majority of Senate seats after the 2024 elections are certified. In case of a 50-50 split, the party of the Vice President is considered to have control.",
    },
    {
      id: 3,
      name: 'Federal Reserve Rate Decision',
      description: "Federal Reserve interest rate decision for March 2024",
      marketCap: 89450000000,
      date: '2024-03-20',
      resolutionDescription: "Market resolves based on the Federal Reserve's official announcement of the federal funds rate target range at the conclusion of the March 2024 FOMC meeting.",
    },
    {
      id: 4,
      name: '2024 Olympic Medal Count',
      description: "Which country will win the most gold medals in 2024 Olympics",
      marketCap: 45670000000,
      date: '2024-08-11',
      resolutionDescription: "Market resolves based on the final official medal count published by the International Olympic Committee at the conclusion of the 2024 Paris Olympics.",
    },
    {
      id: 5,
      name: 'Tesla Q4 2024 Deliveries',
      description: "Tesla vehicle delivery numbers for Q4 2024",
      marketCap: 78900000000,
      date: '2025-01-02',
      resolutionDescription: "Market resolves based on the official delivery numbers reported in Tesla's Q4 2024 Vehicle Production & Deliveries press release",
    },
  ],
  getMarketById: (id) => {
    return get().markets.find(market => market.id === id);
  },
  sources: [
    {
      id: 1,
      name: 'Nate Silver',
      twitterHandle: '@natesilver538',
    },
    {
      id: 2,
      name: 'NYT Polling',
      twitterHandle: '@nytpolling',
    },
    {
      id: 3,
      name: 'Real Clear Politics',
      twitterHandle: '@RealClearNews',
    },
    {
      id: 4,
      name: 'Cook Political',
      twitterHandle: '@CookPolitical',
    },
    {
      id: 5,
      name: 'Larry Sabato',
      twitterHandle: '@LarrySabato',
    },
    {
      id: 6,
      name: 'CNN Politics',
      twitterHandle: '@CNNPolitics',
    },
    {
      id: 7,
      name: 'Politico',
      twitterHandle: '@politico',
    },
    {
      id: 8,
      name: 'Five Thirty Eight',
      twitterHandle: '@FiveThirtyEight',
    },       
    {
      id: 9,
      name: 'Reuters Politics',
      twitterHandle: '@ReutersPolitics',
    },
    {
      id: 10,
      name: 'Gallup News',
      twitterHandle: '@GallupNews',
    },
    
  ],

  // used for creating a new market
  selectedMarketId: null,
  selectedSourceId: [],
  isLoading: false,

  // user's markets
  userMarkets: [
    {
      id: 1,
      market: {
        id: 1,
        name: '2024 Presidential Election',
        description: "Polymarket's 2024 Presidential Election Market",
        marketCap: 336276019800,
        date: '2024-01-01',
        resolutionDescription: "This Presidential market resolves when the Associated Press, Fox, and NBC all call the election for the same candidate. In the unlikely event that doesn't happen, the market will remain open until inauguration and resolve to whoever gets inaugurated.",
      },
      sources: [
        {
          id: 1,
          name: 'Nate Silver',
          twitterHandle: '@natesilver538',
        },
        {
          id: 2,
          name: 'NYT Polling',
          twitterHandle: '@nytpolling',
        },
        {
          id: 3,
          name: 'Real Clear Politics',
          twitterHandle: '@RealClearNews',
        },
        {
          id: 4,
          name: 'Cook Political',
          twitterHandle: '@CookPolitical',
          },
        {
          id: 5,
          name: 'Larry Sabato',
          twitterHandle: '@LarrySabato',
        },
        {
          id: 6,
          name: 'CNN Politics',
          twitterHandle: '@CNNPolitics',
        },
        {
          id: 7,
          name: 'Politico',
          twitterHandle: '@politico',
          },
        {
          id: 8,
          name: 'Five Thirty Eight',
          twitterHandle: '@FiveThirtyEight',
        },
        {
          id: 9,
          name: 'Reuters Politics',
          twitterHandle: '@ReutersPolitics',
        },
        {
          id: 10,
          name: 'Gallup News',
          twitterHandle: '@GallupNews',
        },
      ],
      events: [
        {
          id: 1,
          name: 'Model Adjustment',
          description: '@natesilver538 adjusts his model',
          date: '2024-01-01',
          triggerDescription: 'Nate Silver tweets',
          triggerType: 'twitter',
          triggerId: '1234567890',
        },
        {
          id: 2,
          name: 'Polling Update',
          description: '@nytpolling updates their polling',
          date: '2024-01-02',
          triggerDescription: 'NYT Polling tweets',
          triggerType: 'twitter',
          triggerId: '1234567890',
        },
      ],
    },
  ],
}));

export default useStore;    