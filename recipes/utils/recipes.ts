import fs from "fs";
import yaml from "js-yaml";
import Joi from "joi";

export type Recipe = {
  name: string;
  slug: string;
  tags: string[];
  instruction: string;
};

const recipeSchema = Joi.object<Recipe>({
  name: Joi.string().min(2).max(30).required(),
  tags: Joi.array().items(Joi.string()).required(),
  slug: Joi.string().min(2).max(30).required(),
  instruction: Joi.string().required(),
});

const basepath = "./recipes";
const fileNames = fs.readdirSync(basepath);

const readRawRecipeFromFile = (name: string) =>
  fs.readFileSync(`${basepath}/${name}`, "utf-8");

const readRecipeFromFile = (name: string): Recipe | void => {
  try {
    const rawRecipe = yaml.load(readRawRecipeFromFile(name));
    if (typeof rawRecipe !== "object") throw new Error("Recipe not object");

    const recipe = {
      ...rawRecipe,
      slug: name.replace(/\.ya?ml$/, ""),
    };

    const validationResult = recipeSchema.validate(recipe);
    if (validationResult.error) throw validationResult.error;

    return validationResult.value;
  } catch (e) {
    console.log(`Error while reading recipe: "${name}" from disc.`, e);
  }
};

const recipes = fileNames
  .map(readRecipeFromFile)
  .filter((recipe): recipe is Recipe => !!recipe);

export const getRecipes = () => recipes;

export const getRecipe = (slug: string) =>
  recipes.find((recipe) => slug === recipe.slug);
