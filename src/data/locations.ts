export type Location = {
  slug: 'bijlmer' | 'keteltje' | 'amersfoort';
  name: string;
  neighborhood: string;
  city: 'Amsterdam' | 'Amersfoort';
  address: {
    street: string;
    postcode: string;
    city: string;
  };
  hours: {
    open: string;
    close: string;
    label: string;
  };
  rollingCutoff?: string;
  intro: string;
  body: string[];
  features: string[];
  nearby?: string[];
  mapsUrl: string;
  geo: { lat: number; lng: number };
  hasKitchen: boolean;
  hasLounge: boolean;
  brandedAs?: string;
};

export const locations: Location[] = [
  {
    slug: 'bijlmer',
    name: 'ROOTS Bijlmer ArenA',
    neighborhood: 'Amsterdam Zuidoost',
    city: 'Amsterdam',
    address: {
      street: 'Hoekenrode 14',
      postcode: '1102 BR',
      city: 'Amsterdam',
    },
    hours: {
      open: '09:00',
      close: '01:00',
      label: 'Daily, 09:00 to 01:00',
    },
    rollingCutoff: '22:00',
    intro: 'The first coffeeshop in Amsterdam Zuidoost. Located directly under Bijlmer ArenA station.',
    body: [
      'Walk-in retail. You queue, you choose, you pay, you leave. There is no lounge and there are no seats. Rolling allowed inside until 22:00.',
      'Three minutes from Johan Cruijff ArenA, the Ziggo Dome, and Pathé. Concert nights and matchdays bring a steady mix of locals, visitors, and crews passing through.',
    ],
    features: ['Walk-in retail', 'Under the station', 'No lounge', 'Rolling until 22:00'],
    nearby: ['Johan Cruijff ArenA', 'Ziggo Dome', 'Pathé Arena', 'AFAS Live'],
    mapsUrl: 'https://maps.app.goo.gl/JvjvsSvXsuspzQ3F6',
    geo: { lat: 52.3116467, lng: 4.9485634 },
    hasKitchen: false,
    hasLounge: false,
  },
  {
    slug: 'keteltje',
    name: "'T Keteltje",
    neighborhood: 'Amsterdam Centrum',
    city: 'Amsterdam',
    brandedAs: "'T Keteltje",
    address: {
      street: 'Marnixstraat 74',
      postcode: '1015 VX',
      city: 'Amsterdam',
    },
    hours: {
      open: '09:00',
      close: '01:00',
      label: 'Daily, 09:00 to 01:00',
    },
    intro: 'A traditional Amsterdam coffeeshop on Marnixstraat, part of the ROOTS family.',
    body: [
      "Marnixstraat 74. Five minutes from Leidseplein, on the western edge of the Jordaan. The shop carries its own name, 'T Keteltje, and its own history. ROOTS runs it.",
      'Same standards as the rest of the family. Different setting.',
    ],
    features: ['Centrum location', 'Traditional Amsterdam'],
    mapsUrl: 'https://maps.app.goo.gl/nu8rZ9h2ddEk3mY57',
    geo: { lat: 52.368735, lng: 4.880708 },
    hasKitchen: false,
    hasLounge: false,
  },
  {
    slug: 'amersfoort',
    name: 'ROOTS Amersfoort',
    neighborhood: 'Amersfoort Centrum',
    city: 'Amersfoort',
    address: {
      street: 'Snouckaertlaan 30',
      postcode: '3811 MB',
      city: 'Amersfoort',
    },
    hours: {
      open: '10:00',
      close: '00:00',
      label: 'Daily, 10:00 to 00:00',
    },
    intro: 'Coffeeshop and full kitchen under one roof. Pool, drinks, food worth ordering.',
    body: [
      'Snouckaertlaan 30, central Amersfoort. The largest of the three locations and the only one with a working kitchen.',
      'Sit-in space, pool table, board games, hot and cold drinks, food menu. The cannabis menu sits alongside a proper restaurant menu.',
    ],
    features: ['Coffeeshop and restaurant', 'Kitchen', 'Pool table', 'Sit-in space'],
    mapsUrl: 'https://maps.app.goo.gl/6xmvSAxUsWu2SzWz8',
    geo: { lat: 52.1532231, lng: 5.3826974 },
    hasKitchen: true,
    hasLounge: true,
  },
];

export const getLocationBySlug = (slug: string): Location | undefined =>
  locations.find((l) => l.slug === slug);

export const BRAND_EMAIL = 'info@rootscoffeeshop.nl';
export const BRAND_INSTAGRAM = 'https://www.instagram.com/roots_coffeeshop';
export const SITE_URL = 'https://roots-renaissance-site.lovable.app';
