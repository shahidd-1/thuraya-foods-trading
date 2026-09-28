// All photography is from Unsplash (free under the Unsplash License).
// Images are served from Unsplash's CDN, which resizes on the fly via the w/q params.
export type StockImage = {
  id: string;
  alt: string;
  credit: string;
  source: string;
};

export const images = {
  dohaSkyline: {
    id: 'photo-1596986343464-332d54fa5702',
    alt: 'Doha skyline across the water from the Corniche',
    credit: 'tarek suman',
    source: 'https://unsplash.com/photos/KUpxfPfQ_-E',
  },
  dohaNight: {
    id: 'photo-1683194247996-43897678c94c',
    alt: 'Doha city skyline at night',
    credit: 'Akbar Nemati',
    source: 'https://unsplash.com/photos/Q8NuHm4PbXc',
  },
  warehouse: {
    id: 'photo-1684695749267-233af13276d0',
    alt: 'Storage aisles stacked with boxed goods',
    credit: 'Alberto Rodríguez',
    source: 'https://unsplash.com/photos/-aCrA9FmT8Y',
  },
  flourSacks: {
    id: 'photo-1760727466909-a73872aeecda',
    alt: 'Stacked sacks of flour with Arabic and French labels',
    credit: 'mathieu gauzy',
    source: 'https://unsplash.com/photos/1tsmABGdT0g',
  },
  loading: {
    id: 'photo-1783309529161-a1a917bece7e',
    alt: 'Worker loading sacks of goods onto a truck',
    credit: 'Thilina Alagiyawanna',
    source: 'https://unsplash.com/photos/GjInA7ryrdw',
  },
  inspection: {
    id: 'photo-1781559819005-5bb979f78dc5',
    alt: 'Staff member checking stock on shelves',
    credit: 'Rodrigo Rodrigues',
    source: 'https://unsplash.com/photos/fwEJdc3fU7s',
  },
  vegetables: {
    id: 'photo-1542838132-92c53300491e',
    alt: 'Fresh vegetables stacked at a produce market',
    credit: 'nrd',
    source: 'https://unsplash.com/photos/D6Tu_L3chLE',
  },
  meat: {
    id: 'photo-1666013942642-b7b54ecafd7d',
    alt: 'Marbled cut of raw beef on a wooden board',
    credit: 'Sergey Kotenev',
    source: 'https://unsplash.com/photos/ZKv9WGWMOLk',
  },
  fish: {
    id: 'photo-1754587489058-b6b710ef78ea',
    alt: 'Fresh fish and seafood displayed on ice',
    credit: 'Georg Eiermann',
    source: 'https://unsplash.com/photos/G7TBrSTP3wU',
  },
  groceries: {
    id: 'photo-1644377949116-c4a6b529241c',
    alt: 'Open bags of different rice varieties',
    credit: 'Leonie Clough',
    source: 'https://unsplash.com/photos/rg6JWlyTsrw',
  },
} satisfies Record<string, StockImage>;

export const unsplashUrl = (id: string, width: number, quality = 70) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
