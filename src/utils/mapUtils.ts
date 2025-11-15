import polyline from '@mapbox/polyline';

export const decodePolyline = (encoded: string): [number, number][] => {
  const decoded = polyline.decode(encoded);
  return decoded.map(([lat, lon]) => [lon, lat]);
};

export const convertSecondsToMinutes = (seconds: number): number => {
  return Math.round(seconds / 60);
};

export const convertMetersToKM = (meters: number): number => {
  return Math.round((meters / 1000) * 10) / 10;
};

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  return date.toLocaleTimeString();
};

export const isDriverActive = (lastUpdate: string): boolean => {
  const now = new Date();
  const last = new Date(lastUpdate);
  const diff = now.getTime() - last.getTime();
  return diff < 60000; // Active if updated within last 60 seconds
};