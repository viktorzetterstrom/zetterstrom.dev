import fs from "fs";
import parseCsv from "csv-parse/lib/sync";
import NodeCache from "node-cache";

export interface Rating {
  const: string;
  "Your Rating": string;
  "Date Rated": string;
  Title: string;
  URL: string;
  "Title Type": string;
  "IMDb Rating": string;
  "Runtime (mins)": string;
  Year: string;
  Genres: string;
  "Num Votes": string;
  "Release Date": string;
  Directors: string;
}

const RATINGS_PATH = "./src/scripts/data/ratings.csv";
const CACHE_TIME = 12 * 60 * 60;
const CACHE_KEY = "ratings";
const _cache = new NodeCache();

const cache = (fn: () => Rating[]): Rating[] => {
  const cached = _cache.get<Rating[]>(CACHE_KEY);
  if (cached) return cached;

  const result = fn();
  _cache.set(CACHE_KEY, result, CACHE_TIME);
  return result;
};

const load = async (): Promise<string> =>
  await fs.promises.readFile(RATINGS_PATH, { encoding: "ascii" });

const parse = (ratingsCsv: string): (() => Rating[]) => () =>
  parseCsv(ratingsCsv, { columns: true }).sort(
    (a: Rating, b: Rating) =>
      Number(b["Your Rating"]) - Number(a["Your Rating"])
  );

export const getRatings = async (): Promise<Rating[]> =>
  cache(parse(await load()));
