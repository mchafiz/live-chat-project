import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFromAndTo(page: number, itemPerpage: number) {
  let from = page + itemPerpage;
  let to = from + itemPerpage;

  if (page > 0) {
    from += 1;
  }
  return { from, to };
}
