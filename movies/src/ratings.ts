import fs from "fs";
import parse from "csv-parse/lib/sync";
import NodeCache from "node-cache";

const RATINGS_PATH = "./src/scripts/data/ratings.csv";
const CACHE_TIME = 12 * 60 * 60;
const CACHE_KEY = "ratings";
const cache = new NodeCache();

const cacheFn = (fn: Function) => {
  const cached = cache.get(CACHE_KEY);
  if (cached) return cached;

  const result = fn();
  cache.set(CACHE_KEY, result, CACHE_TIME);
  return result;
};

const loadRatings = async (): Promise<string> =>
  fs.promises.readFile(RATINGS_PATH, { encoding: "utf-8" });

export const getRatings = async () =>
  cacheFn(async () => parse(await loadRatings(), { columns: true }));
