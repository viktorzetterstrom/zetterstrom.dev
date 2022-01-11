import fs from "fs";
import yaml from "js-yaml";

export type Recipe = {
  name: string;
  slug: string;
  tags: string[];
  instruction: string;
};

const basepath = "./recipes";
const fileNames = fs.readdirSync(basepath);

const recipes = fileNames.map((name) =>
  yaml.load(fs.readFileSync(`${basepath}/${name}`, "utf-8"))
) as Recipe[];

export const getRecipes = () => recipes;

export const getRecipe = (slug: string) =>
  recipes.find((recipe) => slug === recipe.slug);
