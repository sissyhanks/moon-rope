import { moonposition, julian } from "astronomia";

export const SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
] as const;

export type MoonPosition = {
  moonSign: string;
  moonDegree: number;
  moonLongitude: number;
};

export function getCurrentMoonPosition(date = new Date()): MoonPosition {
  const jd = julian.DateToJD(date);

  const pos = moonposition.position(jd);

  // ecliptic longitude in radians → convert to degrees
  const longitude = (pos.lon * 180) / Math.PI;

  const normalized = ((longitude % 360) + 360) % 360;

  const signIndex = Math.floor(normalized / 30);
  const moonDegree = Number((normalized % 30).toFixed(2));

  return {
    moonSign: SIGNS[signIndex],
    moonDegree,
    moonLongitude: Number(normalized.toFixed(2)),
  };
}
