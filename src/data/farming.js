// Farming data from Tomasik (2007, updated 2018) and USDA
// See research.md section 2

// `sufferingPerDay`, `deathDays`, `sentience` and `sufferingDaysPerKg` are from
// Tomasik (2018). Shrimp aren't in his table — values are extrapolated using
// the same formula `(lifespanDays * sufferingPerDay + deathDays) * sentience /
// edibleKg`, with intensity benchmarked against broiler chickens (eyestalk
// ablation, ammonia, hypoxia) and slow ice-slurry slaughter. Sentience kept at
// 0.03 (Tomasik-conservative); per-kg is high because ~50 shrimp make a kg.
// Per-animal "how they live / how they die" bullets live in copy.md under the
// {{widget:animal-lives}} block, keyed by `<animal-id>-life` / `<animal-id>-death`.
// `icon` paths are minimal outline SVGs drawn to sit in a 24×24 viewBox, with
// round caps and 1.5 stroke width to match the Heroicons look used elsewhere.
const icons = {
  chicken: 'M5 16c0-2.5 2-4.5 4.5-4.5h3c2.5 0 4.5 2 4.5 4.5v1H5zM10 11.5V9a2 2 0 1 1 4 0v2.5M13 7.5l1.5-1.5',
  egg: 'M12 4c-3 0-5 4-5 8s2 8 5 8 5-4 5-8-2-8-5-8z',
  pig: 'M5 13c0-4 3-6 7-6s7 2 7 6v1c0 3-3 5-7 5s-7-2-7-5zM17 12l-1-2M7 12l1-2M14.5 15h-5a1.5 1.5 0 0 0 0 3h5a1.5 1.5 0 0 0 0-3z',
  cow: 'M5 13c0-4 3-6 7-6s7 2 7 6v1c0 3-3 5-7 5s-7-2-7-5zM17 8l2-3M7 8L5 5M14 15h-4a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2z',
  milk: 'M8.5 6h7L17 9v10a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V9zM7 9h10M10 13h4',
  fish: 'M3 12c2-4 6-6 10-6s6 2 8 4M3 12c2 4 6 6 10 6s6-2 8-4M21 12l-3-3v6zM17 11h.01',
  shrimp: 'M5 10c3-3 8-3 12 0l-2 5c-4 2-9 1-11-3zM9 14l-1 3M12 14l-1 3M15 13l-1 3',
};

export const farmedAnimals = [
  {
    id: 'dairy', name: 'Dairy cow', lifespanDays: 2190, edibleKg: 30000,
    color: '#7f8c8d', painAnimalId: 'cow', icon: icons.milk,
    sufferingPerDay: 2, deathDays: 15, sentience: 0.9, sufferingDaysPerKg: 0.11,
  },
  {
    id: 'salmon', name: 'Farmed salmon', lifespanDays: 639, edibleKg: 2.0,
    color: '#e67e22', painAnimalId: 'salmon', icon: icons.fish,
    sufferingPerDay: 1.5, deathDays: 15, sentience: 0.25, sufferingDaysPerKg: 120,
  },
  {
    id: 'eggs', name: 'Layer hen', lifespanDays: 501, edibleKg: 16,
    color: '#f1c40f', painAnimalId: 'chicken', icon: icons.egg,
    sufferingPerDay: 4, deathDays: 7.5, sentience: 0.5, sufferingDaysPerKg: 64,
  },
  {
    id: 'beef', name: 'Beef cow', lifespanDays: 395, edibleKg: 212,
    color: '#c0392b', painAnimalId: 'cow', icon: icons.cow,
    sufferingPerDay: 1, deathDays: 30, sentience: 0.9, sufferingDaysPerKg: 1.8,
  },
  {
    id: 'pig', name: 'Pig', lifespanDays: 183, edibleKg: 65,
    color: '#e88e9e', painAnimalId: 'pig', icon: icons.pig,
    sufferingPerDay: 2.5, deathDays: 12, sentience: 1, sufferingDaysPerKg: 7.5,
  },
  {
    id: 'shrimp', name: 'Farmed shrimp', lifespanDays: 120, edibleKg: 0.02,
    color: '#d35400', painAnimalId: 'shrimp', icon: icons.shrimp,
    sufferingPerDay: 2.5, deathDays: 15, sentience: 0.03, sufferingDaysPerKg: 470,
  },
  {
    id: 'chicken', name: 'Broiler chicken', lifespanDays: 42, edibleKg: 1.9,
    color: '#f39c12', painAnimalId: 'chicken', icon: icons.chicken,
    sufferingPerDay: 3, deathDays: 10, sentience: 0.5, sufferingDaysPerKg: 41,
  },
];

// Derived: life-days per kg of product
export const lifeDaysPerKg = Object.fromEntries(
  farmedAnimals.map(a => [a.id, a.lifespanDays / a.edibleKg])
);

// Derived: Tomasik (2018) suffering-days per kg of product
export const sufferingDaysPerKg = Object.fromEntries(
  farmedAnimals.map(a => [a.id, a.sufferingDaysPerKg])
);

// Diet product definitions — maps product to the farmed animal it comes from
export const products = [
  { id: 'beef',    label: 'Beef',    unit: 'kg',   animalId: 'beef',    toKg: (v) => v },
  { id: 'pork',    label: 'Pork',    unit: 'kg',   animalId: 'pig',     toKg: (v) => v },
  { id: 'chicken', label: 'Chicken', unit: 'kg',   animalId: 'chicken', toKg: (v) => v },
  { id: 'fish',    label: 'Fish',    unit: 'kg',   animalId: 'salmon',  toKg: (v) => v },
  { id: 'eggs',    label: 'Eggs',    unit: 'eggs', animalId: 'eggs',    toKg: (v) => v * 0.055 },
  { id: 'milk',    label: 'Milk',    unit: 'L',    animalId: 'dairy',   toKg: (v) => v },
];

// Diet presets (annual per capita consumption)
export const presets = {
  european:    { label: 'European',    values: { beef: 15, pork: 32, chicken: 25, fish: 23, eggs: 220, milk: 250 } },
  american:    { label: 'American',    values: { beef: 26, pork: 23, chicken: 46, fish: 9,  eggs: 264, milk: 297 } },
  uk:          { label: 'British',     values: { beef: 17, pork: 22, chicken: 34, fish: 18, eggs: 200, milk: 250 } },
  vegetarian:  { label: 'Vegetarian',  values: { beef: 0,  pork: 0,  chicken: 0,  fish: 0,  eggs: 300, milk: 320 } },
  vegan:       { label: 'Vegan',       values: { beef: 0,  pork: 0,  chicken: 0,  fish: 0,  eggs: 0,   milk: 0   } },
};

// Slider max values
export const sliderMax = { beef: 60, pork: 60, chicken: 80, fish: 50, eggs: 500, milk: 500 };
