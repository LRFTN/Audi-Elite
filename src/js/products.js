export function asset(path) {
  return import.meta.env.BASE_URL + path.replace(/^\//, "");
}

export const promoProduct = {
  id: "a1",
  name: "Audi A1",
  price: 24999,
  fuel: "Benzine",
  transmission: "Handgeschakeld",
  power: "70 kW",
  image: asset("assets/cars/audi-a1.svg"),
  specs: {
    Brandstof: "Benzine",
    Transmissie: "Handgeschakeld",
    Vermogen: "70 kW (95 pk)",
    Aandrijving: "Voorwielaandrijving",
    Verbruik: "5,4 l/100km",
  },
};

export const products = [
  {
    id: "a3",
    name: "Audi A3 Sportback",
    price: 31999,
    fuel: "Benzine",
    transmission: "Automaat",
    power: "110 kW",
    image: asset("assets/cars/audi-a3.svg"),
    specs: {
      Brandstof: "Benzine",
      Transmissie: "Automaat",
      Vermogen: "110 kW (150 pk)",
      Aandrijving: "Voorwielaandrijving",
      Verbruik: "5,9 l/100km",
    },
  },
  {
    id: "a4",
    name: "Audi A4 Avant",
    price: 39999,
    fuel: "Diesel",
    transmission: "S tronic",
    power: "150 kW",
    image: asset("assets/cars/audi-a4.svg"),
    specs: {
      Brandstof: "Diesel",
      Transmissie: "S tronic",
      Vermogen: "150 kW (204 pk)",
      Aandrijving: "Voorwielaandrijving",
      Verbruik: "5,1 l/100km",
    },
  },
  {
    id: "q5",
    name: "Audi Q5",
    price: 54999,
    fuel: "TFSI e quattro",
    transmission: "S tronic",
    power: "195 kW",
    image: asset("assets/cars/audi-q5.svg"),
    specs: {
      Brandstof: "TFSI e quattro (plug-in hybride)",
      Transmissie: "S tronic",
      Vermogen: "195 kW (265 pk)",
      Aandrijving: "quattro vierwielaandrijving",
      Verbruik: "1,8 l/100km (hybride)",
    },
  },
];

export const colorOptions = [
  { name: "Mythos Zwart", hex: "#0E0E11", surcharge: 0 },
  { name: "Glacier Wit", hex: "#F4F4F6", surcharge: 0 },
  { name: "Tango Rood", hex: "#BB0A30", surcharge: 690 },
  { name: "Daytona Grijs", hex: "#6a6a74", surcharge: 590 },
];

export const wheelOptions = [
  { name: '17" velgen', surcharge: 0 },
  { name: '19" velgen', surcharge: 890 },
  { name: '20" velgen sport', surcharge: 1490 },
];

export function formatPrice(value) {
  return "€ " + Math.round(value).toLocaleString("nl-BE");
}
