import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { getRecipes, Recipe } from "../../../utils";

type RecipesProps = {
  recipes: Recipe[];
};

const Recipes: NextPage<RecipesProps> = ({ recipes }) => {
  return (
    <ul>
      {recipes?.map((recipe) => (
        <li key={recipe.slug}>
          <Link href={`/recipes/${recipe.slug}`}>
            <a>{recipe.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export const getStaticProps: GetStaticProps = () => {
  const recipes = getRecipes();

  return {
    props: {
      recipes,
    },
  };
};

export default Recipes;
