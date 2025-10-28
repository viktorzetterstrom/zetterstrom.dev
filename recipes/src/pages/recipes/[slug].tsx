import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { getRecipe, getRecipes, Recipe } from "../../../utils"
import ReactMarkdown from "react-markdown"
import { useRouter } from "next/router"

type RecipeProps = {
  recipe: Recipe
}

const Recipe: NextPage<RecipeProps> = ({ recipe }) => {
  const router = useRouter()

  return (
    <div>
      <a onClick={() => router.back()}>&lt;- Back</a>
      <ReactMarkdown>{recipe.instruction}</ReactMarkdown>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const recipes = getRecipes()

  return {
    fallback: "blocking",
    paths: recipes.map(({ slug }) => `/recipes/${slug}`),
  }
}

const isString = (x: any): x is string => typeof x === "string"

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !isString(params?.slug)) return { notFound: true }

  const recipe = getRecipe(params.slug)

  if (!recipe) return { notFound: true }

  return {
    props: { recipe },
  }
}

export default Recipe
