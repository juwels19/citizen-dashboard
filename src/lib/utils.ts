import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const swrFetcher = (...args) => fetch(...args).then((res) => res.json());

export function formatCoordinate(coordinate: string) {
  const coordinateArr = coordinate.split(".");

  while (coordinateArr.length !== 10) {
    coordinateArr.push("0");
  }

  const formattedCoordinate = coordinateArr.join(".");

  return formattedCoordinate;
}
