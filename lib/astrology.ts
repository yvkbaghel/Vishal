import { Body, Observer, Equator, SiderealTime, MakeTime } from 'astronomy-engine';

export const ZODIAC_SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export const PLANET_MAP: Record<string, string> = {
  Sun: "Su",
  Moon: "Mo",
  Mars: "Ma",
  Mercury: "Me",
  Jupiter: "Ju",
  Venus: "Ve",
  Saturn: "Sa",
  Rahu: "Ra",
  Ketu: "Ke"
};

function getAyanamsa(date: Date): number {
  const year = date.getUTCFullYear() + date.getUTCMonth() / 12;
  return 23.85 + (year - 2000) * (50.29 / 3600);
}

function getSiderealLongitude(body: any, time: any, obs: any, ayanamsa: number): number {
  const eq = Equator(body, time, obs, true, true);
  const raRad = eq.ra * 15 * (Math.PI / 180);
  const decRad = eq.dec * (Math.PI / 180);
  const obliquity = 23.4392911 * (Math.PI / 180);
  
  const y = Math.sin(raRad) * Math.cos(obliquity) + Math.tan(decRad) * Math.sin(obliquity);
  const x = Math.cos(raRad);
  let lon = Math.atan2(y, x) * (180 / Math.PI);
  if (lon < 0) lon += 360;
  
  let sidereal = lon - ayanamsa;
  if (sidereal < 0) sidereal += 360;
  return sidereal;
}

function calculateAscendant(date: Date, lat: number, lng: number, ayanamsa: number): number {
  const time = MakeTime(date);
  let gmst = SiderealTime(time);
  let lst = (gmst * 15 + lng) % 360;
  if (lst < 0) lst += 360;

  const obliquity = 23.4392911 * (Math.PI / 180);
  const latRad = lat * (Math.PI / 180);
  const lstRad = lst * (Math.PI / 180);

  const y = Math.cos(lstRad);
  const x = -Math.sin(lstRad) * Math.cos(obliquity) - Math.tan(latRad) * Math.sin(obliquity);
  
  let ascendantLon = Math.atan2(y, x) * (180 / Math.PI);
  if (ascendantLon < 0) ascendantLon += 360;

  let siderealAsc = ascendantLon - ayanamsa;
  if (siderealAsc < 0) siderealAsc += 360;
  siderealAsc = (siderealAsc + 90) % 360;

  return siderealAsc;
}

export interface ChartData {
  ascendant: { sign: number, degree: number, signName: string };
  planets: {
    name: string;
    symbol: string;
    longitude: number;
    sign: number;
    signName: string;
    house: number;
  }[];
  houses: {
    houseNumber: number;
    sign: number;
    planets: string[];
  }[];
}

export function generateBirthChart(dateStr: string, timeStr: string, lat: number, lng: number): ChartData {
  const datetime = new Date(`${dateStr}T${timeStr}:00`);
  const time = MakeTime(datetime);
  const obs = new Observer(lat, lng, 0);
  const ayanamsa = getAyanamsa(datetime);

  const ascLon = calculateAscendant(datetime, lat, lng, ayanamsa);
  const ascSign = Math.floor(ascLon / 30);
  const ascDegree = ascLon % 30;

  const bodies = [Body.Sun, Body.Moon, Body.Mercury, Body.Venus, Body.Mars, Body.Jupiter, Body.Saturn];
  
  const planetsData = bodies.map(body => {
    const lon = getSiderealLongitude(body, time, obs, ayanamsa);
    const sign = Math.floor(lon / 30);
    let house = ((sign - ascSign + 12) % 12) + 1;
    
    return {
      name: body as string,
      symbol: PLANET_MAP[body as string],
      longitude: lon,
      sign,
      signName: ZODIAC_SIGNS[sign],
      house
    };
  });

  const epoch = new Date('2000-01-01T12:00:00Z');
  const daysSinceEpoch = (datetime.getTime() - epoch.getTime()) / (1000 * 60 * 60 * 24);
  let rahuLon = (193.4144 - 0.0529537648 * daysSinceEpoch) % 360;
  if (rahuLon < 0) rahuLon += 360;
  let rahuSidereal = (rahuLon - ayanamsa + 360) % 360;
  
  const rahuSign = Math.floor(rahuSidereal / 30);
  planetsData.push({
    name: "Rahu",
    symbol: "Ra",
    longitude: rahuSidereal,
    sign: rahuSign,
    signName: ZODIAC_SIGNS[rahuSign],
    house: ((rahuSign - ascSign + 12) % 12) + 1
  });

  const ketuSidereal = (rahuSidereal + 180) % 360;
  const ketuSign = Math.floor(ketuSidereal / 30);
  planetsData.push({
    name: "Ketu",
    symbol: "Ke",
    longitude: ketuSidereal,
    sign: ketuSign,
    signName: ZODIAC_SIGNS[ketuSign],
    house: ((ketuSign - ascSign + 12) % 12) + 1
  });

  const houses = Array.from({ length: 12 }, (_, i) => {
    const houseNumber = i + 1;
    const sign = (ascSign + i) % 12;
    const housePlanets = planetsData.filter(p => p.house === houseNumber).map(p => p.symbol);
    return { houseNumber, sign, planets: housePlanets };
  });

  return {
    ascendant: { sign: ascSign, degree: ascDegree, signName: ZODIAC_SIGNS[ascSign] },
    planets: planetsData,
    houses
  };
}
