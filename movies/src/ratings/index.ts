import fs from "fs";
import parseCsv from "csv-parse/lib/sync";
import NodeCache from "node-cache";
import { Rating, ImdbRating } from "./types";

const RATINGS_PATH = "./src/ratings/data/ratings.csv";
const CACHE_TIME = 12 * 60 * 60;
const CACHE_KEY = "ratings";
const MIN_SCORE = 5;

const _cache = new NodeCache();

const cache = (fn: () => Rating[]): Rating[] => {
  const cached = _cache.get<Rating[]>(CACHE_KEY);
  if (cached) return cached;

  const result = fn();
  _cache.set(CACHE_KEY, result, CACHE_TIME);
  return result;
};

const load = async (): Promise<string> =>
  await fs.promises.readFile(RATINGS_PATH, { encoding: "utf-8" });

const format = (r: ImdbRating): Rating => ({
  rating: Number(r["Your Rating"]),
  title: r.Title,
  url: r.URL,
  type: r["Title Type"],
  imdbRating: Number(r["IMDb Rating"]),
  imdbVotes: Number(r["Num Votes"]),
  runtimeMinutes: Number(r["Runtime (mins)"]),
  year: r.Year,
  genres: r.Genres,
  released: r["Release Date"],
  directors: r.Directors,
});

const parse = (ratingsCsv: string): (() => Rating[]) => () =>
  parseCsv(ratingsCsv, { columns: true })
    .map(format)
    .filter(({ rating }: Rating) => rating >= MIN_SCORE)
    .sort((a: Rating, b: Rating) => b.rating - a.rating);

export const getRatings = async (): Promise<Rating[]> =>
  cache(parse(await load()));
